const APP_BASE = (() => {
  const { pathname } = self.location;
  const match = pathname.match(/^(\/[^/]+)?\//);
  const repoRoot = match ? match[1] || '' : '';
  return repoRoot;
})();

const STATIC_ASSETS = [
  `${APP_BASE}/`,
  `${APP_BASE}/index.html`,
  `${APP_BASE}/manifest.json`
];

const cacheUrl = (url) => {
  if (!url) return null;
  try {
    return new URL(url, self.location.origin).toString();
  } catch {
    return null;
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('jeevansetu-v2').then((cache) => cache.addAll(STATIC_ASSETS.filter(Boolean).map(cacheUrl).filter(Boolean)))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== 'jeevansetu-v2') {
          return caches.delete(key);
        }
        return null;
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isNavigation = event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === `${APP_BASE}/` || url.pathname === '/';

  if (isNavigation) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open('jeevansetu-v2').then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => caches.match(`${APP_BASE}/index.html`) || caches.match(`${APP_BASE}/`) || caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open('jeevansetu-v2').then((cache) => cache.put(event.request, responseToCache));
          return networkResponse;
        })
        .catch(() => null);
    })
  );
});
