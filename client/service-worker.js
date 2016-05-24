var cacheName = 'lafin-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/bundle.js',
  '/vendor.bundle.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  if (/base64|sockjs-node|google-analytics/.test(e.request.url)) {
    return fetch(e.request);
  } else {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(e.request)
            .then(function(response) {
              return caches.open(cacheName).then(function(cache) {
                cache.put(e.request.url, response.clone());
                return response;
              });
            });
        }
      })
    );
  }
});