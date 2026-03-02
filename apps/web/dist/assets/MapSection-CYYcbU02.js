const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/MapLibre-BdsxGFqt.js',
      'vendor/1-CkNOVE2J.js',
      'assets/style-ohaFka_1.js',
      'assets/index-B0xVIOve.js',
      'vendor/2-VRqxSGaj.js',
      'assets/index.Duio2V.css',
      'assets/style.Cm_JH2.css',
      'assets/logo-control-CIBmikTw.js',
      'assets/index-D-Shj6vX.js',
    ]),
) => i.map((i) => d[i])
import { c as w, j as a, r as N } from '../vendor/1-CkNOVE2J.js'
import { J as q, I as S, K, aB as U, a3 as H, Y as X, ae as Y, p as D } from './index-B0xVIOve.js'
import { g as V, a as Q, c as W, b as Z } from './logo-control-CIBmikTw.js'
import { u as T } from '../vendor/2-VRqxSGaj.js'
const ee = (t) => {
    const e = w.c(13)
    let l
    e[0] !== t.className
      ? ((l = q(
          'pointer-events-auto relative flex size-10 items-center justify-center rounded-full',
          'bg-black/20 text-white backdrop-blur-md',
          'border border-white/10 shadow-lg shadow-black/25',
          'text-lg',
          t.className,
        )),
        (e[0] = t.className),
        (e[1] = l))
      : (l = e[1])
    let s, n, i
    e[2] === Symbol.for('react.memo_cache_sentinel')
      ? ((s = { scale: 1 }),
        (n = { scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)', borderColor: 'rgba(255, 255, 255, 0.2)' }),
        (i = { scale: 0.95 }),
        (e[2] = s),
        (e[3] = n),
        (e[4] = i))
      : ((s = e[2]), (n = e[3]), (i = e[4]))
    let c
    e[5] === Symbol.for('react.memo_cache_sentinel')
      ? ((c = a.jsx('div', {
          className:
            'absolute inset-0 rounded-full bg-linear-to-t from-white/5 to-white/20 opacity-0 transition-opacity duration-300 hover:opacity-100',
        })),
        (e[5] = c))
      : (c = e[5])
    let o
    e[6] !== t.children
      ? ((o = a.jsx('div', { className: 'center relative z-10 flex', children: t.children })),
        (e[6] = t.children),
        (e[7] = o))
      : (o = e[7])
    let d
    e[8] === Symbol.for('react.memo_cache_sentinel')
      ? ((d = a.jsx('div', { className: 'absolute inset-0 rounded-full shadow-inner shadow-black/10' })), (e[8] = d))
      : (d = e[8])
    let r
    return (
      e[9] !== t || e[10] !== l || e[11] !== o
        ? ((r = a.jsxs(S.button, {
            type: 'button',
            ...t,
            className: l,
            initial: s,
            whileHover: n,
            whileTap: i,
            transition: K.presets.smooth,
            children: [c, o, d],
          })),
          (e[9] = t),
          (e[10] = l),
          (e[11] = o),
          (e[12] = r))
        : (r = e[12]),
      r
    )
  },
  te = N.lazy(() =>
    U(() => import('./MapLibre-BdsxGFqt.js'), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8])).then((t) => ({
      default: t.Maplibre,
    })),
  )
