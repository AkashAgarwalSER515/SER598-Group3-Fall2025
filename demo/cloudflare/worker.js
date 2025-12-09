export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/weather")) {

      // FULLY QUALIFIED CACHE KEY (REQUIRED)
      const cacheKey = new Request(
        "https://weather-cache.com" + url.pathname + url.search
      );

      const cache = caches.default;

      // CHECK CACHE
      const cached = await cache.match(cacheKey);
      if (cached) {
        return new Response(await cached.text(), {
          headers: {
            "Content-Type": "application/json",
            "X-Cache": "HIT"
          }
        });
      }

      // BACKEND BASE MUST BE 127.0.0.1 (demo.local DOES NOT WORK IN WORKER)
      const backendBase = env.BACKEND_BASE || "http://127.0.0.1";

      const originResp = await fetch(
        backendBase + url.pathname + url.search
      );

      const body = await originResp.text();

      const resp = new Response(body, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
          "X-Cache": "MISS"
        }
      });

      ctx.waitUntil(cache.put(cacheKey, resp.clone()));
      return resp;
    }

    return new Response("Worker running", { status: 200 });
  }
}
