// The learner platform's API. Its CORS rules only admit skillcase.in and
// learner.skillcase.in, so pages here reach it through this Worker.
const LEARNER_API = "https://learnerapi.skillcase.in/api";

// Programs and the offer banner for /start-now/cart, from the CMS behind the
// learner site's start-now pages. Cached at the edge for five minutes.
async function cartContent() {
  const response = await fetch(`${LEARNER_API}/trust-page/content`, {
    cf: { cacheTtl: 300, cacheEverything: true },
  });
  if (!response.ok) throw new Error(`trust-page content: ${response.status}`);
  const data = await response.json();
  const blocks = (data.cart_blocks || [])
    .filter((block) => block.is_active)
    .map(({ id, title, description, price_paise, is_recommended, show_gst_badge, urgency_badge_text }) => ({
      id,
      title,
      description,
      price_paise,
      is_recommended,
      show_gst_badge,
      urgency_badge_text,
    }));
  const banner = data.banner?.is_active
    ? { message: data.banner.message, highlight_text: data.banner.highlight_text }
    : null;
  return { blocks, banner };
}

// Payment links come back on Razorpay's domains; anything else is refused.
const isRazorpay = (link) => {
  try {
    const { protocol, hostname } = new URL(link);
    return protocol === "https:" && (hostname === "rzp.io" || hostname === "razorpay.com" || hostname.endsWith(".razorpay.com"));
  } catch {
    return false;
  }
};

async function cartCheckout(request) {
  const body = await request.json().catch(() => null);
  const ids = Array.isArray(body?.blockIds) ? [...new Set(body.blockIds)] : [];
  if (!ids.length || ids.length > 10 || !ids.every(Number.isInteger)) {
    return Response.json({ error: "Choose at least one program." }, { status: 400 });
  }

  const { blocks } = await cartContent();
  const active = new Set(blocks.map((block) => block.id));
  if (!ids.every((id) => active.has(id))) {
    return Response.json({ error: "A program in your plan has changed. Please refresh the page." }, { status: 409 });
  }

  // The same call the learner site's cart makes: it answers with a Razorpay
  // payment link for the chosen blocks.
  const upstream = await fetch(`${LEARNER_API}/payments/public/cart/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ blockIds: ids }),
  });
  const result = await upstream.json().catch(() => null);
  const checkoutUrl = result?.checkoutUrl;
  if (!upstream.ok || !isRazorpay(checkoutUrl)) {
    return Response.json({ error: result?.message || "Payment is unavailable right now." }, { status: 502 });
  }
  return Response.json({ checkoutUrl });
}

// Registration for a free live demo (/events/<slug>): the same call the
// learner site's event form makes, after the same checks. The platform
// emails the Google Meet link; the reply carries the event's current link.
const EVENT_LEVELS = ["Yet to learn", "A1", "A2", "B1", "B2"];

async function eventRegister(request, slug) {
  const body = await request.json().catch(() => null);
  // A field people never see: only bots fill it in.
  if (body?.website) return Response.json({ ok: true, meetingLink: null });

  const name = String(body?.name || "").trim().slice(0, 80);
  const email = String(body?.email || "").trim().slice(0, 120);
  const phone = String(body?.phone || "").replace(/\D/g, "");
  const level = String(body?.language_level || "");
  const session = body?.instance_date ? new Date(body.instance_date) : null;
  if (
    !name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[6-9]\d{9}$/.test(phone) ||
    !EVENT_LEVELS.includes(level) ||
    (session && Number.isNaN(session.getTime()))
  ) {
    return Response.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  const found = await fetch(`${LEARNER_API}/events/${slug}`, { cf: { cacheTtl: 300, cacheEverything: true } });
  if (!found.ok) {
    return Response.json({ error: "This event isn’t open for registration right now." }, { status: 404 });
  }
  const { event } = await found.json();

  const register = (instanceDate) =>
    fetch(`${LEARNER_API}/events/${slug}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, language_level: level, instance_date: instanceDate }),
    });
  let upstream = await register(session ? session.toISOString() : null);
  // A session date the platform doesn't list (its recurring event has run
  // out of dates): register for the event without one, as the learner
  // site's shared link does.
  if (!upstream.ok && session && upstream.status === 400) upstream = await register(null);
  const result = await upstream.json().catch(() => null);
  if (!upstream.ok) {
    return Response.json(
      { error: result?.msg || "Registration didn’t go through. Please try again." },
      { status: upstream.status === 409 ? 409 : 502 },
    );
  }
  const link = String(event?.meeting_link || "");
  return Response.json({ ok: true, meetingLink: link.startsWith("https://meet.google.com/") ? link : null });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return Response.json({
        ok: true,
        service: "skillcase",
        runtime: "cloudflare-workers",
      });
    }

    if (url.pathname === "/api/cart/blocks" && request.method === "GET") {
      try {
        return Response.json(await cartContent(), { headers: { "Cache-Control": "public, max-age=60" } });
      } catch {
        return Response.json({ error: "Programs are unavailable right now." }, { status: 502 });
      }
    }

    if (url.pathname === "/api/cart/checkout") {
      if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
      try {
        return await cartCheckout(request);
      } catch {
        return Response.json({ error: "Payment is unavailable right now." }, { status: 502 });
      }
    }

    const eventMatch = url.pathname.match(/^\/api\/events\/([a-z0-9-]{3,40})\/register$/i);
    if (eventMatch) {
      if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405 });
      try {
        return await eventRegister(request, eventMatch[1]);
      } catch {
        return Response.json({ error: "Registration didn’t go through. Please try again." }, { status: 502 });
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
