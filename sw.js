const CACHE_NAME = "pwa-sample-caches"
const urlsToCache = ["mako5656.github.io/pwa/", "mako5656.github.io/pwa/app.js"]

window.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache)
        }),
    )
})

window.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response ? response : fetch(event.request)
        }),
    )
})
