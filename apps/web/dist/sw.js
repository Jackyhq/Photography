if (!self.define) {
  let e,
    s = {}
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;((e.src = i), (e.onload = s), document.head.appendChild(e))
        } else ((e = i), importScripts(i), s())
      }).then(() => {
        let e = s[i]
        if (!e) throw new Error(`Module ${i} didn’t register its module`)
        return e
      })
  )
  self.define = (n, r) => {
    const l = e || ('document' in self ? document.currentScript.src : '') || location.href
    if (s[l]) return
    let a = {}
    const o = (e) => i(e, l),
      c = { module: { uri: l }, exports: a, require: o }
    s[l] = Promise.all(n.map((e) => c[e] || o(e))).then((e) => (r(...e), a))
  }
}
define(['./workbox-838c17be'], function (e) {
  'use strict'
  ;(self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: 'android-chrome-192x192.png', revision: '155d8a2fdfa564554956cec6596409f5' },
        { url: 'android-chrome-512x512.png', revision: '25513da014edc26033b38b0999cde32b' },
        { url: 'apple-touch-icon.png', revision: '18444326d636b141bdf4041dcc7e89bf' },
        { url: 'assets/blurhash-Dc-X0Xun.js', revision: null },
        { url: 'assets/iframe-Bk8vha6e.js', revision: null },
        { url: 'assets/image-loader-manager-C8JOYhuj.js', revision: null },
        { url: 'assets/index-BOQUOTEL.js', revision: null },
        { url: 'assets/index-BuYaRcGf.js', revision: null },
        { url: 'assets/index-C-e3FxZ_.js', revision: null },
        { url: 'assets/index-DSipzPdn.js', revision: null },
        { url: 'assets/index-lLNfkcaP.js', revision: null },
        { url: 'assets/index-uHGvuG-h.js', revision: null },
        { url: 'assets/index.Bg-Nbl.css', revision: null },
        { url: 'assets/index.C5DAWw.css', revision: null },
        { url: 'assets/layout-44BY8OOq.js', revision: null },
        { url: 'assets/logo-control-90FV2_cU.js', revision: null },
        { url: 'assets/manifest-B7_iVarw.js', revision: null },
        { url: 'assets/MapLibre-CzxR76V2.js', revision: null },
        { url: 'assets/maplibre-gl-BIFNluEs.js', revision: null },
        { url: 'assets/MapSection-GYHNGiTK.js', revision: null },
        { url: 'assets/style-BhLPx-a6.js', revision: null },
        { url: 'assets/style.Cm_JH2.css', revision: null },
        { url: 'assets/webgl-preview-Cv7l0-F6.js', revision: null },
        { url: 'assets/WebGLImageViewer-CUmzmelI.js', revision: null },
        { url: 'favicon-16x16.png', revision: 'ef3b62dd97cf079922b0062052541023' },
        { url: 'favicon-32x32.png', revision: '87bc37cd76aebb82e8dd0f9738cb9ecf' },
        { url: 'favicon-48x48.png', revision: 'fe085c619f8f378f79c4f0941d8f39da' },
        { url: 'favicon.ico', revision: '87bc37cd76aebb82e8dd0f9738cb9ecf' },
        { url: 'index.html', revision: '67539ef559bb37af24d14953c3a625f9' },
        { url: 'og-image-1773174110167.png', revision: '6174766bad1b152ea160cdccdaaa5adc' },
        { url: 'og-image-1773174137887.png', revision: '6174766bad1b152ea160cdccdaaa5adc' },
        { url: 'og-image-1773174240232.png', revision: '6174766bad1b152ea160cdccdaaa5adc' },
        { url: 'registerSW.js', revision: '1872c500de691dce40960bb85481de07' },
        { url: 'vendor/0-BOriIG77.js', revision: '45d3c82d4a415d990a6d5f349d31c0fb' },
        { url: 'vendor/1-CkNOVE2J.js', revision: 'fb020d6aadad6e5f76947e00e983f978' },
        { url: 'vendor/2-VRqxSGaj.js', revision: 'd8b4130f92368d1acf7ae3be35718632' },
        { url: 'android-chrome-192x192.png', revision: '155d8a2fdfa564554956cec6596409f5' },
        { url: 'android-chrome-512x512.png', revision: '25513da014edc26033b38b0999cde32b' },
        { url: 'apple-touch-icon.png', revision: '18444326d636b141bdf4041dcc7e89bf' },
        { url: 'favicon.ico', revision: '87bc37cd76aebb82e8dd0f9738cb9ecf' },
        { url: 'manifest.webmanifest', revision: '453d4dc3f711d9b199a9b71a1628c36e' },
      ],
      {},
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))),
    e.registerRoute(
      /^https:\/\/fonts\.googleapis\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-cache',
        plugins: [new e.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.gstatic\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'gstatic-fonts-cache',
        plugins: [new e.ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:png|jpg|jpeg|svg|webp)$/,
      new e.CacheFirst({
        cacheName: 'images-cache',
        plugins: [new e.ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 2592e3 })],
      }),
      'GET',
    ))
})
