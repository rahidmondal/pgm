const CACHE_NAME = "securepgm-cache-v1.2.1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./styles/index.css",
  "./scripts/app.js",
  "./scripts/zxcvbn.js",
  "./Resources/favicon/android-chrome-192x192.png",
  "./Resources/favicon/android-chrome-512x512.png",
  "./Resources/favicon/favicon.ico",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }),
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
    }),
  );

  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const reqUrl = new URL(event.request.url);

  if (reqUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      if (event.request.mode === "navigate") {
        try {
          const networkResponse = await fetch(event.request);
          await cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (_error) {
          return (await caches.match(event.request)) || (await caches.match("./index.html"));
        }
      }

      const cached = await cache.match(event.request);
      if (cached) {
        return cached;
      }

      const networkResponse = await fetch(event.request);
      await cache.put(event.request, networkResponse.clone());
      return networkResponse;
    })(),
  );
});
