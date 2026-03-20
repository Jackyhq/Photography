import { r as y, c as Z, j as h, R as C } from '../vendor/1-CkNOVE2J.js'
import {
  g as kt,
  f as Wn,
  r as Vn,
  s as Yn,
  d as qn,
  b as Kn,
  n as Xn,
  a as Gn,
  o as ct,
  c as $t,
  e as Jn,
  h as Qn,
  i as Zn,
  j as er,
  k as tr,
  l as nr,
  m as rr,
  q as sr,
  t as ar,
  u as or,
  v as ir,
  w as lr,
  x as cr,
  y as ur,
  z as dr,
  A as fr,
  C as mr,
  D as It,
  E as hr,
  F as gr,
  G as pr,
  H as nn,
  I as st,
  J as he,
  K as jt,
  L as rn,
  O as vr,
  M as yr,
  P as xr,
  R as wr,
  N as Pt,
  Q as ke,
  T as br,
  U as Sr,
  V as Rr,
  B as pt,
  W as Et,
  X as Cr,
  Y as sn,
  Z as an,
  _ as Tr,
  $ as Nt,
  a0 as jr,
  a1 as vt,
  a2 as on,
  a3 as ue,
  a4 as Pr,
  a5 as ln,
  a6 as Mt,
  a7 as ut,
  a8 as Er,
  a9 as Nr,
  aa as Mr,
  ab as Lr,
  ac as cn,
  ad as Or,
  ae as un,
  af as Dr,
  S as _r,
  ag as Ar,
  ah as kr,
  p as Ft,
  ai as $r,
} from './index-BKwr2PMi.js'
import { u as Fe, g as Ir, i as zt, I as Fr } from './image-loader-manager-CSc4hxVB.js'
import { u as ve, s as zr } from '../vendor/2-VRqxSGaj.js'
import { T as Hr } from './index-C-KXgnzn.js'
import '../vendor/0-BOriIG77.js'
function Ur(t, e) {
  return t === e || (Number.isNaN(t) && Number.isNaN(e))
}
function Ht(t) {
  if (!t || typeof t != 'object') return !1
  const e = Object.getPrototypeOf(t)
  return e === null || e === Object.prototype || Object.getPrototypeOf(e) === null
    ? Object.prototype.toString.call(t) === '[object Object]'
    : !1
}
function Br(t, e, n) {
  return We(t, e, void 0, void 0, void 0, void 0, n)
}
function We(t, e, n, r, a, s, o) {
  const l = o(t, e, n, r, a, s)
  if (l !== void 0) return l
  if (typeof t == typeof e)
    switch (typeof t) {
      case 'bigint':
      case 'string':
      case 'boolean':
      case 'symbol':
      case 'undefined':
        return t === e
      case 'number':
        return t === e || Object.is(t, e)
      case 'function':
        return t === e
      case 'object':
        return Ve(t, e, s, o)
    }
  return Ve(t, e, s, o)
}
function Ve(t, e, n, r) {
  if (Object.is(t, e)) return !0
  let a = kt(t),
    s = kt(e)
  if ((a === It && (a = ct), s === It && (s = ct), a !== s)) return !1
  switch (a) {
    case Gn:
      return t.toString() === e.toString()
    case Xn: {
      const u = t.valueOf(),
        d = e.valueOf()
      return Ur(u, d)
    }
    case Kn:
    case qn:
    case Yn:
      return Object.is(t.valueOf(), e.valueOf())
    case Vn:
      return t.source === e.source && t.flags === e.flags
    case Wn:
      return t === e
  }
  n = n ?? new Map()
  const o = n.get(t),
    l = n.get(e)
  if (o != null && l != null) return o === e
  ;(n.set(t, e), n.set(e, t))
  try {
    switch (a) {
      case mr: {
        if (t.size !== e.size) return !1
        for (const [u, d] of t.entries()) if (!e.has(u) || !We(d, e.get(u), u, t, e, n, r)) return !1
        return !0
      }
      case fr: {
        if (t.size !== e.size) return !1
        const u = Array.from(t.values()),
          d = Array.from(e.values())
        for (let i = 0; i < u.length; i++) {
          const f = u[i],
            c = d.findIndex((m) => We(f, m, void 0, t, e, n, r))
          if (c === -1) return !1
          d.splice(c, 1)
        }
        return !0
      }
      case dr:
      case ur:
      case cr:
      case lr:
      case ir:
      case or:
      case ar:
      case sr:
      case rr:
      case nr:
      case tr:
      case er: {
        if ((typeof Buffer < 'u' && Buffer.isBuffer(t) !== Buffer.isBuffer(e)) || t.length !== e.length) return !1
        for (let u = 0; u < t.length; u++) if (!We(t[u], e[u], u, t, e, n, r)) return !1
        return !0
      }
      case Zn:
        return t.byteLength !== e.byteLength ? !1 : Ve(new Uint8Array(t), new Uint8Array(e), n, r)
      case Qn:
        return t.byteLength !== e.byteLength || t.byteOffset !== e.byteOffset
          ? !1
          : Ve(new Uint8Array(t), new Uint8Array(e), n, r)
      case Jn:
        return t.name === e.name && t.message === e.message
      case ct: {
        if (!(Ve(t.constructor, e.constructor, n, r) || (Ht(t) && Ht(e)))) return !1
        const d = [...Object.keys(t), ...$t(t)],
          i = [...Object.keys(e), ...$t(e)]
        if (d.length !== i.length) return !1
        for (let f = 0; f < d.length; f++) {
          const c = d[f],
            m = t[c]
          if (!Object.hasOwn(e, c)) return !1
          const g = e[c]
          if (!We(m, g, c, t, e, n, r)) return !1
        }
        return !0
      }
      default:
        return !1
    }
  } finally {
    ;(n.delete(t), n.delete(e))
  }
}
function Wr(t, e) {
  return Br(t, e, hr)
}
function Vr() {
  const t = y.useRef(!1)
  return (
    gr(
      () => (
        (t.current = !0),
        () => {
          t.current = !1
        }
      ),
      [],
    ),
    t
  )
}
function Yr() {
  const t = Vr(),
    [e, n] = y.useState(0),
    r = y.useCallback(() => {
      t.current && n(e + 1)
    }, [e])
  return [y.useCallback(() => pr.postRender(r), [r]), e]
}
const dn = () => y.use(nn),
  yt = y.memo((t) => {
    const e = Z.c(21),
      { dateRange: n, location: r, isVisible: a, className: s } = t,
      { t: o } = ve()
    let l
    e[0] !== o ? ((l = (w) => o(`date.day.${w}`)), (e[0] = o), (e[1] = l)) : (l = e[1])
    const u = l
    let d
    e[2] !== o ? ((d = (w) => o(`date.month.${w}`)), (e[2] = o), (e[3] = d)) : (d = e[3])
    const i = d
    let f
    e[4] !== u || e[5] !== i
      ? ((f = (w) => {
          const D = w.match(/(\d{4})年(\d+)月\s*-\s*(\d{4})年(\d+)月/)
          if (D) {
            const [, P, E, O, k] = D
            return `${i(E)} ${P} - ${i(k)} ${O}`
          }
          const F = w.match(/(\d{4})年(\d+)月(\d+)日?\s*-\s*(\d+)月(\d+)日?/)
          if (F) {
            const [, P, E, O, k, R] = F
            return `${i(E)} ${u(O)} - ${i(k)} ${u(R)} ${P}`
          }
          const T = w.match(/(\d{4})年(\d+)月\s*-\s*(\d+)月/)
          if (T) {
            const [, P, E, O] = T
            return `${i(E)} - ${i(O)} ${P}`
          }
          const N = w.match(/(\d{4})年(\d+)月(\d+)日/)
          if (N) {
            const [, P, E, O] = N
            return `${i(E)} ${u(O)} ${P}`
          }
          return w
        }),
        (e[4] = u),
        (e[5] = i),
        (e[6] = f))
      : (f = e[6])
    const c = f,
      m = Fe()
    let g
    e[7] !== m
      ? ((g = m
          ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
          : { initial: { opacity: 0, x: -20, scale: 0.95 }, animate: { opacity: 1, x: 0, scale: 1 } }),
        (e[7] = m),
        (e[8] = g))
      : (g = e[8])
    const p = g
    let b
    e[9] !== n || e[10] !== c ? ((b = c(n)), (e[9] = n), (e[10] = c), (e[11] = b)) : (b = e[11])
    const v = b
    let x
    e[12] !== s || e[13] !== n || e[14] !== v || e[15] !== a || e[16] !== r || e[17] !== p
      ? ((x =
          a &&
          n &&
          h.jsx(st.div, {
            initial: p.initial,
            animate: p.animate,
            exit: p.initial,
            transition: jt.presets.snappy,
            className: he(
              'border-material-opaque lg:rounded-xl border bg-black/60 p-4 shadow-2xl backdrop-blur-[70px]',
              'fixed left-4 z-50 top-4 lg:top-6 lg:left-6',
              s,
            ),
            children: h.jsxs('div', {
              className: 'flex flex-col',
              children: [
                h.jsx('span', {
                  className: 'text-lg leading-tight font-bold tracking-tight text-white lg:text-4xl',
                  children: v,
                }),
                r &&
                  h.jsx('span', {
                    className: 'mt-0.5 text-sm font-medium text-white/75 lg:mt-1 lg:text-lg',
                    children: r,
                  }),
              ],
            }),
          })),
        (e[12] = s),
        (e[13] = n),
        (e[14] = v),
        (e[15] = a),
        (e[16] = r),
        (e[17] = p),
        (e[18] = x))
      : (x = e[18])
    let S
    return (e[19] !== x ? ((S = h.jsx(rn, { children: x })), (e[19] = x), (e[20] = S)) : (S = e[20]), S)
  })
yt.displayName = 'DateRangeIndicator'
const qr = (t) => {
  const [e, n] = y.useState({ startDate: null, endDate: null, formattedRange: '', location: void 0 }),
    r = y.useRef({ start: 0, end: 0 }),
    a = y.useCallback((i) => {
      if (i.exif?.DateTimeOriginal) {
        const c = i.exif.DateTimeOriginal.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3'),
          m = new Date(c)
        if (!Number.isNaN(m.getTime())) return m
      }
      return new Date(i.lastModified)
    }, []),
    { i18n: s } = ve(),
    o = y.useCallback(
      (i, f) => {
        const c = i.getFullYear(),
          m = f.getFullYear(),
          g = i.getMonth(),
          p = f.getMonth()
        return i.toDateString() === f.toDateString()
          ? i.toLocaleDateString(s.language, { year: 'numeric', month: 'long', day: 'numeric' })
          : c === m
            ? g === p
              ? `${c}年${i.getMonth() + 1}月${i.getDate()}日 - ${f.getDate()}日`
              : `${c}年${i.getMonth() + 1}月 - ${f.getMonth() + 1}月`
            : `${c}年${i.getMonth() + 1}月 - ${m}年${f.getMonth() + 1}月`
      },
      [s.language],
    ),
    l = y.useCallback((i) => {
      for (const f of i)
        if (f.tags) {
          const c = f.tags.find(
            (m) =>
              m.includes('省') ||
              m.includes('市') ||
              m.includes('区') ||
              m.includes('县') ||
              m.includes('镇') ||
              m.includes('村') ||
              m.includes('街道') ||
              m.includes('路') ||
              m.includes('北京') ||
              m.includes('上海') ||
              m.includes('广州') ||
              m.includes('深圳') ||
              m.includes('杭州') ||
              m.includes('南京') ||
              m.includes('成都'),
          )
          if (c) return c
        }
    }, []),
    u = y.useCallback(
      (i, f, c) => {
        if (!c || c.length === 0) {
          n({ startDate: null, endDate: null, formattedRange: '', location: void 0 })
          return
        }
        const m = c.slice(i, f + 1).filter((S) => S && typeof S == 'object' && 'id' in S)
        if (m.length === 0) {
          n({ startDate: null, endDate: null, formattedRange: '', location: void 0 })
          return
        }
        const g = m.map((S) => a(S)).sort((S, w) => S.getTime() - w.getTime()),
          p = g[0],
          b = g.at(-1)
        if (!p || !b) {
          n({ startDate: null, endDate: null, formattedRange: '', location: void 0 })
          return
        }
        const v = o(p, b),
          x = l(m)
        ;(n({ startDate: p, endDate: b, formattedRange: v, location: x }), (r.current = { start: i, end: f }))
      },
      [a, o],
    ),
    d = y.useCallback(
      (i, f, c) => {
        u(i, f, c)
      },
      [u],
    )
  return { dateRange: e, handleRender: d, currentRange: r.current }
}
function Kr(t) {
  if (typeof document > 'u') return
  let e = document.head || document.getElementsByTagName('head')[0],
    n = document.createElement('style')
  ;((n.type = 'text/css'),
    e.appendChild(n),
    n.styleSheet ? (n.styleSheet.cssText = t) : n.appendChild(document.createTextNode(t)))
}
const fn = C.createContext({
    drawerRef: { current: null },
    overlayRef: { current: null },
    onPress: () => {},
    onRelease: () => {},
    onDrag: () => {},
    onNestedDrag: () => {},
    onNestedOpenChange: () => {},
    onNestedRelease: () => {},
    openProp: void 0,
    dismissible: !1,
    isOpen: !1,
    isDragging: !1,
    keyboardIsOpen: { current: !1 },
    snapPointsOffset: null,
    snapPoints: null,
    handleOnly: !1,
    modal: !1,
    shouldFade: !1,
    activeSnapPoint: null,
    onOpenChange: () => {},
    setActiveSnapPoint: () => {},
    closeDrawer: () => {},
    direction: 'bottom',
    shouldAnimate: { current: !0 },
    shouldScaleBackground: !1,
    setBackgroundColorOnScale: !0,
    noBodyStyles: !1,
    container: null,
    autoFocus: !1,
  }),
  Xe = () => {
    const t = C.useContext(fn)
    if (!t) throw new Error('useDrawerContext must be used within a Drawer.Root')
    return t
  }
