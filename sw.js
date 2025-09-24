const CACHE_NAME = "pwa-sample-caches"
const urlsToCache = ["ipotazero.github.io/With-Yignwi/"]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache.map((url) => new Request(url, { credentials: "same-origin" })))
        }),
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response ?? fetch(event.request)
        }),
    )
})
