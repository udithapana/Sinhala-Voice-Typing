/* Katha Liyana service worker.
   Change VERSION whenever you upload new files, so phones pick up the update. */
const VERSION = "katha-v3";
const SHARE_CACHE = "katha-share";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./favicon.ico",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];
const FONT_CACHE = "katha-fonts";

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONT_CACHE && k !== SHARE_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);

  // A voice note or text shared to the app from the phone's share menu (Android).
  // Keep it for the page, then open the app, which picks it up.
  if (req.method === "POST" && url.origin === location.origin && url.pathname.endsWith("/share-target")) {
    event.respondWith((async () => {
      const scope = self.registration.scope;
      try {
        const form = await req.formData();
        const cache = await caches.open(SHARE_CACHE);
        const file = form.get("audio");
        if (file && typeof file !== "string" && file.size) {
          await cache.put(new URL("shared-audio", scope).href, new Response(file, {
            headers: {
              "Content-Type": file.type || "application/octet-stream",
              "X-File-Name": encodeURIComponent(file.name || "Voice note")
            }
          }));
        } else {
          const parts = [form.get("title"), form.get("text")].filter(v => typeof v === "string" && v.trim());
          const text = [...new Set(parts.map(v => v.trim()))].join("\n");
          if (text) await cache.put(new URL("shared-text", scope).href, new Response(text, { headers: { "Content-Type": "text/plain;charset=utf-8" } }));
        }
      } catch (e) {}
      return Response.redirect(new URL("./?shared=1", scope).href, 303);
    })());
    return;
  }

  if (req.method !== "GET") return;

  // App page: try the network first so updates show up, fall back to the saved copy offline.
  if (req.mode === "navigate" && url.origin === location.origin) {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html", { ignoreSearch: true }))
    );
    return;
  }

  // Icons, manifest and other own files: saved copy first.
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }))
    );
    return;
  }

  // Google Fonts: use the saved copy, refresh it in the background.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache => cache.match(req).then(hit => {
        const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") cache.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
  }
  // Everything else (Gemini API calls) goes straight to the network and is never stored.
});
