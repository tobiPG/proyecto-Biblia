const CACHE_NAME = 'bibliaquiz-v88';
const ASSETS = [
  './',
  './index.html',
  './css/styles.css',
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
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-192.png',
  './icons/icon-192.svg',
  './icons/icon-256.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-512.svg'
];

// Files that should always fetch fresh from network
const NETWORK_FIRST = ['app.js', 'storage.js', 'styles.css', 'questions.js', 'billing.js', 'ads.js', 'notifications.js', 'seasons.js', 'firebase.js', 'social.js'];

// Install - cache all essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch - network-first for JS/CSS, stale-while-revalidate for rest
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  
  // Ignorar requests de extensiones de Chrome y otros esquemas no soportados
  if (!url.protocol.startsWith('http')) return;
  
  // Ignorar requests externos (solo cachear nuestro dominio)
  if (url.origin !== location.origin) return;
  
  const isNetworkFirst = NETWORK_FIRST.some(f => url.pathname.endsWith(f));

  if (isNetworkFirst) {
    // Network-first: always get latest code
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
    // Stale-while-revalidate for static assets
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

// Push Notification - mostrar notificación cuando llegue del servidor
self.addEventListener('push', event => {
  let data = {
    title: '📖 BibliaQuiz',
    body: '¡Tienes un nuevo desafío esperándote!',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-96.png'
  };

  if (event.data) {
    try {
      data = { ...data, ...event.data.json() };
    } catch (e) {
      data.body = event.data.text();
    }
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

// Notification Click - manejar click en notificación
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      // Si ya hay una ventana abierta, enfocarla
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.postMessage({ type: 'notification-click', action: event.action });
          return client.focus();
        }
      }
      // Si no hay ventana, abrir una nueva
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
