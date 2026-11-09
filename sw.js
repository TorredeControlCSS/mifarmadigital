// Service Worker — Mapa Nacional de Disponibilidad de Medicamentos · CSS Panamá
// 9-nov-2026: la página y los datos van SIEMPRE primero a la red (si no hay internet, usa lo último guardado).
// Solo los íconos y las librerías del mapa se sirven desde la caché. Reemplaza al de Mi Farma Digital (mifarma-v31).
const CACHE = 'mapa-med-v1';
const FIJOS = ['./icons/icon-192.png','./icons/icon-512.png','./favicon.ico',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FIJOS).catch(() => {})).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = e.request.url;
  const fijo = u.includes('/icons/') || u.endsWith('favicon.ico') || u.includes('cdnjs.cloudflare.com') || u.includes('tile.openstreetmap');
  if (fijo) {
    e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).then(r => { if (r && r.status === 200) { const k = r.clone(); caches.open(CACHE).then(x => x.put(e.request, k)); } return r; })));
    return;
  }
  // todo lo demás: red primero; solo se guarda copia de lo propio (página y lom.json), no de los datos de otros repos
  e.respondWith(fetch(e.request).then(r => { if (r && r.status === 200 && u.startsWith(self.registration.scope)) { const k = r.clone(); caches.open(CACHE).then(x => x.put(e.request, k)); } return r; }).catch(() => caches.match(e.request)));
});
