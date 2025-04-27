// Service Worker for caching images
const CACHE_NAME = 'lost-and-found-cache-v1';
const IMAGE_CACHE_NAME = 'lost-and-found-image-cache-v1';

// Install event - set up caches
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME),
      caches.open(IMAGE_CACHE_NAME)
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - intercept requests and serve from cache when possible
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Check if the request is for an image
  const isImageRequest = event.request.destination === 'image';
  const cacheName = isImageRequest ? IMAGE_CACHE_NAME : CACHE_NAME;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, fetch from network
      return fetch(event.request).then((networkResponse) => {
        // Don't cache if not a valid response
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        // Clone the response as it can only be consumed once
        const responseToCache = networkResponse.clone();

        // Cache the fetched response
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // If network fails and we have a cached version, return it
        // This is especially useful for images
        if (isImageRequest) {
          return caches.match('/placeholder.svg');
        }
      });
    })
  );
}); 