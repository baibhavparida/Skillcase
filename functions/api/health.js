export async function onRequestGet() {
  return Response.json({
    ok: true,
    service: "skillcase-web",
    runtime: "cloudflare-pages",
  });
}
