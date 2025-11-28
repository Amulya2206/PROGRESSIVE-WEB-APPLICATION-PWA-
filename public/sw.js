/assets/products.json'
];
// Service Worker — caching and push handling
const CACHE_NAME = 'shop-cache-v1';
const OFFLINE_URL = '/index.html';


const PRECACHE_RESOURCES = [
'/',
'/index.html',
'/styles.css',
'/app.js',
'/manifest.json',
'/assets/logo.png',
'
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_RESOURCES))
);
self.skipWaiting();
});


self.addEventListener('activate', (event) => {
event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', (event) => {
// Network first for API (products), cache fallback for everything else
const url = new URL(event.request.url);
if (url.pathname.startsWith('/assets/products.json')){
event.respondWith(
fetch(event.request).then(resp => {
const copy = resp.clone();
caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
return resp;
}).catch(()=>caches.match(event.request))
);
return;
}


event.respondWith(
caches.match(event.request).then(resp => resp || fetch(event.request).catch(()=>caches.match(OFFLINE_URL)))
);
});
