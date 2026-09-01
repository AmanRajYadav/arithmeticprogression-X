/* Sidhi — offline service worker. Once opened, the game works with no signal. */
const CACHE = 'sidhi-v1';
const ASSETS = [
  'ap.html',
  'ap.webmanifest',
  'fluence-logo.png',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-512.png',
  'apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(ASSETS.map(a => c.add(a))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function keep(req, res) {
  if (res && res.ok && res.type === 'basic') {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isPage = e.request.mode === 'navigate' || /\.html$/.test(new URL(e.request.url).pathname);

  if (isPage) {
    /* network-first for the page itself, so a new build actually reaches the
       student; falls straight back to cache when there is no signal */
    e.respondWith(
      fetch(e.request).then(res => keep(e.request, res))
        .catch(() => caches.match(e.request).then(hit => hit || caches.match('ap.html')))
    );
    return;
  }
  /* cache-first for icons and the manifest — they never change within a version */
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => keep(e.request, res)))
  );
});
