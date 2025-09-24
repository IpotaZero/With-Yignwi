const CACHE_NAME = "mygame-cache-v1"
const PRECACHE_URLS = [
    "/", // index.html
    "/index.html",
    "/manifest.json",
    "/assets/images/maple.png",
]

// Install: precache essential resources
self.addEventListener("install", (event) => {
    self.skipWaiting()
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)))
})

// Activate: cleanup old caches
self.addEventListener("activate", (event) => {
    clients.claim()
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.map((k) => {
                    if (k !== CACHE_NAME) return caches.delete(k)
                }),
            ),
        ),
    )
})

// Fetch: cache-first for same-origin navigation & static assets; network-first for API calls
self.addEventListener("fetch", (event) => {
    const req = event.request
    const url = new URL(req.url)

    // Non-GET -> bypass SW (e.g. POST)
    if (req.method !== "GET") return

    // Strategy: navigation → cache-first
    if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
        event.respondWith(
            caches
                .match(req)
                .then(
                    (cached) =>
                        cached ||
                        fetch(req).then((fetched) => {
                            return caches.open(CACHE_NAME).then((cache) => {
                                cache.put(req, fetched.clone())
                                return fetched
                            })
                        }),
                )
                .catch(() => caches.match("/index.html")),
        )
        return
    }

    // API (example: contains /api/) -> network-first then cache fallback
    if (url.pathname.startsWith("/api/") || url.hostname !== self.location.hostname) {
        event.respondWith(
            fetch(req)
                .then((networkRes) => {
                    // optionally cache API responses (lightweight)
                    return networkRes
                })
                .catch(() => caches.match(req)),
        )
        return
    }

    // Static assets -> cache-first
    event.respondWith(
        caches.match(req).then((cached) => {
            if (cached) return cached
            return fetch(req).then((resp) => {
                // only cache same-origin requests
                if (resp && resp.ok && url.origin === location.origin) {
                    caches.open(CACHE_NAME).then((cache) => cache.put(req, resp.clone()))
                }
                return resp
            })
        }),
    )
})
