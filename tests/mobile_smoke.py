"""Mobile regression checks: python tests/mobile_smoke.py [base-url] [chromium-path]."""
import re
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

base = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:4323'
executable = sys.argv[2] if len(sys.argv) > 2 else None
out = Path('output/mobile-checks')
out.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=executable)
    context = browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True,
                                  has_touch=True, device_scale_factor=2)
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))

    def visit(route):
        page.goto(base + route, wait_until='networkidle')

    def fits():
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'), page.url
        for field in page.locator('input:not([type=checkbox]):not([type=radio]),select,textarea').all():
            if field.is_visible():
                assert field.evaluate('(e) => parseFloat(getComputedStyle(e).fontSize) >= 16')

    routes = ['/', '/about/', '/blog/', '/blog/nursing-in-germany-guide/',
              '/blog/nursing-salaries-germany-foreign-professionals/',
              '/blog/moving-to-germany-as-a-foreign-doctor/', '/privacy-policy/',
              '/terms-and-condition/', '/signup/', '/home-legacy/', '/home-b/', '/not-a-page']
    for route in routes:
        visit(route)
        for width, height in [(320, 568), (360, 740), (390, 844), (430, 932), (768, 1024), (844, 390)]:
            page.set_viewport_size({'width': width, 'height': height})
            fits()
        print('Responsive layout: ' + route, flush=True)

    page.set_viewport_size({'width': 390, 'height': 844})
    for route in ['/', '/home-b/']:
        visit(route)
        toggle = page.get_by_role('button', name='Open navigation menu')
        assert toggle.bounding_box()['height'] >= 44
        toggle.tap()
        toggle = page.get_by_role('button', name='Close navigation menu')
        expect(toggle).to_have_attribute('aria-expanded', 'true')
        page.keyboard.press('Escape')
        expect(page.get_by_role('button', name='Open navigation menu')).to_be_focused()
        page.get_by_role('button', name='Open navigation menu').tap()
        # The open panel covers the heading; tap the exposed page gutter.
        page.touchscreen.tap(6, 750)
        expect(page.get_by_role('button', name='Open navigation menu')).to_have_attribute('aria-expanded', 'false')
        page.get_by_role('button', name='Open navigation menu').tap()
        page.set_viewport_size({'width': 1280, 'height': 900})
        page.set_viewport_size({'width': 390, 'height': 844})
        expect(page.get_by_role('button', name='Open navigation menu')).to_have_attribute('aria-expanded', 'false')
    print('Both navigation menus: touch, Escape, outside tap, resize passed', flush=True)

    for route, selector in [('/blog/nursing-in-germany-guide/', '.article-toc details'),
                            ('/privacy-policy/', '.legal-contents')]:
        visit(route)
        details = page.locator(selector)
        expect(details).not_to_have_attribute('open', '')
        details.locator('summary').tap()
        expect(details).to_have_attribute('open', '')
        target = details.locator('nav a').nth(1).get_attribute('href')
        details.locator('nav a').nth(1).tap()
        expect(details).not_to_have_attribute('open', '')
        page.wait_for_function('(hash) => location.hash === hash', arg=target)
        page.wait_for_function('''(selector) => {
            const rect = document.querySelector(selector).getBoundingClientRect();
            return rect.top >= 68 && rect.top < innerHeight;
        }''', arg=target)
    print('Article and policy section jumps remain below the header', flush=True)

    visit('/')
    hero = page.locator('.hero-bg-image')
    assert '/responsive/hero-' in hero.evaluate('(e) => e.currentSrc')
    assert hero.get_attribute('loading') == 'eager'
    assert page.locator('img[loading=lazy]').count() > 10
    page.screenshot(path=str(out / 'home-390.png'))
    page.locator('.workspace-tab').nth(2).tap()
    page.locator('.workspace-stage').tap()
    # Wait beyond the old automatic cycle: touch readers should retain their selection.
    page.wait_for_timeout(5500)
    expect(page.locator('.workspace-tab').nth(2)).to_have_attribute('aria-selected', 'true')
    stories = page.locator('.testimonial-layout')
    stories.scroll_into_view_if_needed()
    stories.evaluate('(e) => { e.scrollLeft = e.scrollWidth; }')
    page.wait_for_function("document.querySelector('.testimonial-layout').scrollLeft > 0")
    expect(stories.locator('.testimonial-card').last).to_be_in_viewport()
    fits()
    print('Responsive images, stable touch panels, and story scrolling passed', flush=True)

    # Exercise the existing demo signup at a narrow keyboard-sized viewport,
    # including completion when privacy settings prevent local storage writes.
    context.add_init_script("Storage.prototype.setItem = () => { throw new DOMException('Storage unavailable', 'SecurityError'); };")
    page.set_viewport_size({'width': 320, 'height': 420})
    visit('/signup/')
    expect(page.get_by_placeholder('98765 43210')).not_to_be_focused()
    page.get_by_placeholder('98765 43210').fill('9876543210')
    page.get_by_role('button', name='Send OTP on WhatsApp').tap()
    fits()
    for index, digit in enumerate('123456', start=1):
        page.get_by_role('textbox', name=f'Digit {index}', exact=True).fill(digit)
    page.get_by_role('button', name='Verify and continue').tap()
    page.get_by_placeholder('Sanjukta Rout').fill('Mobile Test')
    page.get_by_placeholder('you@example.com').fill('mobile@example.com')
    page.get_by_role('button', name='Continue', exact=True).tap()
    fits()
    for choice in ['BSc Nursing', 'Fresher']:
        page.get_by_role('radio', name=re.compile('^' + choice)).tap()
        page.get_by_role('button', name='Continue', exact=True).tap()
        fits()
    page.get_by_role('radio', name=re.compile('^Not started')).tap()
    page.get_by_role('button', name='Build my roadmap').tap()
    expect(page.get_by_role('heading', name='Welcome, Mobile!')).to_be_visible()
    fits()
    page.screenshot(path=str(out / 'signup-320.png'))
    print('Narrow signup, simulated keyboard height, and blocked storage passed', flush=True)
    assert not errors, '\n'.join(errors)
    browser.close()
    print('All mobile checks passed without browser errors.')
