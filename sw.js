// Offline-Speicher: die App-Dateien liegen danach auf dem Handy. Bei Änderungen VERSION erhöhen.
const VERSION = "kontobuch-3";
const DATEIEN = ["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(DATEIEN))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== VERSION).map(n => caches.delete(n))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  // Erst das Netz (damit neue Versionen ankommen), ohne Netz der Speicher
  e.respondWith(fetch(e.request).then(r => { const k = r.clone(); caches.open(VERSION).then(c => c.put(e.request, k)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
