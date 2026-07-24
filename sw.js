const CACHE_NAME = 'mattcubing-shell-v2';
const SHELL_FILES = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

// Clicking a message notification focuses an existing app tab (or opens one)
// and tells the page which conversation to jump into.
self.addEventListener('notificationclick', (event) => {
  const data = event.notification.data || {};
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          if (data.type === 'dm') client.postMessage(data);
          return;
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('./index.html').then((client) => {
          if (client && data.type === 'dm') {
            // give the fresh page a moment to attach its message listener
            setTimeout(() => client.postMessage(data), 1500);
          }
        });
      }
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Network-first for same-origin app-shell files: always try to get the latest
// version first, and only fall back to the cached copy if the network fails
// (offline). This keeps installed/PWA users from getting stuck on an old
// cached index.html forever — the old cache-first strategy meant any update
// after install would never be seen by people who'd already installed the app.
// Everything cross-origin (Supabase API calls, CDN scripts) goes straight to
// the network untouched, same as before.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
