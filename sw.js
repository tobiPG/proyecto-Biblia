const CACHE_NAME = 'bibliaquiz-v105';

// Archivos críticos que deben cachearse en el install
const CRITICAL_ASSETS = [
  './',
  './index.html',
  './css/styles.css',
  './manifest.json'
];

// Archivos opcionales — se cachean en background, si uno falla no rompe el SW
const OPTIONAL_ASSETS = [
  './js/questions.js',
  './js/definitions.js',
  './js/storage.js',
  './js/billing.js',
  './js/ads.js',
  './js/notifications.js',
  './js/ranked.js',
  './js/app.js',
  './js/seasons.js',
  './js/firebase.js',
  './js/social.js',
  './js/campaign.js',
  './js/chronology.js',
  './js/clans.js',
  './js/tournament.js',
  './js/backend.js',
  './js/sounds.js',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-192.png',
  './icons/icon-192.svg',
  './icons/icon-256.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-512.svg',
  './images/questions/mapa-exodo.svg',
  './images/questions/mapa-israel.svg',
  './images/questions/carnero-abraham.svg',
  './images/questions/viajes-pablo.svg'
];

// Files that should always fetch fresh from network
const NETWORK_FIRST = ['app.js', 'storage.js', 'styles.css', 'definitions.js', 'questions.js', 'billing.js', 'ads.js', 'notifications.js', 'seasons.js', 'firebase.js', 'social.js', 'campaign.js', 'chronology.js', 'clans.js', 'tournament.js', 'backend.js', 'sounds.js', 'ranked.js'];

// Install — solo bloquea en críticos, opcionales en background
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Cachear críticos — si falla, el install falla (correcto)
      await cache.addAll(CRITICAL_ASSETS);
      // Cachear opcionales uno a uno — si uno falla, continúa
      const results = await Promise.allSettled(
        OPTIONAL_ASSETS.map(url =>
          fetch(url).then(res => {
            if (res.ok) return cache.put(url, res);
          })
        )
      );
      const failed = results.filter(r => r.status === 'rejected').length;
      if (failed > 0) console.log(`[SW] ${failed} archivos opcionales no se cachearon (continuando)`);
    })
  );
  self.skipWaiting();
});

// Activate — limpiar caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network-first para JS/CSS, stale-while-revalidate para el resto
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (!url.protocol.startsWith('http')) return;
  if (url.origin !== location.origin) return;

  const isNetworkFirst = NETWORK_FIRST.some(f => url.pathname.endsWith(f));

  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request, { ignoreSearch: true }))
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(cached => {
        const fetchPromise = fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});

// Push Notification
self.addEventListener('push', event => {
  let data = {
    title: '📖 BibliaQuiz',
    body: '¡Tienes un nuevo desafío esperándote!',
    icon: self.registration.scope + 'icons/icon-192.png',
    badge: self.registration.scope + 'icons/icon-96.png'
  };
  if (event.data) {
    try { data = { ...data, ...event.data.json() }; }
    catch (e) { data.body = event.data.text(); }
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: data.badge,
      vibrate: [200, 100, 200],
      tag: 'bibliaquiz-push',
      renotify: true,
      data: { url: data.url || '/' },
      actions: [
        { action: 'open', title: '🎮 Jugar' },
        { action: 'dismiss', title: '❌ Cerrar' }
      ]
    })
  );
});

// Notification Click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const urlToOpen = event.notification.data?.url || self.registration.scope;
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ type: 'notification-click', action: event.action });
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});