class ae {
  name = 'maplibre'
  isAvailable = !0
  MapComponent = se
  async initialize() {}
  cleanup() {}
}
const se = (t) => {
    const e = w.c(19),
      {
        id: l,
        initialViewState: s,
        markers: n,
        selectedMarkerId: i,
        geoJsonData: c,
        className: o,
        style: d,
        handlers: r,
        autoFitBounds: f,
      } = t,
      g = N.useRef(null)
    let j
    e[0] !== r
      ? ((j = (v) => {
          if (!r?.onGeoJsonClick) return
          const k = v.features?.[0]
          k && r.onGeoJsonClick(k)
        }),
        (e[0] = r),
        (e[1] = j))
      : (j = e[1])
    const h = j
    let u
    e[2] === Symbol.for('react.memo_cache_sentinel')
      ? ((u = (v, k, _) => {
          g.current?.flyTo({ center: [v, k], duration: 1e3, zoom: _ || 14 })
        }),
        (e[2] = u))
      : (u = e[2])
    const p = u
    let b
    e[3] !== r
      ? ((b = (v) => {
          r?.onMarkerClick?.(v)
        }),
        (e[3] = r),
        (e[4] = b))
      : (b = e[4])
    const M = b
    let y
    e[5] !== r
      ? ((y = (v, k) => {
          ;(p(v, k), r?.onGeolocate?.(v, k))
        }),
        (e[5] = r),
        (e[6] = y))
      : (y = e[6])
    const m = y
    let x
    return (
      e[7] !== f ||
      e[8] !== o ||
      e[9] !== c ||
      e[10] !== h ||
      e[11] !== m ||
      e[12] !== M ||
      e[13] !== l ||
      e[14] !== s ||
      e[15] !== n ||
      e[16] !== i ||
      e[17] !== d
        ? ((x = a.jsx(te, {
            id: l,
            initialViewState: s,
            markers: n,
            selectedMarkerId: i,
            geoJsonData: c,
            onMarkerClick: M,
            onGeoJsonClick: h,
            onGeolocate: m,
            className: o,
            style: d,
            mapRef: g,
            autoFitBounds: f,
          })),
          (e[7] = f),
          (e[8] = o),
          (e[9] = c),
          (e[10] = h),
          (e[11] = m),
          (e[12] = M),
          (e[13] = l),
          (e[14] = s),
          (e[15] = n),
          (e[16] = i),
          (e[17] = d),
          (e[18] = x))
        : (x = e[18]),
      x
    )
  },
  le = () => new ae(),
  O = N.createContext(null),
  ne = () => {
    const t = N.use(O)
    if (!t) throw new Error('useMapAdapter must be used within a MapProvider')
    return t.adapter
  },
  J = le(),
  $ = [{ name: 'maplibre', adapter: J, component: J.MapComponent }],
  ie = () => {
    const t = H.map
    if (!t) {
      const l = $.find((s) => s.adapter.isAvailable) || null
      return (l && console.info(`Map: Selected default adapter: ${l.name}`), l)
    }
    if (typeof t == 'string') {
      const l = $.find((n) => n.name === t && n.adapter.isAvailable)
      if (l) return (console.info(`Map: Selected specified adapter: ${l.name}`), l)
      const s = $.find((n) => n.adapter.isAvailable) || null
      return (s && console.info(`Map: Specified adapter '${t}' not available, using fallback: ${s.name}`), s)
    }
    if (Array.isArray(t)) {
      for (const s of t) {
        const n = $.find((i) => i.name === s && i.adapter.isAvailable)
        if (n) return (console.info(`Map: Selected adapter from priority list: ${n.name}`), n)
      }
      const l = $.find((s) => s.adapter.isAvailable) || null
      return (l && console.info(`Map: None of the priority providers available, using fallback: ${l.name}`), l)
    }
    const e = $.find((l) => l.adapter.isAvailable) || null
    return (
      e ? console.info(`Map: Selected default adapter: ${e.name}`) : console.warn('Map: No adapters are available'),
      e
    )
  },
  oe = (t) => {
    const e = w.c(5),
      { children: l } = t
    let s
    e: {
      let d
      e[0] === Symbol.for('react.memo_cache_sentinel') ? ((d = ie()), (e[0] = d)) : (d = e[0])
      const r = d
      if (r) {
        let f
        ;(e[1] === Symbol.for('react.memo_cache_sentinel')
          ? ((f = { ...r.adapter, MapComponent: r.component }), (e[1] = f))
          : (f = e[1]),
          (s = f))
        break e
      }
      s = null
    }
    const n = s
    let i
    e[2] === Symbol.for('react.memo_cache_sentinel') ? ((i = { adapter: n }), (e[2] = i)) : (i = e[2])
    const c = i
    let o
    return (e[3] !== l ? ((o = a.jsx(O, { value: c, children: l })), (e[3] = l), (e[4] = o)) : (o = e[4]), o)
  },
  re = [],
  ce = (t) => {
    const e = w.c(27)
    let l, s, n, i, c, o, d, r
    e[0] !== t
      ? (({
          markers: d,
          selectedMarkerId: o,
          onMarkerClick: i,
          onGeoJsonClick: s,
          onGeolocate: n,
          initialViewState: l,
          autoFitBounds: r,
          ...c
        } = t),
        (e[0] = t),
        (e[1] = l),
        (e[2] = s),
        (e[3] = n),
        (e[4] = i),
        (e[5] = c),
        (e[6] = o),
        (e[7] = d),
        (e[8] = r))
      : ((l = e[1]), (s = e[2]), (n = e[3]), (i = e[4]), (c = e[5]), (o = e[6]), (d = e[7]), (r = e[8]))
    const f = d === void 0 ? re : d,
      g = r === void 0 ? !0 : r,
      j = ne()
    let h
    e: {
      if (g) {
        let x
        ;(e[9] !== l ? ((x = l || { longitude: 0, latitude: 0, zoom: 2 }), (e[9] = l), (e[10] = x)) : (x = e[10]),
          (h = x))
        break e
      }
      let m
      ;(e[11] !== l || e[12] !== f ? ((m = l || V(f)), (e[11] = l), (e[12] = f), (e[13] = m)) : (m = e[13]), (h = m))
    }
    const u = h
    let p
    e[14] !== s || e[15] !== n || e[16] !== i
      ? ((p = { onMarkerClick: i, onGeoJsonClick: s, onGeolocate: n }),
        (e[14] = s),
        (e[15] = n),
        (e[16] = i),
        (e[17] = p))
      : (p = e[17])
    const b = p
    if (!j) {
      let m
      return (
        e[18] === Symbol.for('react.memo_cache_sentinel')
          ? ((m = a.jsx('div', { children: 'Map provider not available' })), (e[18] = m))
          : (m = e[18]),
        m
      )
    }
    const { MapComponent: M } = j
    let y
    return (
      e[19] !== M || e[20] !== g || e[21] !== u || e[22] !== b || e[23] !== f || e[24] !== c || e[25] !== o
        ? ((y = a.jsx(M, {
            ...c,
            markers: f,
            selectedMarkerId: o,
            initialViewState: u,
            autoFitBounds: g,
            handlers: b,
          })),
          (e[19] = M),
          (e[20] = g),
          (e[21] = u),
          (e[22] = b),
          (e[23] = f),
          (e[24] = c),
          (e[25] = o),
          (e[26] = y))
        : (y = e[26]),
      y
    )
  },
  de = () => {
    const t = w.c(8),
      { t: e } = T(),
      l = X()
    let s
    t[0] !== l
      ? ((s = () => {
          N.startTransition(() => {
            l('/')
          })
        }),
        (t[0] = l),
        (t[1] = s))
      : (s = t[1])
    const n = s
    let i
    t[2] !== e ? ((i = e('explory.back.to.gallery')), (t[2] = e), (t[3] = i)) : (i = t[3])
    let c
    t[4] === Symbol.for('react.memo_cache_sentinel')
      ? ((c = a.jsx('i', { className: 'i-mingcute-arrow-left-line text-base text-white' })), (t[4] = c))
      : (c = t[4])
    let o
    return (
      t[5] !== n || t[6] !== i
        ? ((o = a.jsx(ee, { className: 'absolute top-4 left-4 z-50', onClick: n, title: i, children: c })),
          (t[5] = n),
          (t[6] = i),
          (t[7] = o))
        : (o = t[7]),
      o
    )
  },
  me = (t) => {
    const e = w.c(47),
      { markersCount: l, bounds: s } = t,
      { t: n } = T(),
      [i, c] = N.useState(!1)
    let o, d, r
    e[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((o = { opacity: 0, x: 20 }),
        (d = { opacity: 1, x: 0 }),
        (r = { duration: 0.4, delay: 0.2 }),
        (e[0] = o),
        (e[1] = d),
        (e[2] = r))
      : ((o = e[0]), (d = e[1]), (r = e[2]))
    let f, g, j
    e[3] === Symbol.for('react.memo_cache_sentinel')
      ? ((f = { opacity: 0, y: 10 }),
        (g = { opacity: 1, y: 0 }),
        (j = { duration: 0.3, delay: 0.3 }),
        (e[3] = f),
        (e[4] = g),
        (e[5] = j))
      : ((f = e[3]), (g = e[4]), (j = e[5]))
    let h
    e[6] === Symbol.for('react.memo_cache_sentinel')
      ? ((h = a.jsx('div', {
          className:
            'bg-blue/10 ring-blue/20 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ring-1 ring-inset',
          children: a.jsx('i', { className: 'i-mingcute-map-line text-blue text-lg' }),
        })),
        (e[6] = h))
      : (h = e[6])
    let u
    e[7] !== n ? ((u = n('explory.explore.map')), (e[7] = n), (e[8] = u)) : (u = e[8])
    let p
    e[9] !== u
      ? ((p = a.jsx('h1', { className: 'text-text text-lg leading-tight font-semibold tracking-tight', children: u })),
        (e[9] = u),
        (e[10] = p))
      : (p = e[10])
    let b
    e[11] !== i ? ((b = () => c(!i)), (e[11] = i), (e[12] = b)) : (b = e[12])
    const M = i ? 'Collapse' : 'Expand',
      y = i ? 180 : 0
    let m
    e[13] !== y ? ((m = { rotate: y }), (e[13] = y), (e[14] = m)) : (m = e[14])
    let x
    e[15] === Symbol.for('react.memo_cache_sentinel') ? ((x = { duration: 0.2 }), (e[15] = x)) : (x = e[15])
    let v
    e[16] !== m
      ? ((v = a.jsx(S.i, {
          className: 'i-mingcute-down-line text-text-secondary text-base',
          animate: m,
          transition: x,
        })),
        (e[16] = m),
        (e[17] = v))
      : (v = e[17])
    let k
    e[18] !== b || e[19] !== M || e[20] !== v
      ? ((k = a.jsx('button', {
          type: 'button',
          onClick: b,
          className:
            'bg-fill-secondary/50 ring-fill-tertiary/20 hover:bg-fill-tertiary relative -top-2 -mb-2 flex size-8 flex-shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-200 ring-inset',
          'aria-label': M,
          children: v,
        })),
        (e[18] = b),
        (e[19] = M),
        (e[20] = v),
        (e[21] = k))
      : (k = e[21])
    let _
    e[22] !== k || e[23] !== p
      ? ((_ = a.jsxs('div', { className: 'flex items-center justify-between', children: [p, k] })),
        (e[22] = k),
        (e[23] = p),
        (e[24] = _))
      : (_ = e[24])
    let F
    e[25] === Symbol.for('react.memo_cache_sentinel')
      ? ((F = a.jsx('div', { className: 'bg-green h-1.5 w-1.5 rounded-full' })), (e[25] = F))
      : (F = e[25])
    let C
    e[26] !== l || e[27] !== n
      ? ((C = n('explory.found.locations', { count: l })), (e[26] = l), (e[27] = n), (e[28] = C))
      : (C = e[28])
    let I
    e[29] !== C
      ? ((I = a.jsx('div', {
          className: 'mt-1.5 flex items-center gap-2',
          children: a.jsxs('div', {
            className: 'bg-green/10 ring-green/20 flex items-center gap-1.5 rounded-full px-2.5 py-1 ring-1 ring-inset',
            children: [F, a.jsx('span', { className: 'text-text-secondary text-xs font-medium', children: C })],
          }),
        })),
        (e[29] = C),
        (e[30] = I))
      : (I = e[30])
    let L
    e[31] !== _ || e[32] !== I
      ? ((L = a.jsx('div', {
          className: 'p-5',
          children: a.jsxs(S.div, {
            className: 'flex items-center gap-4',
            initial: f,
            animate: g,
            transition: j,
            children: [h, a.jsxs('div', { className: 'min-w-0 flex-1', children: [_, I] })],
          }),
        })),
        (e[31] = _),
        (e[32] = I),
        (e[33] = L))
      : (L = e[33])
    const B = i && s ? 'auto' : 0,
      R = i && s ? 1 : 0
    let A
    e[34] !== B || e[35] !== R ? ((A = { height: B, opacity: R }), (e[34] = B), (e[35] = R), (e[36] = A)) : (A = e[36])
    let z
    e[37] === Symbol.for('react.memo_cache_sentinel')
      ? ((z = { duration: 0.3, ease: 'easeInOut' }), (e[37] = z))
      : (z = e[37])
    let P
    e[38] !== s || e[39] !== n
      ? ((P =
          s &&
          a.jsxs('div', {
            className: 'border-fill-secondary border-t px-5 pt-4 pb-5',
            children: [
              a.jsxs('div', {
                className: 'mb-4 flex items-center gap-2.5',
                children: [
                  a.jsx('i', { className: 'i-mingcute-location-line text-text-secondary' }),
                  a.jsx('span', {
                    className: 'text-text text-sm font-medium tracking-tight',
                    children: n('explory.shooting.range'),
                  }),
                ],
              }),
              a.jsxs('div', {
                className: 'space-y-3',
                children: [
                  a.jsxs('div', {
                    className: 'bg-fill-vibrant-quinary border-fill-tertiary rounded-xl border p-4',
                    children: [
                      a.jsxs('div', {
                        className:
                          'text-text-secondary mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase',
                        children: [a.jsx('i', { className: 'i-mingcute-arrow-left-down-line text-sm' }), 'Southwest'],
                      }),
                      a.jsxs('div', {
                        className: 'space-y-1',
                        children: [
                          a.jsxs('div', {
                            className: 'text-text flex items-center justify-between',
                            children: [
                              a.jsx('span', { className: 'text-xs font-medium', children: 'Lat' }),
                              a.jsxs('span', {
                                className: 'font-mono text-sm tabular-nums',
                                children: [s.minLat.toFixed(6), '°'],
                              }),
                            ],
                          }),
                          a.jsxs('div', {
                            className: 'text-text flex items-center justify-between',
                            children: [
                              a.jsx('span', { className: 'text-xs font-medium', children: 'Lng' }),
                              a.jsxs('span', {
                                className: 'font-mono text-sm tabular-nums',
                                children: [s.minLng.toFixed(6), '°'],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  a.jsxs('div', {
                    className: 'bg-fill-vibrant-quinary border-fill-tertiary rounded-xl border p-4',
                    children: [
                      a.jsxs('div', {
                        className:
                          'text-text-secondary mb-2 flex items-center gap-2 text-xs font-medium tracking-wide uppercase',
                        children: [a.jsx('i', { className: 'i-mingcute-arrow-right-up-line text-sm' }), 'Northeast'],
                      }),
                      a.jsxs('div', {
                        className: 'space-y-1',
                        children: [
                          a.jsxs('div', {
                            className: 'text-text flex items-center justify-between',
                            children: [
                              a.jsx('span', { className: 'text-xs font-medium', children: 'Lat' }),
                              a.jsxs('span', {
                                className: 'font-mono text-sm tabular-nums',
                                children: [s.maxLat.toFixed(6), '°'],
                              }),
                            ],
                          }),
                          a.jsxs('div', {
                            className: 'text-text flex items-center justify-between',
                            children: [
                              a.jsx('span', { className: 'text-xs font-medium', children: 'Lng' }),
                              a.jsxs('span', {
                                className: 'font-mono text-sm tabular-nums',
                                children: [s.maxLng.toFixed(6), '°'],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              a.jsx('div', {
                className: 'bg-gray/5 mt-4 rounded-xl p-3',
                children: a.jsxs('div', {
                  className: 'text-text-secondary flex items-center gap-2 text-xs',
                  children: [
                    a.jsx('i', { className: 'i-mingcute-grid-line' }),
                    a.jsxs('span', {
                      className: 'font-medium',
                      children: [
                        'Coverage: ~',
                        Math.abs((s.maxLat - s.minLat) * (s.maxLng - s.minLng) * 111 * 111).toFixed(1),
                        ' ',
                        'km²',
                      ],
                    }),
                  ],
                }),
              }),
            ],
          })),
        (e[38] = s),
        (e[39] = n),
        (e[40] = P))
      : (P = e[40])
    let E
    e[41] !== A || e[42] !== P
      ? ((E = a.jsx(S.div, { initial: !1, animate: A, transition: z, className: 'overflow-hidden', children: P })),
        (e[41] = A),
        (e[42] = P),
        (e[43] = E))
      : (E = e[43])
    let G
    return (
      e[44] !== L || e[45] !== E
        ? ((G = a.jsx(S.div, {
            className: 'absolute top-4 right-4 z-40 max-w-xs',
            initial: o,
            animate: d,
            transition: r,
            children: a.jsxs('div', {
              className: 'bg-material-thick border-fill-tertiary rounded-2xl border shadow-2xl backdrop-blur-[120px]',
              children: [L, E],
            }),
          })),
          (e[44] = L),
          (e[45] = E),
          (e[46] = G))
        : (G = e[46]),
      G
    )
  },
  fe = () => {
    const t = w.c(21),
      { t: e } = T()
    let l, s, n
    t[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((l = { opacity: 0, y: 20 }),
        (s = { opacity: 1, y: 0 }),
        (n = { duration: 0.4 }),
        (t[0] = l),
        (t[1] = s),
        (t[2] = n))
      : ((l = t[0]), (s = t[1]), (n = t[2]))
    let i
    t[3] === Symbol.for('react.memo_cache_sentinel')
      ? ((i = a.jsx(S.div, {
          className: 'loading-icon mb-4 text-4xl',
          initial: { scale: 0.8 },
          animate: { scale: 1 },
          transition: { duration: 0.4, delay: 0.1 },
          children: '📍',
        })),
        (t[3] = i))
      : (i = t[3])
    let c, o, d
    t[4] === Symbol.for('react.memo_cache_sentinel')
      ? ((c = { opacity: 0 }),
        (o = { opacity: 1 }),
        (d = { duration: 0.3, delay: 0.2 }),
        (t[4] = c),
        (t[5] = o),
        (t[6] = d))
      : ((c = t[4]), (o = t[5]), (d = t[6]))
    let r
    t[7] !== e ? ((r = e('explory.loading.map')), (t[7] = e), (t[8] = r)) : (r = t[8])
    let f
    t[9] !== r
      ? ((f = a.jsx(S.div, {
          className: 'text-lg font-medium text-gray-900 dark:text-gray-100',
          initial: c,
          animate: o,
          transition: d,
          children: r,
        })),
        (t[9] = r),
        (t[10] = f))
      : (f = t[10])
    let g, j, h
    t[11] === Symbol.for('react.memo_cache_sentinel')
      ? ((h = { opacity: 0 }),
        (g = { opacity: 1 }),
        (j = { duration: 0.3, delay: 0.3 }),
        (t[11] = g),
        (t[12] = j),
        (t[13] = h))
      : ((g = t[11]), (j = t[12]), (h = t[13]))
    let u
    t[14] !== e ? ((u = e('explory.parsing.location')), (t[14] = e), (t[15] = u)) : (u = t[15])
    let p
    t[16] !== u
      ? ((p = a.jsx(S.p, {
          className: 'text-sm text-gray-600 dark:text-gray-400',
          initial: h,
          animate: g,
          transition: j,
          children: u,
        })),
        (t[16] = u),
        (t[17] = p))
      : (p = t[17])
    let b
    return (
      t[18] !== p || t[19] !== f
        ? ((b = a.jsx('div', {
            className: 'flex h-full w-full items-center justify-center',
            children: a.jsxs(S.div, {
              className: 'text-center',
              initial: l,
              animate: s,
              transition: n,
              children: [i, f, p],
            }),
          })),
          (t[18] = p),
          (t[19] = f),
          (t[20] = b))
        : (b = t[20]),
      b
    )
  },
  ue = () => {
    const t = w.c(1)
    let e
    return (
      t[0] === Symbol.for('react.memo_cache_sentinel')
        ? ((e = a.jsx(oe, { children: a.jsx(xe, {}) })), (t[0] = e))
        : (e = t[0]),
      e
    )
  },
  xe = () => {
    const { t } = T(),
      [e, l] = Y(),
      [s, n] = N.useState(!0),
      [i, c] = N.useState(null),
      [o, d] = N.useState([]),
      [r, f] = N.useState(!0),
      g = N.useCallback(
        (y) => {
          const m = new URLSearchParams(e)
          ;(e.get('photoId') === y.id ? m.delete('photoId') : m.set('photoId', y.id), l(m, { replace: !0 }), f(!1))
        },
        [e, l],
      ),
      j = N.useMemo(() => (o.length === 0 ? null : Q(o)), [o])
    N.useEffect(() => {
      ;(async () => {
        ;(n(!0), c(null))
        try {
          const m = D.getPhotos(),
            x = Z(m)
          ;(d(x), console.info(`Found ${x.length} photos with GPS coordinates`))
        } catch (m) {
          const x = m instanceof Error ? m : new Error('Failed to load photo markers')
          ;(c(x), console.error('Failed to load photo markers:', x))
        } finally {
          n(!1)
        }
      })()
    }, [d])
    const {
        latitude: h,
        longitude: u,
        zoom: p,
        photoId: b,
      } = N.useMemo(() => {
        const y = e.get('photoId')
        if (y) {
          const m = D.getPhoto(y),
            x = W(m?.exif ?? null)
          if (x) return { latitude: x.latitude, longitude: x.longitude, zoom: 15, photoId: y }
        }
        return { latitude: null, longitude: null, zoom: null, photoId: y }
      }, [e]),
      M = N.useMemo(
        () => (h !== null && u !== null ? { latitude: h, longitude: u, zoom: p ?? 15 } : V(o)),
        [o, h, u, p],
      )
    return s
      ? a.jsx(fe, {})
      : i
        ? a.jsx('div', {
            className: 'flex h-full w-full items-center justify-center',
            children: a.jsxs('div', {
              className: 'text-center',
              children: [
                a.jsx('div', { className: 'mb-4 text-4xl', children: '❌' }),
                a.jsx('div', {
                  className: 'text-lg font-medium text-red-900 dark:text-red-100',
                  children: t('explory.map.error.title'),
                }),
                a.jsx('p', {
                  className: 'text-sm text-red-600 dark:text-red-400',
                  children: t('explory.map.error.description'),
                }),
              ],
            }),
          })
        : a.jsxs('div', {
            className: 'absolute h-full w-full',
            children: [
              a.jsx(de, {}),
              a.jsx(me, { markersCount: o.length, bounds: j }),
              a.jsx(S.div, {
                initial: { opacity: 0, scale: 1.02 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.6, delay: 0.1 },
                className: 'h-full w-full',
                children: a.jsx(ce, {
                  markers: o,
                  initialViewState: M,
                  autoFitBounds: r && h === null && u === null,
                  selectedMarkerId: b,
                  onMarkerClick: g,
                  className: 'h-full w-full',
                }),
              }),
            ],
          })
  },
  ge = Object.freeze(
    Object.defineProperty({ __proto__: null, MapSection: ue }, Symbol.toStringTag, { value: 'Module' }),
  )
export { ee as G, ge as M }
