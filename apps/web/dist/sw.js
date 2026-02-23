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
    let o = {}
    const c = (e) => i(e, l),
      a = { module: { uri: l }, exports: o, require: c }
    s[l] = Promise.all(n.map((e) => a[e] || c(e))).then((e) => (r(...e), o))
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
        { url: 'assets/blurhash-oP3FmzwJ.js', revision: null },
        { url: 'assets/iframe-CqZPkcdX.js', revision: null },
        { url: 'assets/image-loader-manager-D-ZS7zQJ.js', revision: null },
        { url: 'assets/index-BAJQjYXd.js', revision: null },
        { url: 'assets/index-BuYaRcGf.js', revision: null },
        { url: 'assets/index-BwDtUm7n.js', revision: null },
        { url: 'assets/index-D6-pi_XI.js', revision: null },
        { url: 'assets/index-DCllequg.js', revision: null },
        { url: 'assets/index-uHGvuG-h.js', revision: null },
        { url: 'assets/index.Bg-Nbl.css', revision: null },
        { url: 'assets/index.Duio2V.css', revision: null },
        { url: 'assets/layout-DIIlRFVC.js', revision: null },
        { url: 'assets/logo-control-Ci3BFejp.js', revision: null },
        { url: 'assets/manifest-BsLphcWT.js', revision: null },
        { url: 'assets/maplibre-gl-BIFNluEs.js', revision: null },
        { url: 'assets/MapLibre-opFn-0Wl.js', revision: null },
        { url: 'assets/MapSection-YSWh6hmT.js', revision: null },
        { url: 'assets/style-Dlpw4odU.js', revision: null },
        { url: 'assets/style.Cm_JH2.css', revision: null },
        { url: 'assets/webgl-preview-Tc0JkUnr.js', revision: null },
        { url: 'assets/WebGLImageViewer-CUmzmelI.js', revision: null },
        { url: 'favicon-16x16.png', revision: 'ef3b62dd97cf079922b0062052541023' },
        { url: 'favicon-32x32.png', revision: '87bc37cd76aebb82e8dd0f9738cb9ecf' },
        { url: 'favicon-48x48.png', revision: 'fe085c619f8f378f79c4f0941d8f39da' },
        { url: 'favicon.ico', revision: '87bc37cd76aebb82e8dd0f9738cb9ecf' },
        { url: 'index.html', revision: '2d973bd9bab3ce8575f64e9287715ee5' },
        { url: 'og-image-1771066028960.png', revision: 'd5117cbc77ebd9b7387fb64ba315b2f5' },
        { url: 'og-image-1771066164168.png', revision: 'd5117cbc77ebd9b7387fb64ba315b2f5' },
        { url: 'og-image-1771883233948.png', revision: 'd9e6e9614f669f430a857c02af1779e8' },
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
