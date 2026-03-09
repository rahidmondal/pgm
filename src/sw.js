const CACHE_NAME = "securepgm-cache-v1.2.0";
const ASSETS = [
  "./",
  "./index.html",
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
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then(async (networkResponse) => {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, networkResponse.clone());
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      }),
  );
});
