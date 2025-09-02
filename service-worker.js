// Nama cache unik
const CACHE_NAME = 'portal-desa-shell-v1';
// Daftar file yang akan di-cache (cangkang aplikasi)
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css' // Cache font awesome juga
];

// Event 'install': Dijalankan saat Service Worker pertama kali diinstal
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch': Dijalankan setiap kali aplikasi meminta resource (file)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika resource ditemukan di cache, langsung kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak, ambil dari jaringan
        return fetch(event.request);
      })
  );
});