Kr(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}`)
function Xr() {
  const t = navigator.userAgent
  return typeof window < 'u' && ((/Firefox/.test(t) && /Mobile/.test(t)) || /FxiOS/.test(t))
}
function Gr() {
  return Lt(/^Mac/)
}
function Jr() {
  return Lt(/^iPhone/)
}
function Ut() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}
function Qr() {
  return Lt(/^iPad/) || (Gr() && navigator.maxTouchPoints > 1)
}
function mn() {
  return Jr() || Qr()
}
function Lt(t) {
  return typeof window < 'u' && window.navigator != null ? t.test(window.navigator.platform) : void 0
}
const Zr = 24,
  es = typeof window < 'u' ? y.useLayoutEffect : y.useEffect
function Bt(...t) {
  return (...e) => {
    for (let n of t) typeof n == 'function' && n(...e)
  }
}
const dt = typeof document < 'u' && window.visualViewport
function Wt(t) {
  let e = window.getComputedStyle(t)
  return /(auto|scroll)/.test(e.overflow + e.overflowX + e.overflowY)
}
function hn(t) {
  for (Wt(t) && (t = t.parentElement); t && !Wt(t); ) t = t.parentElement
  return t || document.scrollingElement || document.documentElement
}
const ts = new Set(['checkbox', 'radio', 'range', 'color', 'file', 'image', 'button', 'submit', 'reset'])
let Je = 0,
  ft
function ns(t = {}) {
  let { isDisabled: e } = t
  es(() => {
    if (!e)
      return (
        Je++,
        Je === 1 && mn() && (ft = rs()),
        () => {
          ;(Je--, Je === 0 && ft?.())
        }
      )
  }, [e])
}
function rs() {
  let t,
    e = 0,
    n = (f) => {
      ;((t = hn(f.target)), !(t === document.documentElement && t === document.body) && (e = f.changedTouches[0].pageY))
    },
    r = (f) => {
      if (!t || t === document.documentElement || t === document.body) {
        f.preventDefault()
        return
      }
      let c = f.changedTouches[0].pageY,
        m = t.scrollTop,
        g = t.scrollHeight - t.clientHeight
      g !== 0 && (((m <= 0 && c > e) || (m >= g && c < e)) && f.preventDefault(), (e = c))
    },
    a = (f) => {
      let c = f.target
      xt(c) &&
        c !== document.activeElement &&
        (f.preventDefault(),
        (c.style.transform = 'translateY(-2000px)'),
        c.focus(),
        requestAnimationFrame(() => {
          c.style.transform = ''
        }))
    },
    s = (f) => {
      let c = f.target
      xt(c) &&
        ((c.style.transform = 'translateY(-2000px)'),
        requestAnimationFrame(() => {
          ;((c.style.transform = ''),
            dt &&
              (dt.height < window.innerHeight
                ? requestAnimationFrame(() => {
                    Vt(c)
                  })
                : dt.addEventListener('resize', () => Vt(c), { once: !0 })))
        }))
    },
    o = () => {
      window.scrollTo(0, 0)
    },
    l = window.pageXOffset,
    u = window.pageYOffset,
    d = Bt(
      ss(document.documentElement, 'paddingRight', `${window.innerWidth - document.documentElement.clientWidth}px`),
    )
  window.scrollTo(0, 0)
  let i = Bt(
    Ue(document, 'touchstart', n, { passive: !1, capture: !0 }),
    Ue(document, 'touchmove', r, { passive: !1, capture: !0 }),
    Ue(document, 'touchend', a, { passive: !1, capture: !0 }),
    Ue(document, 'focus', s, !0),
    Ue(window, 'scroll', o),
  )
  return () => {
    ;(d(), i(), window.scrollTo(l, u))
  }
}
function ss(t, e, n) {
  let r = t.style[e]
  return (
    (t.style[e] = n),
    () => {
      t.style[e] = r
    }
  )
}
function Ue(t, e, n, r) {
  return (
    t.addEventListener(e, n, r),
    () => {
      t.removeEventListener(e, n, r)
    }
  )
}
function Vt(t) {
  let e = document.scrollingElement || document.documentElement
  for (; t && t !== e; ) {
    let n = hn(t)
    if (n !== document.documentElement && n !== document.body && n !== t) {
      let r = n.getBoundingClientRect().top,
        a = t.getBoundingClientRect().top,
        s = t.getBoundingClientRect().bottom
      const o = n.getBoundingClientRect().bottom + Zr
      s > o && (n.scrollTop += a - r)
    }
    t = n.parentElement
  }
}
function xt(t) {
  return (
    (t instanceof HTMLInputElement && !ts.has(t.type)) ||
    t instanceof HTMLTextAreaElement ||
    (t instanceof HTMLElement && t.isContentEditable)
  )
}
function as(t, e) {
  typeof t == 'function' ? t(e) : t != null && (t.current = e)
}
function os(...t) {
  return (e) => t.forEach((n) => as(n, e))
}
function gn(...t) {
  return y.useCallback(os(...t), t)
}
const pn = new WeakMap()
function ne(t, e, n = !1) {
  if (!t || !(t instanceof HTMLElement)) return
  let r = {}
  ;(Object.entries(e).forEach(([a, s]) => {
    if (a.startsWith('--')) {
      t.style.setProperty(a, s)
      return
    }
    ;((r[a] = t.style[a]), (t.style[a] = s))
  }),
    !n && pn.set(t, r))
}
function is(t, e) {
  if (!t || !(t instanceof HTMLElement)) return
  let n = pn.get(t)
  n && (t.style[e] = n[e])
}
const Q = (t) => {
  switch (t) {
    case 'top':
    case 'bottom':
      return !0
    case 'left':
    case 'right':
      return !1
    default:
      return t
  }
}
function Qe(t, e) {
  if (!t) return null
  const n = window.getComputedStyle(t),
    r = n.transform || n.webkitTransform || n.mozTransform
  let a = r.match(/^matrix3d\((.+)\)$/)
  return a
    ? parseFloat(a[1].split(', ')[Q(e) ? 13 : 12])
    : ((a = r.match(/^matrix\((.+)\)$/)), a ? parseFloat(a[1].split(', ')[Q(e) ? 5 : 4]) : null)
}
function ls(t) {
  return 8 * (Math.log(t + 1) - 2)
}
function mt(t, e) {
  if (!t) return () => {}
  const n = t.style.cssText
  return (
    Object.assign(t.style, e),
    () => {
      t.style.cssText = n
    }
  )
}
function cs(...t) {
  return (...e) => {
    for (const n of t) typeof n == 'function' && n(...e)
  }
}
const X = { DURATION: 0.5, EASE: [0.32, 0.72, 0, 1] },
  vn = 0.4,
  us = 0.25,
  ds = 100,
  yn = 8,
  _e = 16,
  wt = 26,
  ht = 'vaul-dragging'
function xn(t) {
  const e = C.useRef(t)
  return (
    C.useEffect(() => {
      e.current = t
    }),
    C.useMemo(
      () =>
        (...n) =>
          e.current == null ? void 0 : e.current.call(e, ...n),
      [],
    )
  )
}
function fs({ defaultProp: t, onChange: e }) {
  const n = C.useState(t),
    [r] = n,
    a = C.useRef(r),
    s = xn(e)
  return (
    C.useEffect(() => {
      a.current !== r && (s(r), (a.current = r))
    }, [r, a, s]),
    n
  )
}
function wn({ prop: t, defaultProp: e, onChange: n = () => {} }) {
  const [r, a] = fs({ defaultProp: e, onChange: n }),
    s = t !== void 0,
    o = s ? t : r,
    l = xn(n),
    u = C.useCallback(
      (d) => {
        if (s) {
          const f = typeof d == 'function' ? d(t) : d
          f !== t && l(f)
        } else a(d)
      },
      [s, t, a, l],
    )
  return [o, u]
}
function ms({
  activeSnapPointProp: t,
  setActiveSnapPointProp: e,
  snapPoints: n,
  drawerRef: r,
  overlayRef: a,
  fadeFromIndex: s,
  onSnapPointChange: o,
  direction: l = 'bottom',
  container: u,
  snapToSequentialPoint: d,
}) {
  const [i, f] = wn({ prop: t, defaultProp: n?.[0], onChange: e }),
    [c, m] = C.useState(
      typeof window < 'u' ? { innerWidth: window.innerWidth, innerHeight: window.innerHeight } : void 0,
    )
  C.useEffect(() => {
    function T() {
      m({ innerWidth: window.innerWidth, innerHeight: window.innerHeight })
    }
    return (window.addEventListener('resize', T), () => window.removeEventListener('resize', T))
  }, [])
  const g = C.useMemo(() => i === n?.[n.length - 1] || null, [n, i]),
    p = C.useMemo(() => {
      var T
      return (T = n?.findIndex((N) => N === i)) != null ? T : null
    }, [n, i]),
    b = (n && n.length > 0 && (s || s === 0) && !Number.isNaN(s) && n[s] === i) || !n,
    v = C.useMemo(() => {
      const T = u
        ? { width: u.getBoundingClientRect().width, height: u.getBoundingClientRect().height }
        : typeof window < 'u'
          ? { width: window.innerWidth, height: window.innerHeight }
          : { width: 0, height: 0 }
      var N
      return (N = n?.map((P) => {
        const E = typeof P == 'string'
        let O = 0
        if ((E && (O = parseInt(P, 10)), Q(l))) {
          const R = E ? O : c ? P * T.height : 0
          return c ? (l === 'bottom' ? T.height - R : -T.height + R) : R
        }
        const k = E ? O : c ? P * T.width : 0
        return c ? (l === 'right' ? T.width - k : -T.width + k) : k
      })) != null
        ? N
        : []
    }, [n, c, u]),
    x = C.useMemo(() => (p !== null ? v?.[p] : null), [v, p]),
    S = C.useCallback(
      (T) => {
        var N
        const P = (N = v?.findIndex((E) => E === T)) != null ? N : null
        ;(o(P),
          ne(r.current, {
            transition: `transform ${X.DURATION}s cubic-bezier(${X.EASE.join(',')})`,
            transform: Q(l) ? `translate3d(0, ${T}px, 0)` : `translate3d(${T}px, 0, 0)`,
          }),
          v && P !== v.length - 1 && s !== void 0 && P !== s && P < s
            ? ne(a.current, { transition: `opacity ${X.DURATION}s cubic-bezier(${X.EASE.join(',')})`, opacity: '0' })
            : ne(a.current, { transition: `opacity ${X.DURATION}s cubic-bezier(${X.EASE.join(',')})`, opacity: '1' }),
          f(n?.[Math.max(P, 0)]))
      },
      [r.current, n, v, s, a, f],
    )
  C.useEffect(() => {
    if (i || t) {
      var T
      const N = (T = n?.findIndex((P) => P === t || P === i)) != null ? T : -1
      v && N !== -1 && typeof v[N] == 'number' && S(v[N])
    }
  }, [i, t, n, v, S])
  function w({ draggedDistance: T, closeDrawer: N, velocity: P, dismissible: E }) {
    if (s === void 0) return
    const O = l === 'bottom' || l === 'right' ? (x ?? 0) - T : (x ?? 0) + T,
      k = p === s - 1,
      R = p === 0,
      B = T > 0
    if (
      (k && ne(a.current, { transition: `opacity ${X.DURATION}s cubic-bezier(${X.EASE.join(',')})` }),
      !d && P > 2 && !B)
    ) {
      E ? N() : S(v[0])
      return
    }
    if (!d && P > 2 && B && v && n) {
      S(v[n.length - 1])
      return
    }
    const z = v?.reduce((j, _) =>
        typeof j != 'number' || typeof _ != 'number' ? j : Math.abs(_ - O) < Math.abs(j - O) ? _ : j,
      ),
      H = Q(l) ? window.innerHeight : window.innerWidth
    if (P > vn && Math.abs(T) < H * 0.4) {
      const j = B ? 1 : -1
      if (j > 0 && g && n) {
        S(v[n.length - 1])
        return
      }
      if ((R && j < 0 && E && N(), p === null)) return
      S(v[p + j])
      return
    }
    S(z)
  }
  function D({ draggedDistance: T }) {
    if (x === null) return
    const N = l === 'bottom' || l === 'right' ? x - T : x + T
    ;((l === 'bottom' || l === 'right') && N < v[v.length - 1]) ||
      ((l === 'top' || l === 'left') && N > v[v.length - 1]) ||
      ne(r.current, { transform: Q(l) ? `translate3d(0, ${N}px, 0)` : `translate3d(${N}px, 0, 0)` })
  }
  function F(T, N) {
    if (!n || typeof p != 'number' || !v || s === void 0) return null
    const P = p === s - 1
    if (p >= s && N) return 0
    if (P && !N) return 1
    if (!b && !P) return null
    const O = P ? p + 1 : p - 1,
      k = P ? v[O] - v[O - 1] : v[O + 1] - v[O],
      R = T / Math.abs(k)
    return P ? 1 - R : R
  }
  return {
    isLastSnapPoint: g,
    activeSnapPoint: i,
    shouldFade: b,
    getPercentageDragged: F,
    setActiveSnapPoint: f,
    activeSnapPointIndex: p,
    onRelease: w,
    onDrag: D,
    snapPointsOffset: v,
  }
}
const hs = () => () => {}
function gs() {
  const { direction: t, isOpen: e, shouldScaleBackground: n, setBackgroundColorOnScale: r, noBodyStyles: a } = Xe(),
    s = C.useRef(null),
    o = y.useMemo(() => document.body.style.backgroundColor, [])
  function l() {
    return (window.innerWidth - wt) / window.innerWidth
  }
  C.useEffect(() => {
    if (e && n) {
      s.current && clearTimeout(s.current)
      const u = document.querySelector('[data-vaul-drawer-wrapper]') || document.querySelector('[vaul-drawer-wrapper]')
      if (!u) return
      cs(
        r && !a ? mt(document.body, { background: 'black' }) : hs,
        mt(u, {
          transformOrigin: Q(t) ? 'top' : 'left',
          transitionProperty: 'transform, border-radius',
          transitionDuration: `${X.DURATION}s`,
          transitionTimingFunction: `cubic-bezier(${X.EASE.join(',')})`,
        }),
      )
      const d = mt(u, {
        borderRadius: `${yn}px`,
        overflow: 'hidden',
        ...(Q(t)
          ? { transform: `scale(${l()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)` }
          : { transform: `scale(${l()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)` }),
      })
      return () => {
        ;(d(),
          (s.current = window.setTimeout(() => {
            o ? (document.body.style.background = o) : document.body.style.removeProperty('background')
          }, X.DURATION * 1e3)))
      }
    }
  }, [e, n, o])
}
let Be = null
function ps({ isOpen: t, modal: e, nested: n, hasBeenOpened: r, preventScrollRestoration: a, noBodyStyles: s }) {
  const [o, l] = C.useState(() => (typeof window < 'u' ? window.location.href : '')),
    u = C.useRef(0),
    d = C.useCallback(() => {
      if (Ut() && Be === null && t && !s) {
        Be = {
          position: document.body.style.position,
          top: document.body.style.top,
          left: document.body.style.left,
          height: document.body.style.height,
          right: 'unset',
        }
        const { scrollX: f, innerHeight: c } = window
        ;(document.body.style.setProperty('position', 'fixed', 'important'),
          Object.assign(document.body.style, { top: `${-u.current}px`, left: `${-f}px`, right: '0px', height: 'auto' }),
          window.setTimeout(
            () =>
              window.requestAnimationFrame(() => {
                const m = c - window.innerHeight
                m && u.current >= c && (document.body.style.top = `${-(u.current + m)}px`)
              }),
            300,
          ))
      }
    }, [t]),
    i = C.useCallback(() => {
      if (Ut() && Be !== null && !s) {
        const f = -parseInt(document.body.style.top, 10),
          c = -parseInt(document.body.style.left, 10)
        ;(Object.assign(document.body.style, Be),
          window.requestAnimationFrame(() => {
            if (a && o !== window.location.href) {
              l(window.location.href)
              return
            }
            window.scrollTo(c, f)
          }),
          (Be = null))
      }
    }, [o])
  return (
    C.useEffect(() => {
      function f() {
        u.current = window.scrollY
      }
      return (
        f(),
        window.addEventListener('scroll', f),
        () => {
          window.removeEventListener('scroll', f)
        }
      )
    }, []),
    C.useEffect(() => {
      if (e)
        return () => {
          typeof document > 'u' || document.querySelector('[data-vaul-drawer]') || i()
        }
    }, [e, i]),
    C.useEffect(() => {
      n ||
        !r ||
        (t
          ? (!window.matchMedia('(display-mode: standalone)').matches && d(),
            e ||
              window.setTimeout(() => {
                i()
              }, 500))
          : i())
    }, [t, r, o, e, n, d, i]),
    { restorePositionSetting: i }
  )
}
function vs({
  open: t,
  onOpenChange: e,
  children: n,
  onDrag: r,
  onRelease: a,
  snapPoints: s,
  shouldScaleBackground: o = !1,
  setBackgroundColorOnScale: l = !0,
  closeThreshold: u = us,
  scrollLockTimeout: d = ds,
  dismissible: i = !0,
  handleOnly: f = !1,
  fadeFromIndex: c = s && s.length - 1,
  activeSnapPoint: m,
  setActiveSnapPoint: g,
  fixed: p,
  modal: b = !0,
  onClose: v,
  nested: x,
  noBodyStyles: S = !1,
  direction: w = 'bottom',
  defaultOpen: D = !1,
  disablePreventScroll: F = !0,
  snapToSequentialPoint: T = !1,
  preventScrollRestoration: N = !1,
  repositionInputs: P = !0,
  onAnimationEnd: E,
  container: O,
  autoFocus: k = !1,
}) {
  var R, B
  const [z = !1, H] = wn({
      defaultProp: D,
      prop: t,
      onChange: (L) => {
        ;(e?.(L),
          !L && !x && lt(),
          setTimeout(() => {
            E?.(L)
          }, X.DURATION * 1e3),
          L &&
            !b &&
            typeof window < 'u' &&
            window.requestAnimationFrame(() => {
              document.body.style.pointerEvents = 'auto'
            }),
          L || (document.body.style.pointerEvents = 'auto'))
      },
    }),
    [j, _] = C.useState(!1),
    [A, Y] = C.useState(!1),
    [V, ee] = C.useState(!1),
    ie = C.useRef(null),
    G = C.useRef(null),
    re = C.useRef(null),
    se = C.useRef(null),
    te = C.useRef(null),
    ae = C.useRef(!1),
    de = C.useRef(null),
    Me = C.useRef(0),
    fe = C.useRef(!1),
    ye = C.useRef(!D),
    xe = C.useRef(0),
    M = C.useRef(null),
    we = C.useRef(((R = M.current) == null ? void 0 : R.getBoundingClientRect().height) || 0),
    be = C.useRef(((B = M.current) == null ? void 0 : B.getBoundingClientRect().width) || 0),
    ge = C.useRef(0),
    Se = C.useCallback((L) => {
      s && L === Te.length - 1 && (G.current = new Date())
    }, []),
    {
      activeSnapPoint: $e,
      activeSnapPointIndex: q,
      setActiveSnapPoint: Re,
      onRelease: Ce,
      snapPointsOffset: Te,
      onDrag: Le,
      shouldFade: ze,
      getPercentageDragged: it,
    } = ms({
      snapPoints: s,
      activeSnapPointProp: m,
      setActiveSnapPointProp: g,
      drawerRef: M,
      fadeFromIndex: c,
      overlayRef: ie,
      onSnapPointChange: Se,
      direction: w,
      container: O,
      snapToSequentialPoint: T,
    })
  ns({ isDisabled: !z || A || !b || V || !j || !P || !F })
  const { restorePositionSetting: lt } = ps({
    isOpen: z,
    modal: b,
    nested: x ?? !1,
    hasBeenOpened: j,
    preventScrollRestoration: N,
    noBodyStyles: S,
  })
  function Oe() {
    return (window.innerWidth - wt) / window.innerWidth
  }
  function $n(L) {
    var U, W
    ;(!i && !s) ||
      (M.current && !M.current.contains(L.target)) ||
      ((we.current = ((U = M.current) == null ? void 0 : U.getBoundingClientRect().height) || 0),
      (be.current = ((W = M.current) == null ? void 0 : W.getBoundingClientRect().width) || 0),
      Y(!0),
      (re.current = new Date()),
      mn() && window.addEventListener('touchend', () => (ae.current = !1), { once: !0 }),
      L.target.setPointerCapture(L.pointerId),
      (Me.current = Q(w) ? L.pageY : L.pageX))
  }
  function Dt(L, U) {
    var W
    let $ = L
    const J = (W = window.getSelection()) == null ? void 0 : W.toString(),
      ce = M.current ? Qe(M.current, w) : null,
      le = new Date()
    if ($.tagName === 'SELECT' || $.hasAttribute('data-vaul-no-drag') || $.closest('[data-vaul-no-drag]')) return !1
    if (w === 'right' || w === 'left') return !0
    if (G.current && le.getTime() - G.current.getTime() < 500) return !1
    if (ce !== null && (w === 'bottom' ? ce > 0 : ce < 0)) return !0
    if (J && J.length > 0) return !1
    if ((te.current && le.getTime() - te.current.getTime() < d && ce === 0) || U) return ((te.current = le), !1)
    for (; $; ) {
      if ($.scrollHeight > $.clientHeight) {
        if ($.scrollTop !== 0) return ((te.current = new Date()), !1)
        if ($.getAttribute('role') === 'dialog') return !0
      }
      $ = $.parentNode
    }
    return !0
  }
  function In(L) {
    if (M.current && A) {
      const U = w === 'bottom' || w === 'right' ? 1 : -1,
        W = (Me.current - (Q(w) ? L.pageY : L.pageX)) * U,
        $ = W > 0,
        J = s && !i && !$
      if (J && q === 0) return
      const ce = Math.abs(W),
        le = document.querySelector('[data-vaul-drawer-wrapper]'),
        je = w === 'bottom' || w === 'top' ? we.current : be.current
      let me = ce / je
      const De = it(ce, $)
      if ((De !== null && (me = De), (J && me >= 1) || (!ae.current && !Dt(L.target, $)))) return
      if (
        (M.current.classList.add(ht),
        (ae.current = !0),
        ne(M.current, { transition: 'none' }),
        ne(ie.current, { transition: 'none' }),
        s && Le({ draggedDistance: W }),
        $ && !s)
      ) {
        const pe = ls(W),
          Ge = Math.min(pe * -1, 0) * U
        ne(M.current, { transform: Q(w) ? `translate3d(0, ${Ge}px, 0)` : `translate3d(${Ge}px, 0, 0)` })
        return
      }
      const Pe = 1 - me
      if (
        ((ze || (c && q === c - 1)) && (r?.(L, me), ne(ie.current, { opacity: `${Pe}`, transition: 'none' }, !0)),
        le && ie.current && o)
      ) {
        const pe = Math.min(Oe() + me * (1 - Oe()), 1),
          Ge = 8 - me * 8,
          At = Math.max(0, 14 - me * 14)
        ne(
          le,
          {
            borderRadius: `${Ge}px`,
            transform: Q(w) ? `scale(${pe}) translate3d(0, ${At}px, 0)` : `scale(${pe}) translate3d(${At}px, 0, 0)`,
            transition: 'none',
          },
          !0,
        )
      }
      if (!s) {
        const pe = ce * U
        ne(M.current, { transform: Q(w) ? `translate3d(0, ${pe}px, 0)` : `translate3d(${pe}px, 0, 0)` })
      }
    }
  }
  ;(C.useEffect(() => {
    window.requestAnimationFrame(() => {
      ye.current = !0
    })
  }, []),
    C.useEffect(() => {
      var L
      function U() {
        if (!M.current || !P) return
        const W = document.activeElement
        if (xt(W) || fe.current) {
          var $
          const J = (($ = window.visualViewport) == null ? void 0 : $.height) || 0,
            ce = window.innerHeight
          let le = ce - J
          const je = M.current.getBoundingClientRect().height || 0,
            me = je > ce * 0.8
          ge.current || (ge.current = je)
          const De = M.current.getBoundingClientRect().top
          if ((Math.abs(xe.current - le) > 60 && (fe.current = !fe.current), s && s.length > 0 && Te && q)) {
            const Pe = Te[q] || 0
            le += Pe
          }
          if (((xe.current = le), je > J || fe.current)) {
            const Pe = M.current.getBoundingClientRect().height
            let pe = Pe
            ;(Pe > J && (pe = J - (me ? De : wt)),
              p
                ? (M.current.style.height = `${Pe - Math.max(le, 0)}px`)
                : (M.current.style.height = `${Math.max(pe, J - De)}px`))
          } else Xr() || (M.current.style.height = `${ge.current}px`)
          s && s.length > 0 && !fe.current
            ? (M.current.style.bottom = '0px')
            : (M.current.style.bottom = `${Math.max(le, 0)}px`)
        }
      }
      return (
        (L = window.visualViewport) == null || L.addEventListener('resize', U),
        () => {
          var W
          return (W = window.visualViewport) == null ? void 0 : W.removeEventListener('resize', U)
        }
      )
    }, [q, s, Te]))
  function He(L) {
    ;(Fn(),
      v?.(),
      L || H(!1),
      setTimeout(() => {
        s && Re(s[0])
      }, X.DURATION * 1e3))
  }
  function _t() {
    if (!M.current) return
    const L = document.querySelector('[data-vaul-drawer-wrapper]'),
      U = Qe(M.current, w)
    ;(ne(M.current, {
      transform: 'translate3d(0, 0, 0)',
      transition: `transform ${X.DURATION}s cubic-bezier(${X.EASE.join(',')})`,
    }),
      ne(ie.current, { transition: `opacity ${X.DURATION}s cubic-bezier(${X.EASE.join(',')})`, opacity: '1' }),
      o &&
        U &&
        U > 0 &&
        z &&
        ne(
          L,
          {
            borderRadius: `${yn}px`,
            overflow: 'hidden',
            ...(Q(w)
              ? {
                  transform: `scale(${Oe()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
                  transformOrigin: 'top',
                }
              : {
                  transform: `scale(${Oe()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
                  transformOrigin: 'left',
                }),
            transitionProperty: 'transform, border-radius',
            transitionDuration: `${X.DURATION}s`,
            transitionTimingFunction: `cubic-bezier(${X.EASE.join(',')})`,
          },
          !0,
        ))
  }
  function Fn() {
    !A || !M.current || (M.current.classList.remove(ht), (ae.current = !1), Y(!1), (se.current = new Date()))
  }
  function zn(L) {
    if (!A || !M.current) return
    ;(M.current.classList.remove(ht), (ae.current = !1), Y(!1), (se.current = new Date()))
    const U = Qe(M.current, w)
    if (!L || !Dt(L.target, !1) || !U || Number.isNaN(U) || re.current === null) return
    const W = se.current.getTime() - re.current.getTime(),
      $ = Me.current - (Q(w) ? L.pageY : L.pageX),
      J = Math.abs($) / W
    if (
      (J > 0.05 &&
        (ee(!0),
        setTimeout(() => {
          ee(!1)
        }, 200)),
      s)
    ) {
      ;(Ce({
        draggedDistance: $ * (w === 'bottom' || w === 'right' ? 1 : -1),
        closeDrawer: He,
        velocity: J,
        dismissible: i,
      }),
        a?.(L, !0))
      return
    }
    if (w === 'bottom' || w === 'right' ? $ > 0 : $ < 0) {
      ;(_t(), a?.(L, !0))
      return
    }
    if (J > vn) {
      ;(He(), a?.(L, !1))
      return
    }
    var ce
    const le = Math.min((ce = M.current.getBoundingClientRect().height) != null ? ce : 0, window.innerHeight)
    var je
    const me = Math.min((je = M.current.getBoundingClientRect().width) != null ? je : 0, window.innerWidth),
      De = w === 'left' || w === 'right'
    if (Math.abs(U) >= (De ? me : le) * u) {
      ;(He(), a?.(L, !1))
      return
    }
    ;(a?.(L, !0), _t())
  }
  C.useEffect(
    () => (
      z && (ne(document.documentElement, { scrollBehavior: 'auto' }), (G.current = new Date())),
      () => {
        is(document.documentElement, 'scrollBehavior')
      }
    ),
    [z],
  )
  function Hn(L) {
    const U = L ? (window.innerWidth - _e) / window.innerWidth : 1,
      W = L ? -_e : 0
    ;(de.current && window.clearTimeout(de.current),
      ne(M.current, {
        transition: `transform ${X.DURATION}s cubic-bezier(${X.EASE.join(',')})`,
        transform: Q(w) ? `scale(${U}) translate3d(0, ${W}px, 0)` : `scale(${U}) translate3d(${W}px, 0, 0)`,
      }),
      !L &&
        M.current &&
        (de.current = setTimeout(() => {
          const $ = Qe(M.current, w)
          ne(M.current, {
            transition: 'none',
            transform: Q(w) ? `translate3d(0, ${$}px, 0)` : `translate3d(${$}px, 0, 0)`,
          })
        }, 500)))
  }
  function Un(L, U) {
    if (U < 0) return
    const W = (window.innerWidth - _e) / window.innerWidth,
      $ = W + U * (1 - W),
      J = -_e + U * _e
    ne(M.current, {
      transform: Q(w) ? `scale(${$}) translate3d(0, ${J}px, 0)` : `scale(${$}) translate3d(${J}px, 0, 0)`,
      transition: 'none',
    })
  }
  function Bn(L, U) {
    const W = Q(w) ? window.innerHeight : window.innerWidth,
      $ = U ? (W - _e) / W : 1,
      J = U ? -_e : 0
    U &&
      ne(M.current, {
        transition: `transform ${X.DURATION}s cubic-bezier(${X.EASE.join(',')})`,
        transform: Q(w) ? `scale(${$}) translate3d(0, ${J}px, 0)` : `scale(${$}) translate3d(${J}px, 0, 0)`,
      })
  }
  return (
    C.useEffect(() => {
      b ||
        window.requestAnimationFrame(() => {
          document.body.style.pointerEvents = 'auto'
        })
    }, [b]),
    C.createElement(
      wr,
      {
        defaultOpen: D,
        onOpenChange: (L) => {
          ;(!i && !L) || (L ? _(!0) : He(!0), H(L))
        },
        open: z,
      },
      C.createElement(
        fn.Provider,
        {
          value: {
            activeSnapPoint: $e,
            snapPoints: s,
            setActiveSnapPoint: Re,
            drawerRef: M,
            overlayRef: ie,
            onOpenChange: e,
            onPress: $n,
            onRelease: zn,
            onDrag: In,
            dismissible: i,
            shouldAnimate: ye,
            handleOnly: f,
            isOpen: z,
            isDragging: A,
            shouldFade: ze,
            closeDrawer: He,
            onNestedDrag: Un,
            onNestedOpenChange: Hn,
            onNestedRelease: Bn,
            keyboardIsOpen: fe,
            modal: b,
            snapPointsOffset: Te,
            activeSnapPointIndex: q,
            direction: w,
            shouldScaleBackground: o,
            setBackgroundColorOnScale: l,
            noBodyStyles: S,
            container: O,
            autoFocus: k,
          },
        },
        n,
      ),
    )
  )
}
const bn = C.forwardRef(function ({ ...t }, e) {
  const { overlayRef: n, snapPoints: r, onRelease: a, shouldFade: s, isOpen: o, modal: l, shouldAnimate: u } = Xe(),
    d = gn(e, n),
    i = r && r.length > 0
  if (!l) return null
  const f = C.useCallback((c) => a(c), [a])
  return C.createElement(vr, {
    onMouseUp: f,
    ref: d,
    'data-vaul-overlay': '',
    'data-vaul-snap-points': o && i ? 'true' : 'false',
    'data-vaul-snap-points-overlay': o && s ? 'true' : 'false',
    'data-vaul-animate': u?.current ? 'true' : 'false',
    ...t,
  })
})
bn.displayName = 'Drawer.Overlay'
const Sn = C.forwardRef(function ({ onPointerDownOutside: t, style: e, onOpenAutoFocus: n, ...r }, a) {
  const {
      drawerRef: s,
      onPress: o,
      onRelease: l,
      onDrag: u,
      keyboardIsOpen: d,
      snapPointsOffset: i,
      activeSnapPointIndex: f,
      modal: c,
      isOpen: m,
      direction: g,
      snapPoints: p,
      container: b,
      handleOnly: v,
      shouldAnimate: x,
      autoFocus: S,
    } = Xe(),
    [w, D] = C.useState(!1),
    F = gn(a, s),
    T = C.useRef(null),
    N = C.useRef(null),
    P = C.useRef(!1),
    E = p && p.length > 0
  gs()
  const O = (R, B, z = 0) => {
    if (P.current) return !0
    const H = Math.abs(R.y),
      j = Math.abs(R.x),
      _ = j > H,
      A = ['bottom', 'right'].includes(B) ? 1 : -1
    if (B === 'left' || B === 'right') {
      if (!(R.x * A < 0) && j >= 0 && j <= z) return _
    } else if (!(R.y * A < 0) && H >= 0 && H <= z) return !_
    return ((P.current = !0), !0)
  }
  C.useEffect(() => {
    E &&
      window.requestAnimationFrame(() => {
        D(!0)
      })
  }, [])
  function k(R) {
    ;((T.current = null), (P.current = !1), l(R))
  }
  return C.createElement(yr, {
    'data-vaul-drawer-direction': g,
    'data-vaul-drawer': '',
    'data-vaul-delayed-snap-points': w ? 'true' : 'false',
    'data-vaul-snap-points': m && E ? 'true' : 'false',
    'data-vaul-custom-container': b ? 'true' : 'false',
    'data-vaul-animate': x?.current ? 'true' : 'false',
    ...r,
    ref: F,
    style: i && i.length > 0 ? { '--snap-point-height': `${i[f ?? 0]}px`, ...e } : e,
    onPointerDown: (R) => {
      v || (r.onPointerDown == null || r.onPointerDown.call(r, R), (T.current = { x: R.pageX, y: R.pageY }), o(R))
    },
    onOpenAutoFocus: (R) => {
      ;(n?.(R), S || R.preventDefault())
    },
    onPointerDownOutside: (R) => {
      if ((t?.(R), !c || R.defaultPrevented)) {
        R.preventDefault()
        return
      }
      d.current && (d.current = !1)
    },
    onFocusOutside: (R) => {
      if (!c) {
        R.preventDefault()
        return
      }
    },
    onPointerMove: (R) => {
      if (((N.current = R), v || (r.onPointerMove == null || r.onPointerMove.call(r, R), !T.current))) return
      const B = R.pageY - T.current.y,
        z = R.pageX - T.current.x,
        H = R.pointerType === 'touch' ? 10 : 2
      O({ x: z, y: B }, g, H) ? u(R) : (Math.abs(z) > H || Math.abs(B) > H) && (T.current = null)
    },
    onPointerUp: (R) => {
      ;(r.onPointerUp == null || r.onPointerUp.call(r, R), (T.current = null), (P.current = !1), l(R))
    },
    onPointerOut: (R) => {
      ;(r.onPointerOut == null || r.onPointerOut.call(r, R), k(N.current))
    },
    onContextMenu: (R) => {
      ;(r.onContextMenu == null || r.onContextMenu.call(r, R), N.current && k(N.current))
    },
  })
})
Sn.displayName = 'Drawer.Content'
const ys = 250,
  xs = 120,
  ws = C.forwardRef(function ({ preventCycle: t = !1, children: e, ...n }, r) {
    const {
        closeDrawer: a,
        isDragging: s,
        snapPoints: o,
        activeSnapPoint: l,
        setActiveSnapPoint: u,
        dismissible: d,
        handleOnly: i,
        isOpen: f,
        onPress: c,
        onDrag: m,
      } = Xe(),
      g = C.useRef(null),
      p = C.useRef(!1)
    function b() {
      if (p.current) {
        S()
        return
      }
      window.setTimeout(() => {
        v()
      }, xs)
    }
    function v() {
      if (s || t || p.current) {
        S()
        return
      }
      if ((S(), !o || o.length === 0)) {
        d || a()
        return
      }
      if (l === o[o.length - 1] && d) {
        a()
        return
      }
      const D = o.findIndex((T) => T === l)
      if (D === -1) return
      const F = o[D + 1]
      u(F)
    }
    function x() {
      g.current = window.setTimeout(() => {
        p.current = !0
      }, ys)
    }
    function S() {
      ;(g.current && window.clearTimeout(g.current), (p.current = !1))
    }
    return C.createElement(
      'div',
      {
        onClick: b,
        onPointerCancel: S,
        onPointerDown: (w) => {
          ;(i && c(w), x())
        },
        onPointerMove: (w) => {
          i && m(w)
        },
        ref: r,
        'data-vaul-drawer-visible': f ? 'true' : 'false',
        'data-vaul-handle': '',
        'aria-hidden': 'true',
        ...n,
      },
      C.createElement('span', { 'data-vaul-handle-hitarea': '', 'aria-hidden': 'true' }, e),
    )
  })
ws.displayName = 'Drawer.Handle'
function bs(t) {
  const e = Xe(),
    { container: n = e.container, ...r } = t
  return C.createElement(xr, { container: n, ...r })
}
const Ee = { Root: vs, Content: Sn, Overlay: bn, Portal: bs },
  Rn = (t) => {
    const e = Z.c(20)
    let n, r, a, s, o, l
    e[0] !== t
      ? (({ icon: r, title: l, badge: n, onClick: a, ref: o, ...s } = t),
        (e[0] = t),
        (e[1] = n),
        (e[2] = r),
        (e[3] = a),
        (e[4] = s),
        (e[5] = o),
        (e[6] = l))
      : ((n = e[1]), (r = e[2]), (a = e[3]), (s = e[4]), (o = e[5]), (l = e[6]))
    let u
    e[7] !== r ? ((u = he(r, 'text-base text-gray-600 dark:text-gray-300')), (e[7] = r), (e[8] = u)) : (u = e[8])
    let d
    e[9] !== u ? ((d = h.jsx('i', { className: u })), (e[9] = u), (e[10] = d)) : (d = e[10])
    let i
    e[11] !== n
      ? ((i =
          n &&
          h.jsx('span', {
            className:
              'bg-accent absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white shadow-sm',
            children: n,
          })),
        (e[11] = n),
        (e[12] = i))
      : (i = e[12])
    let f
    return (
      e[13] !== a || e[14] !== s || e[15] !== o || e[16] !== d || e[17] !== i || e[18] !== l
        ? ((f = h.jsxs(pt, {
            variant: 'ghost',
            size: 'sm',
            className:
              'relative h-10 w-10 rounded-full border-0 bg-gray-100 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
            title: l,
            onClick: a,
            ref: o,
            ...s,
            children: [d, i],
          })),
          (e[13] = a),
          (e[14] = s),
          (e[15] = o),
          (e[16] = d),
          (e[17] = i),
          (e[18] = l),
          (e[19] = f))
        : (f = e[19]),
      f
    )
  },
  Ss = (t) => {
    const e = Z.c(15),
      { icon: n, title: r, badge: a, children: s, contentClassName: o, open: l, onOpenChange: u } = t,
      d = Pt(ke)
    let i
    e[0] !== u || e[1] !== d
      ? ((i = (g) => {
          u?.(g, d)
        }),
        (e[0] = u),
        (e[1] = d),
        (e[2] = i))
      : (i = e[2])
    let f
    e[3] !== a || e[4] !== n || e[5] !== r
      ? ((f = h.jsx(br, { asChild: !0, children: h.jsx(Rn, { icon: n, title: r, badge: a, onClick: Ts }) })),
        (e[3] = a),
        (e[4] = n),
        (e[5] = r),
        (e[6] = f))
      : (f = e[6])
    let c
    e[7] !== s || e[8] !== o
      ? ((c = h.jsx(Sr, { align: 'center', className: o, children: s })), (e[7] = s), (e[8] = o), (e[9] = c))
      : (c = e[9])
    let m
    return (
      e[10] !== l || e[11] !== i || e[12] !== f || e[13] !== c
        ? ((m = h.jsxs(Rr, { defaultOpen: l, onOpenChange: i, children: [f, c] })),
          (e[10] = l),
          (e[11] = i),
          (e[12] = f),
          (e[13] = c),
          (e[14] = m))
        : (m = e[14]),
      m
    )
  },
  Rs = (t) => {
    const e = Z.c(19),
      { icon: n, title: r, badge: a, children: s, open: o, onOpenChange: l } = t
    let u
    e[0] !== l || e[1] !== o ? ((u = () => l(!o)), (e[0] = l), (e[1] = o), (e[2] = u)) : (u = e[2])
    let d
    e[3] !== a || e[4] !== n || e[5] !== u || e[6] !== r
      ? ((d = h.jsx(Rn, { icon: n, title: r, badge: a, onClick: u })),
        (e[3] = a),
        (e[4] = n),
        (e[5] = u),
        (e[6] = r),
        (e[7] = d))
      : (d = e[7])
    let i
    e[8] === Symbol.for('react.memo_cache_sentinel')
      ? ((i = h.jsx(Ee.Overlay, { className: 'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm' })), (e[8] = i))
      : (i = e[8])
    let f
    e[9] === Symbol.for('react.memo_cache_sentinel')
      ? ((f = h.jsx('div', {
          className: 'mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700',
        })),
        (e[9] = f))
      : (f = e[9])
    let c
    e[10] !== s
      ? ((c = h.jsxs(Ee.Portal, {
          children: [
            i,
            h.jsxs(Ee.Content, {
              className:
                'fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-2xl border-t border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80',
              children: [f, s],
            }),
          ],
        })),
        (e[10] = s),
        (e[11] = c))
      : (c = e[11])
    let m
    e[12] !== l || e[13] !== o || e[14] !== c
      ? ((m = h.jsx(Ee.Root, { open: o, onOpenChange: l, children: c })),
        (e[12] = l),
        (e[13] = o),
        (e[14] = c),
        (e[15] = m))
      : (m = e[15])
    let g
    return (
      e[16] !== d || e[17] !== m
        ? ((g = h.jsxs(h.Fragment, { children: [d, m] })), (e[16] = d), (e[17] = m), (e[18] = g))
        : (g = e[18]),
      g
    )
  },
  Cs = (t) => {
    const e = Z.c(14),
      { icon: n, title: r, badge: a, children: s, contentClassName: o, globalOpen: l, onGlobalOpenChange: u } = t,
      d = Fe(),
      [i, f] = y.useState(!1)
    if (d) {
      let m
      return (
        e[0] !== a || e[1] !== s || e[2] !== n || e[3] !== i || e[4] !== r
          ? ((m = h.jsx(Rs, { icon: n, title: r, badge: a, open: i, onOpenChange: f, children: s })),
            (e[0] = a),
            (e[1] = s),
            (e[2] = n),
            (e[3] = i),
            (e[4] = r),
            (e[5] = m))
          : (m = e[5]),
        m
      )
    }
    let c
    return (
      e[6] !== a || e[7] !== s || e[8] !== o || e[9] !== l || e[10] !== n || e[11] !== u || e[12] !== r
        ? ((c = h.jsx(Ss, { icon: n, title: r, badge: a, contentClassName: o, open: l, onOpenChange: u, children: s })),
          (e[6] = a),
          (e[7] = s),
          (e[8] = o),
          (e[9] = l),
          (e[10] = n),
          (e[11] = u),
          (e[12] = r),
          (e[13] = c))
        : (c = e[13]),
      c
    )
  }
function Ts() {}
const js = (t) => {
    const e = Z.c(75),
      { value: n, onChange: r, onPointUp: a, min: s, max: o, step: l, autoLabel: u, className: d, disabled: i } = t,
      f = l === void 0 ? 1 : l,
      c = i === void 0 ? !1 : i,
      { t: m } = ve()
    let g
    e[0] !== u || e[1] !== m ? ((g = u || m('slider.auto')), (e[0] = u), (e[1] = m), (e[2] = g)) : (g = e[2])
    const p = g,
      [b, v] = y.useState(!1),
      x = y.useRef(null),
      S = y.useRef(null),
      w = (q) => (q === 'auto' ? 5 : 15 + ((q - s) / (o - s)) * 85)
    let D
    e[3] !== o || e[4] !== s || e[5] !== f
      ? ((D = (q) => {
          if (q <= 12) return 'auto'
          const Re = (q - 15) / 85,
            Ce = s + Math.max(0, Re) * (o - s)
          return Math.round(Math.max(s, Ce) / f) * f
        }),
        (e[3] = o),
        (e[4] = s),
        (e[5] = f),
        (e[6] = D))
      : (D = e[6])
    const F = D
    let T
    e[7] !== c || e[8] !== F || e[9] !== r || e[10] !== a || e[11] !== n
      ? ((T = (q) => {
          if (c) return
          ;(q.preventDefault(), v(!0))
          const Re = (Le) => {
            if (!S.current) return
            const ze = S.current.getBoundingClientRect(),
              it = ((Le - ze.left) / ze.width) * 100,
              lt = Math.max(0, Math.min(100, it)),
              Oe = F(lt)
            Oe !== n && r(Oe)
          }
          Re(q.clientX)
          const Ce = (Le) => {
              Re(Le.clientX)
            },
            Te = (Le) => {
              ;(v(!1),
                a && a(Le),
                document.removeEventListener('pointermove', Ce),
                document.removeEventListener('pointerup', Te))
            }
          ;(document.addEventListener('pointermove', Ce), document.addEventListener('pointerup', Te))
        }),
        (e[7] = c),
        (e[8] = F),
        (e[9] = r),
        (e[10] = a),
        (e[11] = n),
        (e[12] = T))
      : (T = e[12])
    const N = T,
      P = w(n)
    let E
    e[13] !== d ? ((E = he('w-full', d)), (e[13] = d), (e[14] = E)) : (E = e[14])
    let O
    e[15] !== p ? ((O = h.jsx('span', { children: p })), (e[15] = p), (e[16] = O)) : (O = e[16])
    let k
    e[17] !== o ? ((k = h.jsx('span', { children: o })), (e[17] = o), (e[18] = k)) : (k = e[18])
    let R
    e[19] !== O || e[20] !== k
      ? ((R = h.jsxs('div', { className: 'text-text-secondary mb-2 flex justify-between text-xs', children: [O, k] })),
        (e[19] = O),
        (e[20] = k),
        (e[21] = R))
      : (R = e[21])
    const B = c && 'cursor-not-allowed opacity-50'
    let z
    e[22] !== B ? ((z = he('relative h-6 cursor-pointer', B)), (e[22] = B), (e[23] = z)) : (z = e[23])
    let H
    e[24] === Symbol.for('react.memo_cache_sentinel')
      ? ((H = h.jsx('div', {
          className: 'absolute top-0 left-0 h-full w-[12%] rounded-l-full bg-green-100 dark:bg-green-900/50',
        })),
        (e[24] = H))
      : (H = e[24])
    const j = n === 'auto' ? 'bg-green-500' : 'bg-accent'
    let _
    e[25] !== j
      ? ((_ = he('absolute top-0 h-full rounded-full transition-all duration-150 max-w-full', j)),
        (e[25] = j),
        (e[26] = _))
      : (_ = e[26])
    const A = `${Math.max(P, 5)}%`,
      Y = n === 'auto' ? '9999px 0 0 9999px' : '9999px'
    let V
    e[27] !== A || e[28] !== Y
      ? ((V = { width: A, borderRadius: Y }), (e[27] = A), (e[28] = Y), (e[29] = V))
      : (V = e[29])
    let ee
    e[30] !== _ || e[31] !== V
      ? ((ee = h.jsxs('div', {
          ref: S,
          className: 'absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-neutral-200 dark:bg-neutral-700',
          children: [H, h.jsx('div', { className: _, style: V })],
        })),
        (e[30] = _),
        (e[31] = V),
        (e[32] = ee))
      : (ee = e[32])
    const ie = b ? 'scale-110' : 'hover:scale-105',
      G = n === 'auto' ? 'bg-green-500' : 'bg-accent',
      re = c && 'cursor-not-allowed'
    let se
    e[33] !== ie || e[34] !== G || e[35] !== re
      ? ((se = he(
          'absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg transition-all duration-150',
          ie,
          G,
          re,
        )),
        (e[33] = ie),
        (e[34] = G),
        (e[35] = re),
        (e[36] = se))
      : (se = e[36])
    const te = `${P}%`
    let ae
    e[37] !== te ? ((ae = { left: te }), (e[37] = te), (e[38] = ae)) : (ae = e[38])
    let de
    e[39] !== se || e[40] !== ae
      ? ((de = h.jsx('div', { className: se, style: ae })), (e[39] = se), (e[40] = ae), (e[41] = de))
      : (de = e[41])
    const Me = n === 'auto' && 'font-medium text-green-500'
    let fe
    e[42] !== Me ? ((fe = he('transition-colors', Me)), (e[42] = Me), (e[43] = fe)) : (fe = e[43])
    let ye
    e[44] !== p || e[45] !== fe
      ? ((ye = h.jsx('div', {
          className: 'w-[15%] text-left',
          children: h.jsx('span', { className: fe, children: p }),
        })),
        (e[44] = p),
        (e[45] = fe),
        (e[46] = ye))
      : (ye = e[46])
    let xe
    if (e[47] !== o || e[48] !== s) {
      let q
      ;(e[50] !== s ? ((q = (Re, Ce) => s + Ce), (e[50] = s), (e[51] = q)) : (q = e[51]),
        (xe = Array.from({ length: o - s + 1 }, q)),
        (e[47] = o),
        (e[48] = s),
        (e[49] = xe))
    } else xe = e[49]
    let M
    e[52] !== xe || e[53] !== n
      ? ((M = h.jsx('div', {
          className: 'flex w-[85%] justify-between',
          children: xe.map((q) =>
            h.jsx('span', { className: he('transition-colors', n === q && 'font-medium text-accent'), children: q }, q),
          ),
        })),
        (e[52] = xe),
        (e[53] = n),
        (e[54] = M))
      : (M = e[54])
    let we
    e[55] !== ye || e[56] !== M
      ? ((we = h.jsxs('div', {
          className: 'text-text-secondary absolute top-full mt-1 flex w-full text-xs',
          children: [ye, M],
        })),
        (e[55] = ye),
        (e[56] = M),
        (e[57] = we))
      : (we = e[57])
    let be
    e[58] !== N || e[59] !== z || e[60] !== ee || e[61] !== de || e[62] !== we
      ? ((be = h.jsxs('div', { ref: x, className: z, onPointerDown: N, children: [ee, de, we] })),
        (e[58] = N),
        (e[59] = z),
        (e[60] = ee),
        (e[61] = de),
        (e[62] = we),
        (e[63] = be))
      : (be = e[63])
    let ge
    e[64] !== p || e[65] !== m || e[66] !== n
      ? ((ge = n === 'auto' ? p : m('slider.columns', { count: n })),
        (e[64] = p),
        (e[65] = m),
        (e[66] = n),
        (e[67] = ge))
      : (ge = e[67])
    let Se
    e[68] !== ge
      ? ((Se = h.jsx('div', {
          className: 'mt-8 text-center text-sm font-medium text-gray-700 dark:text-gray-300',
          children: ge,
        })),
        (e[68] = ge),
        (e[69] = Se))
      : (Se = e[69])
    let $e
    return (
      e[70] !== be || e[71] !== Se || e[72] !== E || e[73] !== R
        ? (($e = h.jsxs('div', { className: E, children: [R, be, Se] })),
          (e[70] = be),
          (e[71] = Se),
          (e[72] = E),
          (e[73] = R),
          (e[74] = $e))
        : ($e = e[74]),
      $e
    )
  },
  Ps = () => {
    const t = Z.c(13),
      { t: e } = ve(),
      [n, r] = Et(ke),
      a = Fe(),
      [s, o] = y.useState(n.columns),
      l = y.useRef(n.columns)
    let u
    t[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((u = (x) => {
          ;((l.current = x), o(x))
        }),
        (t[0] = u))
      : (u = t[0])
    const d = u
    let i
    t[1] !== r
      ? ((i = () => {
          r((x) => ({ ...x, columns: l.current }))
        }),
        (t[1] = r),
        (t[2] = i))
      : (i = t[2])
    const f = i
    let c
    t[3] !== a ? ((c = a ? { min: 3, max: 5 } : { min: 3, max: 8 }), (t[3] = a), (t[4] = c)) : (c = t[4])
    const m = c,
      g = m.min,
      p = m.max
    let b
    t[5] !== e ? ((b = e('action.auto')), (t[5] = e), (t[6] = b)) : (b = t[6])
    let v
    return (
      t[7] !== m.max || t[8] !== m.min || t[9] !== f || t[10] !== s || t[11] !== b
        ? ((v = h.jsx('div', {
            className: 'w-full lg:w-80',
            children: h.jsx(js, { value: s, onChange: d, onPointUp: f, min: g, max: p, autoLabel: b }),
          })),
          (t[7] = m.max),
          (t[8] = m.min),
          (t[9] = f),
          (t[10] = s),
          (t[11] = b),
          (t[12] = v))
        : (v = t[12]),
      v
    )
  },
  Es = () => {
    const t = Z.c(34),
      { t: e } = ve(),
      [n, r] = Et(ke)
    let a
    t[0] !== n || t[1] !== r
      ? ((a = (D) => {
          r({ ...n, sortOrder: D })
        }),
        (t[0] = n),
        (t[1] = r),
        (t[2] = a))
      : (a = t[2])
    const s = a
    let o
    t[3] === Symbol.for('react.memo_cache_sentinel')
      ? ((o = {
          '--highlight-bg':
            'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 8%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent))',
        }),
        (t[3] = o))
      : (o = t[3])
    let l
    t[4] !== s ? ((l = () => s('desc')), (t[4] = s), (t[5] = l)) : (l = t[5])
    let u
    t[6] === Symbol.for('react.memo_cache_sentinel')
      ? ((u = h.jsx('i', { className: 'i-mingcute-sort-descending-line' })), (t[6] = u))
      : (u = t[6])
    let d
    t[7] !== e ? ((d = e('action.sort.newest.first')), (t[7] = e), (t[8] = d)) : (d = t[8])
    let i
    t[9] !== d ? ((i = h.jsx('span', { children: d })), (t[9] = d), (t[10] = i)) : (i = t[10])
    let f
    t[11] !== n.sortOrder
      ? ((f = n.sortOrder === 'desc' && h.jsx('i', { className: 'i-mingcute-check-line ml-auto' })),
        (t[11] = n.sortOrder),
        (t[12] = f))
      : (f = t[12])
    let c
    t[13] !== l || t[14] !== i || t[15] !== f
      ? ((c = h.jsxs('div', {
          className:
            'group flex cursor-pointer items-center gap-2 rounded-lg bg-transparent px-2 py-2 transition-all duration-200 lg:py-1',
          style: o,
          onMouseEnter: Ns,
          onMouseLeave: Ms,
          onClick: l,
          children: [u, i, f],
        })),
        (t[13] = l),
        (t[14] = i),
        (t[15] = f),
        (t[16] = c))
      : (c = t[16])
    let m
    t[17] === Symbol.for('react.memo_cache_sentinel')
      ? ((m = {
          '--highlight-bg':
            'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 8%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent))',
        }),
        (t[17] = m))
      : (m = t[17])
    let g
    t[18] !== s ? ((g = () => s('asc')), (t[18] = s), (t[19] = g)) : (g = t[19])
    let p
    t[20] === Symbol.for('react.memo_cache_sentinel')
      ? ((p = h.jsx('i', { className: 'i-mingcute-sort-ascending-line' })), (t[20] = p))
      : (p = t[20])
    let b
    t[21] !== e ? ((b = e('action.sort.oldest.first')), (t[21] = e), (t[22] = b)) : (b = t[22])
    let v
    t[23] !== b ? ((v = h.jsx('span', { children: b })), (t[23] = b), (t[24] = v)) : (v = t[24])
    let x
    t[25] !== n.sortOrder
      ? ((x = n.sortOrder === 'asc' && h.jsx('i', { className: 'i-mingcute-check-line ml-auto' })),
        (t[25] = n.sortOrder),
        (t[26] = x))
      : (x = t[26])
    let S
    t[27] !== v || t[28] !== x || t[29] !== g
      ? ((S = h.jsxs('div', {
          className:
            'group flex cursor-pointer items-center gap-2 rounded-lg bg-transparent px-2 py-2 transition-all duration-200 lg:py-1',
          style: m,
          onMouseEnter: Ls,
          onMouseLeave: Os,
          onClick: g,
          children: [p, v, x],
        })),
        (t[27] = v),
        (t[28] = x),
        (t[29] = g),
        (t[30] = S))
      : (S = t[30])
    let w
    return (
      t[31] !== S || t[32] !== c
        ? ((w = h.jsxs('div', { className: '-mx-2 flex flex-col p-0 text-sm lg:p-0', children: [c, S] })),
          (t[31] = S),
          (t[32] = c),
          (t[33] = w))
        : (w = t[33]),
      w
    )
  }
function Ns(t) {
  ;((t.currentTarget.style.background =
    'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 8%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent))'),
    (t.currentTarget.style.color = 'var(--color-accent)'))
}
function Ms(t) {
  ;((t.currentTarget.style.background = 'transparent'), (t.currentTarget.style.color = ''))
}
function Ls(t) {
  ;((t.currentTarget.style.background =
    'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 8%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent))'),
    (t.currentTarget.style.color = 'var(--color-accent)'))
}
function Os(t) {
  ;((t.currentTarget.style.background = 'transparent'), (t.currentTarget.style.color = ''))
}
const Cn = () => {
    const t = Z.c(23),
      { t: e } = ve()
    let n
    t[0] !== e ? ((n = e('action.view.settings')), (t[0] = e), (t[1] = n)) : (n = t[1])
    let r
    t[2] !== n
      ? ((r = h.jsx('h3', { className: 'mb-3 px-2 text-sm font-medium', children: n })), (t[2] = n), (t[3] = r))
      : (r = t[3])
    let a
    t[4] !== e ? ((a = e('action.sort.mode')), (t[4] = e), (t[5] = a)) : (a = t[5])
    let s
    t[6] !== a
      ? ((s = h.jsx('h4', { className: 'text-text-secondary mb-3 text-xs font-medium', children: a })),
        (t[6] = a),
        (t[7] = s))
      : (s = t[7])
    let o
    t[8] === Symbol.for('react.memo_cache_sentinel') ? ((o = h.jsx(Es, {})), (t[8] = o)) : (o = t[8])
    let l
    t[9] !== s
      ? ((l = h.jsxs('div', { className: 'mb-3 px-2', children: [s, o] })), (t[9] = s), (t[10] = l))
      : (l = t[10])
    let u
    t[11] === Symbol.for('react.memo_cache_sentinel')
      ? ((u = h.jsx('div', {
          className: 'mx-2 my-3 h-px',
          style: {
            background:
              'linear-gradient(to right, transparent, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent)',
          },
        })),
        (t[11] = u))
      : (u = t[11])
    let d
    t[12] !== e ? ((d = e('action.columns.setting')), (t[12] = e), (t[13] = d)) : (d = t[13])
    let i
    t[14] !== d
      ? ((i = h.jsx('h4', { className: 'text-text-secondary mb-3 text-xs font-medium', children: d })),
        (t[14] = d),
        (t[15] = i))
      : (i = t[15])
    let f
    t[16] === Symbol.for('react.memo_cache_sentinel') ? ((f = h.jsx(Ps, {})), (t[16] = f)) : (f = t[16])
    let c
    t[17] !== i ? ((c = h.jsxs('div', { className: 'px-2', children: [i, f] })), (t[17] = i), (t[18] = c)) : (c = t[18])
    let m
    return (
      t[19] !== r || t[20] !== c || t[21] !== l
        ? ((m = h.jsxs('div', { className: 'pb-safe lg:pb-safe-2 w-full lg:py-1', children: [r, l, u, c] })),
          (t[19] = r),
          (t[20] = c),
          (t[21] = l),
          (t[22] = m))
        : (m = t[22]),
      m
    )
  },
  Tn = () => {
    const t = Z.c(29),
      { t: e } = ve(),
      [n] = Et(ke),
      r = Pt(Cr),
      a = sn(),
      s = n.columns !== 'auto' || n.sortOrder !== 'desc',
      o =
        n.selectedTags.length +
        n.selectedCameras.length +
        n.selectedLenses.length +
        (n.selectedRatings !== null ? 1 : 0)
    let l
    t[0] !== r
      ? ((l = () => {
          r(!0)
        }),
        (t[0] = r),
        (t[1] = l))
      : (l = t[1])
    let u
    t[2] !== e ? ((u = e('action.search.unified.title')), (t[2] = e), (t[3] = u)) : (u = t[3])
    let d
    t[4] === Symbol.for('react.memo_cache_sentinel')
      ? ((d = h.jsx('i', { className: 'i-mingcute-search-line text-base text-gray-600 dark:text-gray-300' })),
        (t[4] = d))
      : (d = t[4])
    let i
    t[5] !== o
      ? ((i =
          o > 0 &&
          h.jsx('span', {
            className:
              'absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white',
            children: o,
          })),
        (t[5] = o),
        (t[6] = i))
      : (i = t[6])
    let f
    t[7] !== l || t[8] !== u || t[9] !== i
      ? ((f = h.jsxs(pt, {
          variant: 'ghost',
          size: 'sm',
          onClick: l,
          className:
            'relative h-10 min-w-10 rounded-full border-0 bg-gray-100 px-3 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
          title: u,
          children: [d, i],
        })),
        (t[7] = l),
        (t[8] = u),
        (t[9] = i),
        (t[10] = f))
      : (f = t[10])
    let c
    t[11] !== a ? ((c = () => a('/explory')), (t[11] = a), (t[12] = c)) : (c = t[12])
    let m
    t[13] !== e ? ((m = e('action.map.explore')), (t[13] = e), (t[14] = m)) : (m = t[14])
    let g
    t[15] === Symbol.for('react.memo_cache_sentinel')
      ? ((g = h.jsx('i', { className: 'i-mingcute-map-pin-line text-base text-gray-600 dark:text-gray-300' })),
        (t[15] = g))
      : (g = t[15])
    let p
    t[16] !== c || t[17] !== m
      ? ((p = h.jsx(pt, {
          variant: 'ghost',
          size: 'sm',
          onClick: c,
          className:
            'h-10 w-10 rounded-full border-0 bg-gray-100 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
          title: m,
          children: g,
        })),
        (t[16] = c),
        (t[17] = m),
        (t[18] = p))
      : (p = t[18])
    let b
    t[19] !== e ? ((b = e('action.view.title')), (t[19] = e), (t[20] = b)) : (b = t[20])
    const v = s ? '●' : void 0
    let x
    t[21] === Symbol.for('react.memo_cache_sentinel') ? ((x = h.jsx(Cn, {})), (t[21] = x)) : (x = t[21])
    let S
    t[22] !== v || t[23] !== b
      ? ((S = h.jsx(Cs, { icon: 'i-mingcute-layout-grid-line', title: b, badge: v, children: x })),
        (t[22] = v),
        (t[23] = b),
        (t[24] = S))
      : (S = t[24])
    let w
    return (
      t[25] !== S || t[26] !== f || t[27] !== p
        ? ((w = h.jsxs('div', { className: 'flex items-center justify-center gap-3', children: [f, p, S] })),
          (t[25] = S),
          (t[26] = f),
          (t[27] = p),
          (t[28] = w))
        : (w = t[28]),
      w
    )
  },
  Ds = { view: Cn },
  _s = (t) => {
    const e = Z.c(10),
      { open: n, onOpenChange: r, type: a } = t,
      s = a ? Ds[a] : null
    let o
    e[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((o = h.jsx(Ee.Overlay, { className: 'fixed inset-0 z-40 bg-black/20 backdrop-blur-sm' })), (e[0] = o))
      : (o = e[0])
    let l
    e[1] === Symbol.for('react.memo_cache_sentinel')
      ? ((l = h.jsx('div', {
          className: 'mx-auto mb-4 h-1.5 w-12 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700',
        })),
        (e[1] = l))
      : (l = e[1])
    let u
    e[2] !== s ? ((u = s && h.jsx(s, {})), (e[2] = s), (e[3] = u)) : (u = e[3])
    let d
    e[4] !== u
      ? ((d = h.jsxs(Ee.Portal, {
          children: [
            o,
            h.jsxs(Ee.Content, {
              className:
                'fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-2xl border-t border-zinc-200 bg-white/80 p-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/80',
              children: [l, u],
            }),
          ],
        })),
        (e[4] = u),
        (e[5] = d))
      : (d = e[5])
    let i
    return (
      e[6] !== r || e[7] !== n || e[8] !== d
        ? ((i = h.jsx(Ee.Root, { open: n, onOpenChange: r, children: d })),
          (e[6] = r),
          (e[7] = n),
          (e[8] = d),
          (e[9] = i))
        : (i = e[9]),
      i
    )
  }
let jn = 'undefined',
  Ie = typeof window !== jn ? window : {},
  As = typeof performance !== jn ? performance : Date,
  bt = () => As.now(),
  Pn = 'AnimationFrame',
  Yt = 'cancel' + Pn,
  qt = 'request' + Pn,
  rt = Ie[qt] && Ie[qt].bind(Ie),
  St = Ie[Yt] && Ie[Yt].bind(Ie)
function ks(t) {
  return clearTimeout(t)
}
if (!rt || !St) {
  let t = 0
  ;((rt = (e) => {
    let n = bt(),
      r = Math.max(t + 1e3 / 60, n)
    return setTimeout(() => {
      e((t = r))
    }, r - n)
  }),
    (St = ks))
}
const $s = (t) => {
    St(t.v || -1)
  },
  Is = (t, e) => {
    const n = bt(),
      r = {},
      a = () => {
        bt() - n >= e ? t.call(null) : (r.v = rt(a))
      }
    return ((r.v = rt(a)), r)
  },
  at = (t) => {
    const e = y.useRef(t)
    return (
      y.useEffect(() => {
        e.current = t
      }),
      e
    )
  },
  Fs = (t, e = 100, n = !1) => {
    const r = at(t),
      a = y.useRef(),
      s = [e, n, r]
    function o() {
      ;(a.current && clearTimeout(a.current), (a.current = void 0))
    }
    y.useEffect(() => o, s)
    function l() {
      a.current = void 0
    }
    return y.useCallback(function () {
      const u = arguments,
        { current: d } = a
      if (d === void 0 && n) return ((a.current = setTimeout(l, e)), r.current.apply(null, u))
      ;(d && clearTimeout(d),
        (a.current = setTimeout(() => {
          ;((a.current = void 0), r.current.apply(null, u))
        }, e)))
    }, s)
  },
  zs = (t, e, n) => {
    const r = y.useState(t)
    return [r[0], Fs(r[1], e, n)]
  }
function tt(t, e, n, r) {
  const a = y.useRef(n),
    s = y.useRef(r)
  ;(y.useEffect(() => {
    ;((a.current = n), (s.current = r))
  }),
    y.useEffect(() => {
      const o = t && 'current' in t ? t.current : t
      if (!o) return
      let l = 0
      function u(...i) {
        l || a.current.apply(this, i)
      }
      o.addEventListener(e, u)
      const d = s.current
      return () => {
        ;((l = 1), o.removeEventListener(e, u), d && d())
      }
    }, [t, e]))
}
const Hs = {},
  Ye = typeof window > 'u' ? null : window,
  Us = Ye && typeof Ye.visualViewport < 'u' ? Ye.visualViewport : null,
  Kt = () => [document.documentElement.clientWidth, document.documentElement.clientHeight],
  Bs = function (t) {
    t === void 0 && (t = Hs)
    const { wait: e, leading: n, initialWidth: r = 0, initialHeight: a = 0 } = t,
      [s, o] = zs(typeof document > 'u' ? [r, a] : Kt, e, n),
      l = () => o(Kt)
    return (tt(Ye, 'resize', l), tt(Us, 'resize', l), tt(Ye, 'orientationchange', l), s)
  },
  oe = 0,
  K = 1,
  Ws = 2,
  Vs = 0,
  Rt = 1
function Ys(t, e, n) {
  let r = t.list,
    a
  for (; r; ) {
    if (r.index === n) return !1
    if (e > r.high) break
    ;((a = r), (r = r.next))
  }
  return (a || (t.list = { index: n, high: e, next: r }), a && (a.next = { index: n, high: e, next: a.next }), !0)
}
function qs(t, e) {
  let n = t.list
  if (n.index === e) return n.next === null ? Vs : ((t.list = n.next), Rt)
  let r = n
  for (n = n.next; n !== null; ) {
    if (n.index === e) return ((r.next = n.next), Rt)
    ;((r = n), (n = n.next))
  }
}
const I = { low: 0, max: 0, high: 0, C: Ws, P: void 0, R: void 0, L: void 0, list: void 0 }
I.P = I
I.L = I
I.R = I
function Ne(t) {
  const e = t.high
  t.L === I && t.R === I
    ? (t.max = e)
    : t.L === I
      ? (t.max = Math.max(t.R.max, e))
      : t.R === I
        ? (t.max = Math.max(t.L.max, e))
        : (t.max = Math.max(Math.max(t.L.max, t.R.max), e))
}
function Ze(t) {
  let e = t
  for (; e.P !== I; ) (Ne(e.P), (e = e.P))
}
function qe(t, e) {
  if (e.R === I) return
  const n = e.R
  ;((e.R = n.L),
    n.L !== I && (n.L.P = e),
    (n.P = e.P),
    e.P === I ? (t.root = n) : e === e.P.L ? (e.P.L = n) : (e.P.R = n),
    (n.L = e),
    (e.P = n),
    Ne(e),
    Ne(n))
}
function Ke(t, e) {
  if (e.L === I) return
  const n = e.L
  ;((e.L = n.R),
    n.R !== I && (n.R.P = e),
    (n.P = e.P),
    e.P === I ? (t.root = n) : e === e.P.R ? (e.P.R = n) : (e.P.L = n),
    (n.R = e),
    (e.P = n),
    Ne(e),
    Ne(n))
}
function et(t, e, n) {
  ;(e.P === I ? (t.root = n) : e === e.P.L ? (e.P.L = n) : (e.P.R = n), (n.P = e.P))
}
function Ks(t, e) {
  let n
  for (; e !== I && e.C === K; )
    e === e.P.L
      ? ((n = e.P.R),
        n.C === oe && ((n.C = K), (e.P.C = oe), qe(t, e.P), (n = e.P.R)),
        n.L.C === K && n.R.C === K
          ? ((n.C = oe), (e = e.P))
          : (n.R.C === K && ((n.L.C = K), (n.C = oe), Ke(t, n), (n = e.P.R)),
            (n.C = e.P.C),
            (e.P.C = K),
            (n.R.C = K),
            qe(t, e.P),
            (e = t.root)))
      : ((n = e.P.L),
        n.C === oe && ((n.C = K), (e.P.C = oe), Ke(t, e.P), (n = e.P.L)),
        n.R.C === K && n.L.C === K
          ? ((n.C = oe), (e = e.P))
          : (n.L.C === K && ((n.R.C = K), (n.C = oe), qe(t, n), (n = e.P.L)),
            (n.C = e.P.C),
            (e.P.C = K),
            (n.L.C = K),
            Ke(t, e.P),
            (e = t.root)))
  e.C = K
}
function Xs(t) {
  for (; t.L !== I; ) t = t.L
  return t
}
function Gs(t, e) {
  let n
  for (; e.P.C === oe; )
    e.P === e.P.P.L
      ? ((n = e.P.P.R),
        n.C === oe
          ? ((e.P.C = K), (n.C = K), (e.P.P.C = oe), (e = e.P.P))
          : (e === e.P.R && ((e = e.P), qe(t, e)), (e.P.C = K), (e.P.P.C = oe), Ke(t, e.P.P)))
      : ((n = e.P.P.L),
        n.C === oe
          ? ((e.P.C = K), (n.C = K), (e.P.P.C = oe), (e = e.P.P))
          : (e === e.P.L && ((e = e.P), Ke(t, e)), (e.P.C = K), (e.P.P.C = oe), qe(t, e.P.P)))
  t.root.C = K
}
function Js() {
  const t = { root: I, size: 0 },
    e = {}
  return {
    insert(n, r, a) {
      let s = t.root,
        o = I
      for (; s !== I && ((o = s), n !== o.low); ) n < s.low ? (s = s.L) : (s = s.R)
      if (n === o.low && o !== I) {
        if (!Ys(o, r, a)) return
        ;((o.high = Math.max(o.high, r)), Ne(o), Ze(o), (e[a] = o), t.size++)
        return
      }
      const l = { low: n, high: r, max: r, C: oe, P: o, L: I, R: I, list: { index: a, high: r, next: null } }
      ;(o === I ? (t.root = l) : (l.low < o.low ? (o.L = l) : (o.R = l), Ze(l)), Gs(t, l), (e[a] = l), t.size++)
    },
    remove(n) {
      const r = e[n]
      if (r === void 0) return
      delete e[n]
      const a = qs(r, n)
      if (a === void 0) return
      if (a === Rt) {
        ;((r.high = r.list.high), Ne(r), Ze(r), t.size--)
        return
      }
      let s = r,
        o = s.C,
        l
      ;(r.L === I
        ? ((l = r.R), et(t, r, r.R))
        : r.R === I
          ? ((l = r.L), et(t, r, r.L))
          : ((s = Xs(r.R)),
            (o = s.C),
            (l = s.R),
            s.P === r ? (l.P = s) : (et(t, s, s.R), (s.R = r.R), (s.R.P = s)),
            et(t, r, s),
            (s.L = r.L),
            (s.L.P = s),
            (s.C = r.C)),
        Ne(l),
        Ze(l),
        o === K && Ks(t, l),
        t.size--)
    },
    search(n, r, a) {
      const s = [t.root]
      for (; s.length !== 0; ) {
        const o = s.pop()
        if (
          !(o === I || n > o.max) &&
          (o.L !== I && s.push(o.L), o.R !== I && s.push(o.R), o.low <= r && o.high >= n)
        ) {
          let l = o.list
          for (; l !== null; ) (l.high >= n && a(l.index, o.low), (l = l.next))
        }
      }
    },
    get size() {
      return t.size
    },
  }
}
const ot = (t, e) => {
    const n = e || Qs
    let r, a
    return function () {
      return r && n(arguments, r) ? a : (a = t.apply(null, (r = arguments)))
    }
  },
  Qs = (t, e) => t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3]
class Xt {
  constructor() {
    ;((this.set = void 0), (this.get = void 0))
    let e, n
    ;((this.get = (r) => (r === e ? n : void 0)),
      (this.set = (r, a) => {
        ;((e = r), (n = a))
      }))
  }
}
const gt = (t) => {
    try {
      return new t()
    } catch {
      const n = {}
      return {
        set(r, a) {
          n[r] = a
        },
        get(r) {
          return n[r]
        },
      }
    }
  },
  Zs = (t) => {
    const e = t.length,
      n = gt(t[0])
    let r, a, s, o
    const l = e === 1,
      u = (c) => ((r = n.get(c[0])) === void 0 || l ? r : r.get(c[1])),
      d = (c, m) => (
        l
          ? n.set(c[0], m)
          : (r = n.get(c[0])) === void 0
            ? ((a = gt(t[1])), a.set(c[1], m), n.set(c[0], a))
            : r.set(c[1], m),
        m
      ),
      i = (c) => {
        for (o = n, s = 0; s < e; s++) if ((o = o.get(c[s])) === void 0) return
        return o
      },
      f = (c, m) => {
        for (o = n, s = 0; s < e - 1; s++)
          ((a = o.get(c[s])) === void 0 && ((a = gt(t[s + 1])), o.set(c[s], a)), (o = a))
        return (o.set(c[e - 1], m), m)
      }
    return e < 3 ? { g: u, s: d } : { g: i, s: f }
  },
  En = (t, e) => {
    let n
    const { g: r, s: a } = Zs(t)
    return function () {
      return (n = r(arguments)) === void 0 ? a(arguments, e.apply(null, arguments)) : n
    }
  },
  Ct = new WeakMap()
function ea() {
  const t = y.useState(ta)[1]
  return y.useRef(() => t({})).current
}
const ta = {},
  nt = y.createElement
function na(t) {
  let {
      positioner: e,
      resizeObserver: n,
      items: r,
      as: a = 'div',
      id: s,
      className: o,
      style: l,
      role: u = 'grid',
      tabIndex: d = 0,
      containerRef: i,
      itemAs: f = 'div',
      itemStyle: c,
      itemHeightEstimate: m = 300,
      itemKey: g = aa,
      overscanBy: p = 2,
      scrollTop: b,
      isScrolling: v,
      height: x,
      render: S,
      onRender: w,
    } = t,
    D = 0,
    F
  const T = ea(),
    N = ia(e, n),
    P = r.length,
    { columnWidth: E, columnCount: O, range: k, estimateHeight: R, size: B, shortestColumn: z } = e,
    H = B(),
    j = z(),
    _ = [],
    A = u === 'list' ? 'listitem' : u === 'grid' ? 'gridcell' : void 0,
    Y = at(w)
  p = x * p
  const V = b + p,
    ee = j < V && H < P
  if (
    (k(Math.max(0, b - p / 2), V, (G, re, se) => {
      const te = r[G],
        ae = g(te, G),
        de = { top: se, left: re, width: E, writingMode: 'horizontal-tb', position: 'absolute' }
      ;(_.push(
        nt(
          f,
          { key: ae, ref: N(G), role: A, style: typeof c == 'object' && c !== null ? Object.assign({}, de, c) : de },
          Jt(S, G, te, E),
        ),
      ),
        F === void 0 ? ((D = G), (F = G)) : ((D = Math.min(D, G)), (F = Math.max(F, G))))
    }),
    ee)
  ) {
    const G = Math.min(P - H, Math.ceil(((b + p - j) / m) * O))
    let re = H
    const se = oa(E)
    for (; re < H + G; re++) {
      const te = r[re],
        ae = g(te, re)
      _.push(
        nt(
          f,
          { key: ae, ref: N(re), role: A, style: typeof c == 'object' ? Object.assign({}, se, c) : se },
          Jt(S, re, te, E),
        ),
      )
    }
  }
  ;(y.useEffect(() => {
    ;(typeof Y.current == 'function' && F !== void 0 && Y.current(D, F, r), (Gt = '1'))
  }, [D, F, r, Y]),
    y.useEffect(() => {
      ee && T()
    }, [ee, e]))
  const ie = ra(v, R(P, m))
  return nt(a, {
    ref: i,
    key: Gt,
    id: s,
    role: u,
    className: o,
    tabIndex: d,
    style: typeof l == 'object' ? sa(ie, l) : ie,
    children: _,
  })
}
let Gt = '0'
const Jt = En([Xt, {}, WeakMap, Xt], (t, e, n, r) => nt(t, { index: e, data: n, width: r })),
  ra = ot((t, e) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    height: Math.ceil(e),
    maxHeight: Math.ceil(e),
    willChange: t ? 'contents' : void 0,
    pointerEvents: t ? 'none' : void 0,
  })),
  Nn = (t, e) => t[0] === e[0] && t[1] === e[1],
  sa = ot((t, e) => Object.assign({}, t, e), Nn)
function aa(t, e) {
  return e
}
const oa = ot(
    (t) => ({ width: t, zIndex: -1e3, visibility: 'hidden', position: 'absolute', writingMode: 'horizontal-tb' }),
    (t, e) => t[0] === e[0],
  ),
  ia = ot(
    (t, e) => (n) => (r) => {
      r !== null && (e && (e.observe(r), Ct.set(r, n)), t.get(n) === void 0 && t.set(n, r.offsetHeight))
    },
    Nn,
  ),
  la = typeof performance < 'u' ? performance : Date,
  ca = () => la.now()
function ua(t, e = 30, n = !1) {
  const r = at(t),
    a = 1e3 / e,
    s = y.useRef(0),
    o = y.useRef(),
    l = () => o.current && clearTimeout(o.current),
    u = [e, n, r]
  function d() {
    ;((s.current = 0), l())
  }
  return (
    y.useEffect(() => d, u),
    y.useCallback(function () {
      const i = arguments,
        f = ca(),
        c = () => {
          ;((s.current = f), l(), r.current.apply(null, i))
        },
        m = s.current
      if (n && m === 0) return c()
      if (f - m > a) {
        if (m > 0) return c()
        s.current = f
      }
      ;(l(),
        (o.current = setTimeout(() => {
          ;(c(), (s.current = 0))
        }, a)))
    }, u)
  )
}
function da(t, e) {
  let {
    width: n,
    columnWidth: r = 200,
    columnGutter: a = 0,
    rowGutter: s,
    columnCount: o,
    maxColumnCount: l,
    maxColumnWidth: u,
  } = t
  e === void 0 && (e = ga)
  const d = () => {
      const [p, b] = ha(n, r, a, o, l, u)
      return fa(b, p, a, s ?? a)
    },
    i = y.useRef()
  i.current === void 0 && (i.current = d())
  const f = y.useRef(e),
    c = [n, r, a, s, o, l, u],
    m = y.useRef(c),
    g = !c.every((p, b) => m.current[b] === p)
  if (g || !e.every((p, b) => f.current[b] === p)) {
    const p = i.current,
      b = d()
    if (((f.current = e), (m.current = c), g)) {
      const v = p.size()
      for (let x = 0; x < v; x++) {
        const S = p.get(x)
        b.set(x, S !== void 0 ? S.height : 0)
      }
    }
    i.current = b
  }
  return i.current
}
const fa = function (t, e, n, r) {
    ;(n === void 0 && (n = 0), r === void 0 && (r = n))
    const a = Js(),
      s = new Array(t),
      o = [],
      l = new Array(t)
    for (let u = 0; u < t; u++) ((s[u] = 0), (l[u] = []))
    return {
      columnCount: t,
      columnWidth: e,
      set: function (u, d) {
        d === void 0 && (d = 0)
        let i = 0
        for (let c = 1; c < s.length; c++) s[c] < s[i] && (i = c)
        const f = s[i] || 0
        ;((s[i] = f + d + r),
          l[i].push(u),
          (o[u] = { left: i * (e + n), top: f, height: d, column: i }),
          a.insert(f, f + d, u))
      },
      get: (u) => o[u],
      update: (u) => {
        const d = new Array(t)
        let i = 0,
          f = 0
        for (; i < u.length - 1; i++) {
          const c = u[i],
            m = o[c]
          ;((m.height = u[++i]),
            a.remove(c),
            a.insert(m.top, m.top + m.height, c),
            (d[m.column] = d[m.column] === void 0 ? c : Math.min(c, d[m.column])))
        }
        for (i = 0; i < d.length; i++) {
          if (d[i] === void 0) continue
          const c = l[i],
            m = ma(c, d[i]),
            g = l[i][m],
            p = o[g]
          for (s[i] = p.top + p.height + r, f = m + 1; f < c.length; f++) {
            const b = c[f],
              v = o[b]
            ;((v.top = s[i]), (s[i] = v.top + v.height + r), a.remove(b), a.insert(v.top, v.top + v.height, b))
          }
        }
      },
      range: (u, d, i) => a.search(u, d, (f, c) => i(f, o[f].left, c)),
      estimateHeight: (u, d) => {
        const i = Math.max(0, Math.max.apply(null, s))
        return u === a.size ? i : i + Math.ceil((u - a.size) / t) * d
      },
      shortestColumn: () => (s.length > 1 ? Math.min.apply(null, s) : s[0] || 0),
      size() {
        return a.size
      },
      all() {
        return o
      },
    }
  },
  ma = (t, e) => {
    let n = 0,
      r = t.length - 1
    for (; n <= r; ) {
      const a = (n + r) >>> 1,
        s = t[a]
      if (s === e) return a
      s <= e ? (n = a + 1) : (r = a - 1)
    }
    return -1
  },
  ha = function (t, e, n, r, a, s) {
    ;(t === void 0 && (t = 0),
      e === void 0 && (e = 0),
      n === void 0 && (n = 8),
      (r = r || Math.min(Math.floor((t + n) / (e + n)), a || 1 / 0) || 1))
    let o = Math.floor((t - n * (r - 1)) / r)
    return (s !== void 0 && o > s && (o = s), [o, r])
  },
  ga = []
var Qt = function (e) {
  var n = [],
    r = null,
    a = function () {
      for (var o = arguments.length, l = new Array(o), u = 0; u < o; u++) l[u] = arguments[u]
      ;((n = l),
        !r &&
          (r = requestAnimationFrame(function () {
            ;((r = null), e.apply(void 0, n))
          })))
    }
  return (
    (a.cancel = function () {
      r && (cancelAnimationFrame(r), (r = null))
    }),
    a
  )
}
function pa(t) {
  t.cancel()
}
const va = En([WeakMap], (t, e) => {
  const n = [],
    r = Qt(() => {
      ;(n.length > 0 && (t.update(n), e(n)), (n.length = 0))
    }),
    a = (d) => {
      const i = d.offsetHeight
      if (i > 0) {
        const f = Ct.get(d)
        if (f !== void 0) {
          const c = t.get(f)
          c !== void 0 && i !== c.height && n.push(f, i)
        }
      }
      r()
    },
    s = new Map(),
    o = (d) => {
      let i = 0
      for (; i < d.length; i++) {
        const f = d[i],
          c = Ct.get(f.target)
        if (c === void 0) continue
        let m = s.get(c)
        ;(m || ((m = Qt(a)), s.set(c, m)), m(f.target))
      }
    },
    l = new ResizeObserver(o),
    u = l.disconnect.bind(l)
  return (
    (l.disconnect = () => {
      ;(u(), s.forEach(pa))
    }),
    l
  )
})
function ya(t, e) {
  var n
  const {
      align: r = 'top',
      element: a = typeof window < 'u' && window,
      offset: s = 0,
      height: o = typeof window < 'u' ? window.innerHeight : 0,
    } = e,
    l = at({ positioner: t, element: a, align: r, offset: s, height: o }),
    u = y.useRef(() => {
      const m = l.current.element
      return m && 'current' in m ? m.current : m
    }).current,
    [d, i] = y.useReducer((m, g) => {
      const p = { position: m.position, index: m.index, prevTop: m.prevTop }
      if (g.type === 'scrollToIndex') {
        var b
        return {
          position: l.current.positioner.get((b = g.value) !== null && b !== void 0 ? b : -1),
          index: g.value,
          prevTop: void 0,
        }
      } else if (g.type === 'setPosition') p.position = g.value
      else if (g.type === 'setPrevTop') p.prevTop = g.value
      else if (g.type === 'reset') return Zt
      return p
    }, Zt),
    f = ua(i, 15)
  tt(u(), 'scroll', () => {
    if (!d.position && d.index) {
      const m = l.current.positioner.get(d.index)
      m && i({ type: 'setPosition', value: m })
    }
  })
  const c = d.index !== void 0 && ((n = l.current.positioner.get(d.index)) === null || n === void 0 ? void 0 : n.top)
  return (
    y.useEffect(() => {
      const m = u()
      if (!m) return
      const { height: g, align: p, offset: b, positioner: v } = l.current
      if (d.position) {
        let x = d.position.top
        ;(p === 'bottom' ? (x = x - g + d.position.height) : p === 'center' && (x -= (g - d.position.height) / 2),
          m.scrollTo(0, Math.max(0, (x += b))))
        let S = !1
        const w = setTimeout(() => !S && i({ type: 'reset' }), 400)
        return () => {
          ;((S = !0), clearTimeout(w))
        }
      } else if (d.index !== void 0) {
        let x = (v.shortestColumn() / v.size()) * d.index
        ;(d.prevTop && (x = Math.max(x, d.prevTop + g)), m.scrollTo(0, x), f({ type: 'setPrevTop', value: x }))
      }
    }, [c, d, l, u, f]),
    y.useRef((m) => {
      i({ type: 'scrollToIndex', value: m })
    }).current
  )
}
const Zt = { index: void 0, position: void 0, prevTop: void 0 },
  xa = (t) => {
    const [e, n] = y.useState(0),
      [r, a] = y.useState(!1),
      s = dn(),
      o = t.scrollFps || 12
    y.useEffect(() => {
      if (!s) return
      const x = an(() => {
        ;(a(!0), n(s.scrollTop))
      }, 1e3 / o)
      return (
        s.addEventListener('scroll', x),
        () => {
          s.removeEventListener('scroll', x)
        }
      )
    }, [o, s])
    const l = y.useRef(0)
    y.useEffect(() => {
      l.current === 1 && a(!0)
      let x = !1
      const S = Is(
        () => {
          x || a(!1)
        },
        40 + 1e3 / o,
      )
      return (
        (l.current = 1),
        () => {
          ;((x = !0), $s(S))
        }
      )
    }, [o, e])
    const u = y.useRef(null),
      d = Bs({ initialWidth: t.ssrWidth, initialHeight: t.ssrHeight }),
      i = ba(u, d),
      f = Object.assign({ offset: i.offset, width: i.width || d[0], height: i.height || d[1], containerRef: u }, t),
      [c, m] = y.useState(0)
    y.useImperativeHandle(t.ref, () => ({
      reposition: () => {
        m((x) => x + 1)
      },
    }))
    const g = y.useRef(t.items.length)
    let p = !1
    ;(t.items.length !== g.current && (t.items.length < g.current && (p = !0), (g.current = t.items.length)),
      (f.positioner = da(f, [p ? Math.random() + c : c])),
      (f.resizeObserver = Sa(f.positioner)),
      (f.scrollTop = e),
      (f.isScrolling = r),
      (f.height = window.innerHeight))
    const b = ya(f.positioner, {
        height: f.height,
        offset: i.offset,
        align: typeof t.scrollToIndex == 'object' ? t.scrollToIndex.align : void 0,
      }),
      v = t.scrollToIndex && (typeof t.scrollToIndex == 'number' ? t.scrollToIndex : t.scrollToIndex.index)
    return (
      y.useEffect(() => {
        v !== void 0 && b(v)
      }, [v, b]),
      h.jsx(wa, { ...f })
    )
  }
function wa(t) {
  const e = Z.c(21)
  let n
  return (
    e[0] !== t.as ||
    e[1] !== t.className ||
    e[2] !== t.containerRef ||
    e[3] !== t.height ||
    e[4] !== t.id ||
    e[5] !== t.isScrolling ||
    e[6] !== t.itemAs ||
    e[7] !== t.itemHeightEstimate ||
    e[8] !== t.itemKey ||
    e[9] !== t.itemStyle ||
    e[10] !== t.items ||
    e[11] !== t.onRender ||
    e[12] !== t.overscanBy ||
    e[13] !== t.positioner ||
    e[14] !== t.render ||
    e[15] !== t.resizeObserver ||
    e[16] !== t.role ||
    e[17] !== t.scrollTop ||
    e[18] !== t.style ||
    e[19] !== t.tabIndex
      ? ((n = {
          scrollTop: t.scrollTop,
          isScrolling: t.isScrolling,
          positioner: t.positioner,
          resizeObserver: t.resizeObserver,
          items: t.items,
          onRender: t.onRender,
          as: t.as,
          id: t.id,
          className: t.className,
          style: t.style,
          role: t.role,
          tabIndex: t.tabIndex,
          containerRef: t.containerRef,
          itemAs: t.itemAs,
          itemStyle: t.itemStyle,
          itemHeightEstimate: t.itemHeightEstimate,
          itemKey: t.itemKey,
          overscanBy: t.overscanBy,
          height: t.height,
          render: t.render,
        }),
        (e[0] = t.as),
        (e[1] = t.className),
        (e[2] = t.containerRef),
        (e[3] = t.height),
        (e[4] = t.id),
        (e[5] = t.isScrolling),
        (e[6] = t.itemAs),
        (e[7] = t.itemHeightEstimate),
        (e[8] = t.itemKey),
        (e[9] = t.itemStyle),
        (e[10] = t.items),
        (e[11] = t.onRender),
        (e[12] = t.overscanBy),
        (e[13] = t.positioner),
        (e[14] = t.render),
        (e[15] = t.resizeObserver),
        (e[16] = t.role),
        (e[17] = t.scrollTop),
        (e[18] = t.style),
        (e[19] = t.tabIndex),
        (e[20] = n))
      : (n = e[20]),
    na(n)
  )
}
function ba(t, e = []) {
  const [n, r] = y.useState({ offset: 0, width: 0, height: 0 })
  return (
    y.useLayoutEffect(() => {
      const { current: a } = t
      if (a !== null) {
        let s = 0,
          o = a
        do ((s += o.offsetTop || 0), (o = o.offsetParent))
        while (o)
        ;(s !== n.offset || a.offsetWidth !== n.width) && r({ offset: s, width: a.offsetWidth, height: a.offsetHeight })
      }
    }, e),
    y.useEffect(() => {
      const a = new ResizeObserver(() => {
        r((s) => {
          const o = { ...s, width: t.current?.offsetWidth || 0 }
          return Wr(o, s) ? s : o
        })
      })
      return (
        a.observe(t.current),
        () => {
          a.disconnect()
        }
      )
    }, [n, t]),
    n
  )
}
function Sa(t) {
  const e = Z.c(6),
    [n] = Yr()
  let r
  e[0] !== n || e[1] !== t ? ((r = va(t, an(n, 83.33333333333333))), (e[0] = n), (e[1] = t), (e[2] = r)) : (r = e[2])
  const a = r
  let s, o
  return (
    e[3] !== a
      ? ((s = () => () => a.disconnect()), (o = [a]), (e[3] = a), (e[4] = s), (e[5] = o))
      : ((s = e[4]), (o = e[5])),
    y.useEffect(s, o),
    a
  )
}
function Ra() {
  return zr.useSyncExternalStore(
    Ca,
    () => !0,
    () => !1,
  )
}
function Ca() {
  return () => {}
}
var Ot = 'Avatar',
  [Ta] = Tr(Ot),
  [ja, Mn] = Ta(Ot),
  Ln = y.forwardRef((t, e) => {
    const { __scopeAvatar: n, ...r } = t,
      [a, s] = y.useState('idle')
    return h.jsx(ja, {
      scope: n,
      imageLoadingStatus: a,
      onImageLoadingStatusChange: s,
      children: h.jsx(Nt.span, { ...r, ref: e }),
    })
  })
Ln.displayName = Ot
var On = 'AvatarImage',
  Dn = y.forwardRef((t, e) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: a = () => {}, ...s } = t,
      o = Mn(On, n),
      l = Pa(r, s),
      u = jr((d) => {
        ;(a(d), o.onImageLoadingStatusChange(d))
      })
    return (
      vt(() => {
        l !== 'idle' && u(l)
      }, [l, u]),
      l === 'loaded' ? h.jsx(Nt.img, { ...s, ref: e, src: r }) : null
    )
  })
Dn.displayName = On
var _n = 'AvatarFallback',
  An = y.forwardRef((t, e) => {
    const { __scopeAvatar: n, delayMs: r, ...a } = t,
      s = Mn(_n, n),
      [o, l] = y.useState(r === void 0)
    return (
      y.useEffect(() => {
        if (r !== void 0) {
          const u = window.setTimeout(() => l(!0), r)
          return () => window.clearTimeout(u)
        }
      }, [r]),
      o && s.imageLoadingStatus !== 'loaded' ? h.jsx(Nt.span, { ...a, ref: e }) : null
    )
  })
An.displayName = _n
function en(t, e) {
  return t
    ? e
      ? (t.src !== e && (t.src = e), t.complete && t.naturalWidth > 0 ? 'loaded' : 'loading')
      : 'error'
    : 'idle'
}
function Pa(t, { referrerPolicy: e, crossOrigin: n }) {
  const r = Ra(),
    a = y.useRef(null),
    s = r ? (a.current || (a.current = new window.Image()), a.current) : null,
    [o, l] = y.useState(() => en(s, t))
  return (
    vt(() => {
      l(en(s, t))
    }, [s, t]),
    vt(() => {
      const u = (f) => () => {
        l(f)
      }
      if (!s) return
      const d = u('loaded'),
        i = u('error')
      return (
        s.addEventListener('load', d),
        s.addEventListener('error', i),
        e && (s.referrerPolicy = e),
        typeof n == 'string' && (s.crossOrigin = n),
        () => {
          ;(s.removeEventListener('load', d), s.removeEventListener('error', i))
        }
      )
    }, [s, n, e]),
    o
  )
}
var Ea = Ln,
  Na = Dn,
  Ma = An
const kn = (t) => {
    const e = Z.c(26),
      { style: n, className: r } = t,
      { t: a } = ve(),
      { i18n: s } = ve(),
      o = on().length
    let l
    e[0] !== r
      ? ((l = he('overflow-hidden border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900', r)),
        (e[0] = r),
        (e[1] = l))
      : (l = e[1])
    let u
    e[2] === Symbol.for('react.memo_cache_sentinel')
      ? ((u =
          ue.author.avatar &&
          h.jsxs(Ea, {
            children: [
              h.jsx(Na, { src: ue.author.avatar, className: 'size-16 rounded-full' }),
              h.jsx(Ma, { children: h.jsx('div', { className: 'bg-material-medium size-16 rounded-full' }) }),
            ],
          })),
        (e[2] = u))
      : (u = e[2])
    let d, i, f
    e[3] === Symbol.for('react.memo_cache_sentinel')
      ? ((d = h.jsx('div', {
          className: 'flex items-center justify-center',
          children: h.jsxs('div', {
            className: 'relative',
            children: [
              u,
              h.jsx('div', {
                className: he(
                  'from-accent to-accent/80 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg',
                  ue.author.avatar ? 'size-8 rounded absolute bottom-0 -right-3' : 'size-16 mb-4',
                ),
                children: h.jsx('i', { className: 'i-mingcute-camera-2-line text-2xl text-white' }),
              }),
            ],
          }),
        })),
        (i = h.jsx('h2', {
          className: 'mt-1 mb-1 text-2xl font-semibold text-gray-900 dark:text-white',
          children: ue.name,
        })),
        (f =
          ue.social &&
          h.jsxs('div', {
            className: 'mt-1 mb-3 flex items-center justify-center gap-3',
            children: [
              ue.social.github &&
                h.jsx('a', {
                  href: `https://github.com/${ue.social.github}`,
                  target: '_blank',
                  rel: 'noreferrer',
                  className:
                    'text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#E7E8E8]',
                  title: 'GitHub',
                  children: h.jsx('i', { className: 'i-mingcute-github-fill text-sm' }),
                }),
              ue.social.twitter &&
                h.jsx('a', {
                  href: `https://twitter.com/${ue.social.twitter.replace('@', '')}`,
                  target: '_blank',
                  rel: 'noreferrer',
                  className:
                    'text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#1da1f2]',
                  title: 'Twitter',
                  children: h.jsx('i', { className: 'i-mingcute-twitter-fill text-sm' }),
                }),
              ue.social.rss &&
                h.jsx('a', {
                  href: '/feed.xml',
                  target: '_blank',
                  className:
                    'text-text-secondary flex items-center justify-center p-2 duration-200 hover:text-[#ec672c]',
                  title: 'RSS',
                  children: h.jsx('i', { className: 'i-mingcute-rss-2-fill text-sm' }),
                }),
            ],
          })),
        (e[3] = d),
        (e[4] = i),
        (e[5] = f))
      : ((d = e[3]), (i = e[4]), (f = e[5]))
    const c = o || 0
    let m
    e[6] !== a || e[7] !== c
      ? ((m = a('gallery.photos', { count: c })), (e[6] = a), (e[7] = c), (e[8] = m))
      : (m = e[8])
    let g
    e[9] !== m
      ? ((g = h.jsxs('div', {
          className: 'px-6 pt-8 pb-6 text-center',
          children: [
            d,
            i,
            f,
            h.jsx('p', { className: 'text-sm font-medium text-gray-500 dark:text-gray-400', children: m }),
          ],
        })),
        (e[9] = m),
        (e[10] = g))
      : (g = e[10])
    let p
    e[11] === Symbol.for('react.memo_cache_sentinel')
      ? ((p = h.jsx('div', { className: 'px-6 pb-6', children: h.jsx(Tn, {}) })), (e[11] = p))
      : (p = e[11])
    let b
    e[12] === Symbol.for('react.memo_cache_sentinel')
      ? ((b = h.jsx('i', { className: 'i-mingcute-calendar-line text-sm' })), (e[12] = b))
      : (b = e[12])
    let v
    e[13] !== a ? ((v = a('gallery.built.at')), (e[13] = a), (e[14] = v)) : (v = e[14])
    let x
    e[15] !== s.language
      ? ((x = new Date('3/20/2026').toLocaleDateString(s.language, { year: 'numeric', month: 'long', day: 'numeric' })),
        (e[15] = s.language),
        (e[16] = x))
      : (x = e[16])
    let S
    e[17] === Symbol.for('react.memo_cache_sentinel')
      ? ((S = h.jsxs('span', {
          className: 'ml-1',
          children: [
            '(',
            h.jsx('a', {
              href: `${Pr.url}/commit/7181f6146c2b507126dda1b6a7dd514ec46e9fb9`,
              target: '_blank',
              rel: 'noreferrer',
              className: 'text-gray-500 dark:text-gray-400',
              children: '7181f6146c2b507126dda1b6a7dd514ec46e9fb9'.slice(0, 6),
            }),
            ')',
          ],
        })),
        (e[17] = S))
      : (S = e[17])
    let w
    e[18] !== v || e[19] !== x
      ? ((w = h.jsx('div', {
          className: 'border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50',
          children: h.jsxs('div', {
            className: 'flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400',
            children: [b, h.jsxs('span', { children: [v, x, S] })],
          }),
        })),
        (e[18] = v),
        (e[19] = x),
        (e[20] = w))
      : (w = e[20])
    let D
    return (
      e[21] !== n || e[22] !== l || e[23] !== w || e[24] !== g
        ? ((D = h.jsxs('div', { className: l, style: n, children: [g, p, w] })),
          (e[21] = n),
          (e[22] = l),
          (e[23] = w),
          (e[24] = g),
          (e[25] = D))
        : (D = e[25]),
      D
    )
  },
  La = ({ data: t, width: e, index: n }) => {
    const r = ln(),
      a = Mt(),
      { t: s } = ve(),
      [o, l] = y.useState(!1),
      [u, d] = y.useState(!1),
      [i, f] = y.useState(!1),
      [c, m] = y.useState(!1),
      [g, p] = y.useState(!1),
      [b, v] = y.useState(null),
      x = y.useRef(null),
      S = y.useRef(null),
      w = y.useRef(null),
      D = y.useRef(null),
      F = () => {
        l(!0)
      },
      T = () => {
        d(!0)
      },
      N = () => {
        const j = r.findIndex((_) => _.id === t.id)
        if (j !== -1) {
          const _ = x.current?.parentElement instanceof HTMLElement ? x.current.parentElement : x.current
          a.openViewer(j, _ ?? void 0)
        }
      },
      P = e / t.aspectRatio,
      O = (() => {
        const { exif: j } = t
        if (!j) return { focalLength35mm: null, iso: null, shutterSpeed: null, aperture: null }
        const _ = j.FocalLengthIn35mmFormat
            ? Number.parseInt(j.FocalLengthIn35mmFormat)
            : j.FocalLength
              ? Number.parseInt(j.FocalLength)
              : null,
          A = j.ISO,
          Y = j.ExposureTime,
          V = Y ? `${Y}s` : null,
          ee = j.FNumber ? `f/${j.FNumber}` : null
        return { focalLength35mm: _, iso: A, shutterSpeed: V, aperture: ee }
      })(),
      k = Ir(t.originalUrl || t.s3Key || ''),
      R = t.video !== void 0
    y.useEffect(() => {
      if (!t.video || !o || c || g || !S.current) return
      const { video: j, originalUrl: _ } = t
      return (
        (async () => {
          p(!0)
          const Y = new Fr()
          D.current = Y
          try {
            let V
            ;(j.type === 'motion-photo'
              ? (V = {
                  type: 'motion-photo',
                  imageUrl: _,
                  offset: j.offset,
                  size: j.size,
                  presentationTimestamp: j.presentationTimestamp,
                })
              : j.type === 'live-photo'
                ? (V = { type: 'live-photo', videoUrl: j.videoUrl })
                : (V = { type: 'none' }),
              V.type !== 'none' && (await Y.processVideo(V, S.current), m(!0)))
          } catch (V) {
            ;(console.error('Failed to process video:', V), v(V))
          } finally {
            p(!1)
          }
        })(),
        () => {
          D.current && (D.current.cleanup(), (D.current = null))
        }
      )
    }, [t.video, t.originalUrl, o, c])
    const B = y.useCallback(() => {
        zt ||
          !R ||
          !c ||
          i ||
          g ||
          (w.current = setTimeout(() => {
            f(!0)
            const j = S.current
            j && ((j.currentTime = 0), j.play())
          }, 200))
      }, [R, c, i, g]),
      z = y.useCallback(() => {
        if ((w.current && (clearTimeout(w.current), (w.current = null)), i)) {
          f(!1)
          const j = S.current
          j && (j.pause(), (j.currentTime = 0))
        }
      }, [i]),
      H = y.useCallback(() => {
        f(!1)
      }, [])
    return (
      y.useEffect(
        () => () => {
          w.current && (clearTimeout(w.current), (w.current = null))
        },
        [],
      ),
      h.jsxs(st.div, {
        className: 'bg-fill-quaternary group relative w-full cursor-pointer overflow-hidden',
        style: { width: e, height: P },
        'data-photo-id': t.id,
        onClick: N,
        onMouseEnter: B,
        onMouseLeave: z,
        children: [
          t.thumbHash && h.jsx(Hr, { thumbHash: t.thumbHash, className: 'absolute inset-0' }),
          !u &&
            h.jsx('img', {
              ref: x,
              src: t.thumbnailUrl,
              alt: t.title,
              className: ut('absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-105'),
              onLoad: F,
              onError: T,
            }),
          R &&
            h.jsx('video', {
              ref: S,
              className: ut(
                'absolute inset-0 h-full w-full object-cover duration-300 group-hover:scale-105',
                i ? 'z-10' : 'pointer-events-none opacity-0',
              ),
              muted: !0,
              playsInline: !0,
              onEnded: H,
            }),
          u &&
            h.jsx('div', {
              className: 'bg-fill-quaternary text-text-tertiary absolute inset-0 flex items-center justify-center',
              children: h.jsxs('div', {
                className: 'text-center',
                children: [
                  h.jsx('i', { className: 'i-mingcute-image-line text-2xl' }),
                  h.jsx('p', { className: 'mt-2 text-sm', children: s('photo.error.loading') }),
                ],
              }),
            }),
          R &&
            h.jsx('div', {
              className: ut(
                'absolute z-20 flex items-center space-x-1 rounded-xl bg-black/50 px-1 py-1 text-xs text-white transition-all duration-200 hover:bg-black/70',
                'top-2 left-2',
                'flex-wrap gap-y-1',
              ),
              title: s(zt ? 'photo.live.tooltip.mobile.main' : 'photo.live.tooltip.desktop.main'),
              children: g
                ? h.jsxs('div', {
                    className: 'flex items-center gap-1 px-1',
                    children: [
                      h.jsx('i', { className: 'i-mingcute-loading-line animate-spin' }),
                      h.jsx('span', { children: s('loading.converting') }),
                    ],
                  })
                : h.jsxs(y.Fragment, {
                    children: [
                      h.jsx('i', { className: 'i-mingcute-live-photo-line size-4 shrink-0' }),
                      h.jsx('span', { className: 'mr-1 shrink-0', children: s('photo.live.badge') }),
                      b
                        ? h.jsx('span', {
                            className: 'bg-warning/20 ml-0.5 rounded px-1 text-xs',
                            children: h.jsx('div', {
                              className: 'text-yellow w-3 text-center font-bold',
                              title: b.message,
                              children: '!',
                            }),
                          })
                        : null,
                    ],
                  }),
            }),
          o &&
            h.jsxs('div', {
              className: 'pointer-events-none',
              children: [
                h.jsx('div', {
                  className:
                    'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                }),
                h.jsxs('div', {
                  className: 'absolute inset-x-0 bottom-0 p-4 pb-0 text-white',
                  children: [
                    h.jsxs('div', {
                      className: 'mb-3 [&_*]:duration-300',
                      children: [
                        h.jsx('h3', {
                          className: 'mb-2 truncate text-sm font-medium opacity-0 group-hover:opacity-100',
                          children: t.title,
                        }),
                        t.description &&
                          h.jsx('p', {
                            className: 'mb-2 line-clamp-2 text-sm text-white/80 opacity-0 group-hover:opacity-100',
                            children: t.description,
                          }),
                        h.jsxs('div', {
                          className:
                            'mb-2 flex flex-wrap gap-2 text-xs text-white/80 opacity-0 group-hover:opacity-100',
                          children: [
                            h.jsx('span', { children: k }),
                            h.jsx('span', { children: '•' }),
                            h.jsxs('span', { children: [t.width, ' × ', t.height] }),
                            h.jsx('span', { children: '•' }),
                            h.jsxs('span', { children: [(t.size / 1024 / 1024).toFixed(1), 'MB'] }),
                          ],
                        }),
                        t.tags &&
                          t.tags.length > 0 &&
                          h.jsx('div', {
                            className: 'flex flex-wrap gap-1.5',
                            children: t.tags.map((j) =>
                              h.jsx(
                                'span',
                                {
                                  className:
                                    'rounded-full bg-white/20 px-2 py-0.5 text-xs text-white/90 opacity-0 backdrop-blur-sm group-hover:opacity-100',
                                  children: j,
                                },
                                j,
                              ),
                            ),
                          }),
                      ],
                    }),
                    P >= 200 &&
                      h.jsxs('div', {
                        className: 'grid grid-cols-2 gap-2 pb-4 text-xs',
                        children: [
                          O.focalLength35mm &&
                            h.jsxs('div', {
                              className:
                                'flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100',
                              children: [
                                h.jsx(Er, { className: 'text-white/70' }),
                                h.jsxs('span', { className: 'text-white/90', children: [O.focalLength35mm, 'mm'] }),
                              ],
                            }),
                          O.aperture &&
                            h.jsxs('div', {
                              className:
                                'flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100',
                              children: [
                                h.jsx(Nr, { className: 'text-white/70' }),
                                h.jsx('span', { className: 'text-white/90', children: O.aperture }),
                              ],
                            }),
                          O.shutterSpeed &&
                            h.jsxs('div', {
                              className:
                                'flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100',
                              children: [
                                h.jsx(Mr, { className: 'text-white/70' }),
                                h.jsx('span', { className: 'text-white/90', children: O.shutterSpeed }),
                              ],
                            }),
                          O.iso &&
                            h.jsxs('div', {
                              className:
                                'flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100',
                              children: [
                                h.jsx(Lr, { className: 'text-white/70' }),
                                h.jsxs('span', { className: 'text-white/90', children: ['ISO ', O.iso] }),
                              ],
                            }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
        ],
      })
    )
  }
class Ae {
  static default = new Ae()
}
const Oa = 30,
  Da = {
    auto: { mobile: 150, desktop: 250, maxColumns: 8 },
    min: { mobile: 120, desktop: 200 },
    max: { mobile: 250, desktop: 500 },
  },
  tn = () => {
    const t = Z.c(36),
      { columns: e } = cn(ke),
      n = y.useRef(!1),
      [r, a] = y.useState(!1),
      [s, o] = y.useState(0),
      l = ln(),
      u = y.useRef(null),
      { dateRange: d, handleRender: i } = qr(),
      f = dn()
    let c
    t[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((c = () => {
          n.current = !0
        }),
        (t[0] = c))
      : (c = t[0])
    const m = c,
      g = Fe(),
      [p, b] = y.useState(null)
    let v, x
    ;(t[1] === Symbol.for('react.memo_cache_sentinel')
      ? ((v = () => {
          const A = () => {
            o(window.innerWidth)
          }
          return (
            A(),
            window.addEventListener('resize', A),
            () => {
              window.removeEventListener('resize', A)
            }
          )
        }),
        (x = []),
        (t[1] = v),
        (t[2] = x))
      : ((v = t[1]), (x = t[2])),
      y.useEffect(v, x))
    let S
    e: {
      const { auto: A, min: Y, max: V } = Da,
        ee = s - (g ? 8 : 32)
      if (e === 'auto') {
        const se = g ? A.mobile : A.desktop
        if (!g) {
          const { maxColumns: te } = A
          if (Math.floor((ee + 4) / (se + 4)) > te) {
            S = (ee - (te - 1) * 4) / te
            break e
          }
        }
        S = se
        break e
      }
      const ie = (ee - (e - 1) * 4) / e,
        G = g ? Y.mobile : Y.desktop,
        re = g ? V.mobile : V.desktop
      S = Math.max(Math.min(ie, re), G)
    }
    const w = S
    let D, F
    ;(t[3] !== f
      ? ((D = () => {
          if (!f) return
          const A = () => {
            const { scrollTop: Y } = f
            a(Y > 500)
          }
          return (
            f.addEventListener('scroll', A, { passive: !0 }),
            () => {
              f.removeEventListener('scroll', A)
            }
          )
        }),
        (F = [f]),
        (t[3] = f),
        (t[4] = D),
        (t[5] = F))
      : ((D = t[4]), (F = t[5])),
      y.useEffect(D, F))
    let T
    t[6] !== d || t[7] !== g || t[8] !== r
      ? ((T =
          !g &&
          h.jsxs(h.Fragment, {
            children: [
              h.jsx(yt, { dateRange: d.formattedRange, location: d.location, isVisible: r && !!d.formattedRange }),
              h.jsx(Aa, { showFloatingActions: r }),
            ],
          })),
        (t[6] = d),
        (t[7] = g),
        (t[8] = r),
        (t[9] = T))
      : (T = t[9])
    let N
    t[10] !== d || t[11] !== g || t[12] !== r
      ? ((N =
          g &&
          !!d.formattedRange &&
          h.jsx('div', {
            className: 'fixed top-0 right-0 left-0 z-50',
            children: h.jsx(yt, {
              dateRange: d.formattedRange,
              location: d.location,
              isVisible: r && !!d.formattedRange,
              className: 'relative top-0 left-0',
            }),
          })),
        (t[10] = d),
        (t[11] = g),
        (t[12] = r),
        (t[13] = N))
      : (N = t[13])
    let P
    t[14] !== g ? ((P = g && h.jsx(kn, { className: 'mb-1' })), (t[14] = g), (t[15] = P)) : (P = t[15])
    let E
    t[16] !== g || t[17] !== l ? ((E = g ? l : [Ae.default, ...l]), (t[16] = g), (t[17] = l), (t[18] = E)) : (E = t[18])
    const O = E
    let k
    t[19] === Symbol.for('react.memo_cache_sentinel')
      ? ((k = (A) => h.jsx(_a, { ...A, hasAnimated: n.current, onAnimationComplete: m })), (t[19] = k))
      : (k = t[19])
    let R
    t[20] !== w || t[21] !== i || t[22] !== O
      ? ((R = h.jsx(xa, {
          ref: u,
          items: O,
          render: k,
          onRender: i,
          columnWidth: w,
          columnGutter: 4,
          rowGutter: 4,
          itemHeightEstimate: 400,
          itemKey: ka,
        })),
        (t[20] = w),
        (t[21] = i),
        (t[22] = O),
        (t[23] = R))
      : (R = t[23])
    let B
    t[24] !== R || t[25] !== P
      ? ((B = h.jsxs('div', { className: 'p-1 **:select-none! lg:px-0 lg:pb-0', children: [P, R] })),
        (t[24] = R),
        (t[25] = P),
        (t[26] = B))
      : (B = t[26])
    const z = !!p
    let H
    t[27] === Symbol.for('react.memo_cache_sentinel')
      ? ((H = (A) => {
          A || b(null)
        }),
        (t[27] = H))
      : (H = t[27])
    let j
    t[28] !== p || t[29] !== z
      ? ((j = h.jsx(_s, { open: z, onOpenChange: H, type: p })), (t[28] = p), (t[29] = z), (t[30] = j))
      : (j = t[30])
    let _
    return (
      t[31] !== B || t[32] !== j || t[33] !== T || t[34] !== N
        ? ((_ = h.jsxs(h.Fragment, { children: [T, N, B, j] })),
          (t[31] = B),
          (t[32] = j),
          (t[33] = T),
          (t[34] = N),
          (t[35] = _))
        : (_ = t[35]),
      _
    )
  },
  _a = y.memo((t) => {
    const e = Z.c(18),
      { data: n, width: r, index: a, hasAnimated: s, onAnimationComplete: o } = t
    let l
    e: {
      if (n instanceof Ae) {
        l = 'header'
        break e
      }
      l = n.id
    }
    const u = l,
      d = !s && a < Oa,
      i = d ? (n instanceof Ae ? 0 : Math.min(a * 0.05, 0.3)) : 0
    let f
    e[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((f = { opacity: 0, y: 30, scale: 0.95, filter: 'blur(4px)' }), (e[0] = f))
      : (f = e[0])
    let c
    e[1] !== i
      ? ((c = {
          hidden: f,
          visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { ...jt.presets.smooth, delay: i } },
        }),
        (e[1] = i),
        (e[2] = c))
      : (c = e[2])
    const m = c
    if (n instanceof Ae) {
      let g
      e[3] !== r ? ((g = { width: r }), (e[3] = r), (e[4] = g)) : (g = e[4])
      let p
      return (
        e[5] !== u || e[6] !== g ? ((p = h.jsx(kn, { style: g }, u)), (e[5] = u), (e[6] = g), (e[7] = p)) : (p = e[7]),
        p
      )
    } else {
      const g = d ? m : void 0,
        p = d ? 'hidden' : 'visible',
        b = d ? o : void 0,
        v = n
      let x
      e[8] !== a || e[9] !== v || e[10] !== r
        ? ((x = h.jsx(La, { data: v, width: r, index: a })), (e[8] = a), (e[9] = v), (e[10] = r), (e[11] = x))
        : (x = e[11])
      let S
      return (
        e[12] !== u || e[13] !== g || e[14] !== p || e[15] !== b || e[16] !== x
          ? ((S = h.jsx(
              st.div,
              { variants: g, initial: p, animate: 'visible', onAnimationComplete: b, children: x },
              u,
            )),
            (e[12] = u),
            (e[13] = g),
            (e[14] = p),
            (e[15] = b),
            (e[16] = x),
            (e[17] = S))
          : (S = e[17]),
        S
      )
    }
  }),
  Aa = (t) => {
    const e = Z.c(8),
      { showFloatingActions: n } = t,
      r = Fe()
    let a
    e[0] !== r
      ? ((a = r
          ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
          : { initial: { opacity: 0, x: 20, y: 0, scale: 0.95 }, animate: { opacity: 1, x: 0, y: 0, scale: 1 } }),
        (e[0] = r),
        (e[1] = a))
      : (a = e[1])
    const s = a
    let o
    e[2] !== r || e[3] !== n || e[4] !== s
      ? ((o =
          n &&
          h.jsx(st.div, {
            variants: s,
            initial: 'initial',
            animate: 'animate',
            exit: 'initial',
            transition: jt.presets.snappy,
            className: he(
              'border-material-opaque rounded-xl border bg-black/60 p-3 shadow-2xl backdrop-blur-[70px]',
              r ? 'rounded-t-none rounded-br-none -translate-y-px' : 'fixed top-4 right-4 z-50 lg:top-6 lg:right-6',
            ),
            children: h.jsx(Tn, {}),
          })),
        (e[2] = r),
        (e[3] = n),
        (e[4] = s),
        (e[5] = o))
      : (o = e[5])
    let l
    return (e[6] !== o ? ((l = h.jsx(rn, { children: o })), (e[6] = o), (e[7] = l)) : (l = e[7]), l)
  }
function ka(t, e) {
  return t instanceof Ae ? 'header' : t.id
}
const Va = () => {
  const t = Z.c(7)
  ;($a(), Ia())
  const e = Fe(),
    n = on()
  let r
  t[0] === Symbol.for('react.memo_cache_sentinel')
    ? ((r =
        ue.accentColor &&
        h.jsx('style', {
          dangerouslySetInnerHTML: {
            __html: `
          :root:has(input.theme-controller[value=dark]:checked), [data-theme="dark"] {
            --color-primary: ${ue.accentColor};
            --color-accent: ${ue.accentColor};
            --color-secondary: ${ue.accentColor};
          }
          `,
          },
        })),
      (t[0] = r))
    : (r = t[0])
  let a
  t[1] !== e
    ? ((a = e
        ? h.jsx(nn, { value: document.body, children: h.jsx(tn, {}) })
        : h.jsx(_r, { rootClassName: 'h-svh w-full', viewportClassName: 'size-full', children: h.jsx(tn, {}) })),
      (t[1] = e),
      (t[2] = a))
    : (a = t[2])
  let s
  t[3] === Symbol.for('react.memo_cache_sentinel') ? ((s = h.jsx(Ar, {})), (t[3] = s)) : (s = t[3])
  let o
  return (
    t[4] !== n || t[5] !== a
      ? ((o = h.jsx(h.Fragment, { children: h.jsxs(kr, { photos: n, children: [r, a, s] }) })),
        (t[4] = n),
        (t[5] = a),
        (t[6] = o))
      : (o = t[6]),
    o
  )
}
let Tt = !1
const $a = () => {
    const t = Z.c(6),
      e = y.useRef(!1),
      { openViewer: n } = Mt(),
      { photoId: r } = Or(),
      a = Pt(ke),
      [s] = un()
    let o, l
    ;(t[0] !== n || t[1] !== r || t[2] !== s || t[3] !== a
      ? ((o = () => {
          if (e.current) return
          if (((e.current = !0), (Tt = !0), r)) {
            const m = Ft.getPhotos().find((g) => g.id === r)
            m && n(Ft.getPhotos().indexOf(m))
          }
          const u = s.get('tags')?.split(','),
            d = s.get('cameras')?.split(','),
            i = s.get('lenses')?.split(','),
            f = s.get('rating') ? Number(s.get('rating')) : null,
            c = s.get('tag_mode')
          ;(u || d || i || f !== null || c) &&
            a((m) => ({
              ...m,
              selectedTags: u || m.selectedTags,
              selectedCameras: d || m.selectedCameras,
              selectedLenses: i || m.selectedLenses,
              selectedRatings: f ?? m.selectedRatings,
              tagFilterMode: c || m.tagFilterMode,
            }))
        }),
        (l = [n, r, s, a]),
        (t[0] = n),
        (t[1] = r),
        (t[2] = s),
        (t[3] = a),
        (t[4] = o),
        (t[5] = l))
      : ((o = t[4]), (l = t[5])),
      y.useEffect(o, l))
  },
  Ia = () => {
    const t = Z.c(14),
      { selectedTags: e, selectedCameras: n, selectedLenses: r, selectedRatings: a, tagFilterMode: s } = cn(ke),
      [, o] = un(),
      l = sn(),
      u = Dr(),
      { isOpen: d, currentIndex: i } = Mt()
    let f, c
    ;(t[0] !== i || t[1] !== d || t[2] !== u.pathname || t[3] !== l
      ? ((f = () => {
          if (Tt) {
            if (d) {
              const b = `/photos/${$r()[i].id}`
              u.pathname !== b && l(b)
            } else if (!(u.pathname === '/explory')) {
              const b = setTimeout(() => {
                l('/')
              }, 500)
              return () => clearTimeout(b)
            }
          }
        }),
        (c = [i, d, u.pathname, l]),
        (t[0] = i),
        (t[1] = d),
        (t[2] = u.pathname),
        (t[3] = l),
        (t[4] = f),
        (t[5] = c))
      : ((f = t[4]), (c = t[5])),
      y.useEffect(f, c))
    let m, g
    ;(t[6] !== n || t[7] !== r || t[8] !== a || t[9] !== e || t[10] !== o || t[11] !== s
      ? ((m = () => {
          if (!Tt) return
          const p = e.join(','),
            b = n.join(','),
            v = r.join(','),
            x = a?.toString() ?? '',
            S = s === 'union' ? '' : s
          o((w) => {
            const D = w.get('tags'),
              F = w.get('cameras'),
              T = w.get('lenses'),
              N = w.get('rating'),
              P = w.get('tag_mode')
            if (D === p && F === b && T === v && N === x && P === S) return w
            const E = new URLSearchParams(w)
            return (
              p ? E.set('tags', p) : E.delete('tags'),
              b ? E.set('cameras', b) : E.delete('cameras'),
              v ? E.set('lenses', v) : E.delete('lenses'),
              x ? E.set('rating', x) : E.delete('rating'),
              S ? E.set('tag_mode', S) : E.delete('tag_mode'),
              E
            )
          })
        }),
        (g = [e, n, r, a, s, o]),
        (t[6] = n),
        (t[7] = r),
        (t[8] = a),
        (t[9] = e),
        (t[10] = o),
        (t[11] = s),
        (t[12] = m),
        (t[13] = g))
      : ((m = t[12]), (g = t[13])),
      y.useEffect(m, g))
  }
export { Va as Component }
