import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200]
      })
    ]
  })
)

/** Preact CLI setup */
setupRouting()

const urlsToCache = getFiles()
setupPrecaching(urlsToCache)
