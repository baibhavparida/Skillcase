"""Browser checks: python tests/browser_smoke.py http://localhost:4323 [chromium-path]."""
import json
import re
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

base = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://localhost:4323"
executable = sys.argv[2] if len(sys.argv) > 2 else None
output = Path("output/browser-checks")
output.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=executable)
    page = browser.new_page(viewport={"width": 1440, "height": 1000}, reduced_motion="reduce")
    errors = []
    page.on("pageerror", lambda error: errors.append(page.url + ": " + str(error)))

    def visit(route):
        page.goto(base + route, wait_until="networkidle")
        assert page.title(), route
        assert page.locator('a[href*="/dashboard"]').count() == 0, route

    visit("/")
    expect(page.locator("h1")).to_have_text("Land your healthcare job in Germany")
    page.screenshot(path=str(output / "home-desktop.png"))
    page.locator(".faq-list summary").nth(1).click()
    expect(page.locator(".faq-list details").nth(1)).to_have_attribute("open", "")
    expect(page.locator(".faq-list details").first).not_to_have_attribute("open", "")
    page.locator(".workspace-shell").scroll_into_view_if_needed()
    page.evaluate("() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
    page.locator(".workspace-tab").nth(1).click()
    expect(page.locator(".workspace-tab").nth(1)).to_have_attribute("aria-selected", "true")
    page.locator(".workspace-tab").nth(1).press("ArrowDown")
    expect(page.locator(".workspace-tab").nth(2)).to_have_attribute("aria-selected", "true")
    print("Homepage FAQ and keyboard feature tabs passed", flush=True)

    page.set_viewport_size({"width": 390, "height": 844})
    visit("/")
    page.screenshot(path=str(output / "home-mobile.png"))
    page.get_by_role("button", name="Open navigation menu").click()
    expect(page.get_by_role("button", name="Close navigation menu")).to_have_attribute("aria-expanded", "true")
    page.locator("#mobile-navigation").get_by_role("link", name="About Us").click()
    page.wait_for_url("**/about/")
    page.wait_for_load_state("networkidle")
    page.get_by_role("button", name="Open navigation menu").click()
    expect(page.locator("#mobile-navigation")).to_be_visible()
    assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1")
    print("Mobile navigation passed", flush=True)

    for route in ["/blog/", "/privacy-policy/", "/terms-and-condition/", "/home-b/", "/home-legacy/",
                  "/blog/nursing-in-germany-guide/", "/blog/nursing-salaries-germany-foreign-professionals/",
                  "/blog/moving-to-germany-as-a-foreign-doctor/"]:
        visit(route)
        expect(page.locator("h1")).to_be_visible()
        print("Rendered " + route, flush=True)

    visit("/blog-view?id=14")
    page.wait_for_url(re.compile(r"/blog/nursing-salaries-germany-foreign-professionals/?$"))
    visit("/terms-and-conditions/")
    page.wait_for_url(re.compile(r"/terms-and-condition/?$"))
    print("Legacy redirects passed", flush=True)

    visit("/signup/")
    page.evaluate("localStorage.clear()")
    page.reload(wait_until="networkidle")
    page.get_by_role("button", name="Send OTP on WhatsApp").click()
    expect(page.locator("#phone-error")).to_be_visible()
    page.get_by_placeholder("98765 43210").fill("9876543210")
    page.get_by_role("button", name="Send OTP on WhatsApp").click()
    for index, digit in enumerate("123456", start=1):
        page.get_by_role("textbox", name=f"Digit {index}", exact=True).fill(digit)
    page.get_by_role("button", name="Verify and continue").click()
    page.get_by_placeholder("Sanjukta Rout").fill("Migration Test")
    page.get_by_placeholder("you@example.com").fill("migration@example.com")
    page.get_by_role("button", name="Continue", exact=True).click()
    page.get_by_role("radio", name=re.compile(r"^BSc Nursing")).click()
    page.get_by_role("button", name="Continue", exact=True).click()
    page.get_by_role("radio", name=re.compile(r"^Fresher")).click()
    page.get_by_role("button", name="Continue", exact=True).click()
    page.get_by_role("radio", name=re.compile(r"^Not started")).click()
    page.get_by_role("button", name="Build my roadmap").click()
    expect(page.get_by_role("heading", name="Welcome, Migration!")).to_be_visible()
    expect(page.get_by_role("link", name="Talk to an advisor", exact=True)).to_have_attribute("href", "tel:+919731462667")
    assert "/signup" in page.url
    profile = json.loads(page.evaluate('localStorage.getItem("skillcase_candidate_profile")'))
    assert profile["fullName"] == "Migration Test"
    page.screenshot(path=str(output / "signup-complete.png"))
    print("Signup validation, completion, and local persistence passed", flush=True)

    assert not errors, "Browser errors:\n" + "\n".join(errors)
    browser.close()
    print("All browser checks passed without JavaScript or hydration errors.")
