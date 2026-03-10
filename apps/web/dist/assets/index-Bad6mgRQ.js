const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      'assets/index-CXUG0M6S.js',
      'vendor/1-CkNOVE2J.js',
      'assets/style-BYKV53eP.js',
      'assets/style.Cm_JH2.css',
      'assets/logo-control-D5fepCPT.js',
      'assets/index-RW8CfbhS.js',
      'assets/image-loader-manager-CiWYclWj.js',
      'vendor/0-BOriIG77.js',
      'vendor/2-VRqxSGaj.js',
      'assets/WebGLImageViewer-CUmzmelI.js',
      'assets/index.Bg-Nbl.css',
      'assets/manifest-D9ig2Y_5.js',
      'assets/blurhash-DU-ebuZf.js',
      'assets/iframe-DRoDFn9t.js',
      'assets/webgl-preview-C4jzABpz.js',
      'assets/layout-Djl0gVHJ.js',
      'assets/index-DDsl4UBi.js',
    ]),
) => i.map((i) => d[i])
import { r as f, R as V, c as de, j as g, b as Xh, d as ms, e as qh, f as Zw } from '../vendor/1-CkNOVE2J.js'
import { u as Kw, i as Yw, B as Xw, a as qw, I as Jw } from '../vendor/2-VRqxSGaj.js'
;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o)
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === 'childList')
        for (const s of i.addedNodes) s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(o) {
    const i = {}
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : o.crossOrigin === 'anonymous'
          ? (i.credentials = 'omit')
          : (i.credentials = 'same-origin'),
      i
    )
  }
  function r(o) {
    if (o.ep) return
    o.ep = !0
    const i = n(o)
    fetch(o.href, i)
  }
})()
/**
 * react-router v7.9.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var Jh = (e) => {
    throw TypeError(e)
  },
  Qw = (e, t, n) => t.has(e) || Jh('Cannot ' + n),
  ia = (e, t, n) => (Qw(e, t, 'read from private field'), n ? n.call(e) : t.get(e)),
  ex = (e, t, n) =>
    t.has(e) ? Jh('Cannot add the same private member more than once') : t instanceof WeakSet ? t.add(e) : t.set(e, n),
  nd = 'popstate'
function tx(e = {}) {
  function t(r, o) {
    let { pathname: i, search: s, hash: a } = r.location
    return bo(
      '',
      { pathname: i, search: s, hash: a },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || 'default',
    )
  }
  function n(r, o) {
    return typeof o == 'string' ? o : Kt(o)
  }
  return rx(t, n, null, e)
}
function ve(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t)
}
function je(e, t) {
  if (!e) {
    typeof console < 'u' && console.warn(t)
    try {
      throw new Error(t)
    } catch {}
  }
}
function nx() {
  return Math.random().toString(36).substring(2, 10)
}
function rd(e, t) {
  return { usr: e.state, key: e.key, idx: t }
}
function bo(e, t, n = null, r) {
  return {
    pathname: typeof e == 'string' ? e : e.pathname,
    search: '',
    hash: '',
    ...(typeof t == 'string' ? Rn(t) : t),
    state: n,
    key: (t && t.key) || r || nx(),
  }
}
function Kt({ pathname: e = '/', search: t = '', hash: n = '' }) {
  return (
    t && t !== '?' && (e += t.charAt(0) === '?' ? t : '?' + t),
    n && n !== '#' && (e += n.charAt(0) === '#' ? n : '#' + n),
    e
  )
}
function Rn(e) {
  let t = {}
  if (e) {
    let n = e.indexOf('#')
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)))
    let r = e.indexOf('?')
    ;(r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))), e && (t.pathname = e))
  }
  return t
}
function rx(e, t, n, r = {}) {
  let { window: o = document.defaultView, v5Compat: i = !1 } = r,
    s = o.history,
    a = 'POP',
    l = null,
    c = u()
  c == null && ((c = 0), s.replaceState({ ...s.state, idx: c }, ''))
  function u() {
    return (s.state || { idx: null }).idx
  }
  function d() {
    a = 'POP'
    let v = u(),
      w = v == null ? null : v - c
    ;((c = v), l && l({ action: a, location: y.location, delta: w }))
  }
  function h(v, w) {
    a = 'PUSH'
    let b = bo(y.location, v, w)
    c = u() + 1
    let x = rd(b, c),
      E = y.createHref(b)
    try {
      s.pushState(x, '', E)
    } catch (C) {
      if (C instanceof DOMException && C.name === 'DataCloneError') throw C
      o.location.assign(E)
    }
    i && l && l({ action: a, location: y.location, delta: 1 })
  }
  function p(v, w) {
    a = 'REPLACE'
    let b = bo(y.location, v, w)
    c = u()
    let x = rd(b, c),
      E = y.createHref(b)
    ;(s.replaceState(x, '', E), i && l && l({ action: a, location: y.location, delta: 0 }))
  }
  function m(v) {
    return Qh(v)
  }
  let y = {
    get action() {
      return a
    },
    get location() {
      return e(o, s)
    },
    listen(v) {
      if (l) throw new Error('A history only accepts one active listener')
      return (
        o.addEventListener(nd, d),
        (l = v),
        () => {
          ;(o.removeEventListener(nd, d), (l = null))
        }
      )
    },
    createHref(v) {
      return t(o, v)
    },
    createURL: m,
    encodeLocation(v) {
      let w = m(v)
      return { pathname: w.pathname, search: w.search, hash: w.hash }
    },
    push: h,
    replace: p,
    go(v) {
      return s.go(v)
    },
  }
  return y
}
function Qh(e, t = !1) {
  let n = 'http://localhost'
  ;(typeof window < 'u' && (n = window.location.origin !== 'null' ? window.location.origin : window.location.href),
    ve(n, 'No window.location.(origin|href) available to create URL'))
  let r = typeof e == 'string' ? e : Kt(e)
  return ((r = r.replace(/ $/, '%20')), !t && r.startsWith('//') && (r = n + r), new URL(r, n))
}
var ao,
  od = class {
    constructor(e) {
      if ((ex(this, ao, new Map()), e)) for (let [t, n] of e) this.set(t, n)
    }
    get(e) {
      if (ia(this, ao).has(e)) return ia(this, ao).get(e)
      if (e.defaultValue !== void 0) return e.defaultValue
      throw new Error('No value found for context')
    }
    set(e, t) {
      ia(this, ao).set(e, t)
    }
  }
ao = new WeakMap()
var ox = new Set(['lazy', 'caseSensitive', 'path', 'id', 'index', 'children'])
function ix(e) {
  return ox.has(e)
}
var sx = new Set(['lazy', 'caseSensitive', 'path', 'id', 'index', 'middleware', 'children'])
function ax(e) {
  return sx.has(e)
}
function lx(e) {
  return e.index === !0
}
function wo(e, t, n = [], r = {}, o = !1) {
  return e.map((i, s) => {
    let a = [...n, String(s)],
      l = typeof i.id == 'string' ? i.id : a.join('-')
    if (
      (ve(i.index !== !0 || !i.children, 'Cannot specify children on an index route'),
      ve(
        o || !r[l],
        `Found a route id collision on id "${l}".  Route id's must be globally unique within Data Router usages`,
      ),
      lx(i))
    ) {
      let c = { ...i, id: l }
      return ((r[l] = id(c, t(c))), c)
    } else {
      let c = { ...i, id: l, children: void 0 }
      return ((r[l] = id(c, t(c))), i.children && (c.children = wo(i.children, t, a, r, o)), c)
    }
  })
}
function id(e, t) {
  return Object.assign(e, {
    ...t,
    ...(typeof t.lazy == 'object' && t.lazy != null ? { lazy: { ...e.lazy, ...t.lazy } } : {}),
  })
}
function vn(e, t, n = '/') {
  return Ri(e, t, n, !1)
}
function Ri(e, t, n, r) {
  let o = typeof t == 'string' ? Rn(t) : t,
    i = Ct(o.pathname || '/', n)
  if (i == null) return null
  let s = ep(e)
  ux(s)
  let a = null
  for (let l = 0; a == null && l < s.length; ++l) {
    let c = xx(i)
    a = bx(s[l], c, r)
  }
  return a
}
function cx(e, t) {
  let { route: n, pathname: r, params: o } = e
  return { id: n.id, pathname: r, params: o, data: t[n.id], loaderData: t[n.id], handle: n.handle }
}
function ep(e, t = [], n = [], r = '', o = !1) {
  let i = (s, a, l = o, c) => {
    let u = {
      relativePath: c === void 0 ? s.path || '' : c,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: a,
      route: s,
    }
    if (u.relativePath.startsWith('/')) {
      if (!u.relativePath.startsWith(r) && l) return
      ;(ve(
        u.relativePath.startsWith(r),
        `Absolute route path "${u.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (u.relativePath = u.relativePath.slice(r.length)))
    }
    let d = Wt([r, u.relativePath]),
      h = n.concat(u)
    ;(s.children &&
      s.children.length > 0 &&
      (ve(
        s.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${d}".`,
      ),
      ep(s.children, t, h, d, l)),
      !(s.path == null && !s.index) && t.push({ path: d, score: yx(d, s.index), routesMeta: h }))
  }
  return (
    e.forEach((s, a) => {
      if (s.path === '' || !s.path?.includes('?')) i(s, a)
      else for (let l of tp(s.path)) i(s, a, !0, l)
    }),
    t
  )
}
function tp(e) {
  let t = e.split('/')
  if (t.length === 0) return []
  let [n, ...r] = t,
    o = n.endsWith('?'),
    i = n.replace(/\?$/, '')
  if (r.length === 0) return o ? [i, ''] : [i]
  let s = tp(r.join('/')),
    a = []
  return (
    a.push(...s.map((l) => (l === '' ? i : [i, l].join('/')))),
    o && a.push(...s),
    a.map((l) => (e.startsWith('/') && l === '' ? '/' : l))
  )
}
function ux(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : vx(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex),
        ),
  )
}
var dx = /^:[\w-]+$/,
  fx = 3,
  hx = 2,
  px = 1,
  mx = 10,
  gx = -2,
  sd = (e) => e === '*'
function yx(e, t) {
  let n = e.split('/'),
    r = n.length
  return (
    n.some(sd) && (r += gx),
    t && (r += hx),
    n.filter((o) => !sd(o)).reduce((o, i) => o + (dx.test(i) ? fx : i === '' ? px : mx), r)
  )
}
function vx(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0
}
function bx(e, t, n = !1) {
  let { routesMeta: r } = e,
    o = {},
    i = '/',
    s = []
  for (let a = 0; a < r.length; ++a) {
    let l = r[a],
      c = a === r.length - 1,
      u = i === '/' ? t : t.slice(i.length) || '/',
      d = $i({ path: l.relativePath, caseSensitive: l.caseSensitive, end: c }, u),
      h = l.route
    if (
      (!d &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (d = $i({ path: l.relativePath, caseSensitive: l.caseSensitive, end: !1 }, u)),
      !d)
    )
      return null
    ;(Object.assign(o, d.params),
      s.push({ params: o, pathname: Wt([i, d.pathname]), pathnameBase: Px(Wt([i, d.pathnameBase])), route: h }),
      d.pathnameBase !== '/' && (i = Wt([i, d.pathnameBase])))
  }
  return s
}
function $i(e, t) {
  typeof e == 'string' && (e = { path: e, caseSensitive: !1, end: !0 })
  let [n, r] = wx(e.path, e.caseSensitive, e.end),
    o = t.match(n)
  if (!o) return null
  let i = o[0],
    s = i.replace(/(.)\/+$/, '$1'),
    a = o.slice(1)
  return {
    params: r.reduce((c, { paramName: u, isOptional: d }, h) => {
      if (u === '*') {
        let m = a[h] || ''
        s = i.slice(0, i.length - m.length).replace(/(.)\/+$/, '$1')
      }
      const p = a[h]
      return (d && !p ? (c[u] = void 0) : (c[u] = (p || '').replace(/%2F/g, '/')), c)
    }, {}),
    pathname: i,
    pathnameBase: s,
    pattern: e,
  }
}
function wx(e, t = !1, n = !0) {
  je(
    e === '*' || !e.endsWith('*') || e.endsWith('/*'),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, '/*')}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, '/*')}".`,
  )
  let r = [],
    o =
      '^' +
      e
        .replace(/\/*\*?$/, '')
        .replace(/^\/*/, '/')
        .replace(/[\\.*+^${}|()[\]]/g, '\\$&')
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (s, a, l) => (r.push({ paramName: a, isOptional: l != null }), l ? '/?([^\\/]+)?' : '/([^\\/]+)'),
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, '(/$1)?$2')
  return (
    e.endsWith('*')
      ? (r.push({ paramName: '*' }), (o += e === '*' || e === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'))
      : n
        ? (o += '\\/*$')
        : e !== '' && e !== '/' && (o += '(?:(?=\\/|$))'),
    [new RegExp(o, t ? void 0 : 'i'), r]
  )
}
function xx(e) {
  try {
    return e
      .split('/')
      .map((t) => decodeURIComponent(t).replace(/\//g, '%2F'))
      .join('/')
  } catch (t) {
    return (
      je(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    )
  }
}
function Ct(e, t) {
  if (t === '/') return e
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null
  let n = t.endsWith('/') ? t.length - 1 : t.length,
    r = e.charAt(n)
  return r && r !== '/' ? null : e.slice(n) || '/'
}
function Sx({ basename: e, pathname: t }) {
  return t === '/' ? e : Wt([e, t])
}
function Cx(e, t = '/') {
  let { pathname: n, search: r = '', hash: o = '' } = typeof e == 'string' ? Rn(e) : e
  return { pathname: n ? (n.startsWith('/') ? n : Ex(n, t)) : t, search: Rx(r), hash: Tx(o) }
}
function Ex(e, t) {
  let n = t.replace(/\/+$/, '').split('/')
  return (
    e.split('/').forEach((o) => {
      o === '..' ? n.length > 1 && n.pop() : o !== '.' && n.push(o)
    }),
    n.length > 1 ? n.join('/') : '/'
  )
}
function sa(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function np(e) {
  return e.filter((t, n) => n === 0 || (t.route.path && t.route.path.length > 0))
}
function Gl(e) {
  let t = np(e)
  return t.map((n, r) => (r === t.length - 1 ? n.pathname : n.pathnameBase))
}
function Zl(e, t, n, r = !1) {
  let o
  typeof e == 'string'
    ? (o = Rn(e))
    : ((o = { ...e }),
      ve(!o.pathname || !o.pathname.includes('?'), sa('?', 'pathname', 'search', o)),
      ve(!o.pathname || !o.pathname.includes('#'), sa('#', 'pathname', 'hash', o)),
      ve(!o.search || !o.search.includes('#'), sa('#', 'search', 'hash', o)))
  let i = e === '' || o.pathname === '',
    s = i ? '/' : o.pathname,
    a
  if (s == null) a = n
  else {
    let d = t.length - 1
    if (!r && s.startsWith('..')) {
      let h = s.split('/')
      for (; h[0] === '..'; ) (h.shift(), (d -= 1))
      o.pathname = h.join('/')
    }
    a = d >= 0 ? t[d] : '/'
  }
  let l = Cx(o, a),
    c = s && s !== '/' && s.endsWith('/'),
    u = (i || s === '.') && n.endsWith('/')
  return (!l.pathname.endsWith('/') && (c || u) && (l.pathname += '/'), l)
}
var Wt = (e) => e.join('/').replace(/\/\/+/g, '/'),
  Px = (e) => e.replace(/\/+$/, '').replace(/^\/*/, '/'),
  Rx = (e) => (!e || e === '?' ? '' : e.startsWith('?') ? e : '?' + e),
  Tx = (e) => (!e || e === '#' ? '' : e.startsWith('#') ? e : '#' + e),
  Fi = class {
    constructor(e, t, n, r = !1) {
      ;((this.status = e),
        (this.statusText = t || ''),
        (this.internal = r),
        n instanceof Error ? ((this.data = n.toString()), (this.error = n)) : (this.data = n))
    }
  }
function Ar(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.internal == 'boolean' &&
    'data' in e
  )
}
function Kl(e) {
  return e.filter(Boolean).join('/').replace(/\/\/*/g, '/') || '/'
}
var wn = Symbol('Uninstrumented')
function Ax(e, t) {
  let n = {
    lazy: [],
    'lazy.loader': [],
    'lazy.action': [],
    'lazy.middleware': [],
    middleware: [],
    loader: [],
    action: [],
  }
  e.forEach((o) =>
    o({
      id: t.id,
      index: t.index,
      path: t.path,
      instrument(i) {
        let s = Object.keys(n)
        for (let a of s) i[a] && n[a].push(i[a])
      },
    }),
  )
  let r = {}
  if (typeof t.lazy == 'function' && n.lazy.length > 0) {
    let o = pr(n.lazy, t.lazy, () => {})
    o && (r.lazy = o)
  }
  if (typeof t.lazy == 'object') {
    let o = t.lazy
    ;['middleware', 'loader', 'action'].forEach((i) => {
      let s = o[i],
        a = n[`lazy.${i}`]
      if (typeof s == 'function' && a.length > 0) {
        let l = pr(a, s, () => {})
        l && (r.lazy = Object.assign(r.lazy || {}, { [i]: l }))
      }
    })
  }
  return (
    ['loader', 'action'].forEach((o) => {
      let i = t[o]
      if (typeof i == 'function' && n[o].length > 0) {
        let s = i[wn] ?? i,
          a = pr(n[o], s, (...l) => ad(l[0]))
        a && ((a[wn] = s), (r[o] = a))
      }
    }),
    t.middleware &&
      t.middleware.length > 0 &&
      n.middleware.length > 0 &&
      (r.middleware = t.middleware.map((o) => {
        let i = o[wn] ?? o,
          s = pr(n.middleware, i, (...a) => ad(a[0]))
        return s ? ((s[wn] = i), s) : o
      })),
    r
  )
}
function _x(e, t) {
  let n = { navigate: [], fetch: [] }
  if (
    (t.forEach((r) =>
      r({
        instrument(o) {
          let i = Object.keys(o)
          for (let s of i) o[s] && n[s].push(o[s])
        },
      }),
    ),
    n.navigate.length > 0)
  ) {
    let r = e.navigate[wn] ?? e.navigate,
      o = pr(n.navigate, r, (...i) => {
        let [s, a] = i
        return { to: typeof s == 'number' || typeof s == 'string' ? s : s ? Kt(s) : '.', ...ld(e, a ?? {}) }
      })
    o && ((o[wn] = r), (e.navigate = o))
  }
  if (n.fetch.length > 0) {
    let r = e.fetch[wn] ?? e.fetch,
      o = pr(n.fetch, r, (...i) => {
        let [s, , a, l] = i
        return { href: a ?? '.', fetcherKey: s, ...ld(e, l ?? {}) }
      })
    o && ((o[wn] = r), (e.fetch = o))
  }
  return e
}
function pr(e, t, n) {
  return e.length === 0
    ? null
    : async (...r) => {
        let o = await rp(e, n(...r), () => t(...r), e.length - 1)
        if (o.type === 'error') throw o.value
        return o.value
      }
}
async function rp(e, t, n, r) {
  let o = e[r],
    i
  if (o) {
    let s,
      a = async () => (
        s ? console.error('You cannot call instrumented handlers more than once') : (s = rp(e, t, n, r - 1)),
        (i = await s),
        ve(i, 'Expected a result'),
        i.type === 'error' && i.value instanceof Error
          ? { status: 'error', error: i.value }
          : { status: 'success', error: void 0 }
      )
    try {
      await o(a, t)
    } catch (l) {
      console.error('An instrumentation function threw an error:', l)
    }
    ;(s || (await a()), await s)
  } else
    try {
      i = { type: 'success', value: await n() }
    } catch (s) {
      i = { type: 'error', value: s }
    }
  return i || { type: 'error', value: new Error('No result assigned in instrumentation chain.') }
}
function ad(e) {
  let { request: t, context: n, params: r, unstable_pattern: o } = e
  return { request: Mx(t), params: { ...r }, unstable_pattern: o, context: kx(n) }
}
function ld(e, t) {
  return {
    currentUrl: Kt(e.state.location),
    ...('formMethod' in t ? { formMethod: t.formMethod } : {}),
    ...('formEncType' in t ? { formEncType: t.formEncType } : {}),
    ...('formData' in t ? { formData: t.formData } : {}),
    ...('body' in t ? { body: t.body } : {}),
  }
}
function Mx(e) {
  return { method: e.method, url: e.url, headers: { get: (...t) => e.headers.get(...t) } }
}
function kx(e) {
  if (Ix(e)) {
    let t = { ...e }
    return (Object.freeze(t), t)
  } else return { get: (t) => e.get(t) }
}
var Dx = Object.getOwnPropertyNames(Object.prototype).sort().join('\0')
function Ix(e) {
  if (e === null || typeof e != 'object') return !1
  const t = Object.getPrototypeOf(e)
  return t === Object.prototype || t === null || Object.getOwnPropertyNames(t).sort().join('\0') === Dx
}
var op = ['POST', 'PUT', 'PATCH', 'DELETE'],
  Ox = new Set(op),
  Nx = ['GET', ...op],
  Lx = new Set(Nx),
  jx = new Set([301, 302, 303, 307, 308]),
  $x = new Set([307, 308]),
  aa = {
    state: 'idle',
    location: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  Fx = {
    state: 'idle',
    data: void 0,
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
  },
  to = { state: 'unblocked', proceed: void 0, reset: void 0, location: void 0 },
  zx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Yl = (e) => zx.test(e),
  Vx = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }),
  ip = 'remix-router-transitions',
  sp = Symbol('ResetLoaderData')
function Bx(e) {
  const t = e.window ? e.window : typeof window < 'u' ? window : void 0,
    n = typeof t < 'u' && typeof t.document < 'u' && typeof t.document.createElement < 'u'
  ve(e.routes.length > 0, 'You must provide a non-empty routes array to createRouter')
  let r = e.hydrationRouteProperties || [],
    o = e.mapRouteProperties || Vx,
    i = o
  if (e.unstable_instrumentations) {
    let P = e.unstable_instrumentations
    i = (T) => ({ ...o(T), ...Ax(P.map((M) => M.route).filter(Boolean), T) })
  }
  let s = {},
    a = wo(e.routes, i, void 0, s),
    l,
    c = e.basename || '/'
  c.startsWith('/') || (c = `/${c}`)
  let u = e.dataStrategy || Zx,
    d = { ...e.future },
    h = null,
    p = new Set(),
    m = null,
    y = null,
    v = null,
    w = e.hydrationData != null,
    b = vn(a, e.history.location, c),
    x = !1,
    E = null,
    C
  if (b == null && !e.patchRoutesOnNavigation) {
    let P = bt(404, { pathname: e.history.location.pathname }),
      { matches: T, route: M } = ri(a)
    ;((C = !0), (b = T), (E = { [M.id]: P }))
  } else if ((b && !e.hydrationData && Ne(b, a, e.history.location.pathname).active && (b = null), b))
    if (b.some((P) => P.route.lazy)) C = !1
    else if (!b.some((P) => Xl(P.route))) C = !0
    else {
      let P = e.hydrationData ? e.hydrationData.loaderData : null,
        T = e.hydrationData ? e.hydrationData.errors : null
      if (T) {
        let M = b.findIndex((j) => T[j.route.id] !== void 0)
        C = b.slice(0, M + 1).every((j) => !Ua(j.route, P, T))
      } else C = b.every((M) => !Ua(M.route, P, T))
    }
  else {
    ;((C = !1), (b = []))
    let P = Ne(null, a, e.history.location.pathname)
    P.active && P.matches && ((x = !0), (b = P.matches))
  }
  let A,
    S = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: b,
      initialized: C,
      navigation: aa,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: 'idle',
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || E,
      fetchers: new Map(),
      blockers: new Map(),
    },
    R = 'POP',
    I = !1,
    N,
    G = !1,
    oe = new Map(),
    te = null,
    L = !1,
    F = !1,
    O = new Set(),
    D = new Map(),
    _ = 0,
    k = -1,
    W = new Map(),
    q = new Set(),
    ae = new Map(),
    B = new Map(),
    Z = new Set(),
    J = new Map(),
    he,
    z = null
  function ee() {
    if (
      ((h = e.history.listen(({ action: P, location: T, delta: M }) => {
        if (he) {
          ;(he(), (he = void 0))
          return
        }
        je(
          J.size === 0 || M != null,
          'You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.',
        )
        let j = Jo({ currentLocation: S.location, nextLocation: T, historyAction: P })
        if (j && M != null) {
          let H = new Promise((K) => {
            he = K
          })
          ;(e.history.go(M * -1),
            ft(j, {
              state: 'blocked',
              location: T,
              proceed() {
                ;(ft(j, { state: 'proceeding', proceed: void 0, reset: void 0, location: T }),
                  H.then(() => e.history.go(M)))
              },
              reset() {
                let K = new Map(S.blockers)
                ;(K.set(j, to), le({ blockers: K }))
              },
            }))
          return
        }
        return dt(P, T)
      })),
      n)
    ) {
      l0(t, oe)
      let P = () => c0(t, oe)
      ;(t.addEventListener('pagehide', P), (te = () => t.removeEventListener('pagehide', P)))
    }
    return (S.initialized || dt('POP', S.location, { initialHydration: !0 }), A)
  }
  function Ce() {
    ;(h && h(),
      te && te(),
      p.clear(),
      N && N.abort(),
      S.fetchers.forEach((P, T) => ir(T)),
      S.blockers.forEach((P, T) => sr(T)))
  }
  function be(P) {
    return (p.add(P), () => p.delete(P))
  }
  function le(P, T = {}) {
    ;(P.matches &&
      (P.matches = P.matches.map((H) => {
        let K = s[H.route.id],
          ne = H.route
        return ne.element !== K.element ||
          ne.errorElement !== K.errorElement ||
          ne.hydrateFallbackElement !== K.hydrateFallbackElement
          ? { ...H, route: K }
          : H
      })),
      (S = { ...S, ...P }))
    let M = [],
      j = []
    ;(S.fetchers.forEach((H, K) => {
      H.state === 'idle' && (Z.has(K) ? M.push(K) : j.push(K))
    }),
      Z.forEach((H) => {
        !S.fetchers.has(H) && !D.has(H) && M.push(H)
      }),
      [...p].forEach((H) =>
        H(S, { deletedFetchers: M, viewTransitionOpts: T.viewTransitionOpts, flushSync: T.flushSync === !0 }),
      ),
      M.forEach((H) => ir(H)),
      j.forEach((H) => S.fetchers.delete(H)))
  }
  function ge(P, T, { flushSync: M } = {}) {
    let j =
        S.actionData != null &&
        S.navigation.formMethod != null &&
        rt(S.navigation.formMethod) &&
        S.navigation.state === 'loading' &&
        P.state?._isRedirect !== !0,
      H
    T.actionData
      ? Object.keys(T.actionData).length > 0
        ? (H = T.actionData)
        : (H = null)
      : j
        ? (H = S.actionData)
        : (H = null)
    let K = T.loaderData ? vd(S.loaderData, T.loaderData, T.matches || [], T.errors) : S.loaderData,
      ne = S.blockers
    ne.size > 0 && ((ne = new Map(ne)), ne.forEach((ie, re) => ne.set(re, to)))
    let Q = L ? !1 : Oe(P, T.matches || S.matches),
      se = I === !0 || (S.navigation.formMethod != null && rt(S.navigation.formMethod) && P.state?._isRedirect !== !0)
    ;(l && ((a = l), (l = void 0)),
      L ||
        R === 'POP' ||
        (R === 'PUSH' ? e.history.push(P, P.state) : R === 'REPLACE' && e.history.replace(P, P.state)))
    let ce
    if (R === 'POP') {
      let ie = oe.get(S.location.pathname)
      ie && ie.has(P.pathname)
        ? (ce = { currentLocation: S.location, nextLocation: P })
        : oe.has(P.pathname) && (ce = { currentLocation: P, nextLocation: S.location })
    } else if (G) {
      let ie = oe.get(S.location.pathname)
      ;(ie ? ie.add(P.pathname) : ((ie = new Set([P.pathname])), oe.set(S.location.pathname, ie)),
        (ce = { currentLocation: S.location, nextLocation: P }))
    }
    ;(le(
      {
        ...T,
        actionData: H,
        loaderData: K,
        historyAction: R,
        location: P,
        initialized: !0,
        navigation: aa,
        revalidation: 'idle',
        restoreScrollPosition: Q,
        preventScrollReset: se,
        blockers: ne,
      },
      { viewTransitionOpts: ce, flushSync: M === !0 },
    ),
      (R = 'POP'),
      (I = !1),
      (G = !1),
      (L = !1),
      (F = !1),
      z?.resolve(),
      (z = null))
  }
  async function Ze(P, T) {
    if (typeof P == 'number') {
      e.history.go(P)
      return
    }
    let M = Ba(S.location, S.matches, c, P, T?.fromRouteId, T?.relative),
      { path: j, submission: H, error: K } = cd(!1, M, T),
      ne = S.location,
      Q = bo(S.location, j, T && T.state)
    Q = { ...Q, ...e.history.encodeLocation(Q) }
    let se = T && T.replace != null ? T.replace : void 0,
      ce = 'PUSH'
    se === !0
      ? (ce = 'REPLACE')
      : se === !1 ||
        (H != null && rt(H.formMethod) && H.formAction === S.location.pathname + S.location.search && (ce = 'REPLACE'))
    let ie = T && 'preventScrollReset' in T ? T.preventScrollReset === !0 : void 0,
      re = (T && T.flushSync) === !0,
      xe = Jo({ currentLocation: ne, nextLocation: Q, historyAction: ce })
    if (xe) {
      ft(xe, {
        state: 'blocked',
        location: Q,
        proceed() {
          ;(ft(xe, { state: 'proceeding', proceed: void 0, reset: void 0, location: Q }), Ze(P, T))
        },
        reset() {
          let Te = new Map(S.blockers)
          ;(Te.set(xe, to), le({ blockers: Te }))
        },
      })
      return
    }
    await dt(ce, Q, {
      submission: H,
      pendingError: K,
      preventScrollReset: ie,
      replace: T && T.replace,
      enableViewTransition: T && T.viewTransition,
      flushSync: re,
    })
  }
  function ut() {
    ;(z || (z = u0()), un(), le({ revalidation: 'loading' }))
    let P = z.promise
    return S.navigation.state === 'submitting'
      ? P
      : S.navigation.state === 'idle'
        ? (dt(S.historyAction, S.location, { startUninterruptedRevalidation: !0 }), P)
        : (dt(R || S.historyAction, S.navigation.location, {
            overrideNavigation: S.navigation,
            enableViewTransition: G === !0,
          }),
          P)
  }
  async function dt(P, T, M) {
    ;(N && N.abort(),
      (N = null),
      (R = P),
      (L = (M && M.startUninterruptedRevalidation) === !0),
      pe(S.location, S.matches),
      (I = (M && M.preventScrollReset) === !0),
      (G = (M && M.enableViewTransition) === !0))
    let j = l || a,
      H = M && M.overrideNavigation,
      K = M?.initialHydration && S.matches && S.matches.length > 0 && !x ? S.matches : vn(j, T, c),
      ne = (M && M.flushSync) === !0
    if (K && S.initialized && !F && t0(S.location, T) && !(M && M.submission && rt(M.submission.formMethod))) {
      ge(T, { matches: K }, { flushSync: ne })
      return
    }
    let Q = Ne(K, j, T.pathname)
    if ((Q.active && Q.matches && (K = Q.matches), !K)) {
      let { error: nt, notFoundMatches: Me, route: Pe } = qr(T.pathname)
      ge(T, { matches: Me, loaderData: {}, errors: { [Pe.id]: nt } }, { flushSync: ne })
      return
    }
    N = new AbortController()
    let se = hr(e.history, T, N.signal, M && M.submission),
      ce = e.getContext ? await e.getContext() : new od(),
      ie
    if (M && M.pendingError) ie = [bn(K).route.id, { type: 'error', error: M.pendingError }]
    else if (M && M.submission && rt(M.submission.formMethod)) {
      let nt = await cn(se, T, M.submission, K, ce, Q.active, M && M.initialHydration === !0, {
        replace: M.replace,
        flushSync: ne,
      })
      if (nt.shortCircuited) return
      if (nt.pendingActionResult) {
        let [Me, Pe] = nt.pendingActionResult
        if (ht(Pe) && Ar(Pe.error) && Pe.error.status === 404) {
          ;((N = null), ge(T, { matches: nt.matches, loaderData: {}, errors: { [Me]: Pe.error } }))
          return
        }
      }
      ;((K = nt.matches || K),
        (ie = nt.pendingActionResult),
        (H = la(T, M.submission)),
        (ne = !1),
        (Q.active = !1),
        (se = hr(e.history, se.url, se.signal)))
    }
    let {
      shortCircuited: re,
      matches: xe,
      loaderData: Te,
      errors: He,
    } = await Tt(
      se,
      T,
      K,
      ce,
      Q.active,
      H,
      M && M.submission,
      M && M.fetcherSubmission,
      M && M.replace,
      M && M.initialHydration === !0,
      ne,
      ie,
    )
    re || ((N = null), ge(T, { matches: xe || K, ...bd(ie), loaderData: Te, errors: He }))
  }
  async function cn(P, T, M, j, H, K, ne, Q = {}) {
    un()
    let se = s0(T, M)
    if ((le({ navigation: se }, { flushSync: Q.flushSync === !0 }), K)) {
      let re = await We(j, T.pathname, P.signal)
      if (re.type === 'aborted') return { shortCircuited: !0 }
      if (re.type === 'error') {
        if (re.partialMatches.length === 0) {
          let { matches: Te, route: He } = ri(a)
          return { matches: Te, pendingActionResult: [He.id, { type: 'error', error: re.error }] }
        }
        let xe = bn(re.partialMatches).route.id
        return { matches: re.partialMatches, pendingActionResult: [xe, { type: 'error', error: re.error }] }
      } else if (re.matches) j = re.matches
      else {
        let { notFoundMatches: xe, error: Te, route: He } = qr(T.pathname)
        return { matches: xe, pendingActionResult: [He.id, { type: 'error', error: Te }] }
      }
    }
    let ce,
      ie = Ti(j, T)
    if (!ie.route.action && !ie.route.lazy)
      ce = { type: 'error', error: bt(405, { method: P.method, pathname: T.pathname, routeId: ie.route.id }) }
    else {
      let re = Cr(i, s, P, j, ie, ne ? [] : r, H),
        xe = await In(P, re, H, null)
      if (((ce = xe[ie.route.id]), !ce)) {
        for (let Te of j)
          if (xe[Te.route.id]) {
            ce = xe[Te.route.id]
            break
          }
      }
      if (P.signal.aborted) return { shortCircuited: !0 }
    }
    if (zn(ce)) {
      let re
      return (
        Q && Q.replace != null
          ? (re = Q.replace)
          : (re =
              md(ce.response.headers.get('Location'), new URL(P.url), c) === S.location.pathname + S.location.search),
        await st(P, ce, !0, { submission: M, replace: re }),
        { shortCircuited: !0 }
      )
    }
    if (ht(ce)) {
      let re = bn(j, ie.route.id)
      return (
        (Q && Q.replace) !== !0 && (R = 'PUSH'),
        { matches: j, pendingActionResult: [re.route.id, ce, ie.route.id] }
      )
    }
    return { matches: j, pendingActionResult: [ie.route.id, ce] }
  }
  async function Tt(P, T, M, j, H, K, ne, Q, se, ce, ie, re) {
    let xe = K || la(T, ne),
      Te = ne || Q || xd(xe),
      He = !L && !ce
    if (H) {
      if (He) {
        let Xe = Kr(re)
        le({ navigation: xe, ...(Xe !== void 0 ? { actionData: Xe } : {}) }, { flushSync: ie })
      }
      let Se = await We(M, T.pathname, P.signal)
      if (Se.type === 'aborted') return { shortCircuited: !0 }
      if (Se.type === 'error') {
        if (Se.partialMatches.length === 0) {
          let { matches: lr, route: Ln } = ri(a)
          return { matches: lr, loaderData: {}, errors: { [Ln.id]: Se.error } }
        }
        let Xe = bn(Se.partialMatches).route.id
        return { matches: Se.partialMatches, loaderData: {}, errors: { [Xe]: Se.error } }
      } else if (Se.matches) M = Se.matches
      else {
        let { error: Xe, notFoundMatches: lr, route: Ln } = qr(T.pathname)
        return { matches: lr, loaderData: {}, errors: { [Ln.id]: Xe } }
      }
    }
    let nt = l || a,
      { dsMatches: Me, revalidatingFetchers: Pe } = ud(
        P,
        j,
        i,
        s,
        e.history,
        S,
        M,
        Te,
        T,
        ce ? [] : r,
        ce === !0,
        F,
        O,
        Z,
        ae,
        q,
        nt,
        c,
        e.patchRoutesOnNavigation != null,
        re,
      )
    if (
      ((k = ++_),
      !e.dataStrategy &&
        !Me.some((Se) => Se.shouldLoad) &&
        !Me.some((Se) => Se.route.middleware && Se.route.middleware.length > 0) &&
        Pe.length === 0)
    ) {
      let Se = Yr()
      return (
        ge(
          T,
          {
            matches: M,
            loaderData: {},
            errors: re && ht(re[1]) ? { [re[0]]: re[1].error } : null,
            ...bd(re),
            ...(Se ? { fetchers: new Map(S.fetchers) } : {}),
          },
          { flushSync: ie },
        ),
        { shortCircuited: !0 }
      )
    }
    if (He) {
      let Se = {}
      if (!H) {
        Se.navigation = xe
        let Xe = Kr(re)
        Xe !== void 0 && (Se.actionData = Xe)
      }
      ;(Pe.length > 0 && (Se.fetchers = At(Pe)), le(Se, { flushSync: ie }))
    }
    Pe.forEach((Se) => {
      ;(Mt(Se.key), Se.controller && D.set(Se.key, Se.controller))
    })
    let On = () => Pe.forEach((Se) => Mt(Se.key))
    N && N.signal.addEventListener('abort', On)
    let { loaderResults: Qr, fetcherResults: hn } = await Xo(Me, Pe, P, j)
    if (P.signal.aborted) return { shortCircuited: !0 }
    ;(N && N.signal.removeEventListener('abort', On), Pe.forEach((Se) => D.delete(Se.key)))
    let Ft = oi(Qr)
    if (Ft) return (await st(P, Ft.result, !0, { replace: se }), { shortCircuited: !0 })
    if (((Ft = oi(hn)), Ft)) return (q.add(Ft.key), await st(P, Ft.result, !0, { replace: se }), { shortCircuited: !0 })
    let { loaderData: oa, errors: eo } = yd(S, M, Qr, re, Pe, hn)
    ce && S.errors && (eo = { ...S.errors, ...eo })
    let Nn = Yr(),
      ei = Xr(k),
      ti = Nn || ei || Pe.length > 0
    return { matches: M, loaderData: oa, errors: eo, ...(ti ? { fetchers: new Map(S.fetchers) } : {}) }
  }
  function Kr(P) {
    if (P && !ht(P[1])) return { [P[0]]: P[1].data }
    if (S.actionData) return Object.keys(S.actionData).length === 0 ? null : S.actionData
  }
  function At(P) {
    return (
      P.forEach((T) => {
        let M = S.fetchers.get(T.key),
          j = no(void 0, M ? M.data : void 0)
        S.fetchers.set(T.key, j)
      }),
      new Map(S.fetchers)
    )
  }
  async function ta(P, T, M, j) {
    Mt(P)
    let H = (j && j.flushSync) === !0,
      K = l || a,
      ne = Ba(S.location, S.matches, c, M, T, j?.relative),
      Q = vn(K, ne, c),
      se = Ne(Q, K, ne)
    if ((se.active && se.matches && (Q = se.matches), !Q)) {
      gt(P, T, bt(404, { pathname: ne }), { flushSync: H })
      return
    }
    let { path: ce, submission: ie, error: re } = cd(!0, ne, j)
    if (re) {
      gt(P, T, re, { flushSync: H })
      return
    }
    let xe = e.getContext ? await e.getContext() : new od(),
      Te = (j && j.preventScrollReset) === !0
    if (ie && rt(ie.formMethod)) {
      await na(P, T, ce, Q, xe, se.active, H, Te, ie)
      return
    }
    ;(ae.set(P, { routeId: T, path: ce }), await tt(P, T, ce, Q, xe, se.active, H, Te, ie))
  }
  async function na(P, T, M, j, H, K, ne, Q, se) {
    ;(un(), ae.delete(P))
    let ce = S.fetchers.get(P)
    _t(P, a0(se, ce), { flushSync: ne })
    let ie = new AbortController(),
      re = hr(e.history, M, ie.signal, se)
    if (K) {
      let ze = await We(j, new URL(re.url).pathname, re.signal, P)
      if (ze.type === 'aborted') return
      if (ze.type === 'error') {
        gt(P, T, ze.error, { flushSync: ne })
        return
      } else if (ze.matches) j = ze.matches
      else {
        gt(P, T, bt(404, { pathname: M }), { flushSync: ne })
        return
      }
    }
    let xe = Ti(j, M)
    if (!xe.route.action && !xe.route.lazy) {
      let ze = bt(405, { method: se.formMethod, pathname: M, routeId: T })
      gt(P, T, ze, { flushSync: ne })
      return
    }
    D.set(P, ie)
    let Te = _,
      He = Cr(i, s, re, j, xe, r, H),
      Me = (await In(re, He, H, P))[xe.route.id]
    if (re.signal.aborted) {
      D.get(P) === ie && D.delete(P)
      return
    }
    if (Z.has(P)) {
      if (zn(Me) || ht(Me)) {
        _t(P, nn(void 0))
        return
      }
    } else {
      if (zn(Me))
        if ((D.delete(P), k > Te)) {
          _t(P, nn(void 0))
          return
        } else return (q.add(P), _t(P, no(se)), st(re, Me, !1, { fetcherSubmission: se, preventScrollReset: Q }))
      if (ht(Me)) {
        gt(P, T, Me.error)
        return
      }
    }
    let Pe = S.navigation.location || S.location,
      On = hr(e.history, Pe, ie.signal),
      Qr = l || a,
      hn = S.navigation.state !== 'idle' ? vn(Qr, S.navigation.location, c) : S.matches
    ve(hn, "Didn't find any matches after fetcher action")
    let Ft = ++_
    W.set(P, Ft)
    let oa = no(se, Me.data)
    S.fetchers.set(P, oa)
    let { dsMatches: eo, revalidatingFetchers: Nn } = ud(
      On,
      H,
      i,
      s,
      e.history,
      S,
      hn,
      se,
      Pe,
      r,
      !1,
      F,
      O,
      Z,
      ae,
      q,
      Qr,
      c,
      e.patchRoutesOnNavigation != null,
      [xe.route.id, Me],
    )
    ;(Nn.filter((ze) => ze.key !== P).forEach((ze) => {
      let ni = ze.key,
        td = S.fetchers.get(ni),
        Gw = no(void 0, td ? td.data : void 0)
      ;(S.fetchers.set(ni, Gw), Mt(ni), ze.controller && D.set(ni, ze.controller))
    }),
      le({ fetchers: new Map(S.fetchers) }))
    let ei = () => Nn.forEach((ze) => Mt(ze.key))
    ie.signal.addEventListener('abort', ei)
    let { loaderResults: ti, fetcherResults: Se } = await Xo(eo, Nn, On, H)
    if (ie.signal.aborted) return
    if (
      (ie.signal.removeEventListener('abort', ei),
      W.delete(P),
      D.delete(P),
      Nn.forEach((ze) => D.delete(ze.key)),
      S.fetchers.has(P))
    ) {
      let ze = nn(Me.data)
      S.fetchers.set(P, ze)
    }
    let Xe = oi(ti)
    if (Xe) return st(On, Xe.result, !1, { preventScrollReset: Q })
    if (((Xe = oi(Se)), Xe)) return (q.add(Xe.key), st(On, Xe.result, !1, { preventScrollReset: Q }))
    let { loaderData: lr, errors: Ln } = yd(S, hn, ti, void 0, Nn, Se)
    ;(Xr(Ft),
      S.navigation.state === 'loading' && Ft > k
        ? (ve(R, 'Expected pending action'),
          N && N.abort(),
          ge(S.navigation.location, { matches: hn, loaderData: lr, errors: Ln, fetchers: new Map(S.fetchers) }))
        : (le({ errors: Ln, loaderData: vd(S.loaderData, lr, hn, Ln), fetchers: new Map(S.fetchers) }), (F = !1)))
  }
  async function tt(P, T, M, j, H, K, ne, Q, se) {
    let ce = S.fetchers.get(P)
    _t(P, no(se, ce ? ce.data : void 0), { flushSync: ne })
    let ie = new AbortController(),
      re = hr(e.history, M, ie.signal)
    if (K) {
      let Pe = await We(j, new URL(re.url).pathname, re.signal, P)
      if (Pe.type === 'aborted') return
      if (Pe.type === 'error') {
        gt(P, T, Pe.error, { flushSync: ne })
        return
      } else if (Pe.matches) j = Pe.matches
      else {
        gt(P, T, bt(404, { pathname: M }), { flushSync: ne })
        return
      }
    }
    let xe = Ti(j, M)
    D.set(P, ie)
    let Te = _,
      He = Cr(i, s, re, j, xe, r, H),
      Me = (await In(re, He, H, P))[xe.route.id]
    if ((D.get(P) === ie && D.delete(P), !re.signal.aborted)) {
      if (Z.has(P)) {
        _t(P, nn(void 0))
        return
      }
      if (zn(Me))
        if (k > Te) {
          _t(P, nn(void 0))
          return
        } else {
          ;(q.add(P), await st(re, Me, !1, { preventScrollReset: Q }))
          return
        }
      if (ht(Me)) {
        gt(P, T, Me.error)
        return
      }
      _t(P, nn(Me.data))
    }
  }
  async function st(P, T, M, { submission: j, fetcherSubmission: H, preventScrollReset: K, replace: ne } = {}) {
    T.response.headers.has('X-Remix-Revalidate') && (F = !0)
    let Q = T.response.headers.get('Location')
    ;(ve(Q, 'Expected a Location header on the redirect Response'), (Q = md(Q, new URL(P.url), c)))
    let se = bo(S.location, Q, { _isRedirect: !0 })
    if (n) {
      let He = !1
      if (T.response.headers.has('X-Remix-Reload-Document')) He = !0
      else if (Yl(Q)) {
        const nt = Qh(Q, !0)
        He = nt.origin !== t.location.origin || Ct(nt.pathname, c) == null
      }
      if (He) {
        ne ? t.location.replace(Q) : t.location.assign(Q)
        return
      }
    }
    N = null
    let ce = ne === !0 || T.response.headers.has('X-Remix-Replace') ? 'REPLACE' : 'PUSH',
      { formMethod: ie, formAction: re, formEncType: xe } = S.navigation
    !j && !H && ie && re && xe && (j = xd(S.navigation))
    let Te = j || H
    if ($x.has(T.response.status) && Te && rt(Te.formMethod))
      await dt(ce, se, {
        submission: { ...Te, formAction: Q },
        preventScrollReset: K || I,
        enableViewTransition: M ? G : void 0,
      })
    else {
      let He = la(se, j)
      await dt(ce, se, {
        overrideNavigation: He,
        fetcherSubmission: H,
        preventScrollReset: K || I,
        enableViewTransition: M ? G : void 0,
      })
    }
  }
  async function In(P, T, M, j) {
    let H,
      K = {}
    try {
      H = await Yx(u, P, T, j, M, !1)
    } catch (ne) {
      return (
        T.filter((Q) => Q.shouldLoad).forEach((Q) => {
          K[Q.route.id] = { type: 'error', error: ne }
        }),
        K
      )
    }
    if (P.signal.aborted) return K
    for (let [ne, Q] of Object.entries(H))
      if (o0(Q)) {
        let se = Q.result
        K[ne] = { type: 'redirect', response: Qx(se, P, ne, T, c) }
      } else K[ne] = await Jx(Q)
    return K
  }
  async function Xo(P, T, M, j) {
    let H = In(M, P, j, null),
      K = Promise.all(
        T.map(async (se) => {
          if (se.matches && se.match && se.request && se.controller) {
            let ie = (await In(se.request, se.matches, j, se.key))[se.match.route.id]
            return { [se.key]: ie }
          } else return Promise.resolve({ [se.key]: { type: 'error', error: bt(404, { pathname: se.path }) } })
        }),
      ),
      ne = await H,
      Q = (await K).reduce((se, ce) => Object.assign(se, ce), {})
    return { loaderResults: ne, fetcherResults: Q }
  }
  function un() {
    ;((F = !0),
      ae.forEach((P, T) => {
        ;(D.has(T) && O.add(T), Mt(T))
      }))
  }
  function _t(P, T, M = {}) {
    ;(S.fetchers.set(P, T), le({ fetchers: new Map(S.fetchers) }, { flushSync: (M && M.flushSync) === !0 }))
  }
  function gt(P, T, M, j = {}) {
    let H = bn(S.matches, T)
    ;(ir(P),
      le({ errors: { [H.route.id]: M }, fetchers: new Map(S.fetchers) }, { flushSync: (j && j.flushSync) === !0 }))
  }
  function or(P) {
    return (B.set(P, (B.get(P) || 0) + 1), Z.has(P) && Z.delete(P), S.fetchers.get(P) || Fx)
  }
  function dn(P, T) {
    ;(Mt(P, T?.reason), _t(P, nn(null)))
  }
  function ir(P) {
    let T = S.fetchers.get(P)
    ;(D.has(P) && !(T && T.state === 'loading' && W.has(P)) && Mt(P),
      ae.delete(P),
      W.delete(P),
      q.delete(P),
      Z.delete(P),
      O.delete(P),
      S.fetchers.delete(P))
  }
  function fn(P) {
    let T = (B.get(P) || 0) - 1
    ;(T <= 0 ? (B.delete(P), Z.add(P)) : B.set(P, T), le({ fetchers: new Map(S.fetchers) }))
  }
  function Mt(P, T) {
    let M = D.get(P)
    M && (M.abort(T), D.delete(P))
  }
  function qo(P) {
    for (let T of P) {
      let M = or(T),
        j = nn(M.data)
      S.fetchers.set(T, j)
    }
  }
  function Yr() {
    let P = [],
      T = !1
    for (let M of q) {
      let j = S.fetchers.get(M)
      ;(ve(j, `Expected fetcher: ${M}`), j.state === 'loading' && (q.delete(M), P.push(M), (T = !0)))
    }
    return (qo(P), T)
  }
  function Xr(P) {
    let T = []
    for (let [M, j] of W)
      if (j < P) {
        let H = S.fetchers.get(M)
        ;(ve(H, `Expected fetcher: ${M}`), H.state === 'loading' && (Mt(M), W.delete(M), T.push(M)))
      }
    return (qo(T), T.length > 0)
  }
  function ra(P, T) {
    let M = S.blockers.get(P) || to
    return (J.get(P) !== T && J.set(P, T), M)
  }
  function sr(P) {
    ;(S.blockers.delete(P), J.delete(P))
  }
  function ft(P, T) {
    let M = S.blockers.get(P) || to
    ve(
      (M.state === 'unblocked' && T.state === 'blocked') ||
        (M.state === 'blocked' && T.state === 'blocked') ||
        (M.state === 'blocked' && T.state === 'proceeding') ||
        (M.state === 'blocked' && T.state === 'unblocked') ||
        (M.state === 'proceeding' && T.state === 'unblocked'),
      `Invalid blocker state transition: ${M.state} -> ${T.state}`,
    )
    let j = new Map(S.blockers)
    ;(j.set(P, T), le({ blockers: j }))
  }
  function Jo({ currentLocation: P, nextLocation: T, historyAction: M }) {
    if (J.size === 0) return
    J.size > 1 && je(!1, 'A router only supports one blocker at a time')
    let j = Array.from(J.entries()),
      [H, K] = j[j.length - 1],
      ne = S.blockers.get(H)
    if (!(ne && ne.state === 'proceeding') && K({ currentLocation: P, nextLocation: T, historyAction: M })) return H
  }
  function qr(P) {
    let T = bt(404, { pathname: P }),
      M = l || a,
      { matches: j, route: H } = ri(M)
    return { notFoundMatches: j, route: H, error: T }
  }
  function Qo(P, T, M) {
    if (((m = P), (v = T), (y = M || null), !w && S.navigation === aa)) {
      w = !0
      let j = Oe(S.location, S.matches)
      j != null && le({ restoreScrollPosition: j })
    }
    return () => {
      ;((m = null), (v = null), (y = null))
    }
  }
  function Jr(P, T) {
    return (
      (y &&
        y(
          P,
          T.map((j) => cx(j, S.loaderData)),
        )) ||
      P.key
    )
  }
  function pe(P, T) {
    if (m && v) {
      let M = Jr(P, T)
      m[M] = v()
    }
  }
  function Oe(P, T) {
    if (m) {
      let M = Jr(P, T),
        j = m[M]
      if (typeof j == 'number') return j
    }
    return null
  }
  function Ne(P, T, M) {
    if (e.patchRoutesOnNavigation)
      if (P) {
        if (Object.keys(P[0].params).length > 0) return { active: !0, matches: Ri(T, M, c, !0) }
      } else return { active: !0, matches: Ri(T, M, c, !0) || [] }
    return { active: !1, matches: null }
  }
  async function We(P, T, M, j) {
    if (!e.patchRoutesOnNavigation) return { type: 'success', matches: P }
    let H = P
    for (;;) {
      let K = l == null,
        ne = l || a,
        Q = s
      try {
        await e.patchRoutesOnNavigation({
          signal: M,
          path: T,
          matches: H,
          fetcherKey: j,
          patch: (ie, re) => {
            M.aborted || dd(ie, re, ne, Q, i, !1)
          },
        })
      } catch (ie) {
        return { type: 'error', error: ie, partialMatches: H }
      } finally {
        K && !M.aborted && (a = [...a])
      }
      if (M.aborted) return { type: 'aborted' }
      let se = vn(ne, T, c)
      if (se) return { type: 'success', matches: se }
      let ce = Ri(ne, T, c, !0)
      if (!ce || (H.length === ce.length && H.every((ie, re) => ie.route.id === ce[re].route.id)))
        return { type: 'success', matches: null }
      H = ce
    }
  }
  function ar(P) {
    ;((s = {}), (l = wo(P, i, void 0, s)))
  }
  function Fe(P, T, M = !1) {
    let j = l == null
    ;(dd(P, T, l || a, s, i, M), j && ((a = [...a]), le({})))
  }
  return (
    (A = {
      get basename() {
        return c
      },
      get future() {
        return d
      },
      get state() {
        return S
      },
      get routes() {
        return a
      },
      get window() {
        return t
      },
      initialize: ee,
      subscribe: be,
      enableScrollRestoration: Qo,
      navigate: Ze,
      fetch: ta,
      revalidate: ut,
      createHref: (P) => e.history.createHref(P),
      encodeLocation: (P) => e.history.encodeLocation(P),
      getFetcher: or,
      resetFetcher: dn,
      deleteFetcher: fn,
      dispose: Ce,
      getBlocker: ra,
      deleteBlocker: sr,
      patchRoutes: Fe,
      _internalFetchControllers: D,
      _internalSetRoutes: ar,
      _internalSetStateDoNotUseOrYouWillBreakYourApp(P) {
        le(P)
      },
    }),
    e.unstable_instrumentations && (A = _x(A, e.unstable_instrumentations.map((P) => P.router).filter(Boolean))),
    A
  )
}
function Ux(e) {
  return e != null && (('formData' in e && e.formData != null) || ('body' in e && e.body !== void 0))
}
function Ba(e, t, n, r, o, i) {
  let s, a
  if (o) {
    s = []
    for (let c of t)
      if ((s.push(c), c.route.id === o)) {
        a = c
        break
      }
  } else ((s = t), (a = t[t.length - 1]))
  let l = Zl(r || '.', Gl(s), Ct(e.pathname, n) || e.pathname, i === 'path')
  if ((r == null && ((l.search = e.search), (l.hash = e.hash)), (r == null || r === '' || r === '.') && a)) {
    let c = ql(l.search)
    if (a.route.index && !c) l.search = l.search ? l.search.replace(/^\?/, '?index&') : '?index'
    else if (!a.route.index && c) {
      let u = new URLSearchParams(l.search),
        d = u.getAll('index')
      ;(u.delete('index'), d.filter((p) => p).forEach((p) => u.append('index', p)))
      let h = u.toString()
      l.search = h ? `?${h}` : ''
    }
  }
  return (n !== '/' && (l.pathname = Sx({ basename: n, pathname: l.pathname })), Kt(l))
}
function cd(e, t, n) {
  if (!n || !Ux(n)) return { path: t }
  if (n.formMethod && !i0(n.formMethod)) return { path: t, error: bt(405, { method: n.formMethod }) }
  let r = () => ({ path: t, error: bt(400, { type: 'invalid-body' }) }),
    i = (n.formMethod || 'get').toUpperCase(),
    s = fp(t)
  if (n.body !== void 0) {
    if (n.formEncType === 'text/plain') {
      if (!rt(i)) return r()
      let d =
        typeof n.body == 'string'
          ? n.body
          : n.body instanceof FormData || n.body instanceof URLSearchParams
            ? Array.from(n.body.entries()).reduce(
                (h, [p, m]) => `${h}${p}=${m}
`,
                '',
              )
            : String(n.body)
      return {
        path: t,
        submission: {
          formMethod: i,
          formAction: s,
          formEncType: n.formEncType,
          formData: void 0,
          json: void 0,
          text: d,
        },
      }
    } else if (n.formEncType === 'application/json') {
      if (!rt(i)) return r()
      try {
        let d = typeof n.body == 'string' ? JSON.parse(n.body) : n.body
        return {
          path: t,
          submission: {
            formMethod: i,
            formAction: s,
            formEncType: n.formEncType,
            formData: void 0,
            json: d,
            text: void 0,
          },
        }
      } catch {
        return r()
      }
    }
  }
  ve(typeof FormData == 'function', 'FormData is not available in this environment')
  let a, l
  if (n.formData) ((a = Ha(n.formData)), (l = n.formData))
  else if (n.body instanceof FormData) ((a = Ha(n.body)), (l = n.body))
  else if (n.body instanceof URLSearchParams) ((a = n.body), (l = gd(a)))
  else if (n.body == null) ((a = new URLSearchParams()), (l = new FormData()))
  else
    try {
      ;((a = new URLSearchParams(n.body)), (l = gd(a)))
    } catch {
      return r()
    }
  let c = {
    formMethod: i,
    formAction: s,
    formEncType: (n && n.formEncType) || 'application/x-www-form-urlencoded',
    formData: l,
    json: void 0,
    text: void 0,
  }
  if (rt(c.formMethod)) return { path: t, submission: c }
  let u = Rn(t)
  return (e && u.search && ql(u.search) && a.append('index', ''), (u.search = `?${a}`), { path: Kt(u), submission: c })
}
function ud(e, t, n, r, o, i, s, a, l, c, u, d, h, p, m, y, v, w, b, x) {
  let E = x ? (ht(x[1]) ? x[1].error : x[1].data) : void 0,
    C = o.createURL(i.location),
    A = o.createURL(l),
    S
  if (u && i.errors) {
    let L = Object.keys(i.errors)[0]
    S = s.findIndex((F) => F.route.id === L)
  } else if (x && ht(x[1])) {
    let L = x[0]
    S = s.findIndex((F) => F.route.id === L) - 1
  }
  let R = x ? x[1].statusCode : void 0,
    I = R && R >= 400,
    N = {
      currentUrl: C,
      currentParams: i.matches[0]?.params || {},
      nextUrl: A,
      nextParams: s[0].params,
      ...a,
      actionResult: E,
      actionStatus: R,
    },
    G = Kl(s.map((L) => L.route.path)),
    oe = s.map((L, F) => {
      let { route: O } = L,
        D = null
      if (
        (S != null && F > S
          ? (D = !1)
          : O.lazy
            ? (D = !0)
            : Xl(O)
              ? u
                ? (D = Ua(O, i.loaderData, i.errors))
                : Wx(i.loaderData, i.matches[F], L) && (D = !0)
              : (D = !1),
        D !== null)
      )
        return Wa(n, r, e, G, L, c, t, D)
      let _ = I
          ? !1
          : d || C.pathname + C.search === A.pathname + A.search || C.search !== A.search || Hx(i.matches[F], L),
        k = { ...N, defaultShouldRevalidate: _ },
        W = zi(L, k)
      return Wa(n, r, e, G, L, c, t, W, k)
    }),
    te = []
  return (
    m.forEach((L, F) => {
      if (u || !s.some((B) => B.route.id === L.routeId) || p.has(F)) return
      let O = i.fetchers.get(F),
        D = O && O.state !== 'idle' && O.data === void 0,
        _ = vn(v, L.path, w)
      if (!_) {
        if (b && D) return
        te.push({
          key: F,
          routeId: L.routeId,
          path: L.path,
          matches: null,
          match: null,
          request: null,
          controller: null,
        })
        return
      }
      if (y.has(F)) return
      let k = Ti(_, L.path),
        W = new AbortController(),
        q = hr(o, L.path, W.signal),
        ae = null
      if (h.has(F)) (h.delete(F), (ae = Cr(n, r, q, _, k, c, t)))
      else if (D) d && (ae = Cr(n, r, q, _, k, c, t))
      else {
        let B = { ...N, defaultShouldRevalidate: I ? !1 : d }
        zi(k, B) && (ae = Cr(n, r, q, _, k, c, t, B))
      }
      ae && te.push({ key: F, routeId: L.routeId, path: L.path, matches: ae, match: k, request: q, controller: W })
    }),
    { dsMatches: oe, revalidatingFetchers: te }
  )
}
function Xl(e) {
  return e.loader != null || (e.middleware != null && e.middleware.length > 0)
}
function Ua(e, t, n) {
  if (e.lazy) return !0
  if (!Xl(e)) return !1
  let r = t != null && e.id in t,
    o = n != null && n[e.id] !== void 0
  return !r && o ? !1 : typeof e.loader == 'function' && e.loader.hydrate === !0 ? !0 : !r && !o
}
function Wx(e, t, n) {
  let r = !t || n.route.id !== t.route.id,
    o = !e.hasOwnProperty(n.route.id)
  return r || o
}
function Hx(e, t) {
  let n = e.route.path
  return e.pathname !== t.pathname || (n != null && n.endsWith('*') && e.params['*'] !== t.params['*'])
}
function zi(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t)
    if (typeof n == 'boolean') return n
  }
  return t.defaultShouldRevalidate
}
function dd(e, t, n, r, o, i) {
  let s
  if (e) {
    let c = r[e]
    ;(ve(c, `No route found to patch children into: routeId = ${e}`), c.children || (c.children = []), (s = c.children))
  } else s = n
  let a = [],
    l = []
  if (
    (t.forEach((c) => {
      let u = s.find((d) => ap(c, d))
      u ? l.push({ existingRoute: u, newRoute: c }) : a.push(c)
    }),
    a.length > 0)
  ) {
    let c = wo(a, o, [e || '_', 'patch', String(s?.length || '0')], r)
    s.push(...c)
  }
  if (i && l.length > 0)
    for (let c = 0; c < l.length; c++) {
      let { existingRoute: u, newRoute: d } = l[c],
        h = u,
        [p] = wo([d], o, [], {}, !0)
      Object.assign(h, {
        element: p.element ? p.element : h.element,
        errorElement: p.errorElement ? p.errorElement : h.errorElement,
        hydrateFallbackElement: p.hydrateFallbackElement ? p.hydrateFallbackElement : h.hydrateFallbackElement,
      })
    }
}
function ap(e, t) {
  return 'id' in e && 'id' in t && e.id === t.id
    ? !0
    : e.index === t.index && e.path === t.path && e.caseSensitive === t.caseSensitive
      ? (!e.children || e.children.length === 0) && (!t.children || t.children.length === 0)
        ? !0
        : e.children.every((n, r) => t.children?.some((o) => ap(n, o)))
      : !1
}
var fd = new WeakMap(),
  lp = ({ key: e, route: t, manifest: n, mapRouteProperties: r }) => {
    let o = n[t.id]
    if ((ve(o, 'No route found in manifest'), !o.lazy || typeof o.lazy != 'object')) return
    let i = o.lazy[e]
    if (!i) return
    let s = fd.get(o)
    s || ((s = {}), fd.set(o, s))
    let a = s[e]
    if (a) return a
    let l = (async () => {
      let c = ix(e),
        d = o[e] !== void 0 && e !== 'hasErrorBoundary'
      if (c)
        (je(!c, 'Route property ' + e + ' is not a supported lazy route property. This property will be ignored.'),
          (s[e] = Promise.resolve()))
      else if (d) je(!1, `Route "${o.id}" has a static property "${e}" defined. The lazy property will be ignored.`)
      else {
        let h = await i()
        h != null && (Object.assign(o, { [e]: h }), Object.assign(o, r(o)))
      }
      typeof o.lazy == 'object' &&
        ((o.lazy[e] = void 0), Object.values(o.lazy).every((h) => h === void 0) && (o.lazy = void 0))
    })()
    return ((s[e] = l), l)
  },
  hd = new WeakMap()
function Gx(e, t, n, r, o) {
  let i = n[e.id]
  if ((ve(i, 'No route found in manifest'), !e.lazy)) return { lazyRoutePromise: void 0, lazyHandlerPromise: void 0 }
  if (typeof e.lazy == 'function') {
    let u = hd.get(i)
    if (u) return { lazyRoutePromise: u, lazyHandlerPromise: u }
    let d = (async () => {
      ve(typeof e.lazy == 'function', 'No lazy route function found')
      let h = await e.lazy(),
        p = {}
      for (let m in h) {
        let y = h[m]
        if (y === void 0) continue
        let v = ax(m),
          b = i[m] !== void 0 && m !== 'hasErrorBoundary'
        v
          ? je(
              !v,
              'Route property ' +
                m +
                ' is not a supported property to be returned from a lazy route function. This property will be ignored.',
            )
          : b
            ? je(
                !b,
                `Route "${i.id}" has a static property "${m}" defined but its lazy function is also returning a value for this property. The lazy route property "${m}" will be ignored.`,
              )
            : (p[m] = y)
      }
      ;(Object.assign(i, p), Object.assign(i, { ...r(i), lazy: void 0 }))
    })()
    return (hd.set(i, d), d.catch(() => {}), { lazyRoutePromise: d, lazyHandlerPromise: d })
  }
  let s = Object.keys(e.lazy),
    a = [],
    l
  for (let u of s) {
    if (o && o.includes(u)) continue
    let d = lp({ key: u, route: e, manifest: n, mapRouteProperties: r })
    d && (a.push(d), u === t && (l = d))
  }
  let c = a.length > 0 ? Promise.all(a).then(() => {}) : void 0
  return (c?.catch(() => {}), l?.catch(() => {}), { lazyRoutePromise: c, lazyHandlerPromise: l })
}
async function pd(e) {
  let t = e.matches.filter((o) => o.shouldLoad),
    n = {}
  return (
    (await Promise.all(t.map((o) => o.resolve()))).forEach((o, i) => {
      n[t[i].route.id] = o
    }),
    n
  )
}
async function Zx(e) {
  return e.matches.some((t) => t.route.middleware) ? cp(e, () => pd(e)) : pd(e)
}
function cp(e, t) {
  return Kx(e, t, (r) => r, n0, n)
  function n(r, o, i) {
    if (i) return Promise.resolve(Object.assign(i.value, { [o]: { type: 'error', result: r } }))
    {
      let { matches: s } = e,
        a = Math.min(
          Math.max(
            s.findIndex((c) => c.route.id === o),
            0,
          ),
          Math.max(
            s.findIndex((c) => c.unstable_shouldCallHandler()),
            0,
          ),
        ),
        l = bn(s, s[a].route.id).route.id
      return Promise.resolve({ [l]: { type: 'error', result: r } })
    }
  }
}
async function Kx(e, t, n, r, o) {
  let { matches: i, request: s, params: a, context: l, unstable_pattern: c } = e,
    u = i.flatMap((h) => (h.route.middleware ? h.route.middleware.map((p) => [h.route.id, p]) : []))
  return await up({ request: s, params: a, context: l, unstable_pattern: c }, u, t, n, r, o)
}
async function up(e, t, n, r, o, i, s = 0) {
  let { request: a } = e
  if (a.signal.aborted) throw a.signal.reason ?? new Error(`Request aborted: ${a.method} ${a.url}`)
  let l = t[s]
  if (!l) return await n()
  let [c, u] = l,
    d,
    h = async () => {
      if (d) throw new Error('You may only call `next()` once per middleware')
      try {
        return ((d = { value: await up(e, t, n, r, o, i, s + 1) }), d.value)
      } catch (p) {
        return ((d = { value: await i(p, c, d) }), d.value)
      }
    }
  try {
    let p = await u(e, h),
      m = p != null ? r(p) : void 0
    return o(m) ? m : d ? (m ?? d.value) : ((d = { value: await h() }), d.value)
  } catch (p) {
    return await i(p, c, d)
  }
}
function dp(e, t, n, r, o) {
  let i = lp({ key: 'middleware', route: r.route, manifest: t, mapRouteProperties: e }),
    s = Gx(r.route, rt(n.method) ? 'action' : 'loader', t, e, o)
  return { middleware: i, route: s.lazyRoutePromise, handler: s.lazyHandlerPromise }
}
function Wa(e, t, n, r, o, i, s, a, l = null) {
  let c = !1,
    u = dp(e, t, n, o, i)
  return {
    ...o,
    _lazyPromises: u,
    shouldLoad: a,
    unstable_shouldRevalidateArgs: l,
    unstable_shouldCallHandler(d) {
      return ((c = !0), l ? (typeof d == 'boolean' ? zi(o, { ...l, defaultShouldRevalidate: d }) : zi(o, l)) : a)
    },
    resolve(d) {
      let { lazy: h, loader: p, middleware: m } = o.route,
        y = c || a || (d && !rt(n.method) && (h || p)),
        v = m && m.length > 0 && !p && !h
      return y && (rt(n.method) || !v)
        ? Xx({
            request: n,
            unstable_pattern: r,
            match: o,
            lazyHandlerPromise: u?.handler,
            lazyRoutePromise: u?.route,
            handlerOverride: d,
            scopedContext: s,
          })
        : Promise.resolve({ type: 'data', result: void 0 })
    },
  }
}
function Cr(e, t, n, r, o, i, s, a = null) {
  return r.map((l) =>
    l.route.id !== o.route.id
      ? {
          ...l,
          shouldLoad: !1,
          unstable_shouldRevalidateArgs: a,
          unstable_shouldCallHandler: () => !1,
          _lazyPromises: dp(e, t, n, l, i),
          resolve: () => Promise.resolve({ type: 'data', result: void 0 }),
        }
      : Wa(e, t, n, Kl(r.map((c) => c.route.path)), l, i, s, !0, a),
  )
}
async function Yx(e, t, n, r, o, i) {
  n.some((c) => c._lazyPromises?.middleware) && (await Promise.all(n.map((c) => c._lazyPromises?.middleware)))
  let s = { request: t, unstable_pattern: Kl(n.map((c) => c.route.path)), params: n[0].params, context: o, matches: n },
    l = await e({
      ...s,
      fetcherKey: r,
      runClientMiddleware: (c) => {
        let u = s
        return cp(u, () =>
          c({
            ...u,
            fetcherKey: r,
            runClientMiddleware: () => {
              throw new Error('Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler')
            },
          }),
        )
      },
    })
  try {
    await Promise.all(n.flatMap((c) => [c._lazyPromises?.handler, c._lazyPromises?.route]))
  } catch {}
  return l
}
async function Xx({
  request: e,
  unstable_pattern: t,
  match: n,
  lazyHandlerPromise: r,
  lazyRoutePromise: o,
  handlerOverride: i,
  scopedContext: s,
}) {
  let a,
    l,
    c = rt(e.method),
    u = c ? 'action' : 'loader',
    d = (h) => {
      let p,
        m = new Promise((w, b) => (p = b))
      ;((l = () => p()), e.signal.addEventListener('abort', l))
      let y = (w) =>
          typeof h != 'function'
            ? Promise.reject(
                new Error(
                  `You cannot call the handler for a route which defines a boolean "${u}" [routeId: ${n.route.id}]`,
                ),
              )
            : h({ request: e, unstable_pattern: t, params: n.params, context: s }, ...(w !== void 0 ? [w] : [])),
        v = (async () => {
          try {
            return { type: 'data', result: await (i ? i((b) => y(b)) : y()) }
          } catch (w) {
            return { type: 'error', result: w }
          }
        })()
      return Promise.race([v, m])
    }
  try {
    let h = c ? n.route.action : n.route.loader
    if (r || o)
      if (h) {
        let p,
          [m] = await Promise.all([
            d(h).catch((y) => {
              p = y
            }),
            r,
            o,
          ])
        if (p !== void 0) throw p
        a = m
      } else {
        await r
        let p = c ? n.route.action : n.route.loader
        if (p) [a] = await Promise.all([d(p), o])
        else if (u === 'action') {
          let m = new URL(e.url),
            y = m.pathname + m.search
          throw bt(405, { method: e.method, pathname: y, routeId: n.route.id })
        } else return { type: 'data', result: void 0 }
      }
    else if (h) a = await d(h)
    else {
      let p = new URL(e.url),
        m = p.pathname + p.search
      throw bt(404, { pathname: m })
    }
  } catch (h) {
    return { type: 'error', result: h }
  } finally {
    l && e.signal.removeEventListener('abort', l)
  }
  return a
}
async function qx(e) {
  let t = e.headers.get('Content-Type')
  return t && /\bapplication\/json\b/.test(t) ? (e.body == null ? null : e.json()) : e.text()
}
async function Jx(e) {
  let { result: t, type: n } = e
  if (hp(t)) {
    let r
    try {
      r = await qx(t)
    } catch (o) {
      return { type: 'error', error: o }
    }
    return n === 'error'
      ? { type: 'error', error: new Fi(t.status, t.statusText, r), statusCode: t.status, headers: t.headers }
      : { type: 'data', data: r, statusCode: t.status, headers: t.headers }
  }
  return n === 'error'
    ? wd(t)
      ? t.data instanceof Error
        ? {
            type: 'error',
            error: t.data,
            statusCode: t.init?.status,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
        : {
            type: 'error',
            error: new Fi(t.init?.status || 500, void 0, t.data),
            statusCode: Ar(t) ? t.status : void 0,
            headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
          }
      : { type: 'error', error: t, statusCode: Ar(t) ? t.status : void 0 }
    : wd(t)
      ? {
          type: 'data',
          data: t.data,
          statusCode: t.init?.status,
          headers: t.init?.headers ? new Headers(t.init.headers) : void 0,
        }
      : { type: 'data', data: t }
}
function Qx(e, t, n, r, o) {
  let i = e.headers.get('Location')
  if ((ve(i, 'Redirects returned/thrown from loaders/actions must have a Location header'), !Yl(i))) {
    let s = r.slice(0, r.findIndex((a) => a.route.id === n) + 1)
    ;((i = Ba(new URL(t.url), s, o, i)), e.headers.set('Location', i))
  }
  return e
}
function md(e, t, n) {
  if (Yl(e)) {
    let r = e,
      o = r.startsWith('//') ? new URL(t.protocol + r) : new URL(r),
      i = Ct(o.pathname, n) != null
    if (o.origin === t.origin && i) return o.pathname + o.search + o.hash
  }
  return e
}
function hr(e, t, n, r) {
  let o = e.createURL(fp(t)).toString(),
    i = { signal: n }
  if (r && rt(r.formMethod)) {
    let { formMethod: s, formEncType: a } = r
    ;((i.method = s.toUpperCase()),
      a === 'application/json'
        ? ((i.headers = new Headers({ 'Content-Type': a })), (i.body = JSON.stringify(r.json)))
        : a === 'text/plain'
          ? (i.body = r.text)
          : a === 'application/x-www-form-urlencoded' && r.formData
            ? (i.body = Ha(r.formData))
            : (i.body = r.formData))
  }
  return new Request(o, i)
}
function Ha(e) {
  let t = new URLSearchParams()
  for (let [n, r] of e.entries()) t.append(n, typeof r == 'string' ? r : r.name)
  return t
}
function gd(e) {
  let t = new FormData()
  for (let [n, r] of e.entries()) t.append(n, r)
  return t
}
function e0(e, t, n, r = !1, o = !1) {
  let i = {},
    s = null,
    a,
    l = !1,
    c = {},
    u = n && ht(n[1]) ? n[1].error : void 0
  return (
    e.forEach((d) => {
      if (!(d.route.id in t)) return
      let h = d.route.id,
        p = t[h]
      if ((ve(!zn(p), 'Cannot handle redirect results in processLoaderData'), ht(p))) {
        let m = p.error
        if ((u !== void 0 && ((m = u), (u = void 0)), (s = s || {}), o)) s[h] = m
        else {
          let y = bn(e, h)
          s[y.route.id] == null && (s[y.route.id] = m)
        }
        ;(r || (i[h] = sp), l || ((l = !0), (a = Ar(p.error) ? p.error.status : 500)), p.headers && (c[h] = p.headers))
      } else
        ((i[h] = p.data),
          p.statusCode && p.statusCode !== 200 && !l && (a = p.statusCode),
          p.headers && (c[h] = p.headers))
    }),
    u !== void 0 && n && ((s = { [n[0]]: u }), n[2] && (i[n[2]] = void 0)),
    { loaderData: i, errors: s, statusCode: a || 200, loaderHeaders: c }
  )
}
function yd(e, t, n, r, o, i) {
  let { loaderData: s, errors: a } = e0(t, n, r)
  return (
    o
      .filter((l) => !l.matches || l.matches.some((c) => c.shouldLoad))
      .forEach((l) => {
        let { key: c, match: u, controller: d } = l
        if (d && d.signal.aborted) return
        let h = i[c]
        if ((ve(h, 'Did not find corresponding fetcher result'), ht(h))) {
          let p = bn(e.matches, u?.route.id)
          ;((a && a[p.route.id]) || (a = { ...a, [p.route.id]: h.error }), e.fetchers.delete(c))
        } else if (zn(h)) ve(!1, 'Unhandled fetcher revalidation redirect')
        else {
          let p = nn(h.data)
          e.fetchers.set(c, p)
        }
      }),
    { loaderData: s, errors: a }
  )
}
function vd(e, t, n, r) {
  let o = Object.entries(t)
    .filter(([, i]) => i !== sp)
    .reduce((i, [s, a]) => ((i[s] = a), i), {})
  for (let i of n) {
    let s = i.route.id
    if ((!t.hasOwnProperty(s) && e.hasOwnProperty(s) && i.route.loader && (o[s] = e[s]), r && r.hasOwnProperty(s)))
      break
  }
  return o
}
function bd(e) {
  return e ? (ht(e[1]) ? { actionData: {} } : { actionData: { [e[0]]: e[1].data } }) : {}
}
function bn(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((r) => r.route.id === t) + 1) : [...e])
      .reverse()
      .find((r) => r.route.hasErrorBoundary === !0) || e[0]
  )
}
function ri(e) {
  let t = e.length === 1 ? e[0] : e.find((n) => n.index || !n.path || n.path === '/') || { id: '__shim-error-route__' }
  return { matches: [{ params: {}, pathname: '', pathnameBase: '', route: t }], route: t }
}
function bt(e, { pathname: t, routeId: n, method: r, type: o, message: i } = {}) {
  let s = 'Unknown Server Error',
    a = 'Unknown @remix-run/router error'
  return (
    e === 400
      ? ((s = 'Bad Request'),
        r && t && n
          ? (a = `You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.`)
          : o === 'invalid-body' && (a = 'Unable to encode submission body'))
      : e === 403
        ? ((s = 'Forbidden'), (a = `Route "${n}" does not match URL "${t}"`))
        : e === 404
          ? ((s = 'Not Found'), (a = `No route matches URL "${t}"`))
          : e === 405 &&
            ((s = 'Method Not Allowed'),
            r && t && n
              ? (a = `You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.`)
              : r && (a = `Invalid request method "${r.toUpperCase()}"`)),
    new Fi(e || 500, s, new Error(a), !0)
  )
}
function oi(e) {
  let t = Object.entries(e)
  for (let n = t.length - 1; n >= 0; n--) {
    let [r, o] = t[n]
    if (zn(o)) return { key: r, result: o }
  }
}
function fp(e) {
  let t = typeof e == 'string' ? Rn(e) : e
  return Kt({ ...t, hash: '' })
}
function t0(e, t) {
  return e.pathname !== t.pathname || e.search !== t.search
    ? !1
    : e.hash === ''
      ? t.hash !== ''
      : e.hash === t.hash
        ? !0
        : t.hash !== ''
}
function n0(e) {
  return e != null && typeof e == 'object' && Object.entries(e).every(([t, n]) => typeof t == 'string' && r0(n))
}
function r0(e) {
  return e != null && typeof e == 'object' && 'type' in e && 'result' in e && (e.type === 'data' || e.type === 'error')
}
function o0(e) {
  return hp(e.result) && jx.has(e.result.status)
}
function ht(e) {
  return e.type === 'error'
}
function zn(e) {
  return (e && e.type) === 'redirect'
}
function wd(e) {
  return (
    typeof e == 'object' && e != null && 'type' in e && 'data' in e && 'init' in e && e.type === 'DataWithResponseInit'
  )
}
function hp(e) {
  return (
    e != null &&
    typeof e.status == 'number' &&
    typeof e.statusText == 'string' &&
    typeof e.headers == 'object' &&
    typeof e.body < 'u'
  )
}
function i0(e) {
  return Lx.has(e.toUpperCase())
}
function rt(e) {
  return Ox.has(e.toUpperCase())
}
function ql(e) {
  return new URLSearchParams(e).getAll('index').some((t) => t === '')
}
function Ti(e, t) {
  let n = typeof t == 'string' ? Rn(t).search : t.search
  if (e[e.length - 1].route.index && ql(n || '')) return e[e.length - 1]
  let r = np(e)
  return r[r.length - 1]
}
function xd(e) {
  let { formMethod: t, formAction: n, formEncType: r, text: o, formData: i, json: s } = e
  if (!(!t || !n || !r)) {
    if (o != null) return { formMethod: t, formAction: n, formEncType: r, formData: void 0, json: void 0, text: o }
    if (i != null) return { formMethod: t, formAction: n, formEncType: r, formData: i, json: void 0, text: void 0 }
    if (s !== void 0) return { formMethod: t, formAction: n, formEncType: r, formData: void 0, json: s, text: void 0 }
  }
}
function la(e, t) {
  return t
    ? {
        state: 'loading',
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text,
      }
    : {
        state: 'loading',
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
      }
}
function s0(e, t) {
  return {
    state: 'submitting',
    location: e,
    formMethod: t.formMethod,
    formAction: t.formAction,
    formEncType: t.formEncType,
    formData: t.formData,
    json: t.json,
    text: t.text,
  }
}
function no(e, t) {
  return e
    ? {
        state: 'loading',
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t,
      }
    : {
        state: 'loading',
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t,
      }
}
function a0(e, t) {
  return {
    state: 'submitting',
    formMethod: e.formMethod,
    formAction: e.formAction,
    formEncType: e.formEncType,
    formData: e.formData,
    json: e.json,
    text: e.text,
    data: t ? t.data : void 0,
  }
}
function nn(e) {
  return {
    state: 'idle',
    formMethod: void 0,
    formAction: void 0,
    formEncType: void 0,
    formData: void 0,
    json: void 0,
    text: void 0,
    data: e,
  }
}
function l0(e, t) {
  try {
    let n = e.sessionStorage.getItem(ip)
    if (n) {
      let r = JSON.parse(n)
      for (let [o, i] of Object.entries(r || {})) i && Array.isArray(i) && t.set(o, new Set(i || []))
    }
  } catch {}
}
function c0(e, t) {
  if (t.size > 0) {
    let n = {}
    for (let [r, o] of t) n[r] = [...o]
    try {
      e.sessionStorage.setItem(ip, JSON.stringify(n))
    } catch (r) {
      je(!1, `Failed to save applied view transitions in sessionStorage (${r}).`)
    }
  }
}
function u0() {
  let e,
    t,
    n = new Promise((r, o) => {
      ;((e = async (i) => {
        r(i)
        try {
          await n
        } catch {}
      }),
        (t = async (i) => {
          o(i)
          try {
            await n
          } catch {}
        }))
    })
  return { promise: n, resolve: e, reject: t }
}
var Qn = f.createContext(null)
Qn.displayName = 'DataRouter'
var No = f.createContext(null)
No.displayName = 'DataRouterState'
f.createContext(!1)
var Jl = f.createContext({ isTransitioning: !1 })
Jl.displayName = 'ViewTransition'
var pp = f.createContext(new Map())
pp.displayName = 'Fetchers'
var d0 = f.createContext(null)
d0.displayName = 'Await'
var Xt = f.createContext(null)
Xt.displayName = 'Navigation'
var gs = f.createContext(null)
gs.displayName = 'Location'
var Lt = f.createContext({ outlet: null, matches: [], isDataRoute: !1 })
Lt.displayName = 'Route'
var Ql = f.createContext(null)
Ql.displayName = 'RouteError'
function f0(e, { relative: t } = {}) {
  ve(Lo(), 'useHref() may be used only in the context of a <Router> component.')
  let { basename: n, navigator: r } = f.useContext(Xt),
    { hash: o, pathname: i, search: s } = $o(e, { relative: t }),
    a = i
  return (n !== '/' && (a = i === '/' ? n : Wt([n, i])), r.createHref({ pathname: a, search: s, hash: o }))
}
function Lo() {
  return f.useContext(gs) != null
}
function qt() {
  return (ve(Lo(), 'useLocation() may be used only in the context of a <Router> component.'), f.useContext(gs).location)
}
var mp = 'You should call navigate() in a React.useEffect(), not when your component is first rendered.'
function gp(e) {
  f.useContext(Xt).static || f.useLayoutEffect(e)
}
function jo() {
  let { isDataRoute: e } = f.useContext(Lt)
  return e ? T0() : h0()
}
function h0() {
  ve(Lo(), 'useNavigate() may be used only in the context of a <Router> component.')
  let e = f.useContext(Qn),
    { basename: t, navigator: n } = f.useContext(Xt),
    { matches: r } = f.useContext(Lt),
    { pathname: o } = qt(),
    i = JSON.stringify(Gl(r)),
    s = f.useRef(!1)
  return (
    gp(() => {
      s.current = !0
    }),
    f.useCallback(
      (l, c = {}) => {
        if ((je(s.current, mp), !s.current)) return
        if (typeof l == 'number') {
          n.go(l)
          return
        }
        let u = Zl(l, JSON.parse(i), o, c.relative === 'path')
        ;(e == null && t !== '/' && (u.pathname = u.pathname === '/' ? t : Wt([t, u.pathname])),
          (c.replace ? n.replace : n.push)(u, c.state, c))
      },
      [t, n, i, o, e],
    )
  )
}
var p0 = f.createContext(null)
function m0(e) {
  let t = f.useContext(Lt).outlet
  return f.useMemo(() => t && f.createElement(p0.Provider, { value: e }, t), [t, e])
}
function g0() {
  let { matches: e } = f.useContext(Lt),
    t = e[e.length - 1]
  return t ? t.params : {}
}
function $o(e, { relative: t } = {}) {
  let { matches: n } = f.useContext(Lt),
    { pathname: r } = qt(),
    o = JSON.stringify(Gl(n))
  return f.useMemo(() => Zl(e, JSON.parse(o), r, t === 'path'), [e, o, r, t])
}
function y0(e, t, n, r, o) {
  ve(Lo(), 'useRoutes() may be used only in the context of a <Router> component.')
  let { navigator: i } = f.useContext(Xt),
    { matches: s } = f.useContext(Lt),
    a = s[s.length - 1],
    l = a ? a.params : {},
    c = a ? a.pathname : '/',
    u = a ? a.pathnameBase : '/',
    d = a && a.route
  {
    let b = (d && d.path) || ''
    vp(
      c,
      !d || b.endsWith('*') || b.endsWith('*?'),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${c}" (under <Route path="${b}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${b}"> to <Route path="${b === '/' ? '*' : `${b}/*`}">.`,
    )
  }
  let h = qt(),
    p
  p = h
  let m = p.pathname || '/',
    y = m
  if (u !== '/') {
    let b = u.replace(/^\//, '').split('/')
    y = '/' + m.replace(/^\//, '').split('/').slice(b.length).join('/')
  }
  let v = vn(e, { pathname: y })
  return (
    je(d || v != null, `No routes matched location "${p.pathname}${p.search}${p.hash}" `),
    je(
      v == null ||
        v[v.length - 1].route.element !== void 0 ||
        v[v.length - 1].route.Component !== void 0 ||
        v[v.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ),
    S0(
      v &&
        v.map((b) =>
          Object.assign({}, b, {
            params: Object.assign({}, l, b.params),
            pathname: Wt([
              u,
              i.encodeLocation
                ? i.encodeLocation(b.pathname.replace(/\?/g, '%3F').replace(/#/g, '%23')).pathname
                : b.pathname,
            ]),
            pathnameBase:
              b.pathnameBase === '/'
                ? u
                : Wt([
                    u,
                    i.encodeLocation
                      ? i.encodeLocation(b.pathnameBase.replace(/\?/g, '%3F').replace(/#/g, '%23')).pathname
                      : b.pathnameBase,
                  ]),
          }),
        ),
      s,
      n,
      r,
      o,
    )
  )
}
function v0() {
  let e = yp(),
    t = Ar(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = 'rgba(200,200,200, 0.5)',
    o = { padding: '0.5rem', backgroundColor: r },
    i = { padding: '2px 4px', backgroundColor: r },
    s = null
  return (
    console.error('Error handled by React Router default ErrorBoundary:', e),
    (s = f.createElement(
      f.Fragment,
      null,
      f.createElement('p', null, '💿 Hey developer 👋'),
      f.createElement(
        'p',
        null,
        'You can provide a way better UX than this when your app throws errors by providing your own ',
        f.createElement('code', { style: i }, 'ErrorBoundary'),
        ' or',
        ' ',
        f.createElement('code', { style: i }, 'errorElement'),
        ' prop on your route.',
      ),
    )),
    f.createElement(
      f.Fragment,
      null,
      f.createElement('h2', null, 'Unexpected Application Error!'),
      f.createElement('h3', { style: { fontStyle: 'italic' } }, t),
      n ? f.createElement('pre', { style: o }, n) : null,
      s,
    )
  )
}
var b0 = f.createElement(v0, null),
  w0 = class extends f.Component {
    constructor(e) {
      ;(super(e), (this.state = { location: e.location, revalidation: e.revalidation, error: e.error }))
    }
    static getDerivedStateFromError(e) {
      return { error: e }
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location || (t.revalidation !== 'idle' && e.revalidation === 'idle')
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          }
    }
    componentDidCatch(e, t) {
      this.props.unstable_onError
        ? this.props.unstable_onError(e, t)
        : console.error('React Router caught the following error during render', e)
    }
    render() {
      return this.state.error !== void 0
        ? f.createElement(
            Lt.Provider,
            { value: this.props.routeContext },
            f.createElement(Ql.Provider, { value: this.state.error, children: this.props.component }),
          )
        : this.props.children
    }
  }
function x0({ routeContext: e, match: t, children: n }) {
  let r = f.useContext(Qn)
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    f.createElement(Lt.Provider, { value: e }, n)
  )
}
function S0(e, t = [], n = null, r = null, o = null) {
  if (e == null) {
    if (!n) return null
    if (n.errors) e = n.matches
    else if (t.length === 0 && !n.initialized && n.matches.length > 0) e = n.matches
    else return null
  }
  let i = e,
    s = n?.errors
  if (s != null) {
    let c = i.findIndex((u) => u.route.id && s?.[u.route.id] !== void 0)
    ;(ve(c >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(s).join(',')}`),
      (i = i.slice(0, Math.min(i.length, c + 1))))
  }
  let a = !1,
    l = -1
  if (n)
    for (let c = 0; c < i.length; c++) {
      let u = i[c]
      if (((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (l = c), u.route.id)) {
        let { loaderData: d, errors: h } = n,
          p = u.route.loader && !d.hasOwnProperty(u.route.id) && (!h || h[u.route.id] === void 0)
        if (u.route.lazy || p) {
          ;((a = !0), l >= 0 ? (i = i.slice(0, l + 1)) : (i = [i[0]]))
          break
        }
      }
    }
  return i.reduceRight((c, u, d) => {
    let h,
      p = !1,
      m = null,
      y = null
    n &&
      ((h = s && u.route.id ? s[u.route.id] : void 0),
      (m = u.route.errorElement || b0),
      a &&
        (l < 0 && d === 0
          ? (vp('route-fallback', !1, 'No `HydrateFallback` element provided to render during initial hydration'),
            (p = !0),
            (y = null))
          : l === d && ((p = !0), (y = u.route.hydrateFallbackElement || null))))
    let v = t.concat(i.slice(0, d + 1)),
      w = () => {
        let b
        return (
          h
            ? (b = m)
            : p
              ? (b = y)
              : u.route.Component
                ? (b = f.createElement(u.route.Component, null))
                : u.route.element
                  ? (b = u.route.element)
                  : (b = c),
          f.createElement(x0, {
            match: u,
            routeContext: { outlet: c, matches: v, isDataRoute: n != null },
            children: b,
          })
        )
      }
    return n && (u.route.ErrorBoundary || u.route.errorElement || d === 0)
      ? f.createElement(w0, {
          location: n.location,
          revalidation: n.revalidation,
          component: m,
          error: h,
          children: w(),
          routeContext: { outlet: null, matches: v, isDataRoute: !0 },
          unstable_onError: r,
        })
      : w()
  }, null)
}
function ec(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function C0(e) {
  let t = f.useContext(Qn)
  return (ve(t, ec(e)), t)
}
function E0(e) {
  let t = f.useContext(No)
  return (ve(t, ec(e)), t)
}
function P0(e) {
  let t = f.useContext(Lt)
  return (ve(t, ec(e)), t)
}
function tc(e) {
  let t = P0(e),
    n = t.matches[t.matches.length - 1]
  return (ve(n.route.id, `${e} can only be used on routes that contain a unique "id"`), n.route.id)
}
function R0() {
  return tc('useRouteId')
}
function yp() {
  let e = f.useContext(Ql),
    t = E0('useRouteError'),
    n = tc('useRouteError')
  return e !== void 0 ? e : t.errors?.[n]
}
function T0() {
  let { router: e } = C0('useNavigate'),
    t = tc('useNavigate'),
    n = f.useRef(!1)
  return (
    gp(() => {
      n.current = !0
    }),
    f.useCallback(
      async (o, i = {}) => {
        ;(je(n.current, mp),
          n.current && (typeof o == 'number' ? e.navigate(o) : await e.navigate(o, { fromRouteId: t, ...i })))
      },
      [e, t],
    )
  )
}
var Sd = {}
function vp(e, t, n) {
  !t && !Sd[e] && ((Sd[e] = !0), je(!1, n))
}
var Cd = {}
function Ed(e, t) {
  !e && !Cd[t] && ((Cd[t] = !0), console.warn(t))
}
function A0(e) {
  let t = { hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null }
  return (
    e.Component &&
      (e.element &&
        je(!1, 'You should not include both `Component` and `element` on your route - `Component` will be used.'),
      Object.assign(t, { element: f.createElement(e.Component), Component: void 0 })),
    e.HydrateFallback &&
      (e.hydrateFallbackElement &&
        je(
          !1,
          'You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.',
        ),
      Object.assign(t, { hydrateFallbackElement: f.createElement(e.HydrateFallback), HydrateFallback: void 0 })),
    e.ErrorBoundary &&
      (e.errorElement &&
        je(
          !1,
          'You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.',
        ),
      Object.assign(t, { errorElement: f.createElement(e.ErrorBoundary), ErrorBoundary: void 0 })),
    t
  )
}
var _0 = ['HydrateFallback', 'hydrateFallbackElement'],
  M0 = class {
    constructor() {
      ;((this.status = 'pending'),
        (this.promise = new Promise((e, t) => {
          ;((this.resolve = (n) => {
            this.status === 'pending' && ((this.status = 'resolved'), e(n))
          }),
            (this.reject = (n) => {
              this.status === 'pending' && ((this.status = 'rejected'), t(n))
            }))
        })))
    }
  }
function k0({ router: e, flushSync: t, unstable_onError: n }) {
  let [r, o] = f.useState(e.state),
    [i, s] = f.useState(),
    [a, l] = f.useState({ isTransitioning: !1 }),
    [c, u] = f.useState(),
    [d, h] = f.useState(),
    [p, m] = f.useState(),
    y = f.useRef(new Map()),
    v = f.useCallback(
      (C) => {
        o(
          (A) => (
            C.errors &&
              n &&
              Object.entries(C.errors).forEach(([S, R]) => {
                A.errors?.[S] !== R && n(R)
              }),
            C
          ),
        )
      },
      [n],
    ),
    w = f.useCallback(
      (C, { deletedFetchers: A, flushSync: S, viewTransitionOpts: R }) => {
        ;(C.fetchers.forEach((N, G) => {
          N.data !== void 0 && y.current.set(G, N.data)
        }),
          A.forEach((N) => y.current.delete(N)),
          Ed(
            S === !1 || t != null,
            'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.',
          ))
        let I =
          e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == 'function'
        if (
          (Ed(
            R == null || I,
            'You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.',
          ),
          !R || !I)
        ) {
          t && S ? t(() => v(C)) : f.startTransition(() => v(C))
          return
        }
        if (t && S) {
          t(() => {
            ;(d && (c && c.resolve(), d.skipTransition()),
              l({
                isTransitioning: !0,
                flushSync: !0,
                currentLocation: R.currentLocation,
                nextLocation: R.nextLocation,
              }))
          })
          let N = e.window.document.startViewTransition(() => {
            t(() => v(C))
          })
          ;(N.finished.finally(() => {
            t(() => {
              ;(u(void 0), h(void 0), s(void 0), l({ isTransitioning: !1 }))
            })
          }),
            t(() => h(N)))
          return
        }
        d
          ? (c && c.resolve(),
            d.skipTransition(),
            m({ state: C, currentLocation: R.currentLocation, nextLocation: R.nextLocation }))
          : (s(C),
            l({ isTransitioning: !0, flushSync: !1, currentLocation: R.currentLocation, nextLocation: R.nextLocation }))
      },
      [e.window, t, d, c, v],
    )
  ;(f.useLayoutEffect(() => e.subscribe(w), [e, w]),
    f.useEffect(() => {
      a.isTransitioning && !a.flushSync && u(new M0())
    }, [a]),
    f.useEffect(() => {
      if (c && i && e.window) {
        let C = i,
          A = c.promise,
          S = e.window.document.startViewTransition(async () => {
            ;(f.startTransition(() => v(C)), await A)
          })
        ;(S.finished.finally(() => {
          ;(u(void 0), h(void 0), s(void 0), l({ isTransitioning: !1 }))
        }),
          h(S))
      }
    }, [i, c, e.window, v]),
    f.useEffect(() => {
      c && i && r.location.key === i.location.key && c.resolve()
    }, [c, d, r.location, i]),
    f.useEffect(() => {
      !a.isTransitioning &&
        p &&
        (s(p.state),
        l({ isTransitioning: !0, flushSync: !1, currentLocation: p.currentLocation, nextLocation: p.nextLocation }),
        m(void 0))
    }, [a.isTransitioning, p]))
  let b = f.useMemo(
      () => ({
        createHref: e.createHref,
        encodeLocation: e.encodeLocation,
        go: (C) => e.navigate(C),
        push: (C, A, S) => e.navigate(C, { state: A, preventScrollReset: S?.preventScrollReset }),
        replace: (C, A, S) => e.navigate(C, { replace: !0, state: A, preventScrollReset: S?.preventScrollReset }),
      }),
      [e],
    ),
    x = e.basename || '/',
    E = f.useMemo(() => ({ router: e, navigator: b, static: !1, basename: x, unstable_onError: n }), [e, b, x, n])
  return f.createElement(
    f.Fragment,
    null,
    f.createElement(
      Qn.Provider,
      { value: E },
      f.createElement(
        No.Provider,
        { value: r },
        f.createElement(
          pp.Provider,
          { value: y.current },
          f.createElement(
            Jl.Provider,
            { value: a },
            f.createElement(
              N0,
              { basename: x, location: r.location, navigationType: r.historyAction, navigator: b },
              f.createElement(D0, { routes: e.routes, future: e.future, state: r, unstable_onError: n }),
            ),
          ),
        ),
      ),
    ),
    null,
  )
}
var D0 = f.memo(I0)
function I0({ routes: e, future: t, state: n, unstable_onError: r }) {
  return y0(e, void 0, n, r, t)
}
function O0(e) {
  return m0(e.context)
}
function N0({
  basename: e = '/',
  children: t = null,
  location: n,
  navigationType: r = 'POP',
  navigator: o,
  static: i = !1,
}) {
  ve(!Lo(), 'You cannot render a <Router> inside another <Router>. You should never have more than one in your app.')
  let s = e.replace(/^\/*/, '/'),
    a = f.useMemo(() => ({ basename: s, navigator: o, static: i, future: {} }), [s, o, i])
  typeof n == 'string' && (n = Rn(n))
  let { pathname: l = '/', search: c = '', hash: u = '', state: d = null, key: h = 'default' } = n,
    p = f.useMemo(() => {
      let m = Ct(l, s)
      return m == null ? null : { location: { pathname: m, search: c, hash: u, state: d, key: h }, navigationType: r }
    }, [s, l, c, u, d, h, r])
  return (
    je(
      p != null,
      `<Router basename="${s}"> is not able to match the URL "${l}${c}${u}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    p == null
      ? null
      : f.createElement(Xt.Provider, { value: a }, f.createElement(gs.Provider, { children: t, value: p }))
  )
}
var Ai = 'get',
  _i = 'application/x-www-form-urlencoded'
function ys(e) {
  return e != null && typeof e.tagName == 'string'
}
function L0(e) {
  return ys(e) && e.tagName.toLowerCase() === 'button'
}
function j0(e) {
  return ys(e) && e.tagName.toLowerCase() === 'form'
}
function $0(e) {
  return ys(e) && e.tagName.toLowerCase() === 'input'
}
function F0(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function z0(e, t) {
  return e.button === 0 && (!t || t === '_self') && !F0(e)
}
function Ga(e = '') {
  return new URLSearchParams(
    typeof e == 'string' || Array.isArray(e) || e instanceof URLSearchParams
      ? e
      : Object.keys(e).reduce((t, n) => {
          let r = e[n]
          return t.concat(Array.isArray(r) ? r.map((o) => [n, o]) : [[n, r]])
        }, []),
  )
}
function V0(e, t) {
  let n = Ga(e)
  return (
    t &&
      t.forEach((r, o) => {
        n.has(o) ||
          t.getAll(o).forEach((i) => {
            n.append(o, i)
          })
      }),
    n
  )
}
var ii = null
function B0() {
  if (ii === null)
    try {
      ;(new FormData(document.createElement('form'), 0), (ii = !1))
    } catch {
      ii = !0
    }
  return ii
}
var U0 = new Set(['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'])
function ca(e) {
  return e != null && !U0.has(e)
    ? (je(!1, `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${_i}"`), null)
    : e
}
function W0(e, t) {
  let n, r, o, i, s
  if (j0(e)) {
    let a = e.getAttribute('action')
    ;((r = a ? Ct(a, t) : null),
      (n = e.getAttribute('method') || Ai),
      (o = ca(e.getAttribute('enctype')) || _i),
      (i = new FormData(e)))
  } else if (L0(e) || ($0(e) && (e.type === 'submit' || e.type === 'image'))) {
    let a = e.form
    if (a == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>')
    let l = e.getAttribute('formaction') || a.getAttribute('action')
    if (
      ((r = l ? Ct(l, t) : null),
      (n = e.getAttribute('formmethod') || a.getAttribute('method') || Ai),
      (o = ca(e.getAttribute('formenctype')) || ca(a.getAttribute('enctype')) || _i),
      (i = new FormData(a, e)),
      !B0())
    ) {
      let { name: c, type: u, value: d } = e
      if (u === 'image') {
        let h = c ? `${c}.` : ''
        ;(i.append(`${h}x`, '0'), i.append(`${h}y`, '0'))
      } else c && i.append(c, d)
    }
  } else {
    if (ys(e)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">')
    ;((n = Ai), (r = null), (o = _i), (s = e))
  }
  return (
    i && o === 'text/plain' && ((s = i), (i = void 0)),
    { action: r, method: n.toLowerCase(), encType: o, formData: i, body: s }
  )
}
Object.getOwnPropertyNames(Object.prototype).sort().join('\0')
function nc(e, t) {
  if (e === !1 || e === null || typeof e > 'u') throw new Error(t)
}
function H0(e, t, n) {
  let r = typeof e == 'string' ? new URL(e, typeof window > 'u' ? 'server://singlefetch/' : window.location.origin) : e
  return (
    r.pathname === '/'
      ? (r.pathname = `_root.${n}`)
      : t && Ct(r.pathname, t) === '/'
        ? (r.pathname = `${t.replace(/\/$/, '')}/_root.${n}`)
        : (r.pathname = `${r.pathname.replace(/\/$/, '')}.${n}`),
    r
  )
}
async function G0(e, t) {
  if (e.id in t) return t[e.id]
  try {
    let n = await import(e.module)
    return ((t[e.id] = n), n)
  } catch (n) {
    return (
      console.error(`Error loading route module \`${e.module}\`, reloading page...`),
      console.error(n),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    )
  }
}
function Z0(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === 'preload' && typeof e.imageSrcSet == 'string' && typeof e.imageSizes == 'string'
      : typeof e.rel == 'string' && typeof e.href == 'string'
}
async function K0(e, t, n) {
  let r = await Promise.all(
    e.map(async (o) => {
      let i = t.routes[o.route.id]
      if (i) {
        let s = await G0(i, n)
        return s.links ? s.links() : []
      }
      return []
    }),
  )
  return J0(
    r
      .flat(1)
      .filter(Z0)
      .filter((o) => o.rel === 'stylesheet' || o.rel === 'preload')
      .map((o) => (o.rel === 'stylesheet' ? { ...o, rel: 'prefetch', as: 'style' } : { ...o, rel: 'prefetch' })),
  )
}
function Pd(e, t, n, r, o, i) {
  let s = (l, c) => (n[c] ? l.route.id !== n[c].route.id : !0),
    a = (l, c) => n[c].pathname !== l.pathname || (n[c].route.path?.endsWith('*') && n[c].params['*'] !== l.params['*'])
  return i === 'assets'
    ? t.filter((l, c) => s(l, c) || a(l, c))
    : i === 'data'
      ? t.filter((l, c) => {
          let u = r.routes[l.route.id]
          if (!u || !u.hasLoader) return !1
          if (s(l, c) || a(l, c)) return !0
          if (l.route.shouldRevalidate) {
            let d = l.route.shouldRevalidate({
              currentUrl: new URL(o.pathname + o.search + o.hash, window.origin),
              currentParams: n[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: l.params,
              defaultShouldRevalidate: !0,
            })
            if (typeof d == 'boolean') return d
          }
          return !0
        })
      : []
}
function Y0(e, t, { includeHydrateFallback: n } = {}) {
  return X0(
    e
      .map((r) => {
        let o = t.routes[r.route.id]
        if (!o) return []
        let i = [o.module]
        return (
          o.clientActionModule && (i = i.concat(o.clientActionModule)),
          o.clientLoaderModule && (i = i.concat(o.clientLoaderModule)),
          n && o.hydrateFallbackModule && (i = i.concat(o.hydrateFallbackModule)),
          o.imports && (i = i.concat(o.imports)),
          i
        )
      })
      .flat(1),
  )
}
function X0(e) {
  return [...new Set(e)]
}
function q0(e) {
  let t = {},
    n = Object.keys(e).sort()
  for (let r of n) t[r] = e[r]
  return t
}
function J0(e, t) {
  let n = new Set()
  return (
    new Set(t),
    e.reduce((r, o) => {
      let i = JSON.stringify(q0(o))
      return (n.has(i) || (n.add(i), r.push({ key: i, link: o })), r)
    }, [])
  )
}
function bp() {
  let e = f.useContext(Qn)
  return (nc(e, 'You must render this element inside a <DataRouterContext.Provider> element'), e)
}
function Q0() {
  let e = f.useContext(No)
  return (nc(e, 'You must render this element inside a <DataRouterStateContext.Provider> element'), e)
}
var rc = f.createContext(void 0)
rc.displayName = 'FrameworkContext'
function wp() {
  let e = f.useContext(rc)
  return (nc(e, 'You must render this element inside a <HydratedRouter> element'), e)
}
function e1(e, t) {
  let n = f.useContext(rc),
    [r, o] = f.useState(!1),
    [i, s] = f.useState(!1),
    { onFocus: a, onBlur: l, onMouseEnter: c, onMouseLeave: u, onTouchStart: d } = t,
    h = f.useRef(null)
  ;(f.useEffect(() => {
    if ((e === 'render' && s(!0), e === 'viewport')) {
      let y = (w) => {
          w.forEach((b) => {
            s(b.isIntersecting)
          })
        },
        v = new IntersectionObserver(y, { threshold: 0.5 })
      return (
        h.current && v.observe(h.current),
        () => {
          v.disconnect()
        }
      )
    }
  }, [e]),
    f.useEffect(() => {
      if (r) {
        let y = setTimeout(() => {
          s(!0)
        }, 100)
        return () => {
          clearTimeout(y)
        }
      }
    }, [r]))
  let p = () => {
      o(!0)
    },
    m = () => {
      ;(o(!1), s(!1))
    }
  return n
    ? e !== 'intent'
      ? [i, h, {}]
      : [
          i,
          h,
          {
            onFocus: ro(a, p),
            onBlur: ro(l, m),
            onMouseEnter: ro(c, p),
            onMouseLeave: ro(u, m),
            onTouchStart: ro(d, p),
          },
        ]
    : [!1, h, {}]
}
function ro(e, t) {
  return (n) => {
    ;(e && e(n), n.defaultPrevented || t(n))
  }
}
function t1({ page: e, ...t }) {
  let { router: n } = bp(),
    r = f.useMemo(() => vn(n.routes, e, n.basename), [n.routes, e, n.basename])
  return r ? f.createElement(r1, { page: e, matches: r, ...t }) : null
}
function n1(e) {
  let { manifest: t, routeModules: n } = wp(),
    [r, o] = f.useState([])
  return (
    f.useEffect(() => {
      let i = !1
      return (
        K0(e, t, n).then((s) => {
          i || o(s)
        }),
        () => {
          i = !0
        }
      )
    }, [e, t, n]),
    r
  )
}
function r1({ page: e, matches: t, ...n }) {
  let r = qt(),
    { manifest: o, routeModules: i } = wp(),
    { basename: s } = bp(),
    { loaderData: a, matches: l } = Q0(),
    c = f.useMemo(() => Pd(e, t, l, o, r, 'data'), [e, t, l, o, r]),
    u = f.useMemo(() => Pd(e, t, l, o, r, 'assets'), [e, t, l, o, r]),
    d = f.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return []
      let m = new Set(),
        y = !1
      if (
        (t.forEach((w) => {
          let b = o.routes[w.route.id]
          !b ||
            !b.hasLoader ||
            ((!c.some((x) => x.route.id === w.route.id) && w.route.id in a && i[w.route.id]?.shouldRevalidate) ||
            b.hasClientLoader
              ? (y = !0)
              : m.add(w.route.id))
        }),
        m.size === 0)
      )
        return []
      let v = H0(e, s, 'data')
      return (
        y &&
          m.size > 0 &&
          v.searchParams.set(
            '_routes',
            t
              .filter((w) => m.has(w.route.id))
              .map((w) => w.route.id)
              .join(','),
          ),
        [v.pathname + v.search]
      )
    }, [s, a, r, o, c, t, e, i]),
    h = f.useMemo(() => Y0(u, o), [u, o]),
    p = n1(u)
  return f.createElement(
    f.Fragment,
    null,
    d.map((m) => f.createElement('link', { key: m, rel: 'prefetch', as: 'fetch', href: m, ...n })),
    h.map((m) => f.createElement('link', { key: m, rel: 'modulepreload', href: m, ...n })),
    p.map(({ key: m, link: y }) => f.createElement('link', { key: m, nonce: n.nonce, ...y })),
  )
}
function o1(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == 'function' ? n(t) : n != null && (n.current = t)
    })
  }
}
var xp = typeof window < 'u' && typeof window.document < 'u' && typeof window.document.createElement < 'u'
try {
  xp && (window.__reactRouterVersion = '7.9.5')
} catch {}
function i1(e, t) {
  return Bx({
    basename: t?.basename,
    getContext: t?.getContext,
    future: t?.future,
    history: tx({ window: t?.window }),
    hydrationData: s1(),
    routes: e,
    mapRouteProperties: A0,
    hydrationRouteProperties: _0,
    dataStrategy: t?.dataStrategy,
    patchRoutesOnNavigation: t?.patchRoutesOnNavigation,
    window: t?.window,
    unstable_instrumentations: t?.unstable_instrumentations,
  }).initialize()
}
function s1() {
  let e = window?.__staticRouterHydrationData
  return (e && e.errors && (e = { ...e, errors: a1(e.errors) }), e)
}
function a1(e) {
  if (!e) return null
  let t = Object.entries(e),
    n = {}
  for (let [r, o] of t)
    if (o && o.__type === 'RouteErrorResponse') n[r] = new Fi(o.status, o.statusText, o.data, o.internal === !0)
    else if (o && o.__type === 'Error') {
      if (o.__subType) {
        let i = window[o.__subType]
        if (typeof i == 'function')
          try {
            let s = new i(o.message)
            ;((s.stack = ''), (n[r] = s))
          } catch {}
      }
      if (n[r] == null) {
        let i = new Error(o.message)
        ;((i.stack = ''), (n[r] = i))
      }
    } else n[r] = o
  return n
}
var Sp = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Cp = f.forwardRef(function (
    {
      onClick: t,
      discover: n = 'render',
      prefetch: r = 'none',
      relative: o,
      reloadDocument: i,
      replace: s,
      state: a,
      target: l,
      to: c,
      preventScrollReset: u,
      viewTransition: d,
      ...h
    },
    p,
  ) {
    let { basename: m } = f.useContext(Xt),
      y = typeof c == 'string' && Sp.test(c),
      v,
      w = !1
    if (typeof c == 'string' && y && ((v = c), xp))
      try {
        let I = new URL(window.location.href),
          N = c.startsWith('//') ? new URL(I.protocol + c) : new URL(c),
          G = Ct(N.pathname, m)
        N.origin === I.origin && G != null ? (c = G + N.search + N.hash) : (w = !0)
      } catch {
        je(
          !1,
          `<Link to="${c}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
        )
      }
    let b = f0(c, { relative: o }),
      [x, E, C] = e1(r, h),
      A = d1(c, { replace: s, state: a, target: l, preventScrollReset: u, relative: o, viewTransition: d })
    function S(I) {
      ;(t && t(I), I.defaultPrevented || A(I))
    }
    let R = f.createElement('a', {
      ...h,
      ...C,
      href: v || b,
      onClick: w || i ? t : S,
      ref: o1(p, E),
      target: l,
      'data-discover': !y && n === 'render' ? 'true' : void 0,
    })
    return x && !y ? f.createElement(f.Fragment, null, R, f.createElement(t1, { page: b })) : R
  })
Cp.displayName = 'Link'
var l1 = f.forwardRef(function (
  {
    'aria-current': t = 'page',
    caseSensitive: n = !1,
    className: r = '',
    end: o = !1,
    style: i,
    to: s,
    viewTransition: a,
    children: l,
    ...c
  },
  u,
) {
  let d = $o(s, { relative: c.relative }),
    h = qt(),
    p = f.useContext(No),
    { navigator: m, basename: y } = f.useContext(Xt),
    v = p != null && y1(d) && a === !0,
    w = m.encodeLocation ? m.encodeLocation(d).pathname : d.pathname,
    b = h.pathname,
    x = p && p.navigation && p.navigation.location ? p.navigation.location.pathname : null
  ;(n || ((b = b.toLowerCase()), (x = x ? x.toLowerCase() : null), (w = w.toLowerCase())),
    x && y && (x = Ct(x, y) || x))
  const E = w !== '/' && w.endsWith('/') ? w.length - 1 : w.length
  let C = b === w || (!o && b.startsWith(w) && b.charAt(E) === '/'),
    A = x != null && (x === w || (!o && x.startsWith(w) && x.charAt(w.length) === '/')),
    S = { isActive: C, isPending: A, isTransitioning: v },
    R = C ? t : void 0,
    I
  typeof r == 'function'
    ? (I = r(S))
    : (I = [r, C ? 'active' : null, A ? 'pending' : null, v ? 'transitioning' : null].filter(Boolean).join(' '))
  let N = typeof i == 'function' ? i(S) : i
  return f.createElement(
    Cp,
    { ...c, 'aria-current': R, className: I, ref: u, style: N, to: s, viewTransition: a },
    typeof l == 'function' ? l(S) : l,
  )
})
l1.displayName = 'NavLink'
var c1 = f.forwardRef(
  (
    {
      discover: e = 'render',
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: o,
      state: i,
      method: s = Ai,
      action: a,
      onSubmit: l,
      relative: c,
      preventScrollReset: u,
      viewTransition: d,
      ...h
    },
    p,
  ) => {
    let m = m1(),
      y = g1(a, { relative: c }),
      v = s.toLowerCase() === 'get' ? 'get' : 'post',
      w = typeof a == 'string' && Sp.test(a),
      b = (x) => {
        if ((l && l(x), x.defaultPrevented)) return
        x.preventDefault()
        let E = x.nativeEvent.submitter,
          C = E?.getAttribute('formmethod') || s
        m(E || x.currentTarget, {
          fetcherKey: t,
          method: C,
          navigate: n,
          replace: o,
          state: i,
          relative: c,
          preventScrollReset: u,
          viewTransition: d,
        })
      }
    return f.createElement('form', {
      ref: p,
      method: v,
      action: y,
      onSubmit: r ? l : b,
      ...h,
      'data-discover': !w && e === 'render' ? 'true' : void 0,
    })
  },
)
c1.displayName = 'Form'
function u1(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function Ep(e) {
  let t = f.useContext(Qn)
  return (ve(t, u1(e)), t)
}
function d1(e, { target: t, replace: n, state: r, preventScrollReset: o, relative: i, viewTransition: s } = {}) {
  let a = jo(),
    l = qt(),
    c = $o(e, { relative: i })
  return f.useCallback(
    (u) => {
      if (z0(u, t)) {
        u.preventDefault()
        let d = n !== void 0 ? n : Kt(l) === Kt(c)
        a(e, { replace: d, state: r, preventScrollReset: o, relative: i, viewTransition: s })
      }
    },
    [l, a, c, n, r, t, e, o, i, s],
  )
}
function f1(e) {
  je(
    typeof URLSearchParams < 'u',
    'You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.',
  )
  let t = f.useRef(Ga(e)),
    n = f.useRef(!1),
    r = qt(),
    o = f.useMemo(() => V0(r.search, n.current ? null : t.current), [r.search]),
    i = jo(),
    s = f.useCallback(
      (a, l) => {
        const c = Ga(typeof a == 'function' ? a(new URLSearchParams(o)) : a)
        ;((n.current = !0), i('?' + c, l))
      },
      [i, o],
    )
  return [o, s]
}
var h1 = 0,
  p1 = () => `__${String(++h1)}__`
function m1() {
  let { router: e } = Ep('useSubmit'),
    { basename: t } = f.useContext(Xt),
    n = R0()
  return f.useCallback(
    async (r, o = {}) => {
      let { action: i, method: s, encType: a, formData: l, body: c } = W0(r, t)
      if (o.navigate === !1) {
        let u = o.fetcherKey || p1()
        await e.fetch(u, n, o.action || i, {
          preventScrollReset: o.preventScrollReset,
          formData: l,
          body: c,
          formMethod: o.method || s,
          formEncType: o.encType || a,
          flushSync: o.flushSync,
        })
      } else
        await e.navigate(o.action || i, {
          preventScrollReset: o.preventScrollReset,
          formData: l,
          body: c,
          formMethod: o.method || s,
          formEncType: o.encType || a,
          replace: o.replace,
          state: o.state,
          fromRouteId: n,
          flushSync: o.flushSync,
          viewTransition: o.viewTransition,
        })
    },
    [e, t, n],
  )
}
function g1(e, { relative: t } = {}) {
  let { basename: n } = f.useContext(Xt),
    r = f.useContext(Lt)
  ve(r, 'useFormAction must be used inside a RouteContext')
  let [o] = r.matches.slice(-1),
    i = { ...$o(e || '.', { relative: t }) },
    s = qt()
  if (e == null) {
    i.search = s.search
    let a = new URLSearchParams(i.search),
      l = a.getAll('index')
    if (l.some((u) => u === '')) {
      ;(a.delete('index'), l.filter((d) => d).forEach((d) => a.append('index', d)))
      let u = a.toString()
      i.search = u ? `?${u}` : ''
    }
  }
  return (
    (!e || e === '.') && o.route.index && (i.search = i.search ? i.search.replace(/^\?/, '?index&') : '?index'),
    n !== '/' && (i.pathname = i.pathname === '/' ? n : Wt([n, i.pathname])),
    Kt(i)
  )
}
function y1(e, { relative: t } = {}) {
  let n = f.useContext(Jl)
  ve(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  )
  let { basename: r } = Ep('useViewTransitionState'),
    o = $o(e, { relative: t })
  if (!n.isTransitioning) return !1
  let i = Ct(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    s = Ct(n.nextLocation.pathname, r) || n.nextLocation.pathname
  return $i(o.pathname, s) != null || $i(o.pathname, i) != null
}
const v1 = 'modulepreload',
  b1 = function (e) {
    return '/' + e
  },
  Rd = {},
  mn = function (t, n, r) {
    let o = Promise.resolve()
    if (n && n.length > 0) {
      let l = function (c) {
        return Promise.all(
          c.map((u) =>
            Promise.resolve(u).then(
              (d) => ({ status: 'fulfilled', value: d }),
              (d) => ({ status: 'rejected', reason: d }),
            ),
          ),
        )
      }
      document.getElementsByTagName('link')
      const s = document.querySelector('meta[property=csp-nonce]'),
        a = s?.nonce || s?.getAttribute('nonce')
      o = l(
        n.map((c) => {
          if (((c = b1(c)), c in Rd)) return
          Rd[c] = !0
          const u = c.endsWith('.css'),
            d = u ? '[rel="stylesheet"]' : ''
          if (document.querySelector(`link[href="${c}"]${d}`)) return
          const h = document.createElement('link')
          if (
            ((h.rel = u ? 'stylesheet' : v1),
            u || (h.as = 'script'),
            (h.crossOrigin = ''),
            (h.href = c),
            a && h.setAttribute('nonce', a),
            document.head.appendChild(h),
            u)
          )
            return new Promise((p, m) => {
              ;(h.addEventListener('load', p),
                h.addEventListener('error', () => m(new Error(`Unable to preload CSS for ${c}`))))
            })
        }),
      )
    }
    function i(s) {
      const a = new Event('vite:preloadError', { cancelable: !0 })
      if (((a.payload = s), window.dispatchEvent(a), !a.defaultPrevented)) throw s
    }
    return o.then((s) => {
      for (const a of s || []) a.status === 'rejected' && i(a.reason)
      return t().catch(i)
    })
  }
class w1 {
  photos = []
  photoMap = {}
  cameras = []
  lenses = []
  constructor() {
    ;((this.getAllTags = this.getAllTags.bind(this)),
      (this.getAllCameras = this.getAllCameras.bind(this)),
      (this.getAllLenses = this.getAllLenses.bind(this)),
      (this.getPhotos = this.getPhotos.bind(this)),
      (this.getPhoto = this.getPhoto.bind(this)),
      (this.photos = __MANIFEST__.data),
      (this.cameras = __MANIFEST__.cameras),
      (this.lenses = __MANIFEST__.lenses),
      this.photos.forEach((t) => {
        this.photoMap[t.id] = t
      }))
  }
  getPhotos() {
    return this.photos
  }
  getPhoto(t) {
    return this.photoMap[t]
  }
  getAllTags() {
    const t = new Set()
    return (
      this.photos.forEach((n) => {
        n.tags.forEach((r) => t.add(r))
      }),
      Array.from(t).sort()
    )
  }
  getAllCameras() {
    return this.cameras
  }
  getAllLenses() {
    return this.lenses
  }
}
const _r = new w1()
function Pp(e) {
  var t,
    n,
    r = ''
  if (typeof e == 'string' || typeof e == 'number') r += e
  else if (typeof e == 'object')
    if (Array.isArray(e)) {
      var o = e.length
      for (t = 0; t < o; t++) e[t] && (n = Pp(e[t])) && (r && (r += ' '), (r += n))
    } else for (n in e) e[n] && (r && (r += ' '), (r += n))
  return r
}
function oc() {
  for (var e, t, n = 0, r = '', o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Pp(e)) && (r && (r += ' '), (r += t))
  return r
}
const ic = '-',
  x1 = (e) => {
    const t = C1(e),
      { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e
    return {
      getClassGroupId: (s) => {
        const a = s.split(ic)
        return (a[0] === '' && a.length !== 1 && a.shift(), Rp(a, t) || S1(s))
      },
      getConflictingClassGroupIds: (s, a) => {
        const l = n[s] || []
        return a && r[s] ? [...l, ...r[s]] : l
      },
    }
  },
  Rp = (e, t) => {
    if (e.length === 0) return t.classGroupId
    const n = e[0],
      r = t.nextPart.get(n),
      o = r ? Rp(e.slice(1), r) : void 0
    if (o) return o
    if (t.validators.length === 0) return
    const i = e.join(ic)
    return t.validators.find(({ validator: s }) => s(i))?.classGroupId
  },
  Td = /^\[(.+)\]$/,
  S1 = (e) => {
    if (Td.test(e)) {
      const t = Td.exec(e)[1],
        n = t?.substring(0, t.indexOf(':'))
      if (n) return 'arbitrary..' + n
    }
  },
  C1 = (e) => {
    const { theme: t, classGroups: n } = e,
      r = { nextPart: new Map(), validators: [] }
    for (const o in n) Za(n[o], r, o, t)
    return r
  },
  Za = (e, t, n, r) => {
    e.forEach((o) => {
      if (typeof o == 'string') {
        const i = o === '' ? t : Ad(t, o)
        i.classGroupId = n
        return
      }
      if (typeof o == 'function') {
        if (E1(o)) {
          Za(o(r), t, n, r)
          return
        }
        t.validators.push({ validator: o, classGroupId: n })
        return
      }
      Object.entries(o).forEach(([i, s]) => {
        Za(s, Ad(t, i), n, r)
      })
    })
  },
  Ad = (e, t) => {
    let n = e
    return (
      t.split(ic).forEach((r) => {
        ;(n.nextPart.has(r) || n.nextPart.set(r, { nextPart: new Map(), validators: [] }), (n = n.nextPart.get(r)))
      }),
      n
    )
  },
  E1 = (e) => e.isThemeGetter,
  P1 = (e) => {
    if (e < 1) return { get: () => {}, set: () => {} }
    let t = 0,
      n = new Map(),
      r = new Map()
    const o = (i, s) => {
      ;(n.set(i, s), t++, t > e && ((t = 0), (r = n), (n = new Map())))
    }
    return {
      get(i) {
        let s = n.get(i)
        if (s !== void 0) return s
        if ((s = r.get(i)) !== void 0) return (o(i, s), s)
      },
      set(i, s) {
        n.has(i) ? n.set(i, s) : o(i, s)
      },
    }
  },
  Ka = '!',
  Ya = ':',
  R1 = Ya.length,
  T1 = (e) => {
    const { prefix: t, experimentalParseClassName: n } = e
    let r = (o) => {
      const i = []
      let s = 0,
        a = 0,
        l = 0,
        c
      for (let m = 0; m < o.length; m++) {
        let y = o[m]
        if (s === 0 && a === 0) {
          if (y === Ya) {
            ;(i.push(o.slice(l, m)), (l = m + R1))
            continue
          }
          if (y === '/') {
            c = m
            continue
          }
        }
        y === '[' ? s++ : y === ']' ? s-- : y === '(' ? a++ : y === ')' && a--
      }
      const u = i.length === 0 ? o : o.substring(l),
        d = A1(u),
        h = d !== u,
        p = c && c > l ? c - l : void 0
      return { modifiers: i, hasImportantModifier: h, baseClassName: d, maybePostfixModifierPosition: p }
    }
    if (t) {
      const o = t + Ya,
        i = r
      r = (s) =>
        s.startsWith(o)
          ? i(s.substring(o.length))
          : {
              isExternal: !0,
              modifiers: [],
              hasImportantModifier: !1,
              baseClassName: s,
              maybePostfixModifierPosition: void 0,
            }
    }
    if (n) {
      const o = r
      r = (i) => n({ className: i, parseClassName: o })
    }
    return r
  },
  A1 = (e) => (e.endsWith(Ka) ? e.substring(0, e.length - 1) : e.startsWith(Ka) ? e.substring(1) : e),
  _1 = (e) => {
    const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]))
    return (r) => {
      if (r.length <= 1) return r
      const o = []
      let i = []
      return (
        r.forEach((s) => {
          s[0] === '[' || t[s] ? (o.push(...i.sort(), s), (i = [])) : i.push(s)
        }),
        o.push(...i.sort()),
        o
      )
    }
  },
  M1 = (e) => ({ cache: P1(e.cacheSize), parseClassName: T1(e), sortModifiers: _1(e), ...x1(e) }),
  k1 = /\s+/,
  D1 = (e, t) => {
    const { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: o, sortModifiers: i } = t,
      s = [],
      a = e.trim().split(k1)
    let l = ''
    for (let c = a.length - 1; c >= 0; c -= 1) {
      const u = a[c],
        {
          isExternal: d,
          modifiers: h,
          hasImportantModifier: p,
          baseClassName: m,
          maybePostfixModifierPosition: y,
        } = n(u)
      if (d) {
        l = u + (l.length > 0 ? ' ' + l : l)
        continue
      }
      let v = !!y,
        w = r(v ? m.substring(0, y) : m)
      if (!w) {
        if (!v) {
          l = u + (l.length > 0 ? ' ' + l : l)
          continue
        }
        if (((w = r(m)), !w)) {
          l = u + (l.length > 0 ? ' ' + l : l)
          continue
        }
        v = !1
      }
      const b = i(h).join(':'),
        x = p ? b + Ka : b,
        E = x + w
      if (s.includes(E)) continue
      s.push(E)
      const C = o(w, v)
      for (let A = 0; A < C.length; ++A) {
        const S = C[A]
        s.push(x + S)
      }
      l = u + (l.length > 0 ? ' ' + l : l)
    }
    return l
  }
function I1() {
  let e = 0,
    t,
    n,
    r = ''
  for (; e < arguments.length; ) (t = arguments[e++]) && (n = Tp(t)) && (r && (r += ' '), (r += n))
  return r
}
const Tp = (e) => {
  if (typeof e == 'string') return e
  let t,
    n = ''
  for (let r = 0; r < e.length; r++) e[r] && (t = Tp(e[r])) && (n && (n += ' '), (n += t))
  return n
}
function Xa(e, ...t) {
  let n,
    r,
    o,
    i = s
  function s(l) {
    const c = t.reduce((u, d) => d(u), e())
    return ((n = M1(c)), (r = n.cache.get), (o = n.cache.set), (i = a), a(l))
  }
  function a(l) {
    const c = r(l)
    if (c) return c
    const u = D1(l, n)
    return (o(l, u), u)
  }
  return function () {
    return i(I1.apply(null, arguments))
  }
}
const Ve = (e) => {
    const t = (n) => n[e] || []
    return ((t.isThemeGetter = !0), t)
  },
  Ap = /^\[(?:(\w[\w-]*):)?(.+)\]$/i,
  _p = /^\((?:(\w[\w-]*):)?(.+)\)$/i,
  O1 = /^\d+\/\d+$/,
  N1 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  L1 =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  j1 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,
  $1 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  F1 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
  cr = (e) => O1.test(e),
  ye = (e) => !!e && !Number.isNaN(Number(e)),
  pn = (e) => !!e && Number.isInteger(Number(e)),
  ua = (e) => e.endsWith('%') && ye(e.slice(0, -1)),
  tn = (e) => N1.test(e),
  z1 = () => !0,
  V1 = (e) => L1.test(e) && !j1.test(e),
  Mp = () => !1,
  B1 = (e) => $1.test(e),
  U1 = (e) => F1.test(e),
  W1 = (e) => !Y(e) && !X(e),
  H1 = (e) => jr(e, Ip, Mp),
  Y = (e) => Ap.test(e),
  jn = (e) => jr(e, Op, V1),
  da = (e) => jr(e, X1, ye),
  _d = (e) => jr(e, kp, Mp),
  G1 = (e) => jr(e, Dp, U1),
  si = (e) => jr(e, Np, B1),
  X = (e) => _p.test(e),
  oo = (e) => $r(e, Op),
  Z1 = (e) => $r(e, q1),
  Md = (e) => $r(e, kp),
  K1 = (e) => $r(e, Ip),
  Y1 = (e) => $r(e, Dp),
  ai = (e) => $r(e, Np, !0),
  jr = (e, t, n) => {
    const r = Ap.exec(e)
    return r ? (r[1] ? t(r[1]) : n(r[2])) : !1
  },
  $r = (e, t, n = !1) => {
    const r = _p.exec(e)
    return r ? (r[1] ? t(r[1]) : n) : !1
  },
  kp = (e) => e === 'position' || e === 'percentage',
  Dp = (e) => e === 'image' || e === 'url',
  Ip = (e) => e === 'length' || e === 'size' || e === 'bg-size',
  Op = (e) => e === 'length',
  X1 = (e) => e === 'number',
  q1 = (e) => e === 'family-name',
  Np = (e) => e === 'shadow',
  qa = () => {
    const e = Ve('color'),
      t = Ve('font'),
      n = Ve('text'),
      r = Ve('font-weight'),
      o = Ve('tracking'),
      i = Ve('leading'),
      s = Ve('breakpoint'),
      a = Ve('container'),
      l = Ve('spacing'),
      c = Ve('radius'),
      u = Ve('shadow'),
      d = Ve('inset-shadow'),
      h = Ve('text-shadow'),
      p = Ve('drop-shadow'),
      m = Ve('blur'),
      y = Ve('perspective'),
      v = Ve('aspect'),
      w = Ve('ease'),
      b = Ve('animate'),
      x = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'],
      E = () => [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'left-top',
        'top-right',
        'right-top',
        'bottom-right',
        'right-bottom',
        'bottom-left',
        'left-bottom',
      ],
      C = () => [...E(), X, Y],
      A = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'],
      S = () => ['auto', 'contain', 'none'],
      R = () => [X, Y, l],
      I = () => [cr, 'full', 'auto', ...R()],
      N = () => [pn, 'none', 'subgrid', X, Y],
      G = () => ['auto', { span: ['full', pn, X, Y] }, pn, X, Y],
      oe = () => [pn, 'auto', X, Y],
      te = () => ['auto', 'min', 'max', 'fr', X, Y],
      L = () => [
        'start',
        'end',
        'center',
        'between',
        'around',
        'evenly',
        'stretch',
        'baseline',
        'center-safe',
        'end-safe',
      ],
      F = () => ['start', 'end', 'center', 'stretch', 'center-safe', 'end-safe'],
      O = () => ['auto', ...R()],
      D = () => [cr, 'auto', 'full', 'dvw', 'dvh', 'lvw', 'lvh', 'svw', 'svh', 'min', 'max', 'fit', ...R()],
      _ = () => [e, X, Y],
      k = () => [...E(), Md, _d, { position: [X, Y] }],
      W = () => ['no-repeat', { repeat: ['', 'x', 'y', 'space', 'round'] }],
      q = () => ['auto', 'cover', 'contain', K1, H1, { size: [X, Y] }],
      ae = () => [ua, oo, jn],
      B = () => ['', 'none', 'full', c, X, Y],
      Z = () => ['', ye, oo, jn],
      J = () => ['solid', 'dashed', 'dotted', 'double'],
      he = () => [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      z = () => [ye, ua, Md, _d],
      ee = () => ['', 'none', m, X, Y],
      Ce = () => ['none', ye, X, Y],
      be = () => ['none', ye, X, Y],
      le = () => [ye, X, Y],
      ge = () => [cr, 'full', ...R()]
    return {
      cacheSize: 500,
      theme: {
        animate: ['spin', 'ping', 'pulse', 'bounce'],
        aspect: ['video'],
        blur: [tn],
        breakpoint: [tn],
        color: [z1],
        container: [tn],
        'drop-shadow': [tn],
        ease: ['in', 'out', 'in-out'],
        font: [W1],
        'font-weight': ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
        'inset-shadow': [tn],
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
        perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
        radius: [tn],
        shadow: [tn],
        spacing: ['px', ye],
        text: [tn],
        'text-shadow': [tn],
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      },
      classGroups: {
        aspect: [{ aspect: ['auto', 'square', cr, Y, X, v] }],
        container: ['container'],
        columns: [{ columns: [ye, Y, X, a] }],
        'break-after': [{ 'break-after': x() }],
        'break-before': [{ 'break-before': x() }],
        'break-inside': [{ 'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column'] }],
        'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
        box: [{ box: ['border', 'content'] }],
        display: [
          'block',
          'inline-block',
          'inline',
          'flex',
          'inline-flex',
          'table',
          'inline-table',
          'table-caption',
          'table-cell',
          'table-column',
          'table-column-group',
          'table-footer-group',
          'table-header-group',
          'table-row-group',
          'table-row',
          'flow-root',
          'grid',
          'inline-grid',
          'contents',
          'list-item',
          'hidden',
        ],
        sr: ['sr-only', 'not-sr-only'],
        float: [{ float: ['right', 'left', 'none', 'start', 'end'] }],
        clear: [{ clear: ['left', 'right', 'both', 'none', 'start', 'end'] }],
        isolation: ['isolate', 'isolation-auto'],
        'object-fit': [{ object: ['contain', 'cover', 'fill', 'none', 'scale-down'] }],
        'object-position': [{ object: C() }],
        overflow: [{ overflow: A() }],
        'overflow-x': [{ 'overflow-x': A() }],
        'overflow-y': [{ 'overflow-y': A() }],
        overscroll: [{ overscroll: S() }],
        'overscroll-x': [{ 'overscroll-x': S() }],
        'overscroll-y': [{ 'overscroll-y': S() }],
        position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        inset: [{ inset: I() }],
        'inset-x': [{ 'inset-x': I() }],
        'inset-y': [{ 'inset-y': I() }],
        start: [{ start: I() }],
        end: [{ end: I() }],
        top: [{ top: I() }],
        right: [{ right: I() }],
        bottom: [{ bottom: I() }],
        left: [{ left: I() }],
        visibility: ['visible', 'invisible', 'collapse'],
        z: [{ z: [pn, 'auto', X, Y] }],
        basis: [{ basis: [cr, 'full', 'auto', a, ...R()] }],
        'flex-direction': [{ flex: ['row', 'row-reverse', 'col', 'col-reverse'] }],
        'flex-wrap': [{ flex: ['nowrap', 'wrap', 'wrap-reverse'] }],
        flex: [{ flex: [ye, cr, 'auto', 'initial', 'none', Y] }],
        grow: [{ grow: ['', ye, X, Y] }],
        shrink: [{ shrink: ['', ye, X, Y] }],
        order: [{ order: [pn, 'first', 'last', 'none', X, Y] }],
        'grid-cols': [{ 'grid-cols': N() }],
        'col-start-end': [{ col: G() }],
        'col-start': [{ 'col-start': oe() }],
        'col-end': [{ 'col-end': oe() }],
        'grid-rows': [{ 'grid-rows': N() }],
        'row-start-end': [{ row: G() }],
        'row-start': [{ 'row-start': oe() }],
        'row-end': [{ 'row-end': oe() }],
        'grid-flow': [{ 'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense'] }],
        'auto-cols': [{ 'auto-cols': te() }],
        'auto-rows': [{ 'auto-rows': te() }],
        gap: [{ gap: R() }],
        'gap-x': [{ 'gap-x': R() }],
        'gap-y': [{ 'gap-y': R() }],
        'justify-content': [{ justify: [...L(), 'normal'] }],
        'justify-items': [{ 'justify-items': [...F(), 'normal'] }],
        'justify-self': [{ 'justify-self': ['auto', ...F()] }],
        'align-content': [{ content: ['normal', ...L()] }],
        'align-items': [{ items: [...F(), { baseline: ['', 'last'] }] }],
        'align-self': [{ self: ['auto', ...F(), { baseline: ['', 'last'] }] }],
        'place-content': [{ 'place-content': L() }],
        'place-items': [{ 'place-items': [...F(), 'baseline'] }],
        'place-self': [{ 'place-self': ['auto', ...F()] }],
        p: [{ p: R() }],
        px: [{ px: R() }],
        py: [{ py: R() }],
        ps: [{ ps: R() }],
        pe: [{ pe: R() }],
        pt: [{ pt: R() }],
        pr: [{ pr: R() }],
        pb: [{ pb: R() }],
        pl: [{ pl: R() }],
        m: [{ m: O() }],
        mx: [{ mx: O() }],
        my: [{ my: O() }],
        ms: [{ ms: O() }],
        me: [{ me: O() }],
        mt: [{ mt: O() }],
        mr: [{ mr: O() }],
        mb: [{ mb: O() }],
        ml: [{ ml: O() }],
        'space-x': [{ 'space-x': R() }],
        'space-x-reverse': ['space-x-reverse'],
        'space-y': [{ 'space-y': R() }],
        'space-y-reverse': ['space-y-reverse'],
        size: [{ size: D() }],
        w: [{ w: [a, 'screen', ...D()] }],
        'min-w': [{ 'min-w': [a, 'screen', 'none', ...D()] }],
        'max-w': [{ 'max-w': [a, 'screen', 'none', 'prose', { screen: [s] }, ...D()] }],
        h: [{ h: ['screen', 'lh', ...D()] }],
        'min-h': [{ 'min-h': ['screen', 'lh', 'none', ...D()] }],
        'max-h': [{ 'max-h': ['screen', 'lh', ...D()] }],
        'font-size': [{ text: ['base', n, oo, jn] }],
        'font-smoothing': ['antialiased', 'subpixel-antialiased'],
        'font-style': ['italic', 'not-italic'],
        'font-weight': [{ font: [r, X, da] }],
        'font-stretch': [
          {
            'font-stretch': [
              'ultra-condensed',
              'extra-condensed',
              'condensed',
              'semi-condensed',
              'normal',
              'semi-expanded',
              'expanded',
              'extra-expanded',
              'ultra-expanded',
              ua,
              Y,
            ],
          },
        ],
        'font-family': [{ font: [Z1, Y, t] }],
        'fvn-normal': ['normal-nums'],
        'fvn-ordinal': ['ordinal'],
        'fvn-slashed-zero': ['slashed-zero'],
        'fvn-figure': ['lining-nums', 'oldstyle-nums'],
        'fvn-spacing': ['proportional-nums', 'tabular-nums'],
        'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
        tracking: [{ tracking: [o, X, Y] }],
        'line-clamp': [{ 'line-clamp': [ye, 'none', X, da] }],
        leading: [{ leading: [i, ...R()] }],
        'list-image': [{ 'list-image': ['none', X, Y] }],
        'list-style-position': [{ list: ['inside', 'outside'] }],
        'list-style-type': [{ list: ['disc', 'decimal', 'none', X, Y] }],
        'text-alignment': [{ text: ['left', 'center', 'right', 'justify', 'start', 'end'] }],
        'placeholder-color': [{ placeholder: _() }],
        'text-color': [{ text: _() }],
        'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
        'text-decoration-style': [{ decoration: [...J(), 'wavy'] }],
        'text-decoration-thickness': [{ decoration: [ye, 'from-font', 'auto', X, jn] }],
        'text-decoration-color': [{ decoration: _() }],
        'underline-offset': [{ 'underline-offset': [ye, 'auto', X, Y] }],
        'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
        'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
        'text-wrap': [{ text: ['wrap', 'nowrap', 'balance', 'pretty'] }],
        indent: [{ indent: R() }],
        'vertical-align': [
          { align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', X, Y] },
        ],
        whitespace: [{ whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'] }],
        break: [{ break: ['normal', 'words', 'all', 'keep'] }],
        wrap: [{ wrap: ['break-word', 'anywhere', 'normal'] }],
        hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
        content: [{ content: ['none', X, Y] }],
        'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
        'bg-clip': [{ 'bg-clip': ['border', 'padding', 'content', 'text'] }],
        'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
        'bg-position': [{ bg: k() }],
        'bg-repeat': [{ bg: W() }],
        'bg-size': [{ bg: q() }],
        'bg-image': [
          {
            bg: [
              'none',
              {
                linear: [{ to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'] }, pn, X, Y],
                radial: ['', X, Y],
                conic: [pn, X, Y],
              },
              Y1,
              G1,
            ],
          },
        ],
        'bg-color': [{ bg: _() }],
        'gradient-from-pos': [{ from: ae() }],
        'gradient-via-pos': [{ via: ae() }],
        'gradient-to-pos': [{ to: ae() }],
        'gradient-from': [{ from: _() }],
        'gradient-via': [{ via: _() }],
        'gradient-to': [{ to: _() }],
        rounded: [{ rounded: B() }],
        'rounded-s': [{ 'rounded-s': B() }],
        'rounded-e': [{ 'rounded-e': B() }],
        'rounded-t': [{ 'rounded-t': B() }],
        'rounded-r': [{ 'rounded-r': B() }],
        'rounded-b': [{ 'rounded-b': B() }],
        'rounded-l': [{ 'rounded-l': B() }],
        'rounded-ss': [{ 'rounded-ss': B() }],
        'rounded-se': [{ 'rounded-se': B() }],
        'rounded-ee': [{ 'rounded-ee': B() }],
        'rounded-es': [{ 'rounded-es': B() }],
        'rounded-tl': [{ 'rounded-tl': B() }],
        'rounded-tr': [{ 'rounded-tr': B() }],
        'rounded-br': [{ 'rounded-br': B() }],
        'rounded-bl': [{ 'rounded-bl': B() }],
        'border-w': [{ border: Z() }],
        'border-w-x': [{ 'border-x': Z() }],
        'border-w-y': [{ 'border-y': Z() }],
        'border-w-s': [{ 'border-s': Z() }],
        'border-w-e': [{ 'border-e': Z() }],
        'border-w-t': [{ 'border-t': Z() }],
        'border-w-r': [{ 'border-r': Z() }],
        'border-w-b': [{ 'border-b': Z() }],
        'border-w-l': [{ 'border-l': Z() }],
        'divide-x': [{ 'divide-x': Z() }],
        'divide-x-reverse': ['divide-x-reverse'],
        'divide-y': [{ 'divide-y': Z() }],
        'divide-y-reverse': ['divide-y-reverse'],
        'border-style': [{ border: [...J(), 'hidden', 'none'] }],
        'divide-style': [{ divide: [...J(), 'hidden', 'none'] }],
        'border-color': [{ border: _() }],
        'border-color-x': [{ 'border-x': _() }],
        'border-color-y': [{ 'border-y': _() }],
        'border-color-s': [{ 'border-s': _() }],
        'border-color-e': [{ 'border-e': _() }],
        'border-color-t': [{ 'border-t': _() }],
        'border-color-r': [{ 'border-r': _() }],
        'border-color-b': [{ 'border-b': _() }],
        'border-color-l': [{ 'border-l': _() }],
        'divide-color': [{ divide: _() }],
        'outline-style': [{ outline: [...J(), 'none', 'hidden'] }],
        'outline-offset': [{ 'outline-offset': [ye, X, Y] }],
        'outline-w': [{ outline: ['', ye, oo, jn] }],
        'outline-color': [{ outline: _() }],
        shadow: [{ shadow: ['', 'none', u, ai, si] }],
        'shadow-color': [{ shadow: _() }],
        'inset-shadow': [{ 'inset-shadow': ['none', d, ai, si] }],
        'inset-shadow-color': [{ 'inset-shadow': _() }],
        'ring-w': [{ ring: Z() }],
        'ring-w-inset': ['ring-inset'],
        'ring-color': [{ ring: _() }],
        'ring-offset-w': [{ 'ring-offset': [ye, jn] }],
        'ring-offset-color': [{ 'ring-offset': _() }],
        'inset-ring-w': [{ 'inset-ring': Z() }],
        'inset-ring-color': [{ 'inset-ring': _() }],
        'text-shadow': [{ 'text-shadow': ['none', h, ai, si] }],
        'text-shadow-color': [{ 'text-shadow': _() }],
        opacity: [{ opacity: [ye, X, Y] }],
        'mix-blend': [{ 'mix-blend': [...he(), 'plus-darker', 'plus-lighter'] }],
        'bg-blend': [{ 'bg-blend': he() }],
        'mask-clip': [{ 'mask-clip': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] }, 'mask-no-clip'],
        'mask-composite': [{ mask: ['add', 'subtract', 'intersect', 'exclude'] }],
        'mask-image-linear-pos': [{ 'mask-linear': [ye] }],
        'mask-image-linear-from-pos': [{ 'mask-linear-from': z() }],
        'mask-image-linear-to-pos': [{ 'mask-linear-to': z() }],
        'mask-image-linear-from-color': [{ 'mask-linear-from': _() }],
        'mask-image-linear-to-color': [{ 'mask-linear-to': _() }],
        'mask-image-t-from-pos': [{ 'mask-t-from': z() }],
        'mask-image-t-to-pos': [{ 'mask-t-to': z() }],
        'mask-image-t-from-color': [{ 'mask-t-from': _() }],
        'mask-image-t-to-color': [{ 'mask-t-to': _() }],
        'mask-image-r-from-pos': [{ 'mask-r-from': z() }],
        'mask-image-r-to-pos': [{ 'mask-r-to': z() }],
        'mask-image-r-from-color': [{ 'mask-r-from': _() }],
        'mask-image-r-to-color': [{ 'mask-r-to': _() }],
        'mask-image-b-from-pos': [{ 'mask-b-from': z() }],
        'mask-image-b-to-pos': [{ 'mask-b-to': z() }],
        'mask-image-b-from-color': [{ 'mask-b-from': _() }],
        'mask-image-b-to-color': [{ 'mask-b-to': _() }],
        'mask-image-l-from-pos': [{ 'mask-l-from': z() }],
        'mask-image-l-to-pos': [{ 'mask-l-to': z() }],
        'mask-image-l-from-color': [{ 'mask-l-from': _() }],
        'mask-image-l-to-color': [{ 'mask-l-to': _() }],
        'mask-image-x-from-pos': [{ 'mask-x-from': z() }],
        'mask-image-x-to-pos': [{ 'mask-x-to': z() }],
        'mask-image-x-from-color': [{ 'mask-x-from': _() }],
        'mask-image-x-to-color': [{ 'mask-x-to': _() }],
        'mask-image-y-from-pos': [{ 'mask-y-from': z() }],
        'mask-image-y-to-pos': [{ 'mask-y-to': z() }],
        'mask-image-y-from-color': [{ 'mask-y-from': _() }],
        'mask-image-y-to-color': [{ 'mask-y-to': _() }],
        'mask-image-radial': [{ 'mask-radial': [X, Y] }],
        'mask-image-radial-from-pos': [{ 'mask-radial-from': z() }],
        'mask-image-radial-to-pos': [{ 'mask-radial-to': z() }],
        'mask-image-radial-from-color': [{ 'mask-radial-from': _() }],
        'mask-image-radial-to-color': [{ 'mask-radial-to': _() }],
        'mask-image-radial-shape': [{ 'mask-radial': ['circle', 'ellipse'] }],
        'mask-image-radial-size': [{ 'mask-radial': [{ closest: ['side', 'corner'], farthest: ['side', 'corner'] }] }],
        'mask-image-radial-pos': [{ 'mask-radial-at': E() }],
        'mask-image-conic-pos': [{ 'mask-conic': [ye] }],
        'mask-image-conic-from-pos': [{ 'mask-conic-from': z() }],
        'mask-image-conic-to-pos': [{ 'mask-conic-to': z() }],
        'mask-image-conic-from-color': [{ 'mask-conic-from': _() }],
        'mask-image-conic-to-color': [{ 'mask-conic-to': _() }],
        'mask-mode': [{ mask: ['alpha', 'luminance', 'match'] }],
        'mask-origin': [{ 'mask-origin': ['border', 'padding', 'content', 'fill', 'stroke', 'view'] }],
        'mask-position': [{ mask: k() }],
        'mask-repeat': [{ mask: W() }],
        'mask-size': [{ mask: q() }],
        'mask-type': [{ 'mask-type': ['alpha', 'luminance'] }],
        'mask-image': [{ mask: ['none', X, Y] }],
        filter: [{ filter: ['', 'none', X, Y] }],
        blur: [{ blur: ee() }],
        brightness: [{ brightness: [ye, X, Y] }],
        contrast: [{ contrast: [ye, X, Y] }],
        'drop-shadow': [{ 'drop-shadow': ['', 'none', p, ai, si] }],
        'drop-shadow-color': [{ 'drop-shadow': _() }],
        grayscale: [{ grayscale: ['', ye, X, Y] }],
        'hue-rotate': [{ 'hue-rotate': [ye, X, Y] }],
        invert: [{ invert: ['', ye, X, Y] }],
        saturate: [{ saturate: [ye, X, Y] }],
        sepia: [{ sepia: ['', ye, X, Y] }],
        'backdrop-filter': [{ 'backdrop-filter': ['', 'none', X, Y] }],
        'backdrop-blur': [{ 'backdrop-blur': ee() }],
        'backdrop-brightness': [{ 'backdrop-brightness': [ye, X, Y] }],
        'backdrop-contrast': [{ 'backdrop-contrast': [ye, X, Y] }],
        'backdrop-grayscale': [{ 'backdrop-grayscale': ['', ye, X, Y] }],
        'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [ye, X, Y] }],
        'backdrop-invert': [{ 'backdrop-invert': ['', ye, X, Y] }],
        'backdrop-opacity': [{ 'backdrop-opacity': [ye, X, Y] }],
        'backdrop-saturate': [{ 'backdrop-saturate': [ye, X, Y] }],
        'backdrop-sepia': [{ 'backdrop-sepia': ['', ye, X, Y] }],
        'border-collapse': [{ border: ['collapse', 'separate'] }],
        'border-spacing': [{ 'border-spacing': R() }],
        'border-spacing-x': [{ 'border-spacing-x': R() }],
        'border-spacing-y': [{ 'border-spacing-y': R() }],
        'table-layout': [{ table: ['auto', 'fixed'] }],
        caption: [{ caption: ['top', 'bottom'] }],
        transition: [{ transition: ['', 'all', 'colors', 'opacity', 'shadow', 'transform', 'none', X, Y] }],
        'transition-behavior': [{ transition: ['normal', 'discrete'] }],
        duration: [{ duration: [ye, 'initial', X, Y] }],
        ease: [{ ease: ['linear', 'initial', w, X, Y] }],
        delay: [{ delay: [ye, X, Y] }],
        animate: [{ animate: ['none', b, X, Y] }],
        backface: [{ backface: ['hidden', 'visible'] }],
        perspective: [{ perspective: [y, X, Y] }],
        'perspective-origin': [{ 'perspective-origin': C() }],
        rotate: [{ rotate: Ce() }],
        'rotate-x': [{ 'rotate-x': Ce() }],
        'rotate-y': [{ 'rotate-y': Ce() }],
        'rotate-z': [{ 'rotate-z': Ce() }],
        scale: [{ scale: be() }],
        'scale-x': [{ 'scale-x': be() }],
        'scale-y': [{ 'scale-y': be() }],
        'scale-z': [{ 'scale-z': be() }],
        'scale-3d': ['scale-3d'],
        skew: [{ skew: le() }],
        'skew-x': [{ 'skew-x': le() }],
        'skew-y': [{ 'skew-y': le() }],
        transform: [{ transform: [X, Y, '', 'none', 'gpu', 'cpu'] }],
        'transform-origin': [{ origin: C() }],
        'transform-style': [{ transform: ['3d', 'flat'] }],
        translate: [{ translate: ge() }],
        'translate-x': [{ 'translate-x': ge() }],
        'translate-y': [{ 'translate-y': ge() }],
        'translate-z': [{ 'translate-z': ge() }],
        'translate-none': ['translate-none'],
        accent: [{ accent: _() }],
        appearance: [{ appearance: ['none', 'auto'] }],
        'caret-color': [{ caret: _() }],
        'color-scheme': [{ scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light'] }],
        cursor: [
          {
            cursor: [
              'auto',
              'default',
              'pointer',
              'wait',
              'text',
              'move',
              'help',
              'not-allowed',
              'none',
              'context-menu',
              'progress',
              'cell',
              'crosshair',
              'vertical-text',
              'alias',
              'copy',
              'no-drop',
              'grab',
              'grabbing',
              'all-scroll',
              'col-resize',
              'row-resize',
              'n-resize',
              'e-resize',
              's-resize',
              'w-resize',
              'ne-resize',
              'nw-resize',
              'se-resize',
              'sw-resize',
              'ew-resize',
              'ns-resize',
              'nesw-resize',
              'nwse-resize',
              'zoom-in',
              'zoom-out',
              X,
              Y,
            ],
          },
        ],
        'field-sizing': [{ 'field-sizing': ['fixed', 'content'] }],
        'pointer-events': [{ 'pointer-events': ['auto', 'none'] }],
        resize: [{ resize: ['none', '', 'y', 'x'] }],
        'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
        'scroll-m': [{ 'scroll-m': R() }],
        'scroll-mx': [{ 'scroll-mx': R() }],
        'scroll-my': [{ 'scroll-my': R() }],
        'scroll-ms': [{ 'scroll-ms': R() }],
        'scroll-me': [{ 'scroll-me': R() }],
        'scroll-mt': [{ 'scroll-mt': R() }],
        'scroll-mr': [{ 'scroll-mr': R() }],
        'scroll-mb': [{ 'scroll-mb': R() }],
        'scroll-ml': [{ 'scroll-ml': R() }],
        'scroll-p': [{ 'scroll-p': R() }],
        'scroll-px': [{ 'scroll-px': R() }],
        'scroll-py': [{ 'scroll-py': R() }],
        'scroll-ps': [{ 'scroll-ps': R() }],
        'scroll-pe': [{ 'scroll-pe': R() }],
        'scroll-pt': [{ 'scroll-pt': R() }],
        'scroll-pr': [{ 'scroll-pr': R() }],
        'scroll-pb': [{ 'scroll-pb': R() }],
        'scroll-pl': [{ 'scroll-pl': R() }],
        'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
        'snap-stop': [{ snap: ['normal', 'always'] }],
        'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
        'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
        touch: [{ touch: ['auto', 'none', 'manipulation'] }],
        'touch-x': [{ 'touch-pan': ['x', 'left', 'right'] }],
        'touch-y': [{ 'touch-pan': ['y', 'up', 'down'] }],
        'touch-pz': ['touch-pinch-zoom'],
        select: [{ select: ['none', 'text', 'all', 'auto'] }],
        'will-change': [{ 'will-change': ['auto', 'scroll', 'contents', 'transform', X, Y] }],
        fill: [{ fill: ['none', ..._()] }],
        'stroke-w': [{ stroke: [ye, oo, jn, da] }],
        stroke: [{ stroke: ['none', ..._()] }],
        'forced-color-adjust': [{ 'forced-color-adjust': ['auto', 'none'] }],
      },
      conflictingClassGroups: {
        overflow: ['overflow-x', 'overflow-y'],
        overscroll: ['overscroll-x', 'overscroll-y'],
        inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
        'inset-x': ['right', 'left'],
        'inset-y': ['top', 'bottom'],
        flex: ['basis', 'grow', 'shrink'],
        gap: ['gap-x', 'gap-y'],
        p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
        px: ['pr', 'pl'],
        py: ['pt', 'pb'],
        m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
        mx: ['mr', 'ml'],
        my: ['mt', 'mb'],
        size: ['w', 'h'],
        'font-size': ['leading'],
        'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
        'fvn-ordinal': ['fvn-normal'],
        'fvn-slashed-zero': ['fvn-normal'],
        'fvn-figure': ['fvn-normal'],
        'fvn-spacing': ['fvn-normal'],
        'fvn-fraction': ['fvn-normal'],
        'line-clamp': ['display', 'overflow'],
        rounded: [
          'rounded-s',
          'rounded-e',
          'rounded-t',
          'rounded-r',
          'rounded-b',
          'rounded-l',
          'rounded-ss',
          'rounded-se',
          'rounded-ee',
          'rounded-es',
          'rounded-tl',
          'rounded-tr',
          'rounded-br',
          'rounded-bl',
        ],
        'rounded-s': ['rounded-ss', 'rounded-es'],
        'rounded-e': ['rounded-se', 'rounded-ee'],
        'rounded-t': ['rounded-tl', 'rounded-tr'],
        'rounded-r': ['rounded-tr', 'rounded-br'],
        'rounded-b': ['rounded-br', 'rounded-bl'],
        'rounded-l': ['rounded-tl', 'rounded-bl'],
        'border-spacing': ['border-spacing-x', 'border-spacing-y'],
        'border-w': [
          'border-w-x',
          'border-w-y',
          'border-w-s',
          'border-w-e',
          'border-w-t',
          'border-w-r',
          'border-w-b',
          'border-w-l',
        ],
        'border-w-x': ['border-w-r', 'border-w-l'],
        'border-w-y': ['border-w-t', 'border-w-b'],
        'border-color': [
          'border-color-x',
          'border-color-y',
          'border-color-s',
          'border-color-e',
          'border-color-t',
          'border-color-r',
          'border-color-b',
          'border-color-l',
        ],
        'border-color-x': ['border-color-r', 'border-color-l'],
        'border-color-y': ['border-color-t', 'border-color-b'],
        translate: ['translate-x', 'translate-y', 'translate-none'],
        'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
        'scroll-m': [
          'scroll-mx',
          'scroll-my',
          'scroll-ms',
          'scroll-me',
          'scroll-mt',
          'scroll-mr',
          'scroll-mb',
          'scroll-ml',
        ],
        'scroll-mx': ['scroll-mr', 'scroll-ml'],
        'scroll-my': ['scroll-mt', 'scroll-mb'],
        'scroll-p': [
          'scroll-px',
          'scroll-py',
          'scroll-ps',
          'scroll-pe',
          'scroll-pt',
          'scroll-pr',
          'scroll-pb',
          'scroll-pl',
        ],
        'scroll-px': ['scroll-pr', 'scroll-pl'],
        'scroll-py': ['scroll-pt', 'scroll-pb'],
        touch: ['touch-x', 'touch-y', 'touch-pz'],
        'touch-x': ['touch'],
        'touch-y': ['touch'],
        'touch-pz': ['touch'],
      },
      conflictingClassGroupModifiers: { 'font-size': ['leading'] },
      orderSensitiveModifiers: [
        '*',
        '**',
        'after',
        'backdrop',
        'before',
        'details-content',
        'file',
        'first-letter',
        'first-line',
        'marker',
        'placeholder',
        'selection',
      ],
    }
  },
  J1 = (e, { cacheSize: t, prefix: n, experimentalParseClassName: r, extend: o = {}, override: i = {} }) => (
    lo(e, 'cacheSize', t),
    lo(e, 'prefix', n),
    lo(e, 'experimentalParseClassName', r),
    li(e.theme, i.theme),
    li(e.classGroups, i.classGroups),
    li(e.conflictingClassGroups, i.conflictingClassGroups),
    li(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers),
    lo(e, 'orderSensitiveModifiers', i.orderSensitiveModifiers),
    ci(e.theme, o.theme),
    ci(e.classGroups, o.classGroups),
    ci(e.conflictingClassGroups, o.conflictingClassGroups),
    ci(e.conflictingClassGroupModifiers, o.conflictingClassGroupModifiers),
    Lp(e, o, 'orderSensitiveModifiers'),
    e
  ),
  lo = (e, t, n) => {
    n !== void 0 && (e[t] = n)
  },
  li = (e, t) => {
    if (t) for (const n in t) lo(e, n, t[n])
  },
  ci = (e, t) => {
    if (t) for (const n in t) Lp(e, t, n)
  },
  Lp = (e, t, n) => {
    const r = t[n]
    r !== void 0 && (e[n] = e[n] ? e[n].concat(r) : r)
  },
  Q1 = (e, ...t) => (typeof e == 'function' ? Xa(qa, e, ...t) : Xa(() => J1(qa(), e), ...t)),
  sc = Xa(qa),
  Re = (...e) => sc(oc(e))
function kF(...e) {
  return sc(oc(...e))
}
const eS = ['outline outline-offset-2 outline-0 focus-visible:outline-2', 'outline-blue-500 dark:outline-blue-500'],
  tS = { type: 'spring', duration: 0.4, bounce: 0 },
  nS = { type: 'spring', duration: 0.4, bounce: 0.15 },
  rS = { type: 'spring', duration: 0.4, bounce: 0.3 }
class oS {
  smooth = tS
  snappy = nS
  bouncy = rS
}
class iS {
  presets = new oS()
  smooth(t = 0.4, n = 0) {
    return { type: 'spring', duration: t, bounce: n }
  }
  snappy(t = 0.4, n = 0) {
    return { type: 'spring', duration: t, bounce: 0.15 + n }
  }
  bouncy(t = 0.4, n = 0) {
    return { type: 'spring', duration: t, bounce: 0.3 + n }
  }
}
const Fo = new iS(),
  Mr = {}
function jp(e) {
  return 'init' in e
}
function Ja(e) {
  return !!e.write
}
function kd(e) {
  return 'v' in e || 'e' in e
}
function Vi(e) {
  if ('e' in e) throw e.e
  if ((Mr ? 'production' : void 0) !== 'production' && !('v' in e))
    throw new Error('[Bug] atom state is not initialized')
  return e.v
}
const Bi = new WeakMap()
function $p(e) {
  var t
  return Ui(e) && !!((t = Bi.get(e)) != null && t[0])
}
function sS(e) {
  const t = Bi.get(e)
  t?.[0] && ((t[0] = !1), t[1].forEach((n) => n()))
}
function Qa(e, t) {
  let n = Bi.get(e)
  if (!n) {
    ;((n = [!0, new Set()]), Bi.set(e, n))
    const r = () => {
      n[0] = !1
    }
    e.then(r, r)
  }
  n[1].add(t)
}
function Ui(e) {
  return typeof e?.then == 'function'
}
function Fp(e, t, n) {
  if (!n.p.has(e)) {
    n.p.add(e)
    const r = () => n.p.delete(e)
    t.then(r, r)
  }
}
function zp(e, t, n) {
  var r
  const o = new Set()
  for (const i of ((r = n.get(e)) == null ? void 0 : r.t) || []) n.has(i) && o.add(i)
  for (const i of t.p) o.add(i)
  return o
}
const aS = (e, t, ...n) => t.read(...n),
  lS = (e, t, ...n) => t.write(...n),
  cS = (e, t) => {
    var n
    return (n = t.unstable_onInit) == null ? void 0 : n.call(t, e)
  },
  uS = (e, t, n) => {
    var r
    return (r = t.onMount) == null ? void 0 : r.call(t, n)
  },
  dS = (e, t) => {
    const n = Je(e),
      r = n[0],
      o = n[9]
    if ((Mr ? 'production' : void 0) !== 'production' && !t) throw new Error('Atom is undefined or null')
    let i = r.get(t)
    return (i || ((i = { d: new Map(), p: new Set(), n: 0 }), r.set(t, i), o?.(e, t)), i)
  },
  fS = (e) => {
    const t = Je(e),
      n = t[1],
      r = t[3],
      o = t[4],
      i = t[5],
      s = t[6],
      a = t[13],
      l = [],
      c = (u) => {
        try {
          u()
        } catch (d) {
          l.push(d)
        }
      }
    do {
      s.f && c(s.f)
      const u = new Set(),
        d = u.add.bind(u)
      ;(r.forEach((h) => {
        var p
        return (p = n.get(h)) == null ? void 0 : p.l.forEach(d)
      }),
        r.clear(),
        i.forEach(d),
        i.clear(),
        o.forEach(d),
        o.clear(),
        u.forEach(c),
        r.size && a(e))
    } while (r.size || i.size || o.size)
    if (l.length) throw new AggregateError(l)
  },
  hS = (e) => {
    const t = Je(e),
      n = t[1],
      r = t[2],
      o = t[3],
      i = t[11],
      s = t[14],
      a = t[17],
      l = [],
      c = new WeakSet(),
      u = new WeakSet(),
      d = Array.from(o)
    for (; d.length; ) {
      const h = d[d.length - 1],
        p = i(e, h)
      if (u.has(h)) {
        d.pop()
        continue
      }
      if (c.has(h)) {
        if (r.get(h) === p.n) l.push([h, p])
        else if ((Mr ? 'production' : void 0) !== 'production' && r.has(h))
          throw new Error('[Bug] invalidated atom exists')
        ;(u.add(h), d.pop())
        continue
      }
      c.add(h)
      for (const m of zp(h, p, n)) c.has(m) || d.push(m)
    }
    for (let h = l.length - 1; h >= 0; --h) {
      const [p, m] = l[h]
      let y = !1
      for (const v of m.d.keys())
        if (v !== p && o.has(v)) {
          y = !0
          break
        }
      ;(y && (s(e, p), a(e, p)), r.delete(p))
    }
  },
  pS = (e, t) => {
    var n, r
    const o = Je(e),
      i = o[1],
      s = o[2],
      a = o[3],
      l = o[6],
      c = o[7],
      u = o[11],
      d = o[12],
      h = o[13],
      p = o[14],
      m = o[16],
      y = o[17],
      v = u(e, t)
    if (kd(v) && ((i.has(t) && s.get(t) !== v.n) || Array.from(v.d).every(([R, I]) => p(e, R).n === I))) return v
    v.d.clear()
    let w = !0
    function b() {
      i.has(t) && (y(e, t), h(e), d(e))
    }
    function x(R) {
      var I
      if (R === t) {
        const G = u(e, R)
        if (!kd(G))
          if (jp(R)) Wi(e, R, R.init)
          else throw new Error('no atom init')
        return Vi(G)
      }
      const N = p(e, R)
      try {
        return Vi(N)
      } finally {
        ;(v.d.set(R, N.n), $p(v.v) && Fp(t, v.v, N), (I = i.get(R)) == null || I.t.add(t), w || b())
      }
    }
    let E, C
    const A = {
        get signal() {
          return (E || (E = new AbortController()), E.signal)
        },
        get setSelf() {
          return (
            (Mr ? 'production' : void 0) !== 'production' &&
              !Ja(t) &&
              console.warn('setSelf function cannot be used with read-only atom'),
            !C &&
              Ja(t) &&
              (C = (...R) => {
                if (
                  ((Mr ? 'production' : void 0) !== 'production' &&
                    w &&
                    console.warn('setSelf function cannot be called in sync'),
                  !w)
                )
                  try {
                    return m(e, t, ...R)
                  } finally {
                    ;(h(e), d(e))
                  }
              }),
            C
          )
        },
      },
      S = v.n
    try {
      const R = c(e, t, x, A)
      return (Wi(e, t, R), Ui(R) && (Qa(R, () => E?.abort()), R.then(b, b)), (n = l.r) == null || n.call(l, t), v)
    } catch (R) {
      return (delete v.v, (v.e = R), ++v.n, v)
    } finally {
      ;((w = !1), S !== v.n && s.get(t) === S && (s.set(t, v.n), a.add(t), (r = l.c) == null || r.call(l, t)))
    }
  },
  mS = (e, t) => {
    const n = Je(e),
      r = n[1],
      o = n[2],
      i = n[11],
      s = [t]
    for (; s.length; ) {
      const a = s.pop(),
        l = i(e, a)
      for (const c of zp(a, l, r)) {
        const u = i(e, c)
        ;(o.set(c, u.n), s.push(c))
      }
    }
  },
  Vp = (e, t, ...n) => {
    const r = Je(e),
      o = r[3],
      i = r[6],
      s = r[8],
      a = r[11],
      l = r[12],
      c = r[13],
      u = r[14],
      d = r[15],
      h = r[17]
    let p = !0
    const m = (v) => Vi(u(e, v)),
      y = (v, ...w) => {
        var b
        const x = a(e, v)
        try {
          if (v === t) {
            if (!jp(v)) throw new Error('atom not writable')
            const E = x.n,
              C = w[0]
            ;(Wi(e, v, C), h(e, v), E !== x.n && (o.add(v), (b = i.c) == null || b.call(i, v), d(e, v)))
            return
          } else return Vp(e, v, ...w)
        } finally {
          p || (c(e), l(e))
        }
      }
    try {
      return s(e, t, m, y, ...n)
    } finally {
      p = !1
    }
  },
  gS = (e, t) => {
    var n
    const r = Je(e),
      o = r[1],
      i = r[3],
      s = r[6],
      a = r[11],
      l = r[15],
      c = r[18],
      u = r[19],
      d = a(e, t),
      h = o.get(t)
    if (h && !$p(d.v)) {
      for (const [p, m] of d.d)
        if (!h.d.has(p)) {
          const y = a(e, p)
          ;(c(e, p).t.add(t), h.d.add(p), m !== y.n && (i.add(p), (n = s.c) == null || n.call(s, p), l(e, p)))
        }
      for (const p of h.d || [])
        if (!d.d.has(p)) {
          h.d.delete(p)
          const m = u(e, p)
          m?.t.delete(t)
        }
    }
  },
  Bp = (e, t) => {
    var n
    const r = Je(e),
      o = r[1],
      i = r[4],
      s = r[6],
      a = r[10],
      l = r[11],
      c = r[12],
      u = r[13],
      d = r[14],
      h = r[16],
      p = l(e, t)
    let m = o.get(t)
    if (!m) {
      d(e, t)
      for (const y of p.d.keys()) Bp(e, y).t.add(t)
      if (
        ((m = { l: new Set(), d: new Set(p.d.keys()), t: new Set() }),
        o.set(t, m),
        (n = s.m) == null || n.call(s, t),
        Ja(t))
      ) {
        const y = () => {
          let v = !0
          const w = (...b) => {
            try {
              return h(e, t, ...b)
            } finally {
              v || (u(e), c(e))
            }
          }
          try {
            const b = a(e, t, w)
            b &&
              (m.u = () => {
                v = !0
                try {
                  b()
                } finally {
                  v = !1
                }
              })
          } finally {
            v = !1
          }
        }
        i.add(y)
      }
    }
    return m
  },
  yS = (e, t) => {
    var n
    const r = Je(e),
      o = r[1],
      i = r[5],
      s = r[6],
      a = r[11],
      l = r[19],
      c = a(e, t)
    let u = o.get(t)
    if (
      u &&
      !u.l.size &&
      !Array.from(u.t).some((d) => {
        var h
        return (h = o.get(d)) == null ? void 0 : h.d.has(t)
      })
    ) {
      ;(u.u && i.add(u.u), (u = void 0), o.delete(t), (n = s.u) == null || n.call(s, t))
      for (const d of c.d.keys()) {
        const h = l(e, d)
        h?.t.delete(t)
      }
      return
    }
    return u
  },
  Wi = (e, t, n) => {
    const r = Je(e)[11],
      o = r(e, t),
      i = 'v' in o,
      s = o.v
    if (Ui(n)) for (const a of o.d.keys()) Fp(t, n, r(e, a))
    ;((o.v = n), delete o.e, (!i || !Object.is(s, o.v)) && (++o.n, Ui(s) && sS(s)))
  },
  vS = (e, t) => {
    const n = Je(e)[14]
    return Vi(n(e, t))
  },
  bS = (e, t, ...n) => {
    const r = Je(e),
      o = r[12],
      i = r[13],
      s = r[16]
    try {
      return s(e, t, ...n)
    } finally {
      ;(i(e), o(e))
    }
  },
  wS = (e, t, n) => {
    const r = Je(e),
      o = r[12],
      i = r[18],
      s = r[19],
      l = i(e, t).l
    return (
      l.add(n),
      o(e),
      () => {
        ;(l.delete(n), s(e, t), o(e))
      }
    )
  },
  Up = new WeakMap(),
  Je = (e) => {
    const t = Up.get(e)
    if ((Mr ? 'production' : void 0) !== 'production' && !t)
      throw new Error('Store must be created by buildStore to read its building blocks')
    return t
  }
function xS(...e) {
  const t = {
      get(r) {
        const o = Je(t)[21]
        return o(t, r)
      },
      set(r, ...o) {
        const i = Je(t)[22]
        return i(t, r, ...o)
      },
      sub(r, o) {
        const i = Je(t)[23]
        return i(t, r, o)
      },
    },
    n = [
      new WeakMap(),
      new WeakMap(),
      new WeakMap(),
      new Set(),
      new Set(),
      new Set(),
      {},
      aS,
      lS,
      cS,
      uS,
      dS,
      fS,
      hS,
      pS,
      mS,
      Vp,
      gS,
      Bp,
      yS,
      Wi,
      vS,
      bS,
      wS,
      void 0,
    ].map((r, o) => e[o] || r)
  return (Up.set(t, Object.freeze(n)), t)
}
const Wp = {}
let SS = 0
function Et(e, t) {
  const n = `atom${++SS}`,
    r = {
      toString() {
        return (Wp ? 'production' : void 0) !== 'production' && this.debugLabel ? n + ':' + this.debugLabel : n
      },
    }
  return (typeof e == 'function' ? (r.read = e) : ((r.init = e), (r.read = CS), (r.write = ES)), r)
}
function CS(e) {
  return e(this)
}
function ES(e, t, n) {
  return t(this, typeof n == 'function' ? n(e(this)) : n)
}
function vs() {
  return xS()
}
let io
function PS() {
  return (
    io ||
      ((io = vs()),
      (Wp ? 'production' : void 0) !== 'production' &&
        (globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = io),
        globalThis.__JOTAI_DEFAULT_STORE__ !== io &&
          console.warn(
            'Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044',
          ))),
    io
  )
}
const RS = {},
  Hp = f.createContext(void 0)
function ac(e) {
  const t = f.useContext(Hp)
  return e?.store || t || PS()
}
function TS({ children: e, store: t }) {
  const n = f.useRef(void 0)
  return (!t && !n.current && (n.current = vs()), f.createElement(Hp.Provider, { value: t || n.current }, e))
}
const el = (e) => typeof e?.then == 'function',
  tl = (e) => {
    e.status ||
      ((e.status = 'pending'),
      e.then(
        (t) => {
          ;((e.status = 'fulfilled'), (e.value = t))
        },
        (t) => {
          ;((e.status = 'rejected'), (e.reason = t))
        },
      ))
  },
  AS =
    V.use ||
    ((e) => {
      if (e.status === 'pending') throw e
      if (e.status === 'fulfilled') return e.value
      throw e.status === 'rejected' ? e.reason : (tl(e), e)
    }),
  fa = new WeakMap(),
  Dd = (e, t) => {
    let n = fa.get(e)
    return (
      n ||
        ((n = new Promise((r, o) => {
          let i = e
          const s = (c) => (u) => {
              i === c && r(u)
            },
            a = (c) => (u) => {
              i === c && o(u)
            },
            l = () => {
              try {
                const c = t()
                el(c) ? (fa.set(c, n), (i = c), c.then(s(c), a(c)), Qa(c, l)) : r(c)
              } catch (c) {
                o(c)
              }
            }
          ;(e.then(s(e), a(e)), Qa(e, l))
        })),
        fa.set(e, n)),
      n
    )
  }
function lc(e, t) {
  const { delay: n, unstable_promiseStatus: r = !V.use } = t || {},
    o = ac(t),
    [[i, s, a], l] = f.useReducer(
      (u) => {
        const d = o.get(e)
        return Object.is(u[0], d) && u[1] === o && u[2] === e ? u : [d, o, e]
      },
      void 0,
      () => [o.get(e), o, e],
    )
  let c = i
  if (
    ((s !== o || a !== e) && (l(), (c = o.get(e))),
    f.useEffect(() => {
      const u = o.sub(e, () => {
        if (r)
          try {
            const d = o.get(e)
            el(d) && tl(Dd(d, () => o.get(e)))
          } catch {}
        if (typeof n == 'number') {
          setTimeout(l, n)
          return
        }
        l()
      })
      return (l(), u)
    }, [o, e, n, r]),
    f.useDebugValue(c),
    el(c))
  ) {
    const u = Dd(c, () => o.get(e))
    return (r && tl(u), AS(u))
  }
  return c
}
function Gp(e, t) {
  const n = ac(t)
  return f.useCallback(
    (...o) => {
      if ((RS ? 'production' : void 0) !== 'production' && !('write' in e)) throw new Error('not writable atom')
      return n.set(e, ...o)
    },
    [n, e],
  )
}
function Un(e, t) {
  return [lc(e, t), Gp(e, t)]
}
const cc = Et({
    sortBy: 'date',
    sortOrder: 'desc',
    selectedTags: [],
    selectedCameras: [],
    selectedLenses: [],
    selectedRatings: null,
    tagFilterMode: 'union',
    columns: 'auto',
  }),
  DF = Et(!1),
  _S = Et(!1),
  kr = vs(),
  MS = (e) => [() => kr.get(e), (t) => kr.set(e, t)],
  ha = { store: kr },
  uc = (e) => [e, () => Un(e, ha), () => lc(e, ha), () => Gp(e, ha), ...MS(e)]
function kS(e) {
  return Number.isSafeInteger(e) && e >= 0
}
function Zp(e) {
  return e != null && typeof e != 'function' && kS(e.length)
}
function Gn(e) {
  return e === '__proto__'
}
function dc(e) {
  switch (typeof e) {
    case 'number':
    case 'symbol':
      return !1
    case 'string':
      return e.includes('.') || e.includes('[') || e.includes(']')
  }
}
function fc(e) {
  return typeof e == 'string' || typeof e == 'symbol' ? e : Object.is(e?.valueOf?.(), -0) ? '-0' : String(e)
}
function Kp(e) {
  if (e == null) return ''
  if (typeof e == 'string') return e
  if (Array.isArray(e)) return e.map(Kp).join(',')
  const t = String(e)
  return t === '0' && Object.is(Number(e), -0) ? '-0' : t
}
function Yp(e) {
  if (Array.isArray(e)) return e.map(fc)
  if (typeof e == 'symbol') return [e]
  e = Kp(e)
  const t = [],
    n = e.length
  if (n === 0) return t
  let r = 0,
    o = '',
    i = '',
    s = !1
  for (e.charCodeAt(0) === 46 && (t.push(''), r++); r < n; ) {
    const a = e[r]
    ;(i
      ? a === '\\' && r + 1 < n
        ? (r++, (o += e[r]))
        : a === i
          ? (i = '')
          : (o += a)
      : s
        ? a === '"' || a === "'"
          ? (i = a)
          : a === ']'
            ? ((s = !1), t.push(o), (o = ''))
            : (o += a)
        : a === '['
          ? ((s = !0), o && (t.push(o), (o = '')))
          : a === '.'
            ? o && (t.push(o), (o = ''))
            : (o += a),
      r++)
  }
  return (o && t.push(o), t)
}
function ho(e, t, n) {
  if (e == null) return n
  switch (typeof t) {
    case 'string': {
      if (Gn(t)) return n
      const r = e[t]
      return r === void 0 ? (dc(t) ? ho(e, Yp(t), n) : n) : r
    }
    case 'number':
    case 'symbol': {
      typeof t == 'number' && (t = fc(t))
      const r = e[t]
      return r === void 0 ? n : r
    }
    default: {
      if (Array.isArray(t)) return DS(e, t, n)
      if ((Object.is(t?.valueOf(), -0) ? (t = '-0') : (t = String(t)), Gn(t))) return n
      const r = e[t]
      return r === void 0 ? n : r
    }
  }
}
function DS(e, t, n) {
  if (t.length === 0) return n
  let r = e
  for (let o = 0; o < t.length; o++) {
    if (r == null || Gn(t[o])) return n
    r = r[t[o]]
  }
  return r === void 0 ? n : r
}
function hc(e) {
  return e == null || (typeof e != 'object' && typeof e != 'function')
}
function pc(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t))
}
function Xp(e) {
  return e == null ? (e === void 0 ? '[object Undefined]' : '[object Null]') : Object.prototype.toString.call(e)
}
const IS = '[object RegExp]',
  qp = '[object String]',
  Jp = '[object Number]',
  Qp = '[object Boolean]',
  em = '[object Arguments]',
  OS = '[object Symbol]',
  NS = '[object Date]',
  LS = '[object Map]',
  jS = '[object Set]',
  $S = '[object Array]',
  IF = '[object Function]',
  FS = '[object ArrayBuffer]',
  zS = '[object Object]',
  OF = '[object Error]',
  VS = '[object DataView]',
  BS = '[object Uint8Array]',
  US = '[object Uint8ClampedArray]',
  WS = '[object Uint16Array]',
  HS = '[object Uint32Array]',
  NF = '[object BigUint64Array]',
  GS = '[object Int8Array]',
  ZS = '[object Int16Array]',
  KS = '[object Int32Array]',
  LF = '[object BigInt64Array]',
  YS = '[object Float32Array]',
  XS = '[object Float64Array]'
function mc(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView)
}
function qS(e, t) {
  return mr(e, void 0, e, new Map(), t)
}
function mr(e, t, n, r = new Map(), o = void 0) {
  const i = o?.(e, t, n, r)
  if (i !== void 0) return i
  if (hc(e)) return e
  if (r.has(e)) return r.get(e)
  if (Array.isArray(e)) {
    const s = new Array(e.length)
    r.set(e, s)
    for (let a = 0; a < e.length; a++) s[a] = mr(e[a], a, n, r, o)
    return (Object.hasOwn(e, 'index') && (s.index = e.index), Object.hasOwn(e, 'input') && (s.input = e.input), s)
  }
  if (e instanceof Date) return new Date(e.getTime())
  if (e instanceof RegExp) {
    const s = new RegExp(e.source, e.flags)
    return ((s.lastIndex = e.lastIndex), s)
  }
  if (e instanceof Map) {
    const s = new Map()
    r.set(e, s)
    for (const [a, l] of e) s.set(a, mr(l, a, n, r, o))
    return s
  }
  if (e instanceof Set) {
    const s = new Set()
    r.set(e, s)
    for (const a of e) s.add(mr(a, void 0, n, r, o))
    return s
  }
  if (typeof Buffer < 'u' && Buffer.isBuffer(e)) return e.subarray()
  if (mc(e)) {
    const s = new (Object.getPrototypeOf(e).constructor)(e.length)
    r.set(e, s)
    for (let a = 0; a < e.length; a++) s[a] = mr(e[a], a, n, r, o)
    return s
  }
  if (e instanceof ArrayBuffer || (typeof SharedArrayBuffer < 'u' && e instanceof SharedArrayBuffer)) return e.slice(0)
  if (e instanceof DataView) {
    const s = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength)
    return (r.set(e, s), Vt(s, e, n, r, o), s)
  }
  if (typeof File < 'u' && e instanceof File) {
    const s = new File([e], e.name, { type: e.type })
    return (r.set(e, s), Vt(s, e, n, r, o), s)
  }
  if (typeof Blob < 'u' && e instanceof Blob) {
    const s = new Blob([e], { type: e.type })
    return (r.set(e, s), Vt(s, e, n, r, o), s)
  }
  if (e instanceof Error) {
    const s = new e.constructor()
    return (
      r.set(e, s),
      (s.message = e.message),
      (s.name = e.name),
      (s.stack = e.stack),
      (s.cause = e.cause),
      Vt(s, e, n, r, o),
      s
    )
  }
  if (e instanceof Boolean) {
    const s = new Boolean(e.valueOf())
    return (r.set(e, s), Vt(s, e, n, r, o), s)
  }
  if (e instanceof Number) {
    const s = new Number(e.valueOf())
    return (r.set(e, s), Vt(s, e, n, r, o), s)
  }
  if (e instanceof String) {
    const s = new String(e.valueOf())
    return (r.set(e, s), Vt(s, e, n, r, o), s)
  }
  if (typeof e == 'object' && JS(e)) {
    const s = Object.create(Object.getPrototypeOf(e))
    return (r.set(e, s), Vt(s, e, n, r, o), s)
  }
  return e
}
function Vt(e, t, n = e, r, o) {
  const i = [...Object.keys(t), ...pc(t)]
  for (let s = 0; s < i.length; s++) {
    const a = i[s],
      l = Object.getOwnPropertyDescriptor(e, a)
    ;(l == null || l.writable) && (e[a] = mr(t[a], a, n, r, o))
  }
}
function JS(e) {
  switch (Xp(e)) {
    case em:
    case $S:
    case FS:
    case VS:
    case Qp:
    case NS:
    case YS:
    case XS:
    case GS:
    case ZS:
    case KS:
    case LS:
    case Jp:
    case zS:
    case IS:
    case jS:
    case qp:
    case OS:
    case BS:
    case US:
    case WS:
    case HS:
      return !0
    default:
      return !1
  }
}
function tm(e, t) {
  return qS(e, (n, r, o, i) => {
    const s = t?.(n, r, o, i)
    if (s !== void 0) return s
    if (typeof e == 'object')
      switch (Object.prototype.toString.call(e)) {
        case Jp:
        case qp:
        case Qp: {
          const a = new e.constructor(e?.valueOf())
          return (Vt(a, e), a)
        }
        case em: {
          const a = {}
          return (Vt(a, e), (a.length = e.length), (a[Symbol.iterator] = e[Symbol.iterator]), a)
        }
        default:
          return
      }
  })
}
function Id(e) {
  return tm(e)
}
function Od(e) {
  return e !== null && typeof e == 'object' && Xp(e) === '[object Arguments]'
}
function Nd(e) {
  return typeof e == 'object' && e !== null
}
function QS(e) {
  return typeof e == 'symbol' || e instanceof Symbol
}
function eC(e) {
  return QS(e) ? NaN : Number(e)
}
function tC(e) {
  return e
    ? ((e = eC(e)), e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0)
    : e === 0
      ? e
      : 0
}
function nC(e) {
  const t = tC(e),
    n = t % 1
  return n ? t - n : t
}
function rC(e, t = 1) {
  const n = [],
    r = Math.floor(t)
  if (!Zp(e)) return n
  const o = (i, s) => {
    for (let a = 0; a < i.length; a++) {
      const l = i[a]
      s < r &&
      (Array.isArray(l) ||
        l?.[Symbol.isConcatSpreadable] ||
        (l !== null && typeof l == 'object' && Object.prototype.toString.call(l) === '[object Arguments]'))
        ? Array.isArray(l)
          ? o(l, s + 1)
          : o(Array.from(l), s + 1)
        : n.push(l)
    }
  }
  return (o(Array.from(e), 0), n)
}
function Ld(e, t) {
  if (e == null) return !0
  switch (typeof t) {
    case 'symbol':
    case 'number':
    case 'object': {
      if (Array.isArray(t)) return jd(e, t)
      if (
        (typeof t == 'number'
          ? (t = fc(t))
          : typeof t == 'object' && (Object.is(t?.valueOf(), -0) ? (t = '-0') : (t = String(t))),
        Gn(t))
      )
        return !1
      if (e?.[t] === void 0) return !0
      try {
        return (delete e[t], !0)
      } catch {
        return !1
      }
    }
    case 'string': {
      if (e?.[t] === void 0 && dc(t)) return jd(e, Yp(t))
      if (Gn(t)) return !1
      try {
        return (delete e[t], !0)
      } catch {
        return !1
      }
    }
  }
}
function jd(e, t) {
  const n = t.length === 1 ? e : ho(e, t.slice(0, -1)),
    r = t[t.length - 1]
  if (n?.[r] === void 0) return !0
  if (Gn(r)) return !1
  try {
    return (delete n[r], !0)
  } catch {
    return !1
  }
}
function oC(e, t, { signal: n, edges: r } = {}) {
  let o,
    i = null
  const s = r != null && r.includes('leading'),
    a = r == null || r.includes('trailing'),
    l = () => {
      i !== null && (e.apply(o, i), (o = void 0), (i = null))
    },
    c = () => {
      ;(a && l(), p())
    }
  let u = null
  const d = () => {
      ;(u != null && clearTimeout(u),
        (u = setTimeout(() => {
          ;((u = null), c())
        }, t)))
    },
    h = () => {
      u !== null && (clearTimeout(u), (u = null))
    },
    p = () => {
      ;(h(), (o = void 0), (i = null))
    },
    m = () => {
      l()
    },
    y = function (...v) {
      if (n?.aborted) return
      ;((o = this), (i = v))
      const w = u == null
      ;(d(), s && w && l())
    }
  return ((y.schedule = d), (y.cancel = p), (y.flush = m), n?.addEventListener('abort', p, { once: !0 }), y)
}
function iC(e, t = 0, n = {}) {
  typeof n != 'object' && (n = {})
  const { leading: r = !1, trailing: o = !0, maxWait: i } = n,
    s = Array(2)
  ;(r && (s[0] = 'leading'), o && (s[1] = 'trailing'))
  let a,
    l = null
  const c = oC(
      function (...h) {
        ;((a = e.apply(this, h)), (l = null))
      },
      t,
      { edges: s },
    ),
    u = function (...h) {
      return i != null && (l === null && (l = Date.now()), Date.now() - l >= i)
        ? ((a = e.apply(this, h)), (l = Date.now()), c.cancel(), c.schedule(), a)
        : (c.apply(this, h), a)
    },
    d = () => (c.flush(), a)
  return ((u.cancel = c.cancel), (u.flush = d), u)
}
function sC(e, t = 0, n = {}) {
  const { leading: r = !0, trailing: o = !0 } = n
  return iC(e, t, { leading: r, maxWait: t, trailing: o })
}
function aC() {}
function lC(e) {
  return typeof Buffer < 'u' && Buffer.isBuffer(e)
}
function cC(e) {
  const t = e?.constructor,
    n = typeof t == 'function' ? t.prototype : Object.prototype
  return e === n
}
function nm(e) {
  return mc(e)
}
function uC(e, t) {
  if (((e = nC(e)), e < 1 || !Number.isSafeInteger(e))) return []
  const n = new Array(e)
  for (let r = 0; r < e; r++) n[r] = typeof t == 'function' ? t(r) : r
  return n
}
function rm(e) {
  if (e == null) return []
  switch (typeof e) {
    case 'object':
    case 'function':
      return Zp(e) ? fC(e) : cC(e) ? dC(e) : Hi(e)
    default:
      return Hi(Object(e))
  }
}
function Hi(e) {
  const t = []
  for (const n in e) t.push(n)
  return t
}
function dC(e) {
  return Hi(e).filter((n) => n !== 'constructor')
}
function fC(e) {
  const t = uC(e.length, (r) => `${r}`),
    n = new Set(t)
  return (
    lC(e) && (n.add('offset'), n.add('parent')),
    nm(e) && (n.add('buffer'), n.add('byteLength'), n.add('byteOffset')),
    [...t, ...Hi(e).filter((r) => !n.has(r))]
  )
}
function om(e) {
  if (typeof e != 'object' || e == null) return !1
  if (Object.getPrototypeOf(e) === null) return !0
  if (Object.prototype.toString.call(e) !== '[object Object]') {
    const n = e[Symbol.toStringTag]
    return n == null || !Object.getOwnPropertyDescriptor(e, Symbol.toStringTag)?.writable
      ? !1
      : e.toString() === `[object ${n}]`
  }
  let t = e
  for (; Object.getPrototypeOf(t) !== null; ) t = Object.getPrototypeOf(t)
  return Object.getPrototypeOf(e) === t
}
function hC(e) {
  if (hc(e)) return e
  if (
    Array.isArray(e) ||
    mc(e) ||
    e instanceof ArrayBuffer ||
    (typeof SharedArrayBuffer < 'u' && e instanceof SharedArrayBuffer)
  )
    return e.slice(0)
  const t = Object.getPrototypeOf(e),
    n = t.constructor
  if (e instanceof Date || e instanceof Map || e instanceof Set) return new n(e)
  if (e instanceof RegExp) {
    const r = new n(e)
    return ((r.lastIndex = e.lastIndex), r)
  }
  if (e instanceof DataView) return new n(e.buffer.slice(0))
  if (e instanceof Error) {
    const r = new n(e.message)
    return ((r.stack = e.stack), (r.name = e.name), (r.cause = e.cause), r)
  }
  if (typeof File < 'u' && e instanceof File) return new n([e], e.name, { type: e.type, lastModified: e.lastModified })
  if (typeof e == 'object') {
    const r = Object.create(t)
    return Object.assign(r, e)
  }
  return e
}
function pC(e, ...t) {
  const n = t.slice(0, -1),
    r = t[t.length - 1]
  let o = e
  for (let i = 0; i < n.length; i++) {
    const s = n[i]
    o = Mi(o, s, r, new Map())
  }
  return o
}
function Mi(e, t, n, r) {
  if ((hc(e) && (e = Object(e)), t == null || typeof t != 'object')) return e
  if (r.has(t)) return hC(r.get(t))
  if ((r.set(t, e), Array.isArray(t))) {
    t = t.slice()
    for (let i = 0; i < t.length; i++) t[i] = t[i] ?? void 0
  }
  const o = [...Object.keys(t), ...pc(t)]
  for (let i = 0; i < o.length; i++) {
    const s = o[i]
    if (Gn(s)) continue
    let a = t[s],
      l = e[s]
    if (
      (Od(a) && (a = { ...a }),
      Od(l) && (l = { ...l }),
      typeof Buffer < 'u' && Buffer.isBuffer(a) && (a = Id(a)),
      Array.isArray(a))
    )
      if (typeof l == 'object' && l != null) {
        const u = [],
          d = Reflect.ownKeys(l)
        for (let h = 0; h < d.length; h++) {
          const p = d[h]
          u[p] = l[p]
        }
        l = u
      } else l = []
    const c = n(l, a, s, e, t, r)
    c !== void 0
      ? (e[s] = c)
      : Array.isArray(a) || (Nd(l) && Nd(a))
        ? (e[s] = Mi(l, a, n, r))
        : l == null && om(a)
          ? (e[s] = Mi({}, a, n, r))
          : l == null && nm(a)
            ? (e[s] = Id(a))
            : (l === void 0 || a !== void 0) && (e[s] = a)
  }
  return e
}
function gc(e, ...t) {
  return pC(e, ...t, aC)
}
function im(e) {
  const t = []
  for (; e; ) (t.push(...pc(e)), (e = Object.getPrototypeOf(e)))
  return t
}
function mC(e, ...t) {
  if (e == null) return {}
  t = rC(t)
  const n = gC(e, t)
  for (let r = 0; r < t.length; r++) {
    let o = t[r]
    switch (typeof o) {
      case 'object': {
        Array.isArray(o) || (o = Array.from(o))
        for (let i = 0; i < o.length; i++) {
          const s = o[i]
          Ld(n, s)
        }
        break
      }
      case 'string':
      case 'symbol':
      case 'number': {
        Ld(n, o)
        break
      }
    }
  }
  return n
}
function gC(e, t) {
  return t.some((r) => Array.isArray(r) || dc(r)) ? vC(e) : yC(e)
}
function yC(e) {
  const t = {},
    n = [...rm(e), ...im(e)]
  for (let r = 0; r < n.length; r++) {
    const o = n[r]
    t[o] = e[o]
  }
  return t
}
function vC(e) {
  const t = {},
    n = [...rm(e), ...im(e)]
  for (let r = 0; r < n.length; r++) {
    const o = n[r]
    t[o] = tm(e[o], (i) => {
      if (!om(i)) return i
    })
  }
  return t
}
const bC = "Jacky's Photography",
  wC = "Jackywhq's Photography",
  xC =
    'Jackywhq的摄影画廊。于方寸间整理记忆，在流转中定格永恒。这是一场与自我的视觉对话，无论是否被看见，记录永不止步。',
  SC = 'https://photo.jackyw.cn',
  CC = '#007bff',
  EC = { name: 'Jackywhq', url: 'https://jackyw.cn/', avatar: 'https://cdn.jackyw.cn/logo/avatar/final-1.png' },
  PC = { github: 'Jackyhq', twitter: '', rss: !1 },
  RC = { folo: { challenge: { feedId: '', userId: '' } } },
  TC = ['maplibre'],
  AC = 'builtin',
  _C = 'mercator',
  MC = {
    name: bC,
    title: wC,
    description: xC,
    url: SC,
    accentColor: CC,
    author: EC,
    social: PC,
    feed: RC,
    map: TC,
    mapStyle: AC,
    mapProjection: _C,
  },
  kC = {
    name: "Innei's Afilmory",
    title: "Innei's Afilmory",
    description: 'Capturing beautiful moments in life, documenting daily warmth and emotions through my lens.',
    url: 'https://afilmory.innei.in',
    accentColor: '#007bff',
    author: {
      name: 'Innei',
      url: 'https://innei.in/',
      avatar: 'https://cdn.jsdelivr.net/gh/Innei/static@master/avatar.png',
    },
  },
  DC = gc(kC, MC),
  IC = { useApi: !1, useNext: !1, useCloud: !1 },
  OC = gc(IC, __CONFIG__),
  NC = () => {
    if (typeof window < 'u' && window.__SITE_CONFIG__) return window.__SITE_CONFIG__
    if (typeof globalThis < 'u' && '__SITE_CONFIG__' in globalThis) return globalThis.__SITE_CONFIG__
  },
  LC = NC() ?? {},
  jF = gc(DC, LC)
function $(e, t, n) {
  function r(a, l) {
    var c
    ;(Object.defineProperty(a, '_zod', { value: a._zod ?? {}, enumerable: !1 }),
      (c = a._zod).traits ?? (c.traits = new Set()),
      a._zod.traits.add(e),
      t(a, l))
    for (const u in s.prototype) u in a || Object.defineProperty(a, u, { value: s.prototype[u].bind(a) })
    ;((a._zod.constr = s), (a._zod.def = l))
  }
  const o = n?.Parent ?? Object
  class i extends o {}
  Object.defineProperty(i, 'name', { value: e })
  function s(a) {
    var l
    const c = n?.Parent ? new i() : this
    ;(r(c, a), (l = c._zod).deferred ?? (l.deferred = []))
    for (const u of c._zod.deferred) u()
    return c
  }
  return (
    Object.defineProperty(s, 'init', { value: r }),
    Object.defineProperty(s, Symbol.hasInstance, {
      value: (a) => (n?.Parent && a instanceof n.Parent ? !0 : a?._zod?.traits?.has(e)),
    }),
    Object.defineProperty(s, 'name', { value: e }),
    s
  )
}
class Er extends Error {
  constructor() {
    super('Encountered Promise during synchronous parse. Use .parseAsync() instead.')
  }
}
class sm extends Error {
  constructor(t) {
    ;(super(`Encountered unidirectional transform during encode: ${t}`), (this.name = 'ZodEncodeError'))
  }
}
const am = {}
function Zn(e) {
  return am
}
function jC(e) {
  const t = Object.values(e).filter((r) => typeof r == 'number')
  return Object.entries(e)
    .filter(([r, o]) => t.indexOf(+r) === -1)
    .map(([r, o]) => o)
}
function nl(e, t) {
  return typeof t == 'bigint' ? t.toString() : t
}
function yc(e) {
  return {
    get value() {
      {
        const t = e()
        return (Object.defineProperty(this, 'value', { value: t }), t)
      }
    },
  }
}
function vc(e) {
  return e == null
}
function bc(e) {
  const t = e.startsWith('^') ? 1 : 0,
    n = e.endsWith('$') ? e.length - 1 : e.length
  return e.slice(t, n)
}
const $d = Symbol('evaluating')
function Ee(e, t, n) {
  let r
  Object.defineProperty(e, t, {
    get() {
      if (r !== $d) return (r === void 0 && ((r = $d), (r = n())), r)
    },
    set(o) {
      Object.defineProperty(e, t, { value: o })
    },
    configurable: !0,
  })
}
function er(e, t, n) {
  Object.defineProperty(e, t, { value: n, writable: !0, enumerable: !0, configurable: !0 })
}
function tr(...e) {
  const t = {}
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n)
    Object.assign(t, r)
  }
  return Object.defineProperties({}, t)
}
function Fd(e) {
  return JSON.stringify(e)
}
const lm = 'captureStackTrace' in Error ? Error.captureStackTrace : (...e) => {}
function Gi(e) {
  return typeof e == 'object' && e !== null && !Array.isArray(e)
}
const $C = yc(() => {
  if (typeof navigator < 'u' && navigator?.userAgent?.includes('Cloudflare')) return !1
  try {
    const e = Function
    return (new e(''), !0)
  } catch {
    return !1
  }
})
function xo(e) {
  if (Gi(e) === !1) return !1
  const t = e.constructor
  if (t === void 0) return !0
  const n = t.prototype
  return !(Gi(n) === !1 || Object.prototype.hasOwnProperty.call(n, 'isPrototypeOf') === !1)
}
function cm(e) {
  return xo(e) ? { ...e } : Array.isArray(e) ? [...e] : e
}
const FC = new Set(['string', 'number', 'symbol'])
function bs(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function Tn(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def)
  return ((!t || n?.parent) && (r._zod.parent = e), r)
}
function fe(e) {
  const t = e
  if (!t) return {}
  if (typeof t == 'string') return { error: () => t }
  if (t?.message !== void 0) {
    if (t?.error !== void 0) throw new Error('Cannot specify both `message` and `error` params')
    t.error = t.message
  }
  return (delete t.message, typeof t.error == 'string' ? { ...t, error: () => t.error } : t)
}
function zC(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === 'optional' && e[t]._zod.optout === 'optional')
}
function VC(e, t) {
  const n = e._zod.def,
    r = tr(e._zod.def, {
      get shape() {
        const o = {}
        for (const i in t) {
          if (!(i in n.shape)) throw new Error(`Unrecognized key: "${i}"`)
          t[i] && (o[i] = n.shape[i])
        }
        return (er(this, 'shape', o), o)
      },
      checks: [],
    })
  return Tn(e, r)
}
function BC(e, t) {
  const n = e._zod.def,
    r = tr(e._zod.def, {
      get shape() {
        const o = { ...e._zod.def.shape }
        for (const i in t) {
          if (!(i in n.shape)) throw new Error(`Unrecognized key: "${i}"`)
          t[i] && delete o[i]
        }
        return (er(this, 'shape', o), o)
      },
      checks: [],
    })
  return Tn(e, r)
}
function UC(e, t) {
  if (!xo(t)) throw new Error('Invalid input to extend: expected a plain object')
  const n = e._zod.def.checks
  if (n && n.length > 0)
    throw new Error('Object schemas containing refinements cannot be extended. Use `.safeExtend()` instead.')
  const o = tr(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape, ...t }
      return (er(this, 'shape', i), i)
    },
    checks: [],
  })
  return Tn(e, o)
}
function WC(e, t) {
  if (!xo(t)) throw new Error('Invalid input to safeExtend: expected a plain object')
  const n = {
    ...e._zod.def,
    get shape() {
      const r = { ...e._zod.def.shape, ...t }
      return (er(this, 'shape', r), r)
    },
    checks: e._zod.def.checks,
  }
  return Tn(e, n)
}
function HC(e, t) {
  const n = tr(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape }
      return (er(this, 'shape', r), r)
    },
    get catchall() {
      return t._zod.def.catchall
    },
    checks: [],
  })
  return Tn(e, n)
}
function GC(e, t, n) {
  const r = tr(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape,
        i = { ...o }
      if (n)
        for (const s in n) {
          if (!(s in o)) throw new Error(`Unrecognized key: "${s}"`)
          n[s] && (i[s] = e ? new e({ type: 'optional', innerType: o[s] }) : o[s])
        }
      else for (const s in o) i[s] = e ? new e({ type: 'optional', innerType: o[s] }) : o[s]
      return (er(this, 'shape', i), i)
    },
    checks: [],
  })
  return Tn(t, r)
}
function ZC(e, t, n) {
  const r = tr(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape,
        i = { ...o }
      if (n)
        for (const s in n) {
          if (!(s in i)) throw new Error(`Unrecognized key: "${s}"`)
          n[s] && (i[s] = new e({ type: 'nonoptional', innerType: o[s] }))
        }
      else for (const s in o) i[s] = new e({ type: 'nonoptional', innerType: o[s] })
      return (er(this, 'shape', i), i)
    },
    checks: [],
  })
  return Tn(t, r)
}
function gr(e, t = 0) {
  if (e.aborted === !0) return !0
  for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0
  return !1
}
function um(e, t) {
  return t.map((n) => {
    var r
    return ((r = n).path ?? (r.path = []), n.path.unshift(e), n)
  })
}
function ui(e) {
  return typeof e == 'string' ? e : e?.message
}
function Kn(e, t, n) {
  const r = { ...e, path: e.path ?? [] }
  if (!e.message) {
    const o =
      ui(e.inst?._zod.def?.error?.(e)) ??
      ui(t?.error?.(e)) ??
      ui(n.customError?.(e)) ??
      ui(n.localeError?.(e)) ??
      'Invalid input'
    r.message = o
  }
  return (delete r.inst, delete r.continue, t?.reportInput || delete r.input, r)
}
function wc(e) {
  return Array.isArray(e) ? 'array' : typeof e == 'string' ? 'string' : 'unknown'
}
function So(...e) {
  const [t, n, r] = e
  return typeof t == 'string' ? { message: t, code: 'custom', input: n, inst: r } : { ...t }
}
const dm = (e, t) => {
    ;((e.name = '$ZodError'),
      Object.defineProperty(e, '_zod', { value: e._zod, enumerable: !1 }),
      Object.defineProperty(e, 'issues', { value: t, enumerable: !1 }),
      (e.message = JSON.stringify(t, nl, 2)),
      Object.defineProperty(e, 'toString', { value: () => e.message, enumerable: !1 }))
  },
  fm = $('$ZodError', dm),
  hm = $('$ZodError', dm, { Parent: Error })
function KC(e, t = (n) => n.message) {
  const n = {},
    r = []
  for (const o of e.issues)
    o.path.length > 0 ? ((n[o.path[0]] = n[o.path[0]] || []), n[o.path[0]].push(t(o))) : r.push(t(o))
  return { formErrors: r, fieldErrors: n }
}
function YC(e, t = (n) => n.message) {
  const n = { _errors: [] },
    r = (o) => {
      for (const i of o.issues)
        if (i.code === 'invalid_union' && i.errors.length) i.errors.map((s) => r({ issues: s }))
        else if (i.code === 'invalid_key') r({ issues: i.issues })
        else if (i.code === 'invalid_element') r({ issues: i.issues })
        else if (i.path.length === 0) n._errors.push(t(i))
        else {
          let s = n,
            a = 0
          for (; a < i.path.length; ) {
            const l = i.path[a]
            ;(a === i.path.length - 1
              ? ((s[l] = s[l] || { _errors: [] }), s[l]._errors.push(t(i)))
              : (s[l] = s[l] || { _errors: [] }),
              (s = s[l]),
              a++)
          }
        }
    }
  return (r(e), n)
}
const xc = (e) => (t, n, r, o) => {
    const i = r ? Object.assign(r, { async: !1 }) : { async: !1 },
      s = t._zod.run({ value: n, issues: [] }, i)
    if (s instanceof Promise) throw new Er()
    if (s.issues.length) {
      const a = new (o?.Err ?? e)(s.issues.map((l) => Kn(l, i, Zn())))
      throw (lm(a, o?.callee), a)
    }
    return s.value
  },
  Sc = (e) => async (t, n, r, o) => {
    const i = r ? Object.assign(r, { async: !0 }) : { async: !0 }
    let s = t._zod.run({ value: n, issues: [] }, i)
    if ((s instanceof Promise && (s = await s), s.issues.length)) {
      const a = new (o?.Err ?? e)(s.issues.map((l) => Kn(l, i, Zn())))
      throw (lm(a, o?.callee), a)
    }
    return s.value
  },
  ws = (e) => (t, n, r) => {
    const o = r ? { ...r, async: !1 } : { async: !1 },
      i = t._zod.run({ value: n, issues: [] }, o)
    if (i instanceof Promise) throw new Er()
    return i.issues.length
      ? { success: !1, error: new (e ?? fm)(i.issues.map((s) => Kn(s, o, Zn()))) }
      : { success: !0, data: i.value }
  },
  XC = ws(hm),
  xs = (e) => async (t, n, r) => {
    const o = r ? Object.assign(r, { async: !0 }) : { async: !0 }
    let i = t._zod.run({ value: n, issues: [] }, o)
    return (
      i instanceof Promise && (i = await i),
      i.issues.length
        ? { success: !1, error: new e(i.issues.map((s) => Kn(s, o, Zn()))) }
        : { success: !0, data: i.value }
    )
  },
  qC = xs(hm),
  JC = (e) => (t, n, r) => {
    const o = r ? Object.assign(r, { direction: 'backward' }) : { direction: 'backward' }
    return xc(e)(t, n, o)
  },
  QC = (e) => (t, n, r) => xc(e)(t, n, r),
  eE = (e) => async (t, n, r) => {
    const o = r ? Object.assign(r, { direction: 'backward' }) : { direction: 'backward' }
    return Sc(e)(t, n, o)
  },
  tE = (e) => async (t, n, r) => Sc(e)(t, n, r),
  nE = (e) => (t, n, r) => {
    const o = r ? Object.assign(r, { direction: 'backward' }) : { direction: 'backward' }
    return ws(e)(t, n, o)
  },
  rE = (e) => (t, n, r) => ws(e)(t, n, r),
  oE = (e) => async (t, n, r) => {
    const o = r ? Object.assign(r, { direction: 'backward' }) : { direction: 'backward' }
    return xs(e)(t, n, o)
  },
  iE = (e) => async (t, n, r) => xs(e)(t, n, r),
  sE = /^[cC][^\s-]{8,}$/,
  aE = /^[0-9a-z]+$/,
  lE = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,
  cE = /^[0-9a-vA-V]{20}$/,
  uE = /^[A-Za-z0-9]{27}$/,
  dE = /^[a-zA-Z0-9_-]{21}$/,
  fE = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,
  hE = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,
  zd = (e) =>
    e
      ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)
      : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,
  pE = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,
  mE = '^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$'
function gE() {
  return new RegExp(mE, 'u')
}
const yE =
    /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  vE =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,
  bE =
    /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,
  wE =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  xE = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,
  pm = /^[A-Za-z0-9_-]*$/,
  SE =
    /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/,
  CE = /^\+(?:[0-9]){6,14}[0-9]$/,
  mm =
    '(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))',
  EE = new RegExp(`^${mm}$`)
function gm(e) {
  const t = '(?:[01]\\d|2[0-3]):[0-5]\\d'
  return typeof e.precision == 'number'
    ? e.precision === -1
      ? `${t}`
      : e.precision === 0
        ? `${t}:[0-5]\\d`
        : `${t}:[0-5]\\d\\.\\d{${e.precision}}`
    : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`
}
function PE(e) {
  return new RegExp(`^${gm(e)}$`)
}
function RE(e) {
  const t = gm({ precision: e.precision }),
    n = ['Z']
  ;(e.local && n.push(''), e.offset && n.push('([+-](?:[01]\\d|2[0-3]):[0-5]\\d)'))
  const r = `${t}(?:${n.join('|')})`
  return new RegExp(`^${mm}T(?:${r})$`)
}
const TE = (e) => {
    const t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ''}}` : '[\\s\\S]*'
    return new RegExp(`^${t}$`)
  },
  AE = /^[^A-Z]*$/,
  _E = /^[^a-z]*$/,
  Jt = $('$ZodCheck', (e, t) => {
    var n
    ;(e._zod ?? (e._zod = {}), (e._zod.def = t), (n = e._zod).onattach ?? (n.onattach = []))
  }),
  ME = $('$ZodCheckMaxLength', (e, t) => {
    var n
    ;(Jt.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (r) => {
          const o = r.value
          return !vc(o) && o.length !== void 0
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY
        t.maximum < o && (r._zod.bag.maximum = t.maximum)
      }),
      (e._zod.check = (r) => {
        const o = r.value
        if (o.length <= t.maximum) return
        const s = wc(o)
        r.issues.push({
          origin: s,
          code: 'too_big',
          maximum: t.maximum,
          inclusive: !0,
          input: o,
          inst: e,
          continue: !t.abort,
        })
      }))
  }),
  kE = $('$ZodCheckMinLength', (e, t) => {
    var n
    ;(Jt.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (r) => {
          const o = r.value
          return !vc(o) && o.length !== void 0
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY
        t.minimum > o && (r._zod.bag.minimum = t.minimum)
      }),
      (e._zod.check = (r) => {
        const o = r.value
        if (o.length >= t.minimum) return
        const s = wc(o)
        r.issues.push({
          origin: s,
          code: 'too_small',
          minimum: t.minimum,
          inclusive: !0,
          input: o,
          inst: e,
          continue: !t.abort,
        })
      }))
  }),
  DE = $('$ZodCheckLengthEquals', (e, t) => {
    var n
    ;(Jt.init(e, t),
      (n = e._zod.def).when ??
        (n.when = (r) => {
          const o = r.value
          return !vc(o) && o.length !== void 0
        }),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag
        ;((o.minimum = t.length), (o.maximum = t.length), (o.length = t.length))
      }),
      (e._zod.check = (r) => {
        const o = r.value,
          i = o.length
        if (i === t.length) return
        const s = wc(o),
          a = i > t.length
        r.issues.push({
          origin: s,
          ...(a ? { code: 'too_big', maximum: t.length } : { code: 'too_small', minimum: t.length }),
          inclusive: !0,
          exact: !0,
          input: r.value,
          inst: e,
          continue: !t.abort,
        })
      }))
  }),
  Ss = $('$ZodCheckStringFormat', (e, t) => {
    var n, r
    ;(Jt.init(e, t),
      e._zod.onattach.push((o) => {
        const i = o._zod.bag
        ;((i.format = t.format), t.pattern && (i.patterns ?? (i.patterns = new Set()), i.patterns.add(t.pattern)))
      }),
      t.pattern
        ? ((n = e._zod).check ??
          (n.check = (o) => {
            ;((t.pattern.lastIndex = 0),
              !t.pattern.test(o.value) &&
                o.issues.push({
                  origin: 'string',
                  code: 'invalid_format',
                  format: t.format,
                  input: o.value,
                  ...(t.pattern ? { pattern: t.pattern.toString() } : {}),
                  inst: e,
                  continue: !t.abort,
                }))
          }))
        : ((r = e._zod).check ?? (r.check = () => {})))
  }),
  IE = $('$ZodCheckRegex', (e, t) => {
    ;(Ss.init(e, t),
      (e._zod.check = (n) => {
        ;((t.pattern.lastIndex = 0),
          !t.pattern.test(n.value) &&
            n.issues.push({
              origin: 'string',
              code: 'invalid_format',
              format: 'regex',
              input: n.value,
              pattern: t.pattern.toString(),
              inst: e,
              continue: !t.abort,
            }))
      }))
  }),
  OE = $('$ZodCheckLowerCase', (e, t) => {
    ;(t.pattern ?? (t.pattern = AE), Ss.init(e, t))
  }),
  NE = $('$ZodCheckUpperCase', (e, t) => {
    ;(t.pattern ?? (t.pattern = _E), Ss.init(e, t))
  }),
  LE = $('$ZodCheckIncludes', (e, t) => {
    Jt.init(e, t)
    const n = bs(t.includes),
      r = new RegExp(typeof t.position == 'number' ? `^.{${t.position}}${n}` : n)
    ;((t.pattern = r),
      e._zod.onattach.push((o) => {
        const i = o._zod.bag
        ;(i.patterns ?? (i.patterns = new Set()), i.patterns.add(r))
      }),
      (e._zod.check = (o) => {
        o.value.includes(t.includes, t.position) ||
          o.issues.push({
            origin: 'string',
            code: 'invalid_format',
            format: 'includes',
            includes: t.includes,
            input: o.value,
            inst: e,
            continue: !t.abort,
          })
      }))
  }),
  jE = $('$ZodCheckStartsWith', (e, t) => {
    Jt.init(e, t)
    const n = new RegExp(`^${bs(t.prefix)}.*`)
    ;(t.pattern ?? (t.pattern = n),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag
        ;(o.patterns ?? (o.patterns = new Set()), o.patterns.add(n))
      }),
      (e._zod.check = (r) => {
        r.value.startsWith(t.prefix) ||
          r.issues.push({
            origin: 'string',
            code: 'invalid_format',
            format: 'starts_with',
            prefix: t.prefix,
            input: r.value,
            inst: e,
            continue: !t.abort,
          })
      }))
  }),
  $E = $('$ZodCheckEndsWith', (e, t) => {
    Jt.init(e, t)
    const n = new RegExp(`.*${bs(t.suffix)}$`)
    ;(t.pattern ?? (t.pattern = n),
      e._zod.onattach.push((r) => {
        const o = r._zod.bag
        ;(o.patterns ?? (o.patterns = new Set()), o.patterns.add(n))
      }),
      (e._zod.check = (r) => {
        r.value.endsWith(t.suffix) ||
          r.issues.push({
            origin: 'string',
            code: 'invalid_format',
            format: 'ends_with',
            suffix: t.suffix,
            input: r.value,
            inst: e,
            continue: !t.abort,
          })
      }))
  }),
  FE = $('$ZodCheckOverwrite', (e, t) => {
    ;(Jt.init(e, t),
      (e._zod.check = (n) => {
        n.value = t.tx(n.value)
      }))
  })
class zE {
  constructor(t = []) {
    ;((this.content = []), (this.indent = 0), this && (this.args = t))
  }
  indented(t) {
    ;((this.indent += 1), t(this), (this.indent -= 1))
  }
  write(t) {
    if (typeof t == 'function') {
      ;(t(this, { execution: 'sync' }), t(this, { execution: 'async' }))
      return
    }
    const r = t
        .split(
          `
`,
        )
        .filter((s) => s),
      o = Math.min(...r.map((s) => s.length - s.trimStart().length)),
      i = r.map((s) => s.slice(o)).map((s) => ' '.repeat(this.indent * 2) + s)
    for (const s of i) this.content.push(s)
  }
  compile() {
    const t = Function,
      n = this?.args,
      o = [...(this?.content ?? ['']).map((i) => `  ${i}`)]
    return new t(
      ...n,
      o.join(`
`),
    )
  }
}
const VE = { major: 4, minor: 1, patch: 12 },
  Ue = $('$ZodType', (e, t) => {
    var n
    ;(e ?? (e = {}), (e._zod.def = t), (e._zod.bag = e._zod.bag || {}), (e._zod.version = VE))
    const r = [...(e._zod.def.checks ?? [])]
    e._zod.traits.has('$ZodCheck') && r.unshift(e)
    for (const o of r) for (const i of o._zod.onattach) i(e)
    if (r.length === 0)
      ((n = e._zod).deferred ?? (n.deferred = []),
        e._zod.deferred?.push(() => {
          e._zod.run = e._zod.parse
        }))
    else {
      const o = (s, a, l) => {
          let c = gr(s),
            u
          for (const d of a) {
            if (d._zod.def.when) {
              if (!d._zod.def.when(s)) continue
            } else if (c) continue
            const h = s.issues.length,
              p = d._zod.check(s)
            if (p instanceof Promise && l?.async === !1) throw new Er()
            if (u || p instanceof Promise)
              u = (u ?? Promise.resolve()).then(async () => {
                ;(await p, s.issues.length !== h && (c || (c = gr(s, h))))
              })
            else {
              if (s.issues.length === h) continue
              c || (c = gr(s, h))
            }
          }
          return u ? u.then(() => s) : s
        },
        i = (s, a, l) => {
          if (gr(s)) return ((s.aborted = !0), s)
          const c = o(a, r, l)
          if (c instanceof Promise) {
            if (l.async === !1) throw new Er()
            return c.then((u) => e._zod.parse(u, l))
          }
          return e._zod.parse(c, l)
        }
      e._zod.run = (s, a) => {
        if (a.skipChecks) return e._zod.parse(s, a)
        if (a.direction === 'backward') {
          const c = e._zod.parse({ value: s.value, issues: [] }, { ...a, skipChecks: !0 })
          return c instanceof Promise ? c.then((u) => i(u, s, a)) : i(c, s, a)
        }
        const l = e._zod.parse(s, a)
        if (l instanceof Promise) {
          if (a.async === !1) throw new Er()
          return l.then((c) => o(c, r, a))
        }
        return o(l, r, a)
      }
    }
    e['~standard'] = {
      validate: (o) => {
        try {
          const i = XC(e, o)
          return i.success ? { value: i.data } : { issues: i.error?.issues }
        } catch {
          return qC(e, o).then((s) => (s.success ? { value: s.data } : { issues: s.error?.issues }))
        }
      },
      vendor: 'zod',
      version: 1,
    }
  }),
  Cc = $('$ZodString', (e, t) => {
    ;(Ue.init(e, t),
      (e._zod.pattern = [...(e?._zod.bag?.patterns ?? [])].pop() ?? TE(e._zod.bag)),
      (e._zod.parse = (n, r) => {
        if (t.coerce)
          try {
            n.value = String(n.value)
          } catch {}
        return (
          typeof n.value == 'string' ||
            n.issues.push({ expected: 'string', code: 'invalid_type', input: n.value, inst: e }),
          n
        )
      }))
  }),
  _e = $('$ZodStringFormat', (e, t) => {
    ;(Ss.init(e, t), Cc.init(e, t))
  }),
  BE = $('$ZodGUID', (e, t) => {
    ;(t.pattern ?? (t.pattern = hE), _e.init(e, t))
  }),
  UE = $('$ZodUUID', (e, t) => {
    if (t.version) {
      const r = { v1: 1, v2: 2, v3: 3, v4: 4, v5: 5, v6: 6, v7: 7, v8: 8 }[t.version]
      if (r === void 0) throw new Error(`Invalid UUID version: "${t.version}"`)
      t.pattern ?? (t.pattern = zd(r))
    } else t.pattern ?? (t.pattern = zd())
    _e.init(e, t)
  }),
  WE = $('$ZodEmail', (e, t) => {
    ;(t.pattern ?? (t.pattern = pE), _e.init(e, t))
  }),
  HE = $('$ZodURL', (e, t) => {
    ;(_e.init(e, t),
      (e._zod.check = (n) => {
        try {
          const r = n.value.trim(),
            o = new URL(r)
          ;(t.hostname &&
            ((t.hostname.lastIndex = 0),
            t.hostname.test(o.hostname) ||
              n.issues.push({
                code: 'invalid_format',
                format: 'url',
                note: 'Invalid hostname',
                pattern: SE.source,
                input: n.value,
                inst: e,
                continue: !t.abort,
              })),
            t.protocol &&
              ((t.protocol.lastIndex = 0),
              t.protocol.test(o.protocol.endsWith(':') ? o.protocol.slice(0, -1) : o.protocol) ||
                n.issues.push({
                  code: 'invalid_format',
                  format: 'url',
                  note: 'Invalid protocol',
                  pattern: t.protocol.source,
                  input: n.value,
                  inst: e,
                  continue: !t.abort,
                })),
            t.normalize ? (n.value = o.href) : (n.value = r))
          return
        } catch {
          n.issues.push({ code: 'invalid_format', format: 'url', input: n.value, inst: e, continue: !t.abort })
        }
      }))
  }),
  GE = $('$ZodEmoji', (e, t) => {
    ;(t.pattern ?? (t.pattern = gE()), _e.init(e, t))
  }),
  ZE = $('$ZodNanoID', (e, t) => {
    ;(t.pattern ?? (t.pattern = dE), _e.init(e, t))
  }),
  KE = $('$ZodCUID', (e, t) => {
    ;(t.pattern ?? (t.pattern = sE), _e.init(e, t))
  }),
  YE = $('$ZodCUID2', (e, t) => {
    ;(t.pattern ?? (t.pattern = aE), _e.init(e, t))
  }),
  XE = $('$ZodULID', (e, t) => {
    ;(t.pattern ?? (t.pattern = lE), _e.init(e, t))
  }),
  qE = $('$ZodXID', (e, t) => {
    ;(t.pattern ?? (t.pattern = cE), _e.init(e, t))
  }),
  JE = $('$ZodKSUID', (e, t) => {
    ;(t.pattern ?? (t.pattern = uE), _e.init(e, t))
  }),
  QE = $('$ZodISODateTime', (e, t) => {
    ;(t.pattern ?? (t.pattern = RE(t)), _e.init(e, t))
  }),
  eP = $('$ZodISODate', (e, t) => {
    ;(t.pattern ?? (t.pattern = EE), _e.init(e, t))
  }),
  tP = $('$ZodISOTime', (e, t) => {
    ;(t.pattern ?? (t.pattern = PE(t)), _e.init(e, t))
  }),
  nP = $('$ZodISODuration', (e, t) => {
    ;(t.pattern ?? (t.pattern = fE), _e.init(e, t))
  }),
  rP = $('$ZodIPv4', (e, t) => {
    ;(t.pattern ?? (t.pattern = yE),
      _e.init(e, t),
      e._zod.onattach.push((n) => {
        const r = n._zod.bag
        r.format = 'ipv4'
      }))
  }),
  oP = $('$ZodIPv6', (e, t) => {
    ;(t.pattern ?? (t.pattern = vE),
      _e.init(e, t),
      e._zod.onattach.push((n) => {
        const r = n._zod.bag
        r.format = 'ipv6'
      }),
      (e._zod.check = (n) => {
        try {
          new URL(`http://[${n.value}]`)
        } catch {
          n.issues.push({ code: 'invalid_format', format: 'ipv6', input: n.value, inst: e, continue: !t.abort })
        }
      }))
  }),
  iP = $('$ZodCIDRv4', (e, t) => {
    ;(t.pattern ?? (t.pattern = bE), _e.init(e, t))
  }),
  sP = $('$ZodCIDRv6', (e, t) => {
    ;(t.pattern ?? (t.pattern = wE),
      _e.init(e, t),
      (e._zod.check = (n) => {
        const r = n.value.split('/')
        try {
          if (r.length !== 2) throw new Error()
          const [o, i] = r
          if (!i) throw new Error()
          const s = Number(i)
          if (`${s}` !== i) throw new Error()
          if (s < 0 || s > 128) throw new Error()
          new URL(`http://[${o}]`)
        } catch {
          n.issues.push({ code: 'invalid_format', format: 'cidrv6', input: n.value, inst: e, continue: !t.abort })
        }
      }))
  })
function ym(e) {
  if (e === '') return !0
  if (e.length % 4 !== 0) return !1
  try {
    return (atob(e), !0)
  } catch {
    return !1
  }
}
const aP = $('$ZodBase64', (e, t) => {
  ;(t.pattern ?? (t.pattern = xE),
    _e.init(e, t),
    e._zod.onattach.push((n) => {
      n._zod.bag.contentEncoding = 'base64'
    }),
    (e._zod.check = (n) => {
      ym(n.value) ||
        n.issues.push({ code: 'invalid_format', format: 'base64', input: n.value, inst: e, continue: !t.abort })
    }))
})
function lP(e) {
  if (!pm.test(e)) return !1
  const t = e.replace(/[-_]/g, (r) => (r === '-' ? '+' : '/')),
    n = t.padEnd(Math.ceil(t.length / 4) * 4, '=')
  return ym(n)
}
const cP = $('$ZodBase64URL', (e, t) => {
    ;(t.pattern ?? (t.pattern = pm),
      _e.init(e, t),
      e._zod.onattach.push((n) => {
        n._zod.bag.contentEncoding = 'base64url'
      }),
      (e._zod.check = (n) => {
        lP(n.value) ||
          n.issues.push({ code: 'invalid_format', format: 'base64url', input: n.value, inst: e, continue: !t.abort })
      }))
  }),
  uP = $('$ZodE164', (e, t) => {
    ;(t.pattern ?? (t.pattern = CE), _e.init(e, t))
  })
function dP(e, t = null) {
  try {
    const n = e.split('.')
    if (n.length !== 3) return !1
    const [r] = n
    if (!r) return !1
    const o = JSON.parse(atob(r))
    return !(('typ' in o && o?.typ !== 'JWT') || !o.alg || (t && (!('alg' in o) || o.alg !== t)))
  } catch {
    return !1
  }
}
const fP = $('$ZodJWT', (e, t) => {
    ;(_e.init(e, t),
      (e._zod.check = (n) => {
        dP(n.value, t.alg) ||
          n.issues.push({ code: 'invalid_format', format: 'jwt', input: n.value, inst: e, continue: !t.abort })
      }))
  }),
  hP = $('$ZodUnknown', (e, t) => {
    ;(Ue.init(e, t), (e._zod.parse = (n) => n))
  }),
  pP = $('$ZodNever', (e, t) => {
    ;(Ue.init(e, t),
      (e._zod.parse = (n, r) => (
        n.issues.push({ expected: 'never', code: 'invalid_type', input: n.value, inst: e }),
        n
      )))
  })
function Vd(e, t, n) {
  ;(e.issues.length && t.issues.push(...um(n, e.issues)), (t.value[n] = e.value))
}
const mP = $('$ZodArray', (e, t) => {
  ;(Ue.init(e, t),
    (e._zod.parse = (n, r) => {
      const o = n.value
      if (!Array.isArray(o)) return (n.issues.push({ expected: 'array', code: 'invalid_type', input: o, inst: e }), n)
      n.value = Array(o.length)
      const i = []
      for (let s = 0; s < o.length; s++) {
        const a = o[s],
          l = t.element._zod.run({ value: a, issues: [] }, r)
        l instanceof Promise ? i.push(l.then((c) => Vd(c, n, s))) : Vd(l, n, s)
      }
      return i.length ? Promise.all(i).then(() => n) : n
    }))
})
function Zi(e, t, n, r) {
  ;(e.issues.length && t.issues.push(...um(n, e.issues)),
    e.value === void 0 ? n in r && (t.value[n] = void 0) : (t.value[n] = e.value))
}
function vm(e) {
  const t = Object.keys(e.shape)
  for (const r of t)
    if (!e.shape?.[r]?._zod?.traits?.has('$ZodType'))
      throw new Error(`Invalid element at key "${r}": expected a Zod schema`)
  const n = zC(e.shape)
  return { ...e, keys: t, keySet: new Set(t), numKeys: t.length, optionalKeys: new Set(n) }
}
function bm(e, t, n, r, o, i) {
  const s = [],
    a = o.keySet,
    l = o.catchall._zod,
    c = l.def.type
  for (const u of Object.keys(t)) {
    if (a.has(u)) continue
    if (c === 'never') {
      s.push(u)
      continue
    }
    const d = l.run({ value: t[u], issues: [] }, r)
    d instanceof Promise ? e.push(d.then((h) => Zi(h, n, u, t))) : Zi(d, n, u, t)
  }
  return (
    s.length && n.issues.push({ code: 'unrecognized_keys', keys: s, input: t, inst: i }),
    e.length ? Promise.all(e).then(() => n) : n
  )
}
const gP = $('$ZodObject', (e, t) => {
    if ((Ue.init(e, t), !Object.getOwnPropertyDescriptor(t, 'shape')?.get)) {
      const a = t.shape
      Object.defineProperty(t, 'shape', {
        get: () => {
          const l = { ...a }
          return (Object.defineProperty(t, 'shape', { value: l }), l)
        },
      })
    }
    const r = yc(() => vm(t))
    Ee(e._zod, 'propValues', () => {
      const a = t.shape,
        l = {}
      for (const c in a) {
        const u = a[c]._zod
        if (u.values) {
          l[c] ?? (l[c] = new Set())
          for (const d of u.values) l[c].add(d)
        }
      }
      return l
    })
    const o = Gi,
      i = t.catchall
    let s
    e._zod.parse = (a, l) => {
      s ?? (s = r.value)
      const c = a.value
      if (!o(c)) return (a.issues.push({ expected: 'object', code: 'invalid_type', input: c, inst: e }), a)
      a.value = {}
      const u = [],
        d = s.shape
      for (const h of s.keys) {
        const m = d[h]._zod.run({ value: c[h], issues: [] }, l)
        m instanceof Promise ? u.push(m.then((y) => Zi(y, a, h, c))) : Zi(m, a, h, c)
      }
      return i ? bm(u, c, a, l, r.value, e) : u.length ? Promise.all(u).then(() => a) : a
    }
  }),
  yP = $('$ZodObjectJIT', (e, t) => {
    gP.init(e, t)
    const n = e._zod.parse,
      r = yc(() => vm(t)),
      o = (h) => {
        const p = new zE(['shape', 'payload', 'ctx']),
          m = r.value,
          y = (x) => {
            const E = Fd(x)
            return `shape[${E}]._zod.run({ value: input[${E}], issues: [] }, ctx)`
          }
        p.write('const input = payload.value;')
        const v = Object.create(null)
        let w = 0
        for (const x of m.keys) v[x] = `key_${w++}`
        p.write('const newResult = {};')
        for (const x of m.keys) {
          const E = v[x],
            C = Fd(x)
          ;(p.write(`const ${E} = ${y(x)};`),
            p.write(`
        if (${E}.issues.length) {
          payload.issues = payload.issues.concat(${E}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${C}, ...iss.path] : [${C}]
          })));
        }
        
        
        if (${E}.value === undefined) {
          if (${C} in input) {
            newResult[${C}] = undefined;
          }
        } else {
          newResult[${C}] = ${E}.value;
        }
        
      `))
        }
        ;(p.write('payload.value = newResult;'), p.write('return payload;'))
        const b = p.compile()
        return (x, E) => b(h, x, E)
      }
    let i
    const s = Gi,
      a = !am.jitless,
      c = a && $C.value,
      u = t.catchall
    let d
    e._zod.parse = (h, p) => {
      d ?? (d = r.value)
      const m = h.value
      return s(m)
        ? a && c && p?.async === !1 && p.jitless !== !0
          ? (i || (i = o(t.shape)), (h = i(h, p)), u ? bm([], m, h, p, d, e) : h)
          : n(h, p)
        : (h.issues.push({ expected: 'object', code: 'invalid_type', input: m, inst: e }), h)
    }
  })
function Bd(e, t, n, r) {
  for (const i of e) if (i.issues.length === 0) return ((t.value = i.value), t)
  const o = e.filter((i) => !gr(i))
  return o.length === 1
    ? ((t.value = o[0].value), o[0])
    : (t.issues.push({
        code: 'invalid_union',
        input: t.value,
        inst: n,
        errors: e.map((i) => i.issues.map((s) => Kn(s, r, Zn()))),
      }),
      t)
}
const vP = $('$ZodUnion', (e, t) => {
    ;(Ue.init(e, t),
      Ee(e._zod, 'optin', () => (t.options.some((o) => o._zod.optin === 'optional') ? 'optional' : void 0)),
      Ee(e._zod, 'optout', () => (t.options.some((o) => o._zod.optout === 'optional') ? 'optional' : void 0)),
      Ee(e._zod, 'values', () => {
        if (t.options.every((o) => o._zod.values)) return new Set(t.options.flatMap((o) => Array.from(o._zod.values)))
      }),
      Ee(e._zod, 'pattern', () => {
        if (t.options.every((o) => o._zod.pattern)) {
          const o = t.options.map((i) => i._zod.pattern)
          return new RegExp(`^(${o.map((i) => bc(i.source)).join('|')})$`)
        }
      }))
    const n = t.options.length === 1,
      r = t.options[0]._zod.run
    e._zod.parse = (o, i) => {
      if (n) return r(o, i)
      let s = !1
      const a = []
      for (const l of t.options) {
        const c = l._zod.run({ value: o.value, issues: [] }, i)
        if (c instanceof Promise) (a.push(c), (s = !0))
        else {
          if (c.issues.length === 0) return c
          a.push(c)
        }
      }
      return s ? Promise.all(a).then((l) => Bd(l, o, e, i)) : Bd(a, o, e, i)
    }
  }),
  bP = $('$ZodIntersection', (e, t) => {
    ;(Ue.init(e, t),
      (e._zod.parse = (n, r) => {
        const o = n.value,
          i = t.left._zod.run({ value: o, issues: [] }, r),
          s = t.right._zod.run({ value: o, issues: [] }, r)
        return i instanceof Promise || s instanceof Promise
          ? Promise.all([i, s]).then(([l, c]) => Ud(n, l, c))
          : Ud(n, i, s)
      }))
  })
function rl(e, t) {
  if (e === t) return { valid: !0, data: e }
  if (e instanceof Date && t instanceof Date && +e == +t) return { valid: !0, data: e }
  if (xo(e) && xo(t)) {
    const n = Object.keys(t),
      r = Object.keys(e).filter((i) => n.indexOf(i) !== -1),
      o = { ...e, ...t }
    for (const i of r) {
      const s = rl(e[i], t[i])
      if (!s.valid) return { valid: !1, mergeErrorPath: [i, ...s.mergeErrorPath] }
      o[i] = s.data
    }
    return { valid: !0, data: o }
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length) return { valid: !1, mergeErrorPath: [] }
    const n = []
    for (let r = 0; r < e.length; r++) {
      const o = e[r],
        i = t[r],
        s = rl(o, i)
      if (!s.valid) return { valid: !1, mergeErrorPath: [r, ...s.mergeErrorPath] }
      n.push(s.data)
    }
    return { valid: !0, data: n }
  }
  return { valid: !1, mergeErrorPath: [] }
}
function Ud(e, t, n) {
  if ((t.issues.length && e.issues.push(...t.issues), n.issues.length && e.issues.push(...n.issues), gr(e))) return e
  const r = rl(t.value, n.value)
  if (!r.valid) throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(r.mergeErrorPath)}`)
  return ((e.value = r.data), e)
}
const wP = $('$ZodEnum', (e, t) => {
    Ue.init(e, t)
    const n = jC(t.entries),
      r = new Set(n)
    ;((e._zod.values = r),
      (e._zod.pattern = new RegExp(
        `^(${n
          .filter((o) => FC.has(typeof o))
          .map((o) => (typeof o == 'string' ? bs(o) : o.toString()))
          .join('|')})$`,
      )),
      (e._zod.parse = (o, i) => {
        const s = o.value
        return (r.has(s) || o.issues.push({ code: 'invalid_value', values: n, input: s, inst: e }), o)
      }))
  }),
  xP = $('$ZodTransform', (e, t) => {
    ;(Ue.init(e, t),
      (e._zod.parse = (n, r) => {
        if (r.direction === 'backward') throw new sm(e.constructor.name)
        const o = t.transform(n.value, n)
        if (r.async) return (o instanceof Promise ? o : Promise.resolve(o)).then((s) => ((n.value = s), n))
        if (o instanceof Promise) throw new Er()
        return ((n.value = o), n)
      }))
  })
function Wd(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e
}
const SP = $('$ZodOptional', (e, t) => {
    ;(Ue.init(e, t),
      (e._zod.optin = 'optional'),
      (e._zod.optout = 'optional'),
      Ee(e._zod, 'values', () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, void 0]) : void 0)),
      Ee(e._zod, 'pattern', () => {
        const n = t.innerType._zod.pattern
        return n ? new RegExp(`^(${bc(n.source)})?$`) : void 0
      }),
      (e._zod.parse = (n, r) => {
        if (t.innerType._zod.optin === 'optional') {
          const o = t.innerType._zod.run(n, r)
          return o instanceof Promise ? o.then((i) => Wd(i, n.value)) : Wd(o, n.value)
        }
        return n.value === void 0 ? n : t.innerType._zod.run(n, r)
      }))
  }),
  CP = $('$ZodNullable', (e, t) => {
    ;(Ue.init(e, t),
      Ee(e._zod, 'optin', () => t.innerType._zod.optin),
      Ee(e._zod, 'optout', () => t.innerType._zod.optout),
      Ee(e._zod, 'pattern', () => {
        const n = t.innerType._zod.pattern
        return n ? new RegExp(`^(${bc(n.source)}|null)$`) : void 0
      }),
      Ee(e._zod, 'values', () => (t.innerType._zod.values ? new Set([...t.innerType._zod.values, null]) : void 0)),
      (e._zod.parse = (n, r) => (n.value === null ? n : t.innerType._zod.run(n, r))))
  }),
  EP = $('$ZodDefault', (e, t) => {
    ;(Ue.init(e, t),
      (e._zod.optin = 'optional'),
      Ee(e._zod, 'values', () => t.innerType._zod.values),
      (e._zod.parse = (n, r) => {
        if (r.direction === 'backward') return t.innerType._zod.run(n, r)
        if (n.value === void 0) return ((n.value = t.defaultValue), n)
        const o = t.innerType._zod.run(n, r)
        return o instanceof Promise ? o.then((i) => Hd(i, t)) : Hd(o, t)
      }))
  })
function Hd(e, t) {
  return (e.value === void 0 && (e.value = t.defaultValue), e)
}
const PP = $('$ZodPrefault', (e, t) => {
    ;(Ue.init(e, t),
      (e._zod.optin = 'optional'),
      Ee(e._zod, 'values', () => t.innerType._zod.values),
      (e._zod.parse = (n, r) => (
        r.direction === 'backward' || (n.value === void 0 && (n.value = t.defaultValue)),
        t.innerType._zod.run(n, r)
      )))
  }),
  RP = $('$ZodNonOptional', (e, t) => {
    ;(Ue.init(e, t),
      Ee(e._zod, 'values', () => {
        const n = t.innerType._zod.values
        return n ? new Set([...n].filter((r) => r !== void 0)) : void 0
      }),
      (e._zod.parse = (n, r) => {
        const o = t.innerType._zod.run(n, r)
        return o instanceof Promise ? o.then((i) => Gd(i, e)) : Gd(o, e)
      }))
  })
function Gd(e, t) {
  return (
    !e.issues.length &&
      e.value === void 0 &&
      e.issues.push({ code: 'invalid_type', expected: 'nonoptional', input: e.value, inst: t }),
    e
  )
}
const TP = $('$ZodCatch', (e, t) => {
    ;(Ue.init(e, t),
      Ee(e._zod, 'optin', () => t.innerType._zod.optin),
      Ee(e._zod, 'optout', () => t.innerType._zod.optout),
      Ee(e._zod, 'values', () => t.innerType._zod.values),
      (e._zod.parse = (n, r) => {
        if (r.direction === 'backward') return t.innerType._zod.run(n, r)
        const o = t.innerType._zod.run(n, r)
        return o instanceof Promise
          ? o.then(
              (i) => (
                (n.value = i.value),
                i.issues.length &&
                  ((n.value = t.catchValue({
                    ...n,
                    error: { issues: i.issues.map((s) => Kn(s, r, Zn())) },
                    input: n.value,
                  })),
                  (n.issues = [])),
                n
              ),
            )
          : ((n.value = o.value),
            o.issues.length &&
              ((n.value = t.catchValue({
                ...n,
                error: { issues: o.issues.map((i) => Kn(i, r, Zn())) },
                input: n.value,
              })),
              (n.issues = [])),
            n)
      }))
  }),
  AP = $('$ZodPipe', (e, t) => {
    ;(Ue.init(e, t),
      Ee(e._zod, 'values', () => t.in._zod.values),
      Ee(e._zod, 'optin', () => t.in._zod.optin),
      Ee(e._zod, 'optout', () => t.out._zod.optout),
      Ee(e._zod, 'propValues', () => t.in._zod.propValues),
      (e._zod.parse = (n, r) => {
        if (r.direction === 'backward') {
          const i = t.out._zod.run(n, r)
          return i instanceof Promise ? i.then((s) => di(s, t.in, r)) : di(i, t.in, r)
        }
        const o = t.in._zod.run(n, r)
        return o instanceof Promise ? o.then((i) => di(i, t.out, r)) : di(o, t.out, r)
      }))
  })
function di(e, t, n) {
  return e.issues.length ? ((e.aborted = !0), e) : t._zod.run({ value: e.value, issues: e.issues }, n)
}
const _P = $('$ZodReadonly', (e, t) => {
  ;(Ue.init(e, t),
    Ee(e._zod, 'propValues', () => t.innerType._zod.propValues),
    Ee(e._zod, 'values', () => t.innerType._zod.values),
    Ee(e._zod, 'optin', () => t.innerType._zod.optin),
    Ee(e._zod, 'optout', () => t.innerType._zod.optout),
    (e._zod.parse = (n, r) => {
      if (r.direction === 'backward') return t.innerType._zod.run(n, r)
      const o = t.innerType._zod.run(n, r)
      return o instanceof Promise ? o.then(Zd) : Zd(o)
    }))
})
function Zd(e) {
  return ((e.value = Object.freeze(e.value)), e)
}
const MP = $('$ZodCustom', (e, t) => {
  ;(Jt.init(e, t),
    Ue.init(e, t),
    (e._zod.parse = (n, r) => n),
    (e._zod.check = (n) => {
      const r = n.value,
        o = t.fn(r)
      if (o instanceof Promise) return o.then((i) => Kd(i, n, r, e))
      Kd(o, n, r, e)
    }))
})
function Kd(e, t, n, r) {
  if (!e) {
    const o = { code: 'custom', input: n, inst: r, path: [...(r._zod.def.path ?? [])], continue: !r._zod.def.abort }
    ;(r._zod.def.params && (o.params = r._zod.def.params), t.issues.push(So(o)))
  }
}
class kP {
  constructor() {
    ;((this._map = new WeakMap()), (this._idmap = new Map()))
  }
  add(t, ...n) {
    const r = n[0]
    if ((this._map.set(t, r), r && typeof r == 'object' && 'id' in r)) {
      if (this._idmap.has(r.id)) throw new Error(`ID ${r.id} already exists in the registry`)
      this._idmap.set(r.id, t)
    }
    return this
  }
  clear() {
    return ((this._map = new WeakMap()), (this._idmap = new Map()), this)
  }
  remove(t) {
    const n = this._map.get(t)
    return (n && typeof n == 'object' && 'id' in n && this._idmap.delete(n.id), this._map.delete(t), this)
  }
  get(t) {
    const n = t._zod.parent
    if (n) {
      const r = { ...(this.get(n) ?? {}) }
      delete r.id
      const o = { ...r, ...this._map.get(t) }
      return Object.keys(o).length ? o : void 0
    }
    return this._map.get(t)
  }
  has(t) {
    return this._map.has(t)
  }
}
function DP() {
  return new kP()
}
const fi = DP()
function IP(e, t) {
  return new e({ type: 'string', ...fe(t) })
}
function OP(e, t) {
  return new e({ type: 'string', format: 'email', check: 'string_format', abort: !1, ...fe(t) })
}
function Yd(e, t) {
  return new e({ type: 'string', format: 'guid', check: 'string_format', abort: !1, ...fe(t) })
}
function NP(e, t) {
  return new e({ type: 'string', format: 'uuid', check: 'string_format', abort: !1, ...fe(t) })
}
function LP(e, t) {
  return new e({ type: 'string', format: 'uuid', check: 'string_format', abort: !1, version: 'v4', ...fe(t) })
}
function jP(e, t) {
  return new e({ type: 'string', format: 'uuid', check: 'string_format', abort: !1, version: 'v6', ...fe(t) })
}
function $P(e, t) {
  return new e({ type: 'string', format: 'uuid', check: 'string_format', abort: !1, version: 'v7', ...fe(t) })
}
function FP(e, t) {
  return new e({ type: 'string', format: 'url', check: 'string_format', abort: !1, ...fe(t) })
}
function zP(e, t) {
  return new e({ type: 'string', format: 'emoji', check: 'string_format', abort: !1, ...fe(t) })
}
function VP(e, t) {
  return new e({ type: 'string', format: 'nanoid', check: 'string_format', abort: !1, ...fe(t) })
}
function BP(e, t) {
  return new e({ type: 'string', format: 'cuid', check: 'string_format', abort: !1, ...fe(t) })
}
function UP(e, t) {
  return new e({ type: 'string', format: 'cuid2', check: 'string_format', abort: !1, ...fe(t) })
}
function WP(e, t) {
  return new e({ type: 'string', format: 'ulid', check: 'string_format', abort: !1, ...fe(t) })
}
function HP(e, t) {
  return new e({ type: 'string', format: 'xid', check: 'string_format', abort: !1, ...fe(t) })
}
function GP(e, t) {
  return new e({ type: 'string', format: 'ksuid', check: 'string_format', abort: !1, ...fe(t) })
}
function ZP(e, t) {
  return new e({ type: 'string', format: 'ipv4', check: 'string_format', abort: !1, ...fe(t) })
}
function KP(e, t) {
  return new e({ type: 'string', format: 'ipv6', check: 'string_format', abort: !1, ...fe(t) })
}
function YP(e, t) {
  return new e({ type: 'string', format: 'cidrv4', check: 'string_format', abort: !1, ...fe(t) })
}
function XP(e, t) {
  return new e({ type: 'string', format: 'cidrv6', check: 'string_format', abort: !1, ...fe(t) })
}
function qP(e, t) {
  return new e({ type: 'string', format: 'base64', check: 'string_format', abort: !1, ...fe(t) })
}
function JP(e, t) {
  return new e({ type: 'string', format: 'base64url', check: 'string_format', abort: !1, ...fe(t) })
}
function QP(e, t) {
  return new e({ type: 'string', format: 'e164', check: 'string_format', abort: !1, ...fe(t) })
}
function eR(e, t) {
  return new e({ type: 'string', format: 'jwt', check: 'string_format', abort: !1, ...fe(t) })
}
function tR(e, t) {
  return new e({
    type: 'string',
    format: 'datetime',
    check: 'string_format',
    offset: !1,
    local: !1,
    precision: null,
    ...fe(t),
  })
}
function nR(e, t) {
  return new e({ type: 'string', format: 'date', check: 'string_format', ...fe(t) })
}
function rR(e, t) {
  return new e({ type: 'string', format: 'time', check: 'string_format', precision: null, ...fe(t) })
}
function oR(e, t) {
  return new e({ type: 'string', format: 'duration', check: 'string_format', ...fe(t) })
}
function iR(e) {
  return new e({ type: 'unknown' })
}
function sR(e, t) {
  return new e({ type: 'never', ...fe(t) })
}
function wm(e, t) {
  return new ME({ check: 'max_length', ...fe(t), maximum: e })
}
function Ki(e, t) {
  return new kE({ check: 'min_length', ...fe(t), minimum: e })
}
function xm(e, t) {
  return new DE({ check: 'length_equals', ...fe(t), length: e })
}
function aR(e, t) {
  return new IE({ check: 'string_format', format: 'regex', ...fe(t), pattern: e })
}
function lR(e) {
  return new OE({ check: 'string_format', format: 'lowercase', ...fe(e) })
}
function cR(e) {
  return new NE({ check: 'string_format', format: 'uppercase', ...fe(e) })
}
function uR(e, t) {
  return new LE({ check: 'string_format', format: 'includes', ...fe(t), includes: e })
}
function dR(e, t) {
  return new jE({ check: 'string_format', format: 'starts_with', ...fe(t), prefix: e })
}
function fR(e, t) {
  return new $E({ check: 'string_format', format: 'ends_with', ...fe(t), suffix: e })
}
function zo(e) {
  return new FE({ check: 'overwrite', tx: e })
}
function hR(e) {
  return zo((t) => t.normalize(e))
}
function pR() {
  return zo((e) => e.trim())
}
function mR() {
  return zo((e) => e.toLowerCase())
}
function gR() {
  return zo((e) => e.toUpperCase())
}
function yR(e, t, n) {
  return new e({ type: 'array', element: t, ...fe(n) })
}
function vR(e, t, n) {
  return new e({ type: 'custom', check: 'custom', fn: t, ...fe(n) })
}
function bR(e) {
  const t = wR(
    (n) => (
      (n.addIssue = (r) => {
        if (typeof r == 'string') n.issues.push(So(r, n.value, t._zod.def))
        else {
          const o = r
          ;(o.fatal && (o.continue = !1),
            o.code ?? (o.code = 'custom'),
            o.input ?? (o.input = n.value),
            o.inst ?? (o.inst = t),
            o.continue ?? (o.continue = !t._zod.def.abort),
            n.issues.push(So(o)))
        }
      }),
      e(n.value, n)
    ),
  )
  return t
}
function wR(e, t) {
  const n = new Jt({ check: 'custom', ...fe(t) })
  return ((n._zod.check = e), n)
}
const xR = $('ZodISODateTime', (e, t) => {
  ;(QE.init(e, t), De.init(e, t))
})
function SR(e) {
  return tR(xR, e)
}
const CR = $('ZodISODate', (e, t) => {
  ;(eP.init(e, t), De.init(e, t))
})
function ER(e) {
  return nR(CR, e)
}
const PR = $('ZodISOTime', (e, t) => {
  ;(tP.init(e, t), De.init(e, t))
})
function RR(e) {
  return rR(PR, e)
}
const TR = $('ZodISODuration', (e, t) => {
  ;(nP.init(e, t), De.init(e, t))
})
function AR(e) {
  return oR(TR, e)
}
const _R = (e, t) => {
    ;(fm.init(e, t),
      (e.name = 'ZodError'),
      Object.defineProperties(e, {
        format: { value: (n) => YC(e, n) },
        flatten: { value: (n) => KC(e, n) },
        addIssue: {
          value: (n) => {
            ;(e.issues.push(n), (e.message = JSON.stringify(e.issues, nl, 2)))
          },
        },
        addIssues: {
          value: (n) => {
            ;(e.issues.push(...n), (e.message = JSON.stringify(e.issues, nl, 2)))
          },
        },
        isEmpty: {
          get() {
            return e.issues.length === 0
          },
        },
      }))
  },
  Pt = $('ZodError', _R, { Parent: Error }),
  MR = xc(Pt),
  kR = Sc(Pt),
  DR = ws(Pt),
  IR = xs(Pt),
  OR = JC(Pt),
  NR = QC(Pt),
  LR = eE(Pt),
  jR = tE(Pt),
  $R = nE(Pt),
  FR = rE(Pt),
  zR = oE(Pt),
  VR = iE(Pt),
  Ge = $(
    'ZodType',
    (e, t) => (
      Ue.init(e, t),
      (e.def = t),
      (e.type = t.type),
      Object.defineProperty(e, '_def', { value: t }),
      (e.check = (...n) =>
        e.clone(
          tr(t, {
            checks: [
              ...(t.checks ?? []),
              ...n.map((r) =>
                typeof r == 'function' ? { _zod: { check: r, def: { check: 'custom' }, onattach: [] } } : r,
              ),
            ],
          }),
        )),
      (e.clone = (n, r) => Tn(e, n, r)),
      (e.brand = () => e),
      (e.register = (n, r) => (n.add(e, r), e)),
      (e.parse = (n, r) => MR(e, n, r, { callee: e.parse })),
      (e.safeParse = (n, r) => DR(e, n, r)),
      (e.parseAsync = async (n, r) => kR(e, n, r, { callee: e.parseAsync })),
      (e.safeParseAsync = async (n, r) => IR(e, n, r)),
      (e.spa = e.safeParseAsync),
      (e.encode = (n, r) => OR(e, n, r)),
      (e.decode = (n, r) => NR(e, n, r)),
      (e.encodeAsync = async (n, r) => LR(e, n, r)),
      (e.decodeAsync = async (n, r) => jR(e, n, r)),
      (e.safeEncode = (n, r) => $R(e, n, r)),
      (e.safeDecode = (n, r) => FR(e, n, r)),
      (e.safeEncodeAsync = async (n, r) => zR(e, n, r)),
      (e.safeDecodeAsync = async (n, r) => VR(e, n, r)),
      (e.refine = (n, r) => e.check(kT(n, r))),
      (e.superRefine = (n) => e.check(DT(n))),
      (e.overwrite = (n) => e.check(zo(n))),
      (e.optional = () => Jd(e)),
      (e.nullable = () => Qd(e)),
      (e.nullish = () => Jd(Qd(e))),
      (e.nonoptional = (n) => ET(e, n)),
      (e.array = () => uT(e)),
      (e.or = (n) => hT([e, n])),
      (e.and = (n) => mT(e, n)),
      (e.transform = (n) => ef(e, vT(n))),
      (e.default = (n) => xT(e, n)),
      (e.prefault = (n) => CT(e, n)),
      (e.catch = (n) => RT(e, n)),
      (e.pipe = (n) => ef(e, n)),
      (e.readonly = () => _T(e)),
      (e.describe = (n) => {
        const r = e.clone()
        return (fi.add(r, { description: n }), r)
      }),
      Object.defineProperty(e, 'description', {
        get() {
          return fi.get(e)?.description
        },
        configurable: !0,
      }),
      (e.meta = (...n) => {
        if (n.length === 0) return fi.get(e)
        const r = e.clone()
        return (fi.add(r, n[0]), r)
      }),
      (e.isOptional = () => e.safeParse(void 0).success),
      (e.isNullable = () => e.safeParse(null).success),
      e
    ),
  ),
  Sm = $('_ZodString', (e, t) => {
    ;(Cc.init(e, t), Ge.init(e, t))
    const n = e._zod.bag
    ;((e.format = n.format ?? null),
      (e.minLength = n.minimum ?? null),
      (e.maxLength = n.maximum ?? null),
      (e.regex = (...r) => e.check(aR(...r))),
      (e.includes = (...r) => e.check(uR(...r))),
      (e.startsWith = (...r) => e.check(dR(...r))),
      (e.endsWith = (...r) => e.check(fR(...r))),
      (e.min = (...r) => e.check(Ki(...r))),
      (e.max = (...r) => e.check(wm(...r))),
      (e.length = (...r) => e.check(xm(...r))),
      (e.nonempty = (...r) => e.check(Ki(1, ...r))),
      (e.lowercase = (r) => e.check(lR(r))),
      (e.uppercase = (r) => e.check(cR(r))),
      (e.trim = () => e.check(pR())),
      (e.normalize = (...r) => e.check(hR(...r))),
      (e.toLowerCase = () => e.check(mR())),
      (e.toUpperCase = () => e.check(gR())))
  }),
  BR = $('ZodString', (e, t) => {
    ;(Cc.init(e, t),
      Sm.init(e, t),
      (e.email = (n) => e.check(OP(UR, n))),
      (e.url = (n) => e.check(FP(WR, n))),
      (e.jwt = (n) => e.check(eR(iT, n))),
      (e.emoji = (n) => e.check(zP(HR, n))),
      (e.guid = (n) => e.check(Yd(Xd, n))),
      (e.uuid = (n) => e.check(NP(hi, n))),
      (e.uuidv4 = (n) => e.check(LP(hi, n))),
      (e.uuidv6 = (n) => e.check(jP(hi, n))),
      (e.uuidv7 = (n) => e.check($P(hi, n))),
      (e.nanoid = (n) => e.check(VP(GR, n))),
      (e.guid = (n) => e.check(Yd(Xd, n))),
      (e.cuid = (n) => e.check(BP(ZR, n))),
      (e.cuid2 = (n) => e.check(UP(KR, n))),
      (e.ulid = (n) => e.check(WP(YR, n))),
      (e.base64 = (n) => e.check(qP(nT, n))),
      (e.base64url = (n) => e.check(JP(rT, n))),
      (e.xid = (n) => e.check(HP(XR, n))),
      (e.ksuid = (n) => e.check(GP(qR, n))),
      (e.ipv4 = (n) => e.check(ZP(JR, n))),
      (e.ipv6 = (n) => e.check(KP(QR, n))),
      (e.cidrv4 = (n) => e.check(YP(eT, n))),
      (e.cidrv6 = (n) => e.check(XP(tT, n))),
      (e.e164 = (n) => e.check(QP(oT, n))),
      (e.datetime = (n) => e.check(SR(n))),
      (e.date = (n) => e.check(ER(n))),
      (e.time = (n) => e.check(RR(n))),
      (e.duration = (n) => e.check(AR(n))))
  })
function Yi(e) {
  return IP(BR, e)
}
const De = $('ZodStringFormat', (e, t) => {
    ;(_e.init(e, t), Sm.init(e, t))
  }),
  UR = $('ZodEmail', (e, t) => {
    ;(WE.init(e, t), De.init(e, t))
  }),
  Xd = $('ZodGUID', (e, t) => {
    ;(BE.init(e, t), De.init(e, t))
  }),
  hi = $('ZodUUID', (e, t) => {
    ;(UE.init(e, t), De.init(e, t))
  }),
  WR = $('ZodURL', (e, t) => {
    ;(HE.init(e, t), De.init(e, t))
  }),
  HR = $('ZodEmoji', (e, t) => {
    ;(GE.init(e, t), De.init(e, t))
  }),
  GR = $('ZodNanoID', (e, t) => {
    ;(ZE.init(e, t), De.init(e, t))
  }),
  ZR = $('ZodCUID', (e, t) => {
    ;(KE.init(e, t), De.init(e, t))
  }),
  KR = $('ZodCUID2', (e, t) => {
    ;(YE.init(e, t), De.init(e, t))
  }),
  YR = $('ZodULID', (e, t) => {
    ;(XE.init(e, t), De.init(e, t))
  }),
  XR = $('ZodXID', (e, t) => {
    ;(qE.init(e, t), De.init(e, t))
  }),
  qR = $('ZodKSUID', (e, t) => {
    ;(JE.init(e, t), De.init(e, t))
  }),
  JR = $('ZodIPv4', (e, t) => {
    ;(rP.init(e, t), De.init(e, t))
  }),
  QR = $('ZodIPv6', (e, t) => {
    ;(oP.init(e, t), De.init(e, t))
  }),
  eT = $('ZodCIDRv4', (e, t) => {
    ;(iP.init(e, t), De.init(e, t))
  }),
  tT = $('ZodCIDRv6', (e, t) => {
    ;(sP.init(e, t), De.init(e, t))
  }),
  nT = $('ZodBase64', (e, t) => {
    ;(aP.init(e, t), De.init(e, t))
  }),
  rT = $('ZodBase64URL', (e, t) => {
    ;(cP.init(e, t), De.init(e, t))
  }),
  oT = $('ZodE164', (e, t) => {
    ;(uP.init(e, t), De.init(e, t))
  }),
  iT = $('ZodJWT', (e, t) => {
    ;(fP.init(e, t), De.init(e, t))
  }),
  sT = $('ZodUnknown', (e, t) => {
    ;(hP.init(e, t), Ge.init(e, t))
  })
function qd() {
  return iR(sT)
}
const aT = $('ZodNever', (e, t) => {
  ;(pP.init(e, t), Ge.init(e, t))
})
function lT(e) {
  return sR(aT, e)
}
const cT = $('ZodArray', (e, t) => {
  ;(mP.init(e, t),
    Ge.init(e, t),
    (e.element = t.element),
    (e.min = (n, r) => e.check(Ki(n, r))),
    (e.nonempty = (n) => e.check(Ki(1, n))),
    (e.max = (n, r) => e.check(wm(n, r))),
    (e.length = (n, r) => e.check(xm(n, r))),
    (e.unwrap = () => e.element))
})
function uT(e, t) {
  return yR(cT, e, t)
}
const dT = $('ZodObject', (e, t) => {
  ;(yP.init(e, t),
    Ge.init(e, t),
    Ee(e, 'shape', () => t.shape),
    (e.keyof = () => gT(Object.keys(e._zod.def.shape))),
    (e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n })),
    (e.passthrough = () => e.clone({ ...e._zod.def, catchall: qd() })),
    (e.loose = () => e.clone({ ...e._zod.def, catchall: qd() })),
    (e.strict = () => e.clone({ ...e._zod.def, catchall: lT() })),
    (e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 })),
    (e.extend = (n) => UC(e, n)),
    (e.safeExtend = (n) => WC(e, n)),
    (e.merge = (n) => HC(e, n)),
    (e.pick = (n) => VC(e, n)),
    (e.omit = (n) => BC(e, n)),
    (e.partial = (...n) => GC(Cm, e, n[0])),
    (e.required = (...n) => ZC(Em, e, n[0])))
})
function Ec(e, t) {
  const n = { type: 'object', shape: e ?? {}, ...fe(t) }
  return new dT(n)
}
const fT = $('ZodUnion', (e, t) => {
  ;(vP.init(e, t), Ge.init(e, t), (e.options = t.options))
})
function hT(e, t) {
  return new fT({ type: 'union', options: e, ...fe(t) })
}
const pT = $('ZodIntersection', (e, t) => {
  ;(bP.init(e, t), Ge.init(e, t))
})
function mT(e, t) {
  return new pT({ type: 'intersection', left: e, right: t })
}
const ol = $('ZodEnum', (e, t) => {
  ;(wP.init(e, t), Ge.init(e, t), (e.enum = t.entries), (e.options = Object.values(t.entries)))
  const n = new Set(Object.keys(t.entries))
  ;((e.extract = (r, o) => {
    const i = {}
    for (const s of r)
      if (n.has(s)) i[s] = t.entries[s]
      else throw new Error(`Key ${s} not found in enum`)
    return new ol({ ...t, checks: [], ...fe(o), entries: i })
  }),
    (e.exclude = (r, o) => {
      const i = { ...t.entries }
      for (const s of r)
        if (n.has(s)) delete i[s]
        else throw new Error(`Key ${s} not found in enum`)
      return new ol({ ...t, checks: [], ...fe(o), entries: i })
    }))
})
function gT(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e
  return new ol({ type: 'enum', entries: n, ...fe(t) })
}
const yT = $('ZodTransform', (e, t) => {
  ;(xP.init(e, t),
    Ge.init(e, t),
    (e._zod.parse = (n, r) => {
      if (r.direction === 'backward') throw new sm(e.constructor.name)
      n.addIssue = (i) => {
        if (typeof i == 'string') n.issues.push(So(i, n.value, t))
        else {
          const s = i
          ;(s.fatal && (s.continue = !1),
            s.code ?? (s.code = 'custom'),
            s.input ?? (s.input = n.value),
            s.inst ?? (s.inst = e),
            n.issues.push(So(s)))
        }
      }
      const o = t.transform(n.value, n)
      return o instanceof Promise ? o.then((i) => ((n.value = i), n)) : ((n.value = o), n)
    }))
})
function vT(e) {
  return new yT({ type: 'transform', transform: e })
}
const Cm = $('ZodOptional', (e, t) => {
  ;(SP.init(e, t), Ge.init(e, t), (e.unwrap = () => e._zod.def.innerType))
})
function Jd(e) {
  return new Cm({ type: 'optional', innerType: e })
}
const bT = $('ZodNullable', (e, t) => {
  ;(CP.init(e, t), Ge.init(e, t), (e.unwrap = () => e._zod.def.innerType))
})
function Qd(e) {
  return new bT({ type: 'nullable', innerType: e })
}
const wT = $('ZodDefault', (e, t) => {
  ;(EP.init(e, t), Ge.init(e, t), (e.unwrap = () => e._zod.def.innerType), (e.removeDefault = e.unwrap))
})
function xT(e, t) {
  return new wT({
    type: 'default',
    innerType: e,
    get defaultValue() {
      return typeof t == 'function' ? t() : cm(t)
    },
  })
}
const ST = $('ZodPrefault', (e, t) => {
  ;(PP.init(e, t), Ge.init(e, t), (e.unwrap = () => e._zod.def.innerType))
})
function CT(e, t) {
  return new ST({
    type: 'prefault',
    innerType: e,
    get defaultValue() {
      return typeof t == 'function' ? t() : cm(t)
    },
  })
}
const Em = $('ZodNonOptional', (e, t) => {
  ;(RP.init(e, t), Ge.init(e, t), (e.unwrap = () => e._zod.def.innerType))
})
function ET(e, t) {
  return new Em({ type: 'nonoptional', innerType: e, ...fe(t) })
}
const PT = $('ZodCatch', (e, t) => {
  ;(TP.init(e, t), Ge.init(e, t), (e.unwrap = () => e._zod.def.innerType), (e.removeCatch = e.unwrap))
})
function RT(e, t) {
  return new PT({ type: 'catch', innerType: e, catchValue: typeof t == 'function' ? t : () => t })
}
const TT = $('ZodPipe', (e, t) => {
  ;(AP.init(e, t), Ge.init(e, t), (e.in = t.in), (e.out = t.out))
})
function ef(e, t) {
  return new TT({ type: 'pipe', in: e, out: t })
}
const AT = $('ZodReadonly', (e, t) => {
  ;(_P.init(e, t), Ge.init(e, t), (e.unwrap = () => e._zod.def.innerType))
})
function _T(e) {
  return new AT({ type: 'readonly', innerType: e })
}
const MT = $('ZodCustom', (e, t) => {
  ;(MP.init(e, t), Ge.init(e, t))
})
function kT(e, t = {}) {
  return vR(MT, e, t)
}
function DT(e) {
  return bR(e)
}
Ec({ refKey: Yi().min(1) })
Ec({ refKey: Yi().min(1), reaction: Yi().min(1).max(20) })
Ec({ refKey: Yi().min(1) })
class IT {
  constructor(t) {
    this.baseUrl = t
  }
  buildUrl(t) {
    return `${this.baseUrl}${t}`
  }
  async actView(t) {
    return fetch(this.buildUrl('/api/act/views'), {
      method: 'POST',
      body: JSON.stringify(t),
      headers: { 'Content-Type': 'application/json' },
    })
  }
  async actReaction(t) {
    return fetch(this.buildUrl('/api/reactions/add'), {
      method: 'POST',
      body: JSON.stringify(t),
      headers: { 'Content-Type': 'application/json' },
    })
  }
  async analysis(t) {
    const n = new URLSearchParams(t).toString()
    return await fetch(this.buildUrl(`/api/reactions?${n}`), { method: 'GET' }).then((r) => r.json())
  }
}
const OT = new IT(window.location.origin),
  tf = (e) => {
    OC.useApi && OT.actView({ refKey: e })
  },
  Pm = f.createContext(null),
  $F = (e) => {
    const t = de.c(3),
      { children: n, photos: r } = e
    let o
    return (
      t[0] !== n || t[1] !== r
        ? ((o = g.jsx(Pm, { value: r, children: n })), (t[0] = n), (t[1] = r), (t[2] = o))
        : (o = t[2]),
      o
    )
  },
  NT = Et(!1),
  LT = Et(0),
  jT = Et(null),
  $T = _r.getPhotos(),
  Rm = (e, t, n, r, o, i = 'union') => {
    let s = $T
    return (
      e.length > 0 &&
        (s = s.filter((l) =>
          i === 'intersection' ? e.every((c) => l.tags.includes(c)) : e.some((c) => l.tags.includes(c)),
        )),
      t.length > 0 &&
        (s = s.filter((l) => {
          if (!l.exif?.Make || !l.exif?.Model) return !1
          const c = `${l.exif.Make.trim()} ${l.exif.Model.trim()}`
          return t.includes(c)
        })),
      n.length > 0 &&
        (s = s.filter((l) => {
          if (!l.exif?.LensModel) return !1
          const c = l.exif.LensModel.trim(),
            u = l.exif.LensMake?.trim(),
            d = u ? `${u} ${c}` : c
          return n.includes(d)
        })),
      r !== null && (s = s.filter((l) => (l.exif?.Rating ? l.exif.Rating >= r : !1))),
      s.toSorted((l, c) => {
        let u = '',
          d = ''
        return (
          l.exif && l.exif.DateTimeOriginal ? (u = l.exif.DateTimeOriginal) : (u = l.lastModified),
          c.exif && c.exif.DateTimeOriginal ? (d = c.exif.DateTimeOriginal) : (d = c.lastModified),
          o === 'asc' ? u.localeCompare(d) : d.localeCompare(u)
        )
      })
    )
  },
  FF = () => {
    const e = kr.get(cc)
    return Rm(e.selectedTags, e.selectedCameras, e.selectedLenses, e.selectedRatings, e.sortOrder, e.tagFilterMode)
  },
  FT = () => {
    const e = de.c(7),
      {
        sortOrder: t,
        selectedTags: n,
        selectedCameras: r,
        selectedLenses: o,
        selectedRatings: i,
        tagFilterMode: s,
      } = lc(cc)
    let a
    return (
      e[0] !== r || e[1] !== o || e[2] !== i || e[3] !== n || e[4] !== t || e[5] !== s
        ? ((a = Rm(n, r, o, i, t, s)),
          (e[0] = r),
          (e[1] = o),
          (e[2] = i),
          (e[3] = n),
          (e[4] = t),
          (e[5] = s),
          (e[6] = a))
        : (a = e[6]),
      a
    )
  },
  zF = () => {
    const e = f.use(Pm)
    if (!e) throw new Error('PhotosContext is not initialized')
    return e
  },
  zT = () => {
    const e = de.c(18),
      t = FT(),
      [n, r] = Un(NT),
      [o, i] = Un(LT),
      [s, a] = Un(jT),
      l = t[o]?.id
    let c
    e[0] !== l || e[1] !== i || e[2] !== r || e[3] !== a
      ? ((c = (v, w) => {
          ;(i(v), a(w || null), r(!0), (document.body.style.overflow = 'hidden'), tf(l))
        }),
        (e[0] = l),
        (e[1] = i),
        (e[2] = r),
        (e[3] = a),
        (e[4] = c))
      : (c = e[4])
    const u = c
    let d
    e[5] !== r || e[6] !== a
      ? ((d = () => {
          ;(r(!1), a(null), (document.body.style.overflow = ''))
        }),
        (e[5] = r),
        (e[6] = a),
        (e[7] = d))
      : (d = e[7])
    const h = d
    let p
    e[8] !== t || e[9] !== i
      ? ((p = (v) => {
          v >= 0 && v < t.length && (i(v), tf(t[v].id))
        }),
        (e[8] = t),
        (e[9] = i),
        (e[10] = p))
      : (p = e[10])
    const m = p
    let y
    return (
      e[11] !== h || e[12] !== o || e[13] !== m || e[14] !== n || e[15] !== u || e[16] !== s
        ? ((y = { isOpen: n, currentIndex: o, triggerElement: s, openViewer: u, closeViewer: h, goToIndex: m }),
          (e[11] = h),
          (e[12] = o),
          (e[13] = m),
          (e[14] = n),
          (e[15] = u),
          (e[16] = s),
          (e[17] = y))
        : (y = e[17]),
      y
    )
  }
function VF(e) {
  const t = de.c(3)
  let n
  t[0] === Symbol.for('react.memo_cache_sentinel')
    ? ((n = g.jsx('path', {
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        d: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m.6 3h10.55M6.551 4.938l3.26 10.034m7.221-10.336l-8.535 6.201m12.062 3.673l-8.535-6.201m.233 12.607l3.261-10.034',
      })),
      (t[0] = n))
    : (n = t[0])
  let r
  return (
    t[1] !== e
      ? ((r = g.jsx('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          viewBox: '0 0 24 24',
          ...e,
          children: n,
        })),
        (t[1] = e),
        (t[2] = r))
      : (r = t[2]),
    r
  )
}
function BF(e) {
  const t = de.c(4)
  let n, r
  t[0] === Symbol.for('react.memo_cache_sentinel')
    ? ((n = g.jsx('path', {
        fill: 'currentColor',
        d: 'M24 21h-3a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2m-3-8v6h3v-6zm-6 8h-5v-2h5v-2h-3a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h5v2h-5v2h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2M6 11h2v10H6z',
      })),
      (r = g.jsx('path', {
        fill: 'currentColor',
        d: 'M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2M4 24V8h24v16Z',
      })),
      (t[0] = n),
      (t[1] = r))
    : ((n = t[0]), (r = t[1]))
  let o
  return (
    t[2] !== e
      ? ((o = g.jsxs('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          viewBox: '0 0 32 32',
          ...e,
          children: [n, r],
        })),
        (t[2] = e),
        (t[3] = o))
      : (o = t[3]),
    o
  )
}
function UF(e) {
  const t = de.c(3)
  let n
  t[0] === Symbol.for('react.memo_cache_sentinel')
    ? ((n = g.jsx('path', {
        fill: 'currentColor',
        d: 'M9 3V1h6v2zm3 19q-1.875 0-3.512-.712T5.625 19.35T3.7 16.487T3 13t.713-3.488T5.65 6.65t2.863-1.937T12 4q1.575 0 3 .525T17.6 6l1.45-1.45l1.4 1.4l-1.4 1.45q.9 1.175 1.425 2.6T21 13q0 1.85-.7 3.488t-1.925 2.862t-2.863 1.938T12 22m0-2q2.925 0 4.963-2.037T19 13t-2.037-4.962T12 6T7.038 8.038T5 13t2.038 4.963T12 20m0-9h5.65q-.45-1.275-1.4-2.238T14.1 7.375zm-1.725 1L13.1 7.1q-1.275-.25-2.562.075t-2.363 1.2zM6.1 14h4.175L7.45 9.1q-.875.975-1.225 2.263T6.1 14m3.8 4.625L12 15H6.35q.425 1.25 1.388 2.225t2.162 1.4m1 .275q1.425.275 2.725-.112t2.2-1.163L13.725 14zm5.65-2q.9-1.025 1.238-2.287T17.9 12h-4.175z',
      })),
      (t[0] = n))
    : (n = t[0])
  let r
  return (
    t[1] !== e
      ? ((r = g.jsx('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          viewBox: '0 0 24 24',
          ...e,
          children: n,
        })),
        (t[1] = e),
        (t[2] = r))
      : (r = t[2]),
    r
  )
}
function WF(e) {
  const t = de.c(3)
  let n
  t[0] === Symbol.for('react.memo_cache_sentinel')
    ? ((n = g.jsxs('g', {
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        children: [
          g.jsx('circle', { cx: '7', cy: '7', r: '6.5' }),
          g.jsx('circle', { cx: '7', cy: '7', r: '2.5' }),
          g.jsx('path', { d: 'M4.5 7V1M7 4.5h6M9.5 7v6M7 9.5H1' }),
        ],
      })),
      (t[0] = n))
    : (n = t[0])
  let r
  return (
    t[1] !== e
      ? ((r = g.jsx('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          viewBox: '0 0 14 14',
          ...e,
          children: n,
        })),
        (t[1] = e),
        (t[2] = r))
      : (r = t[2]),
    r
  )
}
function HF(e) {
  const t = de.c(3)
  let n
  t[0] === Symbol.for('react.memo_cache_sentinel')
    ? ((n = g.jsx('path', {
        fill: 'currentColor',
        d: 'M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V5zm9.5-1v-2h-2v-1.5h2v-2H16v2h2V16h-2v2zM6 8.5h5V7H6z',
      })),
      (t[0] = n))
    : (n = t[0])
  let r
  return (
    t[1] !== e
      ? ((r = g.jsx('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          viewBox: '0 0 24 24',
          ...e,
          children: n,
        })),
        (t[1] = e),
        (t[2] = r))
      : (r = t[2]),
    r
  )
}
function VT(e) {
  const t = de.c(3)
  let n
  t[0] === Symbol.for('react.memo_cache_sentinel')
    ? ((n = g.jsxs('g', {
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '1.5',
        children: [
          g.jsx('path', { d: 'M12 21.5a9.5 9.5 0 1 0 0-19a9.5 9.5 0 0 0 0 19' }),
          g.jsx('path', {
            d: 'M16.113 14.375v-4.75L12 7.25L7.886 9.625v4.75L12 16.75zm1.255-10.213L12.01 7.25m9.462 5.425l-5.359-3.05m0 10.935v-6.185m-9.49 5.453l5.368-3.078m-9.462-5.443l5.358 3.068M7.886 3.44v6.185',
          }),
        ],
      })),
      (t[0] = n))
    : (n = t[0])
  let r
  return (
    t[1] !== e
      ? ((r = g.jsx('svg', {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '1em',
          height: '1em',
          viewBox: '0 0 24 24',
          ...e,
          children: n,
        })),
        (t[1] = e),
        (t[2] = r))
      : (r = t[2]),
    r
  )
}
const pa = _r.getAllTags(),
  nf = _r.getAllCameras(),
  rf = _r.getAllLenses(),
  BT = (e, t) => {
    const n = e.toLowerCase(),
      r = t.toLowerCase()
    if (n.includes(r)) return !0
    let o = 0
    for (let i = 0; i < n.length && o < r.length; i++) n[i] === r[o] && o++
    return o === r.length
  },
  UT = (e, t) => {
    const n = t.trim().toLowerCase()
    return n
      ? e.filter((r) => {
          const o = r.title?.toLowerCase().includes(n),
            i = r.description?.toLowerCase().includes(n),
            s = r.tags?.some((c) => c.toLowerCase().includes(n)),
            a = r.exif?.Make?.toLowerCase().includes(n) || r.exif?.Model?.toLowerCase().includes(n),
            l = r.exif?.LensModel?.toLowerCase().includes(n)
          return o || i || s || a || l
        })
      : []
  },
  WT = ({ isOpen: e, onClose: t }) => {
    const { t: n } = Kw(),
      [r, o] = Un(cc),
      i = jo(),
      { openViewer: s } = zT(),
      [a, l] = f.useState(''),
      [c, u] = f.useState(0),
      d = f.useRef(null),
      h = f.useRef(null),
      p = f.useCallback(
        (b) => {
          o((x) => ({ ...x, tagFilterMode: b }))
        },
        [o],
      ),
      m = f.useCallback(() => {
        ;(l(''),
          u(0),
          o((b) => ({
            ...b,
            selectedTags: [],
            selectedCameras: [],
            selectedLenses: [],
            selectedRatings: null,
            tagFilterMode: 'union',
          })))
      }, [o])
    ;(f.useEffect(() => {
      if (e) {
        ;(l(''), u(0))
        const b = setTimeout(() => d.current?.focus(), 50)
        return () => clearTimeout(b)
      }
    }, [e]),
      f.useEffect(() => {
        const b = (x) => {
          x.key === 'Escape' && e && t()
        }
        return (window.addEventListener('keydown', b), () => window.removeEventListener('keydown', b))
      }, [e, t]))
    const y = f.useMemo(() => {
        const b = []
        if (
          (pa.length > 0 &&
            pa.forEach((E) => {
              const C = r.selectedTags.includes(E)
              b.push({
                id: `tag-${E}`,
                type: 'filter',
                title: E,
                subtitle: n('action.tag.filter'),
                icon: 'i-mingcute-tag-line',
                active: C,
                action: () => {
                  o((A) => ({ ...A, selectedTags: C ? A.selectedTags.filter((S) => S !== E) : [...A.selectedTags, E] }))
                },
                keywords: ['tag', 'filter', E],
              })
            }),
          nf.length > 0 &&
            nf.forEach((E) => {
              const C = r.selectedCameras.includes(E.displayName)
              b.push({
                id: `camera-${E.displayName}`,
                type: 'filter',
                title: E.displayName,
                subtitle: n('action.camera.filter'),
                icon: 'i-mingcute-camera-line',
                active: C,
                action: () => {
                  o((A) => ({
                    ...A,
                    selectedCameras: C
                      ? A.selectedCameras.filter((S) => S !== E.displayName)
                      : [...A.selectedCameras, E.displayName],
                  }))
                },
                keywords: ['camera', 'filter', E.displayName, E.make, E.model],
              })
            }),
          rf.length > 0 &&
            rf.forEach((E) => {
              const C = r.selectedLenses.includes(E.displayName)
              b.push({
                id: `lens-${E.displayName}`,
                type: 'filter',
                title: E.displayName,
                subtitle: n('action.lens.filter'),
                icon: g.jsx(VT, {}),
                active: C,
                action: () => {
                  o((A) => ({
                    ...A,
                    selectedLenses: C
                      ? A.selectedLenses.filter((S) => S !== E.displayName)
                      : [...A.selectedLenses, E.displayName],
                  }))
                },
                keywords: ['lens', 'filter', E.displayName],
              })
            }),
          pa.length > 0)
        ) {
          const E = r.tagFilterMode === 'union'
          b.push({
            id: 'tag-filter-mode-toggle',
            type: 'action',
            title: n(E ? 'action.tag.match.any' : 'action.tag.match.all'),
            subtitle: n('action.tag.match.label'),
            icon: 'i-mingcute-switch-line',
            badge: n(E ? 'action.tag.mode.or' : 'action.tag.mode.and'),
            action: () => p(E ? 'intersection' : 'union'),
            keywords: ['tag', 'filter', 'mode', 'toggle'],
          })
        }
        for (let E = 1; E <= 5; E++) {
          const C = r.selectedRatings === E
          b.push({
            id: `rating-${E}`,
            type: 'filter',
            title: n('action.rating.filter-above', { rating: E }),
            subtitle: n('action.rating.filter'),
            icon: 'i-mingcute-star-line',
            active: C,
            action: () => {
              o((A) => ({ ...A, selectedRatings: C ? null : E }))
            },
            keywords: ['rating', 'filter', 'star', E.toString()],
          })
        }
        return (
          (r.selectedTags.length > 0 ||
            r.selectedCameras.length > 0 ||
            r.selectedLenses.length > 0 ||
            r.selectedRatings !== null) &&
            b.push({
              id: 'clear-filters',
              type: 'action',
              title: n('action.search.clear'),
              subtitle: 'Clear all active filters',
              icon: 'i-mingcute-close-line',
              action: () => {
                o((E) => ({
                  ...E,
                  selectedTags: [],
                  selectedCameras: [],
                  selectedLenses: [],
                  selectedRatings: null,
                  tagFilterMode: 'union',
                }))
              },
              keywords: ['clear', 'reset', 'remove', 'filter'],
            }),
          a.trim() &&
            UT(_r.getPhotos(), a)
              .slice(0, 10)
              .forEach((C) => {
                b.push({
                  id: `photo-${C.id}`,
                  type: 'photo',
                  title: C.title || C.id,
                  subtitle: C.description || `${C.exif?.Model || 'Photo'}`,
                  icon: g.jsx('img', {
                    src: C.thumbnailUrl,
                    alt: C.title || 'Photo',
                    className: 'h-6 w-6 rounded object-cover',
                  }),
                  action: () => {
                    const S = _r.getPhotos().findIndex((R) => R.id === C.id)
                    S !== -1 && (s(S), i(`/photos/${C.id}`), t())
                  },
                  keywords: [C.title, C.description, ...(C.tags || [])].filter(Boolean),
                })
              }),
          b
        )
      }, [n, r, a, i, t, o, s, p]),
      v = f.useMemo(() => {
        if (!a.trim()) {
          const b = y.filter((C) => C.active),
            x = y.filter((C) => C.type === 'filter'),
            E = new Map()
          return (
            b.forEach((C) => E.set(C.id, C)),
            x.forEach((C) => {
              E.has(C.id) || E.set(C.id, C)
            }),
            Array.from(E.values()).slice(0, 30)
          )
        }
        return y
          .filter((b) => {
            const x = `${b.title} ${b.subtitle || ''} ${b.keywords?.join(' ') || ''}`
            return BT(x, a)
          })
          .slice(0, 20)
      }, [y, a]),
      w = f.useCallback(
        (b) => {
          switch (b.key) {
            case 'ArrowDown': {
              ;(b.preventDefault(), u((x) => Math.min(x + 1, v.length - 1)))
              break
            }
            case 'ArrowUp': {
              ;(b.preventDefault(), u((x) => Math.max(x - 1, 0)))
              break
            }
            case 'Enter': {
              ;(b.preventDefault(), v[c] && v[c].action())
              break
            }
          }
        },
        [v, c],
      )
    return (
      f.useEffect(() => {
        const b = h.current?.children[c]
        b && b.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }, [c]),
      f.useEffect(() => {
        u(0)
      }, [v.length]),
      e
        ? g.jsxs('div', {
            className: 'fixed inset-0 z-9999 flex items-end justify-center lg:items-start lg:pt-[15vh]',
            onClick: t,
            children: [
              g.jsx('div', { className: 'absolute inset-0 bg-black/40 backdrop-blur-xl transition-all duration-200' }),
              g.jsxs('div', {
                className:
                  'animate-in fade-in slide-in-from-bottom-4 border-accent/20 lg:slide-in-from-top-4 relative w-full max-w-2xl overflow-hidden rounded-2xl rounded-b-none border backdrop-blur-2xl duration-200 lg:rounded-2xl!',
                style: {
                  backgroundImage:
                    'linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 98%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))',
                  boxShadow:
                    '0 8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 2px 8px rgba(0, 0, 0, 0.1)',
                },
                onClick: (b) => b.stopPropagation(),
                children: [
                  g.jsx('div', {
                    className: 'pointer-events-none absolute inset-0 rounded-2xl',
                    style: {
                      background:
                        'linear-gradient(to bottom right, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent, color-mix(in srgb, var(--color-accent) 5%, transparent))',
                    },
                  }),
                  g.jsxs('div', {
                    className: 'border-accent/20 relative flex items-center gap-3 border-b px-4 py-4',
                    children: [
                      g.jsx('i', { className: 'i-mingcute-search-line text-text-tertiary shrink-0 text-xl' }),
                      g.jsx('input', {
                        ref: d,
                        type: 'text',
                        value: a,
                        onChange: (b) => l(b.target.value),
                        onKeyDown: w,
                        placeholder: n('action.search.placeholder'),
                        className: 'text-text placeholder-text-tertiary flex-1 bg-transparent text-base outline-none',
                      }),
                      g.jsxs('button', {
                        type: 'button',
                        onClick: m,
                        className:
                          'glassmorphic-btn border-accent/20 text-text-secondary inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium transition-all duration-200',
                        children: [g.jsx('i', { className: 'i-mingcute-refresh-1-line text-sm' }), 'Reset'],
                      }),
                      g.jsxs('button', {
                        type: 'button',
                        onClick: t,
                        className:
                          'glassmorphic-btn border-accent/20 text-text-secondary inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium transition-all duration-200',
                        children: [g.jsx('i', { className: 'i-mingcute-close-line text-sm' }), 'Close'],
                      }),
                    ],
                  }),
                  g.jsxs('div', {
                    className:
                      'border-accent/20 bg-accent/3 text-text-secondary relative flex items-center justify-between gap-3 border-b px-4 py-2 text-xs',
                    children: [
                      g.jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                          g.jsx('i', { className: 'i-mingcute-filter-3-line text-sm' }),
                          g.jsx('span', { children: n('action.tag.match.label') }),
                        ],
                      }),
                      g.jsxs('div', {
                        className: 'flex items-center gap-1',
                        children: [
                          g.jsx('button', {
                            type: 'button',
                            onClick: () => p('union'),
                            className: Re(
                              'rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                              r.tagFilterMode === 'union'
                                ? 'bg-accent text-white'
                                : 'glassmorphic-btn text-text-secondary',
                            ),
                            children: n('action.tag.match.any'),
                          }),
                          g.jsx('button', {
                            type: 'button',
                            onClick: () => p('intersection'),
                            className: Re(
                              'rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                              r.tagFilterMode === 'intersection'
                                ? 'bg-accent text-white'
                                : 'glassmorphic-btn text-text-secondary',
                            ),
                            children: n('action.tag.match.all'),
                          }),
                        ],
                      }),
                    ],
                  }),
                  g.jsx('div', {
                    ref: h,
                    className: 'max-h-[60vh] overflow-y-auto overscroll-contain py-2',
                    children:
                      v.length === 0
                        ? g.jsxs('div', {
                            className: 'flex flex-col items-center justify-center py-12 text-center',
                            children: [
                              g.jsx('i', { className: 'i-mingcute-search-line text-text-quaternary mb-3 text-4xl' }),
                              g.jsx('p', {
                                className: 'text-text-secondary text-sm',
                                children: n('action.search.no-results'),
                              }),
                            ],
                          })
                        : v.map((b, x) =>
                            g.jsxs(
                              'button',
                              {
                                type: 'button',
                                onClick: b.action,
                                onMouseEnter: () => u(x),
                                className: Re(
                                  'command-item group flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200',
                                  c === x && 'selected',
                                ),
                                children: [
                                  g.jsx('div', {
                                    className: Re(
                                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition-all duration-200',
                                      b.active ? 'bg-accent/10 text-accent' : 'bg-background/95 text-text-secondary',
                                    ),
                                    style: b.active
                                      ? {
                                          boxShadow:
                                            'inset 0 0 0 1px color-mix(in srgb, var(--color-accent) 20%, transparent)',
                                        }
                                      : void 0,
                                    children: typeof b.icon == 'string' ? g.jsx('i', { className: b.icon }) : b.icon,
                                  }),
                                  g.jsxs('div', {
                                    className: 'flex-1 overflow-hidden',
                                    children: [
                                      g.jsxs('div', {
                                        className: 'flex items-center gap-2',
                                        children: [
                                          g.jsx('span', {
                                            className: 'text-text truncate text-sm font-medium',
                                            children: b.title,
                                          }),
                                          b.badge !== void 0 &&
                                            g.jsx('span', {
                                              className:
                                                'bg-fill-tertiary text-text-secondary rounded-full px-2 py-0.5 text-xs',
                                              children: b.badge,
                                            }),
                                          b.active &&
                                            g.jsx('span', {
                                              className:
                                                'bg-accent flex h-5 w-5 items-center justify-center rounded-full text-white',
                                              children: g.jsx('i', { className: 'i-mingcute-check-line text-xs' }),
                                            }),
                                        ],
                                      }),
                                      b.subtitle &&
                                        g.jsx('p', {
                                          className: 'text-text-secondary truncate text-xs',
                                          children: b.subtitle,
                                        }),
                                    ],
                                  }),
                                ],
                              },
                              b.id,
                            ),
                          ),
                  }),
                  g.jsx('div', {
                    className: 'border-accent/20 relative border-t px-4 py-2',
                    children: g.jsxs('div', {
                      className: 'text-text-secondary flex items-center justify-between text-xs',
                      children: [
                        g.jsxs('div', {
                          className: 'flex items-center gap-4',
                          children: [
                            g.jsxs('span', {
                              className: 'flex items-center gap-1',
                              children: [
                                g.jsx('kbd', {
                                  className: 'border-accent/20 bg-accent/5 rounded border px-1.5 py-0.5 font-mono',
                                  children: '↑↓',
                                }),
                                'Navigate',
                              ],
                            }),
                            g.jsxs('span', {
                              className: 'flex items-center gap-1',
                              children: [
                                g.jsx('kbd', {
                                  className: 'border-accent/20 bg-accent/5 rounded border px-1.5 py-0.5 font-mono',
                                  children: '↵',
                                }),
                                'Select',
                              ],
                            }),
                          ],
                        }),
                        v.length > 0 && g.jsxs('span', { children: [v.length, ' results'] }),
                      ],
                    }),
                  }),
                ],
              }),
            ],
          })
        : null
    )
  },
  HT = () => {
    const e = de.c(6),
      [t, n] = Un(_S)
    let r, o
    ;(e[0] !== n
      ? ((r = () => {
          const s = (a) => {
            ;(a.metaKey || a.ctrlKey) && a.key === 'k' && (a.preventDefault(), n(GT))
          }
          return (window.addEventListener('keydown', s), () => window.removeEventListener('keydown', s))
        }),
        (o = [n]),
        (e[0] = n),
        (e[1] = r),
        (e[2] = o))
      : ((r = e[1]), (o = e[2])),
      f.useEffect(r, o))
    let i
    return (
      e[3] !== t || e[4] !== n ? ((i = { isOpen: t, setIsOpen: n }), (e[3] = t), (e[4] = n), (e[5] = i)) : (i = e[5]),
      i
    )
  }
function GT(e) {
  return !e
}
function of(e, t) {
  if (typeof e == 'function') return e(t)
  e != null && (e.current = t)
}
function Cs(...e) {
  return (t) => {
    let n = !1
    const r = e.map((o) => {
      const i = of(o, t)
      return (!n && typeof i == 'function' && (n = !0), i)
    })
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o]
          typeof i == 'function' ? i() : of(e[o], null)
        }
      }
  }
}
function we(...e) {
  return f.useCallback(Cs(...e), e)
}
function Yn(e) {
  const t = KT(e),
    n = f.forwardRef((r, o) => {
      const { children: i, ...s } = r,
        a = f.Children.toArray(i),
        l = a.find(XT)
      if (l) {
        const c = l.props.children,
          u = a.map((d) =>
            d === l
              ? f.Children.count(c) > 1
                ? f.Children.only(null)
                : f.isValidElement(c)
                  ? c.props.children
                  : null
              : d,
          )
        return g.jsx(t, { ...s, ref: o, children: f.isValidElement(c) ? f.cloneElement(c, void 0, u) : null })
      }
      return g.jsx(t, { ...s, ref: o, children: i })
    })
  return ((n.displayName = `${e}.Slot`), n)
}
var ZT = Yn('Slot')
function KT(e) {
  const t = f.forwardRef((n, r) => {
    const { children: o, ...i } = n
    if (f.isValidElement(o)) {
      const s = JT(o),
        a = qT(i, o.props)
      return (o.type !== f.Fragment && (a.ref = r ? Cs(r, s) : s), f.cloneElement(o, a))
    }
    return f.Children.count(o) > 1 ? f.Children.only(null) : null
  })
  return ((t.displayName = `${e}.SlotClone`), t)
}
var Tm = Symbol('radix.slottable')
function YT(e) {
  const t = ({ children: n }) => g.jsx(g.Fragment, { children: n })
  return ((t.displayName = `${e}.Slottable`), (t.__radixId = Tm), t)
}
function XT(e) {
  return f.isValidElement(e) && typeof e.type == 'function' && '__radixId' in e.type && e.type.__radixId === Tm
}
function qT(e, t) {
  const n = { ...t }
  for (const r in t) {
    const o = e[r],
      i = t[r]
    ;/^on[A-Z]/.test(r)
      ? o && i
        ? (n[r] = (...a) => {
            const l = i(...a)
            return (o(...a), l)
          })
        : o && (n[r] = o)
      : r === 'style'
        ? (n[r] = { ...o, ...i })
        : r === 'className' && (n[r] = [o, i].filter(Boolean).join(' '))
  }
  return { ...e, ...n }
}
function JT(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    n = t && 'isReactWarning' in t && t.isReactWarning
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref)
}
const Pc = f.createContext({})
function Es(e) {
  const t = f.useRef(null)
  return (t.current === null && (t.current = e()), t.current)
}
const Rc = typeof window < 'u',
  Am = Rc ? f.useLayoutEffect : f.useEffect,
  Ps = f.createContext(null)
function Tc(e, t) {
  e.indexOf(t) === -1 && e.push(t)
}
function Ac(e, t) {
  const n = e.indexOf(t)
  n > -1 && e.splice(n, 1)
}
const on = (e, t, n) => (n > t ? t : n < e ? e : n)
let _c = () => {}
const sn = {},
  _m = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e)
function Mm(e) {
  return typeof e == 'object' && e !== null
}
const km = (e) => /^0[^.\s]+$/u.test(e)
function Mc(e) {
  let t
  return () => (t === void 0 && (t = e()), t)
}
const xt = (e) => e,
  QT = (e, t) => (n) => t(e(n)),
  Vo = (...e) => e.reduce(QT),
  Co = (e, t, n) => {
    const r = t - e
    return r === 0 ? 1 : (n - e) / r
  }
class kc {
  constructor() {
    this.subscriptions = []
  }
  add(t) {
    return (Tc(this.subscriptions, t), () => Ac(this.subscriptions, t))
  }
  notify(t, n, r) {
    const o = this.subscriptions.length
    if (o)
      if (o === 1) this.subscriptions[0](t, n, r)
      else
        for (let i = 0; i < o; i++) {
          const s = this.subscriptions[i]
          s && s(t, n, r)
        }
  }
  getSize() {
    return this.subscriptions.length
  }
  clear() {
    this.subscriptions.length = 0
  }
}
const Ht = (e) => e * 1e3,
  wt = (e) => e / 1e3
function Dm(e, t) {
  return t ? e * (1e3 / t) : 0
}
const Im = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  eA = 1e-7,
  tA = 12
function nA(e, t, n, r, o) {
  let i,
    s,
    a = 0
  do ((s = t + (n - t) / 2), (i = Im(s, r, o) - e), i > 0 ? (n = s) : (t = s))
  while (Math.abs(i) > eA && ++a < tA)
  return s
}
function Bo(e, t, n, r) {
  if (e === t && n === r) return xt
  const o = (i) => nA(i, 0, 1, e, n)
  return (i) => (i === 0 || i === 1 ? i : Im(o(i), t, r))
}
const Om = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  Nm = (e) => (t) => 1 - e(1 - t),
  Lm = Bo(0.33, 1.53, 0.69, 0.99),
  Dc = Nm(Lm),
  jm = Om(Dc),
  $m = (e) => ((e *= 2) < 1 ? 0.5 * Dc(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1)))),
  Ic = (e) => 1 - Math.sin(Math.acos(e)),
  Fm = Nm(Ic),
  zm = Om(Ic),
  rA = Bo(0.42, 0, 1, 1),
  oA = Bo(0, 0, 0.58, 1),
  Vm = Bo(0.42, 0, 0.58, 1),
  iA = (e) => Array.isArray(e) && typeof e[0] != 'number',
  Bm = (e) => Array.isArray(e) && typeof e[0] == 'number',
  sA = {
    linear: xt,
    easeIn: rA,
    easeInOut: Vm,
    easeOut: oA,
    circIn: Ic,
    circInOut: zm,
    circOut: Fm,
    backIn: Dc,
    backInOut: jm,
    backOut: Lm,
    anticipate: $m,
  },
  aA = (e) => typeof e == 'string',
  sf = (e) => {
    if (Bm(e)) {
      _c(e.length === 4)
      const [t, n, r, o] = e
      return Bo(t, n, r, o)
    } else if (aA(e)) return sA[e]
    return e
  },
  pi = ['setup', 'read', 'resolveKeyframes', 'preUpdate', 'update', 'preRender', 'render', 'postRender']
function lA(e, t) {
  let n = new Set(),
    r = new Set(),
    o = !1,
    i = !1
  const s = new WeakSet()
  let a = { delta: 0, timestamp: 0, isProcessing: !1 }
  function l(u) {
    ;(s.has(u) && (c.schedule(u), e()), u(a))
  }
  const c = {
    schedule: (u, d = !1, h = !1) => {
      const m = h && o ? n : r
      return (d && s.add(u), m.has(u) || m.add(u), u)
    },
    cancel: (u) => {
      ;(r.delete(u), s.delete(u))
    },
    process: (u) => {
      if (((a = u), o)) {
        i = !0
        return
      }
      ;((o = !0), ([n, r] = [r, n]), n.forEach(l), n.clear(), (o = !1), i && ((i = !1), c.process(u)))
    },
  }
  return c
}
const cA = 40
function Um(e, t) {
  let n = !1,
    r = !0
  const o = { delta: 0, timestamp: 0, isProcessing: !1 },
    i = () => (n = !0),
    s = pi.reduce((x, E) => ((x[E] = lA(i)), x), {}),
    { setup: a, read: l, resolveKeyframes: c, preUpdate: u, update: d, preRender: h, render: p, postRender: m } = s,
    y = () => {
      const x = sn.useManualTiming ? o.timestamp : performance.now()
      ;((n = !1),
        sn.useManualTiming || (o.delta = r ? 1e3 / 60 : Math.max(Math.min(x - o.timestamp, cA), 1)),
        (o.timestamp = x),
        (o.isProcessing = !0),
        a.process(o),
        l.process(o),
        c.process(o),
        u.process(o),
        d.process(o),
        h.process(o),
        p.process(o),
        m.process(o),
        (o.isProcessing = !1),
        n && t && ((r = !1), e(y)))
    },
    v = () => {
      ;((n = !0), (r = !0), o.isProcessing || e(y))
    }
  return {
    schedule: pi.reduce((x, E) => {
      const C = s[E]
      return ((x[E] = (A, S = !1, R = !1) => (n || v(), C.schedule(A, S, R))), x)
    }, {}),
    cancel: (x) => {
      for (let E = 0; E < pi.length; E++) s[pi[E]].cancel(x)
    },
    state: o,
    steps: s,
  }
}
const {
  schedule: Ae,
  cancel: Sn,
  state: Ke,
  steps: ma,
} = Um(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : xt, !0)
let ki
function uA() {
  ki = void 0
}
const ct = {
    now: () => (ki === void 0 && ct.set(Ke.isProcessing || sn.useManualTiming ? Ke.timestamp : performance.now()), ki),
    set: (e) => {
      ;((ki = e), queueMicrotask(uA))
    },
  },
  Wm = (e) => (t) => typeof t == 'string' && t.startsWith(e),
  Oc = Wm('--'),
  dA = Wm('var(--'),
  Nc = (e) => (dA(e) ? fA.test(e.split('/*')[0].trim()) : !1),
  fA = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
  Fr = { test: (e) => typeof e == 'number', parse: parseFloat, transform: (e) => e },
  Eo = { ...Fr, transform: (e) => on(0, 1, e) },
  mi = { ...Fr, default: 1 },
  po = (e) => Math.round(e * 1e5) / 1e5,
  Lc = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu
function hA(e) {
  return e == null
}
const pA =
    /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
  jc = (e, t) => (n) =>
    !!(
      (typeof n == 'string' && pA.test(n) && n.startsWith(e)) ||
      (t && !hA(n) && Object.prototype.hasOwnProperty.call(n, t))
    ),
  Hm = (e, t, n) => (r) => {
    if (typeof r != 'string') return r
    const [o, i, s, a] = r.match(Lc)
    return { [e]: parseFloat(o), [t]: parseFloat(i), [n]: parseFloat(s), alpha: a !== void 0 ? parseFloat(a) : 1 }
  },
  mA = (e) => on(0, 255, e),
  ga = { ...Fr, transform: (e) => Math.round(mA(e)) },
  Vn = {
    test: jc('rgb', 'red'),
    parse: Hm('red', 'green', 'blue'),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      'rgba(' + ga.transform(e) + ', ' + ga.transform(t) + ', ' + ga.transform(n) + ', ' + po(Eo.transform(r)) + ')',
  }
function gA(e) {
  let t = '',
    n = '',
    r = '',
    o = ''
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)), (n = e.substring(3, 5)), (r = e.substring(5, 7)), (o = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (o = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (o += o)),
    { red: parseInt(t, 16), green: parseInt(n, 16), blue: parseInt(r, 16), alpha: o ? parseInt(o, 16) / 255 : 1 }
  )
}
const il = { test: jc('#'), parse: gA, transform: Vn.transform },
  Uo = (e) => ({
    test: (t) => typeof t == 'string' && t.endsWith(e) && t.split(' ').length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  gn = Uo('deg'),
  Gt = Uo('%'),
  ue = Uo('px'),
  yA = Uo('vh'),
  vA = Uo('vw'),
  af = { ...Gt, parse: (e) => Gt.parse(e) / 100, transform: (e) => Gt.transform(e * 100) },
  yr = {
    test: jc('hsl', 'hue'),
    parse: Hm('hue', 'saturation', 'lightness'),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      'hsla(' +
      Math.round(e) +
      ', ' +
      Gt.transform(po(t)) +
      ', ' +
      Gt.transform(po(n)) +
      ', ' +
      po(Eo.transform(r)) +
      ')',
  },
  $e = {
    test: (e) => Vn.test(e) || il.test(e) || yr.test(e),
    parse: (e) => (Vn.test(e) ? Vn.parse(e) : yr.test(e) ? yr.parse(e) : il.parse(e)),
    transform: (e) => (typeof e == 'string' ? e : e.hasOwnProperty('red') ? Vn.transform(e) : yr.transform(e)),
    getAnimatableNone: (e) => {
      const t = $e.parse(e)
      return ((t.alpha = 0), $e.transform(t))
    },
  },
  bA =
    /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu
function wA(e) {
  return isNaN(e) && typeof e == 'string' && (e.match(Lc)?.length || 0) + (e.match(bA)?.length || 0) > 0
}
const Gm = 'number',
  Zm = 'color',
  xA = 'var',
  SA = 'var(',
  lf = '${}',
  CA =
    /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu
function Po(e) {
  const t = e.toString(),
    n = [],
    r = { color: [], number: [], var: [] },
    o = []
  let i = 0
  const a = t
    .replace(
      CA,
      (l) => (
        $e.test(l)
          ? (r.color.push(i), o.push(Zm), n.push($e.parse(l)))
          : l.startsWith(SA)
            ? (r.var.push(i), o.push(xA), n.push(l))
            : (r.number.push(i), o.push(Gm), n.push(parseFloat(l))),
        ++i,
        lf
      ),
    )
    .split(lf)
  return { values: n, split: a, indexes: r, types: o }
}
function Km(e) {
  return Po(e).values
}
function Ym(e) {
  const { split: t, types: n } = Po(e),
    r = t.length
  return (o) => {
    let i = ''
    for (let s = 0; s < r; s++)
      if (((i += t[s]), o[s] !== void 0)) {
        const a = n[s]
        a === Gm ? (i += po(o[s])) : a === Zm ? (i += $e.transform(o[s])) : (i += o[s])
      }
    return i
  }
}
const EA = (e) => (typeof e == 'number' ? 0 : $e.test(e) ? $e.getAnimatableNone(e) : e)
function PA(e) {
  const t = Km(e)
  return Ym(e)(t.map(EA))
}
const Cn = { test: wA, parse: Km, createTransformer: Ym, getAnimatableNone: PA }
function ya(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
  )
}
function RA({ hue: e, saturation: t, lightness: n, alpha: r }) {
  ;((e /= 360), (t /= 100), (n /= 100))
  let o = 0,
    i = 0,
    s = 0
  if (!t) o = i = s = n
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      l = 2 * n - a
    ;((o = ya(l, a, e + 1 / 3)), (i = ya(l, a, e)), (s = ya(l, a, e - 1 / 3)))
  }
  return { red: Math.round(o * 255), green: Math.round(i * 255), blue: Math.round(s * 255), alpha: r }
}
function Xi(e, t) {
  return (n) => (n > 0 ? t : e)
}
const ke = (e, t, n) => e + (t - e) * n,
  va = (e, t, n) => {
    const r = e * e,
      o = n * (t * t - r) + r
    return o < 0 ? 0 : Math.sqrt(o)
  },
  TA = [il, Vn, yr],
  AA = (e) => TA.find((t) => t.test(e))
function cf(e) {
  const t = AA(e)
  if (!t) return !1
  let n = t.parse(e)
  return (t === yr && (n = RA(n)), n)
}
const uf = (e, t) => {
    const n = cf(e),
      r = cf(t)
    if (!n || !r) return Xi(e, t)
    const o = { ...n }
    return (i) => (
      (o.red = va(n.red, r.red, i)),
      (o.green = va(n.green, r.green, i)),
      (o.blue = va(n.blue, r.blue, i)),
      (o.alpha = ke(n.alpha, r.alpha, i)),
      Vn.transform(o)
    )
  },
  sl = new Set(['none', 'hidden'])
function _A(e, t) {
  return sl.has(e) ? (n) => (n <= 0 ? e : t) : (n) => (n >= 1 ? t : e)
}
function MA(e, t) {
  return (n) => ke(e, t, n)
}
function $c(e) {
  return typeof e == 'number'
    ? MA
    : typeof e == 'string'
      ? Nc(e)
        ? Xi
        : $e.test(e)
          ? uf
          : IA
      : Array.isArray(e)
        ? Xm
        : typeof e == 'object'
          ? $e.test(e)
            ? uf
            : kA
          : Xi
}
function Xm(e, t) {
  const n = [...e],
    r = n.length,
    o = e.map((i, s) => $c(i)(i, t[s]))
  return (i) => {
    for (let s = 0; s < r; s++) n[s] = o[s](i)
    return n
  }
}
function kA(e, t) {
  const n = { ...e, ...t },
    r = {}
  for (const o in n) e[o] !== void 0 && t[o] !== void 0 && (r[o] = $c(e[o])(e[o], t[o]))
  return (o) => {
    for (const i in r) n[i] = r[i](o)
    return n
  }
}
function DA(e, t) {
  const n = [],
    r = { color: 0, var: 0, number: 0 }
  for (let o = 0; o < t.values.length; o++) {
    const i = t.types[o],
      s = e.indexes[i][r[i]],
      a = e.values[s] ?? 0
    ;((n[o] = a), r[i]++)
  }
  return n
}
const IA = (e, t) => {
  const n = Cn.createTransformer(t),
    r = Po(e),
    o = Po(t)
  return r.indexes.var.length === o.indexes.var.length &&
    r.indexes.color.length === o.indexes.color.length &&
    r.indexes.number.length >= o.indexes.number.length
    ? (sl.has(e) && !o.values.length) || (sl.has(t) && !r.values.length)
      ? _A(e, t)
      : Vo(Xm(DA(r, o), o.values), n)
    : Xi(e, t)
}
function qm(e, t, n) {
  return typeof e == 'number' && typeof t == 'number' && typeof n == 'number' ? ke(e, t, n) : $c(e)(e, t)
}
const OA = (e) => {
    const t = ({ timestamp: n }) => e(n)
    return {
      start: (n = !0) => Ae.update(t, n),
      stop: () => Sn(t),
      now: () => (Ke.isProcessing ? Ke.timestamp : ct.now()),
    }
  },
  Jm = (e, t, n = 10) => {
    let r = ''
    const o = Math.max(Math.round(t / n), 2)
    for (let i = 0; i < o; i++) r += Math.round(e(i / (o - 1)) * 1e4) / 1e4 + ', '
    return `linear(${r.substring(0, r.length - 2)})`
  },
  qi = 2e4
function Fc(e) {
  let t = 0
  const n = 50
  let r = e.next(t)
  for (; !r.done && t < qi; ) ((t += n), (r = e.next(t)))
  return t >= qi ? 1 / 0 : t
}
function NA(e, t = 100, n) {
  const r = n({ ...e, keyframes: [0, t] }),
    o = Math.min(Fc(r), qi)
  return { type: 'keyframes', ease: (i) => r.next(o * i).value / t, duration: wt(o) }
}
const LA = 5
function Qm(e, t, n) {
  const r = Math.max(t - LA, 0)
  return Dm(n - e(r), t - r)
}
const Ie = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: 0.3,
    visualDuration: 0.3,
    restSpeed: { granular: 0.01, default: 2 },
    restDelta: { granular: 0.005, default: 0.5 },
    minDuration: 0.01,
    maxDuration: 10,
    minDamping: 0.05,
    maxDamping: 1,
  },
  ba = 0.001
function jA({ duration: e = Ie.duration, bounce: t = Ie.bounce, velocity: n = Ie.velocity, mass: r = Ie.mass }) {
  let o,
    i,
    s = 1 - t
  ;((s = on(Ie.minDamping, Ie.maxDamping, s)),
    (e = on(Ie.minDuration, Ie.maxDuration, wt(e))),
    s < 1
      ? ((o = (c) => {
          const u = c * s,
            d = u * e,
            h = u - n,
            p = al(c, s),
            m = Math.exp(-d)
          return ba - (h / p) * m
        }),
        (i = (c) => {
          const d = c * s * e,
            h = d * n + n,
            p = Math.pow(s, 2) * Math.pow(c, 2) * e,
            m = Math.exp(-d),
            y = al(Math.pow(c, 2), s)
          return ((-o(c) + ba > 0 ? -1 : 1) * ((h - p) * m)) / y
        }))
      : ((o = (c) => {
          const u = Math.exp(-c * e),
            d = (c - n) * e + 1
          return -ba + u * d
        }),
        (i = (c) => {
          const u = Math.exp(-c * e),
            d = (n - c) * (e * e)
          return u * d
        })))
  const a = 5 / e,
    l = FA(o, i, a)
  if (((e = Ht(e)), isNaN(l))) return { stiffness: Ie.stiffness, damping: Ie.damping, duration: e }
  {
    const c = Math.pow(l, 2) * r
    return { stiffness: c, damping: s * 2 * Math.sqrt(r * c), duration: e }
  }
}
const $A = 12
function FA(e, t, n) {
  let r = n
  for (let o = 1; o < $A; o++) r = r - e(r) / t(r)
  return r
}
function al(e, t) {
  return e * Math.sqrt(1 - t * t)
}
const zA = ['duration', 'bounce'],
  VA = ['stiffness', 'damping', 'mass']
function df(e, t) {
  return t.some((n) => e[n] !== void 0)
}
function BA(e) {
  let t = {
    velocity: Ie.velocity,
    stiffness: Ie.stiffness,
    damping: Ie.damping,
    mass: Ie.mass,
    isResolvedFromDuration: !1,
    ...e,
  }
  if (!df(e, VA) && df(e, zA))
    if (e.visualDuration) {
      const n = e.visualDuration,
        r = (2 * Math.PI) / (n * 1.2),
        o = r * r,
        i = 2 * on(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(o)
      t = { ...t, mass: Ie.mass, stiffness: o, damping: i }
    } else {
      const n = jA(e)
      ;((t = { ...t, ...n, mass: Ie.mass }), (t.isResolvedFromDuration = !0))
    }
  return t
}
function Ji(e = Ie.visualDuration, t = Ie.bounce) {
  const n = typeof e != 'object' ? { visualDuration: e, keyframes: [0, 1], bounce: t } : e
  let { restSpeed: r, restDelta: o } = n
  const i = n.keyframes[0],
    s = n.keyframes[n.keyframes.length - 1],
    a = { done: !1, value: i },
    {
      stiffness: l,
      damping: c,
      mass: u,
      duration: d,
      velocity: h,
      isResolvedFromDuration: p,
    } = BA({ ...n, velocity: -wt(n.velocity || 0) }),
    m = h || 0,
    y = c / (2 * Math.sqrt(l * u)),
    v = s - i,
    w = wt(Math.sqrt(l / u)),
    b = Math.abs(v) < 5
  ;(r || (r = b ? Ie.restSpeed.granular : Ie.restSpeed.default),
    o || (o = b ? Ie.restDelta.granular : Ie.restDelta.default))
  let x
  if (y < 1) {
    const C = al(w, y)
    x = (A) => {
      const S = Math.exp(-y * w * A)
      return s - S * (((m + y * w * v) / C) * Math.sin(C * A) + v * Math.cos(C * A))
    }
  } else if (y === 1) x = (C) => s - Math.exp(-w * C) * (v + (m + w * v) * C)
  else {
    const C = w * Math.sqrt(y * y - 1)
    x = (A) => {
      const S = Math.exp(-y * w * A),
        R = Math.min(C * A, 300)
      return s - (S * ((m + y * w * v) * Math.sinh(R) + C * v * Math.cosh(R))) / C
    }
  }
  const E = {
    calculatedDuration: (p && d) || null,
    next: (C) => {
      const A = x(C)
      if (p) a.done = C >= d
      else {
        let S = C === 0 ? m : 0
        y < 1 && (S = C === 0 ? Ht(m) : Qm(x, C, A))
        const R = Math.abs(S) <= r,
          I = Math.abs(s - A) <= o
        a.done = R && I
      }
      return ((a.value = a.done ? s : A), a)
    },
    toString: () => {
      const C = Math.min(Fc(E), qi),
        A = Jm((S) => E.next(C * S).value, C, 30)
      return C + 'ms ' + A
    },
    toTransition: () => {},
  }
  return E
}
Ji.applyToOptions = (e) => {
  const t = NA(e, 100, Ji)
  return ((e.ease = t.ease), (e.duration = Ht(t.duration)), (e.type = 'keyframes'), e)
}
function ll({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: o = 10,
  bounceStiffness: i = 500,
  modifyTarget: s,
  min: a,
  max: l,
  restDelta: c = 0.5,
  restSpeed: u,
}) {
  const d = e[0],
    h = { done: !1, value: d },
    p = (R) => (a !== void 0 && R < a) || (l !== void 0 && R > l),
    m = (R) => (a === void 0 ? l : l === void 0 || Math.abs(a - R) < Math.abs(l - R) ? a : l)
  let y = n * t
  const v = d + y,
    w = s === void 0 ? v : s(v)
  w !== v && (y = w - d)
  const b = (R) => -y * Math.exp(-R / r),
    x = (R) => w + b(R),
    E = (R) => {
      const I = b(R),
        N = x(R)
      ;((h.done = Math.abs(I) <= c), (h.value = h.done ? w : N))
    }
  let C, A
  const S = (R) => {
    p(h.value) &&
      ((C = R),
      (A = Ji({
        keyframes: [h.value, m(h.value)],
        velocity: Qm(x, R, h.value),
        damping: o,
        stiffness: i,
        restDelta: c,
        restSpeed: u,
      })))
  }
  return (
    S(0),
    {
      calculatedDuration: null,
      next: (R) => {
        let I = !1
        return (!A && C === void 0 && ((I = !0), E(R), S(R)), C !== void 0 && R >= C ? A.next(R - C) : (!I && E(R), h))
      },
    }
  )
}
function UA(e, t, n) {
  const r = [],
    o = n || sn.mix || qm,
    i = e.length - 1
  for (let s = 0; s < i; s++) {
    let a = o(e[s], e[s + 1])
    if (t) {
      const l = Array.isArray(t) ? t[s] || xt : t
      a = Vo(l, a)
    }
    r.push(a)
  }
  return r
}
function WA(e, t, { clamp: n = !0, ease: r, mixer: o } = {}) {
  const i = e.length
  if ((_c(i === t.length), i === 1)) return () => t[0]
  if (i === 2 && t[0] === t[1]) return () => t[1]
  const s = e[0] === e[1]
  e[0] > e[i - 1] && ((e = [...e].reverse()), (t = [...t].reverse()))
  const a = UA(t, r, o),
    l = a.length,
    c = (u) => {
      if (s && u < e[0]) return t[0]
      let d = 0
      if (l > 1) for (; d < e.length - 2 && !(u < e[d + 1]); d++);
      const h = Co(e[d], e[d + 1], u)
      return a[d](h)
    }
  return n ? (u) => c(on(e[0], e[i - 1], u)) : c
}
function HA(e, t) {
  const n = e[e.length - 1]
  for (let r = 1; r <= t; r++) {
    const o = Co(0, t, r)
    e.push(ke(n, 1, o))
  }
}
function GA(e) {
  const t = [0]
  return (HA(t, e.length - 1), t)
}
function ZA(e, t) {
  return e.map((n) => n * t)
}
function KA(e, t) {
  return e.map(() => t || Vm).splice(0, e.length - 1)
}
function mo({ duration: e = 300, keyframes: t, times: n, ease: r = 'easeInOut' }) {
  const o = iA(r) ? r.map(sf) : sf(r),
    i = { done: !1, value: t[0] },
    s = ZA(n && n.length === t.length ? n : GA(t), e),
    a = WA(s, t, { ease: Array.isArray(o) ? o : KA(t, o) })
  return { calculatedDuration: e, next: (l) => ((i.value = a(l)), (i.done = l >= e), i) }
}
const YA = (e) => e !== null
function zc(e, { repeat: t, repeatType: n = 'loop' }, r, o = 1) {
  const i = e.filter(YA),
    a = o < 0 || (t && n !== 'loop' && t % 2 === 1) ? 0 : i.length - 1
  return !a || r === void 0 ? i[a] : r
}
const XA = { decay: ll, inertia: ll, tween: mo, keyframes: mo, spring: Ji }
function eg(e) {
  typeof e.type == 'string' && (e.type = XA[e.type])
}
class Vc {
  constructor() {
    this.updateFinished()
  }
  get finished() {
    return this._finished
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t
    })
  }
  notifyFinished() {
    this.resolve()
  }
  then(t, n) {
    return this.finished.then(t, n)
  }
}
const qA = (e) => e / 100
class Bc extends Vc {
  constructor(t) {
    ;(super(),
      (this.state = 'idle'),
      (this.startTime = null),
      (this.isStopped = !1),
      (this.currentTime = 0),
      (this.holdTime = null),
      (this.playbackSpeed = 1),
      (this.stop = () => {
        const { motionValue: n } = this.options
        ;(n && n.updatedAt !== ct.now() && this.tick(ct.now()),
          (this.isStopped = !0),
          this.state !== 'idle' && (this.teardown(), this.options.onStop?.()))
      }),
      (this.options = t),
      this.initAnimation(),
      this.play(),
      t.autoplay === !1 && this.pause())
  }
  initAnimation() {
    const { options: t } = this
    eg(t)
    const { type: n = mo, repeat: r = 0, repeatDelay: o = 0, repeatType: i, velocity: s = 0 } = t
    let { keyframes: a } = t
    const l = n || mo
    l !== mo && typeof a[0] != 'number' && ((this.mixKeyframes = Vo(qA, qm(a[0], a[1]))), (a = [0, 100]))
    const c = l({ ...t, keyframes: a })
    ;(i === 'mirror' && (this.mirroredGenerator = l({ ...t, keyframes: [...a].reverse(), velocity: -s })),
      c.calculatedDuration === null && (c.calculatedDuration = Fc(c)))
    const { calculatedDuration: u } = c
    ;((this.calculatedDuration = u),
      (this.resolvedDuration = u + o),
      (this.totalDuration = this.resolvedDuration * (r + 1) - o),
      (this.generator = c))
  }
  updateTime(t) {
    const n = Math.round(t - this.startTime) * this.playbackSpeed
    this.holdTime !== null ? (this.currentTime = this.holdTime) : (this.currentTime = n)
  }
  tick(t, n = !1) {
    const {
      generator: r,
      totalDuration: o,
      mixKeyframes: i,
      mirroredGenerator: s,
      resolvedDuration: a,
      calculatedDuration: l,
    } = this
    if (this.startTime === null) return r.next(0)
    const {
      delay: c = 0,
      keyframes: u,
      repeat: d,
      repeatType: h,
      repeatDelay: p,
      type: m,
      onUpdate: y,
      finalKeyframe: v,
    } = this.options
    ;(this.speed > 0
      ? (this.startTime = Math.min(this.startTime, t))
      : this.speed < 0 && (this.startTime = Math.min(t - o / this.speed, this.startTime)),
      n ? (this.currentTime = t) : this.updateTime(t))
    const w = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1),
      b = this.playbackSpeed >= 0 ? w < 0 : w > o
    ;((this.currentTime = Math.max(w, 0)),
      this.state === 'finished' && this.holdTime === null && (this.currentTime = o))
    let x = this.currentTime,
      E = r
    if (d) {
      const R = Math.min(this.currentTime, o) / a
      let I = Math.floor(R),
        N = R % 1
      ;(!N && R >= 1 && (N = 1),
        N === 1 && I--,
        (I = Math.min(I, d + 1)),
        !!(I % 2) && (h === 'reverse' ? ((N = 1 - N), p && (N -= p / a)) : h === 'mirror' && (E = s)),
        (x = on(0, 1, N) * a))
    }
    const C = b ? { done: !1, value: u[0] } : E.next(x)
    i && (C.value = i(C.value))
    let { done: A } = C
    !b && l !== null && (A = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0)
    const S = this.holdTime === null && (this.state === 'finished' || (this.state === 'running' && A))
    return (S && m !== ll && (C.value = zc(u, this.options, v, this.speed)), y && y(C.value), S && this.finish(), C)
  }
  then(t, n) {
    return this.finished.then(t, n)
  }
  get duration() {
    return wt(this.calculatedDuration)
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {}
    return this.duration + wt(t)
  }
  get time() {
    return wt(this.currentTime)
  }
  set time(t) {
    ;((t = Ht(t)),
      (this.currentTime = t),
      this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0
        ? (this.holdTime = t)
        : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed),
      this.driver?.start(!1))
  }
  get speed() {
    return this.playbackSpeed
  }
  set speed(t) {
    this.updateTime(ct.now())
    const n = this.playbackSpeed !== t
    ;((this.playbackSpeed = t), n && (this.time = wt(this.currentTime)))
  }
  play() {
    if (this.isStopped) return
    const { driver: t = OA, startTime: n } = this.options
    ;(this.driver || (this.driver = t((o) => this.tick(o))), this.options.onPlay?.())
    const r = this.driver.now()
    ;(this.state === 'finished'
      ? (this.updateFinished(), (this.startTime = r))
      : this.holdTime !== null
        ? (this.startTime = r - this.holdTime)
        : this.startTime || (this.startTime = n ?? r),
      this.state === 'finished' && this.speed < 0 && (this.startTime += this.calculatedDuration),
      (this.holdTime = null),
      (this.state = 'running'),
      this.driver.start())
  }
  pause() {
    ;((this.state = 'paused'), this.updateTime(ct.now()), (this.holdTime = this.currentTime))
  }
  complete() {
    ;(this.state !== 'running' && this.play(), (this.state = 'finished'), (this.holdTime = null))
  }
  finish() {
    ;(this.notifyFinished(), this.teardown(), (this.state = 'finished'), this.options.onComplete?.())
  }
  cancel() {
    ;((this.holdTime = null), (this.startTime = 0), this.tick(0), this.teardown(), this.options.onCancel?.())
  }
  teardown() {
    ;((this.state = 'idle'), this.stopDriver(), (this.startTime = this.holdTime = null))
  }
  stopDriver() {
    this.driver && (this.driver.stop(), (this.driver = void 0))
  }
  sample(t) {
    return ((this.startTime = 0), this.tick(t, !0))
  }
  attachTimeline(t) {
    return (
      this.options.allowFlatten &&
        ((this.options.type = 'keyframes'), (this.options.ease = 'linear'), this.initAnimation()),
      this.driver?.stop(),
      t.observe(this)
    )
  }
}
function JA(e) {
  for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1])
}
const Bn = (e) => (e * 180) / Math.PI,
  cl = (e) => {
    const t = Bn(Math.atan2(e[1], e[0]))
    return ul(t)
  },
  QA = {
    x: 4,
    y: 5,
    translateX: 4,
    translateY: 5,
    scaleX: 0,
    scaleY: 3,
    scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
    rotate: cl,
    rotateZ: cl,
    skewX: (e) => Bn(Math.atan(e[1])),
    skewY: (e) => Bn(Math.atan(e[2])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2,
  },
  ul = (e) => ((e = e % 360), e < 0 && (e += 360), e),
  ff = cl,
  hf = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
  pf = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
  e_ = {
    x: 12,
    y: 13,
    z: 14,
    translateX: 12,
    translateY: 13,
    translateZ: 14,
    scaleX: hf,
    scaleY: pf,
    scale: (e) => (hf(e) + pf(e)) / 2,
    rotateX: (e) => ul(Bn(Math.atan2(e[6], e[5]))),
    rotateY: (e) => ul(Bn(Math.atan2(-e[2], e[0]))),
    rotateZ: ff,
    rotate: ff,
    skewX: (e) => Bn(Math.atan(e[4])),
    skewY: (e) => Bn(Math.atan(e[1])),
    skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2,
  }
function dl(e) {
  return e.includes('scale') ? 1 : 0
}
function fl(e, t) {
  if (!e || e === 'none') return dl(t)
  const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u)
  let r, o
  if (n) ((r = e_), (o = n))
  else {
    const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u)
    ;((r = QA), (o = a))
  }
  if (!o) return dl(t)
  const i = r[t],
    s = o[1].split(',').map(n_)
  return typeof i == 'function' ? i(s) : s[i]
}
const t_ = (e, t) => {
  const { transform: n = 'none' } = getComputedStyle(e)
  return fl(n, t)
}
function n_(e) {
  return parseFloat(e.trim())
}
const zr = [
    'transformPerspective',
    'x',
    'y',
    'z',
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'rotate',
    'rotateX',
    'rotateY',
    'rotateZ',
    'skew',
    'skewX',
    'skewY',
  ],
  Vr = new Set(zr),
  mf = (e) => e === Fr || e === ue,
  r_ = new Set(['x', 'y', 'z']),
  o_ = zr.filter((e) => !r_.has(e))
function i_(e) {
  const t = []
  return (
    o_.forEach((n) => {
      const r = e.getValue(n)
      r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith('scale') ? 1 : 0))
    }),
    t
  )
}
const Wn = {
  width: ({ x: e }, { paddingLeft: t = '0', paddingRight: n = '0' }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = '0', paddingBottom: n = '0' }) => e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: (e, { transform: t }) => fl(t, 'x'),
  y: (e, { transform: t }) => fl(t, 'y'),
}
Wn.translateX = Wn.x
Wn.translateY = Wn.y
const Hn = new Set()
let hl = !1,
  pl = !1,
  ml = !1
function tg() {
  if (pl) {
    const e = Array.from(Hn).filter((r) => r.needsMeasurement),
      t = new Set(e.map((r) => r.element)),
      n = new Map()
    ;(t.forEach((r) => {
      const o = i_(r)
      o.length && (n.set(r, o), r.render())
    }),
      e.forEach((r) => r.measureInitialState()),
      t.forEach((r) => {
        r.render()
        const o = n.get(r)
        o &&
          o.forEach(([i, s]) => {
            r.getValue(i)?.set(s)
          })
      }),
      e.forEach((r) => r.measureEndState()),
      e.forEach((r) => {
        r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY)
      }))
  }
  ;((pl = !1), (hl = !1), Hn.forEach((e) => e.complete(ml)), Hn.clear())
}
function ng() {
  Hn.forEach((e) => {
    ;(e.readKeyframes(), e.needsMeasurement && (pl = !0))
  })
}
function s_() {
  ;((ml = !0), ng(), tg(), (ml = !1))
}
class Uc {
  constructor(t, n, r, o, i, s = !1) {
    ;((this.state = 'pending'),
      (this.isAsync = !1),
      (this.needsMeasurement = !1),
      (this.unresolvedKeyframes = [...t]),
      (this.onComplete = n),
      (this.name = r),
      (this.motionValue = o),
      (this.element = i),
      (this.isAsync = s))
  }
  scheduleResolve() {
    ;((this.state = 'scheduled'),
      this.isAsync
        ? (Hn.add(this), hl || ((hl = !0), Ae.read(ng), Ae.resolveKeyframes(tg)))
        : (this.readKeyframes(), this.complete()))
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: n, element: r, motionValue: o } = this
    if (t[0] === null) {
      const i = o?.get(),
        s = t[t.length - 1]
      if (i !== void 0) t[0] = i
      else if (r && n) {
        const a = r.readValue(n, s)
        a != null && (t[0] = a)
      }
      ;(t[0] === void 0 && (t[0] = s), o && i === void 0 && o.set(t[0]))
    }
    JA(t)
  }
  setFinalKeyframe() {}
  measureInitialState() {}
  renderEndStyles() {}
  measureEndState() {}
  complete(t = !1) {
    ;((this.state = 'complete'), this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), Hn.delete(this))
  }
  cancel() {
    this.state === 'scheduled' && (Hn.delete(this), (this.state = 'pending'))
  }
  resume() {
    this.state === 'pending' && this.scheduleResolve()
  }
}
const a_ = (e) => e.startsWith('--')
function l_(e, t, n) {
  a_(t) ? e.style.setProperty(t, n) : (e.style[t] = n)
}
const c_ = Mc(() => window.ScrollTimeline !== void 0),
  u_ = {}
function d_(e, t) {
  const n = Mc(e)
  return () => u_[t] ?? n()
}
const rg = d_(() => {
    try {
      document.createElement('div').animate({ opacity: 0 }, { easing: 'linear(0, 1)' })
    } catch {
      return !1
    }
    return !0
  }, 'linearEasing'),
  co = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  gf = {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    circIn: co([0, 0.65, 0.55, 1]),
    circOut: co([0.55, 0, 1, 0.45]),
    backIn: co([0.31, 0.01, 0.66, -0.59]),
    backOut: co([0.33, 1.53, 0.69, 0.99]),
  }
function og(e, t) {
  if (e)
    return typeof e == 'function'
      ? rg()
        ? Jm(e, t)
        : 'ease-out'
      : Bm(e)
        ? co(e)
        : Array.isArray(e)
          ? e.map((n) => og(n, t) || gf.easeOut)
          : gf[e]
}
function f_(
  e,
  t,
  n,
  { delay: r = 0, duration: o = 300, repeat: i = 0, repeatType: s = 'loop', ease: a = 'easeOut', times: l } = {},
  c = void 0,
) {
  const u = { [t]: n }
  l && (u.offset = l)
  const d = og(a, o)
  Array.isArray(d) && (u.easing = d)
  const h = {
    delay: r,
    duration: o,
    easing: Array.isArray(d) ? 'linear' : d,
    fill: 'both',
    iterations: i + 1,
    direction: s === 'reverse' ? 'alternate' : 'normal',
  }
  return (c && (h.pseudoElement = c), e.animate(u, h))
}
function ig(e) {
  return typeof e == 'function' && 'applyToOptions' in e
}
function h_({ type: e, ...t }) {
  return ig(e) && rg() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = 'easeOut'), t)
}
class p_ extends Vc {
  constructor(t) {
    if ((super(), (this.finishedTime = null), (this.isStopped = !1), !t)) return
    const {
      element: n,
      name: r,
      keyframes: o,
      pseudoElement: i,
      allowFlatten: s = !1,
      finalKeyframe: a,
      onComplete: l,
    } = t
    ;((this.isPseudoElement = !!i), (this.allowFlatten = s), (this.options = t), _c(typeof t.type != 'string'))
    const c = h_(t)
    ;((this.animation = f_(n, r, o, c, i)),
      c.autoplay === !1 && this.animation.pause(),
      (this.animation.onfinish = () => {
        if (((this.finishedTime = this.time), !i)) {
          const u = zc(o, this.options, a, this.speed)
          ;(this.updateMotionValue ? this.updateMotionValue(u) : l_(n, r, u), this.animation.cancel())
        }
        ;(l?.(), this.notifyFinished())
      }))
  }
  play() {
    this.isStopped || (this.animation.play(), this.state === 'finished' && this.updateFinished())
  }
  pause() {
    this.animation.pause()
  }
  complete() {
    this.animation.finish?.()
  }
  cancel() {
    try {
      this.animation.cancel()
    } catch {}
  }
  stop() {
    if (this.isStopped) return
    this.isStopped = !0
    const { state: t } = this
    t === 'idle' ||
      t === 'finished' ||
      (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel())
  }
  commitStyles() {
    this.isPseudoElement || this.animation.commitStyles?.()
  }
  get duration() {
    const t = this.animation.effect?.getComputedTiming?.().duration || 0
    return wt(Number(t))
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {}
    return this.duration + wt(t)
  }
  get time() {
    return wt(Number(this.animation.currentTime) || 0)
  }
  set time(t) {
    ;((this.finishedTime = null), (this.animation.currentTime = Ht(t)))
  }
  get speed() {
    return this.animation.playbackRate
  }
  set speed(t) {
    ;(t < 0 && (this.finishedTime = null), (this.animation.playbackRate = t))
  }
  get state() {
    return this.finishedTime !== null ? 'finished' : this.animation.playState
  }
  get startTime() {
    return Number(this.animation.startTime)
  }
  set startTime(t) {
    this.animation.startTime = t
  }
  attachTimeline({ timeline: t, observe: n }) {
    return (
      this.allowFlatten && this.animation.effect?.updateTiming({ easing: 'linear' }),
      (this.animation.onfinish = null),
      t && c_() ? ((this.animation.timeline = t), xt) : n(this)
    )
  }
}
const sg = { anticipate: $m, backInOut: jm, circInOut: zm }
function m_(e) {
  return e in sg
}
function g_(e) {
  typeof e.ease == 'string' && m_(e.ease) && (e.ease = sg[e.ease])
}
const yf = 10
class y_ extends p_ {
  constructor(t) {
    ;(g_(t), eg(t), super(t), t.startTime && (this.startTime = t.startTime), (this.options = t))
  }
  updateMotionValue(t) {
    const { motionValue: n, onUpdate: r, onComplete: o, element: i, ...s } = this.options
    if (!n) return
    if (t !== void 0) {
      n.set(t)
      return
    }
    const a = new Bc({ ...s, autoplay: !1 }),
      l = Ht(this.finishedTime ?? this.time)
    ;(n.setWithVelocity(a.sample(l - yf).value, a.sample(l).value, yf), a.stop())
  }
}
const vf = (e, t) =>
  t === 'zIndex'
    ? !1
    : !!(
        typeof e == 'number' ||
        Array.isArray(e) ||
        (typeof e == 'string' && (Cn.test(e) || e === '0') && !e.startsWith('url('))
      )
function v_(e) {
  const t = e[0]
  if (e.length === 1) return !0
  for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0
}
function b_(e, t, n, r) {
  const o = e[0]
  if (o === null) return !1
  if (t === 'display' || t === 'visibility') return !0
  const i = e[e.length - 1],
    s = vf(o, t),
    a = vf(i, t)
  return !s || !a ? !1 : v_(e) || ((n === 'spring' || ig(n)) && r)
}
function gl(e) {
  ;((e.duration = 0), (e.type = 'keyframes'))
}
const w_ = new Set(['opacity', 'clipPath', 'filter', 'transform']),
  x_ = Mc(() => Object.hasOwnProperty.call(Element.prototype, 'animate'))
function S_(e) {
  const { motionValue: t, name: n, repeatDelay: r, repeatType: o, damping: i, type: s } = e
  if (!(t?.owner?.current instanceof HTMLElement)) return !1
  const { onUpdate: l, transformTemplate: c } = t.owner.getProps()
  return x_() && n && w_.has(n) && (n !== 'transform' || !c) && !l && !r && o !== 'mirror' && i !== 0 && s !== 'inertia'
}
const C_ = 40
class E_ extends Vc {
  constructor({
    autoplay: t = !0,
    delay: n = 0,
    type: r = 'keyframes',
    repeat: o = 0,
    repeatDelay: i = 0,
    repeatType: s = 'loop',
    keyframes: a,
    name: l,
    motionValue: c,
    element: u,
    ...d
  }) {
    ;(super(),
      (this.stop = () => {
        ;(this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel())
      }),
      (this.createdAt = ct.now()))
    const h = {
        autoplay: t,
        delay: n,
        type: r,
        repeat: o,
        repeatDelay: i,
        repeatType: s,
        name: l,
        motionValue: c,
        element: u,
        ...d,
      },
      p = u?.KeyframeResolver || Uc
    ;((this.keyframeResolver = new p(a, (m, y, v) => this.onKeyframesResolved(m, y, h, !v), l, c, u)),
      this.keyframeResolver?.scheduleResolve())
  }
  onKeyframesResolved(t, n, r, o) {
    this.keyframeResolver = void 0
    const { name: i, type: s, velocity: a, delay: l, isHandoff: c, onUpdate: u } = r
    ;((this.resolvedAt = ct.now()),
      b_(t, i, s, a) ||
        ((sn.instantAnimations || !l) && u?.(zc(t, r, n)), (t[0] = t[t.length - 1]), gl(r), (r.repeat = 0)))
    const h = {
        startTime: o
          ? this.resolvedAt
            ? this.resolvedAt - this.createdAt > C_
              ? this.resolvedAt
              : this.createdAt
            : this.createdAt
          : void 0,
        finalKeyframe: n,
        ...r,
        keyframes: t,
      },
      p = !c && S_(h) ? new y_({ ...h, element: h.motionValue.owner.current }) : new Bc(h)
    ;(p.finished.then(() => this.notifyFinished()).catch(xt),
      this.pendingTimeline &&
        ((this.stopTimeline = p.attachTimeline(this.pendingTimeline)), (this.pendingTimeline = void 0)),
      (this._animation = p))
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished
  }
  then(t, n) {
    return this.finished.finally(t).then(() => {})
  }
  get animation() {
    return (this._animation || (this.keyframeResolver?.resume(), s_()), this._animation)
  }
  get duration() {
    return this.animation.duration
  }
  get iterationDuration() {
    return this.animation.iterationDuration
  }
  get time() {
    return this.animation.time
  }
  set time(t) {
    this.animation.time = t
  }
  get speed() {
    return this.animation.speed
  }
  get state() {
    return this.animation.state
  }
  set speed(t) {
    this.animation.speed = t
  }
  get startTime() {
    return this.animation.startTime
  }
  attachTimeline(t) {
    return (
      this._animation ? (this.stopTimeline = this.animation.attachTimeline(t)) : (this.pendingTimeline = t),
      () => this.stop()
    )
  }
  play() {
    this.animation.play()
  }
  pause() {
    this.animation.pause()
  }
  complete() {
    this.animation.complete()
  }
  cancel() {
    ;(this._animation && this.animation.cancel(), this.keyframeResolver?.cancel())
  }
}
const P_ = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
function R_(e) {
  const t = P_.exec(e)
  if (!t) return [,]
  const [, n, r, o] = t
  return [`--${n ?? r}`, o]
}
function ag(e, t, n = 1) {
  const [r, o] = R_(e)
  if (!r) return
  const i = window.getComputedStyle(t).getPropertyValue(r)
  if (i) {
    const s = i.trim()
    return _m(s) ? parseFloat(s) : s
  }
  return Nc(o) ? ag(o, t, n + 1) : o
}
function Wc(e, t) {
  return e?.[t] ?? e?.default ?? e
}
const lg = new Set(['width', 'height', 'top', 'left', 'right', 'bottom', ...zr]),
  T_ = { test: (e) => e === 'auto', parse: (e) => e },
  cg = (e) => (t) => t.test(e),
  ug = [Fr, ue, Gt, gn, vA, yA, T_],
  bf = (e) => ug.find(cg(e))
function A_(e) {
  return typeof e == 'number' ? e === 0 : e !== null ? e === 'none' || e === '0' || km(e) : !0
}
const __ = new Set(['brightness', 'contrast', 'saturate', 'opacity'])
function M_(e) {
  const [t, n] = e.slice(0, -1).split('(')
  if (t === 'drop-shadow') return e
  const [r] = n.match(Lc) || []
  if (!r) return e
  const o = n.replace(r, '')
  let i = __.has(t) ? 1 : 0
  return (r !== n && (i *= 100), t + '(' + i + o + ')')
}
const k_ = /\b([a-z-]*)\(.*?\)/gu,
  yl = {
    ...Cn,
    getAnimatableNone: (e) => {
      const t = e.match(k_)
      return t ? t.map(M_).join(' ') : e
    },
  },
  wf = { ...Fr, transform: Math.round },
  D_ = {
    rotate: gn,
    rotateX: gn,
    rotateY: gn,
    rotateZ: gn,
    scale: mi,
    scaleX: mi,
    scaleY: mi,
    scaleZ: mi,
    skew: gn,
    skewX: gn,
    skewY: gn,
    distance: ue,
    translateX: ue,
    translateY: ue,
    translateZ: ue,
    x: ue,
    y: ue,
    z: ue,
    perspective: ue,
    transformPerspective: ue,
    opacity: Eo,
    originX: af,
    originY: af,
    originZ: ue,
  },
  Hc = {
    borderWidth: ue,
    borderTopWidth: ue,
    borderRightWidth: ue,
    borderBottomWidth: ue,
    borderLeftWidth: ue,
    borderRadius: ue,
    radius: ue,
    borderTopLeftRadius: ue,
    borderTopRightRadius: ue,
    borderBottomRightRadius: ue,
    borderBottomLeftRadius: ue,
    width: ue,
    maxWidth: ue,
    height: ue,
    maxHeight: ue,
    top: ue,
    right: ue,
    bottom: ue,
    left: ue,
    padding: ue,
    paddingTop: ue,
    paddingRight: ue,
    paddingBottom: ue,
    paddingLeft: ue,
    margin: ue,
    marginTop: ue,
    marginRight: ue,
    marginBottom: ue,
    marginLeft: ue,
    backgroundPositionX: ue,
    backgroundPositionY: ue,
    ...D_,
    zIndex: wf,
    fillOpacity: Eo,
    strokeOpacity: Eo,
    numOctaves: wf,
  },
  I_ = {
    ...Hc,
    color: $e,
    backgroundColor: $e,
    outlineColor: $e,
    fill: $e,
    stroke: $e,
    borderColor: $e,
    borderTopColor: $e,
    borderRightColor: $e,
    borderBottomColor: $e,
    borderLeftColor: $e,
    filter: yl,
    WebkitFilter: yl,
  },
  dg = (e) => I_[e]
function fg(e, t) {
  let n = dg(e)
  return (n !== yl && (n = Cn), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0)
}
const O_ = new Set(['auto', 'none', '0'])
function N_(e, t, n) {
  let r = 0,
    o
  for (; r < e.length && !o; ) {
    const i = e[r]
    ;(typeof i == 'string' && !O_.has(i) && Po(i).values.length && (o = e[r]), r++)
  }
  if (o && n) for (const i of t) e[i] = fg(n, o)
}
class L_ extends Uc {
  constructor(t, n, r, o, i) {
    super(t, n, r, o, i, !0)
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: n, name: r } = this
    if (!n || !n.current) return
    super.readKeyframes()
    for (let l = 0; l < t.length; l++) {
      let c = t[l]
      if (typeof c == 'string' && ((c = c.trim()), Nc(c))) {
        const u = ag(c, n.current)
        ;(u !== void 0 && (t[l] = u), l === t.length - 1 && (this.finalKeyframe = c))
      }
    }
    if ((this.resolveNoneKeyframes(), !lg.has(r) || t.length !== 2)) return
    const [o, i] = t,
      s = bf(o),
      a = bf(i)
    if (s !== a)
      if (mf(s) && mf(a))
        for (let l = 0; l < t.length; l++) {
          const c = t[l]
          typeof c == 'string' && (t[l] = parseFloat(c))
        }
      else Wn[r] && (this.needsMeasurement = !0)
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: n } = this,
      r = []
    for (let o = 0; o < t.length; o++) (t[o] === null || A_(t[o])) && r.push(o)
    r.length && N_(t, r, n)
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: n, name: r } = this
    if (!t || !t.current) return
    ;(r === 'height' && (this.suspendedScrollY = window.pageYOffset),
      (this.measuredOrigin = Wn[r](t.measureViewportBox(), window.getComputedStyle(t.current))),
      (n[0] = this.measuredOrigin))
    const o = n[n.length - 1]
    o !== void 0 && t.getValue(r, o).jump(o, !1)
  }
  measureEndState() {
    const { element: t, name: n, unresolvedKeyframes: r } = this
    if (!t || !t.current) return
    const o = t.getValue(n)
    o && o.jump(this.measuredOrigin, !1)
    const i = r.length - 1,
      s = r[i]
    ;((r[i] = Wn[n](t.measureViewportBox(), window.getComputedStyle(t.current))),
      s !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = s),
      this.removedTransforms?.length &&
        this.removedTransforms.forEach(([a, l]) => {
          t.getValue(a).set(l)
        }),
      this.resolveNoneKeyframes())
  }
}
function j_(e, t, n) {
  if (e instanceof EventTarget) return [e]
  if (typeof e == 'string') {
    const o = document.querySelectorAll(e)
    return o ? Array.from(o) : []
  }
  return Array.from(e)
}
const hg = (e, t) => (t && typeof e == 'number' ? t.transform(e) : e)
function pg(e) {
  return Mm(e) && 'offsetHeight' in e
}
const xf = 30,
  $_ = (e) => !isNaN(parseFloat(e)),
  Sf = { current: void 0 }
class F_ {
  constructor(t, n = {}) {
    ;((this.canTrackVelocity = null),
      (this.events = {}),
      (this.updateAndNotify = (r) => {
        const o = ct.now()
        if (
          (this.updatedAt !== o && this.setPrevFrameValue(),
          (this.prev = this.current),
          this.setCurrent(r),
          this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        )
          for (const i of this.dependents) i.dirty()
      }),
      (this.hasAnimated = !1),
      this.setCurrent(t),
      (this.owner = n.owner))
  }
  setCurrent(t) {
    ;((this.current = t),
      (this.updatedAt = ct.now()),
      this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = $_(this.current)))
  }
  setPrevFrameValue(t = this.current) {
    ;((this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt))
  }
  onChange(t) {
    return this.on('change', t)
  }
  on(t, n) {
    this.events[t] || (this.events[t] = new kc())
    const r = this.events[t].add(n)
    return t === 'change'
      ? () => {
          ;(r(),
            Ae.read(() => {
              this.events.change.getSize() || this.stop()
            }))
        }
      : r
  }
  clearListeners() {
    for (const t in this.events) this.events[t].clear()
  }
  attach(t, n) {
    ;((this.passiveEffect = t), (this.stopPassiveEffect = n))
  }
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t)
  }
  setWithVelocity(t, n, r) {
    ;(this.set(n), (this.prev = void 0), (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt - r))
  }
  jump(t, n = !0) {
    ;(this.updateAndNotify(t),
      (this.prev = t),
      (this.prevUpdatedAt = this.prevFrameValue = void 0),
      n && this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect())
  }
  dirty() {
    this.events.change?.notify(this.current)
  }
  addDependent(t) {
    ;(this.dependents || (this.dependents = new Set()), this.dependents.add(t))
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t)
  }
  get() {
    return (Sf.current && Sf.current.push(this), this.current)
  }
  getPrevious() {
    return this.prev
  }
  getVelocity() {
    const t = ct.now()
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > xf) return 0
    const n = Math.min(this.updatedAt - this.prevUpdatedAt, xf)
    return Dm(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
  }
  start(t) {
    return (
      this.stop(),
      new Promise((n) => {
        ;((this.hasAnimated = !0),
          (this.animation = t(n)),
          this.events.animationStart && this.events.animationStart.notify())
      }).then(() => {
        ;(this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation())
      })
    )
  }
  stop() {
    ;(this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()),
      this.clearAnimation())
  }
  isAnimating() {
    return !!this.animation
  }
  clearAnimation() {
    delete this.animation
  }
  destroy() {
    ;(this.dependents?.clear(),
      this.events.destroy?.notify(),
      this.clearListeners(),
      this.stop(),
      this.stopPassiveEffect && this.stopPassiveEffect())
  }
}
function Dr(e, t) {
  return new F_(e, t)
}
const { schedule: Gc } = Um(queueMicrotask, !1),
  kt = { x: !1, y: !1 }
function mg() {
  return kt.x || kt.y
}
function z_(e) {
  return e === 'x' || e === 'y'
    ? kt[e]
      ? null
      : ((kt[e] = !0),
        () => {
          kt[e] = !1
        })
    : kt.x || kt.y
      ? null
      : ((kt.x = kt.y = !0),
        () => {
          kt.x = kt.y = !1
        })
}
function gg(e, t) {
  const n = j_(e),
    r = new AbortController(),
    o = { passive: !0, ...t, signal: r.signal }
  return [n, o, () => r.abort()]
}
function Cf(e) {
  return !(e.pointerType === 'touch' || mg())
}
function V_(e, t, n = {}) {
  const [r, o, i] = gg(e, n),
    s = (a) => {
      if (!Cf(a)) return
      const { target: l } = a,
        c = t(l, a)
      if (typeof c != 'function' || !l) return
      const u = (d) => {
        Cf(d) && (c(d), l.removeEventListener('pointerleave', u))
      }
      l.addEventListener('pointerleave', u, o)
    }
  return (
    r.forEach((a) => {
      a.addEventListener('pointerenter', s, o)
    }),
    i
  )
}
const yg = (e, t) => (t ? (e === t ? !0 : yg(e, t.parentElement)) : !1),
  Zc = (e) => (e.pointerType === 'mouse' ? typeof e.button != 'number' || e.button <= 0 : e.isPrimary !== !1),
  B_ = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'])
function U_(e) {
  return B_.has(e.tagName) || e.tabIndex !== -1
}
const Di = new WeakSet()
function Ef(e) {
  return (t) => {
    t.key === 'Enter' && e(t)
  }
}
function wa(e, t) {
  e.dispatchEvent(new PointerEvent('pointer' + t, { isPrimary: !0, bubbles: !0 }))
}
const W_ = (e, t) => {
  const n = e.currentTarget
  if (!n) return
  const r = Ef(() => {
    if (Di.has(n)) return
    wa(n, 'down')
    const o = Ef(() => {
        wa(n, 'up')
      }),
      i = () => wa(n, 'cancel')
    ;(n.addEventListener('keyup', o, t), n.addEventListener('blur', i, t))
  })
  ;(n.addEventListener('keydown', r, t), n.addEventListener('blur', () => n.removeEventListener('keydown', r), t))
}
function Pf(e) {
  return Zc(e) && !mg()
}
function H_(e, t, n = {}) {
  const [r, o, i] = gg(e, n),
    s = (a) => {
      const l = a.currentTarget
      if (!Pf(a)) return
      Di.add(l)
      const c = t(l, a),
        u = (p, m) => {
          ;(window.removeEventListener('pointerup', d),
            window.removeEventListener('pointercancel', h),
            Di.has(l) && Di.delete(l),
            Pf(p) && typeof c == 'function' && c(p, { success: m }))
        },
        d = (p) => {
          u(p, l === window || l === document || n.useGlobalTarget || yg(l, p.target))
        },
        h = (p) => {
          u(p, !1)
        }
      ;(window.addEventListener('pointerup', d, o), window.addEventListener('pointercancel', h, o))
    }
  return (
    r.forEach((a) => {
      ;((n.useGlobalTarget ? window : a).addEventListener('pointerdown', s, o),
        pg(a) &&
          (a.addEventListener('focus', (c) => W_(c, o)), !U_(a) && !a.hasAttribute('tabindex') && (a.tabIndex = 0)))
    }),
    i
  )
}
function vg(e) {
  return Mm(e) && 'ownerSVGElement' in e
}
function G_(e) {
  return vg(e) && e.tagName === 'svg'
}
const qe = (e) => !!(e && e.getVelocity),
  Z_ = [...ug, $e, Cn],
  K_ = (e) => Z_.find(cg(e)),
  Ro = f.createContext({ transformPagePoint: (e) => e, isStatic: !1, reducedMotion: 'never' })
function Rf(e, t) {
  if (typeof e == 'function') return e(t)
  e != null && (e.current = t)
}
function Y_(...e) {
  return (t) => {
    let n = !1
    const r = e.map((o) => {
      const i = Rf(o, t)
      return (!n && typeof i == 'function' && (n = !0), i)
    })
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o]
          typeof i == 'function' ? i() : Rf(e[o], null)
        }
      }
  }
}
function X_(...e) {
  return f.useCallback(Y_(...e), e)
}
class q_ extends f.Component {
  getSnapshotBeforeUpdate(t) {
    const n = this.props.childRef.current
    if (n && t.isPresent && !this.props.isPresent) {
      const r = n.offsetParent,
        o = (pg(r) && r.offsetWidth) || 0,
        i = this.props.sizeRef.current
      ;((i.height = n.offsetHeight || 0),
        (i.width = n.offsetWidth || 0),
        (i.top = n.offsetTop),
        (i.left = n.offsetLeft),
        (i.right = o - i.width - i.left))
    }
    return null
  }
  componentDidUpdate() {}
  render() {
    return this.props.children
  }
}
function J_({ children: e, isPresent: t, anchorX: n, root: r }) {
  const o = f.useId(),
    i = f.useRef(null),
    s = f.useRef({ width: 0, height: 0, top: 0, left: 0, right: 0 }),
    { nonce: a } = f.useContext(Ro),
    l = X_(i, e?.ref)
  return (
    f.useInsertionEffect(() => {
      const { width: c, height: u, top: d, left: h, right: p } = s.current
      if (t || !i.current || !c || !u) return
      const m = n === 'left' ? `left: ${h}` : `right: ${p}`
      i.current.dataset.motionPopId = o
      const y = document.createElement('style')
      a && (y.nonce = a)
      const v = r ?? document.head
      return (
        v.appendChild(y),
        y.sheet &&
          y.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${c}px !important;
            height: ${u}px !important;
            ${m}px !important;
            top: ${d}px !important;
          }
        `),
        () => {
          v.contains(y) && v.removeChild(y)
        }
      )
    }, [t]),
    g.jsx(q_, { isPresent: t, childRef: i, sizeRef: s, children: f.cloneElement(e, { ref: l }) })
  )
}
const Q_ = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: o,
  presenceAffectsLayout: i,
  mode: s,
  anchorX: a,
  root: l,
}) => {
  const c = Es(eM),
    u = f.useId()
  let d = !0,
    h = f.useMemo(
      () => (
        (d = !1),
        {
          id: u,
          initial: t,
          isPresent: n,
          custom: o,
          onExitComplete: (p) => {
            c.set(p, !0)
            for (const m of c.values()) if (!m) return
            r && r()
          },
          register: (p) => (c.set(p, !1), () => c.delete(p)),
        }
      ),
      [n, c, r],
    )
  return (
    i && d && (h = { ...h }),
    f.useMemo(() => {
      c.forEach((p, m) => c.set(m, !1))
    }, [n]),
    f.useEffect(() => {
      !n && !c.size && r && r()
    }, [n]),
    s === 'popLayout' && (e = g.jsx(J_, { isPresent: n, anchorX: a, root: l, children: e })),
    g.jsx(Ps.Provider, { value: h, children: e })
  )
}
function eM() {
  return new Map()
}
function bg(e = !0) {
  const t = f.useContext(Ps)
  if (t === null) return [!0, null]
  const { isPresent: n, onExitComplete: r, register: o } = t,
    i = f.useId()
  f.useEffect(() => {
    if (e) return o(i)
  }, [e])
  const s = f.useCallback(() => e && r && r(i), [i, r, e])
  return !n && r ? [!1, s] : [!0]
}
const gi = (e) => e.key || ''
function Tf(e) {
  const t = []
  return (
    f.Children.forEach(e, (n) => {
      f.isValidElement(n) && t.push(n)
    }),
    t
  )
}
const tM = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    presenceAffectsLayout: o = !0,
    mode: i = 'sync',
    propagate: s = !1,
    anchorX: a = 'left',
    root: l,
  }) => {
    const [c, u] = bg(s),
      d = f.useMemo(() => Tf(e), [e]),
      h = s && !c ? [] : d.map(gi),
      p = f.useRef(!0),
      m = f.useRef(d),
      y = Es(() => new Map()),
      [v, w] = f.useState(d),
      [b, x] = f.useState(d)
    Am(() => {
      ;((p.current = !1), (m.current = d))
      for (let A = 0; A < b.length; A++) {
        const S = gi(b[A])
        h.includes(S) ? y.delete(S) : y.get(S) !== !0 && y.set(S, !1)
      }
    }, [b, h.length, h.join('-')])
    const E = []
    if (d !== v) {
      let A = [...d]
      for (let S = 0; S < b.length; S++) {
        const R = b[S],
          I = gi(R)
        h.includes(I) || (A.splice(S, 0, R), E.push(R))
      }
      return (i === 'wait' && E.length && (A = E), x(Tf(A)), w(d), null)
    }
    const { forceRender: C } = f.useContext(Pc)
    return g.jsx(g.Fragment, {
      children: b.map((A) => {
        const S = gi(A),
          R = s && !c ? !1 : d === b || h.includes(S),
          I = () => {
            if (y.has(S)) y.set(S, !0)
            else return
            let N = !0
            ;(y.forEach((G) => {
              G || (N = !1)
            }),
              N && (C?.(), x(m.current), s && u?.(), r && r()))
          }
        return g.jsx(
          Q_,
          {
            isPresent: R,
            initial: !p.current || n ? void 0 : !1,
            custom: t,
            presenceAffectsLayout: o,
            mode: i,
            root: l,
            onExitComplete: R ? void 0 : I,
            anchorX: a,
            children: A,
          },
          S,
        )
      }),
    })
  },
  Kc = f.createContext({ strict: !1 }),
  Af = {
    animation: ['animate', 'variants', 'whileHover', 'whileTap', 'exit', 'whileInView', 'whileFocus', 'whileDrag'],
    exit: ['exit'],
    drag: ['drag', 'dragControls'],
    focus: ['whileFocus'],
    hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
    tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
    pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
    inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
    layout: ['layout', 'layoutId'],
  },
  Ir = {}
for (const e in Af) Ir[e] = { isEnabled: (t) => Af[e].some((n) => !!t[n]) }
function vl(e) {
  for (const t in e) Ir[t] = { ...Ir[t], ...e[t] }
}
function nM({ children: e, features: t, strict: n = !1 }) {
  const [, r] = f.useState(!xa(t)),
    o = f.useRef(void 0)
  if (!xa(t)) {
    const { renderer: i, ...s } = t
    ;((o.current = i), vl(s))
  }
  return (
    f.useEffect(() => {
      xa(t) &&
        t().then(({ renderer: i, ...s }) => {
          ;(vl(s), (o.current = i), r(!0))
        })
    }, []),
    g.jsx(Kc.Provider, { value: { renderer: o.current, strict: n }, children: e })
  )
}
function xa(e) {
  return typeof e == 'function'
}
const rM = new Set([
  'animate',
  'exit',
  'variants',
  'initial',
  'style',
  'values',
  'variants',
  'transition',
  'transformTemplate',
  'custom',
  'inherit',
  'onBeforeLayoutMeasure',
  'onAnimationStart',
  'onAnimationComplete',
  'onUpdate',
  'onDragStart',
  'onDrag',
  'onDragEnd',
  'onMeasureDragConstraints',
  'onDirectionLock',
  'onDragTransitionEnd',
  '_dragX',
  '_dragY',
  'onHoverStart',
  'onHoverEnd',
  'onViewportEnter',
  'onViewportLeave',
  'globalTapTarget',
  'ignoreStrict',
  'viewport',
])
function Qi(e) {
  return (
    e.startsWith('while') ||
    (e.startsWith('drag') && e !== 'draggable') ||
    e.startsWith('layout') ||
    e.startsWith('onTap') ||
    e.startsWith('onPan') ||
    e.startsWith('onLayout') ||
    rM.has(e)
  )
}
let wg = (e) => !Qi(e)
function xg(e) {
  typeof e == 'function' && (wg = (t) => (t.startsWith('on') ? !Qi(t) : e(t)))
}
try {
  xg(require('@emotion/is-prop-valid').default)
} catch {}
function oM(e, t, n) {
  const r = {}
  for (const o in e)
    (o === 'values' && typeof e.values == 'object') ||
      ((wg(o) || (n === !0 && Qi(o)) || (!t && !Qi(o)) || (e.draggable && o.startsWith('onDrag'))) && (r[o] = e[o]))
  return r
}
function iM({ children: e, isValidProp: t, ...n }) {
  ;(t && xg(t), (n = { ...f.useContext(Ro), ...n }), (n.isStatic = Es(() => n.isStatic)))
  const r = f.useMemo(() => n, [JSON.stringify(n.transition), n.transformPagePoint, n.reducedMotion])
  return g.jsx(Ro.Provider, { value: r, children: e })
}
const Rs = f.createContext({})
function Ts(e) {
  return e !== null && typeof e == 'object' && typeof e.start == 'function'
}
function To(e) {
  return typeof e == 'string' || Array.isArray(e)
}
const Yc = ['animate', 'whileInView', 'whileFocus', 'whileHover', 'whileTap', 'whileDrag', 'exit'],
  Xc = ['initial', ...Yc]
function As(e) {
  return Ts(e.animate) || Xc.some((t) => To(e[t]))
}
function Sg(e) {
  return !!(As(e) || e.variants)
}
function sM(e, t) {
  if (As(e)) {
    const { initial: n, animate: r } = e
    return { initial: n === !1 || To(n) ? n : void 0, animate: To(r) ? r : void 0 }
  }
  return e.inherit !== !1 ? t : {}
}
function aM(e) {
  const { initial: t, animate: n } = sM(e, f.useContext(Rs))
  return f.useMemo(() => ({ initial: t, animate: n }), [_f(t), _f(n)])
}
function _f(e) {
  return Array.isArray(e) ? e.join(' ') : e
}
const Ao = {}
function lM(e) {
  for (const t in e) ((Ao[t] = e[t]), Oc(t) && (Ao[t].isCSSVariable = !0))
}
function Cg(e, { layout: t, layoutId: n }) {
  return Vr.has(e) || e.startsWith('origin') || ((t || n !== void 0) && (!!Ao[e] || e === 'opacity'))
}
const cM = { x: 'translateX', y: 'translateY', z: 'translateZ', transformPerspective: 'perspective' },
  uM = zr.length
function dM(e, t, n) {
  let r = '',
    o = !0
  for (let i = 0; i < uM; i++) {
    const s = zr[i],
      a = e[s]
    if (a === void 0) continue
    let l = !0
    if ((typeof a == 'number' ? (l = a === (s.startsWith('scale') ? 1 : 0)) : (l = parseFloat(a) === 0), !l || n)) {
      const c = hg(a, Hc[s])
      if (!l) {
        o = !1
        const u = cM[s] || s
        r += `${u}(${c}) `
      }
      n && (t[s] = c)
    }
  }
  return ((r = r.trim()), n ? (r = n(t, o ? '' : r)) : o && (r = 'none'), r)
}
function qc(e, t, n) {
  const { style: r, vars: o, transformOrigin: i } = e
  let s = !1,
    a = !1
  for (const l in t) {
    const c = t[l]
    if (Vr.has(l)) {
      s = !0
      continue
    } else if (Oc(l)) {
      o[l] = c
      continue
    } else {
      const u = hg(c, Hc[l])
      l.startsWith('origin') ? ((a = !0), (i[l] = u)) : (r[l] = u)
    }
  }
  if ((t.transform || (s || n ? (r.transform = dM(t, e.transform, n)) : r.transform && (r.transform = 'none')), a)) {
    const { originX: l = '50%', originY: c = '50%', originZ: u = 0 } = i
    r.transformOrigin = `${l} ${c} ${u}`
  }
}
const Jc = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} })
function Eg(e, t, n) {
  for (const r in t) !qe(t[r]) && !Cg(r, n) && (e[r] = t[r])
}
function fM({ transformTemplate: e }, t) {
  return f.useMemo(() => {
    const n = Jc()
    return (qc(n, t, e), Object.assign({}, n.vars, n.style))
  }, [t])
}
function hM(e, t) {
  const n = e.style || {},
    r = {}
  return (Eg(r, n, e), Object.assign(r, fM(e, t)), r)
}
function pM(e, t) {
  const n = {},
    r = hM(e, t)
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((n.draggable = !1),
      (r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = 'none'),
      (r.touchAction = e.drag === !0 ? 'none' : `pan-${e.drag === 'x' ? 'y' : 'x'}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0),
    (n.style = r),
    n
  )
}
const mM = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
  gM = { offset: 'strokeDashoffset', array: 'strokeDasharray' }
function yM(e, t, n = 1, r = 0, o = !0) {
  e.pathLength = 1
  const i = o ? mM : gM
  e[i.offset] = ue.transform(-r)
  const s = ue.transform(t),
    a = ue.transform(n)
  e[i.array] = `${s} ${a}`
}
function Pg(
  e,
  { attrX: t, attrY: n, attrScale: r, pathLength: o, pathSpacing: i = 1, pathOffset: s = 0, ...a },
  l,
  c,
  u,
) {
  if ((qc(e, a, c), l)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox)
    return
  }
  ;((e.attrs = e.style), (e.style = {}))
  const { attrs: d, style: h } = e
  ;(d.transform && ((h.transform = d.transform), delete d.transform),
    (h.transform || d.transformOrigin) &&
      ((h.transformOrigin = d.transformOrigin ?? '50% 50%'), delete d.transformOrigin),
    h.transform && ((h.transformBox = u?.transformBox ?? 'fill-box'), delete d.transformBox),
    t !== void 0 && (d.x = t),
    n !== void 0 && (d.y = n),
    r !== void 0 && (d.scale = r),
    o !== void 0 && yM(d, o, i, s, !1))
}
const Rg = () => ({ ...Jc(), attrs: {} }),
  Tg = (e) => typeof e == 'string' && e.toLowerCase() === 'svg'
function vM(e, t, n, r) {
  const o = f.useMemo(() => {
    const i = Rg()
    return (Pg(i, t, Tg(r), e.transformTemplate, e.style), { ...i.attrs, style: { ...i.style } })
  }, [t])
  if (e.style) {
    const i = {}
    ;(Eg(i, e.style, e), (o.style = { ...i, ...o.style }))
  }
  return o
}
const bM = [
  'animate',
  'circle',
  'defs',
  'desc',
  'ellipse',
  'g',
  'image',
  'line',
  'filter',
  'marker',
  'mask',
  'metadata',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'rect',
  'stop',
  'switch',
  'symbol',
  'svg',
  'text',
  'tspan',
  'use',
  'view',
]
function Qc(e) {
  return typeof e != 'string' || e.includes('-') ? !1 : !!(bM.indexOf(e) > -1 || /[A-Z]/u.test(e))
}
function wM(e, t, n, { latestValues: r }, o, i = !1) {
  const a = (Qc(e) ? vM : pM)(t, r, o, e),
    l = oM(t, typeof e == 'string', i),
    c = e !== f.Fragment ? { ...l, ...a, ref: n } : {},
    { children: u } = t,
    d = f.useMemo(() => (qe(u) ? u.get() : u), [u])
  return f.createElement(e, { ...c, children: d })
}
function Mf(e) {
  const t = [{}, {}]
  return (
    e?.values.forEach((n, r) => {
      ;((t[0][r] = n.get()), (t[1][r] = n.getVelocity()))
    }),
    t
  )
}
function eu(e, t, n, r) {
  if (typeof t == 'function') {
    const [o, i] = Mf(r)
    t = t(n !== void 0 ? n : e.custom, o, i)
  }
  if ((typeof t == 'string' && (t = e.variants && e.variants[t]), typeof t == 'function')) {
    const [o, i] = Mf(r)
    t = t(n !== void 0 ? n : e.custom, o, i)
  }
  return t
}
function Ii(e) {
  return qe(e) ? e.get() : e
}
function xM({ scrapeMotionValuesFromProps: e, createRenderState: t }, n, r, o) {
  return { latestValues: SM(n, r, o, e), renderState: t() }
}
function SM(e, t, n, r) {
  const o = {},
    i = r(e, {})
  for (const h in i) o[h] = Ii(i[h])
  let { initial: s, animate: a } = e
  const l = As(e),
    c = Sg(e)
  t && c && !l && e.inherit !== !1 && (s === void 0 && (s = t.initial), a === void 0 && (a = t.animate))
  let u = n ? n.initial === !1 : !1
  u = u || s === !1
  const d = u ? a : s
  if (d && typeof d != 'boolean' && !Ts(d)) {
    const h = Array.isArray(d) ? d : [d]
    for (let p = 0; p < h.length; p++) {
      const m = eu(e, h[p])
      if (m) {
        const { transitionEnd: y, transition: v, ...w } = m
        for (const b in w) {
          let x = w[b]
          if (Array.isArray(x)) {
            const E = u ? x.length - 1 : 0
            x = x[E]
          }
          x !== null && (o[b] = x)
        }
        for (const b in y) o[b] = y[b]
      }
    }
  }
  return o
}
const Ag = (e) => (t, n) => {
  const r = f.useContext(Rs),
    o = f.useContext(Ps),
    i = () => xM(e, t, r, o)
  return n ? i() : Es(i)
}
function tu(e, t, n) {
  const { style: r } = e,
    o = {}
  for (const i in r)
    (qe(r[i]) || (t.style && qe(t.style[i])) || Cg(i, e) || n?.getValue(i)?.liveStyle !== void 0) && (o[i] = r[i])
  return o
}
const CM = Ag({ scrapeMotionValuesFromProps: tu, createRenderState: Jc })
function _g(e, t, n) {
  const r = tu(e, t, n)
  for (const o in e)
    if (qe(e[o]) || qe(t[o])) {
      const i = zr.indexOf(o) !== -1 ? 'attr' + o.charAt(0).toUpperCase() + o.substring(1) : o
      r[i] = e[o]
    }
  return r
}
const EM = Ag({ scrapeMotionValuesFromProps: _g, createRenderState: Rg }),
  PM = Symbol.for('motionComponentSymbol')
function vr(e) {
  return e && typeof e == 'object' && Object.prototype.hasOwnProperty.call(e, 'current')
}
function RM(e, t, n) {
  return f.useCallback(
    (r) => {
      ;(r && e.onMount && e.onMount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == 'function' ? n(r) : vr(n) && (n.current = r)))
    },
    [t],
  )
}
const nu = (e) => e.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase(),
  TM = 'framerAppearId',
  Mg = 'data-' + nu(TM),
  kg = f.createContext({})
function AM(e, t, n, r, o) {
  const { visualElement: i } = f.useContext(Rs),
    s = f.useContext(Kc),
    a = f.useContext(Ps),
    l = f.useContext(Ro).reducedMotion,
    c = f.useRef(null)
  ;((r = r || s.renderer),
    !c.current &&
      r &&
      (c.current = r(e, {
        visualState: t,
        parent: i,
        props: n,
        presenceContext: a,
        blockInitialAnimation: a ? a.initial === !1 : !1,
        reducedMotionConfig: l,
      })))
  const u = c.current,
    d = f.useContext(kg)
  u && !u.projection && o && (u.type === 'html' || u.type === 'svg') && _M(c.current, n, o, d)
  const h = f.useRef(!1)
  f.useInsertionEffect(() => {
    u && h.current && u.update(n, a)
  })
  const p = n[Mg],
    m = f.useRef(!!p && !window.MotionHandoffIsComplete?.(p) && window.MotionHasOptimisedAnimation?.(p))
  return (
    Am(() => {
      u &&
        ((h.current = !0),
        (window.MotionIsMounted = !0),
        u.updateFeatures(),
        u.scheduleRenderMicrotask(),
        m.current && u.animationState && u.animationState.animateChanges())
    }),
    f.useEffect(() => {
      u &&
        (!m.current && u.animationState && u.animationState.animateChanges(),
        m.current &&
          (queueMicrotask(() => {
            window.MotionHandoffMarkAsComplete?.(p)
          }),
          (m.current = !1)),
        (u.enteringChildren = void 0))
    }),
    u
  )
}
function _M(e, t, n, r) {
  const { layoutId: o, layout: i, drag: s, dragConstraints: a, layoutScroll: l, layoutRoot: c, layoutCrossfade: u } = t
  ;((e.projection = new n(e.latestValues, t['data-framer-portal-id'] ? void 0 : Dg(e.parent))),
    e.projection.setOptions({
      layoutId: o,
      layout: i,
      alwaysMeasureLayout: !!s || (a && vr(a)),
      visualElement: e,
      animationType: typeof i == 'string' ? i : 'both',
      initialPromotionConfig: r,
      crossfade: u,
      layoutScroll: l,
      layoutRoot: c,
    }))
}
function Dg(e) {
  if (e) return e.options.allowProjection !== !1 ? e.projection : Dg(e.parent)
}
function Sa(e, { forwardMotionProps: t = !1 } = {}, n, r) {
  n && vl(n)
  const o = Qc(e) ? EM : CM
  function i(a, l) {
    let c
    const u = { ...f.useContext(Ro), ...a, layoutId: MM(a) },
      { isStatic: d } = u,
      h = aM(a),
      p = o(a, d)
    if (!d && Rc) {
      kM()
      const m = DM(u)
      ;((c = m.MeasureLayout), (h.visualElement = AM(e, p, u, r, m.ProjectionNode)))
    }
    return g.jsxs(Rs.Provider, {
      value: h,
      children: [
        c && h.visualElement ? g.jsx(c, { visualElement: h.visualElement, ...u }) : null,
        wM(e, a, RM(p, h.visualElement, l), p, d, t),
      ],
    })
  }
  i.displayName = `motion.${typeof e == 'string' ? e : `create(${e.displayName ?? e.name ?? ''})`}`
  const s = f.forwardRef(i)
  return ((s[PM] = e), s)
}
function MM({ layoutId: e }) {
  const t = f.useContext(Pc).id
  return t && e !== void 0 ? t + '-' + e : e
}
function kM(e, t) {
  f.useContext(Kc).strict
}
function DM(e) {
  const { drag: t, layout: n } = Ir
  if (!t && !n) return {}
  const r = { ...t, ...n }
  return {
    MeasureLayout: t?.isEnabled(e) || n?.isEnabled(e) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode,
  }
}
function IM(e, t) {
  if (typeof Proxy > 'u') return Sa
  const n = new Map(),
    r = (i, s) => Sa(i, s, e, t),
    o = (i, s) => r(i, s)
  return new Proxy(o, { get: (i, s) => (s === 'create' ? r : (n.has(s) || n.set(s, Sa(s, void 0, e, t)), n.get(s))) })
}
const Br = IM()
function Ig({ top: e, left: t, right: n, bottom: r }) {
  return { x: { min: t, max: n }, y: { min: e, max: r } }
}
function OM({ x: e, y: t }) {
  return { top: t.min, right: e.max, bottom: t.max, left: e.min }
}
function NM(e, t) {
  if (!t) return e
  const n = t({ x: e.left, y: e.top }),
    r = t({ x: e.right, y: e.bottom })
  return { top: n.y, left: n.x, bottom: r.y, right: r.x }
}
function Ca(e) {
  return e === void 0 || e === 1
}
function bl({ scale: e, scaleX: t, scaleY: n }) {
  return !Ca(e) || !Ca(t) || !Ca(n)
}
function Fn(e) {
  return bl(e) || Og(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY
}
function Og(e) {
  return kf(e.x) || kf(e.y)
}
function kf(e) {
  return e && e !== '0%'
}
function es(e, t, n) {
  const r = e - n,
    o = t * r
  return n + o
}
function Df(e, t, n, r, o) {
  return (o !== void 0 && (e = es(e, o, r)), es(e, n, r) + t)
}
function wl(e, t = 0, n = 1, r, o) {
  ;((e.min = Df(e.min, t, n, r, o)), (e.max = Df(e.max, t, n, r, o)))
}
function Ng(e, { x: t, y: n }) {
  ;(wl(e.x, t.translate, t.scale, t.originPoint), wl(e.y, n.translate, n.scale, n.originPoint))
}
const If = 0.999999999999,
  Of = 1.0000000000001
function LM(e, t, n, r = !1) {
  const o = n.length
  if (!o) return
  t.x = t.y = 1
  let i, s
  for (let a = 0; a < o; a++) {
    ;((i = n[a]), (s = i.projectionDelta))
    const { visualElement: l } = i.options
    ;(l && l.props.style && l.props.style.display === 'contents') ||
      (r &&
        i.options.layoutScroll &&
        i.scroll &&
        i !== i.root &&
        wr(e, { x: -i.scroll.offset.x, y: -i.scroll.offset.y }),
      s && ((t.x *= s.x.scale), (t.y *= s.y.scale), Ng(e, s)),
      r && Fn(i.latestValues) && wr(e, i.latestValues))
  }
  ;(t.x < Of && t.x > If && (t.x = 1), t.y < Of && t.y > If && (t.y = 1))
}
function br(e, t) {
  ;((e.min = e.min + t), (e.max = e.max + t))
}
function Nf(e, t, n, r, o = 0.5) {
  const i = ke(e.min, e.max, o)
  wl(e, t, n, i, r)
}
function wr(e, t) {
  ;(Nf(e.x, t.x, t.scaleX, t.scale, t.originX), Nf(e.y, t.y, t.scaleY, t.scale, t.originY))
}
function Lg(e, t) {
  return Ig(NM(e.getBoundingClientRect(), t))
}
function jM(e, t, n) {
  const r = Lg(e, n),
    { scroll: o } = t
  return (o && (br(r.x, o.offset.x), br(r.y, o.offset.y)), r)
}
const Lf = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  xr = () => ({ x: Lf(), y: Lf() }),
  jf = () => ({ min: 0, max: 0 }),
  Le = () => ({ x: jf(), y: jf() }),
  xl = { current: null },
  jg = { current: !1 }
function $M() {
  if (((jg.current = !0), !!Rc))
    if (window.matchMedia) {
      const e = window.matchMedia('(prefers-reduced-motion)'),
        t = () => (xl.current = e.matches)
      ;(e.addEventListener('change', t), t())
    } else xl.current = !1
}
const FM = new WeakMap()
function zM(e, t, n) {
  for (const r in t) {
    const o = t[r],
      i = n[r]
    if (qe(o)) e.addValue(r, o)
    else if (qe(i)) e.addValue(r, Dr(o, { owner: e }))
    else if (i !== o)
      if (e.hasValue(r)) {
        const s = e.getValue(r)
        s.liveStyle === !0 ? s.jump(o) : s.hasAnimated || s.set(o)
      } else {
        const s = e.getStaticValue(r)
        e.addValue(r, Dr(s !== void 0 ? s : o, { owner: e }))
      }
  }
  for (const r in n) t[r] === void 0 && e.removeValue(r)
  return t
}
const $f = [
  'AnimationStart',
  'AnimationComplete',
  'Update',
  'BeforeLayoutMeasure',
  'LayoutMeasure',
  'LayoutAnimationStart',
  'LayoutAnimationComplete',
]
class VM {
  scrapeMotionValuesFromProps(t, n, r) {
    return {}
  }
  constructor(
    { parent: t, props: n, presenceContext: r, reducedMotionConfig: o, blockInitialAnimation: i, visualState: s },
    a = {},
  ) {
    ;((this.current = null),
      (this.children = new Set()),
      (this.isVariantNode = !1),
      (this.isControllingVariants = !1),
      (this.shouldReduceMotion = null),
      (this.values = new Map()),
      (this.KeyframeResolver = Uc),
      (this.features = {}),
      (this.valueSubscriptions = new Map()),
      (this.prevMotionValues = {}),
      (this.events = {}),
      (this.propEventSubscriptions = {}),
      (this.notifyUpdate = () => this.notify('Update', this.latestValues)),
      (this.render = () => {
        this.current &&
          (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
      }),
      (this.renderScheduledAt = 0),
      (this.scheduleRender = () => {
        const h = ct.now()
        this.renderScheduledAt < h && ((this.renderScheduledAt = h), Ae.render(this.render, !1, !0))
      }))
    const { latestValues: l, renderState: c } = s
    ;((this.latestValues = l),
      (this.baseTarget = { ...l }),
      (this.initialValues = n.initial ? { ...l } : {}),
      (this.renderState = c),
      (this.parent = t),
      (this.props = n),
      (this.presenceContext = r),
      (this.depth = t ? t.depth + 1 : 0),
      (this.reducedMotionConfig = o),
      (this.options = a),
      (this.blockInitialAnimation = !!i),
      (this.isControllingVariants = As(n)),
      (this.isVariantNode = Sg(n)),
      this.isVariantNode && (this.variantChildren = new Set()),
      (this.manuallyAnimateOnMount = !!(t && t.current)))
    const { willChange: u, ...d } = this.scrapeMotionValuesFromProps(n, {}, this)
    for (const h in d) {
      const p = d[h]
      l[h] !== void 0 && qe(p) && p.set(l[h])
    }
  }
  mount(t) {
    ;((this.current = t),
      FM.set(t, this),
      this.projection && !this.projection.instance && this.projection.mount(t),
      this.parent &&
        this.isVariantNode &&
        !this.isControllingVariants &&
        (this.removeFromVariantTree = this.parent.addVariantChild(this)),
      this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
      jg.current || $M(),
      (this.shouldReduceMotion =
        this.reducedMotionConfig === 'never' ? !1 : this.reducedMotionConfig === 'always' ? !0 : xl.current),
      this.parent?.addChild(this),
      this.update(this.props, this.presenceContext))
  }
  unmount() {
    ;(this.projection && this.projection.unmount(),
      Sn(this.notifyUpdate),
      Sn(this.render),
      this.valueSubscriptions.forEach((t) => t()),
      this.valueSubscriptions.clear(),
      this.removeFromVariantTree && this.removeFromVariantTree(),
      this.parent?.removeChild(this))
    for (const t in this.events) this.events[t].clear()
    for (const t in this.features) {
      const n = this.features[t]
      n && (n.unmount(), (n.isMounted = !1))
    }
    this.current = null
  }
  addChild(t) {
    ;(this.children.add(t), this.enteringChildren ?? (this.enteringChildren = new Set()), this.enteringChildren.add(t))
  }
  removeChild(t) {
    ;(this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t))
  }
  bindToMotionValue(t, n) {
    this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)()
    const r = Vr.has(t)
    r && this.onBindTransform && this.onBindTransform()
    const o = n.on('change', (s) => {
      ;((this.latestValues[t] = s),
        this.props.onUpdate && Ae.preRender(this.notifyUpdate),
        r && this.projection && (this.projection.isTransformDirty = !0),
        this.scheduleRender())
    })
    let i
    ;(window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, t, n)),
      this.valueSubscriptions.set(t, () => {
        ;(o(), i && i(), n.owner && n.stop())
      }))
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type
      ? 0
      : this.sortInstanceNodePosition(this.current, t.current)
  }
  updateFeatures() {
    let t = 'animation'
    for (t in Ir) {
      const n = Ir[t]
      if (!n) continue
      const { isEnabled: r, Feature: o } = n
      if ((!this.features[t] && o && r(this.props) && (this.features[t] = new o(this)), this.features[t])) {
        const i = this.features[t]
        i.isMounted ? i.update() : (i.mount(), (i.isMounted = !0))
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props)
  }
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Le()
  }
  getStaticValue(t) {
    return this.latestValues[t]
  }
  setStaticValue(t, n) {
    this.latestValues[t] = n
  }
  update(t, n) {
    ;((t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
      (this.prevProps = this.props),
      (this.props = t),
      (this.prevPresenceContext = this.presenceContext),
      (this.presenceContext = n))
    for (let r = 0; r < $f.length; r++) {
      const o = $f[r]
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o])
      const i = 'on' + o,
        s = t[i]
      s && (this.propEventSubscriptions[o] = this.on(o, s))
    }
    ;((this.prevMotionValues = zM(
      this,
      this.scrapeMotionValuesFromProps(t, this.prevProps, this),
      this.prevMotionValues,
    )),
      this.handleChildMotionValue && this.handleChildMotionValue())
  }
  getProps() {
    return this.props
  }
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0
  }
  getDefaultTransition() {
    return this.props.transition
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
  }
  addVariantChild(t) {
    const n = this.getClosestVariantNode()
    if (n) return (n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t))
  }
  addValue(t, n) {
    const r = this.values.get(t)
    n !== r &&
      (r && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), (this.latestValues[t] = n.get()))
  }
  removeValue(t) {
    this.values.delete(t)
    const n = this.valueSubscriptions.get(t)
    ;(n && (n(), this.valueSubscriptions.delete(t)),
      delete this.latestValues[t],
      this.removeValueFromRenderState(t, this.renderState))
  }
  hasValue(t) {
    return this.values.has(t)
  }
  getValue(t, n) {
    if (this.props.values && this.props.values[t]) return this.props.values[t]
    let r = this.values.get(t)
    return (
      r === void 0 && n !== void 0 && ((r = Dr(n === null ? void 0 : n, { owner: this })), this.addValue(t, r)),
      r
    )
  }
  readValue(t, n) {
    let r =
      this.latestValues[t] !== void 0 || !this.current
        ? this.latestValues[t]
        : (this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options))
    return (
      r != null &&
        (typeof r == 'string' && (_m(r) || km(r)) ? (r = parseFloat(r)) : !K_(r) && Cn.test(n) && (r = fg(t, n)),
        this.setBaseTarget(t, qe(r) ? r.get() : r)),
      qe(r) ? r.get() : r
    )
  }
  setBaseTarget(t, n) {
    this.baseTarget[t] = n
  }
  getBaseTarget(t) {
    const { initial: n } = this.props
    let r
    if (typeof n == 'string' || typeof n == 'object') {
      const i = eu(this.props, n, this.presenceContext?.custom)
      i && (r = i[t])
    }
    if (n && r !== void 0) return r
    const o = this.getBaseTargetFromProps(this.props, t)
    return o !== void 0 && !qe(o) ? o : this.initialValues[t] !== void 0 && r === void 0 ? void 0 : this.baseTarget[t]
  }
  on(t, n) {
    return (this.events[t] || (this.events[t] = new kc()), this.events[t].add(n))
  }
  notify(t, ...n) {
    this.events[t] && this.events[t].notify(...n)
  }
  scheduleRenderMicrotask() {
    Gc.render(this.render)
  }
}
class $g extends VM {
  constructor() {
    ;(super(...arguments), (this.KeyframeResolver = L_))
  }
  sortInstanceNodePosition(t, n) {
    return t.compareDocumentPosition(n) & 2 ? 1 : -1
  }
  getBaseTargetFromProps(t, n) {
    return t.style ? t.style[n] : void 0
  }
  removeValueFromRenderState(t, { vars: n, style: r }) {
    ;(delete n[t], delete r[t])
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription)
    const { children: t } = this.props
    qe(t) &&
      (this.childSubscription = t.on('change', (n) => {
        this.current && (this.current.textContent = `${n}`)
      }))
  }
}
function Fg(e, { style: t, vars: n }, r, o) {
  const i = e.style
  let s
  for (s in t) i[s] = t[s]
  o?.applyProjectionStyles(i, r)
  for (s in n) i.setProperty(s, n[s])
}
function BM(e) {
  return window.getComputedStyle(e)
}
class UM extends $g {
  constructor() {
    ;(super(...arguments), (this.type = 'html'), (this.renderInstance = Fg))
  }
  readValueFromInstance(t, n) {
    if (Vr.has(n)) return this.projection?.isProjecting ? dl(n) : t_(t, n)
    {
      const r = BM(t),
        o = (Oc(n) ? r.getPropertyValue(n) : r[n]) || 0
      return typeof o == 'string' ? o.trim() : o
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: n }) {
    return Lg(t, n)
  }
  build(t, n, r) {
    qc(t, n, r.transformTemplate)
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return tu(t, n, r)
  }
}
const zg = new Set([
  'baseFrequency',
  'diffuseConstant',
  'kernelMatrix',
  'kernelUnitLength',
  'keySplines',
  'keyTimes',
  'limitingConeAngle',
  'markerHeight',
  'markerWidth',
  'numOctaves',
  'targetX',
  'targetY',
  'surfaceScale',
  'specularConstant',
  'specularExponent',
  'stdDeviation',
  'tableValues',
  'viewBox',
  'gradientTransform',
  'pathLength',
  'startOffset',
  'textLength',
  'lengthAdjust',
])
function WM(e, t, n, r) {
  Fg(e, t, void 0, r)
  for (const o in t.attrs) e.setAttribute(zg.has(o) ? o : nu(o), t.attrs[o])
}
class HM extends $g {
  constructor() {
    ;(super(...arguments), (this.type = 'svg'), (this.isSVGTag = !1), (this.measureInstanceViewportBox = Le))
  }
  getBaseTargetFromProps(t, n) {
    return t[n]
  }
  readValueFromInstance(t, n) {
    if (Vr.has(n)) {
      const r = dg(n)
      return (r && r.default) || 0
    }
    return ((n = zg.has(n) ? n : nu(n)), t.getAttribute(n))
  }
  scrapeMotionValuesFromProps(t, n, r) {
    return _g(t, n, r)
  }
  build(t, n, r) {
    Pg(t, n, this.isSVGTag, r.transformTemplate, r.style)
  }
  renderInstance(t, n, r, o) {
    WM(t, n, r, o)
  }
  mount(t) {
    ;((this.isSVGTag = Tg(t.tagName)), super.mount(t))
  }
}
const GM = (e, t) => (Qc(e) ? new HM(t) : new UM(t, { allowProjection: e !== f.Fragment }))
function Pr(e, t, n) {
  const r = e.getProps()
  return eu(r, t, n !== void 0 ? n : r.custom, e)
}
const Sl = (e) => Array.isArray(e)
function ZM(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Dr(n))
}
function KM(e) {
  return Sl(e) ? e[e.length - 1] || 0 : e
}
function YM(e, t) {
  const n = Pr(e, t)
  let { transitionEnd: r = {}, transition: o = {}, ...i } = n || {}
  i = { ...i, ...r }
  for (const s in i) {
    const a = KM(i[s])
    ZM(e, s, a)
  }
}
function XM(e) {
  return !!(qe(e) && e.add)
}
function Cl(e, t) {
  const n = e.getValue('willChange')
  if (XM(n)) return n.add(t)
  if (!n && sn.WillChange) {
    const r = new sn.WillChange('auto')
    ;(e.addValue('willChange', r), r.add(t))
  }
}
function Vg(e) {
  return e.props[Mg]
}
const qM = (e) => e !== null
function JM(e, { repeat: t, repeatType: n = 'loop' }, r) {
  const o = e.filter(qM),
    i = t && n !== 'loop' && t % 2 === 1 ? 0 : o.length - 1
  return o[i]
}
const QM = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
  ek = (e) => ({ type: 'spring', stiffness: 550, damping: e === 0 ? 2 * Math.sqrt(550) : 30, restSpeed: 10 }),
  tk = { type: 'keyframes', duration: 0.8 },
  nk = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
  rk = (e, { keyframes: t }) => (t.length > 2 ? tk : Vr.has(e) ? (e.startsWith('scale') ? ek(t[1]) : QM) : nk)
function ok({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: o,
  repeat: i,
  repeatType: s,
  repeatDelay: a,
  from: l,
  elapsed: c,
  ...u
}) {
  return !!Object.keys(u).length
}
const ru =
  (e, t, n, r = {}, o, i) =>
  (s) => {
    const a = Wc(r, e) || {},
      l = a.delay || r.delay || 0
    let { elapsed: c = 0 } = r
    c = c - Ht(l)
    const u = {
      keyframes: Array.isArray(n) ? n : [null, n],
      ease: 'easeOut',
      velocity: t.getVelocity(),
      ...a,
      delay: -c,
      onUpdate: (h) => {
        ;(t.set(h), a.onUpdate && a.onUpdate(h))
      },
      onComplete: () => {
        ;(s(), a.onComplete && a.onComplete())
      },
      name: e,
      motionValue: t,
      element: i ? void 0 : o,
    }
    ;(ok(a) || Object.assign(u, rk(e, u)),
      u.duration && (u.duration = Ht(u.duration)),
      u.repeatDelay && (u.repeatDelay = Ht(u.repeatDelay)),
      u.from !== void 0 && (u.keyframes[0] = u.from))
    let d = !1
    if (
      ((u.type === !1 || (u.duration === 0 && !u.repeatDelay)) && (gl(u), u.delay === 0 && (d = !0)),
      (sn.instantAnimations || sn.skipAnimations) && ((d = !0), gl(u), (u.delay = 0)),
      (u.allowFlatten = !a.type && !a.ease),
      d && !i && t.get() !== void 0)
    ) {
      const h = JM(u.keyframes, a)
      if (h !== void 0) {
        Ae.update(() => {
          ;(u.onUpdate(h), u.onComplete())
        })
        return
      }
    }
    return a.isSync ? new Bc(u) : new E_(u)
  }
function ik({ protectedKeys: e, needsAnimating: t }, n) {
  const r = e.hasOwnProperty(n) && t[n] !== !0
  return ((t[n] = !1), r)
}
function Bg(e, t, { delay: n = 0, transitionOverride: r, type: o } = {}) {
  let { transition: i = e.getDefaultTransition(), transitionEnd: s, ...a } = t
  r && (i = r)
  const l = [],
    c = o && e.animationState && e.animationState.getState()[o]
  for (const u in a) {
    const d = e.getValue(u, e.latestValues[u] ?? null),
      h = a[u]
    if (h === void 0 || (c && ik(c, u))) continue
    const p = { delay: n, ...Wc(i || {}, u) },
      m = d.get()
    if (m !== void 0 && !d.isAnimating && !Array.isArray(h) && h === m && !p.velocity) continue
    let y = !1
    if (window.MotionHandoffAnimation) {
      const w = Vg(e)
      if (w) {
        const b = window.MotionHandoffAnimation(w, u, Ae)
        b !== null && ((p.startTime = b), (y = !0))
      }
    }
    ;(Cl(e, u), d.start(ru(u, d, h, e.shouldReduceMotion && lg.has(u) ? { type: !1 } : p, e, y)))
    const v = d.animation
    v && l.push(v)
  }
  return (
    s &&
      Promise.all(l).then(() => {
        Ae.update(() => {
          s && YM(e, s)
        })
      }),
    l
  )
}
function Ug(e, t, n, r = 0, o = 1) {
  const i = Array.from(e)
      .sort((c, u) => c.sortNodePosition(u))
      .indexOf(t),
    s = e.size,
    a = (s - 1) * r
  return typeof n == 'function' ? n(i, s) : o === 1 ? i * r : a - i * r
}
function El(e, t, n = {}) {
  const r = Pr(e, t, n.type === 'exit' ? e.presenceContext?.custom : void 0)
  let { transition: o = e.getDefaultTransition() || {} } = r || {}
  n.transitionOverride && (o = n.transitionOverride)
  const i = r ? () => Promise.all(Bg(e, r, n)) : () => Promise.resolve(),
    s =
      e.variantChildren && e.variantChildren.size
        ? (l = 0) => {
            const { delayChildren: c = 0, staggerChildren: u, staggerDirection: d } = o
            return sk(e, t, l, c, u, d, n)
          }
        : () => Promise.resolve(),
    { when: a } = o
  if (a) {
    const [l, c] = a === 'beforeChildren' ? [i, s] : [s, i]
    return l().then(() => c())
  } else return Promise.all([i(), s(n.delay)])
}
function sk(e, t, n = 0, r = 0, o = 0, i = 1, s) {
  const a = []
  for (const l of e.variantChildren)
    (l.notify('AnimationStart', t),
      a.push(
        El(l, t, { ...s, delay: n + (typeof r == 'function' ? 0 : r) + Ug(e.variantChildren, l, r, o, i) }).then(() =>
          l.notify('AnimationComplete', t),
        ),
      ))
  return Promise.all(a)
}
function ak(e, t, n = {}) {
  e.notify('AnimationStart', t)
  let r
  if (Array.isArray(t)) {
    const o = t.map((i) => El(e, i, n))
    r = Promise.all(o)
  } else if (typeof t == 'string') r = El(e, t, n)
  else {
    const o = typeof t == 'function' ? Pr(e, t, n.custom) : t
    r = Promise.all(Bg(e, o, n))
  }
  return r.then(() => {
    e.notify('AnimationComplete', t)
  })
}
function Wg(e, t) {
  if (!Array.isArray(t)) return !1
  const n = t.length
  if (n !== e.length) return !1
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1
  return !0
}
const lk = Xc.length
function Hg(e) {
  if (!e) return
  if (!e.isControllingVariants) {
    const n = e.parent ? Hg(e.parent) || {} : {}
    return (e.props.initial !== void 0 && (n.initial = e.props.initial), n)
  }
  const t = {}
  for (let n = 0; n < lk; n++) {
    const r = Xc[n],
      o = e.props[r]
    ;(To(o) || o === !1) && (t[r] = o)
  }
  return t
}
const ck = [...Yc].reverse(),
  uk = Yc.length
function dk(e) {
  return (t) => Promise.all(t.map(({ animation: n, options: r }) => ak(e, n, r)))
}
function fk(e) {
  let t = dk(e),
    n = Ff(),
    r = !0
  const o = (l) => (c, u) => {
    const d = Pr(e, u, l === 'exit' ? e.presenceContext?.custom : void 0)
    if (d) {
      const { transition: h, transitionEnd: p, ...m } = d
      c = { ...c, ...m, ...p }
    }
    return c
  }
  function i(l) {
    t = l(e)
  }
  function s(l) {
    const { props: c } = e,
      u = Hg(e.parent) || {},
      d = [],
      h = new Set()
    let p = {},
      m = 1 / 0
    for (let v = 0; v < uk; v++) {
      const w = ck[v],
        b = n[w],
        x = c[w] !== void 0 ? c[w] : u[w],
        E = To(x),
        C = w === l ? b.isActive : null
      C === !1 && (m = v)
      let A = x === u[w] && x !== c[w] && E
      if (
        (A && r && e.manuallyAnimateOnMount && (A = !1),
        (b.protectedKeys = { ...p }),
        (!b.isActive && C === null) || (!x && !b.prevProp) || Ts(x) || typeof x == 'boolean')
      )
        continue
      const S = hk(b.prevProp, x)
      let R = S || (w === l && b.isActive && !A && E) || (v > m && E),
        I = !1
      const N = Array.isArray(x) ? x : [x]
      let G = N.reduce(o(w), {})
      C === !1 && (G = {})
      const { prevResolvedValues: oe = {} } = b,
        te = { ...oe, ...G },
        L = (D) => {
          ;((R = !0), h.has(D) && ((I = !0), h.delete(D)), (b.needsAnimating[D] = !0))
          const _ = e.getValue(D)
          _ && (_.liveStyle = !1)
        }
      for (const D in te) {
        const _ = G[D],
          k = oe[D]
        if (p.hasOwnProperty(D)) continue
        let W = !1
        ;(Sl(_) && Sl(k) ? (W = !Wg(_, k)) : (W = _ !== k),
          W ? (_ != null ? L(D) : h.add(D)) : _ !== void 0 && h.has(D) ? L(D) : (b.protectedKeys[D] = !0))
      }
      ;((b.prevProp = x),
        (b.prevResolvedValues = G),
        b.isActive && (p = { ...p, ...G }),
        r && e.blockInitialAnimation && (R = !1))
      const F = A && S
      R &&
        (!F || I) &&
        d.push(
          ...N.map((D) => {
            const _ = { type: w }
            if (typeof D == 'string' && r && !F && e.manuallyAnimateOnMount && e.parent) {
              const { parent: k } = e,
                W = Pr(k, D)
              if (k.enteringChildren && W) {
                const { delayChildren: q } = W.transition || {}
                _.delay = Ug(k.enteringChildren, e, q)
              }
            }
            return { animation: D, options: _ }
          }),
        )
    }
    if (h.size) {
      const v = {}
      if (typeof c.initial != 'boolean') {
        const w = Pr(e, Array.isArray(c.initial) ? c.initial[0] : c.initial)
        w && w.transition && (v.transition = w.transition)
      }
      ;(h.forEach((w) => {
        const b = e.getBaseTarget(w),
          x = e.getValue(w)
        ;(x && (x.liveStyle = !0), (v[w] = b ?? null))
      }),
        d.push({ animation: v }))
    }
    let y = !!d.length
    return (
      r && (c.initial === !1 || c.initial === c.animate) && !e.manuallyAnimateOnMount && (y = !1),
      (r = !1),
      y ? t(d) : Promise.resolve()
    )
  }
  function a(l, c) {
    if (n[l].isActive === c) return Promise.resolve()
    ;(e.variantChildren?.forEach((d) => d.animationState?.setActive(l, c)), (n[l].isActive = c))
    const u = s(l)
    for (const d in n) n[d].protectedKeys = {}
    return u
  }
  return {
    animateChanges: s,
    setActive: a,
    setAnimateFunction: i,
    getState: () => n,
    reset: () => {
      n = Ff()
    },
  }
}
function hk(e, t) {
  return typeof t == 'string' ? t !== e : Array.isArray(t) ? !Wg(t, e) : !1
}
function $n(e = !1) {
  return { isActive: e, protectedKeys: {}, needsAnimating: {}, prevResolvedValues: {} }
}
function Ff() {
  return {
    animate: $n(!0),
    whileInView: $n(),
    whileHover: $n(),
    whileTap: $n(),
    whileDrag: $n(),
    whileFocus: $n(),
    exit: $n(),
  }
}
class An {
  constructor(t) {
    ;((this.isMounted = !1), (this.node = t))
  }
  update() {}
}
class pk extends An {
  constructor(t) {
    ;(super(t), t.animationState || (t.animationState = fk(t)))
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps()
    Ts(t) && (this.unmountControls = t.subscribe(this.node))
  }
  mount() {
    this.updateAnimationControlsSubscription()
  }
  update() {
    const { animate: t } = this.node.getProps(),
      { animate: n } = this.node.prevProps || {}
    t !== n && this.updateAnimationControlsSubscription()
  }
  unmount() {
    ;(this.node.animationState.reset(), this.unmountControls?.())
  }
}
let mk = 0
class gk extends An {
  constructor() {
    ;(super(...arguments), (this.id = mk++))
  }
  update() {
    if (!this.node.presenceContext) return
    const { isPresent: t, onExitComplete: n } = this.node.presenceContext,
      { isPresent: r } = this.node.prevPresenceContext || {}
    if (!this.node.animationState || t === r) return
    const o = this.node.animationState.setActive('exit', !t)
    n &&
      !t &&
      o.then(() => {
        n(this.id)
      })
  }
  mount() {
    const { register: t, onExitComplete: n } = this.node.presenceContext || {}
    ;(n && n(this.id), t && (this.unmount = t(this.id)))
  }
  unmount() {}
}
const yk = { animation: { Feature: pk }, exit: { Feature: gk } }
function _o(e, t, n, r = { passive: !0 }) {
  return (e.addEventListener(t, n, r), () => e.removeEventListener(t, n))
}
function Wo(e) {
  return { point: { x: e.pageX, y: e.pageY } }
}
const vk = (e) => (t) => Zc(t) && e(t, Wo(t))
function go(e, t, n, r) {
  return _o(e, t, vk(n), r)
}
const Gg = 1e-4,
  bk = 1 - Gg,
  wk = 1 + Gg,
  Zg = 0.01,
  xk = 0 - Zg,
  Sk = 0 + Zg
function ot(e) {
  return e.max - e.min
}
function Ck(e, t, n) {
  return Math.abs(e - t) <= n
}
function zf(e, t, n, r = 0.5) {
  ;((e.origin = r),
    (e.originPoint = ke(t.min, t.max, e.origin)),
    (e.scale = ot(n) / ot(t)),
    (e.translate = ke(n.min, n.max, e.origin) - e.originPoint),
    ((e.scale >= bk && e.scale <= wk) || isNaN(e.scale)) && (e.scale = 1),
    ((e.translate >= xk && e.translate <= Sk) || isNaN(e.translate)) && (e.translate = 0))
}
function yo(e, t, n, r) {
  ;(zf(e.x, t.x, n.x, r ? r.originX : void 0), zf(e.y, t.y, n.y, r ? r.originY : void 0))
}
function Vf(e, t, n) {
  ;((e.min = n.min + t.min), (e.max = e.min + ot(t)))
}
function Ek(e, t, n) {
  ;(Vf(e.x, t.x, n.x), Vf(e.y, t.y, n.y))
}
function Bf(e, t, n) {
  ;((e.min = t.min - n.min), (e.max = e.min + ot(t)))
}
function vo(e, t, n) {
  ;(Bf(e.x, t.x, n.x), Bf(e.y, t.y, n.y))
}
function vt(e) {
  return [e('x'), e('y')]
}
const Kg = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  Uf = (e, t) => Math.abs(e - t)
function Pk(e, t) {
  const n = Uf(e.x, t.x),
    r = Uf(e.y, t.y)
  return Math.sqrt(n ** 2 + r ** 2)
}
class Yg {
  constructor(
    t,
    n,
    { transformPagePoint: r, contextWindow: o = window, dragSnapToOrigin: i = !1, distanceThreshold: s = 3 } = {},
  ) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return
        const h = Pa(this.lastMoveEventInfo, this.history),
          p = this.startEvent !== null,
          m = Pk(h.offset, { x: 0, y: 0 }) >= this.distanceThreshold
        if (!p && !m) return
        const { point: y } = h,
          { timestamp: v } = Ke
        this.history.push({ ...y, timestamp: v })
        const { onStart: w, onMove: b } = this.handlers
        ;(p || (w && w(this.lastMoveEvent, h), (this.startEvent = this.lastMoveEvent)), b && b(this.lastMoveEvent, h))
      }),
      (this.handlePointerMove = (h, p) => {
        ;((this.lastMoveEvent = h),
          (this.lastMoveEventInfo = Ea(p, this.transformPagePoint)),
          Ae.update(this.updatePoint, !0))
      }),
      (this.handlePointerUp = (h, p) => {
        this.end()
        const { onEnd: m, onSessionEnd: y, resumeAnimation: v } = this.handlers
        if ((this.dragSnapToOrigin && v && v(), !(this.lastMoveEvent && this.lastMoveEventInfo))) return
        const w = Pa(h.type === 'pointercancel' ? this.lastMoveEventInfo : Ea(p, this.transformPagePoint), this.history)
        ;(this.startEvent && m && m(h, w), y && y(h, w))
      }),
      !Zc(t))
    )
      return
    ;((this.dragSnapToOrigin = i),
      (this.handlers = n),
      (this.transformPagePoint = r),
      (this.distanceThreshold = s),
      (this.contextWindow = o || window))
    const a = Wo(t),
      l = Ea(a, this.transformPagePoint),
      { point: c } = l,
      { timestamp: u } = Ke
    this.history = [{ ...c, timestamp: u }]
    const { onSessionStart: d } = n
    ;(d && d(t, Pa(l, this.history)),
      (this.removeListeners = Vo(
        go(this.contextWindow, 'pointermove', this.handlePointerMove),
        go(this.contextWindow, 'pointerup', this.handlePointerUp),
        go(this.contextWindow, 'pointercancel', this.handlePointerUp),
      )))
  }
  updateHandlers(t) {
    this.handlers = t
  }
  end() {
    ;(this.removeListeners && this.removeListeners(), Sn(this.updatePoint))
  }
}
function Ea(e, t) {
  return t ? { point: t(e.point) } : e
}
function Wf(e, t) {
  return { x: e.x - t.x, y: e.y - t.y }
}
function Pa({ point: e }, t) {
  return { point: e, delta: Wf(e, Xg(t)), offset: Wf(e, Rk(t)), velocity: Tk(t, 0.1) }
}
function Rk(e) {
  return e[0]
}
function Xg(e) {
  return e[e.length - 1]
}
function Tk(e, t) {
  if (e.length < 2) return { x: 0, y: 0 }
  let n = e.length - 1,
    r = null
  const o = Xg(e)
  for (; n >= 0 && ((r = e[n]), !(o.timestamp - r.timestamp > Ht(t))); ) n--
  if (!r) return { x: 0, y: 0 }
  const i = wt(o.timestamp - r.timestamp)
  if (i === 0) return { x: 0, y: 0 }
  const s = { x: (o.x - r.x) / i, y: (o.y - r.y) / i }
  return (s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s)
}
function Ak(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? ke(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? ke(n, e, r.max) : Math.min(e, n)),
    e
  )
}
function Hf(e, t, n) {
  return { min: t !== void 0 ? e.min + t : void 0, max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0 }
}
function _k(e, { top: t, left: n, bottom: r, right: o }) {
  return { x: Hf(e.x, n, o), y: Hf(e.y, t, r) }
}
function Gf(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max
  return (t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r })
}
function Mk(e, t) {
  return { x: Gf(e.x, t.x), y: Gf(e.y, t.y) }
}
function kk(e, t) {
  let n = 0.5
  const r = ot(e),
    o = ot(t)
  return (o > r ? (n = Co(t.min, t.max - r, e.min)) : r > o && (n = Co(e.min, e.max - o, t.min)), on(0, 1, n))
}
function Dk(e, t) {
  const n = {}
  return (t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n)
}
const Pl = 0.35
function Ik(e = Pl) {
  return (e === !1 ? (e = 0) : e === !0 && (e = Pl), { x: Zf(e, 'left', 'right'), y: Zf(e, 'top', 'bottom') })
}
function Zf(e, t, n) {
  return { min: Kf(e, t), max: Kf(e, n) }
}
function Kf(e, t) {
  return typeof e == 'number' ? e : e[t] || 0
}
const Ok = new WeakMap()
class Nk {
  constructor(t) {
    ;((this.openDragLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = Le()),
      (this.latestPointerEvent = null),
      (this.latestPanInfo = null),
      (this.visualElement = t))
  }
  start(t, { snapToCursor: n = !1, distanceThreshold: r } = {}) {
    const { presenceContext: o } = this.visualElement
    if (o && o.isPresent === !1) return
    const i = (d) => {
        const { dragSnapToOrigin: h } = this.getProps()
        ;(h ? this.pauseAnimation() : this.stopAnimation(), n && this.snapToCursor(Wo(d).point))
      },
      s = (d, h) => {
        const { drag: p, dragPropagation: m, onDragStart: y } = this.getProps()
        if (p && !m && (this.openDragLock && this.openDragLock(), (this.openDragLock = z_(p)), !this.openDragLock))
          return
        ;((this.latestPointerEvent = d),
          (this.latestPanInfo = h),
          (this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0), (this.visualElement.projection.target = void 0)),
          vt((w) => {
            let b = this.getAxisMotionValue(w).get() || 0
            if (Gt.test(b)) {
              const { projection: x } = this.visualElement
              if (x && x.layout) {
                const E = x.layout.layoutBox[w]
                E && (b = ot(E) * (parseFloat(b) / 100))
              }
            }
            this.originPoint[w] = b
          }),
          y && Ae.postRender(() => y(d, h)),
          Cl(this.visualElement, 'transform'))
        const { animationState: v } = this.visualElement
        v && v.setActive('whileDrag', !0)
      },
      a = (d, h) => {
        ;((this.latestPointerEvent = d), (this.latestPanInfo = h))
        const { dragPropagation: p, dragDirectionLock: m, onDirectionLock: y, onDrag: v } = this.getProps()
        if (!p && !this.openDragLock) return
        const { offset: w } = h
        if (m && this.currentDirection === null) {
          ;((this.currentDirection = Lk(w)), this.currentDirection !== null && y && y(this.currentDirection))
          return
        }
        ;(this.updateAxis('x', h.point, w), this.updateAxis('y', h.point, w), this.visualElement.render(), v && v(d, h))
      },
      l = (d, h) => {
        ;((this.latestPointerEvent = d),
          (this.latestPanInfo = h),
          this.stop(d, h),
          (this.latestPointerEvent = null),
          (this.latestPanInfo = null))
      },
      c = () => vt((d) => this.getAnimationState(d) === 'paused' && this.getAxisMotionValue(d).animation?.play()),
      { dragSnapToOrigin: u } = this.getProps()
    this.panSession = new Yg(
      t,
      { onSessionStart: i, onStart: s, onMove: a, onSessionEnd: l, resumeAnimation: c },
      {
        transformPagePoint: this.visualElement.getTransformPagePoint(),
        dragSnapToOrigin: u,
        distanceThreshold: r,
        contextWindow: Kg(this.visualElement),
      },
    )
  }
  stop(t, n) {
    const r = t || this.latestPointerEvent,
      o = n || this.latestPanInfo,
      i = this.isDragging
    if ((this.cancel(), !i || !o || !r)) return
    const { velocity: s } = o
    this.startAnimation(s)
    const { onDragEnd: a } = this.getProps()
    a && Ae.postRender(() => a(r, o))
  }
  cancel() {
    this.isDragging = !1
    const { projection: t, animationState: n } = this.visualElement
    ;(t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), (this.panSession = void 0))
    const { dragPropagation: r } = this.getProps()
    ;(!r && this.openDragLock && (this.openDragLock(), (this.openDragLock = null)), n && n.setActive('whileDrag', !1))
  }
  updateAxis(t, n, r) {
    const { drag: o } = this.getProps()
    if (!r || !yi(t, o, this.currentDirection)) return
    const i = this.getAxisMotionValue(t)
    let s = this.originPoint[t] + r[t]
    ;(this.constraints && this.constraints[t] && (s = Ak(s, this.constraints[t], this.elastic[t])), i.set(s))
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: n } = this.getProps(),
      r =
        this.visualElement.projection && !this.visualElement.projection.layout
          ? this.visualElement.projection.measure(!1)
          : this.visualElement.projection?.layout,
      o = this.constraints
    ;(t && vr(t)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : t && r
        ? (this.constraints = _k(r.layoutBox, t))
        : (this.constraints = !1),
      (this.elastic = Ik(n)),
      o !== this.constraints &&
        r &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        vt((i) => {
          this.constraints !== !1 &&
            this.getAxisMotionValue(i) &&
            (this.constraints[i] = Dk(r.layoutBox[i], this.constraints[i]))
        }))
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: n } = this.getProps()
    if (!t || !vr(t)) return !1
    const r = t.current,
      { projection: o } = this.visualElement
    if (!o || !o.layout) return !1
    const i = jM(r, o.root, this.visualElement.getTransformPagePoint())
    let s = Mk(o.layout.layoutBox, i)
    if (n) {
      const a = n(OM(s))
      ;((this.hasMutatedConstraints = !!a), a && (s = Ig(a)))
    }
    return s
  }
  startAnimation(t) {
    const {
        drag: n,
        dragMomentum: r,
        dragElastic: o,
        dragTransition: i,
        dragSnapToOrigin: s,
        onDragTransitionEnd: a,
      } = this.getProps(),
      l = this.constraints || {},
      c = vt((u) => {
        if (!yi(u, n, this.currentDirection)) return
        let d = (l && l[u]) || {}
        s && (d = { min: 0, max: 0 })
        const h = o ? 200 : 1e6,
          p = o ? 40 : 1e7,
          m = {
            type: 'inertia',
            velocity: r ? t[u] : 0,
            bounceStiffness: h,
            bounceDamping: p,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...i,
            ...d,
          }
        return this.startAxisValueAnimation(u, m)
      })
    return Promise.all(c).then(a)
  }
  startAxisValueAnimation(t, n) {
    const r = this.getAxisMotionValue(t)
    return (Cl(this.visualElement, t), r.start(ru(t, r, 0, n, this.visualElement, !1)))
  }
  stopAnimation() {
    vt((t) => this.getAxisMotionValue(t).stop())
  }
  pauseAnimation() {
    vt((t) => this.getAxisMotionValue(t).animation?.pause())
  }
  getAnimationState(t) {
    return this.getAxisMotionValue(t).animation?.state
  }
  getAxisMotionValue(t) {
    const n = `_drag${t.toUpperCase()}`,
      r = this.visualElement.getProps(),
      o = r[n]
    return o || this.visualElement.getValue(t, (r.initial ? r.initial[t] : void 0) || 0)
  }
  snapToCursor(t) {
    vt((n) => {
      const { drag: r } = this.getProps()
      if (!yi(n, r, this.currentDirection)) return
      const { projection: o } = this.visualElement,
        i = this.getAxisMotionValue(n)
      if (o && o.layout) {
        const { min: s, max: a } = o.layout.layoutBox[n]
        i.set(t[n] - ke(s, a, 0.5))
      }
    })
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return
    const { drag: t, dragConstraints: n } = this.getProps(),
      { projection: r } = this.visualElement
    if (!vr(n) || !r || !this.constraints) return
    this.stopAnimation()
    const o = { x: 0, y: 0 }
    vt((s) => {
      const a = this.getAxisMotionValue(s)
      if (a && this.constraints !== !1) {
        const l = a.get()
        o[s] = kk({ min: l, max: l }, this.constraints[s])
      }
    })
    const { transformTemplate: i } = this.visualElement.getProps()
    ;((this.visualElement.current.style.transform = i ? i({}, '') : 'none'),
      r.root && r.root.updateScroll(),
      r.updateLayout(),
      this.resolveConstraints(),
      vt((s) => {
        if (!yi(s, t, null)) return
        const a = this.getAxisMotionValue(s),
          { min: l, max: c } = this.constraints[s]
        a.set(ke(l, c, o[s]))
      }))
  }
  addListeners() {
    if (!this.visualElement.current) return
    Ok.set(this.visualElement, this)
    const t = this.visualElement.current,
      n = go(t, 'pointerdown', (l) => {
        const { drag: c, dragListener: u = !0 } = this.getProps()
        c && u && this.start(l)
      }),
      r = () => {
        const { dragConstraints: l } = this.getProps()
        vr(l) && l.current && (this.constraints = this.resolveRefConstraints())
      },
      { projection: o } = this.visualElement,
      i = o.addEventListener('measure', r)
    ;(o && !o.layout && (o.root && o.root.updateScroll(), o.updateLayout()), Ae.read(r))
    const s = _o(window, 'resize', () => this.scalePositionWithinConstraints()),
      a = o.addEventListener('didUpdate', ({ delta: l, hasLayoutChanged: c }) => {
        this.isDragging &&
          c &&
          (vt((u) => {
            const d = this.getAxisMotionValue(u)
            d && ((this.originPoint[u] += l[u].translate), d.set(d.get() + l[u].translate))
          }),
          this.visualElement.render())
      })
    return () => {
      ;(s(), n(), i(), a && a())
    }
  }
  getProps() {
    const t = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: r = !1,
        dragPropagation: o = !1,
        dragConstraints: i = !1,
        dragElastic: s = Pl,
        dragMomentum: a = !0,
      } = t
    return {
      ...t,
      drag: n,
      dragDirectionLock: r,
      dragPropagation: o,
      dragConstraints: i,
      dragElastic: s,
      dragMomentum: a,
    }
  }
}
function yi(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e)
}
function Lk(e, t = 10) {
  let n = null
  return (Math.abs(e.y) > t ? (n = 'y') : Math.abs(e.x) > t && (n = 'x'), n)
}
class jk extends An {
  constructor(t) {
    ;(super(t), (this.removeGroupControls = xt), (this.removeListeners = xt), (this.controls = new Nk(t)))
  }
  mount() {
    const { dragControls: t } = this.node.getProps()
    ;(t && (this.removeGroupControls = t.subscribe(this.controls)),
      (this.removeListeners = this.controls.addListeners() || xt))
  }
  unmount() {
    ;(this.removeGroupControls(), this.removeListeners())
  }
}
const Yf = (e) => (t, n) => {
  e && Ae.postRender(() => e(t, n))
}
class $k extends An {
  constructor() {
    ;(super(...arguments), (this.removePointerDownListener = xt))
  }
  onPointerDown(t) {
    this.session = new Yg(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Kg(this.node),
    })
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: n, onPan: r, onPanEnd: o } = this.node.getProps()
    return {
      onSessionStart: Yf(t),
      onStart: Yf(n),
      onMove: r,
      onEnd: (i, s) => {
        ;(delete this.session, o && Ae.postRender(() => o(i, s)))
      },
    }
  }
  mount() {
    this.removePointerDownListener = go(this.node.current, 'pointerdown', (t) => this.onPointerDown(t))
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers())
  }
  unmount() {
    ;(this.removePointerDownListener(), this.session && this.session.end())
  }
}
const Oi = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 }
function Xf(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100
}
const so = {
    correct: (e, t) => {
      if (!t.target) return e
      if (typeof e == 'string')
        if (ue.test(e)) e = parseFloat(e)
        else return e
      const n = Xf(e, t.target.x),
        r = Xf(e, t.target.y)
      return `${n}% ${r}%`
    },
  },
  Fk = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      const r = e,
        o = Cn.parse(e)
      if (o.length > 5) return r
      const i = Cn.createTransformer(e),
        s = typeof o[0] != 'number' ? 1 : 0,
        a = n.x.scale * t.x,
        l = n.y.scale * t.y
      ;((o[0 + s] /= a), (o[1 + s] /= l))
      const c = ke(a, l, 0.5)
      return (typeof o[2 + s] == 'number' && (o[2 + s] /= c), typeof o[3 + s] == 'number' && (o[3 + s] /= c), i(o))
    },
  }
let Ra = !1
class zk extends f.Component {
  componentDidMount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r, layoutId: o } = this.props,
      { projection: i } = t
    ;(lM(Vk),
      i &&
        (n.group && n.group.add(i),
        r && r.register && o && r.register(i),
        Ra && i.root.didUpdate(),
        i.addEventListener('animationComplete', () => {
          this.safeToRemove()
        }),
        i.setOptions({ ...i.options, onExitComplete: () => this.safeToRemove() })),
      (Oi.hasEverUpdated = !0))
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: n, visualElement: r, drag: o, isPresent: i } = this.props,
      { projection: s } = r
    return (
      s &&
        ((s.isPresent = i),
        (Ra = !0),
        o || t.layoutDependency !== n || n === void 0 || t.isPresent !== i ? s.willUpdate() : this.safeToRemove(),
        t.isPresent !== i &&
          (i
            ? s.promote()
            : s.relegate() ||
              Ae.postRender(() => {
                const a = s.getStack()
                ;(!a || !a.members.length) && this.safeToRemove()
              }))),
      null
    )
  }
  componentDidUpdate() {
    const { projection: t } = this.props.visualElement
    t &&
      (t.root.didUpdate(),
      Gc.postRender(() => {
        !t.currentAnimation && t.isLead() && this.safeToRemove()
      }))
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: n, switchLayoutGroup: r } = this.props,
      { projection: o } = t
    ;((Ra = !0),
      o && (o.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(o), r && r.deregister && r.deregister(o)))
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props
    t && t()
  }
  render() {
    return null
  }
}
function qg(e) {
  const [t, n] = bg(),
    r = f.useContext(Pc)
  return g.jsx(zk, { ...e, layoutGroup: r, switchLayoutGroup: f.useContext(kg), isPresent: t, safeToRemove: n })
}
const Vk = {
  borderRadius: {
    ...so,
    applyTo: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius'],
  },
  borderTopLeftRadius: so,
  borderTopRightRadius: so,
  borderBottomLeftRadius: so,
  borderBottomRightRadius: so,
  boxShadow: Fk,
}
function Bk(e, t, n) {
  const r = qe(e) ? e : Dr(e)
  return (r.start(ru('', r, t, n)), r.animation)
}
const Uk = (e, t) => e.depth - t.depth
class Wk {
  constructor() {
    ;((this.children = []), (this.isDirty = !1))
  }
  add(t) {
    ;(Tc(this.children, t), (this.isDirty = !0))
  }
  remove(t) {
    ;(Ac(this.children, t), (this.isDirty = !0))
  }
  forEach(t) {
    ;(this.isDirty && this.children.sort(Uk), (this.isDirty = !1), this.children.forEach(t))
  }
}
function Hk(e, t) {
  const n = ct.now(),
    r = ({ timestamp: o }) => {
      const i = o - n
      i >= t && (Sn(r), e(i - t))
    }
  return (Ae.setup(r, !0), () => Sn(r))
}
const Jg = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
  Gk = Jg.length,
  qf = (e) => (typeof e == 'string' ? parseFloat(e) : e),
  Jf = (e) => typeof e == 'number' || ue.test(e)
function Zk(e, t, n, r, o, i) {
  o
    ? ((e.opacity = ke(0, n.opacity ?? 1, Kk(r))), (e.opacityExit = ke(t.opacity ?? 1, 0, Yk(r))))
    : i && (e.opacity = ke(t.opacity ?? 1, n.opacity ?? 1, r))
  for (let s = 0; s < Gk; s++) {
    const a = `border${Jg[s]}Radius`
    let l = Qf(t, a),
      c = Qf(n, a)
    if (l === void 0 && c === void 0) continue
    ;(l || (l = 0),
      c || (c = 0),
      l === 0 || c === 0 || Jf(l) === Jf(c)
        ? ((e[a] = Math.max(ke(qf(l), qf(c), r), 0)), (Gt.test(c) || Gt.test(l)) && (e[a] += '%'))
        : (e[a] = c))
  }
  ;(t.rotate || n.rotate) && (e.rotate = ke(t.rotate || 0, n.rotate || 0, r))
}
function Qf(e, t) {
  return e[t] !== void 0 ? e[t] : e.borderRadius
}
const Kk = Qg(0, 0.5, Fm),
  Yk = Qg(0.5, 0.95, xt)
function Qg(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(Co(e, t, r)))
}
function eh(e, t) {
  ;((e.min = t.min), (e.max = t.max))
}
function yt(e, t) {
  ;(eh(e.x, t.x), eh(e.y, t.y))
}
function th(e, t) {
  ;((e.translate = t.translate), (e.scale = t.scale), (e.originPoint = t.originPoint), (e.origin = t.origin))
}
function nh(e, t, n, r, o) {
  return ((e -= t), (e = es(e, 1 / n, r)), o !== void 0 && (e = es(e, 1 / o, r)), e)
}
function Xk(e, t = 0, n = 1, r = 0.5, o, i = e, s = e) {
  if ((Gt.test(t) && ((t = parseFloat(t)), (t = ke(s.min, s.max, t / 100) - s.min)), typeof t != 'number')) return
  let a = ke(i.min, i.max, r)
  ;(e === i && (a -= t), (e.min = nh(e.min, t, n, a, o)), (e.max = nh(e.max, t, n, a, o)))
}
function rh(e, t, [n, r, o], i, s) {
  Xk(e, t[n], t[r], t[o], t.scale, i, s)
}
const qk = ['x', 'scaleX', 'originX'],
  Jk = ['y', 'scaleY', 'originY']
function oh(e, t, n, r) {
  ;(rh(e.x, t, qk, n ? n.x : void 0, r ? r.x : void 0), rh(e.y, t, Jk, n ? n.y : void 0, r ? r.y : void 0))
}
function ih(e) {
  return e.translate === 0 && e.scale === 1
}
function ey(e) {
  return ih(e.x) && ih(e.y)
}
function sh(e, t) {
  return e.min === t.min && e.max === t.max
}
function Qk(e, t) {
  return sh(e.x, t.x) && sh(e.y, t.y)
}
function ah(e, t) {
  return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max)
}
function ty(e, t) {
  return ah(e.x, t.x) && ah(e.y, t.y)
}
function lh(e) {
  return ot(e.x) / ot(e.y)
}
function ch(e, t) {
  return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint
}
class e2 {
  constructor() {
    this.members = []
  }
  add(t) {
    ;(Tc(this.members, t), t.scheduleRender())
  }
  remove(t) {
    if ((Ac(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead)) {
      const n = this.members[this.members.length - 1]
      n && this.promote(n)
    }
  }
  relegate(t) {
    const n = this.members.findIndex((o) => t === o)
    if (n === 0) return !1
    let r
    for (let o = n; o >= 0; o--) {
      const i = this.members[o]
      if (i.isPresent !== !1) {
        r = i
        break
      }
    }
    return r ? (this.promote(r), !0) : !1
  }
  promote(t, n) {
    const r = this.lead
    if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
      ;(r.instance && r.scheduleRender(),
        t.scheduleRender(),
        (t.resumeFrom = r),
        n && (t.resumeFrom.preserveOpacity = !0),
        r.snapshot && ((t.snapshot = r.snapshot), (t.snapshot.latestValues = r.animationValues || r.latestValues)),
        t.root && t.root.isUpdating && (t.isLayoutDirty = !0))
      const { crossfade: o } = t.options
      o === !1 && r.hide()
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      const { options: n, resumingFrom: r } = t
      ;(n.onExitComplete && n.onExitComplete(), r && r.options.onExitComplete && r.options.onExitComplete())
    })
  }
  scheduleRender() {
    this.members.forEach((t) => {
      t.instance && t.scheduleRender(!1)
    })
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0)
  }
}
function t2(e, t, n) {
  let r = ''
  const o = e.x.translate / t.x,
    i = e.y.translate / t.y,
    s = n?.z || 0
  if (
    ((o || i || s) && (r = `translate3d(${o}px, ${i}px, ${s}px) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    const { transformPerspective: c, rotate: u, rotateX: d, rotateY: h, skewX: p, skewY: m } = n
    ;(c && (r = `perspective(${c}px) ${r}`),
      u && (r += `rotate(${u}deg) `),
      d && (r += `rotateX(${d}deg) `),
      h && (r += `rotateY(${h}deg) `),
      p && (r += `skewX(${p}deg) `),
      m && (r += `skewY(${m}deg) `))
  }
  const a = e.x.scale * t.x,
    l = e.y.scale * t.y
  return ((a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || 'none')
}
const Ta = ['', 'X', 'Y', 'Z'],
  n2 = 1e3
let r2 = 0
function Aa(e, t, n, r) {
  const { latestValues: o } = t
  o[e] && ((n[e] = o[e]), t.setStaticValue(e, 0), r && (r[e] = 0))
}
function ny(e) {
  if (((e.hasCheckedOptimisedAppear = !0), e.root === e)) return
  const { visualElement: t } = e.options
  if (!t) return
  const n = Vg(t)
  if (window.MotionHasOptimisedAnimation(n, 'transform')) {
    const { layout: o, layoutId: i } = e.options
    window.MotionCancelOptimisedAnimation(n, 'transform', Ae, !(o || i))
  }
  const { parent: r } = e
  r && !r.hasCheckedOptimisedAppear && ny(r)
}
function ry({ attachResizeListener: e, defaultParent: t, measureScroll: n, checkIsScrollRoot: r, resetTransform: o }) {
  return class {
    constructor(s = {}, a = t?.()) {
      ;((this.id = r2++),
        (this.animationId = 0),
        (this.animationCommitId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.hasCheckedOptimisedAppear = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.scheduleUpdate = () => this.update()),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots())
        }),
        (this.updateProjection = () => {
          ;((this.projectionUpdateScheduled = !1),
            this.nodes.forEach(s2),
            this.nodes.forEach(u2),
            this.nodes.forEach(d2),
            this.nodes.forEach(a2))
        }),
        (this.resolvedRelativeTargetAt = 0),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = s),
        (this.root = a ? a.root || a : this),
        (this.path = a ? [...a.path, a] : []),
        (this.parent = a),
        (this.depth = a ? a.depth + 1 : 0))
      for (let l = 0; l < this.path.length; l++) this.path[l].shouldResetTransform = !0
      this.root === this && (this.nodes = new Wk())
    }
    addEventListener(s, a) {
      return (this.eventHandlers.has(s) || this.eventHandlers.set(s, new kc()), this.eventHandlers.get(s).add(a))
    }
    notifyListeners(s, ...a) {
      const l = this.eventHandlers.get(s)
      l && l.notify(...a)
    }
    hasListeners(s) {
      return this.eventHandlers.has(s)
    }
    mount(s) {
      if (this.instance) return
      ;((this.isSVG = vg(s) && !G_(s)), (this.instance = s))
      const { layoutId: a, layout: l, visualElement: c } = this.options
      if (
        (c && !c.current && c.mount(s),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0),
        e)
      ) {
        let u,
          d = 0
        const h = () => (this.root.updateBlockedByResize = !1)
        ;(Ae.read(() => {
          d = window.innerWidth
        }),
          e(s, () => {
            const p = window.innerWidth
            p !== d &&
              ((d = p),
              (this.root.updateBlockedByResize = !0),
              u && u(),
              (u = Hk(h, 250)),
              Oi.hasAnimatedSinceResize && ((Oi.hasAnimatedSinceResize = !1), this.nodes.forEach(fh)))
          }))
      }
      ;(a && this.root.registerSharedNode(a, this),
        this.options.animate !== !1 &&
          c &&
          (a || l) &&
          this.addEventListener(
            'didUpdate',
            ({ delta: u, hasLayoutChanged: d, hasRelativeLayoutChanged: h, layout: p }) => {
              if (this.isTreeAnimationBlocked()) {
                ;((this.target = void 0), (this.relativeTarget = void 0))
                return
              }
              const m = this.options.transition || c.getDefaultTransition() || g2,
                { onLayoutAnimationStart: y, onLayoutAnimationComplete: v } = c.getProps(),
                w = !this.targetLayout || !ty(this.targetLayout, p),
                b = !d && h
              if (this.options.layoutRoot || this.resumeFrom || b || (d && (w || !this.currentAnimation))) {
                this.resumeFrom && ((this.resumingFrom = this.resumeFrom), (this.resumingFrom.resumingFrom = void 0))
                const x = { ...Wc(m, 'layout'), onPlay: y, onComplete: v }
                ;((c.shouldReduceMotion || this.options.layoutRoot) && ((x.delay = 0), (x.type = !1)),
                  this.startAnimation(x),
                  this.setAnimationOrigin(u, b))
              } else (d || fh(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete())
              this.targetLayout = p
            },
          ))
    }
    unmount() {
      ;(this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this))
      const s = this.getStack()
      ;(s && s.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        this.eventHandlers.clear(),
        Sn(this.updateProjection))
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1
    }
    startUpdate() {
      this.isUpdateBlocked() || ((this.isUpdating = !0), this.nodes && this.nodes.forEach(f2), this.animationId++)
    }
    getTransformTemplate() {
      const { visualElement: s } = this.options
      return s && s.getProps().transformTemplate
    }
    willUpdate(s = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete()
        return
      }
      if (
        (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && ny(this),
        !this.root.isUpdating && this.root.startUpdate(),
        this.isLayoutDirty)
      )
        return
      this.isLayoutDirty = !0
      for (let u = 0; u < this.path.length; u++) {
        const d = this.path[u]
        ;((d.shouldResetTransform = !0), d.updateScroll('snapshot'), d.options.layoutRoot && d.willUpdate(!1))
      }
      const { layoutId: a, layout: l } = this.options
      if (a === void 0 && !l) return
      const c = this.getTransformTemplate()
      ;((this.prevTransformTemplateValue = c ? c(this.latestValues, '') : void 0),
        this.updateSnapshot(),
        s && this.notifyListeners('willUpdate'))
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        ;(this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(uh))
        return
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(dh)
        return
      }
      ;((this.animationCommitId = this.animationId),
        this.isUpdating
          ? ((this.isUpdating = !1), this.nodes.forEach(c2), this.nodes.forEach(o2), this.nodes.forEach(i2))
          : this.nodes.forEach(dh),
        this.clearAllSnapshots())
      const a = ct.now()
      ;((Ke.delta = on(0, 1e3 / 60, a - Ke.timestamp)),
        (Ke.timestamp = a),
        (Ke.isProcessing = !0),
        ma.update.process(Ke),
        ma.preRender.process(Ke),
        ma.render.process(Ke),
        (Ke.isProcessing = !1))
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), Gc.read(this.scheduleUpdate))
    }
    clearAllSnapshots() {
      ;(this.nodes.forEach(l2), this.sharedNodes.forEach(h2))
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), Ae.preRender(this.updateProjection, !1, !0))
    }
    scheduleCheckAfterUnmount() {
      Ae.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
      })
    }
    updateSnapshot() {
      this.snapshot ||
        !this.instance ||
        ((this.snapshot = this.measure()),
        this.snapshot &&
          !ot(this.snapshot.measuredBox.x) &&
          !ot(this.snapshot.measuredBox.y) &&
          (this.snapshot = void 0))
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll()
      const s = this.layout
      ;((this.layout = this.measure(!1)),
        (this.layoutCorrected = Le()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners('measure', this.layout.layoutBox))
      const { visualElement: a } = this.options
      a && a.notify('LayoutMeasure', this.layout.layoutBox, s ? s.layoutBox : void 0)
    }
    updateScroll(s = 'measure') {
      let a = !!(this.options.layoutScroll && this.instance)
      if (
        (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === s && (a = !1),
        a && this.instance)
      ) {
        const l = r(this.instance)
        this.scroll = {
          animationId: this.root.animationId,
          phase: s,
          isRoot: l,
          offset: n(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : l,
        }
      }
    }
    resetTransform() {
      if (!o) return
      const s = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
        a = this.projectionDelta && !ey(this.projectionDelta),
        l = this.getTransformTemplate(),
        c = l ? l(this.latestValues, '') : void 0,
        u = c !== this.prevTransformTemplateValue
      s &&
        this.instance &&
        (a || Fn(this.latestValues) || u) &&
        (o(this.instance, c), (this.shouldResetTransform = !1), this.scheduleRender())
    }
    measure(s = !0) {
      const a = this.measurePageBox()
      let l = this.removeElementScroll(a)
      return (
        s && (l = this.removeTransform(l)),
        y2(l),
        { animationId: this.root.animationId, measuredBox: a, layoutBox: l, latestValues: {}, source: this.id }
      )
    }
    measurePageBox() {
      const { visualElement: s } = this.options
      if (!s) return Le()
      const a = s.measureViewportBox()
      if (!(this.scroll?.wasRoot || this.path.some(v2))) {
        const { scroll: c } = this.root
        c && (br(a.x, c.offset.x), br(a.y, c.offset.y))
      }
      return a
    }
    removeElementScroll(s) {
      const a = Le()
      if ((yt(a, s), this.scroll?.wasRoot)) return a
      for (let l = 0; l < this.path.length; l++) {
        const c = this.path[l],
          { scroll: u, options: d } = c
        c !== this.root && u && d.layoutScroll && (u.wasRoot && yt(a, s), br(a.x, u.offset.x), br(a.y, u.offset.y))
      }
      return a
    }
    applyTransform(s, a = !1) {
      const l = Le()
      yt(l, s)
      for (let c = 0; c < this.path.length; c++) {
        const u = this.path[c]
        ;(!a &&
          u.options.layoutScroll &&
          u.scroll &&
          u !== u.root &&
          wr(l, { x: -u.scroll.offset.x, y: -u.scroll.offset.y }),
          Fn(u.latestValues) && wr(l, u.latestValues))
      }
      return (Fn(this.latestValues) && wr(l, this.latestValues), l)
    }
    removeTransform(s) {
      const a = Le()
      yt(a, s)
      for (let l = 0; l < this.path.length; l++) {
        const c = this.path[l]
        if (!c.instance || !Fn(c.latestValues)) continue
        bl(c.latestValues) && c.updateSnapshot()
        const u = Le(),
          d = c.measurePageBox()
        ;(yt(u, d), oh(a, c.latestValues, c.snapshot ? c.snapshot.layoutBox : void 0, u))
      }
      return (Fn(this.latestValues) && oh(a, this.latestValues), a)
    }
    setTargetDelta(s) {
      ;((this.targetDelta = s), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0))
    }
    setOptions(s) {
      this.options = { ...this.options, ...s, crossfade: s.crossfade !== void 0 ? s.crossfade : !0 }
    }
    clearMeasurements() {
      ;((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1))
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== Ke.timestamp &&
        this.relativeParent.resolveTargetDelta(!0)
    }
    resolveTargetDelta(s = !1) {
      const a = this.getLead()
      ;(this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty),
        this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty),
        this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty))
      const l = !!this.resumingFrom || this !== a
      if (
        !(
          s ||
          (l && this.isSharedProjectionDirty) ||
          this.isProjectionDirty ||
          this.parent?.isProjectionDirty ||
          this.attemptToResolveRelativeTarget ||
          this.root.updateBlockedByResize
        )
      )
        return
      const { layout: u, layoutId: d } = this.options
      if (!(!this.layout || !(u || d))) {
        if (((this.resolvedRelativeTargetAt = Ke.timestamp), !this.targetDelta && !this.relativeTarget)) {
          const h = this.getClosestProjectingParent()
          h && h.layout && this.animationProgress !== 1
            ? ((this.relativeParent = h),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Le()),
              (this.relativeTargetOrigin = Le()),
              vo(this.relativeTargetOrigin, this.layout.layoutBox, h.layout.layoutBox),
              yt(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0)
        }
        if (
          !(!this.relativeTarget && !this.targetDelta) &&
          (this.target || ((this.target = Le()), (this.targetWithTransforms = Le())),
          this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target
            ? (this.forceRelativeParentToResolveTarget(),
              Ek(this.target, this.relativeTarget, this.relativeParent.target))
            : this.targetDelta
              ? (this.resumingFrom
                  ? (this.target = this.applyTransform(this.layout.layoutBox))
                  : yt(this.target, this.layout.layoutBox),
                Ng(this.target, this.targetDelta))
              : yt(this.target, this.layout.layoutBox),
          this.attemptToResolveRelativeTarget)
        ) {
          this.attemptToResolveRelativeTarget = !1
          const h = this.getClosestProjectingParent()
          h &&
          !!h.resumingFrom == !!this.resumingFrom &&
          !h.options.layoutScroll &&
          h.target &&
          this.animationProgress !== 1
            ? ((this.relativeParent = h),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Le()),
              (this.relativeTargetOrigin = Le()),
              vo(this.relativeTargetOrigin, this.target, h.target),
              yt(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0)
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || bl(this.parent.latestValues) || Og(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
    }
    calcProjection() {
      const s = this.getLead(),
        a = !!this.resumingFrom || this !== s
      let l = !0
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (l = !1),
        a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1),
        this.resolvedRelativeTargetAt === Ke.timestamp && (l = !1),
        l)
      )
        return
      const { layout: c, layoutId: u } = this.options
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(c || u))
      )
        return
      yt(this.layoutCorrected, this.layout.layoutBox)
      const d = this.treeScale.x,
        h = this.treeScale.y
      ;(LM(this.layoutCorrected, this.treeScale, this.path, a),
        s.layout &&
          !s.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          ((s.target = s.layout.layoutBox), (s.targetWithTransforms = Le())))
      const { target: p } = s
      if (!p) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender())
        return
      }
      ;(!this.projectionDelta || !this.prevProjectionDelta
        ? this.createProjectionDeltas()
        : (th(this.prevProjectionDelta.x, this.projectionDelta.x),
          th(this.prevProjectionDelta.y, this.projectionDelta.y)),
        yo(this.projectionDelta, this.layoutCorrected, p, this.latestValues),
        (this.treeScale.x !== d ||
          this.treeScale.y !== h ||
          !ch(this.projectionDelta.x, this.prevProjectionDelta.x) ||
          !ch(this.projectionDelta.y, this.prevProjectionDelta.y)) &&
          ((this.hasProjected = !0), this.scheduleRender(), this.notifyListeners('projectionUpdate', p)))
    }
    hide() {
      this.isVisible = !1
    }
    show() {
      this.isVisible = !0
    }
    scheduleRender(s = !0) {
      if ((this.options.visualElement?.scheduleRender(), s)) {
        const a = this.getStack()
        a && a.scheduleRender()
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
    }
    createProjectionDeltas() {
      ;((this.prevProjectionDelta = xr()), (this.projectionDelta = xr()), (this.projectionDeltaWithTransform = xr()))
    }
    setAnimationOrigin(s, a = !1) {
      const l = this.snapshot,
        c = l ? l.latestValues : {},
        u = { ...this.latestValues },
        d = xr()
      ;((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a))
      const h = Le(),
        p = l ? l.source : void 0,
        m = this.layout ? this.layout.source : void 0,
        y = p !== m,
        v = this.getStack(),
        w = !v || v.members.length <= 1,
        b = !!(y && !w && this.options.crossfade === !0 && !this.path.some(m2))
      this.animationProgress = 0
      let x
      ;((this.mixTargetDelta = (E) => {
        const C = E / 1e3
        ;(hh(d.x, s.x, C),
          hh(d.y, s.y, C),
          this.setTargetDelta(d),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (vo(h, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            p2(this.relativeTarget, this.relativeTargetOrigin, h, C),
            x && Qk(this.relativeTarget, x) && (this.isProjectionDirty = !1),
            x || (x = Le()),
            yt(x, this.relativeTarget)),
          y && ((this.animationValues = u), Zk(u, c, this.latestValues, C, b, w)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = C))
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0))
    }
    startAnimation(s) {
      ;(this.notifyListeners('animationStart'),
        this.currentAnimation?.stop(),
        this.resumingFrom?.currentAnimation?.stop(),
        this.pendingAnimation && (Sn(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = Ae.update(() => {
          ;((Oi.hasAnimatedSinceResize = !0),
            this.motionValue || (this.motionValue = Dr(0)),
            (this.currentAnimation = Bk(this.motionValue, [0, 1e3], {
              ...s,
              velocity: 0,
              isSync: !0,
              onUpdate: (a) => {
                ;(this.mixTargetDelta(a), s.onUpdate && s.onUpdate(a))
              },
              onStop: () => {},
              onComplete: () => {
                ;(s.onComplete && s.onComplete(), this.completeAnimation())
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0))
        })))
    }
    completeAnimation() {
      this.resumingFrom && ((this.resumingFrom.currentAnimation = void 0), (this.resumingFrom.preserveOpacity = void 0))
      const s = this.getStack()
      ;(s && s.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners('animationComplete'))
    }
    finishAnimation() {
      ;(this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(n2), this.currentAnimation.stop()),
        this.completeAnimation())
    }
    applyTransformsToTarget() {
      const s = this.getLead()
      let { targetWithTransforms: a, target: l, layout: c, latestValues: u } = s
      if (!(!a || !l || !c)) {
        if (this !== s && this.layout && c && oy(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
          l = this.target || Le()
          const d = ot(this.layout.layoutBox.x)
          ;((l.x.min = s.target.x.min), (l.x.max = l.x.min + d))
          const h = ot(this.layout.layoutBox.y)
          ;((l.y.min = s.target.y.min), (l.y.max = l.y.min + h))
        }
        ;(yt(a, l), wr(a, u), yo(this.projectionDeltaWithTransform, this.layoutCorrected, a, u))
      }
    }
    registerSharedNode(s, a) {
      ;(this.sharedNodes.has(s) || this.sharedNodes.set(s, new e2()), this.sharedNodes.get(s).add(a))
      const c = a.options.initialPromotionConfig
      a.promote({
        transition: c ? c.transition : void 0,
        preserveFollowOpacity: c && c.shouldPreserveFollowOpacity ? c.shouldPreserveFollowOpacity(a) : void 0,
      })
    }
    isLead() {
      const s = this.getStack()
      return s ? s.lead === this : !0
    }
    getLead() {
      const { layoutId: s } = this.options
      return s ? this.getStack()?.lead || this : this
    }
    getPrevLead() {
      const { layoutId: s } = this.options
      return s ? this.getStack()?.prevLead : void 0
    }
    getStack() {
      const { layoutId: s } = this.options
      if (s) return this.root.sharedNodes.get(s)
    }
    promote({ needsReset: s, transition: a, preserveFollowOpacity: l } = {}) {
      const c = this.getStack()
      ;(c && c.promote(this, l),
        s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({ transition: a }))
    }
    relegate() {
      const s = this.getStack()
      return s ? s.relegate(this) : !1
    }
    resetSkewAndRotation() {
      const { visualElement: s } = this.options
      if (!s) return
      let a = !1
      const { latestValues: l } = s
      if (((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a)) return
      const c = {}
      l.z && Aa('z', s, c, this.animationValues)
      for (let u = 0; u < Ta.length; u++)
        (Aa(`rotate${Ta[u]}`, s, c, this.animationValues), Aa(`skew${Ta[u]}`, s, c, this.animationValues))
      s.render()
      for (const u in c) (s.setStaticValue(u, c[u]), this.animationValues && (this.animationValues[u] = c[u]))
      s.scheduleRender()
    }
    applyProjectionStyles(s, a) {
      if (!this.instance || this.isSVG) return
      if (!this.isVisible) {
        s.visibility = 'hidden'
        return
      }
      const l = this.getTransformTemplate()
      if (this.needsReset) {
        ;((this.needsReset = !1),
          (s.visibility = ''),
          (s.opacity = ''),
          (s.pointerEvents = Ii(a?.pointerEvents) || ''),
          (s.transform = l ? l(this.latestValues, '') : 'none'))
        return
      }
      const c = this.getLead()
      if (!this.projectionDelta || !this.layout || !c.target) {
        ;(this.options.layoutId &&
          ((s.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1),
          (s.pointerEvents = Ii(a?.pointerEvents) || '')),
          this.hasProjected &&
            !Fn(this.latestValues) &&
            ((s.transform = l ? l({}, '') : 'none'), (this.hasProjected = !1)))
        return
      }
      s.visibility = ''
      const u = c.animationValues || c.latestValues
      this.applyTransformsToTarget()
      let d = t2(this.projectionDeltaWithTransform, this.treeScale, u)
      ;(l && (d = l(u, d)), (s.transform = d))
      const { x: h, y: p } = this.projectionDelta
      ;((s.transformOrigin = `${h.origin * 100}% ${p.origin * 100}% 0`),
        c.animationValues
          ? (s.opacity =
              c === this
                ? (u.opacity ?? this.latestValues.opacity ?? 1)
                : this.preserveOpacity
                  ? this.latestValues.opacity
                  : u.opacityExit)
          : (s.opacity =
              c === this ? (u.opacity !== void 0 ? u.opacity : '') : u.opacityExit !== void 0 ? u.opacityExit : 0))
      for (const m in Ao) {
        if (u[m] === void 0) continue
        const { correct: y, applyTo: v, isCSSVariable: w } = Ao[m],
          b = d === 'none' ? u[m] : y(u[m], c)
        if (v) {
          const x = v.length
          for (let E = 0; E < x; E++) s[v[E]] = b
        } else w ? (this.options.visualElement.renderState.vars[m] = b) : (s[m] = b)
      }
      this.options.layoutId && (s.pointerEvents = c === this ? Ii(a?.pointerEvents) || '' : 'none')
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0
    }
    resetTree() {
      ;(this.root.nodes.forEach((s) => s.currentAnimation?.stop()),
        this.root.nodes.forEach(uh),
        this.root.sharedNodes.clear())
    }
  }
}
function o2(e) {
  e.updateLayout()
}
function i2(e) {
  const t = e.resumeFrom?.snapshot || e.snapshot
  if (e.isLead() && e.layout && t && e.hasListeners('didUpdate')) {
    const { layoutBox: n, measuredBox: r } = e.layout,
      { animationType: o } = e.options,
      i = t.source !== e.layout.source
    o === 'size'
      ? vt((u) => {
          const d = i ? t.measuredBox[u] : t.layoutBox[u],
            h = ot(d)
          ;((d.min = n[u].min), (d.max = d.min + h))
        })
      : oy(o, t.layoutBox, n) &&
        vt((u) => {
          const d = i ? t.measuredBox[u] : t.layoutBox[u],
            h = ot(n[u])
          ;((d.max = d.min + h),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0), (e.relativeTarget[u].max = e.relativeTarget[u].min + h)))
        })
    const s = xr()
    yo(s, n, t.layoutBox)
    const a = xr()
    i ? yo(a, e.applyTransform(r, !0), t.measuredBox) : yo(a, n, t.layoutBox)
    const l = !ey(s)
    let c = !1
    if (!e.resumeFrom) {
      const u = e.getClosestProjectingParent()
      if (u && !u.resumeFrom) {
        const { snapshot: d, layout: h } = u
        if (d && h) {
          const p = Le()
          vo(p, t.layoutBox, d.layoutBox)
          const m = Le()
          ;(vo(m, n, h.layoutBox),
            ty(p, m) || (c = !0),
            u.options.layoutRoot && ((e.relativeTarget = m), (e.relativeTargetOrigin = p), (e.relativeParent = u)))
        }
      }
    }
    e.notifyListeners('didUpdate', {
      layout: n,
      snapshot: t,
      delta: a,
      layoutDelta: s,
      hasLayoutChanged: l,
      hasRelativeLayoutChanged: c,
    })
  } else if (e.isLead()) {
    const { onExitComplete: n } = e.options
    n && n()
  }
  e.options.transition = void 0
}
function s2(e) {
  e.parent &&
    (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
    e.isSharedProjectionDirty ||
      (e.isSharedProjectionDirty = !!(
        e.isProjectionDirty ||
        e.parent.isProjectionDirty ||
        e.parent.isSharedProjectionDirty
      )),
    e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty))
}
function a2(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1
}
function l2(e) {
  e.clearSnapshot()
}
function uh(e) {
  e.clearMeasurements()
}
function dh(e) {
  e.isLayoutDirty = !1
}
function c2(e) {
  const { visualElement: t } = e.options
  ;(t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'), e.resetTransform())
}
function fh(e) {
  ;(e.finishAnimation(), (e.targetDelta = e.relativeTarget = e.target = void 0), (e.isProjectionDirty = !0))
}
function u2(e) {
  e.resolveTargetDelta()
}
function d2(e) {
  e.calcProjection()
}
function f2(e) {
  e.resetSkewAndRotation()
}
function h2(e) {
  e.removeLeadSnapshot()
}
function hh(e, t, n) {
  ;((e.translate = ke(t.translate, 0, n)),
    (e.scale = ke(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint))
}
function ph(e, t, n, r) {
  ;((e.min = ke(t.min, n.min, r)), (e.max = ke(t.max, n.max, r)))
}
function p2(e, t, n, r) {
  ;(ph(e.x, t.x, n.x, r), ph(e.y, t.y, n.y, r))
}
function m2(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0
}
const g2 = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
  mh = (e) => typeof navigator < 'u' && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
  gh = mh('applewebkit/') && !mh('chrome/') ? Math.round : xt
function yh(e) {
  ;((e.min = gh(e.min)), (e.max = gh(e.max)))
}
function y2(e) {
  ;(yh(e.x), yh(e.y))
}
function oy(e, t, n) {
  return e === 'position' || (e === 'preserve-aspect' && !Ck(lh(t), lh(n), 0.2))
}
function v2(e) {
  return e !== e.root && e.scroll?.wasRoot
}
const b2 = ry({
    attachResizeListener: (e, t) => _o(e, 'resize', t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  _a = { current: void 0 },
  iy = ry({
    measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
    defaultParent: () => {
      if (!_a.current) {
        const e = new b2({})
        ;(e.mount(window), e.setOptions({ layoutScroll: !0 }), (_a.current = e))
      }
      return _a.current
    },
    resetTransform: (e, t) => {
      e.style.transform = t !== void 0 ? t : 'none'
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === 'fixed',
  }),
  w2 = { pan: { Feature: $k }, drag: { Feature: jk, ProjectionNode: iy, MeasureLayout: qg } }
function vh(e, t, n) {
  const { props: r } = e
  e.animationState && r.whileHover && e.animationState.setActive('whileHover', n === 'Start')
  const o = 'onHover' + n,
    i = r[o]
  i && Ae.postRender(() => i(t, Wo(t)))
}
class x2 extends An {
  mount() {
    const { current: t } = this.node
    t && (this.unmount = V_(t, (n, r) => (vh(this.node, r, 'Start'), (o) => vh(this.node, o, 'End'))))
  }
  unmount() {}
}
class S2 extends An {
  constructor() {
    ;(super(...arguments), (this.isActive = !1))
  }
  onFocus() {
    let t = !1
    try {
      t = this.node.current.matches(':focus-visible')
    } catch {
      t = !0
    }
    !t || !this.node.animationState || (this.node.animationState.setActive('whileFocus', !0), (this.isActive = !0))
  }
  onBlur() {
    !this.isActive ||
      !this.node.animationState ||
      (this.node.animationState.setActive('whileFocus', !1), (this.isActive = !1))
  }
  mount() {
    this.unmount = Vo(
      _o(this.node.current, 'focus', () => this.onFocus()),
      _o(this.node.current, 'blur', () => this.onBlur()),
    )
  }
  unmount() {}
}
function bh(e, t, n) {
  const { props: r } = e
  if (e.current instanceof HTMLButtonElement && e.current.disabled) return
  e.animationState && r.whileTap && e.animationState.setActive('whileTap', n === 'Start')
  const o = 'onTap' + (n === 'End' ? '' : n),
    i = r[o]
  i && Ae.postRender(() => i(t, Wo(t)))
}
class C2 extends An {
  mount() {
    const { current: t } = this.node
    t &&
      (this.unmount = H_(
        t,
        (n, r) => (bh(this.node, r, 'Start'), (o, { success: i }) => bh(this.node, o, i ? 'End' : 'Cancel')),
        { useGlobalTarget: this.node.props.globalTapTarget },
      ))
  }
  unmount() {}
}
const Rl = new WeakMap(),
  Ma = new WeakMap(),
  E2 = (e) => {
    const t = Rl.get(e.target)
    t && t(e)
  },
  P2 = (e) => {
    e.forEach(E2)
  }
function R2({ root: e, ...t }) {
  const n = e || document
  Ma.has(n) || Ma.set(n, {})
  const r = Ma.get(n),
    o = JSON.stringify(t)
  return (r[o] || (r[o] = new IntersectionObserver(P2, { root: e, ...t })), r[o])
}
function T2(e, t, n) {
  const r = R2(t)
  return (
    Rl.set(e, n),
    r.observe(e),
    () => {
      ;(Rl.delete(e), r.unobserve(e))
    }
  )
}
const A2 = { some: 0, all: 1 }
class _2 extends An {
  constructor() {
    ;(super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1))
  }
  startObserver() {
    this.unmount()
    const { viewport: t = {} } = this.node.getProps(),
      { root: n, margin: r, amount: o = 'some', once: i } = t,
      s = { root: n ? n.current : void 0, rootMargin: r, threshold: typeof o == 'number' ? o : A2[o] },
      a = (l) => {
        const { isIntersecting: c } = l
        if (this.isInView === c || ((this.isInView = c), i && !c && this.hasEnteredView)) return
        ;(c && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive('whileInView', c))
        const { onViewportEnter: u, onViewportLeave: d } = this.node.getProps(),
          h = c ? u : d
        h && h(l)
      }
    return T2(this.node.current, s, a)
  }
  mount() {
    this.startObserver()
  }
  update() {
    if (typeof IntersectionObserver > 'u') return
    const { props: t, prevProps: n } = this.node
    ;['amount', 'margin', 'root'].some(M2(t, n)) && this.startObserver()
  }
  unmount() {}
}
function M2({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n]
}
const k2 = { inView: { Feature: _2 }, tap: { Feature: C2 }, focus: { Feature: S2 }, hover: { Feature: x2 } },
  D2 = { layout: { ProjectionNode: iy, MeasureLayout: qg } },
  I2 = { renderer: GM, ...yk, ...k2 },
  O2 = { ...I2, ...w2, ...D2 }
var N2 = /\s+/g,
  Tl = (e) => (typeof e != 'string' || !e ? e : e.replace(N2, ' ').trim()),
  ts = (...e) => {
    let t = [],
      n = (r) => {
        if (!r && r !== 0 && r !== 0n) return
        if (Array.isArray(r)) {
          for (let i = 0, s = r.length; i < s; i++) n(r[i])
          return
        }
        let o = typeof r
        if (o === 'string' || o === 'number' || o === 'bigint') {
          if (o === 'number' && r !== r) return
          t.push(String(r))
        } else if (o === 'object') {
          let i = Object.keys(r)
          for (let s = 0, a = i.length; s < a; s++) {
            let l = i[s]
            r[l] && t.push(l)
          }
        }
      }
    for (let r = 0, o = e.length; r < o; r++) {
      let i = e[r]
      i != null && n(i)
    }
    return t.length > 0 ? Tl(t.join(' ')) : void 0
  },
  wh = (e) => (e === !1 ? 'false' : e === !0 ? 'true' : e === 0 ? '0' : e),
  at = (e) => {
    if (!e || typeof e != 'object') return !0
    for (let t in e) return !1
    return !0
  },
  L2 = (e, t) => {
    if (e === t) return !0
    if (!e || !t) return !1
    let n = Object.keys(e),
      r = Object.keys(t)
    if (n.length !== r.length) return !1
    for (let o = 0; o < n.length; o++) {
      let i = n[o]
      if (!r.includes(i) || e[i] !== t[i]) return !1
    }
    return !0
  },
  xh = (e, t) => {
    for (let n in t)
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        let r = t[n]
        n in e ? (e[n] = ts(e[n], r)) : (e[n] = r)
      }
    return e
  },
  sy = (e, t) => {
    for (let n = 0; n < e.length; n++) {
      let r = e[n]
      Array.isArray(r) ? sy(r, t) : r && t.push(r)
    }
  },
  ay = (...e) => {
    let t = []
    sy(e, t)
    let n = []
    for (let r = 0; r < t.length; r++) t[r] && n.push(t[r])
    return n
  },
  Al = (e, t) => {
    let n = {}
    for (let r in e) {
      let o = e[r]
      if (r in t) {
        let i = t[r]
        Array.isArray(o) || Array.isArray(i)
          ? (n[r] = ay(i, o))
          : typeof o == 'object' && typeof i == 'object' && o && i
            ? (n[r] = Al(o, i))
            : (n[r] = i + ' ' + o)
      } else n[r] = o
    }
    for (let r in t) r in e || (n[r] = t[r])
    return n
  },
  j2 = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 }
function $2() {
  let e = null,
    t = {},
    n = !1
  return {
    get cachedTwMerge() {
      return e
    },
    set cachedTwMerge(r) {
      e = r
    },
    get cachedTwMergeConfig() {
      return t
    },
    set cachedTwMergeConfig(r) {
      t = r
    },
    get didTwMergeConfigChange() {
      return n
    },
    set didTwMergeConfigChange(r) {
      n = r
    },
    reset() {
      ;((e = null), (t = {}), (n = !1))
    },
  }
}
var rn = $2(),
  F2 = (e) => {
    let t = (n, r) => {
      let {
          extend: o = null,
          slots: i = {},
          variants: s = {},
          compoundVariants: a = [],
          compoundSlots: l = [],
          defaultVariants: c = {},
        } = n,
        u = { ...j2, ...r },
        d = o?.base ? ts(o.base, n?.base) : n?.base,
        h = o?.variants && !at(o.variants) ? Al(s, o.variants) : s,
        p = o?.defaultVariants && !at(o.defaultVariants) ? { ...o.defaultVariants, ...c } : c
      !at(u.twMergeConfig) &&
        !L2(u.twMergeConfig, rn.cachedTwMergeConfig) &&
        ((rn.didTwMergeConfigChange = !0), (rn.cachedTwMergeConfig = u.twMergeConfig))
      let m = at(o?.slots),
        y = at(i) ? {} : { base: ts(n?.base, m && o?.base), ...i },
        v = m ? y : xh({ ...o?.slots }, at(y) ? { base: n?.base } : y),
        w = at(o?.compoundVariants) ? a : ay(o?.compoundVariants, a),
        b = (E) => {
          if (at(h) && at(i) && m) return e(d, E?.class, E?.className)(u)
          if (w && !Array.isArray(w))
            throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof w}`)
          if (l && !Array.isArray(l))
            throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof l}`)
          let C = (L, F, O = [], D) => {
              let _ = O
              if (typeof F == 'string') {
                let k = Tl(F).split(' ')
                for (let W = 0; W < k.length; W++) _.push(`${L}:${k[W]}`)
              } else if (Array.isArray(F)) for (let k = 0; k < F.length; k++) _.push(`${L}:${F[k]}`)
              else if (typeof F == 'object' && typeof D == 'string' && D in F) {
                let k = F[D]
                if (k && typeof k == 'string') {
                  let W = Tl(k).split(' '),
                    q = []
                  for (let ae = 0; ae < W.length; ae++) q.push(`${L}:${W[ae]}`)
                  _[D] = _[D] ? _[D].concat(q) : q
                } else if (Array.isArray(k) && k.length > 0) {
                  let W = []
                  for (let q = 0; q < k.length; q++) W.push(`${L}:${k[q]}`)
                  _[D] = W
                }
              }
              return _
            },
            A = (L, F = h, O = null, D = null) => {
              let _ = F[L]
              if (!_ || at(_)) return null
              let k = D?.[L] ?? E?.[L]
              if (k === null) return null
              let W = wh(k),
                q =
                  (Array.isArray(u.responsiveVariants) && u.responsiveVariants.length > 0) ||
                  u.responsiveVariants === !0,
                ae = p?.[L],
                B = []
              if (typeof W == 'object' && q)
                for (let [he, z] of Object.entries(W)) {
                  let ee = _[z]
                  if (he === 'initial') {
                    ae = z
                    continue
                  }
                  ;(Array.isArray(u.responsiveVariants) && !u.responsiveVariants.includes(he)) || (B = C(he, ee, B, O))
                }
              let Z = W != null && typeof W != 'object' ? W : wh(ae),
                J = _[Z || 'false']
              return typeof B == 'object' && typeof O == 'string' && B[O]
                ? xh(B, J)
                : B.length > 0
                  ? (B.push(J), O === 'base' ? B.join(' ') : B)
                  : J
            },
            S = () => {
              if (!h) return null
              let L = Object.keys(h),
                F = []
              for (let O = 0; O < L.length; O++) {
                let D = A(L[O], h)
                D && F.push(D)
              }
              return F
            },
            R = (L, F) => {
              if (!h || typeof h != 'object') return null
              let O = []
              for (let D in h) {
                let _ = A(D, h, L, F),
                  k = L === 'base' && typeof _ == 'string' ? _ : _ && _[L]
                k && O.push(k)
              }
              return O
            },
            I = {}
          for (let L in E) {
            let F = E[L]
            F !== void 0 && (I[L] = F)
          }
          let N = (L, F) => {
              let O = typeof E?.[L] == 'object' ? { [L]: E[L]?.initial } : {}
              return { ...p, ...I, ...O, ...F }
            },
            G = (L = [], F) => {
              let O = [],
                D = L.length
              for (let _ = 0; _ < D; _++) {
                let { class: k, className: W, ...q } = L[_],
                  ae = !0,
                  B = N(null, F)
                for (let Z in q) {
                  let J = q[Z],
                    he = B[Z]
                  if (Array.isArray(J)) {
                    if (!J.includes(he)) {
                      ae = !1
                      break
                    }
                  } else {
                    if ((J == null || J === !1) && (he == null || he === !1)) continue
                    if (he !== J) {
                      ae = !1
                      break
                    }
                  }
                }
                ae && (k && O.push(k), W && O.push(W))
              }
              return O
            },
            oe = (L) => {
              let F = G(w, L)
              if (!Array.isArray(F)) return F
              let O = {},
                D = e
              for (let _ = 0; _ < F.length; _++) {
                let k = F[_]
                if (typeof k == 'string') O.base = D(O.base, k)(u)
                else if (typeof k == 'object') for (let W in k) O[W] = D(O[W], k[W])(u)
              }
              return O
            },
            te = (L) => {
              if (l.length < 1) return null
              let F = {},
                O = N(null, L)
              for (let D = 0; D < l.length; D++) {
                let { slots: _ = [], class: k, className: W, ...q } = l[D]
                if (!at(q)) {
                  let ae = !0
                  for (let B in q) {
                    let Z = O[B],
                      J = q[B]
                    if (Z === void 0 || (Array.isArray(J) ? !J.includes(Z) : J !== Z)) {
                      ae = !1
                      break
                    }
                  }
                  if (!ae) continue
                }
                for (let ae = 0; ae < _.length; ae++) {
                  let B = _[ae]
                  ;(F[B] || (F[B] = []), F[B].push([k, W]))
                }
              }
              return F
            }
          if (!at(i) || !m) {
            let L = {}
            if (typeof v == 'object' && !at(v)) {
              let F = e
              for (let O in v)
                L[O] = (D) => {
                  let _ = oe(D),
                    k = te(D)
                  return F(v[O], R(O, D), _ ? _[O] : void 0, k ? k[O] : void 0, D?.class, D?.className)(u)
                }
            }
            return L
          }
          return e(d, S(), G(w), E?.class, E?.className)(u)
        },
        x = () => {
          if (!(!h || typeof h != 'object')) return Object.keys(h)
        }
      return (
        (b.variantKeys = x()),
        (b.extend = o),
        (b.base = d),
        (b.slots = v),
        (b.variants = h),
        (b.defaultVariants = p),
        (b.compoundSlots = l),
        (b.compoundVariants = w),
        b
      )
    }
    return { tv: t, createTV: (n) => (r, o) => t(r, o ? Al(n, o) : n) }
  },
  z2 = (e) =>
    at(e)
      ? sc
      : Q1({
          ...e,
          extend: {
            theme: e.theme,
            classGroups: e.classGroups,
            conflictingClassGroupModifiers: e.conflictingClassGroupModifiers,
            conflictingClassGroups: e.conflictingClassGroups,
            ...e.extend,
          },
        }),
  V2 =
    (...e) =>
    (t) => {
      let n = ts(e)
      return !n || !t.twMerge
        ? n
        : ((!rn.cachedTwMerge || rn.didTwMergeConfigChange) &&
            ((rn.didTwMergeConfigChange = !1), (rn.cachedTwMerge = z2(rn.cachedTwMergeConfig))),
          rn.cachedTwMerge(n) || void 0)
    },
  { tv: ou } = F2(V2)
const B2 = ou({
    base: [
      'relative inline-flex items-center justify-center whitespace-nowrap rounded text-center font-medium transition-all duration-100 ease-in-out',
      'disabled:pointer-events-none',
      eS,
    ],
    variants: {
      variant: {
        primary: [
          'border-transparent',
          'text-text',
          'bg-accent',
          'hover:bg-accent/90',
          'disabled:bg-accent/50 disabled:text-text/70',
        ],
        secondary: [
          'border border-fill-tertiary dark:border-fill-tertiary',
          'text-text',
          'bg-fill-tertiary',
          'hover:bg-fill-tertiary/10',
          'disabled:bg-fill-tertiary/10',
          'disabled:dark:bg-fill-tertiary/10',
        ],
        light: [
          'shadow-none',
          'border-transparent',
          'text-gray-900 dark:text-gray-50',
          'bg-gray-200 dark:bg-gray-900',
          'hover:bg-gray-300/70 dark:hover:bg-gray-800/80',
          'disabled:bg-gray-100 disabled:text-gray-400',
          'disabled:dark:bg-gray-800 disabled:dark:text-gray-600',
        ],
        ghost: [
          'shadow-none',
          'border-transparent',
          'text-gray-900 dark:text-gray-50',
          'bg-transparent dark:hover:bg-fill-tertiary',
          'disabled:text-gray-400',
          'disabled:dark:text-gray-600',
        ],
        destructive: [
          'text-white',
          'border-transparent',
          'bg-red-600 dark:bg-red-700',
          'hover:bg-red-700 dark:hover:bg-red-600',
          'disabled:bg-red-300 disabled:text-white',
          'disabled:dark:bg-red-950 disabled:dark:text-red-400',
        ],
      },
      size: {
        xs: 'h-6 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-8 text-base',
      },
      flat: { true: 'shadow-none', false: 'shadow-sm' },
    },
    defaultVariants: { variant: 'primary', size: 'sm', flat: !1 },
  }),
  ns = (e) => {
    const t = de.c(30)
    let n, r, o, i, s, a, l, c, u, d, h
    t[0] !== e
      ? (({
          ref: a,
          asChild: n,
          isLoading: d,
          loadingText: l,
          className: o,
          disabled: i,
          variant: h,
          size: u,
          flat: s,
          children: r,
          ...c
        } = e),
        (t[0] = e),
        (t[1] = n),
        (t[2] = r),
        (t[3] = o),
        (t[4] = i),
        (t[5] = s),
        (t[6] = a),
        (t[7] = l),
        (t[8] = c),
        (t[9] = u),
        (t[10] = d),
        (t[11] = h))
      : ((n = t[1]),
        (r = t[2]),
        (o = t[3]),
        (i = t[4]),
        (s = t[5]),
        (a = t[6]),
        (l = t[7]),
        (c = t[8]),
        (u = t[9]),
        (d = t[10]),
        (h = t[11]))
    const p = d === void 0 ? !1 : d,
      m = n ? ZT : Br.button
    let y
    t[12] !== o || t[13] !== s || t[14] !== u || t[15] !== h
      ? ((y = Re(B2({ variant: h, size: u, flat: s }), o)),
        (t[12] = o),
        (t[13] = s),
        (t[14] = u),
        (t[15] = h),
        (t[16] = y))
      : (y = t[16])
    const v = i || p
    let w
    t[17] === Symbol.for('react.memo_cache_sentinel') ? ((w = { scale: 0.95 }), (t[17] = w)) : (w = t[17])
    let b
    t[18] !== r || t[19] !== p || t[20] !== l || t[21] !== u
      ? ((b = p
          ? g.jsxs('span', {
              className: 'pointer-events-none inline-flex items-center justify-center gap-1.5',
              children: [
                g.jsx('i', {
                  className: Re(
                    'shrink-0 animate-spin i-mingcute-loading-3-line !duration-1000',
                    u === 'xs' || u === 'sm' ? 'size-3' : 'size-4',
                  ),
                  'aria-hidden': 'true',
                }),
                g.jsx('span', { className: 'sr-only', children: l ?? 'Loading' }),
                g.jsx('span', { className: 'inline-block', children: l ?? r }),
              ],
            })
          : r),
        (t[18] = r),
        (t[19] = p),
        (t[20] = l),
        (t[21] = u),
        (t[22] = b))
      : (b = t[22])
    let x
    return (
      t[23] !== m || t[24] !== a || t[25] !== c || t[26] !== y || t[27] !== v || t[28] !== b
        ? ((x = g.jsx(m, {
            ref: a,
            className: y,
            disabled: v,
            'data-tremor-id': 'tremor-raw',
            whileTap: w,
            ...c,
            children: b,
          })),
          (t[23] = m),
          (t[24] = a),
          (t[25] = c),
          (t[26] = y),
          (t[27] = v),
          (t[28] = b),
          (t[29] = x))
        : (x = t[29]),
      x
    )
  }
ns.displayName = 'Button'
const U2 = (e) => {
  const t = de.c(11)
  let n, r, o
  t[0] !== e
    ? (({ ref: r, children: n, ...o } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o))
    : ((n = t[1]), (r = t[2]), (o = t[3]))
  let i, s, a
  t[4] === Symbol.for('react.memo_cache_sentinel')
    ? ((i = { scale: 1.02 }), (s = { scale: 1.02 }), (a = { scale: 0.95 }), (t[4] = i), (t[5] = s), (t[6] = a))
    : ((i = t[4]), (s = t[5]), (a = t[6]))
  let l
  return (
    t[7] !== n || t[8] !== r || t[9] !== o
      ? ((l = g.jsx(Br.button, { initial: !0, whileFocus: i, whileHover: s, whileTap: a, ...o, ref: r, children: n })),
        (t[7] = n),
        (t[8] = r),
        (t[9] = o),
        (t[10] = l))
      : (l = t[10]),
    l
  )
}
U2.displayName = 'MotionButtonBase'
function W2(e, t) {
  const n = f.createContext(t),
    r = (i) => {
      const { children: s, ...a } = i,
        l = f.useMemo(() => a, Object.values(a))
      return g.jsx(n.Provider, { value: l, children: s })
    }
  r.displayName = e + 'Provider'
  function o(i) {
    const s = f.useContext(n)
    if (s) return s
    if (t !== void 0) return t
    throw new Error(`\`${i}\` must be used within \`${e}\``)
  }
  return [r, o]
}
function jt(e, t = []) {
  let n = []
  function r(i, s) {
    const a = f.createContext(s),
      l = n.length
    n = [...n, s]
    const c = (d) => {
      const { scope: h, children: p, ...m } = d,
        y = h?.[e]?.[l] || a,
        v = f.useMemo(() => m, Object.values(m))
      return g.jsx(y.Provider, { value: v, children: p })
    }
    c.displayName = i + 'Provider'
    function u(d, h) {
      const p = h?.[e]?.[l] || a,
        m = f.useContext(p)
      if (m) return m
      if (s !== void 0) return s
      throw new Error(`\`${d}\` must be used within \`${i}\``)
    }
    return [c, u]
  }
  const o = () => {
    const i = n.map((s) => f.createContext(s))
    return function (a) {
      const l = a?.[e] || i
      return f.useMemo(() => ({ [`__scope${e}`]: { ...a, [e]: l } }), [a, l])
    }
  }
  return ((o.scopeName = e), [r, H2(o, ...t)])
}
function H2(...e) {
  const t = e[0]
  if (e.length === 1) return t
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }))
    return function (i) {
      const s = r.reduce((a, { useScope: l, scopeName: c }) => {
        const d = l(i)[`__scope${c}`]
        return { ...a, ...d }
      }, {})
      return f.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s])
    }
  }
  return ((n.scopeName = t.scopeName), n)
}
function U(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e?.(o), n === !1 || !o.defaultPrevented)) return t?.(o)
  }
}
var Ye = globalThis?.document ? f.useLayoutEffect : () => {},
  G2 = Xh[' useInsertionEffect '.trim().toString()] || Ye
function nr({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  const [o, i, s] = Z2({ defaultProp: t, onChange: n }),
    a = e !== void 0,
    l = a ? e : o
  {
    const u = f.useRef(e !== void 0)
    f.useEffect(() => {
      const d = u.current
      ;(d !== a &&
        console.warn(
          `${r} is changing from ${d ? 'controlled' : 'uncontrolled'} to ${a ? 'controlled' : 'uncontrolled'}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`,
        ),
        (u.current = a))
    }, [a, r])
  }
  const c = f.useCallback(
    (u) => {
      if (a) {
        const d = K2(u) ? u(e) : u
        d !== e && s.current?.(d)
      } else i(u)
    },
    [a, e, i, s],
  )
  return [l, c]
}
function Z2({ defaultProp: e, onChange: t }) {
  const [n, r] = f.useState(e),
    o = f.useRef(n),
    i = f.useRef(t)
  return (
    G2(() => {
      i.current = t
    }, [t]),
    f.useEffect(() => {
      o.current !== n && (i.current?.(n), (o.current = n))
    }, [n, o]),
    [n, r, i]
  )
}
function K2(e) {
  return typeof e == 'function'
}
function Y2(e) {
  const t = f.useRef({ value: e, previous: e })
  return f.useMemo(
    () => (
      t.current.value !== e && ((t.current.previous = t.current.value), (t.current.value = e)),
      t.current.previous
    ),
    [e],
  )
}
function X2(e) {
  const [t, n] = f.useState(void 0)
  return (
    Ye(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight })
        const r = new ResizeObserver((o) => {
          if (!Array.isArray(o) || !o.length) return
          const i = o[0]
          let s, a
          if ('borderBoxSize' in i) {
            const l = i.borderBoxSize,
              c = Array.isArray(l) ? l[0] : l
            ;((s = c.inlineSize), (a = c.blockSize))
          } else ((s = e.offsetWidth), (a = e.offsetHeight))
          n({ width: s, height: a })
        })
        return (r.observe(e, { box: 'border-box' }), () => r.unobserve(e))
      } else n(void 0)
    }, [e]),
    t
  )
}
function q2(e, t) {
  return f.useReducer((n, r) => t[n][r] ?? n, e)
}
var it = (e) => {
  const { present: t, children: n } = e,
    r = J2(t),
    o = typeof n == 'function' ? n({ present: r.isPresent }) : f.Children.only(n),
    i = we(r.ref, Q2(o))
  return typeof n == 'function' || r.isPresent ? f.cloneElement(o, { ref: i }) : null
}
it.displayName = 'Presence'
function J2(e) {
  const [t, n] = f.useState(),
    r = f.useRef(null),
    o = f.useRef(e),
    i = f.useRef('none'),
    s = e ? 'mounted' : 'unmounted',
    [a, l] = q2(s, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' },
    })
  return (
    f.useEffect(() => {
      const c = vi(r.current)
      i.current = a === 'mounted' ? c : 'none'
    }, [a]),
    Ye(() => {
      const c = r.current,
        u = o.current
      if (u !== e) {
        const h = i.current,
          p = vi(c)
        ;(e
          ? l('MOUNT')
          : p === 'none' || c?.display === 'none'
            ? l('UNMOUNT')
            : l(u && h !== p ? 'ANIMATION_OUT' : 'UNMOUNT'),
          (o.current = e))
      }
    }, [e, l]),
    Ye(() => {
      if (t) {
        let c
        const u = t.ownerDocument.defaultView ?? window,
          d = (p) => {
            const y = vi(r.current).includes(CSS.escape(p.animationName))
            if (p.target === t && y && (l('ANIMATION_END'), !o.current)) {
              const v = t.style.animationFillMode
              ;((t.style.animationFillMode = 'forwards'),
                (c = u.setTimeout(() => {
                  t.style.animationFillMode === 'forwards' && (t.style.animationFillMode = v)
                })))
            }
          },
          h = (p) => {
            p.target === t && (i.current = vi(r.current))
          }
        return (
          t.addEventListener('animationstart', h),
          t.addEventListener('animationcancel', d),
          t.addEventListener('animationend', d),
          () => {
            ;(u.clearTimeout(c),
              t.removeEventListener('animationstart', h),
              t.removeEventListener('animationcancel', d),
              t.removeEventListener('animationend', d))
          }
        )
      } else l('ANIMATION_END')
    }, [t, l]),
    {
      isPresent: ['mounted', 'unmountSuspended'].includes(a),
      ref: f.useCallback((c) => {
        ;((r.current = c ? getComputedStyle(c) : null), n(c))
      }, []),
    }
  )
}
function vi(e) {
  return e?.animationName || 'none'
}
function Q2(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, 'ref')?.get,
    n = t && 'isReactWarning' in t && t.isReactWarning
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, 'ref')?.get),
      (n = t && 'isReactWarning' in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref)
}
var eD = [
    'a',
    'button',
    'div',
    'form',
    'h2',
    'h3',
    'img',
    'input',
    'label',
    'li',
    'nav',
    'ol',
    'p',
    'select',
    'span',
    'svg',
    'ul',
  ],
  me = eD.reduce((e, t) => {
    const n = Yn(`Primitive.${t}`),
      r = f.forwardRef((o, i) => {
        const { asChild: s, ...a } = o,
          l = s ? n : t
        return (typeof window < 'u' && (window[Symbol.for('radix-ui')] = !0), g.jsx(l, { ...a, ref: i }))
      })
    return ((r.displayName = `Primitive.${t}`), { ...e, [t]: r })
  }, {})
function ly(e, t) {
  e && ms.flushSync(() => e.dispatchEvent(t))
}
ou({
  base: [
    'peer flex items-center justify-center shrink-0 rounded-sm bg-gray9/10 transition-colors duration-500',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-accent data-[state=checked]:text-white',
  ],
  variants: { size: { sm: 'size-4', md: 'size-5' } },
  defaultVariants: { size: 'md' },
})
ou({ variants: { size: { sm: 'size-2.5', md: 'size-3.5' } }, defaultVariants: { size: 'md' } })
f.createContext(null)
function iu(e) {
  const t = e + 'CollectionProvider',
    [n, r] = jt(t),
    [o, i] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    s = (y) => {
      const { scope: v, children: w } = y,
        b = V.useRef(null),
        x = V.useRef(new Map()).current
      return g.jsx(o, { scope: v, itemMap: x, collectionRef: b, children: w })
    }
  s.displayName = t
  const a = e + 'CollectionSlot',
    l = Yn(a),
    c = V.forwardRef((y, v) => {
      const { scope: w, children: b } = y,
        x = i(a, w),
        E = we(v, x.collectionRef)
      return g.jsx(l, { ref: E, children: b })
    })
  c.displayName = a
  const u = e + 'CollectionItemSlot',
    d = 'data-radix-collection-item',
    h = Yn(u),
    p = V.forwardRef((y, v) => {
      const { scope: w, children: b, ...x } = y,
        E = V.useRef(null),
        C = we(v, E),
        A = i(u, w)
      return (
        V.useEffect(() => (A.itemMap.set(E, { ref: E, ...x }), () => void A.itemMap.delete(E))),
        g.jsx(h, { [d]: '', ref: C, children: b })
      )
    })
  p.displayName = u
  function m(y) {
    const v = i(e + 'CollectionConsumer', y)
    return V.useCallback(() => {
      const b = v.collectionRef.current
      if (!b) return []
      const x = Array.from(b.querySelectorAll(`[${d}]`))
      return Array.from(v.itemMap.values()).sort((A, S) => x.indexOf(A.ref.current) - x.indexOf(S.ref.current))
    }, [v.collectionRef, v.itemMap])
  }
  return [{ Provider: s, Slot: c, ItemSlot: p }, m, r]
}
var tD = f.createContext(void 0)
function su(e) {
  const t = f.useContext(tD)
  return e || t || 'ltr'
}
function Be(e) {
  const t = f.useRef(e)
  return (
    f.useEffect(() => {
      t.current = e
    }),
    f.useMemo(
      () =>
        (...n) =>
          t.current?.(...n),
      [],
    )
  )
}
function nD(e, t = globalThis?.document) {
  const n = Be(e)
  f.useEffect(() => {
    const r = (o) => {
      o.key === 'Escape' && n(o)
    }
    return (
      t.addEventListener('keydown', r, { capture: !0 }),
      () => t.removeEventListener('keydown', r, { capture: !0 })
    )
  }, [n, t])
}
var rD = 'DismissableLayer',
  _l = 'dismissableLayer.update',
  oD = 'dismissableLayer.pointerDownOutside',
  iD = 'dismissableLayer.focusOutside',
  Sh,
  cy = f.createContext({ layers: new Set(), layersWithOutsidePointerEventsDisabled: new Set(), branches: new Set() }),
  Ur = f.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: i,
        onInteractOutside: s,
        onDismiss: a,
        ...l
      } = e,
      c = f.useContext(cy),
      [u, d] = f.useState(null),
      h = u?.ownerDocument ?? globalThis?.document,
      [, p] = f.useState({}),
      m = we(t, (S) => d(S)),
      y = Array.from(c.layers),
      [v] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1),
      w = y.indexOf(v),
      b = u ? y.indexOf(u) : -1,
      x = c.layersWithOutsidePointerEventsDisabled.size > 0,
      E = b >= w,
      C = lD((S) => {
        const R = S.target,
          I = [...c.branches].some((N) => N.contains(R))
        !E || I || (o?.(S), s?.(S), S.defaultPrevented || a?.())
      }, h),
      A = cD((S) => {
        const R = S.target
        ;[...c.branches].some((N) => N.contains(R)) || (i?.(S), s?.(S), S.defaultPrevented || a?.())
      }, h)
    return (
      nD((S) => {
        b === c.layers.size - 1 && (r?.(S), !S.defaultPrevented && a && (S.preventDefault(), a()))
      }, h),
      f.useEffect(() => {
        if (u)
          return (
            n &&
              (c.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Sh = h.body.style.pointerEvents), (h.body.style.pointerEvents = 'none')),
              c.layersWithOutsidePointerEventsDisabled.add(u)),
            c.layers.add(u),
            Ch(),
            () => {
              n && c.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = Sh)
            }
          )
      }, [u, h, n, c]),
      f.useEffect(
        () => () => {
          u && (c.layers.delete(u), c.layersWithOutsidePointerEventsDisabled.delete(u), Ch())
        },
        [u, c],
      ),
      f.useEffect(() => {
        const S = () => p({})
        return (document.addEventListener(_l, S), () => document.removeEventListener(_l, S))
      }, []),
      g.jsx(me.div, {
        ...l,
        ref: m,
        style: { pointerEvents: x ? (E ? 'auto' : 'none') : void 0, ...e.style },
        onFocusCapture: U(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: U(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: U(e.onPointerDownCapture, C.onPointerDownCapture),
      })
    )
  })
Ur.displayName = rD
var sD = 'DismissableLayerBranch',
  aD = f.forwardRef((e, t) => {
    const n = f.useContext(cy),
      r = f.useRef(null),
      o = we(t, r)
    return (
      f.useEffect(() => {
        const i = r.current
        if (i)
          return (
            n.branches.add(i),
            () => {
              n.branches.delete(i)
            }
          )
      }, [n.branches]),
      g.jsx(me.div, { ...e, ref: o })
    )
  })
aD.displayName = sD
function lD(e, t = globalThis?.document) {
  const n = Be(e),
    r = f.useRef(!1),
    o = f.useRef(() => {})
  return (
    f.useEffect(() => {
      const i = (a) => {
          if (a.target && !r.current) {
            let l = function () {
              uy(oD, n, c, { discrete: !0 })
            }
            const c = { originalEvent: a }
            a.pointerType === 'touch'
              ? (t.removeEventListener('click', o.current),
                (o.current = l),
                t.addEventListener('click', o.current, { once: !0 }))
              : l()
          } else t.removeEventListener('click', o.current)
          r.current = !1
        },
        s = window.setTimeout(() => {
          t.addEventListener('pointerdown', i)
        }, 0)
      return () => {
        ;(window.clearTimeout(s), t.removeEventListener('pointerdown', i), t.removeEventListener('click', o.current))
      }
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  )
}
function cD(e, t = globalThis?.document) {
  const n = Be(e),
    r = f.useRef(!1)
  return (
    f.useEffect(() => {
      const o = (i) => {
        i.target && !r.current && uy(iD, n, { originalEvent: i }, { discrete: !1 })
      }
      return (t.addEventListener('focusin', o), () => t.removeEventListener('focusin', o))
    }, [t, n]),
    { onFocusCapture: () => (r.current = !0), onBlurCapture: () => (r.current = !1) }
  )
}
function Ch() {
  const e = new CustomEvent(_l)
  document.dispatchEvent(e)
}
function uy(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n })
  ;(t && o.addEventListener(e, t, { once: !0 }), r ? ly(o, i) : o.dispatchEvent(i))
}
var ka = 0
function au() {
  f.useEffect(() => {
    const e = document.querySelectorAll('[data-radix-focus-guard]')
    return (
      document.body.insertAdjacentElement('afterbegin', e[0] ?? Eh()),
      document.body.insertAdjacentElement('beforeend', e[1] ?? Eh()),
      ka++,
      () => {
        ;(ka === 1 && document.querySelectorAll('[data-radix-focus-guard]').forEach((t) => t.remove()), ka--)
      }
    )
  }, [])
}
function Eh() {
  const e = document.createElement('span')
  return (
    e.setAttribute('data-radix-focus-guard', ''),
    (e.tabIndex = 0),
    (e.style.outline = 'none'),
    (e.style.opacity = '0'),
    (e.style.position = 'fixed'),
    (e.style.pointerEvents = 'none'),
    e
  )
}
var Da = 'focusScope.autoFocusOnMount',
  Ia = 'focusScope.autoFocusOnUnmount',
  Ph = { bubbles: !1, cancelable: !0 },
  uD = 'FocusScope',
  _s = f.forwardRef((e, t) => {
    const { loop: n = !1, trapped: r = !1, onMountAutoFocus: o, onUnmountAutoFocus: i, ...s } = e,
      [a, l] = f.useState(null),
      c = Be(o),
      u = Be(i),
      d = f.useRef(null),
      h = we(t, (y) => l(y)),
      p = f.useRef({
        paused: !1,
        pause() {
          this.paused = !0
        },
        resume() {
          this.paused = !1
        },
      }).current
    ;(f.useEffect(() => {
      if (r) {
        let y = function (x) {
            if (p.paused || !a) return
            const E = x.target
            a.contains(E) ? (d.current = E) : yn(d.current, { select: !0 })
          },
          v = function (x) {
            if (p.paused || !a) return
            const E = x.relatedTarget
            E !== null && (a.contains(E) || yn(d.current, { select: !0 }))
          },
          w = function (x) {
            if (document.activeElement === document.body) for (const C of x) C.removedNodes.length > 0 && yn(a)
          }
        ;(document.addEventListener('focusin', y), document.addEventListener('focusout', v))
        const b = new MutationObserver(w)
        return (
          a && b.observe(a, { childList: !0, subtree: !0 }),
          () => {
            ;(document.removeEventListener('focusin', y), document.removeEventListener('focusout', v), b.disconnect())
          }
        )
      }
    }, [r, a, p.paused]),
      f.useEffect(() => {
        if (a) {
          Th.add(p)
          const y = document.activeElement
          if (!a.contains(y)) {
            const w = new CustomEvent(Da, Ph)
            ;(a.addEventListener(Da, c),
              a.dispatchEvent(w),
              w.defaultPrevented || (dD(gD(dy(a)), { select: !0 }), document.activeElement === y && yn(a)))
          }
          return () => {
            ;(a.removeEventListener(Da, c),
              setTimeout(() => {
                const w = new CustomEvent(Ia, Ph)
                ;(a.addEventListener(Ia, u),
                  a.dispatchEvent(w),
                  w.defaultPrevented || yn(y ?? document.body, { select: !0 }),
                  a.removeEventListener(Ia, u),
                  Th.remove(p))
              }, 0))
          }
        }
      }, [a, c, u, p]))
    const m = f.useCallback(
      (y) => {
        if ((!n && !r) || p.paused) return
        const v = y.key === 'Tab' && !y.altKey && !y.ctrlKey && !y.metaKey,
          w = document.activeElement
        if (v && w) {
          const b = y.currentTarget,
            [x, E] = fD(b)
          x && E
            ? !y.shiftKey && w === E
              ? (y.preventDefault(), n && yn(x, { select: !0 }))
              : y.shiftKey && w === x && (y.preventDefault(), n && yn(E, { select: !0 }))
            : w === b && y.preventDefault()
        }
      },
      [n, r, p.paused],
    )
    return g.jsx(me.div, { tabIndex: -1, ...s, ref: h, onKeyDown: m })
  })
_s.displayName = uD
function dD(e, { select: t = !1 } = {}) {
  const n = document.activeElement
  for (const r of e) if ((yn(r, { select: t }), document.activeElement !== n)) return
}
function fD(e) {
  const t = dy(e),
    n = Rh(t, e),
    r = Rh(t.reverse(), e)
  return [n, r]
}
function dy(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === 'INPUT' && r.type === 'hidden'
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
      },
    })
  for (; n.nextNode(); ) t.push(n.currentNode)
  return t
}
function Rh(e, t) {
  for (const n of e) if (!hD(n, { upTo: t })) return n
}
function hD(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === 'hidden') return !0
  for (; e; ) {
    if (t !== void 0 && e === t) return !1
    if (getComputedStyle(e).display === 'none') return !0
    e = e.parentElement
  }
  return !1
}
function pD(e) {
  return e instanceof HTMLInputElement && 'select' in e
}
function yn(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement
    ;(e.focus({ preventScroll: !0 }), e !== n && pD(e) && t && e.select())
  }
}
var Th = mD()
function mD() {
  let e = []
  return {
    add(t) {
      const n = e[0]
      ;(t !== n && n?.pause(), (e = Ah(e, t)), e.unshift(t))
    },
    remove(t) {
      ;((e = Ah(e, t)), e[0]?.resume())
    },
  }
}
function Ah(e, t) {
  const n = [...e],
    r = n.indexOf(t)
  return (r !== -1 && n.splice(r, 1), n)
}
function gD(e) {
  return e.filter((t) => t.tagName !== 'A')
}
var yD = Xh[' useId '.trim().toString()] || (() => {}),
  vD = 0
function It(e) {
  const [t, n] = f.useState(yD())
  return (
    Ye(() => {
      n((r) => r ?? String(vD++))
    }, [e]),
    t ? `radix-${t}` : ''
  )
}
const bD = ['top', 'right', 'bottom', 'left'],
  En = Math.min,
  pt = Math.max,
  rs = Math.round,
  bi = Math.floor,
  Zt = (e) => ({ x: e, y: e }),
  wD = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' },
  xD = { start: 'end', end: 'start' }
function Ml(e, t, n) {
  return pt(e, En(t, n))
}
function an(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function ln(e) {
  return e.split('-')[0]
}
function Wr(e) {
  return e.split('-')[1]
}
function lu(e) {
  return e === 'x' ? 'y' : 'x'
}
function cu(e) {
  return e === 'y' ? 'height' : 'width'
}
const SD = new Set(['top', 'bottom'])
function Ut(e) {
  return SD.has(ln(e)) ? 'y' : 'x'
}
function uu(e) {
  return lu(Ut(e))
}
function CD(e, t, n) {
  n === void 0 && (n = !1)
  const r = Wr(e),
    o = uu(e),
    i = cu(o)
  let s = o === 'x' ? (r === (n ? 'end' : 'start') ? 'right' : 'left') : r === 'start' ? 'bottom' : 'top'
  return (t.reference[i] > t.floating[i] && (s = os(s)), [s, os(s)])
}
function ED(e) {
  const t = os(e)
  return [kl(e), t, kl(t)]
}
function kl(e) {
  return e.replace(/start|end/g, (t) => xD[t])
}
const _h = ['left', 'right'],
  Mh = ['right', 'left'],
  PD = ['top', 'bottom'],
  RD = ['bottom', 'top']
function TD(e, t, n) {
  switch (e) {
    case 'top':
    case 'bottom':
      return n ? (t ? Mh : _h) : t ? _h : Mh
    case 'left':
    case 'right':
      return t ? PD : RD
    default:
      return []
  }
}
function AD(e, t, n, r) {
  const o = Wr(e)
  let i = TD(ln(e), n === 'start', r)
  return (o && ((i = i.map((s) => s + '-' + o)), t && (i = i.concat(i.map(kl)))), i)
}
function os(e) {
  return e.replace(/left|right|bottom|top/g, (t) => wD[t])
}
function _D(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e }
}
function fy(e) {
  return typeof e != 'number' ? _D(e) : { top: e, right: e, bottom: e, left: e }
}
function is(e) {
  const { x: t, y: n, width: r, height: o } = e
  return { width: r, height: o, top: n, left: t, right: t + r, bottom: n + o, x: t, y: n }
}
function kh(e, t, n) {
  let { reference: r, floating: o } = e
  const i = Ut(t),
    s = uu(t),
    a = cu(s),
    l = ln(t),
    c = i === 'y',
    u = r.x + r.width / 2 - o.width / 2,
    d = r.y + r.height / 2 - o.height / 2,
    h = r[a] / 2 - o[a] / 2
  let p
  switch (l) {
    case 'top':
      p = { x: u, y: r.y - o.height }
      break
    case 'bottom':
      p = { x: u, y: r.y + r.height }
      break
    case 'right':
      p = { x: r.x + r.width, y: d }
      break
    case 'left':
      p = { x: r.x - o.width, y: d }
      break
    default:
      p = { x: r.x, y: r.y }
  }
  switch (Wr(t)) {
    case 'start':
      p[s] -= h * (n && c ? -1 : 1)
      break
    case 'end':
      p[s] += h * (n && c ? -1 : 1)
      break
  }
  return p
}
const MD = async (e, t, n) => {
  const { placement: r = 'bottom', strategy: o = 'absolute', middleware: i = [], platform: s } = n,
    a = i.filter(Boolean),
    l = await (s.isRTL == null ? void 0 : s.isRTL(t))
  let c = await s.getElementRects({ reference: e, floating: t, strategy: o }),
    { x: u, y: d } = kh(c, r, l),
    h = r,
    p = {},
    m = 0
  for (let y = 0; y < a.length; y++) {
    const { name: v, fn: w } = a[y],
      {
        x: b,
        y: x,
        data: E,
        reset: C,
      } = await w({
        x: u,
        y: d,
        initialPlacement: r,
        placement: h,
        strategy: o,
        middlewareData: p,
        rects: c,
        platform: s,
        elements: { reference: e, floating: t },
      })
    ;((u = b ?? u),
      (d = x ?? d),
      (p = { ...p, [v]: { ...p[v], ...E } }),
      C &&
        m <= 50 &&
        (m++,
        typeof C == 'object' &&
          (C.placement && (h = C.placement),
          C.rects &&
            (c = C.rects === !0 ? await s.getElementRects({ reference: e, floating: t, strategy: o }) : C.rects),
          ({ x: u, y: d } = kh(c, h, l))),
        (y = -1)))
  }
  return { x: u, y: d, placement: h, strategy: o, middlewareData: p }
}
async function Mo(e, t) {
  var n
  t === void 0 && (t = {})
  const { x: r, y: o, platform: i, rects: s, elements: a, strategy: l } = e,
    {
      boundary: c = 'clippingAncestors',
      rootBoundary: u = 'viewport',
      elementContext: d = 'floating',
      altBoundary: h = !1,
      padding: p = 0,
    } = an(t, e),
    m = fy(p),
    v = a[h ? (d === 'floating' ? 'reference' : 'floating') : d],
    w = is(
      await i.getClippingRect({
        element:
          (n = await (i.isElement == null ? void 0 : i.isElement(v))) == null || n
            ? v
            : v.contextElement || (await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating))),
        boundary: c,
        rootBoundary: u,
        strategy: l,
      }),
    ),
    b = d === 'floating' ? { x: r, y: o, width: s.floating.width, height: s.floating.height } : s.reference,
    x = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)),
    E = (await (i.isElement == null ? void 0 : i.isElement(x)))
      ? (await (i.getScale == null ? void 0 : i.getScale(x))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    C = is(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: a,
            rect: b,
            offsetParent: x,
            strategy: l,
          })
        : b,
    )
  return {
    top: (w.top - C.top + m.top) / E.y,
    bottom: (C.bottom - w.bottom + m.bottom) / E.y,
    left: (w.left - C.left + m.left) / E.x,
    right: (C.right - w.right + m.right) / E.x,
  }
}
const kD = (e) => ({
    name: 'arrow',
    options: e,
    async fn(t) {
      const { x: n, y: r, placement: o, rects: i, platform: s, elements: a, middlewareData: l } = t,
        { element: c, padding: u = 0 } = an(e, t) || {}
      if (c == null) return {}
      const d = fy(u),
        h = { x: n, y: r },
        p = uu(o),
        m = cu(p),
        y = await s.getDimensions(c),
        v = p === 'y',
        w = v ? 'top' : 'left',
        b = v ? 'bottom' : 'right',
        x = v ? 'clientHeight' : 'clientWidth',
        E = i.reference[m] + i.reference[p] - h[p] - i.floating[m],
        C = h[p] - i.reference[p],
        A = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(c))
      let S = A ? A[x] : 0
      ;(!S || !(await (s.isElement == null ? void 0 : s.isElement(A)))) && (S = a.floating[x] || i.floating[m])
      const R = E / 2 - C / 2,
        I = S / 2 - y[m] / 2 - 1,
        N = En(d[w], I),
        G = En(d[b], I),
        oe = N,
        te = S - y[m] - G,
        L = S / 2 - y[m] / 2 + R,
        F = Ml(oe, L, te),
        O = !l.arrow && Wr(o) != null && L !== F && i.reference[m] / 2 - (L < oe ? N : G) - y[m] / 2 < 0,
        D = O ? (L < oe ? L - oe : L - te) : 0
      return { [p]: h[p] + D, data: { [p]: F, centerOffset: L - F - D, ...(O && { alignmentOffset: D }) }, reset: O }
    },
  }),
  DD = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(t) {
          var n, r
          const { placement: o, middlewareData: i, rects: s, initialPlacement: a, platform: l, elements: c } = t,
            {
              mainAxis: u = !0,
              crossAxis: d = !0,
              fallbackPlacements: h,
              fallbackStrategy: p = 'bestFit',
              fallbackAxisSideDirection: m = 'none',
              flipAlignment: y = !0,
              ...v
            } = an(e, t)
          if ((n = i.arrow) != null && n.alignmentOffset) return {}
          const w = ln(o),
            b = Ut(a),
            x = ln(a) === a,
            E = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)),
            C = h || (x || !y ? [os(a)] : ED(a)),
            A = m !== 'none'
          !h && A && C.push(...AD(a, y, m, E))
          const S = [a, ...C],
            R = await Mo(t, v),
            I = []
          let N = ((r = i.flip) == null ? void 0 : r.overflows) || []
          if ((u && I.push(R[w]), d)) {
            const L = CD(o, s, E)
            I.push(R[L[0]], R[L[1]])
          }
          if (((N = [...N, { placement: o, overflows: I }]), !I.every((L) => L <= 0))) {
            var G, oe
            const L = (((G = i.flip) == null ? void 0 : G.index) || 0) + 1,
              F = S[L]
            if (
              F &&
              (!(d === 'alignment' ? b !== Ut(F) : !1) ||
                N.every((_) => (Ut(_.placement) === b ? _.overflows[0] > 0 : !0)))
            )
              return { data: { index: L, overflows: N }, reset: { placement: F } }
            let O =
              (oe = N.filter((D) => D.overflows[0] <= 0).sort((D, _) => D.overflows[1] - _.overflows[1])[0]) == null
                ? void 0
                : oe.placement
            if (!O)
              switch (p) {
                case 'bestFit': {
                  var te
                  const D =
                    (te = N.filter((_) => {
                      if (A) {
                        const k = Ut(_.placement)
                        return k === b || k === 'y'
                      }
                      return !0
                    })
                      .map((_) => [_.placement, _.overflows.filter((k) => k > 0).reduce((k, W) => k + W, 0)])
                      .sort((_, k) => _[1] - k[1])[0]) == null
                      ? void 0
                      : te[0]
                  D && (O = D)
                  break
                }
                case 'initialPlacement':
                  O = a
                  break
              }
            if (o !== O) return { reset: { placement: O } }
          }
          return {}
        },
      }
    )
  }
function Dh(e, t) {
  return { top: e.top - t.height, right: e.right - t.width, bottom: e.bottom - t.height, left: e.left - t.width }
}
function Ih(e) {
  return bD.some((t) => e[t] >= 0)
}
const ID = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'hide',
        options: e,
        async fn(t) {
          const { rects: n } = t,
            { strategy: r = 'referenceHidden', ...o } = an(e, t)
          switch (r) {
            case 'referenceHidden': {
              const i = await Mo(t, { ...o, elementContext: 'reference' }),
                s = Dh(i, n.reference)
              return { data: { referenceHiddenOffsets: s, referenceHidden: Ih(s) } }
            }
            case 'escaped': {
              const i = await Mo(t, { ...o, altBoundary: !0 }),
                s = Dh(i, n.floating)
              return { data: { escapedOffsets: s, escaped: Ih(s) } }
            }
            default:
              return {}
          }
        },
      }
    )
  },
  hy = new Set(['left', 'top'])
async function OD(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    s = ln(n),
    a = Wr(n),
    l = Ut(n) === 'y',
    c = hy.has(s) ? -1 : 1,
    u = i && l ? -1 : 1,
    d = an(t, e)
  let {
    mainAxis: h,
    crossAxis: p,
    alignmentAxis: m,
  } = typeof d == 'number'
    ? { mainAxis: d, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: d.mainAxis || 0, crossAxis: d.crossAxis || 0, alignmentAxis: d.alignmentAxis }
  return (
    a && typeof m == 'number' && (p = a === 'end' ? m * -1 : m),
    l ? { x: p * u, y: h * c } : { x: h * c, y: p * u }
  )
}
const ND = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var n, r
          const { x: o, y: i, placement: s, middlewareData: a } = t,
            l = await OD(t, e)
          return s === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset
            ? {}
            : { x: o + l.x, y: i + l.y, data: { ...l, placement: s } }
        },
      }
    )
  },
  LD = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: o } = t,
            {
              mainAxis: i = !0,
              crossAxis: s = !1,
              limiter: a = {
                fn: (v) => {
                  let { x: w, y: b } = v
                  return { x: w, y: b }
                },
              },
              ...l
            } = an(e, t),
            c = { x: n, y: r },
            u = await Mo(t, l),
            d = Ut(ln(o)),
            h = lu(d)
          let p = c[h],
            m = c[d]
          if (i) {
            const v = h === 'y' ? 'top' : 'left',
              w = h === 'y' ? 'bottom' : 'right',
              b = p + u[v],
              x = p - u[w]
            p = Ml(b, p, x)
          }
          if (s) {
            const v = d === 'y' ? 'top' : 'left',
              w = d === 'y' ? 'bottom' : 'right',
              b = m + u[v],
              x = m - u[w]
            m = Ml(b, m, x)
          }
          const y = a.fn({ ...t, [h]: p, [d]: m })
          return { ...y, data: { x: y.x - n, y: y.y - r, enabled: { [h]: i, [d]: s } } }
        },
      }
    )
  },
  jD = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: o, rects: i, middlewareData: s } = t,
            { offset: a = 0, mainAxis: l = !0, crossAxis: c = !0 } = an(e, t),
            u = { x: n, y: r },
            d = Ut(o),
            h = lu(d)
          let p = u[h],
            m = u[d]
          const y = an(a, t),
            v = typeof y == 'number' ? { mainAxis: y, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...y }
          if (l) {
            const x = h === 'y' ? 'height' : 'width',
              E = i.reference[h] - i.floating[x] + v.mainAxis,
              C = i.reference[h] + i.reference[x] - v.mainAxis
            p < E ? (p = E) : p > C && (p = C)
          }
          if (c) {
            var w, b
            const x = h === 'y' ? 'width' : 'height',
              E = hy.has(ln(o)),
              C =
                i.reference[d] -
                i.floating[x] +
                ((E && ((w = s.offset) == null ? void 0 : w[d])) || 0) +
                (E ? 0 : v.crossAxis),
              A =
                i.reference[d] +
                i.reference[x] +
                (E ? 0 : ((b = s.offset) == null ? void 0 : b[d]) || 0) -
                (E ? v.crossAxis : 0)
            m < C ? (m = C) : m > A && (m = A)
          }
          return { [h]: p, [d]: m }
        },
      }
    )
  },
  $D = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var n, r
          const { placement: o, rects: i, platform: s, elements: a } = t,
            { apply: l = () => {}, ...c } = an(e, t),
            u = await Mo(t, c),
            d = ln(o),
            h = Wr(o),
            p = Ut(o) === 'y',
            { width: m, height: y } = i.floating
          let v, w
          d === 'top' || d === 'bottom'
            ? ((v = d),
              (w =
                h === ((await (s.isRTL == null ? void 0 : s.isRTL(a.floating))) ? 'start' : 'end') ? 'left' : 'right'))
            : ((w = d), (v = h === 'end' ? 'top' : 'bottom'))
          const b = y - u.top - u.bottom,
            x = m - u.left - u.right,
            E = En(y - u[v], b),
            C = En(m - u[w], x),
            A = !t.middlewareData.shift
          let S = E,
            R = C
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (R = x),
            (r = t.middlewareData.shift) != null && r.enabled.y && (S = b),
            A && !h)
          ) {
            const N = pt(u.left, 0),
              G = pt(u.right, 0),
              oe = pt(u.top, 0),
              te = pt(u.bottom, 0)
            p
              ? (R = m - 2 * (N !== 0 || G !== 0 ? N + G : pt(u.left, u.right)))
              : (S = y - 2 * (oe !== 0 || te !== 0 ? oe + te : pt(u.top, u.bottom)))
          }
          await l({ ...t, availableWidth: R, availableHeight: S })
          const I = await s.getDimensions(a.floating)
          return m !== I.width || y !== I.height ? { reset: { rects: !0 } } : {}
        },
      }
    )
  }
function Ms() {
  return typeof window < 'u'
}
function Hr(e) {
  return py(e) ? (e.nodeName || '').toLowerCase() : '#document'
}
function mt(e) {
  var t
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}
function Qt(e) {
  var t
  return (t = (py(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement
}
function py(e) {
  return Ms() ? e instanceof Node || e instanceof mt(e).Node : !1
}
function Ot(e) {
  return Ms() ? e instanceof Element || e instanceof mt(e).Element : !1
}
function Yt(e) {
  return Ms() ? e instanceof HTMLElement || e instanceof mt(e).HTMLElement : !1
}
function Oh(e) {
  return !Ms() || typeof ShadowRoot > 'u' ? !1 : e instanceof ShadowRoot || e instanceof mt(e).ShadowRoot
}
const FD = new Set(['inline', 'contents'])
function Ho(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = Nt(e)
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !FD.has(o)
}
const zD = new Set(['table', 'td', 'th'])
function VD(e) {
  return zD.has(Hr(e))
}
const BD = [':popover-open', ':modal']
function ks(e) {
  return BD.some((t) => {
    try {
      return e.matches(t)
    } catch {
      return !1
    }
  })
}
const UD = ['transform', 'translate', 'scale', 'rotate', 'perspective'],
  WD = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'],
  HD = ['paint', 'layout', 'strict', 'content']
function du(e) {
  const t = fu(),
    n = Ot(e) ? Nt(e) : e
  return (
    UD.some((r) => (n[r] ? n[r] !== 'none' : !1)) ||
    (n.containerType ? n.containerType !== 'normal' : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== 'none' : !1)) ||
    (!t && (n.filter ? n.filter !== 'none' : !1)) ||
    WD.some((r) => (n.willChange || '').includes(r)) ||
    HD.some((r) => (n.contain || '').includes(r))
  )
}
function GD(e) {
  let t = Pn(e)
  for (; Yt(t) && !Or(t); ) {
    if (du(t)) return t
    if (ks(t)) return null
    t = Pn(t)
  }
  return null
}
function fu() {
  return typeof CSS > 'u' || !CSS.supports ? !1 : CSS.supports('-webkit-backdrop-filter', 'none')
}
const ZD = new Set(['html', 'body', '#document'])
function Or(e) {
  return ZD.has(Hr(e))
}
function Nt(e) {
  return mt(e).getComputedStyle(e)
}
function Ds(e) {
  return Ot(e) ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop } : { scrollLeft: e.scrollX, scrollTop: e.scrollY }
}
function Pn(e) {
  if (Hr(e) === 'html') return e
  const t = e.assignedSlot || e.parentNode || (Oh(e) && e.host) || Qt(e)
  return Oh(t) ? t.host : t
}
function my(e) {
  const t = Pn(e)
  return Or(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : Yt(t) && Ho(t) ? t : my(t)
}
function ko(e, t, n) {
  var r
  ;(t === void 0 && (t = []), n === void 0 && (n = !0))
  const o = my(e),
    i = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    s = mt(o)
  if (i) {
    const a = Dl(s)
    return t.concat(s, s.visualViewport || [], Ho(o) ? o : [], a && n ? ko(a) : [])
  }
  return t.concat(o, ko(o, [], n))
}
function Dl(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}
function gy(e) {
  const t = Nt(e)
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0
  const o = Yt(e),
    i = o ? e.offsetWidth : n,
    s = o ? e.offsetHeight : r,
    a = rs(n) !== i || rs(r) !== s
  return (a && ((n = i), (r = s)), { width: n, height: r, $: a })
}
function hu(e) {
  return Ot(e) ? e : e.contextElement
}
function Rr(e) {
  const t = hu(e)
  if (!Yt(t)) return Zt(1)
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: i } = gy(t)
  let s = (i ? rs(n.width) : n.width) / r,
    a = (i ? rs(n.height) : n.height) / o
  return ((!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), { x: s, y: a })
}
const KD = Zt(0)
function yy(e) {
  const t = mt(e)
  return !fu() || !t.visualViewport ? KD : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
}
function YD(e, t, n) {
  return (t === void 0 && (t = !1), !n || (t && n !== mt(e)) ? !1 : t)
}
function Xn(e, t, n, r) {
  ;(t === void 0 && (t = !1), n === void 0 && (n = !1))
  const o = e.getBoundingClientRect(),
    i = hu(e)
  let s = Zt(1)
  t && (r ? Ot(r) && (s = Rr(r)) : (s = Rr(e)))
  const a = YD(i, n, r) ? yy(i) : Zt(0)
  let l = (o.left + a.x) / s.x,
    c = (o.top + a.y) / s.y,
    u = o.width / s.x,
    d = o.height / s.y
  if (i) {
    const h = mt(i),
      p = r && Ot(r) ? mt(r) : r
    let m = h,
      y = Dl(m)
    for (; y && r && p !== m; ) {
      const v = Rr(y),
        w = y.getBoundingClientRect(),
        b = Nt(y),
        x = w.left + (y.clientLeft + parseFloat(b.paddingLeft)) * v.x,
        E = w.top + (y.clientTop + parseFloat(b.paddingTop)) * v.y
      ;((l *= v.x), (c *= v.y), (u *= v.x), (d *= v.y), (l += x), (c += E), (m = mt(y)), (y = Dl(m)))
    }
  }
  return is({ width: u, height: d, x: l, y: c })
}
function Is(e, t) {
  const n = Ds(e).scrollLeft
  return t ? t.left + n : Xn(Qt(e)).left + n
}
function vy(e, t) {
  const n = e.getBoundingClientRect(),
    r = n.left + t.scrollLeft - Is(e, n),
    o = n.top + t.scrollTop
  return { x: r, y: o }
}
function XD(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e
  const i = o === 'fixed',
    s = Qt(r),
    a = t ? ks(t.floating) : !1
  if (r === s || (a && i)) return n
  let l = { scrollLeft: 0, scrollTop: 0 },
    c = Zt(1)
  const u = Zt(0),
    d = Yt(r)
  if ((d || (!d && !i)) && ((Hr(r) !== 'body' || Ho(s)) && (l = Ds(r)), Yt(r))) {
    const p = Xn(r)
    ;((c = Rr(r)), (u.x = p.x + r.clientLeft), (u.y = p.y + r.clientTop))
  }
  const h = s && !d && !i ? vy(s, l) : Zt(0)
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + u.x + h.x,
    y: n.y * c.y - l.scrollTop * c.y + u.y + h.y,
  }
}
function qD(e) {
  return Array.from(e.getClientRects())
}
function JD(e) {
  const t = Qt(e),
    n = Ds(e),
    r = e.ownerDocument.body,
    o = pt(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    i = pt(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight)
  let s = -n.scrollLeft + Is(e)
  const a = -n.scrollTop
  return (Nt(r).direction === 'rtl' && (s += pt(t.clientWidth, r.clientWidth) - o), { width: o, height: i, x: s, y: a })
}
const Nh = 25
function QD(e, t) {
  const n = mt(e),
    r = Qt(e),
    o = n.visualViewport
  let i = r.clientWidth,
    s = r.clientHeight,
    a = 0,
    l = 0
  if (o) {
    ;((i = o.width), (s = o.height))
    const u = fu()
    ;(!u || (u && t === 'fixed')) && ((a = o.offsetLeft), (l = o.offsetTop))
  }
  const c = Is(r)
  if (c <= 0) {
    const u = r.ownerDocument,
      d = u.body,
      h = getComputedStyle(d),
      p = (u.compatMode === 'CSS1Compat' && parseFloat(h.marginLeft) + parseFloat(h.marginRight)) || 0,
      m = Math.abs(r.clientWidth - d.clientWidth - p)
    m <= Nh && (i -= m)
  } else c <= Nh && (i += c)
  return { width: i, height: s, x: a, y: l }
}
const eI = new Set(['absolute', 'fixed'])
function tI(e, t) {
  const n = Xn(e, !0, t === 'fixed'),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    i = Yt(e) ? Rr(e) : Zt(1),
    s = e.clientWidth * i.x,
    a = e.clientHeight * i.y,
    l = o * i.x,
    c = r * i.y
  return { width: s, height: a, x: l, y: c }
}
function Lh(e, t, n) {
  let r
  if (t === 'viewport') r = QD(e, n)
  else if (t === 'document') r = JD(Qt(e))
  else if (Ot(t)) r = tI(t, n)
  else {
    const o = yy(e)
    r = { x: t.x - o.x, y: t.y - o.y, width: t.width, height: t.height }
  }
  return is(r)
}
function by(e, t) {
  const n = Pn(e)
  return n === t || !Ot(n) || Or(n) ? !1 : Nt(n).position === 'fixed' || by(n, t)
}
function nI(e, t) {
  const n = t.get(e)
  if (n) return n
  let r = ko(e, [], !1).filter((a) => Ot(a) && Hr(a) !== 'body'),
    o = null
  const i = Nt(e).position === 'fixed'
  let s = i ? Pn(e) : e
  for (; Ot(s) && !Or(s); ) {
    const a = Nt(s),
      l = du(s)
    ;(!l && a.position === 'fixed' && (o = null),
      (i ? !l && !o : (!l && a.position === 'static' && !!o && eI.has(o.position)) || (Ho(s) && !l && by(e, s)))
        ? (r = r.filter((u) => u !== s))
        : (o = a),
      (s = Pn(s)))
  }
  return (t.set(e, r), r)
}
function rI(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e
  const s = [...(n === 'clippingAncestors' ? (ks(t) ? [] : nI(t, this._c)) : [].concat(n)), r],
    a = s[0],
    l = s.reduce(
      (c, u) => {
        const d = Lh(t, u, o)
        return (
          (c.top = pt(d.top, c.top)),
          (c.right = En(d.right, c.right)),
          (c.bottom = En(d.bottom, c.bottom)),
          (c.left = pt(d.left, c.left)),
          c
        )
      },
      Lh(t, a, o),
    )
  return { width: l.right - l.left, height: l.bottom - l.top, x: l.left, y: l.top }
}
function oI(e) {
  const { width: t, height: n } = gy(e)
  return { width: t, height: n }
}
function iI(e, t, n) {
  const r = Yt(t),
    o = Qt(t),
    i = n === 'fixed',
    s = Xn(e, !0, i, t)
  let a = { scrollLeft: 0, scrollTop: 0 }
  const l = Zt(0)
  function c() {
    l.x = Is(o)
  }
  if (r || (!r && !i))
    if (((Hr(t) !== 'body' || Ho(o)) && (a = Ds(t)), r)) {
      const p = Xn(t, !0, i, t)
      ;((l.x = p.x + t.clientLeft), (l.y = p.y + t.clientTop))
    } else o && c()
  i && !r && o && c()
  const u = o && !r && !i ? vy(o, a) : Zt(0),
    d = s.left + a.scrollLeft - l.x - u.x,
    h = s.top + a.scrollTop - l.y - u.y
  return { x: d, y: h, width: s.width, height: s.height }
}
function Oa(e) {
  return Nt(e).position === 'static'
}
function jh(e, t) {
  if (!Yt(e) || Nt(e).position === 'fixed') return null
  if (t) return t(e)
  let n = e.offsetParent
  return (Qt(e) === n && (n = n.ownerDocument.body), n)
}
function wy(e, t) {
  const n = mt(e)
  if (ks(e)) return n
  if (!Yt(e)) {
    let o = Pn(e)
    for (; o && !Or(o); ) {
      if (Ot(o) && !Oa(o)) return o
      o = Pn(o)
    }
    return n
  }
  let r = jh(e, t)
  for (; r && VD(r) && Oa(r); ) r = jh(r, t)
  return r && Or(r) && Oa(r) && !du(r) ? n : r || GD(e) || n
}
const sI = async function (e) {
  const t = this.getOffsetParent || wy,
    n = this.getDimensions,
    r = await n(e.floating)
  return {
    reference: iI(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  }
}
function aI(e) {
  return Nt(e).direction === 'rtl'
}
const lI = {
  convertOffsetParentRelativeRectToViewportRelativeRect: XD,
  getDocumentElement: Qt,
  getClippingRect: rI,
  getOffsetParent: wy,
  getElementRects: sI,
  getClientRects: qD,
  getDimensions: oI,
  getScale: Rr,
  isElement: Ot,
  isRTL: aI,
}
function xy(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}
function cI(e, t) {
  let n = null,
    r
  const o = Qt(e)
  function i() {
    var a
    ;(clearTimeout(r), (a = n) == null || a.disconnect(), (n = null))
  }
  function s(a, l) {
    ;(a === void 0 && (a = !1), l === void 0 && (l = 1), i())
    const c = e.getBoundingClientRect(),
      { left: u, top: d, width: h, height: p } = c
    if ((a || t(), !h || !p)) return
    const m = bi(d),
      y = bi(o.clientWidth - (u + h)),
      v = bi(o.clientHeight - (d + p)),
      w = bi(u),
      x = { rootMargin: -m + 'px ' + -y + 'px ' + -v + 'px ' + -w + 'px', threshold: pt(0, En(1, l)) || 1 }
    let E = !0
    function C(A) {
      const S = A[0].intersectionRatio
      if (S !== l) {
        if (!E) return s()
        S
          ? s(!1, S)
          : (r = setTimeout(() => {
              s(!1, 1e-7)
            }, 1e3))
      }
      ;(S === 1 && !xy(c, e.getBoundingClientRect()) && s(), (E = !1))
    }
    try {
      n = new IntersectionObserver(C, { ...x, root: o.ownerDocument })
    } catch {
      n = new IntersectionObserver(C, x)
    }
    n.observe(e)
  }
  return (s(!0), i)
}
function uI(e, t, n, r) {
  r === void 0 && (r = {})
  const {
      ancestorScroll: o = !0,
      ancestorResize: i = !0,
      elementResize: s = typeof ResizeObserver == 'function',
      layoutShift: a = typeof IntersectionObserver == 'function',
      animationFrame: l = !1,
    } = r,
    c = hu(e),
    u = o || i ? [...(c ? ko(c) : []), ...ko(t)] : []
  u.forEach((w) => {
    ;(o && w.addEventListener('scroll', n, { passive: !0 }), i && w.addEventListener('resize', n))
  })
  const d = c && a ? cI(c, n) : null
  let h = -1,
    p = null
  s &&
    ((p = new ResizeObserver((w) => {
      let [b] = w
      ;(b &&
        b.target === c &&
        p &&
        (p.unobserve(t),
        cancelAnimationFrame(h),
        (h = requestAnimationFrame(() => {
          var x
          ;(x = p) == null || x.observe(t)
        }))),
        n())
    })),
    c && !l && p.observe(c),
    p.observe(t))
  let m,
    y = l ? Xn(e) : null
  l && v()
  function v() {
    const w = Xn(e)
    ;(y && !xy(y, w) && n(), (y = w), (m = requestAnimationFrame(v)))
  }
  return (
    n(),
    () => {
      var w
      ;(u.forEach((b) => {
        ;(o && b.removeEventListener('scroll', n), i && b.removeEventListener('resize', n))
      }),
        d?.(),
        (w = p) == null || w.disconnect(),
        (p = null),
        l && cancelAnimationFrame(m))
    }
  )
}
const dI = ND,
  fI = LD,
  hI = DD,
  pI = $D,
  mI = ID,
  $h = kD,
  gI = jD,
  yI = (e, t, n) => {
    const r = new Map(),
      o = { platform: lI, ...n },
      i = { ...o.platform, _c: r }
    return MD(e, t, { ...o, platform: i })
  }
var vI = typeof document < 'u',
  bI = function () {},
  Ni = vI ? f.useLayoutEffect : bI
function ss(e, t) {
  if (e === t) return !0
  if (typeof e != typeof t) return !1
  if (typeof e == 'function' && e.toString() === t.toString()) return !0
  let n, r, o
  if (e && t && typeof e == 'object') {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1
      for (r = n; r-- !== 0; ) if (!ss(e[r], t[r])) return !1
      return !0
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length)) return !1
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1
    for (r = n; r-- !== 0; ) {
      const i = o[r]
      if (!(i === '_owner' && e.$$typeof) && !ss(e[i], t[i])) return !1
    }
    return !0
  }
  return e !== e && t !== t
}
function Sy(e) {
  return typeof window > 'u' ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function Fh(e, t) {
  const n = Sy(e)
  return Math.round(t * n) / n
}
function Na(e) {
  const t = f.useRef(e)
  return (
    Ni(() => {
      t.current = e
    }),
    t
  )
}
function wI(e) {
  e === void 0 && (e = {})
  const {
      placement: t = 'bottom',
      strategy: n = 'absolute',
      middleware: r = [],
      platform: o,
      elements: { reference: i, floating: s } = {},
      transform: a = !0,
      whileElementsMounted: l,
      open: c,
    } = e,
    [u, d] = f.useState({ x: 0, y: 0, strategy: n, placement: t, middlewareData: {}, isPositioned: !1 }),
    [h, p] = f.useState(r)
  ss(h, r) || p(r)
  const [m, y] = f.useState(null),
    [v, w] = f.useState(null),
    b = f.useCallback((_) => {
      _ !== A.current && ((A.current = _), y(_))
    }, []),
    x = f.useCallback((_) => {
      _ !== S.current && ((S.current = _), w(_))
    }, []),
    E = i || m,
    C = s || v,
    A = f.useRef(null),
    S = f.useRef(null),
    R = f.useRef(u),
    I = l != null,
    N = Na(l),
    G = Na(o),
    oe = Na(c),
    te = f.useCallback(() => {
      if (!A.current || !S.current) return
      const _ = { placement: t, strategy: n, middleware: h }
      ;(G.current && (_.platform = G.current),
        yI(A.current, S.current, _).then((k) => {
          const W = { ...k, isPositioned: oe.current !== !1 }
          L.current &&
            !ss(R.current, W) &&
            ((R.current = W),
            ms.flushSync(() => {
              d(W)
            }))
        }))
    }, [h, t, n, G, oe])
  Ni(() => {
    c === !1 && R.current.isPositioned && ((R.current.isPositioned = !1), d((_) => ({ ..._, isPositioned: !1 })))
  }, [c])
  const L = f.useRef(!1)
  ;(Ni(
    () => (
      (L.current = !0),
      () => {
        L.current = !1
      }
    ),
    [],
  ),
    Ni(() => {
      if ((E && (A.current = E), C && (S.current = C), E && C)) {
        if (N.current) return N.current(E, C, te)
        te()
      }
    }, [E, C, te, N, I]))
  const F = f.useMemo(() => ({ reference: A, floating: S, setReference: b, setFloating: x }), [b, x]),
    O = f.useMemo(() => ({ reference: E, floating: C }), [E, C]),
    D = f.useMemo(() => {
      const _ = { position: n, left: 0, top: 0 }
      if (!O.floating) return _
      const k = Fh(O.floating, u.x),
        W = Fh(O.floating, u.y)
      return a
        ? {
            ..._,
            transform: 'translate(' + k + 'px, ' + W + 'px)',
            ...(Sy(O.floating) >= 1.5 && { willChange: 'transform' }),
          }
        : { position: n, left: k, top: W }
    }, [n, a, O.floating, u.x, u.y])
  return f.useMemo(() => ({ ...u, update: te, refs: F, elements: O, floatingStyles: D }), [u, te, F, O, D])
}
const xI = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, 'current')
    }
    return {
      name: 'arrow',
      options: e,
      fn(n) {
        const { element: r, padding: o } = typeof e == 'function' ? e(n) : e
        return r && t(r)
          ? r.current != null
            ? $h({ element: r.current, padding: o }).fn(n)
            : {}
          : r
            ? $h({ element: r, padding: o }).fn(n)
            : {}
      },
    }
  },
  SI = (e, t) => ({ ...dI(e), options: [e, t] }),
  CI = (e, t) => ({ ...fI(e), options: [e, t] }),
  EI = (e, t) => ({ ...gI(e), options: [e, t] }),
  PI = (e, t) => ({ ...hI(e), options: [e, t] }),
  RI = (e, t) => ({ ...pI(e), options: [e, t] }),
  TI = (e, t) => ({ ...mI(e), options: [e, t] }),
  AI = (e, t) => ({ ...xI(e), options: [e, t] })
var _I = 'Arrow',
  Cy = f.forwardRef((e, t) => {
    const { children: n, width: r = 10, height: o = 5, ...i } = e
    return g.jsx(me.svg, {
      ...i,
      ref: t,
      width: r,
      height: o,
      viewBox: '0 0 30 10',
      preserveAspectRatio: 'none',
      children: e.asChild ? n : g.jsx('polygon', { points: '0,0 30,0 15,10' }),
    })
  })
Cy.displayName = _I
var MI = Cy,
  pu = 'Popper',
  [Ey, _n] = jt(pu),
  [kI, Py] = Ey(pu),
  Ry = (e) => {
    const { __scopePopper: t, children: n } = e,
      [r, o] = f.useState(null)
    return g.jsx(kI, { scope: t, anchor: r, onAnchorChange: o, children: n })
  }
Ry.displayName = pu
var Ty = 'PopperAnchor',
  Ay = f.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e,
      i = Py(Ty, n),
      s = f.useRef(null),
      a = we(t, s),
      l = f.useRef(null)
    return (
      f.useEffect(() => {
        const c = l.current
        ;((l.current = r?.current || s.current), c !== l.current && i.onAnchorChange(l.current))
      }),
      r ? null : g.jsx(me.div, { ...o, ref: a })
    )
  })
Ay.displayName = Ty
var mu = 'PopperContent',
  [DI, II] = Ey(mu),
  _y = f.forwardRef((e, t) => {
    const {
        __scopePopper: n,
        side: r = 'bottom',
        sideOffset: o = 0,
        align: i = 'center',
        alignOffset: s = 0,
        arrowPadding: a = 0,
        avoidCollisions: l = !0,
        collisionBoundary: c = [],
        collisionPadding: u = 0,
        sticky: d = 'partial',
        hideWhenDetached: h = !1,
        updatePositionStrategy: p = 'optimized',
        onPlaced: m,
        ...y
      } = e,
      v = Py(mu, n),
      [w, b] = f.useState(null),
      x = we(t, (z) => b(z)),
      [E, C] = f.useState(null),
      A = X2(E),
      S = A?.width ?? 0,
      R = A?.height ?? 0,
      I = r + (i !== 'center' ? '-' + i : ''),
      N = typeof u == 'number' ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u },
      G = Array.isArray(c) ? c : [c],
      oe = G.length > 0,
      te = { padding: N, boundary: G.filter(NI), altBoundary: oe },
      {
        refs: L,
        floatingStyles: F,
        placement: O,
        isPositioned: D,
        middlewareData: _,
      } = wI({
        strategy: 'fixed',
        placement: I,
        whileElementsMounted: (...z) => uI(...z, { animationFrame: p === 'always' }),
        elements: { reference: v.anchor },
        middleware: [
          SI({ mainAxis: o + R, alignmentAxis: s }),
          l && CI({ mainAxis: !0, crossAxis: !1, limiter: d === 'partial' ? EI() : void 0, ...te }),
          l && PI({ ...te }),
          RI({
            ...te,
            apply: ({ elements: z, rects: ee, availableWidth: Ce, availableHeight: be }) => {
              const { width: le, height: ge } = ee.reference,
                Ze = z.floating.style
              ;(Ze.setProperty('--radix-popper-available-width', `${Ce}px`),
                Ze.setProperty('--radix-popper-available-height', `${be}px`),
                Ze.setProperty('--radix-popper-anchor-width', `${le}px`),
                Ze.setProperty('--radix-popper-anchor-height', `${ge}px`))
            },
          }),
          E && AI({ element: E, padding: a }),
          LI({ arrowWidth: S, arrowHeight: R }),
          h && TI({ strategy: 'referenceHidden', ...te }),
        ],
      }),
      [k, W] = Dy(O),
      q = Be(m)
    Ye(() => {
      D && q?.()
    }, [D, q])
    const ae = _.arrow?.x,
      B = _.arrow?.y,
      Z = _.arrow?.centerOffset !== 0,
      [J, he] = f.useState()
    return (
      Ye(() => {
        w && he(window.getComputedStyle(w).zIndex)
      }, [w]),
      g.jsx('div', {
        ref: L.setFloating,
        'data-radix-popper-content-wrapper': '',
        style: {
          ...F,
          transform: D ? F.transform : 'translate(0, -200%)',
          minWidth: 'max-content',
          zIndex: J,
          '--radix-popper-transform-origin': [_.transformOrigin?.x, _.transformOrigin?.y].join(' '),
          ...(_.hide?.referenceHidden && { visibility: 'hidden', pointerEvents: 'none' }),
        },
        dir: e.dir,
        children: g.jsx(DI, {
          scope: n,
          placedSide: k,
          onArrowChange: C,
          arrowX: ae,
          arrowY: B,
          shouldHideArrow: Z,
          children: g.jsx(me.div, {
            'data-side': k,
            'data-align': W,
            ...y,
            ref: x,
            style: { ...y.style, animation: D ? void 0 : 'none' },
          }),
        }),
      })
    )
  })
_y.displayName = mu
var My = 'PopperArrow',
  OI = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' },
  ky = f.forwardRef(function (t, n) {
    const { __scopePopper: r, ...o } = t,
      i = II(My, r),
      s = OI[i.placedSide]
    return g.jsx('span', {
      ref: i.onArrowChange,
      style: {
        position: 'absolute',
        left: i.arrowX,
        top: i.arrowY,
        [s]: 0,
        transformOrigin: { top: '', right: '0 0', bottom: 'center 0', left: '100% 0' }[i.placedSide],
        transform: {
          top: 'translateY(100%)',
          right: 'translateY(50%) rotate(90deg) translateX(-50%)',
          bottom: 'rotate(180deg)',
          left: 'translateY(50%) rotate(-90deg) translateX(50%)',
        }[i.placedSide],
        visibility: i.shouldHideArrow ? 'hidden' : void 0,
      },
      children: g.jsx(MI, { ...o, ref: n, style: { ...o.style, display: 'block' } }),
    })
  })
ky.displayName = My
function NI(e) {
  return e !== null
}
var LI = (e) => ({
  name: 'transformOrigin',
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t,
      s = o.arrow?.centerOffset !== 0,
      a = s ? 0 : e.arrowWidth,
      l = s ? 0 : e.arrowHeight,
      [c, u] = Dy(n),
      d = { start: '0%', center: '50%', end: '100%' }[u],
      h = (o.arrow?.x ?? 0) + a / 2,
      p = (o.arrow?.y ?? 0) + l / 2
    let m = '',
      y = ''
    return (
      c === 'bottom'
        ? ((m = s ? d : `${h}px`), (y = `${-l}px`))
        : c === 'top'
          ? ((m = s ? d : `${h}px`), (y = `${r.floating.height + l}px`))
          : c === 'right'
            ? ((m = `${-l}px`), (y = s ? d : `${p}px`))
            : c === 'left' && ((m = `${r.floating.width + l}px`), (y = s ? d : `${p}px`)),
      { data: { x: m, y } }
    )
  },
})
function Dy(e) {
  const [t, n = 'center'] = e.split('-')
  return [t, n]
}
var Os = Ry,
  Ns = Ay,
  Ls = _y,
  js = ky,
  jI = 'Portal',
  $s = f.forwardRef((e, t) => {
    const { container: n, ...r } = e,
      [o, i] = f.useState(!1)
    Ye(() => i(!0), [])
    const s = n || (o && globalThis?.document?.body)
    return s ? qh.createPortal(g.jsx(me.div, { ...r, ref: t }), s) : null
  })
$s.displayName = jI
var La = 'rovingFocusGroup.onEntryFocus',
  $I = { bubbles: !1, cancelable: !0 },
  Go = 'RovingFocusGroup',
  [Il, Iy, FI] = iu(Go),
  [zI, Oy] = jt(Go, [FI]),
  [VI, BI] = zI(Go),
  Ny = f.forwardRef((e, t) =>
    g.jsx(Il.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: g.jsx(Il.Slot, { scope: e.__scopeRovingFocusGroup, children: g.jsx(UI, { ...e, ref: t }) }),
    }),
  )
Ny.displayName = Go
var UI = f.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: o = !1,
        dir: i,
        currentTabStopId: s,
        defaultCurrentTabStopId: a,
        onCurrentTabStopIdChange: l,
        onEntryFocus: c,
        preventScrollOnEntryFocus: u = !1,
        ...d
      } = e,
      h = f.useRef(null),
      p = we(t, h),
      m = su(i),
      [y, v] = nr({ prop: s, defaultProp: a ?? null, onChange: l, caller: Go }),
      [w, b] = f.useState(!1),
      x = Be(c),
      E = Iy(n),
      C = f.useRef(!1),
      [A, S] = f.useState(0)
    return (
      f.useEffect(() => {
        const R = h.current
        if (R) return (R.addEventListener(La, x), () => R.removeEventListener(La, x))
      }, [x]),
      g.jsx(VI, {
        scope: n,
        orientation: r,
        dir: m,
        loop: o,
        currentTabStopId: y,
        onItemFocus: f.useCallback((R) => v(R), [v]),
        onItemShiftTab: f.useCallback(() => b(!0), []),
        onFocusableItemAdd: f.useCallback(() => S((R) => R + 1), []),
        onFocusableItemRemove: f.useCallback(() => S((R) => R - 1), []),
        children: g.jsx(me.div, {
          tabIndex: w || A === 0 ? -1 : 0,
          'data-orientation': r,
          ...d,
          ref: p,
          style: { outline: 'none', ...e.style },
          onMouseDown: U(e.onMouseDown, () => {
            C.current = !0
          }),
          onFocus: U(e.onFocus, (R) => {
            const I = !C.current
            if (R.target === R.currentTarget && I && !w) {
              const N = new CustomEvent(La, $I)
              if ((R.currentTarget.dispatchEvent(N), !N.defaultPrevented)) {
                const G = E().filter((O) => O.focusable),
                  oe = G.find((O) => O.active),
                  te = G.find((O) => O.id === y),
                  F = [oe, te, ...G].filter(Boolean).map((O) => O.ref.current)
                $y(F, u)
              }
            }
            C.current = !1
          }),
          onBlur: U(e.onBlur, () => b(!1)),
        }),
      })
    )
  }),
  Ly = 'RovingFocusGroupItem',
  jy = f.forwardRef((e, t) => {
    const { __scopeRovingFocusGroup: n, focusable: r = !0, active: o = !1, tabStopId: i, children: s, ...a } = e,
      l = It(),
      c = i || l,
      u = BI(Ly, n),
      d = u.currentTabStopId === c,
      h = Iy(n),
      { onFocusableItemAdd: p, onFocusableItemRemove: m, currentTabStopId: y } = u
    return (
      f.useEffect(() => {
        if (r) return (p(), () => m())
      }, [r, p, m]),
      g.jsx(Il.ItemSlot, {
        scope: n,
        id: c,
        focusable: r,
        active: o,
        children: g.jsx(me.span, {
          tabIndex: d ? 0 : -1,
          'data-orientation': u.orientation,
          ...a,
          ref: t,
          onMouseDown: U(e.onMouseDown, (v) => {
            r ? u.onItemFocus(c) : v.preventDefault()
          }),
          onFocus: U(e.onFocus, () => u.onItemFocus(c)),
          onKeyDown: U(e.onKeyDown, (v) => {
            if (v.key === 'Tab' && v.shiftKey) {
              u.onItemShiftTab()
              return
            }
            if (v.target !== v.currentTarget) return
            const w = GI(v, u.orientation, u.dir)
            if (w !== void 0) {
              if (v.metaKey || v.ctrlKey || v.altKey || v.shiftKey) return
              v.preventDefault()
              let x = h()
                .filter((E) => E.focusable)
                .map((E) => E.ref.current)
              if (w === 'last') x.reverse()
              else if (w === 'prev' || w === 'next') {
                w === 'prev' && x.reverse()
                const E = x.indexOf(v.currentTarget)
                x = u.loop ? ZI(x, E + 1) : x.slice(E + 1)
              }
              setTimeout(() => $y(x))
            }
          }),
          children: typeof s == 'function' ? s({ isCurrentTabStop: d, hasTabStop: y != null }) : s,
        }),
      })
    )
  })
jy.displayName = Ly
var WI = {
  ArrowLeft: 'prev',
  ArrowUp: 'prev',
  ArrowRight: 'next',
  ArrowDown: 'next',
  PageUp: 'first',
  Home: 'first',
  PageDown: 'last',
  End: 'last',
}
function HI(e, t) {
  return t !== 'rtl' ? e : e === 'ArrowLeft' ? 'ArrowRight' : e === 'ArrowRight' ? 'ArrowLeft' : e
}
function GI(e, t, n) {
  const r = HI(e.key, n)
  if (
    !(t === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(r)) &&
    !(t === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(r))
  )
    return WI[r]
}
function $y(e, t = !1) {
  const n = document.activeElement
  for (const r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return
}
function ZI(e, t) {
  return e.map((n, r) => e[(t + r) % e.length])
}
var KI = Ny,
  YI = jy,
  XI = function (e) {
    if (typeof document > 'u') return null
    var t = Array.isArray(e) ? e[0] : e
    return t.ownerDocument.body
  },
  ur = new WeakMap(),
  wi = new WeakMap(),
  xi = {},
  ja = 0,
  Fy = function (e) {
    return e && (e.host || Fy(e.parentNode))
  },
  qI = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n
        var r = Fy(n)
        return r && e.contains(r)
          ? r
          : (console.error('aria-hidden', n, 'in not contained inside', e, '. Doing nothing'), null)
      })
      .filter(function (n) {
        return !!n
      })
  },
  JI = function (e, t, n, r) {
    var o = qI(t, Array.isArray(e) ? e : [e])
    xi[n] || (xi[n] = new WeakMap())
    var i = xi[n],
      s = [],
      a = new Set(),
      l = new Set(o),
      c = function (d) {
        !d || a.has(d) || (a.add(d), c(d.parentNode))
      }
    o.forEach(c)
    var u = function (d) {
      !d ||
        l.has(d) ||
        Array.prototype.forEach.call(d.children, function (h) {
          if (a.has(h)) u(h)
          else
            try {
              var p = h.getAttribute(r),
                m = p !== null && p !== 'false',
                y = (ur.get(h) || 0) + 1,
                v = (i.get(h) || 0) + 1
              ;(ur.set(h, y),
                i.set(h, v),
                s.push(h),
                y === 1 && m && wi.set(h, !0),
                v === 1 && h.setAttribute(n, 'true'),
                m || h.setAttribute(r, 'true'))
            } catch (w) {
              console.error('aria-hidden: cannot operate on ', h, w)
            }
        })
    }
    return (
      u(t),
      a.clear(),
      ja++,
      function () {
        ;(s.forEach(function (d) {
          var h = ur.get(d) - 1,
            p = i.get(d) - 1
          ;(ur.set(d, h),
            i.set(d, p),
            h || (wi.has(d) || d.removeAttribute(r), wi.delete(d)),
            p || d.removeAttribute(n))
        }),
          ja--,
          ja || ((ur = new WeakMap()), (ur = new WeakMap()), (wi = new WeakMap()), (xi = {})))
      }
    )
  },
  gu = function (e, t, n) {
    n === void 0 && (n = 'data-aria-hidden')
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = XI(e)
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll('[aria-live], script'))), JI(r, o, n, 'aria-hidden'))
      : function () {
          return null
        }
  },
  Bt = function () {
    return (
      (Bt =
        Object.assign ||
        function (t) {
          for (var n, r = 1, o = arguments.length; r < o; r++) {
            n = arguments[r]
            for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
          }
          return t
        }),
      Bt.apply(this, arguments)
    )
  }
function zy(e, t) {
  var n = {}
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r])
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]])
  return n
}
function QI(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]))
  return e.concat(i || Array.prototype.slice.call(t))
}
var Li = 'right-scroll-bar-position',
  ji = 'width-before-scroll-bar',
  eO = 'with-scroll-bars-hidden',
  tO = '--removed-body-scroll-bar-size'
function $a(e, t) {
  return (typeof e == 'function' ? e(t) : e && (e.current = t), e)
}
function nO(e, t) {
  var n = f.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value
        },
        set current(r) {
          var o = n.value
          o !== r && ((n.value = r), n.callback(r, o))
        },
      },
    }
  })[0]
  return ((n.callback = t), n.facade)
}
var rO = typeof window < 'u' ? f.useLayoutEffect : f.useEffect,
  zh = new WeakMap()
function oO(e, t) {
  var n = nO(null, function (r) {
    return e.forEach(function (o) {
      return $a(o, r)
    })
  })
  return (
    rO(
      function () {
        var r = zh.get(n)
        if (r) {
          var o = new Set(r),
            i = new Set(e),
            s = n.current
          ;(o.forEach(function (a) {
            i.has(a) || $a(a, null)
          }),
            i.forEach(function (a) {
              o.has(a) || $a(a, s)
            }))
        }
        zh.set(n, e)
      },
      [e],
    ),
    n
  )
}
function iO(e) {
  return e
}
function sO(e, t) {
  t === void 0 && (t = iO)
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.',
          )
        return n.length ? n[n.length - 1] : e
      },
      useMedium: function (i) {
        var s = t(i, r)
        return (
          n.push(s),
          function () {
            n = n.filter(function (a) {
              return a !== s
            })
          }
        )
      },
      assignSyncMedium: function (i) {
        for (r = !0; n.length; ) {
          var s = n
          ;((n = []), s.forEach(i))
        }
        n = {
          push: function (a) {
            return i(a)
          },
          filter: function () {
            return n
          },
        }
      },
      assignMedium: function (i) {
        r = !0
        var s = []
        if (n.length) {
          var a = n
          ;((n = []), a.forEach(i), (s = n))
        }
        var l = function () {
            var u = s
            ;((s = []), u.forEach(i))
          },
          c = function () {
            return Promise.resolve().then(l)
          }
        ;(c(),
          (n = {
            push: function (u) {
              ;(s.push(u), c())
            },
            filter: function (u) {
              return ((s = s.filter(u)), n)
            },
          }))
      },
    }
  return o
}
function aO(e) {
  e === void 0 && (e = {})
  var t = sO(null)
  return ((t.options = Bt({ async: !0, ssr: !1 }, e)), t)
}
var Vy = function (e) {
  var t = e.sideCar,
    n = zy(e, ['sideCar'])
  if (!t) throw new Error('Sidecar: please provide `sideCar` property to import the right car')
  var r = t.read()
  if (!r) throw new Error('Sidecar medium not found')
  return f.createElement(r, Bt({}, n))
}
Vy.isSideCarExport = !0
function lO(e, t) {
  return (e.useMedium(t), Vy)
}
var By = aO(),
  Fa = function () {},
  Fs = f.forwardRef(function (e, t) {
    var n = f.useRef(null),
      r = f.useState({ onScrollCapture: Fa, onWheelCapture: Fa, onTouchMoveCapture: Fa }),
      o = r[0],
      i = r[1],
      s = e.forwardProps,
      a = e.children,
      l = e.className,
      c = e.removeScrollBar,
      u = e.enabled,
      d = e.shards,
      h = e.sideCar,
      p = e.noRelative,
      m = e.noIsolation,
      y = e.inert,
      v = e.allowPinchZoom,
      w = e.as,
      b = w === void 0 ? 'div' : w,
      x = e.gapMode,
      E = zy(e, [
        'forwardProps',
        'children',
        'className',
        'removeScrollBar',
        'enabled',
        'shards',
        'sideCar',
        'noRelative',
        'noIsolation',
        'inert',
        'allowPinchZoom',
        'as',
        'gapMode',
      ]),
      C = h,
      A = oO([n, t]),
      S = Bt(Bt({}, E), o)
    return f.createElement(
      f.Fragment,
      null,
      u &&
        f.createElement(C, {
          sideCar: By,
          removeScrollBar: c,
          shards: d,
          noRelative: p,
          noIsolation: m,
          inert: y,
          setCallbacks: i,
          allowPinchZoom: !!v,
          lockRef: n,
          gapMode: x,
        }),
      s
        ? f.cloneElement(f.Children.only(a), Bt(Bt({}, S), { ref: A }))
        : f.createElement(b, Bt({}, S, { className: l, ref: A }), a),
    )
  })
Fs.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 }
Fs.classNames = { fullWidth: ji, zeroRight: Li }
var cO = function () {
  if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__
}
function uO() {
  if (!document) return null
  var e = document.createElement('style')
  e.type = 'text/css'
  var t = cO()
  return (t && e.setAttribute('nonce', t), e)
}
function dO(e, t) {
  e.styleSheet ? (e.styleSheet.cssText = t) : e.appendChild(document.createTextNode(t))
}
function fO(e) {
  var t = document.head || document.getElementsByTagName('head')[0]
  t.appendChild(e)
}
var hO = function () {
    var e = 0,
      t = null
    return {
      add: function (n) {
        ;(e == 0 && (t = uO()) && (dO(t, n), fO(t)), e++)
      },
      remove: function () {
        ;(e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null)))
      },
    }
  },
  pO = function () {
    var e = hO()
    return function (t, n) {
      f.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove()
            }
          )
        },
        [t && n],
      )
    }
  },
  Uy = function () {
    var e = pO(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic
        return (e(r, o), null)
      }
    return t
  },
  mO = { left: 0, top: 0, right: 0, gap: 0 },
  za = function (e) {
    return parseInt(e || '', 10) || 0
  },
  gO = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
      r = t[e === 'padding' ? 'paddingTop' : 'marginTop'],
      o = t[e === 'padding' ? 'paddingRight' : 'marginRight']
    return [za(n), za(r), za(o)]
  },
  yO = function (e) {
    if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return mO
    var t = gO(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth
    return { left: t[0], top: t[1], right: t[2], gap: Math.max(0, r - n + t[2] - t[0]) }
  },
  vO = Uy(),
  Tr = 'data-scroll-locked',
  bO = function (e, t, n, r) {
    var o = e.left,
      i = e.top,
      s = e.right,
      a = e.gap
    return (
      n === void 0 && (n = 'margin'),
      `
  .`
        .concat(
          eO,
          ` {
   overflow: hidden `,
        )
        .concat(
          r,
          `;
   padding-right: `,
        )
        .concat(a, 'px ')
        .concat(
          r,
          `;
  }
  body[`,
        )
        .concat(
          Tr,
          `] {
    overflow: hidden `,
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `,
        )
        .concat(
          [
            t && 'position: relative '.concat(r, ';'),
            n === 'margin' &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `,
                )
                .concat(
                  i,
                  `px;
    padding-right: `,
                )
                .concat(
                  s,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                )
                .concat(a, 'px ')
                .concat(
                  r,
                  `;
    `,
                ),
            n === 'padding' && 'padding-right: '.concat(a, 'px ').concat(r, ';'),
          ]
            .filter(Boolean)
            .join(''),
          `
  }
  
  .`,
        )
        .concat(
          Li,
          ` {
    right: `,
        )
        .concat(a, 'px ')
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(
          ji,
          ` {
    margin-right: `,
        )
        .concat(a, 'px ')
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(Li, ' .')
        .concat(
          Li,
          ` {
    right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  .`,
        )
        .concat(ji, ' .')
        .concat(
          ji,
          ` {
    margin-right: 0 `,
        )
        .concat(
          r,
          `;
  }
  
  body[`,
        )
        .concat(
          Tr,
          `] {
    `,
        )
        .concat(tO, ': ')
        .concat(
          a,
          `px;
  }
`,
        )
    )
  },
  Vh = function () {
    var e = parseInt(document.body.getAttribute(Tr) || '0', 10)
    return isFinite(e) ? e : 0
  },
  wO = function () {
    f.useEffect(function () {
      return (
        document.body.setAttribute(Tr, (Vh() + 1).toString()),
        function () {
          var e = Vh() - 1
          e <= 0 ? document.body.removeAttribute(Tr) : document.body.setAttribute(Tr, e.toString())
        }
      )
    }, [])
  },
  xO = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? 'margin' : r
    wO()
    var i = f.useMemo(
      function () {
        return yO(o)
      },
      [o],
    )
    return f.createElement(vO, { styles: bO(i, !t, o, n ? '' : '!important') })
  },
  Ol = !1
if (typeof window < 'u')
  try {
    var Si = Object.defineProperty({}, 'passive', {
      get: function () {
        return ((Ol = !0), !0)
      },
    })
    ;(window.addEventListener('test', Si, Si), window.removeEventListener('test', Si, Si))
  } catch {
    Ol = !1
  }
var dr = Ol ? { passive: !1 } : !1,
  SO = function (e) {
    return e.tagName === 'TEXTAREA'
  },
  Wy = function (e, t) {
    if (!(e instanceof Element)) return !1
    var n = window.getComputedStyle(e)
    return n[t] !== 'hidden' && !(n.overflowY === n.overflowX && !SO(e) && n[t] === 'visible')
  },
  CO = function (e) {
    return Wy(e, 'overflowY')
  },
  EO = function (e) {
    return Wy(e, 'overflowX')
  },
  Bh = function (e, t) {
    var n = t.ownerDocument,
      r = t
    do {
      typeof ShadowRoot < 'u' && r instanceof ShadowRoot && (r = r.host)
      var o = Hy(e, r)
      if (o) {
        var i = Gy(e, r),
          s = i[1],
          a = i[2]
        if (s > a) return !0
      }
      r = r.parentNode
    } while (r && r !== n.body)
    return !1
  },
  PO = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight
    return [t, n, r]
  },
  RO = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth
    return [t, n, r]
  },
  Hy = function (e, t) {
    return e === 'v' ? CO(t) : EO(t)
  },
  Gy = function (e, t) {
    return e === 'v' ? PO(t) : RO(t)
  },
  TO = function (e, t) {
    return e === 'h' && t === 'rtl' ? -1 : 1
  },
  AO = function (e, t, n, r, o) {
    var i = TO(e, window.getComputedStyle(t).direction),
      s = i * r,
      a = n.target,
      l = t.contains(a),
      c = !1,
      u = s > 0,
      d = 0,
      h = 0
    do {
      if (!a) break
      var p = Gy(e, a),
        m = p[0],
        y = p[1],
        v = p[2],
        w = y - v - i * m
      ;(m || w) && Hy(e, a) && ((d += w), (h += m))
      var b = a.parentNode
      a = b && b.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? b.host : b
    } while ((!l && a !== document.body) || (l && (t.contains(a) || t === a)))
    return (((u && Math.abs(d) < 1) || (!u && Math.abs(h) < 1)) && (c = !0), c)
  },
  Ci = function (e) {
    return 'changedTouches' in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0]
  },
  Uh = function (e) {
    return [e.deltaX, e.deltaY]
  },
  Wh = function (e) {
    return e && 'current' in e ? e.current : e
  },
  _O = function (e, t) {
    return e[0] === t[0] && e[1] === t[1]
  },
  MO = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`,
      )
      .concat(
        e,
        ` {pointer-events: all;}
`,
      )
  },
  kO = 0,
  fr = []
function DO(e) {
  var t = f.useRef([]),
    n = f.useRef([0, 0]),
    r = f.useRef(),
    o = f.useState(kO++)[0],
    i = f.useState(Uy)[0],
    s = f.useRef(e)
  ;(f.useEffect(
    function () {
      s.current = e
    },
    [e],
  ),
    f.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add('block-interactivity-'.concat(o))
          var y = QI([e.lockRef.current], (e.shards || []).map(Wh), !0).filter(Boolean)
          return (
            y.forEach(function (v) {
              return v.classList.add('allow-interactivity-'.concat(o))
            }),
            function () {
              ;(document.body.classList.remove('block-interactivity-'.concat(o)),
                y.forEach(function (v) {
                  return v.classList.remove('allow-interactivity-'.concat(o))
                }))
            }
          )
        }
      },
      [e.inert, e.lockRef.current, e.shards],
    ))
  var a = f.useCallback(function (y, v) {
      if (('touches' in y && y.touches.length === 2) || (y.type === 'wheel' && y.ctrlKey))
        return !s.current.allowPinchZoom
      var w = Ci(y),
        b = n.current,
        x = 'deltaX' in y ? y.deltaX : b[0] - w[0],
        E = 'deltaY' in y ? y.deltaY : b[1] - w[1],
        C,
        A = y.target,
        S = Math.abs(x) > Math.abs(E) ? 'h' : 'v'
      if ('touches' in y && S === 'h' && A.type === 'range') return !1
      var R = Bh(S, A)
      if (!R) return !0
      if ((R ? (C = S) : ((C = S === 'v' ? 'h' : 'v'), (R = Bh(S, A))), !R)) return !1
      if ((!r.current && 'changedTouches' in y && (x || E) && (r.current = C), !C)) return !0
      var I = r.current || C
      return AO(I, v, y, I === 'h' ? x : E)
    }, []),
    l = f.useCallback(function (y) {
      var v = y
      if (!(!fr.length || fr[fr.length - 1] !== i)) {
        var w = 'deltaY' in v ? Uh(v) : Ci(v),
          b = t.current.filter(function (C) {
            return C.name === v.type && (C.target === v.target || v.target === C.shadowParent) && _O(C.delta, w)
          })[0]
        if (b && b.should) {
          v.cancelable && v.preventDefault()
          return
        }
        if (!b) {
          var x = (s.current.shards || [])
              .map(Wh)
              .filter(Boolean)
              .filter(function (C) {
                return C.contains(v.target)
              }),
            E = x.length > 0 ? a(v, x[0]) : !s.current.noIsolation
          E && v.cancelable && v.preventDefault()
        }
      }
    }, []),
    c = f.useCallback(function (y, v, w, b) {
      var x = { name: y, delta: v, target: w, should: b, shadowParent: IO(w) }
      ;(t.current.push(x),
        setTimeout(function () {
          t.current = t.current.filter(function (E) {
            return E !== x
          })
        }, 1))
    }, []),
    u = f.useCallback(function (y) {
      ;((n.current = Ci(y)), (r.current = void 0))
    }, []),
    d = f.useCallback(function (y) {
      c(y.type, Uh(y), y.target, a(y, e.lockRef.current))
    }, []),
    h = f.useCallback(function (y) {
      c(y.type, Ci(y), y.target, a(y, e.lockRef.current))
    }, [])
  f.useEffect(function () {
    return (
      fr.push(i),
      e.setCallbacks({ onScrollCapture: d, onWheelCapture: d, onTouchMoveCapture: h }),
      document.addEventListener('wheel', l, dr),
      document.addEventListener('touchmove', l, dr),
      document.addEventListener('touchstart', u, dr),
      function () {
        ;((fr = fr.filter(function (y) {
          return y !== i
        })),
          document.removeEventListener('wheel', l, dr),
          document.removeEventListener('touchmove', l, dr),
          document.removeEventListener('touchstart', u, dr))
      }
    )
  }, [])
  var p = e.removeScrollBar,
    m = e.inert
  return f.createElement(
    f.Fragment,
    null,
    m ? f.createElement(i, { styles: MO(o) }) : null,
    p ? f.createElement(xO, { noRelative: e.noRelative, gapMode: e.gapMode }) : null,
  )
}
function IO(e) {
  for (var t = null; e !== null; ) (e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode))
  return t
}
const OO = lO(By, DO)
var zs = f.forwardRef(function (e, t) {
  return f.createElement(Fs, Bt({}, e, { ref: t, sideCar: OO }))
})
zs.classNames = Fs.classNames
var Nl = ['Enter', ' '],
  NO = ['ArrowDown', 'PageUp', 'Home'],
  Zy = ['ArrowUp', 'PageDown', 'End'],
  LO = [...NO, ...Zy],
  jO = { ltr: [...Nl, 'ArrowRight'], rtl: [...Nl, 'ArrowLeft'] },
  $O = { ltr: ['ArrowLeft'], rtl: ['ArrowRight'] },
  Zo = 'Menu',
  [Do, FO, zO] = iu(Zo),
  [rr, Vs] = jt(Zo, [zO, _n, Oy]),
  Ko = _n(),
  Ky = Oy(),
  [Yy, Mn] = rr(Zo),
  [VO, Yo] = rr(Zo),
  Xy = (e) => {
    const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: i, modal: s = !0 } = e,
      a = Ko(t),
      [l, c] = f.useState(null),
      u = f.useRef(!1),
      d = Be(i),
      h = su(o)
    return (
      f.useEffect(() => {
        const p = () => {
            ;((u.current = !0),
              document.addEventListener('pointerdown', m, { capture: !0, once: !0 }),
              document.addEventListener('pointermove', m, { capture: !0, once: !0 }))
          },
          m = () => (u.current = !1)
        return (
          document.addEventListener('keydown', p, { capture: !0 }),
          () => {
            ;(document.removeEventListener('keydown', p, { capture: !0 }),
              document.removeEventListener('pointerdown', m, { capture: !0 }),
              document.removeEventListener('pointermove', m, { capture: !0 }))
          }
        )
      }, []),
      g.jsx(Os, {
        ...a,
        children: g.jsx(Yy, {
          scope: t,
          open: n,
          onOpenChange: d,
          content: l,
          onContentChange: c,
          children: g.jsx(VO, {
            scope: t,
            onClose: f.useCallback(() => d(!1), [d]),
            isUsingKeyboardRef: u,
            dir: h,
            modal: s,
            children: r,
          }),
        }),
      })
    )
  }
Xy.displayName = Zo
var BO = 'MenuAnchor',
  yu = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = Ko(n)
    return g.jsx(Ns, { ...o, ...r, ref: t })
  })
yu.displayName = BO
var vu = 'MenuPortal',
  [UO, qy] = rr(vu, { forceMount: void 0 }),
  Jy = (e) => {
    const { __scopeMenu: t, forceMount: n, children: r, container: o } = e,
      i = Mn(vu, t)
    return g.jsx(UO, {
      scope: t,
      forceMount: n,
      children: g.jsx(it, { present: n || i.open, children: g.jsx($s, { asChild: !0, container: o, children: r }) }),
    })
  }
Jy.displayName = vu
var St = 'MenuContent',
  [WO, bu] = rr(St),
  Qy = f.forwardRef((e, t) => {
    const n = qy(St, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Mn(St, e.__scopeMenu),
      s = Yo(St, e.__scopeMenu)
    return g.jsx(Do.Provider, {
      scope: e.__scopeMenu,
      children: g.jsx(it, {
        present: r || i.open,
        children: g.jsx(Do.Slot, {
          scope: e.__scopeMenu,
          children: s.modal ? g.jsx(HO, { ...o, ref: t }) : g.jsx(GO, { ...o, ref: t }),
        }),
      }),
    })
  }),
  HO = f.forwardRef((e, t) => {
    const n = Mn(St, e.__scopeMenu),
      r = f.useRef(null),
      o = we(t, r)
    return (
      f.useEffect(() => {
        const i = r.current
        if (i) return gu(i)
      }, []),
      g.jsx(wu, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: U(e.onFocusOutside, (i) => i.preventDefault(), { checkForDefaultPrevented: !1 }),
        onDismiss: () => n.onOpenChange(!1),
      })
    )
  }),
  GO = f.forwardRef((e, t) => {
    const n = Mn(St, e.__scopeMenu)
    return g.jsx(wu, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    })
  }),
  ZO = Yn('MenuContent.ScrollLock'),
  wu = f.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: o,
        onOpenAutoFocus: i,
        onCloseAutoFocus: s,
        disableOutsidePointerEvents: a,
        onEntryFocus: l,
        onEscapeKeyDown: c,
        onPointerDownOutside: u,
        onFocusOutside: d,
        onInteractOutside: h,
        onDismiss: p,
        disableOutsideScroll: m,
        ...y
      } = e,
      v = Mn(St, n),
      w = Yo(St, n),
      b = Ko(n),
      x = Ky(n),
      E = FO(n),
      [C, A] = f.useState(null),
      S = f.useRef(null),
      R = we(t, S, v.onContentChange),
      I = f.useRef(0),
      N = f.useRef(''),
      G = f.useRef(0),
      oe = f.useRef(null),
      te = f.useRef('right'),
      L = f.useRef(0),
      F = m ? zs : f.Fragment,
      O = m ? { as: ZO, allowPinchZoom: !0 } : void 0,
      D = (k) => {
        const W = N.current + k,
          q = E().filter((z) => !z.disabled),
          ae = document.activeElement,
          B = q.find((z) => z.ref.current === ae)?.textValue,
          Z = q.map((z) => z.textValue),
          J = iN(Z, W, B),
          he = q.find((z) => z.textValue === J)?.ref.current
        ;((function z(ee) {
          ;((N.current = ee),
            window.clearTimeout(I.current),
            ee !== '' && (I.current = window.setTimeout(() => z(''), 1e3)))
        })(W),
          he && setTimeout(() => he.focus()))
      }
    ;(f.useEffect(() => () => window.clearTimeout(I.current), []), au())
    const _ = f.useCallback((k) => te.current === oe.current?.side && aN(k, oe.current?.area), [])
    return g.jsx(WO, {
      scope: n,
      searchRef: N,
      onItemEnter: f.useCallback(
        (k) => {
          _(k) && k.preventDefault()
        },
        [_],
      ),
      onItemLeave: f.useCallback(
        (k) => {
          _(k) || (S.current?.focus(), A(null))
        },
        [_],
      ),
      onTriggerLeave: f.useCallback(
        (k) => {
          _(k) && k.preventDefault()
        },
        [_],
      ),
      pointerGraceTimerRef: G,
      onPointerGraceIntentChange: f.useCallback((k) => {
        oe.current = k
      }, []),
      children: g.jsx(F, {
        ...O,
        children: g.jsx(_s, {
          asChild: !0,
          trapped: o,
          onMountAutoFocus: U(i, (k) => {
            ;(k.preventDefault(), S.current?.focus({ preventScroll: !0 }))
          }),
          onUnmountAutoFocus: s,
          children: g.jsx(Ur, {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onEscapeKeyDown: c,
            onPointerDownOutside: u,
            onFocusOutside: d,
            onInteractOutside: h,
            onDismiss: p,
            children: g.jsx(KI, {
              asChild: !0,
              ...x,
              dir: w.dir,
              orientation: 'vertical',
              loop: r,
              currentTabStopId: C,
              onCurrentTabStopIdChange: A,
              onEntryFocus: U(l, (k) => {
                w.isUsingKeyboardRef.current || k.preventDefault()
              }),
              preventScrollOnEntryFocus: !0,
              children: g.jsx(Ls, {
                role: 'menu',
                'aria-orientation': 'vertical',
                'data-state': gv(v.open),
                'data-radix-menu-content': '',
                dir: w.dir,
                ...b,
                ...y,
                ref: R,
                style: { outline: 'none', ...y.style },
                onKeyDown: U(y.onKeyDown, (k) => {
                  const q = k.target.closest('[data-radix-menu-content]') === k.currentTarget,
                    ae = k.ctrlKey || k.altKey || k.metaKey,
                    B = k.key.length === 1
                  q && (k.key === 'Tab' && k.preventDefault(), !ae && B && D(k.key))
                  const Z = S.current
                  if (k.target !== Z || !LO.includes(k.key)) return
                  k.preventDefault()
                  const he = E()
                    .filter((z) => !z.disabled)
                    .map((z) => z.ref.current)
                  ;(Zy.includes(k.key) && he.reverse(), rN(he))
                }),
                onBlur: U(e.onBlur, (k) => {
                  k.currentTarget.contains(k.target) || (window.clearTimeout(I.current), (N.current = ''))
                }),
                onPointerMove: U(
                  e.onPointerMove,
                  Io((k) => {
                    const W = k.target,
                      q = L.current !== k.clientX
                    if (k.currentTarget.contains(W) && q) {
                      const ae = k.clientX > L.current ? 'right' : 'left'
                      ;((te.current = ae), (L.current = k.clientX))
                    }
                  }),
                ),
              }),
            }),
          }),
        }),
      }),
    })
  })
Qy.displayName = St
var KO = 'MenuGroup',
  xu = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e
    return g.jsx(me.div, { role: 'group', ...r, ref: t })
  })
xu.displayName = KO
var YO = 'MenuLabel',
  ev = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e
    return g.jsx(me.div, { ...r, ref: t })
  })
ev.displayName = YO
var as = 'MenuItem',
  Hh = 'menu.itemSelect',
  Bs = f.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e,
      i = f.useRef(null),
      s = Yo(as, e.__scopeMenu),
      a = bu(as, e.__scopeMenu),
      l = we(t, i),
      c = f.useRef(!1),
      u = () => {
        const d = i.current
        if (!n && d) {
          const h = new CustomEvent(Hh, { bubbles: !0, cancelable: !0 })
          ;(d.addEventListener(Hh, (p) => r?.(p), { once: !0 }),
            ly(d, h),
            h.defaultPrevented ? (c.current = !1) : s.onClose())
        }
      }
    return g.jsx(tv, {
      ...o,
      ref: l,
      disabled: n,
      onClick: U(e.onClick, u),
      onPointerDown: (d) => {
        ;(e.onPointerDown?.(d), (c.current = !0))
      },
      onPointerUp: U(e.onPointerUp, (d) => {
        c.current || d.currentTarget?.click()
      }),
      onKeyDown: U(e.onKeyDown, (d) => {
        const h = a.searchRef.current !== ''
        n || (h && d.key === ' ') || (Nl.includes(d.key) && (d.currentTarget.click(), d.preventDefault()))
      }),
    })
  })
Bs.displayName = as
var tv = f.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...i } = e,
      s = bu(as, n),
      a = Ky(n),
      l = f.useRef(null),
      c = we(t, l),
      [u, d] = f.useState(!1),
      [h, p] = f.useState('')
    return (
      f.useEffect(() => {
        const m = l.current
        m && p((m.textContent ?? '').trim())
      }, [i.children]),
      g.jsx(Do.ItemSlot, {
        scope: n,
        disabled: r,
        textValue: o ?? h,
        children: g.jsx(YI, {
          asChild: !0,
          ...a,
          focusable: !r,
          children: g.jsx(me.div, {
            role: 'menuitem',
            'data-highlighted': u ? '' : void 0,
            'aria-disabled': r || void 0,
            'data-disabled': r ? '' : void 0,
            ...i,
            ref: c,
            onPointerMove: U(
              e.onPointerMove,
              Io((m) => {
                r
                  ? s.onItemLeave(m)
                  : (s.onItemEnter(m), m.defaultPrevented || m.currentTarget.focus({ preventScroll: !0 }))
              }),
            ),
            onPointerLeave: U(
              e.onPointerLeave,
              Io((m) => s.onItemLeave(m)),
            ),
            onFocus: U(e.onFocus, () => d(!0)),
            onBlur: U(e.onBlur, () => d(!1)),
          }),
        }),
      })
    )
  }),
  XO = 'MenuCheckboxItem',
  nv = f.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e
    return g.jsx(av, {
      scope: e.__scopeMenu,
      checked: n,
      children: g.jsx(Bs, {
        role: 'menuitemcheckbox',
        'aria-checked': ls(n) ? 'mixed' : n,
        ...o,
        ref: t,
        'data-state': Eu(n),
        onSelect: U(o.onSelect, () => r?.(ls(n) ? !0 : !n), { checkForDefaultPrevented: !1 }),
      }),
    })
  })
nv.displayName = XO
var rv = 'MenuRadioGroup',
  [qO, JO] = rr(rv, { value: void 0, onValueChange: () => {} }),
  ov = f.forwardRef((e, t) => {
    const { value: n, onValueChange: r, ...o } = e,
      i = Be(r)
    return g.jsx(qO, { scope: e.__scopeMenu, value: n, onValueChange: i, children: g.jsx(xu, { ...o, ref: t }) })
  })
ov.displayName = rv
var iv = 'MenuRadioItem',
  sv = f.forwardRef((e, t) => {
    const { value: n, ...r } = e,
      o = JO(iv, e.__scopeMenu),
      i = n === o.value
    return g.jsx(av, {
      scope: e.__scopeMenu,
      checked: i,
      children: g.jsx(Bs, {
        role: 'menuitemradio',
        'aria-checked': i,
        ...r,
        ref: t,
        'data-state': Eu(i),
        onSelect: U(r.onSelect, () => o.onValueChange?.(n), { checkForDefaultPrevented: !1 }),
      }),
    })
  })
sv.displayName = iv
var Su = 'MenuItemIndicator',
  [av, QO] = rr(Su, { checked: !1 }),
  lv = f.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e,
      i = QO(Su, n)
    return g.jsx(it, {
      present: r || ls(i.checked) || i.checked === !0,
      children: g.jsx(me.span, { ...o, ref: t, 'data-state': Eu(i.checked) }),
    })
  })
lv.displayName = Su
var eN = 'MenuSeparator',
  cv = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e
    return g.jsx(me.div, { role: 'separator', 'aria-orientation': 'horizontal', ...r, ref: t })
  })
cv.displayName = eN
var tN = 'MenuArrow',
  uv = f.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = Ko(n)
    return g.jsx(js, { ...o, ...r, ref: t })
  })
uv.displayName = tN
var Cu = 'MenuSub',
  [nN, dv] = rr(Cu),
  fv = (e) => {
    const { __scopeMenu: t, children: n, open: r = !1, onOpenChange: o } = e,
      i = Mn(Cu, t),
      s = Ko(t),
      [a, l] = f.useState(null),
      [c, u] = f.useState(null),
      d = Be(o)
    return (
      f.useEffect(() => (i.open === !1 && d(!1), () => d(!1)), [i.open, d]),
      g.jsx(Os, {
        ...s,
        children: g.jsx(Yy, {
          scope: t,
          open: r,
          onOpenChange: d,
          content: c,
          onContentChange: u,
          children: g.jsx(nN, {
            scope: t,
            contentId: It(),
            triggerId: It(),
            trigger: a,
            onTriggerChange: l,
            children: n,
          }),
        }),
      })
    )
  }
fv.displayName = Cu
var uo = 'MenuSubTrigger',
  hv = f.forwardRef((e, t) => {
    const n = Mn(uo, e.__scopeMenu),
      r = Yo(uo, e.__scopeMenu),
      o = dv(uo, e.__scopeMenu),
      i = bu(uo, e.__scopeMenu),
      s = f.useRef(null),
      { pointerGraceTimerRef: a, onPointerGraceIntentChange: l } = i,
      c = { __scopeMenu: e.__scopeMenu },
      u = f.useCallback(() => {
        ;(s.current && window.clearTimeout(s.current), (s.current = null))
      }, [])
    return (
      f.useEffect(() => u, [u]),
      f.useEffect(() => {
        const d = a.current
        return () => {
          ;(window.clearTimeout(d), l(null))
        }
      }, [a, l]),
      g.jsx(yu, {
        asChild: !0,
        ...c,
        children: g.jsx(tv, {
          id: o.triggerId,
          'aria-haspopup': 'menu',
          'aria-expanded': n.open,
          'aria-controls': o.contentId,
          'data-state': gv(n.open),
          ...e,
          ref: Cs(t, o.onTriggerChange),
          onClick: (d) => {
            ;(e.onClick?.(d),
              !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0)))
          },
          onPointerMove: U(
            e.onPointerMove,
            Io((d) => {
              ;(i.onItemEnter(d),
                !d.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !s.current &&
                  (i.onPointerGraceIntentChange(null),
                  (s.current = window.setTimeout(() => {
                    ;(n.onOpenChange(!0), u())
                  }, 100))))
            }),
          ),
          onPointerLeave: U(
            e.onPointerLeave,
            Io((d) => {
              u()
              const h = n.content?.getBoundingClientRect()
              if (h) {
                const p = n.content?.dataset.side,
                  m = p === 'right',
                  y = m ? -5 : 5,
                  v = h[m ? 'left' : 'right'],
                  w = h[m ? 'right' : 'left']
                ;(i.onPointerGraceIntentChange({
                  area: [
                    { x: d.clientX + y, y: d.clientY },
                    { x: v, y: h.top },
                    { x: w, y: h.top },
                    { x: w, y: h.bottom },
                    { x: v, y: h.bottom },
                  ],
                  side: p,
                }),
                  window.clearTimeout(a.current),
                  (a.current = window.setTimeout(() => i.onPointerGraceIntentChange(null), 300)))
              } else {
                if ((i.onTriggerLeave(d), d.defaultPrevented)) return
                i.onPointerGraceIntentChange(null)
              }
            }),
          ),
          onKeyDown: U(e.onKeyDown, (d) => {
            const h = i.searchRef.current !== ''
            e.disabled ||
              (h && d.key === ' ') ||
              (jO[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault()))
          }),
        }),
      })
    )
  })
hv.displayName = uo
var pv = 'MenuSubContent',
  mv = f.forwardRef((e, t) => {
    const n = qy(St, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Mn(St, e.__scopeMenu),
      s = Yo(St, e.__scopeMenu),
      a = dv(pv, e.__scopeMenu),
      l = f.useRef(null),
      c = we(t, l)
    return g.jsx(Do.Provider, {
      scope: e.__scopeMenu,
      children: g.jsx(it, {
        present: r || i.open,
        children: g.jsx(Do.Slot, {
          scope: e.__scopeMenu,
          children: g.jsx(wu, {
            id: a.contentId,
            'aria-labelledby': a.triggerId,
            ...o,
            ref: c,
            align: 'start',
            side: s.dir === 'rtl' ? 'left' : 'right',
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (u) => {
              ;(s.isUsingKeyboardRef.current && l.current?.focus(), u.preventDefault())
            },
            onCloseAutoFocus: (u) => u.preventDefault(),
            onFocusOutside: U(e.onFocusOutside, (u) => {
              u.target !== a.trigger && i.onOpenChange(!1)
            }),
            onEscapeKeyDown: U(e.onEscapeKeyDown, (u) => {
              ;(s.onClose(), u.preventDefault())
            }),
            onKeyDown: U(e.onKeyDown, (u) => {
              const d = u.currentTarget.contains(u.target),
                h = $O[s.dir].includes(u.key)
              d && h && (i.onOpenChange(!1), a.trigger?.focus(), u.preventDefault())
            }),
          }),
        }),
      }),
    })
  })
mv.displayName = pv
function gv(e) {
  return e ? 'open' : 'closed'
}
function ls(e) {
  return e === 'indeterminate'
}
function Eu(e) {
  return ls(e) ? 'indeterminate' : e ? 'checked' : 'unchecked'
}
function rN(e) {
  const t = document.activeElement
  for (const n of e) if (n === t || (n.focus(), document.activeElement !== t)) return
}
function oN(e, t) {
  return e.map((n, r) => e[(t + r) % e.length])
}
function iN(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1
  let s = oN(e, Math.max(i, 0))
  o.length === 1 && (s = s.filter((c) => c !== n))
  const l = s.find((c) => c.toLowerCase().startsWith(o.toLowerCase()))
  return l !== n ? l : void 0
}
function sN(e, t) {
  const { x: n, y: r } = e
  let o = !1
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const a = t[i],
      l = t[s],
      c = a.x,
      u = a.y,
      d = l.x,
      h = l.y
    u > r != h > r && n < ((d - c) * (r - u)) / (h - u) + c && (o = !o)
  }
  return o
}
function aN(e, t) {
  if (!t) return !1
  const n = { x: e.clientX, y: e.clientY }
  return sN(n, t)
}
function Io(e) {
  return (t) => (t.pointerType === 'mouse' ? e(t) : void 0)
}
var yv = Xy,
  vv = yu,
  bv = Jy,
  wv = Qy,
  xv = xu,
  Sv = ev,
  Cv = Bs,
  Ev = nv,
  Pv = ov,
  Rv = sv,
  Tv = lv,
  Av = cv,
  _v = uv,
  Mv = fv,
  kv = hv,
  Dv = mv,
  Pu = 'ContextMenu',
  [lN] = jt(Pu, [Vs]),
  Qe = Vs(),
  [cN, Iv] = lN(Pu),
  Ov = (e) => {
    const { __scopeContextMenu: t, children: n, onOpenChange: r, dir: o, modal: i = !0 } = e,
      [s, a] = f.useState(!1),
      l = Qe(t),
      c = Be(r),
      u = f.useCallback(
        (d) => {
          ;(a(d), c(d))
        },
        [c],
      )
    return g.jsx(cN, {
      scope: t,
      open: s,
      onOpenChange: u,
      modal: i,
      children: g.jsx(yv, { ...l, dir: o, open: s, onOpenChange: u, modal: i, children: n }),
    })
  }
Ov.displayName = Pu
var Nv = 'ContextMenuTrigger',
  Lv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, disabled: r = !1, ...o } = e,
      i = Iv(Nv, n),
      s = Qe(n),
      a = f.useRef({ x: 0, y: 0 }),
      l = f.useRef({ getBoundingClientRect: () => DOMRect.fromRect({ width: 0, height: 0, ...a.current }) }),
      c = f.useRef(0),
      u = f.useCallback(() => window.clearTimeout(c.current), []),
      d = (h) => {
        ;((a.current = { x: h.clientX, y: h.clientY }), i.onOpenChange(!0))
      }
    return (
      f.useEffect(() => u, [u]),
      f.useEffect(() => void (r && u()), [r, u]),
      g.jsxs(g.Fragment, {
        children: [
          g.jsx(vv, { ...s, virtualRef: l }),
          g.jsx(me.span, {
            'data-state': i.open ? 'open' : 'closed',
            'data-disabled': r ? '' : void 0,
            ...o,
            ref: t,
            style: { WebkitTouchCallout: 'none', ...e.style },
            onContextMenu: r
              ? e.onContextMenu
              : U(e.onContextMenu, (h) => {
                  ;(u(), d(h), h.preventDefault())
                }),
            onPointerDown: r
              ? e.onPointerDown
              : U(
                  e.onPointerDown,
                  Ei((h) => {
                    ;(u(), (c.current = window.setTimeout(() => d(h), 700)))
                  }),
                ),
            onPointerMove: r ? e.onPointerMove : U(e.onPointerMove, Ei(u)),
            onPointerCancel: r ? e.onPointerCancel : U(e.onPointerCancel, Ei(u)),
            onPointerUp: r ? e.onPointerUp : U(e.onPointerUp, Ei(u)),
          }),
        ],
      })
    )
  })
Lv.displayName = Nv
var uN = 'ContextMenuPortal',
  jv = (e) => {
    const { __scopeContextMenu: t, ...n } = e,
      r = Qe(t)
    return g.jsx(bv, { ...r, ...n })
  }
jv.displayName = uN
var $v = 'ContextMenuContent',
  Fv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Iv($v, n),
      i = Qe(n),
      s = f.useRef(!1)
    return g.jsx(wv, {
      ...i,
      ...r,
      ref: t,
      side: 'right',
      sideOffset: 2,
      align: 'start',
      onCloseAutoFocus: (a) => {
        ;(e.onCloseAutoFocus?.(a), !a.defaultPrevented && s.current && a.preventDefault(), (s.current = !1))
      },
      onInteractOutside: (a) => {
        ;(e.onInteractOutside?.(a), !a.defaultPrevented && !o.modal && (s.current = !0))
      },
      style: {
        ...e.style,
        '--radix-context-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-context-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-context-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-context-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-context-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    })
  })
Fv.displayName = $v
var dN = 'ContextMenuGroup',
  fN = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(xv, { ...o, ...r, ref: t })
  })
fN.displayName = dN
var hN = 'ContextMenuLabel',
  zv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(Sv, { ...o, ...r, ref: t })
  })
zv.displayName = hN
var pN = 'ContextMenuItem',
  Vv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(Cv, { ...o, ...r, ref: t })
  })
Vv.displayName = pN
var mN = 'ContextMenuCheckboxItem',
  Bv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(Ev, { ...o, ...r, ref: t })
  })
Bv.displayName = mN
var gN = 'ContextMenuRadioGroup',
  yN = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(Pv, { ...o, ...r, ref: t })
  })
yN.displayName = gN
var vN = 'ContextMenuRadioItem',
  bN = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(Rv, { ...o, ...r, ref: t })
  })
bN.displayName = vN
var wN = 'ContextMenuItemIndicator',
  Uv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(Tv, { ...o, ...r, ref: t })
  })
Uv.displayName = wN
var xN = 'ContextMenuSeparator',
  Wv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(Av, { ...o, ...r, ref: t })
  })
Wv.displayName = xN
var SN = 'ContextMenuArrow',
  CN = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(_v, { ...o, ...r, ref: t })
  })
CN.displayName = SN
var Hv = 'ContextMenuSub',
  Gv = (e) => {
    const { __scopeContextMenu: t, children: n, onOpenChange: r, open: o, defaultOpen: i } = e,
      s = Qe(t),
      [a, l] = nr({ prop: o, defaultProp: i ?? !1, onChange: r, caller: Hv })
    return g.jsx(Mv, { ...s, open: a, onOpenChange: l, children: n })
  }
Gv.displayName = Hv
var EN = 'ContextMenuSubTrigger',
  Zv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(kv, { ...o, ...r, ref: t })
  })
Zv.displayName = EN
var PN = 'ContextMenuSubContent',
  Kv = f.forwardRef((e, t) => {
    const { __scopeContextMenu: n, ...r } = e,
      o = Qe(n)
    return g.jsx(Dv, {
      ...o,
      ...r,
      ref: t,
      style: {
        ...e.style,
        '--radix-context-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-context-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-context-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-context-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-context-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    })
  })
Kv.displayName = PN
function Ei(e) {
  return (t) => (t.pointerType !== 'mouse' ? e(t) : void 0)
}
var RN = Ov,
  TN = Lv,
  AN = jv,
  Yv = Fv,
  _N = zv,
  Xv = Vv,
  qv = Bv,
  MN = Uv,
  Jv = Wv,
  kN = Gv,
  Qv = Zv,
  eb = Kv
const DN = RN,
  IN = TN,
  ON = kN,
  Ru = AN,
  tb = (e) => {
    const t = de.c(13)
    let n, r, o, i, s
    if (t[0] !== e) {
      const { ref: c, className: u, inset: d, children: h, ...p } = e
      ;((r = h),
        (o = p),
        (n = Qv),
        (i = c),
        (s = Re(
          'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex select-none items-center rounded-[5px] px-2.5 py-1.5 outline-none',
          d && 'pl-8',
          'flex items-center justify-center gap-2',
          u,
          o.disabled && 'cursor-not-allowed opacity-30',
        )),
        (t[0] = e),
        (t[1] = n),
        (t[2] = r),
        (t[3] = o),
        (t[4] = i),
        (t[5] = s))
    } else ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]), (s = t[5]))
    let a
    t[6] === Symbol.for('react.memo_cache_sentinel')
      ? ((a = g.jsx('i', { className: 'i-mingcute-right-line -mr-1 ml-auto size-3.5' })), (t[6] = a))
      : (a = t[6])
    let l
    return (
      t[7] !== n || t[8] !== r || t[9] !== o || t[10] !== i || t[11] !== s
        ? ((l = g.jsxs(n, { ref: i, className: s, ...o, children: [r, a] })),
          (t[7] = n),
          (t[8] = r),
          (t[9] = o),
          (t[10] = i),
          (t[11] = s),
          (t[12] = l))
        : (l = t[12]),
      l
    )
  }
tb.displayName = Qv.displayName
const nb = (e) => {
  const t = de.c(11)
  let n, r, o
  t[0] !== e
    ? (({ ref: o, className: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o))
    : ((n = t[1]), (r = t[2]), (o = t[3]))
  let i
  t[4] !== n
    ? ((i = Re(
        'backdrop-blur-2xl text-text text-body',
        'min-w-32 overflow-hidden',
        'rounded-xl p-1 relative border border-accent/20',
        'z-10061',
        n,
      )),
      (t[4] = n),
      (t[5] = i))
    : (i = t[5])
  let s
  t[6] === Symbol.for('react.memo_cache_sentinel')
    ? ((s = {
        backgroundImage:
          'linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 98%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))',
        boxShadow:
          '0 8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 2px 8px rgba(0, 0, 0, 0.1)',
      }),
      (t[6] = s))
    : (s = t[6])
  let a
  return (
    t[7] !== r || t[8] !== o || t[9] !== i
      ? ((a = g.jsx(Ru, { children: g.jsx(eb, { ref: o, className: i, style: s, ...r }) })),
        (t[7] = r),
        (t[8] = o),
        (t[9] = i),
        (t[10] = a))
      : (a = t[10]),
    a
  )
}
nb.displayName = eb.displayName
const rb = (e) => {
  const t = de.c(11)
  let n, r, o
  t[0] !== e
    ? (({ ref: o, className: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o))
    : ((n = t[1]), (r = t[2]), (o = t[3]))
  let i
  t[4] !== n
    ? ((i = Re(
        'backdrop-blur-2xl text-text z-10060 min-w-32 overflow-hidden rounded-xl p-1 relative border border-accent/20',
        'motion-scale-in-75 motion-duration-150 text-body lg:animate-none',
        n,
      )),
      (t[4] = n),
      (t[5] = i))
    : (i = t[5])
  let s
  t[6] === Symbol.for('react.memo_cache_sentinel')
    ? ((s = {
        backgroundImage:
          'linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 98%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))',
        boxShadow:
          '0 8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 2px 8px rgba(0, 0, 0, 0.1)',
      }),
      (t[6] = s))
    : (s = t[6])
  let a
  return (
    t[7] !== r || t[8] !== o || t[9] !== i
      ? ((a = g.jsx(Ru, { children: g.jsx(Yv, { ref: o, className: i, style: s, ...r }) })),
        (t[7] = r),
        (t[8] = o),
        (t[9] = i),
        (t[10] = a))
      : (a = t[10]),
    a
  )
}
rb.displayName = Yv.displayName
const ob = (e) => {
  const t = de.c(13)
  let n, r, o, i
  t[0] !== e
    ? (({ ref: i, className: n, inset: r, ...o } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o), (t[4] = i))
    : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]))
  const s = r && 'pl-8'
  let a
  t[5] !== n || t[6] !== s
    ? ((a = Re(
        'cursor-menu text-sm relative flex select-none items-center rounded-lg px-2.5 py-1 outline-none data-disabled:pointer-events-none data-disabled:opacity-50',
        'focus-within:outline-transparent transition-all duration-200',
        'data-highlighted:text-accent',
        'h-[28px]',
        s,
        n,
      )),
      (t[5] = n),
      (t[6] = s),
      (t[7] = a))
    : (a = t[7])
  let l
  t[8] === Symbol.for('react.memo_cache_sentinel')
    ? ((l = {
        '--highlight-bg':
          'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 8%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent))',
      }),
      (t[8] = l))
    : (l = t[8])
  let c
  return (
    t[9] !== o || t[10] !== i || t[11] !== a
      ? ((c = g.jsx(Xv, { ref: i, className: a, style: l, ...o })), (t[9] = o), (t[10] = i), (t[11] = a), (t[12] = c))
      : (c = t[12]),
    c
  )
}
ob.displayName = Xv.displayName
const ib = (e) => {
  const t = de.c(16)
  let n, r, o, i, s
  t[0] !== e
    ? (({ ref: s, className: o, children: r, checked: n, ...i } = e),
      (t[0] = e),
      (t[1] = n),
      (t[2] = r),
      (t[3] = o),
      (t[4] = i),
      (t[5] = s))
    : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]), (s = t[5]))
  let a
  t[6] !== o
    ? ((a = Re(
        'cursor-checkbox text-sm relative flex select-none items-center rounded-lg px-8 py-1.5 outline-none data-disabled:pointer-events-none data-disabled:opacity-50',
        'focus-within:outline-transparent transition-all duration-200',
        'data-highlighted:text-accent',
        'h-[28px]',
        o,
      )),
      (t[6] = o),
      (t[7] = a))
    : (a = t[7])
  let l
  t[8] === Symbol.for('react.memo_cache_sentinel')
    ? ((l = {
        '--highlight-bg':
          'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 8%, transparent), color-mix(in srgb, var(--color-accent) 5%, transparent))',
      }),
      (t[8] = l))
    : (l = t[8])
  let c
  t[9] === Symbol.for('react.memo_cache_sentinel')
    ? ((c = g.jsx('span', {
        className: 'absolute left-2 flex items-center justify-center',
        children: g.jsx(MN, { asChild: !0, children: g.jsx('i', { className: 'i-mgc-check-filled size-3' }) }),
      })),
      (t[9] = c))
    : (c = t[9])
  let u
  return (
    t[10] !== n || t[11] !== r || t[12] !== i || t[13] !== s || t[14] !== a
      ? ((u = g.jsxs(qv, { ref: s, className: a, checked: n, style: l, ...i, children: [c, r] })),
        (t[10] = n),
        (t[11] = r),
        (t[12] = i),
        (t[13] = s),
        (t[14] = a),
        (t[15] = u))
      : (u = t[15]),
    u
  )
}
ib.displayName = qv.displayName
_N.displayName
const sb = (e) => {
  const t = de.c(7)
  let n, r
  t[0] !== e ? (({ ref: r, ...n } = e), (t[0] = e), (t[1] = n), (t[2] = r)) : ((n = t[1]), (r = t[2]))
  let o
  t[3] === Symbol.for('react.memo_cache_sentinel')
    ? ((o = {
        background:
          'linear-gradient(to right, transparent, color-mix(in srgb, var(--color-accent) 20%, transparent), transparent)',
      }),
      (t[3] = o))
    : (o = t[3])
  let i
  return (
    t[4] !== n || t[5] !== r
      ? ((i = g.jsx(Jv, { className: 'mx-2 my-1 h-px', style: o, ref: r, ...n })), (t[4] = n), (t[5] = r), (t[6] = i))
      : (i = t[6]),
    i
  )
}
sb.displayName = Jv.displayName
var Us = 'Dialog',
  [ab] = jt(Us),
  [NN, $t] = ab(Us),
  lb = (e) => {
    const { __scopeDialog: t, children: n, open: r, defaultOpen: o, onOpenChange: i, modal: s = !0 } = e,
      a = f.useRef(null),
      l = f.useRef(null),
      [c, u] = nr({ prop: r, defaultProp: o ?? !1, onChange: i, caller: Us })
    return g.jsx(NN, {
      scope: t,
      triggerRef: a,
      contentRef: l,
      contentId: It(),
      titleId: It(),
      descriptionId: It(),
      open: c,
      onOpenChange: u,
      onOpenToggle: f.useCallback(() => u((d) => !d), [u]),
      modal: s,
      children: n,
    })
  }
lb.displayName = Us
var cb = 'DialogTrigger',
  ub = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = $t(cb, n),
      i = we(t, o.triggerRef)
    return g.jsx(me.button, {
      type: 'button',
      'aria-haspopup': 'dialog',
      'aria-expanded': o.open,
      'aria-controls': o.contentId,
      'data-state': _u(o.open),
      ...r,
      ref: i,
      onClick: U(e.onClick, o.onOpenToggle),
    })
  })
ub.displayName = cb
var Tu = 'DialogPortal',
  [LN, db] = ab(Tu, { forceMount: void 0 }),
  fb = (e) => {
    const { __scopeDialog: t, forceMount: n, children: r, container: o } = e,
      i = $t(Tu, t)
    return g.jsx(LN, {
      scope: t,
      forceMount: n,
      children: f.Children.map(r, (s) =>
        g.jsx(it, { present: n || i.open, children: g.jsx($s, { asChild: !0, container: o, children: s }) }),
      ),
    })
  }
fb.displayName = Tu
var cs = 'DialogOverlay',
  hb = f.forwardRef((e, t) => {
    const n = db(cs, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = $t(cs, e.__scopeDialog)
    return i.modal ? g.jsx(it, { present: r || i.open, children: g.jsx($N, { ...o, ref: t }) }) : null
  })
hb.displayName = cs
var jN = Yn('DialogOverlay.RemoveScroll'),
  $N = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = $t(cs, n)
    return g.jsx(zs, {
      as: jN,
      allowPinchZoom: !0,
      shards: [o.contentRef],
      children: g.jsx(me.div, { 'data-state': _u(o.open), ...r, ref: t, style: { pointerEvents: 'auto', ...r.style } }),
    })
  }),
  qn = 'DialogContent',
  pb = f.forwardRef((e, t) => {
    const n = db(qn, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = $t(qn, e.__scopeDialog)
    return g.jsx(it, {
      present: r || i.open,
      children: i.modal ? g.jsx(FN, { ...o, ref: t }) : g.jsx(zN, { ...o, ref: t }),
    })
  })
pb.displayName = qn
var FN = f.forwardRef((e, t) => {
    const n = $t(qn, e.__scopeDialog),
      r = f.useRef(null),
      o = we(t, n.contentRef, r)
    return (
      f.useEffect(() => {
        const i = r.current
        if (i) return gu(i)
      }, []),
      g.jsx(mb, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: U(e.onCloseAutoFocus, (i) => {
          ;(i.preventDefault(), n.triggerRef.current?.focus())
        }),
        onPointerDownOutside: U(e.onPointerDownOutside, (i) => {
          const s = i.detail.originalEvent,
            a = s.button === 0 && s.ctrlKey === !0
          ;(s.button === 2 || a) && i.preventDefault()
        }),
        onFocusOutside: U(e.onFocusOutside, (i) => i.preventDefault()),
      })
    )
  }),
  zN = f.forwardRef((e, t) => {
    const n = $t(qn, e.__scopeDialog),
      r = f.useRef(!1),
      o = f.useRef(!1)
    return g.jsx(mb, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (i) => {
        ;(e.onCloseAutoFocus?.(i),
          i.defaultPrevented || (r.current || n.triggerRef.current?.focus(), i.preventDefault()),
          (r.current = !1),
          (o.current = !1))
      },
      onInteractOutside: (i) => {
        ;(e.onInteractOutside?.(i),
          i.defaultPrevented || ((r.current = !0), i.detail.originalEvent.type === 'pointerdown' && (o.current = !0)))
        const s = i.target
        ;(n.triggerRef.current?.contains(s) && i.preventDefault(),
          i.detail.originalEvent.type === 'focusin' && o.current && i.preventDefault())
      },
    })
  }),
  mb = f.forwardRef((e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: i, ...s } = e,
      a = $t(qn, n),
      l = f.useRef(null),
      c = we(t, l)
    return (
      au(),
      g.jsxs(g.Fragment, {
        children: [
          g.jsx(_s, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: o,
            onUnmountAutoFocus: i,
            children: g.jsx(Ur, {
              role: 'dialog',
              id: a.contentId,
              'aria-describedby': a.descriptionId,
              'aria-labelledby': a.titleId,
              'data-state': _u(a.open),
              ...s,
              ref: c,
              onDismiss: () => a.onOpenChange(!1),
            }),
          }),
          g.jsxs(g.Fragment, {
            children: [g.jsx(BN, { titleId: a.titleId }), g.jsx(WN, { contentRef: l, descriptionId: a.descriptionId })],
          }),
        ],
      })
    )
  }),
  Au = 'DialogTitle',
  gb = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = $t(Au, n)
    return g.jsx(me.h2, { id: o.titleId, ...r, ref: t })
  })
gb.displayName = Au
var yb = 'DialogDescription',
  vb = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = $t(yb, n)
    return g.jsx(me.p, { id: o.descriptionId, ...r, ref: t })
  })
vb.displayName = yb
var bb = 'DialogClose',
  VN = f.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = $t(bb, n)
    return g.jsx(me.button, { type: 'button', ...r, ref: t, onClick: U(e.onClick, () => o.onOpenChange(!1)) })
  })
VN.displayName = bb
function _u(e) {
  return e ? 'open' : 'closed'
}
var wb = 'DialogTitleWarning',
  [ZF, xb] = W2(wb, { contentName: qn, titleName: Au, docsSlug: 'dialog' }),
  BN = ({ titleId: e }) => {
    const t = xb(wb),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`
    return (
      f.useEffect(() => {
        e && (document.getElementById(e) || console.error(n))
      }, [n, e]),
      null
    )
  },
  UN = 'DialogDescriptionWarning',
  WN = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${xb(UN).contentName}}.`
    return (
      f.useEffect(() => {
        const o = e.current?.getAttribute('aria-describedby')
        t && o && (document.getElementById(t) || console.warn(r))
      }, [r, e, t]),
      null
    )
  },
  HN = lb,
  GN = ub,
  ZN = fb,
  Sb = hb,
  Cb = pb,
  Eb = gb,
  Pb = vb
const KN = () => f.use(Rb).to || document.body,
  Rb = f.createContext({ to: void 0 }),
  KF = Rb,
  Tb = f.createContext({ open: !1 }),
  YF = (e) => {
    const t = de.c(18)
    let n, r
    t[0] !== e ? (({ children: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r)) : ((n = t[1]), (r = t[2]))
    const [o, i] = f.useState(r.open || !1)
    let s, a
    ;(t[3] !== r.open
      ? ((s = () => {
          r.open !== void 0 && i(r.open)
        }),
        (a = [r.open]),
        (t[3] = r.open),
        (t[4] = s),
        (t[5] = a))
      : ((s = t[4]), (a = t[5])),
      f.useEffect(s, a))
    let l
    t[6] !== o ? ((l = { open: o }), (t[6] = o), (t[7] = l)) : (l = t[7])
    const c = l
    let u
    t[8] !== r
      ? ((u = (p) => {
          ;(i(p), r.onOpenChange?.(p))
        }),
        (t[8] = r),
        (t[9] = u))
      : (u = t[9])
    let d
    t[10] !== n || t[11] !== o || t[12] !== r || t[13] !== u
      ? ((d = g.jsx(HN, { ...r, open: o, onOpenChange: u, children: n })),
        (t[10] = n),
        (t[11] = o),
        (t[12] = r),
        (t[13] = u),
        (t[14] = d))
      : (d = t[14])
    let h
    return (
      t[15] !== c || t[16] !== d
        ? ((h = g.jsx(Tb, { value: c, children: d })), (t[15] = c), (t[16] = d), (t[17] = h))
        : (h = t[17]),
      h
    )
  },
  XF = GN,
  YN = (e) => {
    const t = de.c(9)
    let n, r
    t[0] !== e ? (({ children: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r)) : ((n = t[1]), (r = t[2]))
    const { open: o } = f.use(Tb),
      i = KN(),
      s = o && n
    let a
    t[3] !== s ? ((a = g.jsx(tM, { mode: 'wait', children: s })), (t[3] = s), (t[4] = a)) : (a = t[4])
    let l
    return (
      t[5] !== r || t[6] !== a || t[7] !== i
        ? ((l = g.jsx(ZN, { container: i, forceMount: !0, ...r, children: a })),
          (t[5] = r),
          (t[6] = a),
          (t[7] = i),
          (t[8] = l))
        : (l = t[8]),
      l
    )
  },
  Ab = (e) => {
    const t = de.c(11)
    let n, r, o
    t[0] !== e
      ? (({ ref: o, className: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o))
      : ((n = t[1]), (r = t[2]), (o = t[3]))
    let i
    t[4] !== n ? ((i = Re('fixed inset-0 z-100000000', n)), (t[4] = n), (t[5] = i)) : (i = t[5])
    let s
    t[6] === Symbol.for('react.memo_cache_sentinel')
      ? ((s = g.jsx(Br.div, {
          className: 'bg-black/50 backdrop-blur-sm',
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: Fo.presets.smooth,
        })),
        (t[6] = s))
      : (s = t[6])
    let a
    return (
      t[7] !== r || t[8] !== o || t[9] !== i
        ? ((a = g.jsx(Sb, { ref: o, className: i, asChild: !0, ...r, children: s })),
          (t[7] = r),
          (t[8] = o),
          (t[9] = i),
          (t[10] = a))
        : (a = t[10]),
      a
    )
  }
Ab.displayName = Sb.displayName
const XN = (e) => {
  const t = de.c(20)
  let n, r, o, i
  t[0] !== e
    ? (({ ref: i, className: r, children: n, ...o } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o), (t[4] = i))
    : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]))
  let s
  t[5] === Symbol.for('react.memo_cache_sentinel') ? ((s = g.jsx(Ab, {})), (t[5] = s)) : (s = t[5])
  let a
  t[6] !== r
    ? ((a = Re('fixed left-[50%] top-[50%] z-100000000 w-full max-w-lg', r)), (t[6] = r), (t[7] = a))
    : (a = t[7])
  let l, c, u, d
  t[8] === Symbol.for('react.memo_cache_sentinel')
    ? ((l = {
        backgroundImage:
          'linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 98%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))',
        boxShadow:
          '0 8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 2px 8px rgba(0, 0, 0, 0.1)',
      }),
      (c = { opacity: 0, scale: 0.95, y: 8, x: '-50%', translateY: '-50%' }),
      (u = { opacity: 1, scale: 1, y: 0, x: '-50%', translateY: '-50%' }),
      (d = { opacity: 0, scale: 0.95, y: 8, x: '-50%', translateY: '-50%' }),
      (t[8] = l),
      (t[9] = c),
      (t[10] = u),
      (t[11] = d))
    : ((l = t[8]), (c = t[9]), (u = t[10]), (d = t[11]))
  let h
  t[12] === Symbol.for('react.memo_cache_sentinel')
    ? ((h = g.jsx('div', {
        className: 'pointer-events-none absolute inset-0 rounded-2xl',
        style: {
          background:
            'linear-gradient(to bottom right, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent, color-mix(in srgb, var(--color-accent) 5%, transparent))',
        },
      })),
      (t[12] = h))
    : (h = t[12])
  let p
  t[13] !== n
    ? ((p = g.jsxs(Br.div, {
        className: 'border-accent/20 gap-4 overflow-hidden rounded-2xl border p-6 backdrop-blur-2xl',
        style: l,
        initial: c,
        animate: u,
        exit: d,
        transition: Fo.presets.smooth,
        children: [h, g.jsx('div', { className: 'relative flex h-0 flex-1 flex-col', children: n })],
      })),
      (t[13] = n),
      (t[14] = p))
    : (p = t[14])
  let m
  return (
    t[15] !== o || t[16] !== i || t[17] !== a || t[18] !== p
      ? ((m = g.jsxs(YN, { children: [s, g.jsx(Cb, { ref: i, className: a, asChild: !0, ...o, children: p })] })),
        (t[15] = o),
        (t[16] = i),
        (t[17] = a),
        (t[18] = p),
        (t[19] = m))
      : (m = t[19]),
    m
  )
}
XN.displayName = Cb.displayName
const qN = (e) => {
  const t = de.c(8)
  let n, r
  t[0] !== e ? (({ className: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r)) : ((n = t[1]), (r = t[2]))
  let o
  t[3] !== n ? ((o = Re('flex flex-col space-y-1.5 text-center sm:text-left', n)), (t[3] = n), (t[4] = o)) : (o = t[4])
  let i
  return (
    t[5] !== r || t[6] !== o
      ? ((i = g.jsx('div', { className: o, ...r })), (t[5] = r), (t[6] = o), (t[7] = i))
      : (i = t[7]),
    i
  )
}
qN.displayName = 'DialogHeader'
const JN = (e) => {
  const t = de.c(10)
  let n, r, o
  t[0] !== e
    ? (({ ref: o, className: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o))
    : ((n = t[1]), (r = t[2]), (o = t[3]))
  let i
  t[4] !== n
    ? ((i = Re('text-lg font-semibold leading-none tracking-tight text-white', n)), (t[4] = n), (t[5] = i))
    : (i = t[5])
  let s
  return (
    t[6] !== r || t[7] !== o || t[8] !== i
      ? ((s = g.jsx(Eb, { ref: o, className: i, ...r })), (t[6] = r), (t[7] = o), (t[8] = i), (t[9] = s))
      : (s = t[9]),
    s
  )
}
JN.displayName = Eb.displayName
const QN = (e) => {
  const t = de.c(10)
  let n, r, o
  t[0] !== e
    ? (({ ref: o, className: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o))
    : ((n = t[1]), (r = t[2]), (o = t[3]))
  let i
  t[4] !== n ? ((i = Re('text-sm text-white/70', n)), (t[4] = n), (t[5] = i)) : (i = t[5])
  let s
  return (
    t[6] !== r || t[7] !== o || t[8] !== i
      ? ((s = g.jsx(Pb, { ref: o, className: i, ...r })), (t[6] = r), (t[7] = o), (t[8] = i), (t[9] = s))
      : (s = t[9]),
    s
  )
}
QN.displayName = Pb.displayName
var Ws = 'DropdownMenu',
  [eL, tL] = jt(Ws, [Vs]),
  et = Vs(),
  [nL, _b] = eL(Ws),
  Mu = (e) => {
    const { __scopeDropdownMenu: t, children: n, dir: r, open: o, defaultOpen: i, onOpenChange: s, modal: a = !0 } = e,
      l = et(t),
      c = f.useRef(null),
      [u, d] = nr({ prop: o, defaultProp: i ?? !1, onChange: s, caller: Ws })
    return g.jsx(nL, {
      scope: t,
      triggerId: It(),
      triggerRef: c,
      contentId: It(),
      open: u,
      onOpenChange: d,
      onOpenToggle: f.useCallback(() => d((h) => !h), [d]),
      modal: a,
      children: g.jsx(yv, { ...l, open: u, onOpenChange: d, dir: r, modal: a, children: n }),
    })
  }
Mu.displayName = Ws
var Mb = 'DropdownMenuTrigger',
  ku = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e,
      i = _b(Mb, n),
      s = et(n)
    return g.jsx(vv, {
      asChild: !0,
      ...s,
      children: g.jsx(me.button, {
        type: 'button',
        id: i.triggerId,
        'aria-haspopup': 'menu',
        'aria-expanded': i.open,
        'aria-controls': i.open ? i.contentId : void 0,
        'data-state': i.open ? 'open' : 'closed',
        'data-disabled': r ? '' : void 0,
        disabled: r,
        ...o,
        ref: Cs(t, i.triggerRef),
        onPointerDown: U(e.onPointerDown, (a) => {
          !r && a.button === 0 && a.ctrlKey === !1 && (i.onOpenToggle(), i.open || a.preventDefault())
        }),
        onKeyDown: U(e.onKeyDown, (a) => {
          r ||
            (['Enter', ' '].includes(a.key) && i.onOpenToggle(),
            a.key === 'ArrowDown' && i.onOpenChange(!0),
            ['Enter', ' ', 'ArrowDown'].includes(a.key) && a.preventDefault())
        }),
      }),
    })
  })
ku.displayName = Mb
var rL = 'DropdownMenuPortal',
  Du = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = et(t)
    return g.jsx(bv, { ...r, ...n })
  }
Du.displayName = rL
var kb = 'DropdownMenuContent',
  Iu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = _b(kb, n),
      i = et(n),
      s = f.useRef(!1)
    return g.jsx(wv, {
      id: o.contentId,
      'aria-labelledby': o.triggerId,
      ...i,
      ...r,
      ref: t,
      onCloseAutoFocus: U(e.onCloseAutoFocus, (a) => {
        ;(s.current || o.triggerRef.current?.focus(), (s.current = !1), a.preventDefault())
      }),
      onInteractOutside: U(e.onInteractOutside, (a) => {
        const l = a.detail.originalEvent,
          c = l.button === 0 && l.ctrlKey === !0,
          u = l.button === 2 || c
        ;(!o.modal || u) && (s.current = !0)
      }),
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    })
  })
Iu.displayName = kb
var oL = 'DropdownMenuGroup',
  Ou = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(xv, { ...o, ...r, ref: t })
  })
Ou.displayName = oL
var iL = 'DropdownMenuLabel',
  Nu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(Sv, { ...o, ...r, ref: t })
  })
Nu.displayName = iL
var sL = 'DropdownMenuItem',
  Lu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(Cv, { ...o, ...r, ref: t })
  })
Lu.displayName = sL
var aL = 'DropdownMenuCheckboxItem',
  ju = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(Ev, { ...o, ...r, ref: t })
  })
ju.displayName = aL
var lL = 'DropdownMenuRadioGroup',
  $u = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(Pv, { ...o, ...r, ref: t })
  })
$u.displayName = lL
var cL = 'DropdownMenuRadioItem',
  Fu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(Rv, { ...o, ...r, ref: t })
  })
Fu.displayName = cL
var uL = 'DropdownMenuItemIndicator',
  zu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(Tv, { ...o, ...r, ref: t })
  })
zu.displayName = uL
var dL = 'DropdownMenuSeparator',
  Vu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(Av, { ...o, ...r, ref: t })
  })
Vu.displayName = dL
var fL = 'DropdownMenuArrow',
  Bu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(_v, { ...o, ...r, ref: t })
  })
Bu.displayName = fL
var Db = (e) => {
    const { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: o, defaultOpen: i } = e,
      s = et(t),
      [a, l] = nr({ prop: r, defaultProp: i ?? !1, onChange: o, caller: 'DropdownMenuSub' })
    return g.jsx(Mv, { ...s, open: a, onOpenChange: l, children: n })
  },
  hL = 'DropdownMenuSubTrigger',
  Uu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(kv, { ...o, ...r, ref: t })
  })
Uu.displayName = hL
var pL = 'DropdownMenuSubContent',
  Wu = f.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = et(n)
    return g.jsx(Dv, {
      ...o,
      ...r,
      ref: t,
      style: {
        ...e.style,
        '--radix-dropdown-menu-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-dropdown-menu-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-dropdown-menu-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-dropdown-menu-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-dropdown-menu-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    })
  })
Wu.displayName = pL
var Ib = Mu,
  Ob = ku,
  Nb = Du,
  Hu = Iu,
  mL = Ou,
  Lb = Nu,
  jb = Lu,
  $b = ju,
  gL = $u,
  yL = Fu,
  vL = zu,
  Fb = Vu,
  bL = Bu,
  wL = Db,
  zb = Uu,
  xL = Wu
const qF = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Arrow: bL,
        CheckboxItem: $b,
        Content: Hu,
        DropdownMenu: Mu,
        DropdownMenuArrow: Bu,
        DropdownMenuCheckboxItem: ju,
        DropdownMenuContent: Iu,
        DropdownMenuGroup: Ou,
        DropdownMenuItem: Lu,
        DropdownMenuItemIndicator: zu,
        DropdownMenuLabel: Nu,
        DropdownMenuPortal: Du,
        DropdownMenuRadioGroup: $u,
        DropdownMenuRadioItem: Fu,
        DropdownMenuSeparator: Vu,
        DropdownMenuSub: Db,
        DropdownMenuSubContent: Wu,
        DropdownMenuSubTrigger: Uu,
        DropdownMenuTrigger: ku,
        Group: mL,
        Item: jb,
        ItemIndicator: vL,
        Label: Lb,
        Portal: Nb,
        RadioGroup: gL,
        RadioItem: yL,
        Root: Ib,
        Separator: Fb,
        Sub: wL,
        SubContent: xL,
        SubTrigger: zb,
        Trigger: Ob,
        createDropdownMenuScope: tL,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  JF = (e) => {
    const t = de.c(2)
    let n
    return (t[0] !== e ? ((n = g.jsx(Ib, { ...e })), (t[0] = e), (t[1] = n)) : (n = t[1]), n)
  },
  QF = Ob
zb.displayName
const SL = (e) => {
  const t = de.c(13)
  let n, r, o, i
  t[0] !== e
    ? (({ ref: o, className: n, sideOffset: i, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o), (t[4] = i))
    : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]))
  const s = i === void 0 ? 4 : i
  let a
  t[5] !== n
    ? ((a = Re(
        'backdrop-blur-2xl text-text z-60 min-w-32 overflow-hidden rounded-xl p-1 relative border border-accent/20',
        n,
      )),
      (t[5] = n),
      (t[6] = a))
    : (a = t[6])
  let l
  t[7] === Symbol.for('react.memo_cache_sentinel')
    ? ((l = {
        backgroundImage:
          'linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 98%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))',
        boxShadow:
          '0 8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 2px 8px rgba(0, 0, 0, 0.1)',
      }),
      (t[7] = l))
    : (l = t[7])
  let c
  return (
    t[8] !== r || t[9] !== o || t[10] !== s || t[11] !== a
      ? ((c = g.jsx(Nb, { children: g.jsx(Hu, { ref: o, sideOffset: s, className: a, style: l, ...r }) })),
        (t[8] = r),
        (t[9] = o),
        (t[10] = s),
        (t[11] = a),
        (t[12] = c))
      : (c = t[12]),
    c
  )
}
SL.displayName = Hu.displayName
jb.displayName
$b.displayName
Lb.displayName
Fb.displayName
var Va,
  Hs = 'HoverCard',
  [Vb] = jt(Hs, [_n]),
  Gs = _n(),
  [CL, Zs] = Vb(Hs),
  Bb = (e) => {
    const {
        __scopeHoverCard: t,
        children: n,
        open: r,
        defaultOpen: o,
        onOpenChange: i,
        openDelay: s = 700,
        closeDelay: a = 300,
      } = e,
      l = Gs(t),
      c = f.useRef(0),
      u = f.useRef(0),
      d = f.useRef(!1),
      h = f.useRef(!1),
      [p, m] = nr({ prop: r, defaultProp: o ?? !1, onChange: i, caller: Hs }),
      y = f.useCallback(() => {
        ;(clearTimeout(u.current), (c.current = window.setTimeout(() => m(!0), s)))
      }, [s, m]),
      v = f.useCallback(() => {
        ;(clearTimeout(c.current), !d.current && !h.current && (u.current = window.setTimeout(() => m(!1), a)))
      }, [a, m]),
      w = f.useCallback(() => m(!1), [m])
    return (
      f.useEffect(
        () => () => {
          ;(clearTimeout(c.current), clearTimeout(u.current))
        },
        [],
      ),
      g.jsx(CL, {
        scope: t,
        open: p,
        onOpenChange: m,
        onOpen: y,
        onClose: v,
        onDismiss: w,
        hasSelectionRef: d,
        isPointerDownOnContentRef: h,
        children: g.jsx(Os, { ...l, children: n }),
      })
    )
  }
Bb.displayName = Hs
var Ub = 'HoverCardTrigger',
  Wb = f.forwardRef((e, t) => {
    const { __scopeHoverCard: n, ...r } = e,
      o = Zs(Ub, n),
      i = Gs(n)
    return g.jsx(Ns, {
      asChild: !0,
      ...i,
      children: g.jsx(me.a, {
        'data-state': o.open ? 'open' : 'closed',
        ...r,
        ref: t,
        onPointerEnter: U(e.onPointerEnter, ds(o.onOpen)),
        onPointerLeave: U(e.onPointerLeave, ds(o.onClose)),
        onFocus: U(e.onFocus, o.onOpen),
        onBlur: U(e.onBlur, o.onClose),
        onTouchStart: U(e.onTouchStart, (s) => s.preventDefault()),
      }),
    })
  })
Wb.displayName = Ub
var Gu = 'HoverCardPortal',
  [EL, PL] = Vb(Gu, { forceMount: void 0 }),
  Hb = (e) => {
    const { __scopeHoverCard: t, forceMount: n, children: r, container: o } = e,
      i = Zs(Gu, t)
    return g.jsx(EL, {
      scope: t,
      forceMount: n,
      children: g.jsx(it, { present: n || i.open, children: g.jsx($s, { asChild: !0, container: o, children: r }) }),
    })
  }
Hb.displayName = Gu
var us = 'HoverCardContent',
  Gb = f.forwardRef((e, t) => {
    const n = PL(us, e.__scopeHoverCard),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Zs(us, e.__scopeHoverCard)
    return g.jsx(it, {
      present: r || i.open,
      children: g.jsx(RL, {
        'data-state': i.open ? 'open' : 'closed',
        ...o,
        onPointerEnter: U(e.onPointerEnter, ds(i.onOpen)),
        onPointerLeave: U(e.onPointerLeave, ds(i.onClose)),
        ref: t,
      }),
    })
  })
Gb.displayName = us
var RL = f.forwardRef((e, t) => {
    const {
        __scopeHoverCard: n,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: i,
        onInteractOutside: s,
        ...a
      } = e,
      l = Zs(us, n),
      c = Gs(n),
      u = f.useRef(null),
      d = we(t, u),
      [h, p] = f.useState(!1)
    return (
      f.useEffect(() => {
        if (h) {
          const m = document.body
          return (
            (Va = m.style.userSelect || m.style.webkitUserSelect),
            (m.style.userSelect = 'none'),
            (m.style.webkitUserSelect = 'none'),
            () => {
              ;((m.style.userSelect = Va), (m.style.webkitUserSelect = Va))
            }
          )
        }
      }, [h]),
      f.useEffect(() => {
        if (u.current) {
          const m = () => {
            ;(p(!1),
              (l.isPointerDownOnContentRef.current = !1),
              setTimeout(() => {
                document.getSelection()?.toString() !== '' && (l.hasSelectionRef.current = !0)
              }))
          }
          return (
            document.addEventListener('pointerup', m),
            () => {
              ;(document.removeEventListener('pointerup', m),
                (l.hasSelectionRef.current = !1),
                (l.isPointerDownOnContentRef.current = !1))
            }
          )
        }
      }, [l.isPointerDownOnContentRef, l.hasSelectionRef]),
      f.useEffect(() => {
        u.current && _L(u.current).forEach((y) => y.setAttribute('tabindex', '-1'))
      }),
      g.jsx(Ur, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onInteractOutside: s,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: U(i, (m) => {
          m.preventDefault()
        }),
        onDismiss: l.onDismiss,
        children: g.jsx(Ls, {
          ...c,
          ...a,
          onPointerDown: U(a.onPointerDown, (m) => {
            ;(m.currentTarget.contains(m.target) && p(!0),
              (l.hasSelectionRef.current = !1),
              (l.isPointerDownOnContentRef.current = !0))
          }),
          ref: d,
          style: {
            ...a.style,
            userSelect: h ? 'text' : void 0,
            WebkitUserSelect: h ? 'text' : void 0,
            '--radix-hover-card-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-hover-card-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-hover-card-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-hover-card-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-hover-card-trigger-height': 'var(--radix-popper-anchor-height)',
          },
        }),
      })
    )
  }),
  TL = 'HoverCardArrow',
  AL = f.forwardRef((e, t) => {
    const { __scopeHoverCard: n, ...r } = e,
      o = Gs(n)
    return g.jsx(js, { ...o, ...r, ref: t })
  })
AL.displayName = TL
function ds(e) {
  return (t) => (t.pointerType === 'touch' ? void 0 : e())
}
function _L(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => (r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP),
    })
  for (; n.nextNode(); ) t.push(n.currentNode)
  return t
}
var ML = Bb,
  kL = Wb,
  DL = Hb,
  Zb = Gb
const ez = ML,
  tz = kL,
  IL = (e) => {
    const t = de.c(22)
    let n, r, o, i, s
    t[0] !== e
      ? (({ ref: o, className: n, align: i, sideOffset: s, ...r } = e),
        (t[0] = e),
        (t[1] = n),
        (t[2] = r),
        (t[3] = o),
        (t[4] = i),
        (t[5] = s))
      : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]), (s = t[5]))
    const a = i === void 0 ? 'center' : i,
      l = s === void 0 ? 4 : s
    let c
    t[6] !== n
      ? ((c = Re(
          'z-50 w-64 rounded-2xl p-4 outline-none backdrop-blur-2xl relative overflow-hidden',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          n,
        )),
        (t[6] = n),
        (t[7] = c))
      : (c = t[7])
    let u, d, h, p
    t[8] === Symbol.for('react.memo_cache_sentinel')
      ? ((u = {
          backgroundImage:
            'linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 98%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))',
          boxShadow:
            '0 8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 2px 8px rgba(0, 0, 0, 0.1)',
        }),
        (d = { opacity: 0, scale: 0.95, y: 4 }),
        (h = { opacity: 1, scale: 1, y: 0 }),
        (p = { opacity: 0, scale: 0.95, y: 4 }),
        (t[8] = u),
        (t[9] = d),
        (t[10] = h),
        (t[11] = p))
      : ((u = t[8]), (d = t[9]), (h = t[10]), (p = t[11]))
    let m
    t[12] === Symbol.for('react.memo_cache_sentinel')
      ? ((m = g.jsx('div', {
          className: 'pointer-events-none absolute inset-0 rounded-2xl',
          style: {
            background:
              'linear-gradient(to bottom right, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent, color-mix(in srgb, var(--color-accent) 5%, transparent))',
          },
        })),
        (t[12] = m))
      : (m = t[12])
    let y
    t[13] !== r.children
      ? ((y = g.jsxs(Br.div, {
          className: 'border-accent/20 border',
          style: u,
          initial: d,
          animate: h,
          exit: p,
          transition: Fo.presets.smooth,
          children: [m, g.jsx('div', { className: 'relative', children: r.children })],
        })),
        (t[13] = r.children),
        (t[14] = y))
      : (y = t[14])
    let v
    return (
      t[15] !== a || t[16] !== r || t[17] !== o || t[18] !== l || t[19] !== c || t[20] !== y
        ? ((v = g.jsx(DL, {
            children: g.jsx(Zb, { ref: o, align: a, sideOffset: l, className: c, asChild: !0, ...r, children: y }),
          })),
          (t[15] = a),
          (t[16] = r),
          (t[17] = o),
          (t[18] = l),
          (t[19] = c),
          (t[20] = y),
          (t[21] = v))
        : (v = t[21]),
      v
    )
  }
IL.displayName = Zb.displayName
f.createContext(void 0)
vs()
Et([])
const OL = f.createContext(document.documentElement)
function Ll(e, [t, n]) {
  return Math.min(n, Math.max(t, e))
}
function NL(e, t) {
  return f.useReducer((n, r) => t[n][r] ?? n, e)
}
var Zu = 'ScrollArea',
  [Kb] = jt(Zu),
  [LL, Rt] = Kb(Zu),
  Yb = f.forwardRef((e, t) => {
    const { __scopeScrollArea: n, type: r = 'hover', dir: o, scrollHideDelay: i = 600, ...s } = e,
      [a, l] = f.useState(null),
      [c, u] = f.useState(null),
      [d, h] = f.useState(null),
      [p, m] = f.useState(null),
      [y, v] = f.useState(null),
      [w, b] = f.useState(0),
      [x, E] = f.useState(0),
      [C, A] = f.useState(!1),
      [S, R] = f.useState(!1),
      I = we(t, (G) => l(G)),
      N = su(o)
    return g.jsx(LL, {
      scope: n,
      type: r,
      dir: N,
      scrollHideDelay: i,
      scrollArea: a,
      viewport: c,
      onViewportChange: u,
      content: d,
      onContentChange: h,
      scrollbarX: p,
      onScrollbarXChange: m,
      scrollbarXEnabled: C,
      onScrollbarXEnabledChange: A,
      scrollbarY: y,
      onScrollbarYChange: v,
      scrollbarYEnabled: S,
      onScrollbarYEnabledChange: R,
      onCornerWidthChange: b,
      onCornerHeightChange: E,
      children: g.jsx(me.div, {
        dir: N,
        ...s,
        ref: I,
        style: {
          position: 'relative',
          '--radix-scroll-area-corner-width': w + 'px',
          '--radix-scroll-area-corner-height': x + 'px',
          ...e.style,
        },
      }),
    })
  })
Yb.displayName = Zu
var Xb = 'ScrollAreaViewport',
  qb = f.forwardRef((e, t) => {
    const { __scopeScrollArea: n, children: r, nonce: o, ...i } = e,
      s = Rt(Xb, n),
      a = f.useRef(null),
      l = we(t, a, s.onViewportChange)
    return g.jsxs(g.Fragment, {
      children: [
        g.jsx('style', {
          dangerouslySetInnerHTML: {
            __html:
              '[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}',
          },
          nonce: o,
        }),
        g.jsx(me.div, {
          'data-radix-scroll-area-viewport': '',
          ...i,
          ref: l,
          style: {
            overflowX: s.scrollbarXEnabled ? 'scroll' : 'hidden',
            overflowY: s.scrollbarYEnabled ? 'scroll' : 'hidden',
            ...e.style,
          },
          children: g.jsx('div', {
            ref: s.onContentChange,
            style: { minWidth: '100%', display: 'table' },
            children: r,
          }),
        }),
      ],
    })
  })
qb.displayName = Xb
var en = 'ScrollAreaScrollbar',
  Jb = f.forwardRef((e, t) => {
    const { forceMount: n, ...r } = e,
      o = Rt(en, e.__scopeScrollArea),
      { onScrollbarXEnabledChange: i, onScrollbarYEnabledChange: s } = o,
      a = e.orientation === 'horizontal'
    return (
      f.useEffect(
        () => (
          a ? i(!0) : s(!0),
          () => {
            a ? i(!1) : s(!1)
          }
        ),
        [a, i, s],
      ),
      o.type === 'hover'
        ? g.jsx(jL, { ...r, ref: t, forceMount: n })
        : o.type === 'scroll'
          ? g.jsx($L, { ...r, ref: t, forceMount: n })
          : o.type === 'auto'
            ? g.jsx(Qb, { ...r, ref: t, forceMount: n })
            : o.type === 'always'
              ? g.jsx(Ku, { ...r, ref: t })
              : null
    )
  })
Jb.displayName = en
var jL = f.forwardRef((e, t) => {
    const { forceMount: n, ...r } = e,
      o = Rt(en, e.__scopeScrollArea),
      [i, s] = f.useState(!1)
    return (
      f.useEffect(() => {
        const a = o.scrollArea
        let l = 0
        if (a) {
          const c = () => {
              ;(window.clearTimeout(l), s(!0))
            },
            u = () => {
              l = window.setTimeout(() => s(!1), o.scrollHideDelay)
            }
          return (
            a.addEventListener('pointerenter', c),
            a.addEventListener('pointerleave', u),
            () => {
              ;(window.clearTimeout(l),
                a.removeEventListener('pointerenter', c),
                a.removeEventListener('pointerleave', u))
            }
          )
        }
      }, [o.scrollArea, o.scrollHideDelay]),
      g.jsx(it, { present: n || i, children: g.jsx(Qb, { 'data-state': i ? 'visible' : 'hidden', ...r, ref: t }) })
    )
  }),
  $L = f.forwardRef((e, t) => {
    const { forceMount: n, ...r } = e,
      o = Rt(en, e.__scopeScrollArea),
      i = e.orientation === 'horizontal',
      s = Ys(() => l('SCROLL_END'), 100),
      [a, l] = NL('hidden', {
        hidden: { SCROLL: 'scrolling' },
        scrolling: { SCROLL_END: 'idle', POINTER_ENTER: 'interacting' },
        interacting: { SCROLL: 'interacting', POINTER_LEAVE: 'idle' },
        idle: { HIDE: 'hidden', SCROLL: 'scrolling', POINTER_ENTER: 'interacting' },
      })
    return (
      f.useEffect(() => {
        if (a === 'idle') {
          const c = window.setTimeout(() => l('HIDE'), o.scrollHideDelay)
          return () => window.clearTimeout(c)
        }
      }, [a, o.scrollHideDelay, l]),
      f.useEffect(() => {
        const c = o.viewport,
          u = i ? 'scrollLeft' : 'scrollTop'
        if (c) {
          let d = c[u]
          const h = () => {
            const p = c[u]
            ;(d !== p && (l('SCROLL'), s()), (d = p))
          }
          return (c.addEventListener('scroll', h), () => c.removeEventListener('scroll', h))
        }
      }, [o.viewport, i, l, s]),
      g.jsx(it, {
        present: n || a !== 'hidden',
        children: g.jsx(Ku, {
          'data-state': a === 'hidden' ? 'hidden' : 'visible',
          ...r,
          ref: t,
          onPointerEnter: U(e.onPointerEnter, () => l('POINTER_ENTER')),
          onPointerLeave: U(e.onPointerLeave, () => l('POINTER_LEAVE')),
        }),
      })
    )
  }),
  Qb = f.forwardRef((e, t) => {
    const n = Rt(en, e.__scopeScrollArea),
      { forceMount: r, ...o } = e,
      [i, s] = f.useState(!1),
      a = e.orientation === 'horizontal',
      l = Ys(() => {
        if (n.viewport) {
          const c = n.viewport.offsetWidth < n.viewport.scrollWidth,
            u = n.viewport.offsetHeight < n.viewport.scrollHeight
          s(a ? c : u)
        }
      }, 10)
    return (
      Nr(n.viewport, l),
      Nr(n.content, l),
      g.jsx(it, { present: r || i, children: g.jsx(Ku, { 'data-state': i ? 'visible' : 'hidden', ...o, ref: t }) })
    )
  }),
  Ku = f.forwardRef((e, t) => {
    const { orientation: n = 'vertical', ...r } = e,
      o = Rt(en, e.__scopeScrollArea),
      i = f.useRef(null),
      s = f.useRef(0),
      [a, l] = f.useState({ content: 0, viewport: 0, scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 } }),
      c = ow(a.viewport, a.content),
      u = {
        ...r,
        sizes: a,
        onSizesChange: l,
        hasThumb: c > 0 && c < 1,
        onThumbChange: (h) => (i.current = h),
        onThumbPointerUp: () => (s.current = 0),
        onThumbPointerDown: (h) => (s.current = h),
      }
    function d(h, p) {
      return WL(h, s.current, a, p)
    }
    return n === 'horizontal'
      ? g.jsx(FL, {
          ...u,
          ref: t,
          onThumbPositionChange: () => {
            if (o.viewport && i.current) {
              const h = o.viewport.scrollLeft,
                p = Gh(h, a, o.dir)
              i.current.style.transform = `translate3d(${p}px, 0, 0)`
            }
          },
          onWheelScroll: (h) => {
            o.viewport && (o.viewport.scrollLeft = h)
          },
          onDragScroll: (h) => {
            o.viewport && (o.viewport.scrollLeft = d(h, o.dir))
          },
        })
      : n === 'vertical'
        ? g.jsx(zL, {
            ...u,
            ref: t,
            onThumbPositionChange: () => {
              if (o.viewport && i.current) {
                const h = o.viewport.scrollTop,
                  p = Gh(h, a)
                i.current.style.transform = `translate3d(0, ${p}px, 0)`
              }
            },
            onWheelScroll: (h) => {
              o.viewport && (o.viewport.scrollTop = h)
            },
            onDragScroll: (h) => {
              o.viewport && (o.viewport.scrollTop = d(h))
            },
          })
        : null
  }),
  FL = f.forwardRef((e, t) => {
    const { sizes: n, onSizesChange: r, ...o } = e,
      i = Rt(en, e.__scopeScrollArea),
      [s, a] = f.useState(),
      l = f.useRef(null),
      c = we(t, l, i.onScrollbarXChange)
    return (
      f.useEffect(() => {
        l.current && a(getComputedStyle(l.current))
      }, [l]),
      g.jsx(tw, {
        'data-orientation': 'horizontal',
        ...o,
        ref: c,
        sizes: n,
        style: {
          bottom: 0,
          left: i.dir === 'rtl' ? 'var(--radix-scroll-area-corner-width)' : 0,
          right: i.dir === 'ltr' ? 'var(--radix-scroll-area-corner-width)' : 0,
          '--radix-scroll-area-thumb-width': Ks(n) + 'px',
          ...e.style,
        },
        onThumbPointerDown: (u) => e.onThumbPointerDown(u.x),
        onDragScroll: (u) => e.onDragScroll(u.x),
        onWheelScroll: (u, d) => {
          if (i.viewport) {
            const h = i.viewport.scrollLeft + u.deltaX
            ;(e.onWheelScroll(h), sw(h, d) && u.preventDefault())
          }
        },
        onResize: () => {
          l.current &&
            i.viewport &&
            s &&
            r({
              content: i.viewport.scrollWidth,
              viewport: i.viewport.offsetWidth,
              scrollbar: {
                size: l.current.clientWidth,
                paddingStart: hs(s.paddingLeft),
                paddingEnd: hs(s.paddingRight),
              },
            })
        },
      })
    )
  }),
  zL = f.forwardRef((e, t) => {
    const { sizes: n, onSizesChange: r, ...o } = e,
      i = Rt(en, e.__scopeScrollArea),
      [s, a] = f.useState(),
      l = f.useRef(null),
      c = we(t, l, i.onScrollbarYChange)
    return (
      f.useEffect(() => {
        l.current && a(getComputedStyle(l.current))
      }, [l]),
      g.jsx(tw, {
        'data-orientation': 'vertical',
        ...o,
        ref: c,
        sizes: n,
        style: {
          top: 0,
          right: i.dir === 'ltr' ? 0 : void 0,
          left: i.dir === 'rtl' ? 0 : void 0,
          bottom: 'var(--radix-scroll-area-corner-height)',
          '--radix-scroll-area-thumb-height': Ks(n) + 'px',
          ...e.style,
        },
        onThumbPointerDown: (u) => e.onThumbPointerDown(u.y),
        onDragScroll: (u) => e.onDragScroll(u.y),
        onWheelScroll: (u, d) => {
          if (i.viewport) {
            const h = i.viewport.scrollTop + u.deltaY
            ;(e.onWheelScroll(h), sw(h, d) && u.preventDefault())
          }
        },
        onResize: () => {
          l.current &&
            i.viewport &&
            s &&
            r({
              content: i.viewport.scrollHeight,
              viewport: i.viewport.offsetHeight,
              scrollbar: {
                size: l.current.clientHeight,
                paddingStart: hs(s.paddingTop),
                paddingEnd: hs(s.paddingBottom),
              },
            })
        },
      })
    )
  }),
  [VL, ew] = Kb(en),
  tw = f.forwardRef((e, t) => {
    const {
        __scopeScrollArea: n,
        sizes: r,
        hasThumb: o,
        onThumbChange: i,
        onThumbPointerUp: s,
        onThumbPointerDown: a,
        onThumbPositionChange: l,
        onDragScroll: c,
        onWheelScroll: u,
        onResize: d,
        ...h
      } = e,
      p = Rt(en, n),
      [m, y] = f.useState(null),
      v = we(t, (I) => y(I)),
      w = f.useRef(null),
      b = f.useRef(''),
      x = p.viewport,
      E = r.content - r.viewport,
      C = Be(u),
      A = Be(l),
      S = Ys(d, 10)
    function R(I) {
      if (w.current) {
        const N = I.clientX - w.current.left,
          G = I.clientY - w.current.top
        c({ x: N, y: G })
      }
    }
    return (
      f.useEffect(() => {
        const I = (N) => {
          const G = N.target
          m?.contains(G) && C(N, E)
        }
        return (
          document.addEventListener('wheel', I, { passive: !1 }),
          () => document.removeEventListener('wheel', I, { passive: !1 })
        )
      }, [x, m, E, C]),
      f.useEffect(A, [r, A]),
      Nr(m, S),
      Nr(p.content, S),
      g.jsx(VL, {
        scope: n,
        scrollbar: m,
        hasThumb: o,
        onThumbChange: Be(i),
        onThumbPointerUp: Be(s),
        onThumbPositionChange: A,
        onThumbPointerDown: Be(a),
        children: g.jsx(me.div, {
          ...h,
          ref: v,
          style: { position: 'absolute', ...h.style },
          onPointerDown: U(e.onPointerDown, (I) => {
            I.button === 0 &&
              (I.target.setPointerCapture(I.pointerId),
              (w.current = m.getBoundingClientRect()),
              (b.current = document.body.style.webkitUserSelect),
              (document.body.style.webkitUserSelect = 'none'),
              p.viewport && (p.viewport.style.scrollBehavior = 'auto'),
              R(I))
          }),
          onPointerMove: U(e.onPointerMove, R),
          onPointerUp: U(e.onPointerUp, (I) => {
            const N = I.target
            ;(N.hasPointerCapture(I.pointerId) && N.releasePointerCapture(I.pointerId),
              (document.body.style.webkitUserSelect = b.current),
              p.viewport && (p.viewport.style.scrollBehavior = ''),
              (w.current = null))
          }),
        }),
      })
    )
  }),
  fs = 'ScrollAreaThumb',
  nw = f.forwardRef((e, t) => {
    const { forceMount: n, ...r } = e,
      o = ew(fs, e.__scopeScrollArea)
    return g.jsx(it, { present: n || o.hasThumb, children: g.jsx(BL, { ref: t, ...r }) })
  }),
  BL = f.forwardRef((e, t) => {
    const { __scopeScrollArea: n, style: r, ...o } = e,
      i = Rt(fs, n),
      s = ew(fs, n),
      { onThumbPositionChange: a } = s,
      l = we(t, (d) => s.onThumbChange(d)),
      c = f.useRef(void 0),
      u = Ys(() => {
        c.current && (c.current(), (c.current = void 0))
      }, 100)
    return (
      f.useEffect(() => {
        const d = i.viewport
        if (d) {
          const h = () => {
            if ((u(), !c.current)) {
              const p = HL(d, a)
              ;((c.current = p), a())
            }
          }
          return (a(), d.addEventListener('scroll', h), () => d.removeEventListener('scroll', h))
        }
      }, [i.viewport, u, a]),
      g.jsx(me.div, {
        'data-state': s.hasThumb ? 'visible' : 'hidden',
        ...o,
        ref: l,
        style: { width: 'var(--radix-scroll-area-thumb-width)', height: 'var(--radix-scroll-area-thumb-height)', ...r },
        onPointerDownCapture: U(e.onPointerDownCapture, (d) => {
          const p = d.target.getBoundingClientRect(),
            m = d.clientX - p.left,
            y = d.clientY - p.top
          s.onThumbPointerDown({ x: m, y })
        }),
        onPointerUp: U(e.onPointerUp, s.onThumbPointerUp),
      })
    )
  })
nw.displayName = fs
var Yu = 'ScrollAreaCorner',
  rw = f.forwardRef((e, t) => {
    const n = Rt(Yu, e.__scopeScrollArea),
      r = !!(n.scrollbarX && n.scrollbarY)
    return n.type !== 'scroll' && r ? g.jsx(UL, { ...e, ref: t }) : null
  })
rw.displayName = Yu
var UL = f.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...r } = e,
    o = Rt(Yu, n),
    [i, s] = f.useState(0),
    [a, l] = f.useState(0),
    c = !!(i && a)
  return (
    Nr(o.scrollbarX, () => {
      const u = o.scrollbarX?.offsetHeight || 0
      ;(o.onCornerHeightChange(u), l(u))
    }),
    Nr(o.scrollbarY, () => {
      const u = o.scrollbarY?.offsetWidth || 0
      ;(o.onCornerWidthChange(u), s(u))
    }),
    c
      ? g.jsx(me.div, {
          ...r,
          ref: t,
          style: {
            width: i,
            height: a,
            position: 'absolute',
            right: o.dir === 'ltr' ? 0 : void 0,
            left: o.dir === 'rtl' ? 0 : void 0,
            bottom: 0,
            ...e.style,
          },
        })
      : null
  )
})
function hs(e) {
  return e ? parseInt(e, 10) : 0
}
function ow(e, t) {
  const n = e / t
  return isNaN(n) ? 0 : n
}
function Ks(e) {
  const t = ow(e.viewport, e.content),
    n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd,
    r = (e.scrollbar.size - n) * t
  return Math.max(r, 18)
}
function WL(e, t, n, r = 'ltr') {
  const o = Ks(n),
    i = o / 2,
    s = t || i,
    a = o - s,
    l = n.scrollbar.paddingStart + s,
    c = n.scrollbar.size - n.scrollbar.paddingEnd - a,
    u = n.content - n.viewport,
    d = r === 'ltr' ? [0, u] : [u * -1, 0]
  return iw([l, c], d)(e)
}
function Gh(e, t, n = 'ltr') {
  const r = Ks(t),
    o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd,
    i = t.scrollbar.size - o,
    s = t.content - t.viewport,
    a = i - r,
    l = n === 'ltr' ? [0, s] : [s * -1, 0],
    c = Ll(e, l)
  return iw([0, s], [0, a])(c)
}
function iw(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0]
    const r = (t[1] - t[0]) / (e[1] - e[0])
    return t[0] + r * (n - e[0])
  }
}
function sw(e, t) {
  return e > 0 && e < t
}
var HL = (e, t = () => {}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop },
    r = 0
  return (
    (function o() {
      const i = { left: e.scrollLeft, top: e.scrollTop },
        s = n.left !== i.left,
        a = n.top !== i.top
      ;((s || a) && t(), (n = i), (r = window.requestAnimationFrame(o)))
    })(),
    () => window.cancelAnimationFrame(r)
  )
}
function Ys(e, t) {
  const n = Be(e),
    r = f.useRef(0)
  return (
    f.useEffect(() => () => window.clearTimeout(r.current), []),
    f.useCallback(() => {
      ;(window.clearTimeout(r.current), (r.current = window.setTimeout(n, t)))
    }, [n, t])
  )
}
function Nr(e, t) {
  const n = Be(t)
  Ye(() => {
    let r = 0
    if (e) {
      const o = new ResizeObserver(() => {
        ;(cancelAnimationFrame(r), (r = window.requestAnimationFrame(n)))
      })
      return (
        o.observe(e),
        () => {
          ;(window.cancelAnimationFrame(r), o.unobserve(e))
        }
      )
    }
  }, [e, n])
}
var GL = Yb,
  ZL = qb,
  KL = Jb,
  YL = nw,
  XL = rw
const aw = (e) => {
  const t = de.c(10)
  let n, r, o
  t[0] !== e
    ? (({ ref: r, className: n, ...o } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o))
    : ((n = t[1]), (r = t[2]), (o = t[3]))
  let i
  t[4] !== n ? ((i = oc('bg-accent', n)), (t[4] = n), (t[5] = i)) : (i = t[5])
  let s
  return (
    t[6] !== r || t[7] !== o || t[8] !== i
      ? ((s = g.jsx(XL, { ...o, ref: r, className: i })), (t[6] = r), (t[7] = o), (t[8] = i), (t[9] = s))
      : (s = t[9]),
    s
  )
}
aw.displayName = 'ScrollArea.Corner'
const lw = (e) => {
  const t = de.c(13)
  let n, r, o
  t[0] !== e
    ? (({ ref: r, className: n, ...o } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o))
    : ((n = t[1]), (r = t[2]), (o = t[3]))
  let i
  t[4] !== o
    ? ((i = (l) => {
        ;(l.stopPropagation(), o.onClick?.(l))
      }),
      (t[4] = o),
      (t[5] = i))
    : (i = t[5])
  let s
  t[6] !== n
    ? ((s = Re(
        'relative w-full flex-1 backdrop-blur-3xl rounded-xl transition-colors duration-150',
        'bg-zinc-500/50 hover:bg-zinc-500/70',
        'active:bg-zinc-500/70',
        'before:absolute before:-left-1/2 before:-top-1/2 before:h-full before:min-h-[44]',
        'before:w-full before:min-w-[44] before:-translate-x-full before:-translate-y-full before:content-[""]',
        n,
      )),
      (t[6] = n),
      (t[7] = s))
    : (s = t[7])
  let a
  return (
    t[8] !== r || t[9] !== o || t[10] !== i || t[11] !== s
      ? ((a = g.jsx(YL, { ...o, onClick: i, ref: r, className: s })),
        (t[8] = r),
        (t[9] = o),
        (t[10] = i),
        (t[11] = s),
        (t[12] = a))
      : (a = t[12]),
    a
  )
}
lw.displayName = 'ScrollArea.Thumb'
const cw = (e) => {
  const t = de.c(14)
  let n, r, o, i
  t[0] !== e
    ? (({ ref: o, className: r, children: n, ...i } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o), (t[4] = i))
    : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]))
  const { orientation: s } = i,
    l = (s === void 0 ? 'vertical' : s) === 'horizontal' ? 'h-2.5 w-full flex-col' : 'w-2.5 flex-row'
  let c
  t[5] !== r || t[6] !== l
    ? ((c = Re(
        'flex w-2.5 touch-none select-none p-0.5',
        l,
        'animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
        r,
      )),
      (t[5] = r),
      (t[6] = l),
      (t[7] = c))
    : (c = t[7])
  let u
  t[8] === Symbol.for('react.memo_cache_sentinel') ? ((u = g.jsx(lw, {})), (t[8] = u)) : (u = t[8])
  let d
  return (
    t[9] !== n || t[10] !== o || t[11] !== i || t[12] !== c
      ? ((d = g.jsxs(KL, { ...i, ref: o, className: c, children: [n, u] })),
        (t[9] = n),
        (t[10] = o),
        (t[11] = i),
        (t[12] = c),
        (t[13] = d))
      : (d = t[13]),
    d
  )
}
cw.displayName = 'ScrollArea.Scrollbar'
const uw = (e) => {
  const t = de.c(12)
  let n, r, o, i
  t[0] !== e
    ? (({ ref: r, className: n, focusable: i, ...o } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o), (t[4] = i))
    : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]))
  const s = i === void 0 ? !0 : i,
    a = f.useRef(null)
  let l
  ;(t[5] === Symbol.for('react.memo_cache_sentinel') ? ((l = () => a.current), (t[5] = l)) : (l = t[5]),
    f.useImperativeHandle(r, l))
  const c = s ? -1 : void 0
  let u
  t[6] !== n ? ((u = Re('block size-full', n)), (t[6] = n), (t[7] = u)) : (u = t[7])
  let d
  return (
    t[8] !== o || t[9] !== c || t[10] !== u
      ? ((d = g.jsx(ZL, { ...o, ref: a, tabIndex: c, className: u })), (t[8] = o), (t[9] = c), (t[10] = u), (t[11] = d))
      : (d = t[11]),
    d
  )
}
uw.displayName = 'ScrollArea.Viewport'
const dw = (e) => {
  const t = de.c(13)
  let n, r, o, i
  t[0] !== e
    ? (({ ref: o, className: r, children: n, ...i } = e), (t[0] = e), (t[1] = n), (t[2] = r), (t[3] = o), (t[4] = i))
    : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]))
  let s
  t[5] !== r ? ((s = Re('overflow-hidden', r)), (t[5] = r), (t[6] = s)) : (s = t[6])
  let a
  t[7] === Symbol.for('react.memo_cache_sentinel') ? ((a = g.jsx(aw, {})), (t[7] = a)) : (a = t[7])
  let l
  return (
    t[8] !== n || t[9] !== o || t[10] !== i || t[11] !== s
      ? ((l = g.jsxs(GL, { ...i, scrollHideDelay: 0, ref: o, className: s, children: [n, a] })),
        (t[8] = n),
        (t[9] = o),
        (t[10] = i),
        (t[11] = s),
        (t[12] = l))
      : (l = t[12]),
    l
  )
}
dw.displayName = 'ScrollArea.Root'
const nz = (e) => {
  const t = de.c(22),
    {
      ref: n,
      flex: r,
      children: o,
      rootClassName: i,
      viewportClassName: s,
      scrollbarClassName: a,
      mask: l,
      onScroll: c,
      orientation: u,
      asChild: d,
      focusable: h,
    } = e,
    p = l === void 0 ? !1 : l,
    m = u === void 0 ? 'vertical' : u,
    y = d === void 0 ? !1 : d,
    v = h === void 0 ? !0 : h,
    [w, b] = f.useState(null)
  let x
  ;(t[0] !== w ? ((x = () => w), (t[0] = w), (t[1] = x)) : (x = t[1]), f.useImperativeHandle(n, x))
  const E = r ? '[&>div]:!flex [&>div]:!flex-col' : ''
  let C
  t[2] !== E || t[3] !== s ? ((C = Re(E, s)), (t[2] = E), (t[3] = s), (t[4] = C)) : (C = t[4])
  let A
  t[5] !== y || t[6] !== o || t[7] !== v || t[8] !== p || t[9] !== c || t[10] !== C
    ? ((A = g.jsx(uw, {
        onWheel: qL,
        ref: b,
        className: C,
        mask: p,
        asChild: y,
        onScroll: c,
        focusable: v,
        children: o,
      })),
      (t[5] = y),
      (t[6] = o),
      (t[7] = v),
      (t[8] = p),
      (t[9] = c),
      (t[10] = C),
      (t[11] = A))
    : (A = t[11])
  let S
  t[12] !== m || t[13] !== a
    ? ((S = g.jsx(cw, { orientation: m, className: a })), (t[12] = m), (t[13] = a), (t[14] = S))
    : (S = t[14])
  let R
  t[15] !== i || t[16] !== A || t[17] !== S
    ? ((R = g.jsxs(dw, { className: i, children: [A, S] })), (t[15] = i), (t[16] = A), (t[17] = S), (t[18] = R))
    : (R = t[18])
  let I
  return (
    t[19] !== R || t[20] !== w
      ? ((I = g.jsx(OL, { value: w, children: R })), (t[19] = R), (t[20] = w), (t[21] = I))
      : (I = t[21]),
    I
  )
}
function qL(e) {
  return e.stopPropagation()
}
var fw = Object.freeze({
    position: 'absolute',
    border: 0,
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
  }),
  JL = 'VisuallyHidden',
  hw = f.forwardRef((e, t) => g.jsx(me.span, { ...e, ref: t, style: { ...fw, ...e.style } }))
hw.displayName = JL
var QL = hw,
  ej = [' ', 'Enter', 'ArrowUp', 'ArrowDown'],
  tj = [' ', 'Enter'],
  Xs = 'Select',
  [Xu, qs, nj] = iu(Xs),
  [Gr] = jt(Xs, [nj, _n]),
  qu = _n(),
  [rz, kn] = Gr(Xs),
  [oz, rj] = Gr(Xs),
  pw = 'SelectTrigger',
  mw = f.forwardRef((e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e,
      i = qu(n),
      s = kn(pw, n),
      a = s.disabled || r,
      l = we(t, s.onTriggerChange),
      c = qs(n),
      u = f.useRef('touch'),
      [d, h, p] = Dw((y) => {
        const v = c().filter((x) => !x.disabled),
          w = v.find((x) => x.value === s.value),
          b = Iw(v, y, w)
        b !== void 0 && s.onValueChange(b.value)
      }),
      m = (y) => {
        ;(a || (s.onOpenChange(!0), p()),
          y && (s.triggerPointerDownPosRef.current = { x: Math.round(y.pageX), y: Math.round(y.pageY) }))
      }
    return g.jsx(Ns, {
      asChild: !0,
      ...i,
      children: g.jsx(me.button, {
        type: 'button',
        role: 'combobox',
        'aria-controls': s.contentId,
        'aria-expanded': s.open,
        'aria-required': s.required,
        'aria-autocomplete': 'none',
        dir: s.dir,
        'data-state': s.open ? 'open' : 'closed',
        disabled: a,
        'data-disabled': a ? '' : void 0,
        'data-placeholder': kw(s.value) ? '' : void 0,
        ...o,
        ref: l,
        onClick: U(o.onClick, (y) => {
          ;(y.currentTarget.focus(), u.current !== 'mouse' && m(y))
        }),
        onPointerDown: U(o.onPointerDown, (y) => {
          u.current = y.pointerType
          const v = y.target
          ;(v.hasPointerCapture(y.pointerId) && v.releasePointerCapture(y.pointerId),
            y.button === 0 && y.ctrlKey === !1 && y.pointerType === 'mouse' && (m(y), y.preventDefault()))
        }),
        onKeyDown: U(o.onKeyDown, (y) => {
          const v = d.current !== ''
          ;(!(y.ctrlKey || y.altKey || y.metaKey) && y.key.length === 1 && h(y.key),
            !(v && y.key === ' ') && ej.includes(y.key) && (m(), y.preventDefault()))
        }),
      }),
    })
  })
mw.displayName = pw
var gw = 'SelectValue',
  oj = f.forwardRef((e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: i, placeholder: s = '', ...a } = e,
      l = kn(gw, n),
      { onValueNodeHasChildrenChange: c } = l,
      u = i !== void 0,
      d = we(t, l.onValueNodeChange)
    return (
      Ye(() => {
        c(u)
      }, [c, u]),
      g.jsx(me.span, {
        ...a,
        ref: d,
        style: { pointerEvents: 'none' },
        children: kw(l.value) ? g.jsx(g.Fragment, { children: s }) : i,
      })
    )
  })
oj.displayName = gw
var ij = 'SelectIcon',
  sj = f.forwardRef((e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e
    return g.jsx(me.span, { 'aria-hidden': !0, ...o, ref: t, children: r || '▼' })
  })
sj.displayName = ij
var Jn = 'SelectContent',
  yw = f.forwardRef((e, t) => {
    const n = kn(Jn, e.__scopeSelect),
      [r, o] = f.useState()
    if (
      (Ye(() => {
        o(new DocumentFragment())
      }, []),
      !n.open)
    ) {
      const i = r
      return i
        ? ms.createPortal(
            g.jsx(vw, {
              scope: e.__scopeSelect,
              children: g.jsx(Xu.Slot, { scope: e.__scopeSelect, children: g.jsx('div', { children: e.children }) }),
            }),
            i,
          )
        : null
    }
    return g.jsx(bw, { ...e, ref: t })
  })
yw.displayName = Jn
var Dt = 10,
  [vw, Dn] = Gr(Jn),
  aj = 'SelectContentImpl',
  lj = Yn('SelectContent.RemoveScroll'),
  bw = f.forwardRef((e, t) => {
    const {
        __scopeSelect: n,
        position: r = 'item-aligned',
        onCloseAutoFocus: o,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        side: a,
        sideOffset: l,
        align: c,
        alignOffset: u,
        arrowPadding: d,
        collisionBoundary: h,
        collisionPadding: p,
        sticky: m,
        hideWhenDetached: y,
        avoidCollisions: v,
        ...w
      } = e,
      b = kn(Jn, n),
      [x, E] = f.useState(null),
      [C, A] = f.useState(null),
      S = we(t, (z) => E(z)),
      [R, I] = f.useState(null),
      [N, G] = f.useState(null),
      oe = qs(n),
      [te, L] = f.useState(!1),
      F = f.useRef(!1)
    ;(f.useEffect(() => {
      if (x) return gu(x)
    }, [x]),
      au())
    const O = f.useCallback(
        (z) => {
          const [ee, ...Ce] = oe().map((ge) => ge.ref.current),
            [be] = Ce.slice(-1),
            le = document.activeElement
          for (const ge of z)
            if (
              ge === le ||
              (ge?.scrollIntoView({ block: 'nearest' }),
              ge === ee && C && (C.scrollTop = 0),
              ge === be && C && (C.scrollTop = C.scrollHeight),
              ge?.focus(),
              document.activeElement !== le)
            )
              return
        },
        [oe, C],
      ),
      D = f.useCallback(() => O([R, x]), [O, R, x])
    f.useEffect(() => {
      te && D()
    }, [te, D])
    const { onOpenChange: _, triggerPointerDownPosRef: k } = b
    ;(f.useEffect(() => {
      if (x) {
        let z = { x: 0, y: 0 }
        const ee = (be) => {
            z = {
              x: Math.abs(Math.round(be.pageX) - (k.current?.x ?? 0)),
              y: Math.abs(Math.round(be.pageY) - (k.current?.y ?? 0)),
            }
          },
          Ce = (be) => {
            ;(z.x <= 10 && z.y <= 10 ? be.preventDefault() : x.contains(be.target) || _(!1),
              document.removeEventListener('pointermove', ee),
              (k.current = null))
          }
        return (
          k.current !== null &&
            (document.addEventListener('pointermove', ee),
            document.addEventListener('pointerup', Ce, { capture: !0, once: !0 })),
          () => {
            ;(document.removeEventListener('pointermove', ee),
              document.removeEventListener('pointerup', Ce, { capture: !0 }))
          }
        )
      }
    }, [x, _, k]),
      f.useEffect(() => {
        const z = () => _(!1)
        return (
          window.addEventListener('blur', z),
          window.addEventListener('resize', z),
          () => {
            ;(window.removeEventListener('blur', z), window.removeEventListener('resize', z))
          }
        )
      }, [_]))
    const [W, q] = Dw((z) => {
        const ee = oe().filter((le) => !le.disabled),
          Ce = ee.find((le) => le.ref.current === document.activeElement),
          be = Iw(ee, z, Ce)
        be && setTimeout(() => be.ref.current.focus())
      }),
      ae = f.useCallback(
        (z, ee, Ce) => {
          const be = !F.current && !Ce
          ;((b.value !== void 0 && b.value === ee) || be) && (I(z), be && (F.current = !0))
        },
        [b.value],
      ),
      B = f.useCallback(() => x?.focus(), [x]),
      Z = f.useCallback(
        (z, ee, Ce) => {
          const be = !F.current && !Ce
          ;((b.value !== void 0 && b.value === ee) || be) && G(z)
        },
        [b.value],
      ),
      J = r === 'popper' ? jl : ww,
      he =
        J === jl
          ? {
              side: a,
              sideOffset: l,
              align: c,
              alignOffset: u,
              arrowPadding: d,
              collisionBoundary: h,
              collisionPadding: p,
              sticky: m,
              hideWhenDetached: y,
              avoidCollisions: v,
            }
          : {}
    return g.jsx(vw, {
      scope: n,
      content: x,
      viewport: C,
      onViewportChange: A,
      itemRefCallback: ae,
      selectedItem: R,
      onItemLeave: B,
      itemTextRefCallback: Z,
      focusSelectedItem: D,
      selectedItemText: N,
      position: r,
      isPositioned: te,
      searchRef: W,
      children: g.jsx(zs, {
        as: lj,
        allowPinchZoom: !0,
        children: g.jsx(_s, {
          asChild: !0,
          trapped: b.open,
          onMountAutoFocus: (z) => {
            z.preventDefault()
          },
          onUnmountAutoFocus: U(o, (z) => {
            ;(b.trigger?.focus({ preventScroll: !0 }), z.preventDefault())
          }),
          children: g.jsx(Ur, {
            asChild: !0,
            disableOutsidePointerEvents: !0,
            onEscapeKeyDown: i,
            onPointerDownOutside: s,
            onFocusOutside: (z) => z.preventDefault(),
            onDismiss: () => b.onOpenChange(!1),
            children: g.jsx(J, {
              role: 'listbox',
              id: b.contentId,
              'data-state': b.open ? 'open' : 'closed',
              dir: b.dir,
              onContextMenu: (z) => z.preventDefault(),
              ...w,
              ...he,
              onPlaced: () => L(!0),
              ref: S,
              style: { display: 'flex', flexDirection: 'column', outline: 'none', ...w.style },
              onKeyDown: U(w.onKeyDown, (z) => {
                const ee = z.ctrlKey || z.altKey || z.metaKey
                if (
                  (z.key === 'Tab' && z.preventDefault(),
                  !ee && z.key.length === 1 && q(z.key),
                  ['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(z.key))
                ) {
                  let be = oe()
                    .filter((le) => !le.disabled)
                    .map((le) => le.ref.current)
                  if (
                    (['ArrowUp', 'End'].includes(z.key) && (be = be.slice().reverse()),
                    ['ArrowUp', 'ArrowDown'].includes(z.key))
                  ) {
                    const le = z.target,
                      ge = be.indexOf(le)
                    be = be.slice(ge + 1)
                  }
                  ;(setTimeout(() => O(be)), z.preventDefault())
                }
              }),
            }),
          }),
        }),
      }),
    })
  })
bw.displayName = aj
var cj = 'SelectItemAlignedPosition',
  ww = f.forwardRef((e, t) => {
    const { __scopeSelect: n, onPlaced: r, ...o } = e,
      i = kn(Jn, n),
      s = Dn(Jn, n),
      [a, l] = f.useState(null),
      [c, u] = f.useState(null),
      d = we(t, (S) => u(S)),
      h = qs(n),
      p = f.useRef(!1),
      m = f.useRef(!0),
      { viewport: y, selectedItem: v, selectedItemText: w, focusSelectedItem: b } = s,
      x = f.useCallback(() => {
        if (i.trigger && i.valueNode && a && c && y && v && w) {
          const S = i.trigger.getBoundingClientRect(),
            R = c.getBoundingClientRect(),
            I = i.valueNode.getBoundingClientRect(),
            N = w.getBoundingClientRect()
          if (i.dir !== 'rtl') {
            const le = N.left - R.left,
              ge = I.left - le,
              Ze = S.left - ge,
              ut = S.width + Ze,
              dt = Math.max(ut, R.width),
              cn = window.innerWidth - Dt,
              Tt = Ll(ge, [Dt, Math.max(Dt, cn - dt)])
            ;((a.style.minWidth = ut + 'px'), (a.style.left = Tt + 'px'))
          } else {
            const le = R.right - N.right,
              ge = window.innerWidth - I.right - le,
              Ze = window.innerWidth - S.right - ge,
              ut = S.width + Ze,
              dt = Math.max(ut, R.width),
              cn = window.innerWidth - Dt,
              Tt = Ll(ge, [Dt, Math.max(Dt, cn - dt)])
            ;((a.style.minWidth = ut + 'px'), (a.style.right = Tt + 'px'))
          }
          const G = h(),
            oe = window.innerHeight - Dt * 2,
            te = y.scrollHeight,
            L = window.getComputedStyle(c),
            F = parseInt(L.borderTopWidth, 10),
            O = parseInt(L.paddingTop, 10),
            D = parseInt(L.borderBottomWidth, 10),
            _ = parseInt(L.paddingBottom, 10),
            k = F + O + te + _ + D,
            W = Math.min(v.offsetHeight * 5, k),
            q = window.getComputedStyle(y),
            ae = parseInt(q.paddingTop, 10),
            B = parseInt(q.paddingBottom, 10),
            Z = S.top + S.height / 2 - Dt,
            J = oe - Z,
            he = v.offsetHeight / 2,
            z = v.offsetTop + he,
            ee = F + O + z,
            Ce = k - ee
          if (ee <= Z) {
            const le = G.length > 0 && v === G[G.length - 1].ref.current
            a.style.bottom = '0px'
            const ge = c.clientHeight - y.offsetTop - y.offsetHeight,
              Ze = Math.max(J, he + (le ? B : 0) + ge + D),
              ut = ee + Ze
            a.style.height = ut + 'px'
          } else {
            const le = G.length > 0 && v === G[0].ref.current
            a.style.top = '0px'
            const Ze = Math.max(Z, F + y.offsetTop + (le ? ae : 0) + he) + Ce
            ;((a.style.height = Ze + 'px'), (y.scrollTop = ee - Z + y.offsetTop))
          }
          ;((a.style.margin = `${Dt}px 0`),
            (a.style.minHeight = W + 'px'),
            (a.style.maxHeight = oe + 'px'),
            r?.(),
            requestAnimationFrame(() => (p.current = !0)))
        }
      }, [h, i.trigger, i.valueNode, a, c, y, v, w, i.dir, r])
    Ye(() => x(), [x])
    const [E, C] = f.useState()
    Ye(() => {
      c && C(window.getComputedStyle(c).zIndex)
    }, [c])
    const A = f.useCallback(
      (S) => {
        S && m.current === !0 && (x(), b?.(), (m.current = !1))
      },
      [x, b],
    )
    return g.jsx(dj, {
      scope: n,
      contentWrapper: a,
      shouldExpandOnScrollRef: p,
      onScrollButtonChange: A,
      children: g.jsx('div', {
        ref: l,
        style: { display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: E },
        children: g.jsx(me.div, { ...o, ref: d, style: { boxSizing: 'border-box', maxHeight: '100%', ...o.style } }),
      }),
    })
  })
ww.displayName = cj
var uj = 'SelectPopperPosition',
  jl = f.forwardRef((e, t) => {
    const { __scopeSelect: n, align: r = 'start', collisionPadding: o = Dt, ...i } = e,
      s = qu(n)
    return g.jsx(Ls, {
      ...s,
      ...i,
      ref: t,
      align: r,
      collisionPadding: o,
      style: {
        boxSizing: 'border-box',
        ...i.style,
        '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
        '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
        '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
        '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
        '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
      },
    })
  })
jl.displayName = uj
var [dj, Ju] = Gr(Jn, {}),
  $l = 'SelectViewport',
  fj = f.forwardRef((e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e,
      i = Dn($l, n),
      s = Ju($l, n),
      a = we(t, i.onViewportChange),
      l = f.useRef(0)
    return g.jsxs(g.Fragment, {
      children: [
        g.jsx('style', {
          dangerouslySetInnerHTML: {
            __html:
              '[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}',
          },
          nonce: r,
        }),
        g.jsx(Xu.Slot, {
          scope: n,
          children: g.jsx(me.div, {
            'data-radix-select-viewport': '',
            role: 'presentation',
            ...o,
            ref: a,
            style: { position: 'relative', flex: 1, overflow: 'hidden auto', ...o.style },
            onScroll: U(o.onScroll, (c) => {
              const u = c.currentTarget,
                { contentWrapper: d, shouldExpandOnScrollRef: h } = s
              if (h?.current && d) {
                const p = Math.abs(l.current - u.scrollTop)
                if (p > 0) {
                  const m = window.innerHeight - Dt * 2,
                    y = parseFloat(d.style.minHeight),
                    v = parseFloat(d.style.height),
                    w = Math.max(y, v)
                  if (w < m) {
                    const b = w + p,
                      x = Math.min(m, b),
                      E = b - x
                    ;((d.style.height = x + 'px'),
                      d.style.bottom === '0px' &&
                        ((u.scrollTop = E > 0 ? E : 0), (d.style.justifyContent = 'flex-end')))
                  }
                }
              }
              l.current = u.scrollTop
            }),
          }),
        }),
      ],
    })
  })
fj.displayName = $l
var xw = 'SelectGroup',
  [hj, pj] = Gr(xw),
  mj = f.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = It()
    return g.jsx(hj, {
      scope: n,
      id: o,
      children: g.jsx(me.div, { role: 'group', 'aria-labelledby': o, ...r, ref: t }),
    })
  })
mj.displayName = xw
var Sw = 'SelectLabel',
  Cw = f.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = pj(Sw, n)
    return g.jsx(me.div, { id: o.id, ...r, ref: t })
  })
Cw.displayName = Sw
var ps = 'SelectItem',
  [gj, Ew] = Gr(ps),
  Pw = f.forwardRef((e, t) => {
    const { __scopeSelect: n, value: r, disabled: o = !1, textValue: i, ...s } = e,
      a = kn(ps, n),
      l = Dn(ps, n),
      c = a.value === r,
      [u, d] = f.useState(i ?? ''),
      [h, p] = f.useState(!1),
      m = we(t, (b) => l.itemRefCallback?.(b, r, o)),
      y = It(),
      v = f.useRef('touch'),
      w = () => {
        o || (a.onValueChange(r), a.onOpenChange(!1))
      }
    if (r === '')
      throw new Error(
        'A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.',
      )
    return g.jsx(gj, {
      scope: n,
      value: r,
      disabled: o,
      textId: y,
      isSelected: c,
      onItemTextChange: f.useCallback((b) => {
        d((x) => x || (b?.textContent ?? '').trim())
      }, []),
      children: g.jsx(Xu.ItemSlot, {
        scope: n,
        value: r,
        disabled: o,
        textValue: u,
        children: g.jsx(me.div, {
          role: 'option',
          'aria-labelledby': y,
          'data-highlighted': h ? '' : void 0,
          'aria-selected': c && h,
          'data-state': c ? 'checked' : 'unchecked',
          'aria-disabled': o || void 0,
          'data-disabled': o ? '' : void 0,
          tabIndex: o ? void 0 : -1,
          ...s,
          ref: m,
          onFocus: U(s.onFocus, () => p(!0)),
          onBlur: U(s.onBlur, () => p(!1)),
          onClick: U(s.onClick, () => {
            v.current !== 'mouse' && w()
          }),
          onPointerUp: U(s.onPointerUp, () => {
            v.current === 'mouse' && w()
          }),
          onPointerDown: U(s.onPointerDown, (b) => {
            v.current = b.pointerType
          }),
          onPointerMove: U(s.onPointerMove, (b) => {
            ;((v.current = b.pointerType),
              o ? l.onItemLeave?.() : v.current === 'mouse' && b.currentTarget.focus({ preventScroll: !0 }))
          }),
          onPointerLeave: U(s.onPointerLeave, (b) => {
            b.currentTarget === document.activeElement && l.onItemLeave?.()
          }),
          onKeyDown: U(s.onKeyDown, (b) => {
            ;(l.searchRef?.current !== '' && b.key === ' ') ||
              (tj.includes(b.key) && w(), b.key === ' ' && b.preventDefault())
          }),
        }),
      }),
    })
  })
Pw.displayName = ps
var fo = 'SelectItemText',
  yj = f.forwardRef((e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...i } = e,
      s = kn(fo, n),
      a = Dn(fo, n),
      l = Ew(fo, n),
      c = rj(fo, n),
      [u, d] = f.useState(null),
      h = we(
        t,
        (w) => d(w),
        l.onItemTextChange,
        (w) => a.itemTextRefCallback?.(w, l.value, l.disabled),
      ),
      p = u?.textContent,
      m = f.useMemo(
        () => g.jsx('option', { value: l.value, disabled: l.disabled, children: p }, l.value),
        [l.disabled, l.value, p],
      ),
      { onNativeOptionAdd: y, onNativeOptionRemove: v } = c
    return (
      Ye(() => (y(m), () => v(m)), [y, v, m]),
      g.jsxs(g.Fragment, {
        children: [
          g.jsx(me.span, { id: l.textId, ...i, ref: h }),
          l.isSelected && s.valueNode && !s.valueNodeHasChildren ? ms.createPortal(i.children, s.valueNode) : null,
        ],
      })
    )
  })
yj.displayName = fo
var Rw = 'SelectItemIndicator',
  vj = f.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e
    return Ew(Rw, n).isSelected ? g.jsx(me.span, { 'aria-hidden': !0, ...r, ref: t }) : null
  })
vj.displayName = Rw
var Fl = 'SelectScrollUpButton',
  Tw = f.forwardRef((e, t) => {
    const n = Dn(Fl, e.__scopeSelect),
      r = Ju(Fl, e.__scopeSelect),
      [o, i] = f.useState(!1),
      s = we(t, r.onScrollButtonChange)
    return (
      Ye(() => {
        if (n.viewport && n.isPositioned) {
          let a = function () {
            const c = l.scrollTop > 0
            i(c)
          }
          const l = n.viewport
          return (a(), l.addEventListener('scroll', a), () => l.removeEventListener('scroll', a))
        }
      }, [n.viewport, n.isPositioned]),
      o
        ? g.jsx(_w, {
            ...e,
            ref: s,
            onAutoScroll: () => {
              const { viewport: a, selectedItem: l } = n
              a && l && (a.scrollTop = a.scrollTop - l.offsetHeight)
            },
          })
        : null
    )
  })
Tw.displayName = Fl
var zl = 'SelectScrollDownButton',
  Aw = f.forwardRef((e, t) => {
    const n = Dn(zl, e.__scopeSelect),
      r = Ju(zl, e.__scopeSelect),
      [o, i] = f.useState(!1),
      s = we(t, r.onScrollButtonChange)
    return (
      Ye(() => {
        if (n.viewport && n.isPositioned) {
          let a = function () {
            const c = l.scrollHeight - l.clientHeight,
              u = Math.ceil(l.scrollTop) < c
            i(u)
          }
          const l = n.viewport
          return (a(), l.addEventListener('scroll', a), () => l.removeEventListener('scroll', a))
        }
      }, [n.viewport, n.isPositioned]),
      o
        ? g.jsx(_w, {
            ...e,
            ref: s,
            onAutoScroll: () => {
              const { viewport: a, selectedItem: l } = n
              a && l && (a.scrollTop = a.scrollTop + l.offsetHeight)
            },
          })
        : null
    )
  })
Aw.displayName = zl
var _w = f.forwardRef((e, t) => {
    const { __scopeSelect: n, onAutoScroll: r, ...o } = e,
      i = Dn('SelectScrollButton', n),
      s = f.useRef(null),
      a = qs(n),
      l = f.useCallback(() => {
        s.current !== null && (window.clearInterval(s.current), (s.current = null))
      }, [])
    return (
      f.useEffect(() => () => l(), [l]),
      Ye(() => {
        a()
          .find((u) => u.ref.current === document.activeElement)
          ?.ref.current?.scrollIntoView({ block: 'nearest' })
      }, [a]),
      g.jsx(me.div, {
        'aria-hidden': !0,
        ...o,
        ref: t,
        style: { flexShrink: 0, ...o.style },
        onPointerDown: U(o.onPointerDown, () => {
          s.current === null && (s.current = window.setInterval(r, 50))
        }),
        onPointerMove: U(o.onPointerMove, () => {
          ;(i.onItemLeave?.(), s.current === null && (s.current = window.setInterval(r, 50)))
        }),
        onPointerLeave: U(o.onPointerLeave, () => {
          l()
        }),
      })
    )
  }),
  bj = 'SelectSeparator',
  Mw = f.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e
    return g.jsx(me.div, { 'aria-hidden': !0, ...r, ref: t })
  })
Mw.displayName = bj
var Vl = 'SelectArrow',
  wj = f.forwardRef((e, t) => {
    const { __scopeSelect: n, ...r } = e,
      o = qu(n),
      i = kn(Vl, n),
      s = Dn(Vl, n)
    return i.open && s.position === 'popper' ? g.jsx(js, { ...o, ...r, ref: t }) : null
  })
wj.displayName = Vl
var xj = 'SelectBubbleInput',
  Sj = f.forwardRef(({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = f.useRef(null),
      i = we(r, o),
      s = Y2(t)
    return (
      f.useEffect(() => {
        const a = o.current
        if (!a) return
        const l = window.HTMLSelectElement.prototype,
          u = Object.getOwnPropertyDescriptor(l, 'value').set
        if (s !== t && u) {
          const d = new Event('change', { bubbles: !0 })
          ;(u.call(a, t), a.dispatchEvent(d))
        }
      }, [s, t]),
      g.jsx(me.select, { ...n, style: { ...fw, ...n.style }, ref: i, defaultValue: t })
    )
  })
Sj.displayName = xj
function kw(e) {
  return e === '' || e === void 0
}
function Dw(e) {
  const t = Be(e),
    n = f.useRef(''),
    r = f.useRef(0),
    o = f.useCallback(
      (s) => {
        const a = n.current + s
        ;(t(a),
          (function l(c) {
            ;((n.current = c),
              window.clearTimeout(r.current),
              c !== '' && (r.current = window.setTimeout(() => l(''), 1e3)))
          })(a))
      },
      [t],
    ),
    i = f.useCallback(() => {
      ;((n.current = ''), window.clearTimeout(r.current))
    }, [])
  return (f.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, i])
}
function Iw(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((c) => c === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1
  let s = Cj(e, Math.max(i, 0))
  o.length === 1 && (s = s.filter((c) => c !== n))
  const l = s.find((c) => c.textValue.toLowerCase().startsWith(o.toLowerCase()))
  return l !== n ? l : void 0
}
function Cj(e, t) {
  return e.map((n, r) => e[(t + r) % e.length])
}
var Ej = mw,
  Pj = yw,
  Rj = Cw,
  Tj = Pw,
  Aj = Tw,
  _j = Aw,
  Mj = Mw
Ej.displayName
Aj.displayName
_j.displayName
Pj.displayName
Rj.displayName
Tj.displayName
Mj.displayName
function kj(e) {
  if (typeof document > 'u') return
  let t = document.head || document.getElementsByTagName('head')[0],
    n = document.createElement('style')
  ;((n.type = 'text/css'),
    t.appendChild(n),
    n.styleSheet ? (n.styleSheet.cssText = e) : n.appendChild(document.createTextNode(e)))
}
const Dj = (e) => {
    switch (e) {
      case 'success':
        return Nj
      case 'info':
        return jj
      case 'warning':
        return Lj
      case 'error':
        return $j
      default:
        return null
    }
  },
  Ij = Array(12).fill(0),
  Oj = ({ visible: e, className: t }) =>
    V.createElement(
      'div',
      { className: ['sonner-loading-wrapper', t].filter(Boolean).join(' '), 'data-visible': e },
      V.createElement(
        'div',
        { className: 'sonner-spinner' },
        Ij.map((n, r) => V.createElement('div', { className: 'sonner-loading-bar', key: `spinner-bar-${r}` })),
      ),
    ),
  Nj = V.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    V.createElement('path', {
      fillRule: 'evenodd',
      d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
      clipRule: 'evenodd',
    }),
  ),
  Lj = V.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'currentColor', height: '20', width: '20' },
    V.createElement('path', {
      fillRule: 'evenodd',
      d: 'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z',
      clipRule: 'evenodd',
    }),
  ),
  jj = V.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    V.createElement('path', {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z',
      clipRule: 'evenodd',
    }),
  ),
  $j = V.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 20 20', fill: 'currentColor', height: '20', width: '20' },
    V.createElement('path', {
      fillRule: 'evenodd',
      d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z',
      clipRule: 'evenodd',
    }),
  ),
  Fj = V.createElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '12',
      height: '12',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '1.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    V.createElement('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
    V.createElement('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
  ),
  zj = () => {
    const [e, t] = V.useState(document.hidden)
    return (
      V.useEffect(() => {
        const n = () => {
          t(document.hidden)
        }
        return (
          document.addEventListener('visibilitychange', n),
          () => window.removeEventListener('visibilitychange', n)
        )
      }, []),
      e
    )
  }
let Bl = 1
class Vj {
  constructor() {
    ;((this.subscribe = (t) => (
      this.subscribers.push(t),
      () => {
        const n = this.subscribers.indexOf(t)
        this.subscribers.splice(n, 1)
      }
    )),
      (this.publish = (t) => {
        this.subscribers.forEach((n) => n(t))
      }),
      (this.addToast = (t) => {
        ;(this.publish(t), (this.toasts = [...this.toasts, t]))
      }),
      (this.create = (t) => {
        var n
        const { message: r, ...o } = t,
          i = typeof t?.id == 'number' || ((n = t.id) == null ? void 0 : n.length) > 0 ? t.id : Bl++,
          s = this.toasts.find((l) => l.id === i),
          a = t.dismissible === void 0 ? !0 : t.dismissible
        return (
          this.dismissedToasts.has(i) && this.dismissedToasts.delete(i),
          s
            ? (this.toasts = this.toasts.map((l) =>
                l.id === i
                  ? (this.publish({ ...l, ...t, id: i, title: r }), { ...l, ...t, id: i, dismissible: a, title: r })
                  : l,
              ))
            : this.addToast({ title: r, ...o, dismissible: a, id: i }),
          i
        )
      }),
      (this.dismiss = (t) => (
        t
          ? (this.dismissedToasts.add(t),
            requestAnimationFrame(() => this.subscribers.forEach((n) => n({ id: t, dismiss: !0 }))))
          : this.toasts.forEach((n) => {
              this.subscribers.forEach((r) => r({ id: n.id, dismiss: !0 }))
            }),
        t
      )),
      (this.message = (t, n) => this.create({ ...n, message: t })),
      (this.error = (t, n) => this.create({ ...n, message: t, type: 'error' })),
      (this.success = (t, n) => this.create({ ...n, type: 'success', message: t })),
      (this.info = (t, n) => this.create({ ...n, type: 'info', message: t })),
      (this.warning = (t, n) => this.create({ ...n, type: 'warning', message: t })),
      (this.loading = (t, n) => this.create({ ...n, type: 'loading', message: t })),
      (this.promise = (t, n) => {
        if (!n) return
        let r
        n.loading !== void 0 &&
          (r = this.create({
            ...n,
            promise: t,
            type: 'loading',
            message: n.loading,
            description: typeof n.description != 'function' ? n.description : void 0,
          }))
        const o = Promise.resolve(t instanceof Function ? t() : t)
        let i = r !== void 0,
          s
        const a = o
            .then(async (c) => {
              if (((s = ['resolve', c]), V.isValidElement(c)))
                ((i = !1), this.create({ id: r, type: 'default', message: c }))
              else if (Uj(c) && !c.ok) {
                i = !1
                const d = typeof n.error == 'function' ? await n.error(`HTTP error! status: ${c.status}`) : n.error,
                  h =
                    typeof n.description == 'function'
                      ? await n.description(`HTTP error! status: ${c.status}`)
                      : n.description,
                  m = typeof d == 'object' && !V.isValidElement(d) ? d : { message: d }
                this.create({ id: r, type: 'error', description: h, ...m })
              } else if (c instanceof Error) {
                i = !1
                const d = typeof n.error == 'function' ? await n.error(c) : n.error,
                  h = typeof n.description == 'function' ? await n.description(c) : n.description,
                  m = typeof d == 'object' && !V.isValidElement(d) ? d : { message: d }
                this.create({ id: r, type: 'error', description: h, ...m })
              } else if (n.success !== void 0) {
                i = !1
                const d = typeof n.success == 'function' ? await n.success(c) : n.success,
                  h = typeof n.description == 'function' ? await n.description(c) : n.description,
                  m = typeof d == 'object' && !V.isValidElement(d) ? d : { message: d }
                this.create({ id: r, type: 'success', description: h, ...m })
              }
            })
            .catch(async (c) => {
              if (((s = ['reject', c]), n.error !== void 0)) {
                i = !1
                const u = typeof n.error == 'function' ? await n.error(c) : n.error,
                  d = typeof n.description == 'function' ? await n.description(c) : n.description,
                  p = typeof u == 'object' && !V.isValidElement(u) ? u : { message: u }
                this.create({ id: r, type: 'error', description: d, ...p })
              }
            })
            .finally(() => {
              ;(i && (this.dismiss(r), (r = void 0)), n.finally == null || n.finally.call(n))
            }),
          l = () => new Promise((c, u) => a.then(() => (s[0] === 'reject' ? u(s[1]) : c(s[1]))).catch(u))
        return typeof r != 'string' && typeof r != 'number' ? { unwrap: l } : Object.assign(r, { unwrap: l })
      }),
      (this.custom = (t, n) => {
        const r = n?.id || Bl++
        return (this.create({ jsx: t(r), id: r, ...n }), r)
      }),
      (this.getActiveToasts = () => this.toasts.filter((t) => !this.dismissedToasts.has(t.id))),
      (this.subscribers = []),
      (this.toasts = []),
      (this.dismissedToasts = new Set()))
  }
}
const lt = new Vj(),
  Bj = (e, t) => {
    const n = t?.id || Bl++
    return (lt.addToast({ title: e, ...t, id: n }), n)
  },
  Uj = (e) =>
    e && typeof e == 'object' && 'ok' in e && typeof e.ok == 'boolean' && 'status' in e && typeof e.status == 'number',
  Wj = Bj,
  Hj = () => lt.toasts,
  Gj = () => lt.getActiveToasts(),
  iz = Object.assign(
    Wj,
    {
      success: lt.success,
      info: lt.info,
      warning: lt.warning,
      error: lt.error,
      custom: lt.custom,
      message: lt.message,
      promise: lt.promise,
      dismiss: lt.dismiss,
      loading: lt.loading,
    },
    { getHistory: Hj, getToasts: Gj },
  )
kj(
  "[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}",
)
function Pi(e) {
  return e.label !== void 0
}
const Zj = 3,
  Kj = '24px',
  Yj = '16px',
  Zh = 4e3,
  Xj = 356,
  qj = 14,
  Jj = 45,
  Qj = 200
function zt(...e) {
  return e.filter(Boolean).join(' ')
}
function e$(e) {
  const [t, n] = e.split('-'),
    r = []
  return (t && r.push(t), n && r.push(n), r)
}
const t$ = (e) => {
  var t, n, r, o, i, s, a, l, c
  const {
      invert: u,
      toast: d,
      unstyled: h,
      interacting: p,
      setHeights: m,
      visibleToasts: y,
      heights: v,
      index: w,
      toasts: b,
      expanded: x,
      removeToast: E,
      defaultRichColors: C,
      closeButton: A,
      style: S,
      cancelButtonStyle: R,
      actionButtonStyle: I,
      className: N = '',
      descriptionClassName: G = '',
      duration: oe,
      position: te,
      gap: L,
      expandByDefault: F,
      classNames: O,
      icons: D,
      closeButtonAriaLabel: _ = 'Close toast',
    } = e,
    [k, W] = V.useState(null),
    [q, ae] = V.useState(null),
    [B, Z] = V.useState(!1),
    [J, he] = V.useState(!1),
    [z, ee] = V.useState(!1),
    [Ce, be] = V.useState(!1),
    [le, ge] = V.useState(!1),
    [Ze, ut] = V.useState(0),
    [dt, cn] = V.useState(0),
    Tt = V.useRef(d.duration || oe || Zh),
    Kr = V.useRef(null),
    At = V.useRef(null),
    ta = w === 0,
    na = w + 1 <= y,
    tt = d.type,
    st = d.dismissible !== !1,
    In = d.className || '',
    Xo = d.descriptionClassName || '',
    un = V.useMemo(() => v.findIndex((pe) => pe.toastId === d.id) || 0, [v, d.id]),
    _t = V.useMemo(() => {
      var pe
      return (pe = d.closeButton) != null ? pe : A
    }, [d.closeButton, A]),
    gt = V.useMemo(() => d.duration || oe || Zh, [d.duration, oe]),
    or = V.useRef(0),
    dn = V.useRef(0),
    ir = V.useRef(0),
    fn = V.useRef(null),
    [Mt, qo] = te.split('-'),
    Yr = V.useMemo(() => v.reduce((pe, Oe, Ne) => (Ne >= un ? pe : pe + Oe.height), 0), [v, un]),
    Xr = zj(),
    ra = d.invert || u,
    sr = tt === 'loading'
  ;((dn.current = V.useMemo(() => un * L + Yr, [un, Yr])),
    V.useEffect(() => {
      Tt.current = gt
    }, [gt]),
    V.useEffect(() => {
      Z(!0)
    }, []),
    V.useEffect(() => {
      const pe = At.current
      if (pe) {
        const Oe = pe.getBoundingClientRect().height
        return (
          cn(Oe),
          m((Ne) => [{ toastId: d.id, height: Oe, position: d.position }, ...Ne]),
          () => m((Ne) => Ne.filter((We) => We.toastId !== d.id))
        )
      }
    }, [m, d.id]),
    V.useLayoutEffect(() => {
      if (!B) return
      const pe = At.current,
        Oe = pe.style.height
      pe.style.height = 'auto'
      const Ne = pe.getBoundingClientRect().height
      ;((pe.style.height = Oe),
        cn(Ne),
        m((We) =>
          We.find((Fe) => Fe.toastId === d.id)
            ? We.map((Fe) => (Fe.toastId === d.id ? { ...Fe, height: Ne } : Fe))
            : [{ toastId: d.id, height: Ne, position: d.position }, ...We],
        ))
    }, [B, d.title, d.description, m, d.id, d.jsx, d.action, d.cancel]))
  const ft = V.useCallback(() => {
    ;(he(!0),
      ut(dn.current),
      m((pe) => pe.filter((Oe) => Oe.toastId !== d.id)),
      setTimeout(() => {
        E(d)
      }, Qj))
  }, [d, E, m, dn])
  ;(V.useEffect(() => {
    if ((d.promise && tt === 'loading') || d.duration === 1 / 0 || d.type === 'loading') return
    let pe
    return (
      x || p || Xr
        ? (() => {
            if (ir.current < or.current) {
              const We = new Date().getTime() - or.current
              Tt.current = Tt.current - We
            }
            ir.current = new Date().getTime()
          })()
        : (() => {
            Tt.current !== 1 / 0 &&
              ((or.current = new Date().getTime()),
              (pe = setTimeout(() => {
                ;(d.onAutoClose == null || d.onAutoClose.call(d, d), ft())
              }, Tt.current)))
          })(),
      () => clearTimeout(pe)
    )
  }, [x, p, d, tt, Xr, ft]),
    V.useEffect(() => {
      d.delete && (ft(), d.onDismiss == null || d.onDismiss.call(d, d))
    }, [ft, d.delete]))
  function Jo() {
    var pe
    if (D?.loading) {
      var Oe
      return V.createElement(
        'div',
        {
          className: zt(O?.loader, d == null || (Oe = d.classNames) == null ? void 0 : Oe.loader, 'sonner-loader'),
          'data-visible': tt === 'loading',
        },
        D.loading,
      )
    }
    return V.createElement(Oj, {
      className: zt(O?.loader, d == null || (pe = d.classNames) == null ? void 0 : pe.loader),
      visible: tt === 'loading',
    })
  }
  const qr = d.icon || D?.[tt] || Dj(tt)
  var Qo, Jr
  return V.createElement(
    'li',
    {
      tabIndex: 0,
      ref: At,
      className: zt(
        N,
        In,
        O?.toast,
        d == null || (t = d.classNames) == null ? void 0 : t.toast,
        O?.default,
        O?.[tt],
        d == null || (n = d.classNames) == null ? void 0 : n[tt],
      ),
      'data-sonner-toast': '',
      'data-rich-colors': (Qo = d.richColors) != null ? Qo : C,
      'data-styled': !(d.jsx || d.unstyled || h),
      'data-mounted': B,
      'data-promise': !!d.promise,
      'data-swiped': le,
      'data-removed': J,
      'data-visible': na,
      'data-y-position': Mt,
      'data-x-position': qo,
      'data-index': w,
      'data-front': ta,
      'data-swiping': z,
      'data-dismissible': st,
      'data-type': tt,
      'data-invert': ra,
      'data-swipe-out': Ce,
      'data-swipe-direction': q,
      'data-expanded': !!(x || (F && B)),
      'data-testid': d.testId,
      style: {
        '--index': w,
        '--toasts-before': w,
        '--z-index': b.length - w,
        '--offset': `${J ? Ze : dn.current}px`,
        '--initial-height': F ? 'auto' : `${dt}px`,
        ...S,
        ...d.style,
      },
      onDragEnd: () => {
        ;(ee(!1), W(null), (fn.current = null))
      },
      onPointerDown: (pe) => {
        pe.button !== 2 &&
          (sr ||
            !st ||
            ((Kr.current = new Date()),
            ut(dn.current),
            pe.target.setPointerCapture(pe.pointerId),
            pe.target.tagName !== 'BUTTON' && (ee(!0), (fn.current = { x: pe.clientX, y: pe.clientY }))))
      },
      onPointerUp: () => {
        var pe, Oe, Ne
        if (Ce || !st) return
        fn.current = null
        const We = Number(
            ((pe = At.current) == null ? void 0 : pe.style.getPropertyValue('--swipe-amount-x').replace('px', '')) || 0,
          ),
          ar = Number(
            ((Oe = At.current) == null ? void 0 : Oe.style.getPropertyValue('--swipe-amount-y').replace('px', '')) || 0,
          ),
          Fe = new Date().getTime() - ((Ne = Kr.current) == null ? void 0 : Ne.getTime()),
          P = k === 'x' ? We : ar,
          T = Math.abs(P) / Fe
        if (Math.abs(P) >= Jj || T > 0.11) {
          ;(ut(dn.current),
            d.onDismiss == null || d.onDismiss.call(d, d),
            ae(k === 'x' ? (We > 0 ? 'right' : 'left') : ar > 0 ? 'down' : 'up'),
            ft(),
            be(!0))
          return
        } else {
          var M, j
          ;((M = At.current) == null || M.style.setProperty('--swipe-amount-x', '0px'),
            (j = At.current) == null || j.style.setProperty('--swipe-amount-y', '0px'))
        }
        ;(ge(!1), ee(!1), W(null))
      },
      onPointerMove: (pe) => {
        var Oe, Ne, We
        if (!fn.current || !st || ((Oe = window.getSelection()) == null ? void 0 : Oe.toString().length) > 0) return
        const Fe = pe.clientY - fn.current.y,
          P = pe.clientX - fn.current.x
        var T
        const M = (T = e.swipeDirections) != null ? T : e$(te)
        !k && (Math.abs(P) > 1 || Math.abs(Fe) > 1) && W(Math.abs(P) > Math.abs(Fe) ? 'x' : 'y')
        let j = { x: 0, y: 0 }
        const H = (K) => 1 / (1.5 + Math.abs(K) / 20)
        if (k === 'y') {
          if (M.includes('top') || M.includes('bottom'))
            if ((M.includes('top') && Fe < 0) || (M.includes('bottom') && Fe > 0)) j.y = Fe
            else {
              const K = Fe * H(Fe)
              j.y = Math.abs(K) < Math.abs(Fe) ? K : Fe
            }
        } else if (k === 'x' && (M.includes('left') || M.includes('right')))
          if ((M.includes('left') && P < 0) || (M.includes('right') && P > 0)) j.x = P
          else {
            const K = P * H(P)
            j.x = Math.abs(K) < Math.abs(P) ? K : P
          }
        ;((Math.abs(j.x) > 0 || Math.abs(j.y) > 0) && ge(!0),
          (Ne = At.current) == null || Ne.style.setProperty('--swipe-amount-x', `${j.x}px`),
          (We = At.current) == null || We.style.setProperty('--swipe-amount-y', `${j.y}px`))
      },
    },
    _t && !d.jsx && tt !== 'loading'
      ? V.createElement(
          'button',
          {
            'aria-label': _,
            'data-disabled': sr,
            'data-close-button': !0,
            onClick:
              sr || !st
                ? () => {}
                : () => {
                    ;(ft(), d.onDismiss == null || d.onDismiss.call(d, d))
                  },
            className: zt(O?.closeButton, d == null || (r = d.classNames) == null ? void 0 : r.closeButton),
          },
          (Jr = D?.close) != null ? Jr : Fj,
        )
      : null,
    (tt || d.icon || d.promise) && d.icon !== null && (D?.[tt] !== null || d.icon)
      ? V.createElement(
          'div',
          { 'data-icon': '', className: zt(O?.icon, d == null || (o = d.classNames) == null ? void 0 : o.icon) },
          d.promise || (d.type === 'loading' && !d.icon) ? d.icon || Jo() : null,
          d.type !== 'loading' ? qr : null,
        )
      : null,
    V.createElement(
      'div',
      { 'data-content': '', className: zt(O?.content, d == null || (i = d.classNames) == null ? void 0 : i.content) },
      V.createElement(
        'div',
        { 'data-title': '', className: zt(O?.title, d == null || (s = d.classNames) == null ? void 0 : s.title) },
        d.jsx ? d.jsx : typeof d.title == 'function' ? d.title() : d.title,
      ),
      d.description
        ? V.createElement(
            'div',
            {
              'data-description': '',
              className: zt(G, Xo, O?.description, d == null || (a = d.classNames) == null ? void 0 : a.description),
            },
            typeof d.description == 'function' ? d.description() : d.description,
          )
        : null,
    ),
    V.isValidElement(d.cancel)
      ? d.cancel
      : d.cancel && Pi(d.cancel)
        ? V.createElement(
            'button',
            {
              'data-button': !0,
              'data-cancel': !0,
              style: d.cancelButtonStyle || R,
              onClick: (pe) => {
                Pi(d.cancel) && st && (d.cancel.onClick == null || d.cancel.onClick.call(d.cancel, pe), ft())
              },
              className: zt(O?.cancelButton, d == null || (l = d.classNames) == null ? void 0 : l.cancelButton),
            },
            d.cancel.label,
          )
        : null,
    V.isValidElement(d.action)
      ? d.action
      : d.action && Pi(d.action)
        ? V.createElement(
            'button',
            {
              'data-button': !0,
              'data-action': !0,
              style: d.actionButtonStyle || I,
              onClick: (pe) => {
                Pi(d.action) &&
                  (d.action.onClick == null || d.action.onClick.call(d.action, pe), !pe.defaultPrevented && ft())
              },
              className: zt(O?.actionButton, d == null || (c = d.classNames) == null ? void 0 : c.actionButton),
            },
            d.action.label,
          )
        : null,
  )
}
function Kh() {
  if (typeof window > 'u' || typeof document > 'u') return 'ltr'
  const e = document.documentElement.getAttribute('dir')
  return e === 'auto' || !e ? window.getComputedStyle(document.documentElement).direction : e
}
function n$(e, t) {
  const n = {}
  return (
    [e, t].forEach((r, o) => {
      const i = o === 1,
        s = i ? '--mobile-offset' : '--offset',
        a = i ? Yj : Kj
      function l(c) {
        ;['top', 'right', 'bottom', 'left'].forEach((u) => {
          n[`${s}-${u}`] = typeof c == 'number' ? `${c}px` : c
        })
      }
      typeof r == 'number' || typeof r == 'string'
        ? l(r)
        : typeof r == 'object'
          ? ['top', 'right', 'bottom', 'left'].forEach((c) => {
              r[c] === void 0 ? (n[`${s}-${c}`] = a) : (n[`${s}-${c}`] = typeof r[c] == 'number' ? `${r[c]}px` : r[c])
            })
          : l(a)
    }),
    n
  )
}
const r$ = V.forwardRef(function (t, n) {
    const {
        id: r,
        invert: o,
        position: i = 'bottom-right',
        hotkey: s = ['altKey', 'KeyT'],
        expand: a,
        closeButton: l,
        className: c,
        offset: u,
        mobileOffset: d,
        theme: h = 'light',
        richColors: p,
        duration: m,
        style: y,
        visibleToasts: v = Zj,
        toastOptions: w,
        dir: b = Kh(),
        gap: x = qj,
        icons: E,
        containerAriaLabel: C = 'Notifications',
      } = t,
      [A, S] = V.useState([]),
      R = V.useMemo(() => (r ? A.filter((B) => B.toasterId === r) : A.filter((B) => !B.toasterId)), [A, r]),
      I = V.useMemo(() => Array.from(new Set([i].concat(R.filter((B) => B.position).map((B) => B.position)))), [R, i]),
      [N, G] = V.useState([]),
      [oe, te] = V.useState(!1),
      [L, F] = V.useState(!1),
      [O, D] = V.useState(
        h !== 'system'
          ? h
          : typeof window < 'u' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light',
      ),
      _ = V.useRef(null),
      k = s.join('+').replace(/Key/g, '').replace(/Digit/g, ''),
      W = V.useRef(null),
      q = V.useRef(!1),
      ae = V.useCallback((B) => {
        S((Z) => {
          var J
          return (
            ((J = Z.find((he) => he.id === B.id)) != null && J.delete) || lt.dismiss(B.id),
            Z.filter(({ id: he }) => he !== B.id)
          )
        })
      }, [])
    return (
      V.useEffect(
        () =>
          lt.subscribe((B) => {
            if (B.dismiss) {
              requestAnimationFrame(() => {
                S((Z) => Z.map((J) => (J.id === B.id ? { ...J, delete: !0 } : J)))
              })
              return
            }
            setTimeout(() => {
              qh.flushSync(() => {
                S((Z) => {
                  const J = Z.findIndex((he) => he.id === B.id)
                  return J !== -1 ? [...Z.slice(0, J), { ...Z[J], ...B }, ...Z.slice(J + 1)] : [B, ...Z]
                })
              })
            })
          }),
        [A],
      ),
      V.useEffect(() => {
        if (h !== 'system') {
          D(h)
          return
        }
        if (
          (h === 'system' &&
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? D('dark') : D('light')),
          typeof window > 'u')
        )
          return
        const B = window.matchMedia('(prefers-color-scheme: dark)')
        try {
          B.addEventListener('change', ({ matches: Z }) => {
            D(Z ? 'dark' : 'light')
          })
        } catch {
          B.addListener(({ matches: J }) => {
            try {
              D(J ? 'dark' : 'light')
            } catch (he) {
              console.error(he)
            }
          })
        }
      }, [h]),
      V.useEffect(() => {
        A.length <= 1 && te(!1)
      }, [A]),
      V.useEffect(() => {
        const B = (Z) => {
          var J
          if (s.every((ee) => Z[ee] || Z.code === ee)) {
            var z
            ;(te(!0), (z = _.current) == null || z.focus())
          }
          Z.code === 'Escape' &&
            (document.activeElement === _.current || ((J = _.current) != null && J.contains(document.activeElement))) &&
            te(!1)
        }
        return (document.addEventListener('keydown', B), () => document.removeEventListener('keydown', B))
      }, [s]),
      V.useEffect(() => {
        if (_.current)
          return () => {
            W.current && (W.current.focus({ preventScroll: !0 }), (W.current = null), (q.current = !1))
          }
      }, [_.current]),
      V.createElement(
        'section',
        {
          ref: n,
          'aria-label': `${C} ${k}`,
          tabIndex: -1,
          'aria-live': 'polite',
          'aria-relevant': 'additions text',
          'aria-atomic': 'false',
          suppressHydrationWarning: !0,
        },
        I.map((B, Z) => {
          var J
          const [he, z] = B.split('-')
          return R.length
            ? V.createElement(
                'ol',
                {
                  key: B,
                  dir: b === 'auto' ? Kh() : b,
                  tabIndex: -1,
                  ref: _,
                  className: c,
                  'data-sonner-toaster': !0,
                  'data-sonner-theme': O,
                  'data-y-position': he,
                  'data-x-position': z,
                  style: {
                    '--front-toast-height': `${((J = N[0]) == null ? void 0 : J.height) || 0}px`,
                    '--width': `${Xj}px`,
                    '--gap': `${x}px`,
                    ...y,
                    ...n$(u, d),
                  },
                  onBlur: (ee) => {
                    q.current &&
                      !ee.currentTarget.contains(ee.relatedTarget) &&
                      ((q.current = !1), W.current && (W.current.focus({ preventScroll: !0 }), (W.current = null)))
                  },
                  onFocus: (ee) => {
                    ;(ee.target instanceof HTMLElement && ee.target.dataset.dismissible === 'false') ||
                      q.current ||
                      ((q.current = !0), (W.current = ee.relatedTarget))
                  },
                  onMouseEnter: () => te(!0),
                  onMouseMove: () => te(!0),
                  onMouseLeave: () => {
                    L || te(!1)
                  },
                  onDragEnd: () => te(!1),
                  onPointerDown: (ee) => {
                    ;(ee.target instanceof HTMLElement && ee.target.dataset.dismissible === 'false') || F(!0)
                  },
                  onPointerUp: () => F(!1),
                },
                R.filter((ee) => (!ee.position && Z === 0) || ee.position === B).map((ee, Ce) => {
                  var be, le
                  return V.createElement(t$, {
                    key: ee.id,
                    icons: E,
                    index: Ce,
                    toast: ee,
                    defaultRichColors: p,
                    duration: (be = w?.duration) != null ? be : m,
                    className: w?.className,
                    descriptionClassName: w?.descriptionClassName,
                    invert: o,
                    visibleToasts: v,
                    closeButton: (le = w?.closeButton) != null ? le : l,
                    interacting: L,
                    position: B,
                    style: w?.style,
                    unstyled: w?.unstyled,
                    classNames: w?.classNames,
                    cancelButtonStyle: w?.cancelButtonStyle,
                    actionButtonStyle: w?.actionButtonStyle,
                    closeButtonAriaLabel: w?.closeButtonAriaLabel,
                    removeToast: ae,
                    toasts: R.filter((ge) => ge.position == ee.position),
                    heights: N.filter((ge) => ge.position == ee.position),
                    setHeights: G,
                    expandByDefault: a,
                    gap: x,
                    expanded: oe,
                    swipeDirections: t.swipeDirections,
                  })
                }),
              )
            : null
        }),
      )
    )
  }),
  o$ = {
    toast:
      'group relative flex w-full items-center justify-between gap-3 rounded-2xl p-4 backdrop-blur-2xl duration-300 ease-out overflow-hidden max-w-md min-w-[320px] [&]:border [&]:border-solid [&]:data-[type=default]:border-[rgba(255,92,0,0.2)] [&]:data-[type=success]:border-[rgba(40,205,65,0.2)] [&]:data-[type=error]:border-[rgba(255,69,58,0.2)] [&]:data-[type=warning]:border-[rgba(255,149,0,0.2)] [&]:data-[type=info]:border-[rgba(0,122,255,0.2)] [&]:data-[type=loading]:border-[rgba(142,142,147,0.2)] [&]:shadow-[0_8px_32px_rgba(255,92,0,0.08),0_4px_16px_rgba(255,92,0,0.06),0_2px_8px_rgba(0,0,0,0.1)] [&]:data-[type=success]:shadow-[0_8px_32px_rgba(40,205,65,0.08),0_4px_16px_rgba(40,205,65,0.06),0_2px_8px_rgba(0,0,0,0.1)] [&]:data-[type=error]:shadow-[0_8px_32px_rgba(255,69,58,0.08),0_4px_16px_rgba(255,69,58,0.06),0_2px_8px_rgba(0,0,0,0.1)] [&]:data-[type=warning]:shadow-[0_8px_32px_rgba(255,149,0,0.08),0_4px_16px_rgba(255,149,0,0.06),0_2px_8px_rgba(0,0,0,0.1)] [&]:data-[type=info]:shadow-[0_8px_32px_rgba(0,122,255,0.08),0_4px_16px_rgba(0,122,255,0.06),0_2px_8px_rgba(0,0,0,0.1)] [&]:data-[type=loading]:shadow-[0_8px_32px_rgba(142,142,147,0.08),0_4px_16px_rgba(142,142,147,0.06),0_2px_8px_rgba(0,0,0,0.1)]',
    title: 'text-sm font-medium text-text leading-tight',
    description: 'text-sm text-text-secondary leading-relaxed mt-1',
    content: 'flex-1 min-w-0',
    icon: 'flex-shrink-0 mt-0.5 size-5 [li[data-type="success"]_&]:text-green [li[data-type="error"]_&]:text-red [li[data-type="warning"]_&]:text-orange [li[data-type="info"]_&]:text-blue [li[data-type="loading"]_&]:text-gray',
    actionButton:
      'shrink-0 h-6 px-2.5 text-xs font-medium rounded-md transition-all duration-200 focus:outline-none focus:shadow-lg bg-accent group-data-[type=success]:bg-green group-data-[type=success]:text-white group-data-[type=success]:hover:bg-green/90 group-data-[type=success]:focus:shadow-green/50 group-data-[type=error]:bg-red group-data-[type=error]:text-white group-data-[type=error]:hover:bg-red/90 group-data-[type=error]:focus:shadow-red/50 group-data-[type=warning]:bg-orange group-data-[type=warning]:text-white group-data-[type=warning]:hover:bg-orange/90 group-data-[type=warning]:focus:shadow-orange/50 group-data-[type=info]:bg-blue group-data-[type=info]:text-white group-data-[type=info]:hover:bg-blue/90 group-data-[type=info]:focus:shadow-blue/50 group-data-[type=loading]:bg-gray group-data-[type=loading]:text-white group-data-[type=loading]:hover:bg-gray/90 group-data-[type=loading]:focus:shadow-gray/50 hover:shadow-md active:scale-95',
    cancelButton:
      'h-6 px-2.5 text-xs font-medium rounded-md bg-fill-secondary text-text-secondary hover:bg-fill-tertiary hover:text-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-fill/50 focus:ring-offset-1',
    closeButton:
      'absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-text border border-border backdrop-blur-background bg-material-ultra-thick transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:opacity-100',
  },
  i$ = (e) => {
    const t = de.c(6)
    let n
    t[0] !== e ? (({ ...n } = e), (t[0] = e), (t[1] = n)) : (n = t[1])
    let r, o
    t[2] === Symbol.for('react.memo_cache_sentinel')
      ? ((r = { unstyled: !0, classNames: o$ }),
        (o = {
          success: g.jsx('i', { className: 'i-mingcute-check-circle-fill' }),
          error: g.jsx('i', { className: 'i-mingcute-close-circle-fill' }),
          warning: g.jsx('i', { className: 'i-mingcute-warning-fill' }),
          info: g.jsx('i', { className: 'i-mingcute-information-fill' }),
          loading: g.jsx('i', { className: 'i-mingcute-loading-3-fill animate-spin !duration-1000' }),
        }),
        (t[2] = r),
        (t[3] = o))
      : ((r = t[2]), (o = t[3]))
    let i
    return (
      t[4] !== n
        ? ((i = g.jsx(r$, { theme: 'dark', gap: 12, toastOptions: r, icons: o, ...n })), (t[4] = n), (t[5] = i))
        : (i = t[5]),
      i
    )
  }
f.createContext(null)
var [Js] = jt('Tooltip', [_n]),
  Qs = _n(),
  Ow = 'TooltipProvider',
  s$ = 700,
  Ul = 'tooltip.open',
  [a$, Qu] = Js(Ow),
  Nw = (e) => {
    const {
        __scopeTooltip: t,
        delayDuration: n = s$,
        skipDelayDuration: r = 300,
        disableHoverableContent: o = !1,
        children: i,
      } = e,
      s = f.useRef(!0),
      a = f.useRef(!1),
      l = f.useRef(0)
    return (
      f.useEffect(() => {
        const c = l.current
        return () => window.clearTimeout(c)
      }, []),
      g.jsx(a$, {
        scope: t,
        isOpenDelayedRef: s,
        delayDuration: n,
        onOpen: f.useCallback(() => {
          ;(window.clearTimeout(l.current), (s.current = !1))
        }, []),
        onClose: f.useCallback(() => {
          ;(window.clearTimeout(l.current), (l.current = window.setTimeout(() => (s.current = !0), r)))
        }, [r]),
        isPointerInTransitRef: a,
        onPointerInTransitChange: f.useCallback((c) => {
          a.current = c
        }, []),
        disableHoverableContent: o,
        children: i,
      })
    )
  }
Nw.displayName = Ow
var Oo = 'Tooltip',
  [l$, ea] = Js(Oo),
  Lw = (e) => {
    const {
        __scopeTooltip: t,
        children: n,
        open: r,
        defaultOpen: o,
        onOpenChange: i,
        disableHoverableContent: s,
        delayDuration: a,
      } = e,
      l = Qu(Oo, e.__scopeTooltip),
      c = Qs(t),
      [u, d] = f.useState(null),
      h = It(),
      p = f.useRef(0),
      m = s ?? l.disableHoverableContent,
      y = a ?? l.delayDuration,
      v = f.useRef(!1),
      [w, b] = nr({
        prop: r,
        defaultProp: o ?? !1,
        onChange: (S) => {
          ;(S ? (l.onOpen(), document.dispatchEvent(new CustomEvent(Ul))) : l.onClose(), i?.(S))
        },
        caller: Oo,
      }),
      x = f.useMemo(() => (w ? (v.current ? 'delayed-open' : 'instant-open') : 'closed'), [w]),
      E = f.useCallback(() => {
        ;(window.clearTimeout(p.current), (p.current = 0), (v.current = !1), b(!0))
      }, [b]),
      C = f.useCallback(() => {
        ;(window.clearTimeout(p.current), (p.current = 0), b(!1))
      }, [b]),
      A = f.useCallback(() => {
        ;(window.clearTimeout(p.current),
          (p.current = window.setTimeout(() => {
            ;((v.current = !0), b(!0), (p.current = 0))
          }, y)))
      }, [y, b])
    return (
      f.useEffect(
        () => () => {
          p.current && (window.clearTimeout(p.current), (p.current = 0))
        },
        [],
      ),
      g.jsx(Os, {
        ...c,
        children: g.jsx(l$, {
          scope: t,
          contentId: h,
          open: w,
          stateAttribute: x,
          trigger: u,
          onTriggerChange: d,
          onTriggerEnter: f.useCallback(() => {
            l.isOpenDelayedRef.current ? A() : E()
          }, [l.isOpenDelayedRef, A, E]),
          onTriggerLeave: f.useCallback(() => {
            m ? C() : (window.clearTimeout(p.current), (p.current = 0))
          }, [C, m]),
          onOpen: E,
          onClose: C,
          disableHoverableContent: m,
          children: n,
        }),
      })
    )
  }
Lw.displayName = Oo
var Wl = 'TooltipTrigger',
  jw = f.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      o = ea(Wl, n),
      i = Qu(Wl, n),
      s = Qs(n),
      a = f.useRef(null),
      l = we(t, a, o.onTriggerChange),
      c = f.useRef(!1),
      u = f.useRef(!1),
      d = f.useCallback(() => (c.current = !1), [])
    return (
      f.useEffect(() => () => document.removeEventListener('pointerup', d), [d]),
      g.jsx(Ns, {
        asChild: !0,
        ...s,
        children: g.jsx(me.button, {
          'aria-describedby': o.open ? o.contentId : void 0,
          'data-state': o.stateAttribute,
          ...r,
          ref: l,
          onPointerMove: U(e.onPointerMove, (h) => {
            h.pointerType !== 'touch' &&
              !u.current &&
              !i.isPointerInTransitRef.current &&
              (o.onTriggerEnter(), (u.current = !0))
          }),
          onPointerLeave: U(e.onPointerLeave, () => {
            ;(o.onTriggerLeave(), (u.current = !1))
          }),
          onPointerDown: U(e.onPointerDown, () => {
            ;(o.open && o.onClose(), (c.current = !0), document.addEventListener('pointerup', d, { once: !0 }))
          }),
          onFocus: U(e.onFocus, () => {
            c.current || o.onOpen()
          }),
          onBlur: U(e.onBlur, o.onClose),
          onClick: U(e.onClick, o.onClose),
        }),
      })
    )
  })
jw.displayName = Wl
var c$ = 'TooltipPortal',
  [sz, u$] = Js(c$, { forceMount: void 0 }),
  Lr = 'TooltipContent',
  $w = f.forwardRef((e, t) => {
    const n = u$(Lr, e.__scopeTooltip),
      { forceMount: r = n.forceMount, side: o = 'top', ...i } = e,
      s = ea(Lr, e.__scopeTooltip)
    return g.jsx(it, {
      present: r || s.open,
      children: s.disableHoverableContent ? g.jsx(Fw, { side: o, ...i, ref: t }) : g.jsx(d$, { side: o, ...i, ref: t }),
    })
  }),
  d$ = f.forwardRef((e, t) => {
    const n = ea(Lr, e.__scopeTooltip),
      r = Qu(Lr, e.__scopeTooltip),
      o = f.useRef(null),
      i = we(t, o),
      [s, a] = f.useState(null),
      { trigger: l, onClose: c } = n,
      u = o.current,
      { onPointerInTransitChange: d } = r,
      h = f.useCallback(() => {
        ;(a(null), d(!1))
      }, [d]),
      p = f.useCallback(
        (m, y) => {
          const v = m.currentTarget,
            w = { x: m.clientX, y: m.clientY },
            b = g$(w, v.getBoundingClientRect()),
            x = y$(w, b),
            E = v$(y.getBoundingClientRect()),
            C = w$([...x, ...E])
          ;(a(C), d(!0))
        },
        [d],
      )
    return (
      f.useEffect(() => () => h(), [h]),
      f.useEffect(() => {
        if (l && u) {
          const m = (v) => p(v, u),
            y = (v) => p(v, l)
          return (
            l.addEventListener('pointerleave', m),
            u.addEventListener('pointerleave', y),
            () => {
              ;(l.removeEventListener('pointerleave', m), u.removeEventListener('pointerleave', y))
            }
          )
        }
      }, [l, u, p, h]),
      f.useEffect(() => {
        if (s) {
          const m = (y) => {
            const v = y.target,
              w = { x: y.clientX, y: y.clientY },
              b = l?.contains(v) || u?.contains(v),
              x = !b$(w, s)
            b ? h() : x && (h(), c())
          }
          return (document.addEventListener('pointermove', m), () => document.removeEventListener('pointermove', m))
        }
      }, [l, u, s, c, h]),
      g.jsx(Fw, { ...e, ref: i })
    )
  }),
  [f$, h$] = Js(Oo, { isInside: !1 }),
  p$ = YT('TooltipContent'),
  Fw = f.forwardRef((e, t) => {
    const { __scopeTooltip: n, children: r, 'aria-label': o, onEscapeKeyDown: i, onPointerDownOutside: s, ...a } = e,
      l = ea(Lr, n),
      c = Qs(n),
      { onClose: u } = l
    return (
      f.useEffect(() => (document.addEventListener(Ul, u), () => document.removeEventListener(Ul, u)), [u]),
      f.useEffect(() => {
        if (l.trigger) {
          const d = (h) => {
            h.target?.contains(l.trigger) && u()
          }
          return (
            window.addEventListener('scroll', d, { capture: !0 }),
            () => window.removeEventListener('scroll', d, { capture: !0 })
          )
        }
      }, [l.trigger, u]),
      g.jsx(Ur, {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: i,
        onPointerDownOutside: s,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: u,
        children: g.jsxs(Ls, {
          'data-state': l.stateAttribute,
          ...c,
          ...a,
          ref: t,
          style: {
            ...a.style,
            '--radix-tooltip-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-tooltip-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-tooltip-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-tooltip-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-tooltip-trigger-height': 'var(--radix-popper-anchor-height)',
          },
          children: [
            g.jsx(p$, { children: r }),
            g.jsx(f$, {
              scope: n,
              isInside: !0,
              children: g.jsx(QL, { id: l.contentId, role: 'tooltip', children: o || r }),
            }),
          ],
        }),
      })
    )
  })
$w.displayName = Lr
var zw = 'TooltipArrow',
  m$ = f.forwardRef((e, t) => {
    const { __scopeTooltip: n, ...r } = e,
      o = Qs(n)
    return h$(zw, n).isInside ? null : g.jsx(js, { ...o, ...r, ref: t })
  })
m$.displayName = zw
function g$(e, t) {
  const n = Math.abs(t.top - e.y),
    r = Math.abs(t.bottom - e.y),
    o = Math.abs(t.right - e.x),
    i = Math.abs(t.left - e.x)
  switch (Math.min(n, r, o, i)) {
    case i:
      return 'left'
    case o:
      return 'right'
    case n:
      return 'top'
    case r:
      return 'bottom'
    default:
      throw new Error('unreachable')
  }
}
function y$(e, t, n = 5) {
  const r = []
  switch (t) {
    case 'top':
      r.push({ x: e.x - n, y: e.y + n }, { x: e.x + n, y: e.y + n })
      break
    case 'bottom':
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x + n, y: e.y - n })
      break
    case 'left':
      r.push({ x: e.x + n, y: e.y - n }, { x: e.x + n, y: e.y + n })
      break
    case 'right':
      r.push({ x: e.x - n, y: e.y - n }, { x: e.x - n, y: e.y + n })
      break
  }
  return r
}
function v$(e) {
  const { top: t, right: n, bottom: r, left: o } = e
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r },
  ]
}
function b$(e, t) {
  const { x: n, y: r } = e
  let o = !1
  for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
    const a = t[i],
      l = t[s],
      c = a.x,
      u = a.y,
      d = l.x,
      h = l.y
    u > r != h > r && n < ((d - c) * (r - u)) / (h - u) + c && (o = !o)
  }
  return o
}
function w$(e) {
  const t = e.slice()
  return (t.sort((n, r) => (n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0)), x$(t))
}
function x$(e) {
  if (e.length <= 1) return e.slice()
  const t = []
  for (let r = 0; r < e.length; r++) {
    const o = e[r]
    for (; t.length >= 2; ) {
      const i = t[t.length - 1],
        s = t[t.length - 2]
      if ((i.x - s.x) * (o.y - s.y) >= (i.y - s.y) * (o.x - s.x)) t.pop()
      else break
    }
    t.push(o)
  }
  t.pop()
  const n = []
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r]
    for (; n.length >= 2; ) {
      const i = n[n.length - 1],
        s = n[n.length - 2]
      if ((i.x - s.x) * (o.y - s.y) >= (i.y - s.y) * (o.x - s.x)) n.pop()
      else break
    }
    n.push(o)
  }
  return (n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n))
}
var S$ = Nw,
  C$ = jw,
  Vw = $w
const E$ = {
    content: [
      'relative z-9999 px-3 py-2 text-text backdrop-blur-2xl',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'rounded-xl text-sm',
      'max-w-[75ch] select-text',
    ],
  },
  P$ = S$,
  az = (e) => {
    const t = de.c(8)
    let n, r
    t[0] !== e ? (({ children: n, ...r } = e), (t[0] = e), (t[1] = n), (t[2] = r)) : ((n = t[1]), (r = t[2]))
    let o
    t[3] !== n ? ((o = g.jsx(Lw, { children: n })), (t[3] = n), (t[4] = o)) : (o = t[4])
    let i
    return (
      t[5] !== r || t[6] !== o
        ? ((i = g.jsx(P$, { ...r, children: o })), (t[5] = r), (t[6] = o), (t[7] = i))
        : (i = t[7]),
      i
    )
  },
  lz = C$,
  R$ = (e) => {
    const t = de.c(20)
    let n, r, o, i
    t[0] !== e
      ? (({ ref: o, className: n, sideOffset: i, ...r } = e),
        (t[0] = e),
        (t[1] = n),
        (t[2] = r),
        (t[3] = o),
        (t[4] = i))
      : ((n = t[1]), (r = t[2]), (o = t[3]), (i = t[4]))
    const s = i === void 0 ? 4 : i
    let a
    t[5] !== n ? ((a = Re(E$.content, n)), (t[5] = n), (t[6] = a)) : (a = t[6])
    let l, c, u, d
    t[7] === Symbol.for('react.memo_cache_sentinel')
      ? ((l = {
          backgroundImage:
            'linear-gradient(to bottom right, color-mix(in srgb, var(--color-background) 98%, transparent), color-mix(in srgb, var(--color-background) 95%, transparent))',
          boxShadow:
            '0 8px 32px color-mix(in srgb, var(--color-accent) 8%, transparent), 0 4px 16px color-mix(in srgb, var(--color-accent) 6%, transparent), 0 2px 8px rgba(0, 0, 0, 0.1)',
        }),
        (c = { opacity: 0, scale: 0.95, y: 4 }),
        (u = { opacity: 1, scale: 1, y: 0 }),
        (d = { opacity: 0, scale: 0.95, y: 4 }),
        (t[7] = l),
        (t[8] = c),
        (t[9] = u),
        (t[10] = d))
      : ((l = t[7]), (c = t[8]), (u = t[9]), (d = t[10]))
    let h
    t[11] === Symbol.for('react.memo_cache_sentinel')
      ? ((h = g.jsx('div', {
          className: 'pointer-events-none absolute inset-0 rounded-xl',
          style: {
            background:
              'linear-gradient(to bottom right, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent, color-mix(in srgb, var(--color-accent) 5%, transparent))',
          },
        })),
        (t[11] = h))
      : (h = t[11])
    let p
    t[12] !== r.children
      ? ((p = g.jsxs(Br.div, {
          className: 'border-accent/20 relative overflow-hidden border',
          style: l,
          initial: c,
          animate: u,
          exit: d,
          transition: Fo.presets.snappy,
          children: [h, g.jsx('div', { className: 'relative', children: r.children })],
        })),
        (t[12] = r.children),
        (t[13] = p))
      : (p = t[13])
    let m
    return (
      t[14] !== r || t[15] !== o || t[16] !== s || t[17] !== a || t[18] !== p
        ? ((m = g.jsx(Vw, { ref: o, asChild: !0, sideOffset: s, className: a, ...r, children: p })),
          (t[14] = r),
          (t[15] = o),
          (t[16] = s),
          (t[17] = a),
          (t[18] = p),
          (t[19] = m))
        : (m = t[19]),
      m
    )
  }
R$.displayName = Vw.displayName
const [cz, T$, uz, A$] = uc(Et({ open: !1 })),
  _$ = () => {
    const e = de.c(2),
      t = A$()
    let n
    return (
      e[0] !== t
        ? ((n = async (o, i) => {
            const s = new AbortController(),
              a = Promise.withResolvers()
            return (
              t({ open: !0, position: { x: i.clientX, y: i.clientY }, menuItems: o, abortController: s }),
              s.signal.addEventListener('abort', () => {
                a.resolve()
              }),
              a.promise
            )
          }),
          (e[0] = t),
          (e[1] = n))
        : (n = e[1]),
      n
    )
  }
function ed(e) {
  return e
    .filter((t) => t != null && t !== !1 && t !== '')
    .filter((t) => !t.hide)
    .map((t) => (t instanceof xn ? D$ : t.submenu && t.submenu.length > 0 ? t.extend({ submenu: ed(t.submenu) }) : t))
}
var Hl = ((e) => ((e[(e.Separator = 0)] = 'Separator'), (e[(e.Action = 1)] = 'Action'), e))(Hl || {})
const dz = () => {
  const e = de.c(2),
    t = _$()
  let n
  return (
    e[0] !== t
      ? ((n = async (o, i) => {
          const s = ed(o)
          ;(i.preventDefault(), i.stopPropagation(), await t(s, i))
        }),
        (e[0] = t),
        (e[1] = n))
      : (n = e[1]),
    n
  )
}
class xn {
  constructor(t = !1) {
    this.hide = t
  }
  type = 0
  static default = new xn()
}
const M$ = () => {}
class k$ {
  constructor(t) {
    ;((this.configs = t), (this.__sortedShortcut = this.configs.shortcut || null))
  }
  type = 1
  __sortedShortcut = null
  get label() {
    return this.configs.label
  }
  get click() {
    return this.configs.click?.bind(this.configs) || M$
  }
  get onClick() {
    return this.click
  }
  get icon() {
    return this.configs.icon
  }
  get shortcut() {
    return this.__sortedShortcut
  }
  get disabled() {
    return this.configs.disabled || !1
  }
  get checked() {
    return this.configs.checked
  }
  get supportMultipleSelection() {
    return this.configs.supportMultipleSelection
  }
}
class Bw extends k$ {
  constructor(t) {
    ;(super(t), (this.config = t), (this.__submenu = this.config.submenu ? ed(this.config.submenu) : []))
  }
  __submenu
  get submenu() {
    return this.__submenu
  }
  get hide() {
    return this.config.hide || !1
  }
  extend(t) {
    return new Bw({ ...this.config, ...t })
  }
}
const D$ = xn.default,
  I$ = (e) => e.preventDefault(),
  O$ = (e) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        e()
      })
    })
  },
  N$ = (e) => {
    const t = de.c(3),
      { children: n } = e
    let r
    t[0] === Symbol.for('react.memo_cache_sentinel') ? ((r = g.jsx(L$, {})), (t[0] = r)) : (r = t[0])
    let o
    return (t[1] !== n ? ((o = g.jsxs(g.Fragment, { children: [n, r] })), (t[1] = n), (t[2] = o)) : (o = t[2]), o)
  },
  L$ = () => {
    const e = de.c(18),
      t = f.useRef(null),
      [n, r] = T$()
    let o
    e[0] !== n.open || e[1] !== n.position
      ? ((o = () => {
          if (!n.open) return
          const h = t.current
          h &&
            h.dispatchEvent(
              new MouseEvent('contextmenu', {
                bubbles: !0,
                cancelable: !0,
                clientX: n.position.x,
                clientY: n.position.y,
              }),
            )
        }),
        (e[0] = n.open),
        (e[1] = n.position),
        (e[2] = o))
      : (o = e[2])
    let i
    ;(e[3] !== n ? ((i = [n]), (e[3] = n), (e[4] = i)) : (i = e[4]), f.useEffect(o, i))
    let s
    e[5] !== n.abortController || e[6] !== n.open || e[7] !== r
      ? ((s = (h) => {
          h || (n.open && (r({ open: !1 }), n.abortController.abort()))
        }),
        (e[5] = n.abortController),
        (e[6] = n.open),
        (e[7] = r),
        (e[8] = s))
      : (s = e[8])
    const a = s
    let l
    e[9] === Symbol.for('react.memo_cache_sentinel')
      ? ((l = g.jsx(IN, { className: 'hidden', ref: t })), (e[9] = l))
      : (l = e[9])
    let c
    e[10] !== n.menuItems || e[11] !== n.open
      ? ((c =
          n.open &&
          n.menuItems.map((h, p) => {
            const m = n.menuItems[p - 1]
            return (m instanceof xn && h instanceof xn) ||
              (!m && h instanceof xn) ||
              (!n.menuItems[p + 1] && h instanceof xn)
              ? null
              : g.jsx(Uw, { item: h }, p)
          })),
        (e[10] = n.menuItems),
        (e[11] = n.open),
        (e[12] = c))
      : (c = e[12])
    let u
    e[13] !== c ? ((u = g.jsx(rb, { onContextMenu: I$, children: c })), (e[13] = c), (e[14] = u)) : (u = e[14])
    let d
    return (
      e[15] !== a || e[16] !== u
        ? ((d = g.jsxs(DN, { onOpenChange: a, children: [l, u] })), (e[15] = a), (e[16] = u), (e[17] = d))
        : (d = e[17]),
      d
    )
  },
  Uw = f.memo((e) => {
    const t = de.c(24),
      { item: n } = e
    let r
    t[0] !== n
      ? ((r = () => {
          'click' in n &&
            O$(() => {
              n.click?.()
            })
        }),
        (t[0] = n),
        (t[1] = r))
      : (r = t[1])
    const o = r,
      i = f.useRef(null)
    switch (n.type) {
      case Hl.Separator: {
        let s
        return (t[2] === Symbol.for('react.memo_cache_sentinel') ? ((s = g.jsx(sb, {})), (t[2] = s)) : (s = t[2]), s)
      }
      case Hl.Action: {
        const s = n.submenu.length > 0,
          a = s ? tb : typeof n.checked == 'boolean' ? ib : ob,
          l = s ? ON : f.Fragment,
          c = n.disabled || (n.click === void 0 && !s),
          u = n.checked
        let d
        t[3] !== n.icon
          ? ((d =
              !!n.icon &&
              g.jsx('span', { className: 'absolute left-2 flex items-center justify-center', children: n.icon })),
            (t[3] = n.icon),
            (t[4] = d))
          : (d = t[4])
        const h = n.icon && 'pl-6'
        let p
        t[5] !== h ? ((p = Re(h)), (t[5] = h), (t[6] = p)) : (p = t[6])
        let m
        t[7] !== n.label || t[8] !== p
          ? ((m = g.jsx('span', { className: p, children: n.label })), (t[7] = n.label), (t[8] = p), (t[9] = m))
          : (m = t[9])
        let y
        t[10] !== a || t[11] !== n.checked || t[12] !== o || t[13] !== c || t[14] !== d || t[15] !== m
          ? ((y = g.jsxs(a, {
              ref: i,
              disabled: c,
              onClick: o,
              className: 'flex items-center gap-2',
              checked: u,
              children: [d, m],
            })),
            (t[10] = a),
            (t[11] = n.checked),
            (t[12] = o),
            (t[13] = c),
            (t[14] = d),
            (t[15] = m),
            (t[16] = y))
          : (y = t[16])
        let v
        t[17] !== s || t[18] !== n.submenu
          ? ((v = s && g.jsx(Ru, { children: g.jsx(nb, { children: n.submenu.map(j$) }) })),
            (t[17] = s),
            (t[18] = n.submenu),
            (t[19] = v))
          : (v = t[19])
        let w
        return (
          t[20] !== l || t[21] !== y || t[22] !== v
            ? ((w = g.jsxs(l, { children: [y, v] })), (t[20] = l), (t[21] = y), (t[22] = v), (t[23] = w))
            : (w = t[23]),
          w
        )
      }
      default:
        return null
    }
  })
function j$(e, t) {
  return g.jsx(Uw, { item: e }, t)
}
const $$ = typeof window > 'u' ? f.useEffect : f.useLayoutEffect,
  { innerWidth: Zr, innerHeight: F$ } = window,
  z$ = Zr >= 640,
  V$ = Zr >= 768,
  B$ = Zr >= 1024,
  U$ = Zr >= 1280,
  W$ = Zr >= 1536,
  H$ = Et({ sm: z$, md: V$, lg: B$, xl: U$, '2xl': W$, h: F$, w: Zr }),
  G$ = () => {
    const e = de.c(3),
      t = ac()
    let n
    e[0] !== t
      ? ((n = () => {
          const o = sC(() => {
            const { innerWidth: i, innerHeight: s } = window,
              a = i >= 640,
              l = i >= 768,
              c = i >= 1024,
              u = i >= 1280,
              d = i >= 1536
            t.set(H$, { sm: a, md: l, lg: c, xl: u, '2xl': d, h: s, w: i })
            const h = window.innerWidth < 1024
            document.documentElement.dataset.viewport = h ? 'mobile' : 'desktop'
          }, 16)
          return (
            o(),
            window.addEventListener('resize', o),
            () => {
              window.removeEventListener('resize', o)
            }
          )
        }),
        (e[0] = t),
        (e[1] = n))
      : (n = e[1])
    let r
    return (e[2] === Symbol.for('react.memo_cache_sentinel') ? ((r = []), (e[2] = r)) : (r = e[2]), $$(n, r), null)
  }
class Sr extends Event {
  constructor(t, n) {
    ;(super(Sr.type), (this._type = t), (this.data = n))
  }
  static type = 'EventBusEvent'
}
class Z$ {
  constructor() {
    ;((this.dispatch = this.dispatch.bind(this)),
      (this.subscribe = this.subscribe.bind(this)),
      (this.unsubscribe = this.unsubscribe.bind(this)))
  }
  dispatch = (t, n) => {
    window.dispatchEvent(new Sr(t, n))
  }
  subscribe(t, n) {
    const r = (o) => {
      o instanceof Sr && o._type === t && n(o.data)
    }
    return (window.addEventListener(Sr.type, r), this.unsubscribe.bind(this, t, r))
  }
  unsubscribe(t, n) {
    window.removeEventListener(Sr.type, n)
  }
}
new Z$()
const K$ = {
    auto: 'Auto',
    camera: {
      clear: 'Clear',
      empty: 'No cameras available',
      filter: 'Camera Filter',
      'not-found': 'No cameras match your search',
      search: 'Search Cameras',
    },
    columns: { setting: 'Column Settings' },
    filter: { title: 'Filter Photos' },
    lens: {
      clear: 'Clear',
      empty: 'No lenses available',
      filter: 'Lens Filter',
      'not-found': 'No lenses match your search',
      search: 'Search Lenses',
    },
    map: { explore: 'Map Explore' },
    rating: {
      filter: 'Rating Filter',
      'filter-above': 'Show {{rating}} stars and above',
      'filter-all': 'Show all photos',
      search: 'Search Ratings',
    },
    search: {
      clear: 'Clear',
      filter: { 'no-results': 'No matches found', placeholder: 'Filter items...' },
      hint: 'Search photos by filename, tags, camera, or lens',
      'no-results': 'No photos found',
      placeholder: 'Search photos...',
      preset: { all: 'All' },
      results: 'Found {{count}} photos',
      title: 'Search Photos',
      unified: { title: 'Search & Filter' },
    },
    sort: { mode: 'Sort Mode', newest: { first: 'Newest First' }, oldest: { first: 'Oldest First' } },
    tag: {
      clear: 'Clear',
      empty: 'No tags available',
      filter: 'Tag Filter',
      match: { all: 'All tags', any: 'Any tag', label: 'Match:' },
      mode: { and: 'AND', or: 'OR' },
      'not-found': 'No tags match your search',
      search: 'Search Tags',
    },
    view: { github: 'View GitHub Repository', layout: 'Layout', settings: 'View Settings', title: 'View' },
  },
  Y$ = {
    day: [
      null,
      '1st',
      '2nd',
      '3rd',
      '4th',
      '5th',
      '6th',
      '7th',
      '8th',
      '9th',
      '10th',
      '11th',
      '12th',
      '13th',
      '14th',
      '15th',
      '16th',
      '17th',
      '18th',
      '19th',
      '20th',
      '21st',
      '22nd',
      '23rd',
      '24th',
      '25th',
      '26th',
      '27th',
      '28th',
      '29th',
      '30th',
      '31st',
    ],
    month: [null, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  X$ = {
    feedback: 'Still having this issue? Please provide feedback on Github, thank you!',
    reload: 'Reload',
    submit: { issue: 'Submit Issue' },
    temporary: {
      description:
        'The application has encountered a temporary issue. Click the button below to try reloading the application or try other solutions?',
    },
    title: 'Sorry, the application encountered an error',
  },
  q$ = {
    aperture: { value: 'Aperture Value' },
    artist: 'Artist',
    auto: { white: { balance: { grb: 'Auto White Balance GRB' } } },
    basic: { info: 'Basic Information' },
    blue: { adjustment: 'Blue Adjustment', color: { effect: 'Blue Color Effect' } },
    brightness: { title: 'Brightness', value: 'Brightness Value' },
    camera: 'Camera',
    capture: { mode: 'Capture Mode', parameters: 'Capture Parameters', time: 'Capture Time' },
    clarity: 'Clarity',
    color: { effect: 'Color Effect', space: 'Color Space' },
    colorspace: { adobe: { rgb: 'Adobe RGB' }, srgb: 'sRGB', uncalibrated: 'Uncalibrated' },
    contrast: { title: 'Contrast' },
    copyright: 'Copyright',
    custom: { rendered: { normal: 'Normal Process', special: 'Custom Process', type: 'Custom Rendered' } },
    device: { info: 'Device Information' },
    digital: { zoom: 'Digital Zoom' },
    dimensions: 'Dimensions',
    dynamic: { range: 'Dynamic Range' },
    exposure: {
      mode: { auto: 'Auto Exposure', bracket: 'Auto Bracket', manual: 'Manual Exposure', title: 'Exposure Mode' },
    },
    exposureprogram: {
      action: 'Action Program',
      'aperture-priority': 'Aperture Priority',
      'aperture-priority-ae': 'Aperture Priority AE',
      creative: 'Creative Program',
      landscape: 'Landscape Mode',
      manual: 'Manual',
      normal: 'Program',
      'not-defined': 'Not Defined',
      portrait: 'Portrait Mode',
      'program-ae': 'Program AE',
      'shutter-priority': 'Shutter Priority',
      title: 'Exposure Program',
    },
    file: { size: 'File Size' },
    filename: 'Filename',
    film: { mode: 'Film Mode' },
    flash: {
      auto: {
        'no-return': 'Flash fired, auto mode, return light not detected',
        no: { title: 'No flash, auto mode' },
        return: 'Flash fired, auto mode, return light detected',
        yes: 'Flash fired, auto mode',
      },
      disabled: 'Flash did not fire',
      enabled: 'Flash fired',
      fired: 'Fired',
      forced: {
        mode: 'Flash fired, compulsory flash mode',
        no: { return: 'Flash fired, compulsory flash mode, return light not detected' },
        return: 'Flash fired, compulsory flash mode, return light detected',
      },
      metering: { mode: 'Flash Metering Mode' },
      'no-flash': 'No Flash',
      no: { return: 'Flash fired, return light not detected' },
      'off-did-not-fire': 'Off, Did not fire',
      off: { mode: 'Flash did not fire, compulsory flash mode' },
      return: { detected: 'Flash fired, return light detected' },
      title: 'Flash',
      unavailable: 'No flash function',
    },
    focal: {
      length: { actual: 'Focal Length', equivalent: '35mm Equivalent' },
      plane: { resolution: 'Focal Plane Resolution' },
    },
    format: 'Format',
    fuji: { film: { simulation: 'Fuji Film Simulation' } },
    'fujirecipe-colorchromeeffect': { off: 'Off', strong: 'Strong', weak: 'Weak' },
    'fujirecipe-colorchromefxblue': { off: 'Off', strong: 'Strong', weak: 'Weak' },
    'fujirecipe-dynamicrange': { standard: 'Standard' },
    'fujirecipe-graineffectroughness': { off: 'Off' },
    'fujirecipe-graineffectsize': { off: 'Off' },
    'fujirecipe-sharpness': { hard: 'Hard', normal: 'Normal', soft: 'Soft' },
    'fujirecipe-whitebalance': { auto: 'Auto', kelvin: '{{kelvin}}K' },
    gps: {
      altitude: 'Altitude',
      latitude: 'Latitude',
      location: { info: 'Location Information', name: 'Location Name' },
      longitude: 'Longitude',
      view: { map: 'View on Amap' },
    },
    grain: { effect: { intensity: 'Grain Effect Intensity', size: 'Grain Effect Size' } },
    header: { title: 'Photo Inspector' },
    highlight: { ratio: 'Highlight Ratio', tone: 'Highlight Tone' },
    histogram: 'Histogram',
    lens: 'Lens',
    lensmake: 'Lens Make',
    light: {
      source: {
        auto: 'Auto',
        cloudy: 'Cloudy Weather',
        cool: { white: { fluorescent: 'Cool White Fluorescent (W 3900 – 4500K)' } },
        d50: 'D50',
        d55: 'D55',
        d65: 'D65',
        d75: 'D75',
        day: { white: { fluorescent: 'Day White Fluorescent (N 4600 – 5400K)' } },
        daylight: 'Daylight',
        'daylight-fluorescent': 'Daylight Fluorescent (D 5700 – 7100K)',
        fine: { weather: 'Fine Weather' },
        flash: 'Flash',
        fluorescent: 'Fluorescent',
        iso: { tungsten: 'ISO Studio Tungsten' },
        other: 'Other Light Source',
        shade: 'Shade',
        standard: { a: 'Standard Light A', b: 'Standard Light B', c: 'Standard Light C' },
        tungsten: 'Tungsten (Incandescent Light)',
        type: 'Light Source',
        unknown: 'Unknown',
        white: { fluorescent: 'White Fluorescent (WW 3200 – 3700K)' },
      },
    },
    max: { aperture: 'Max Aperture' },
    metering: {
      mode: {
        average: 'Average',
        center: 'Center-weighted Average',
        'center-weighted-average': 'Center-weighted Average',
        multi: 'Multi-segment',
        'multi-segment': 'Multi-segment',
        partial: 'Partial',
        pattern: 'Pattern',
        spot: 'Spot',
        type: 'Metering Mode',
        unknown: 'Unknown',
      },
    },
    noise: { reduction: 'Noise Reduction' },
    not: { available: 'N/A' },
    pixels: 'Pixels',
    rating: 'Rating',
    raw: {
      category: {
        basic: 'File Information',
        camera: 'Camera Information',
        datetime: 'Date & Time',
        exposure: 'Exposure Settings',
        faceDetection: 'Face Detection',
        flash: 'Flash & Lighting',
        focus: 'Focus System',
        fuji: 'Fuji Film Simulation',
        gps: 'GPS Information',
        imageProperties: 'Image Properties',
        lens: 'Lens Information',
        other: 'Other Metadata',
        technical: 'Technical Parameters',
        uncategorized: 'Uncategorized',
        video: 'Video/HEIF Properties',
        whiteBalance: 'White Balance',
      },
      description: 'Complete EXIF metadata extracted from the image file',
      loading: 'Loading EXIF data...',
      no: { data: 'No EXIF data available' },
      parse: { error: 'Failed to parse EXIF data' },
      title: 'Raw EXIF Data',
    },
    red: { adjustment: 'Red Adjustment' },
    resolution: { unit: { cm: 'Centimeters', inches: 'Inches', none: 'No Unit' } },
    saturation: 'Saturation',
    scene: { capture: { type: 'Scene Capture Type' } },
    sensing: {
      method: {
        color: { sequential: { linear: 'Color Sequential Linear Sensor', main: 'Color Sequential Area Sensor' } },
        'one-chip-color-area': 'One-chip color area',
        one: { chip: 'One-chip Color Area Sensor' },
        three: { chip: 'Three-chip Color Area Sensor' },
        trilinear: 'Trilinear Sensor',
        two: { chip: 'Two-chip Color Area Sensor' },
        type: 'Sensing Method',
        undefined: 'Undefined',
      },
    },
    shadow: { ratio: 'Shadow Ratio', tone: 'Shadow Tone' },
    sharpness: 'Sharpness',
    shutter: { speed: { value: 'Shutter Speed Value' } },
    software: 'Software',
    standard: { white: { balance: { grb: 'Standard White Balance GRB' } } },
    tags: 'Tags',
    technical: { parameters: 'Technical Parameters' },
    time: { zone: 'Time Zone' },
    tone: {
      analysis: { title: 'Tone Analysis' },
      'high-contrast': 'High Contrast',
      'high-key': 'High Key',
      'low-key': 'Low Key',
      normal: 'Normal',
      type: 'Tone Type',
    },
    unknown: 'Unknown',
    white: {
      balance: {
        auto: 'Auto White Balance',
        bias: 'White Balance Bias',
        blue: 'Blue',
        daylight: 'Daylight',
        fine: { tune: 'White Balance Fine Tune' },
        grb: 'White Balance GRB Level',
        kelvin: 'Manual Kelvin',
        manual: 'Manual White Balance',
        red: 'Red',
        shift: { ab: 'White Balance Shift (Amber-Blue)', gm: 'White Balance Shift (Green-Magenta)' },
        title: 'White Balance',
      },
    },
  },
  J$ = {
    back: { to: { gallery: 'Back to Gallery' } },
    clear: { selection: 'Clear Selection' },
    cluster: {
      click: { details: 'Click to view details' },
      more: 'More',
      photos_one: '{{count}} photo',
      photos_other: '{{count}} photos',
    },
    controls: { compass: 'Reset bearing', locate: 'Locate me', zoom: { in: 'Zoom in', out: 'Zoom out' } },
    explore: { map: 'Explore Map' },
    found: { locations: 'Found {{count}} shooting locations' },
    loading: { map: 'Loading Map...' },
    map: {
      error: {
        description: 'Please check your network connection or refresh the page to try again',
        title: 'Map Loading Failed',
      },
    },
    parsing: { location: 'Parsing photo location information' },
    range: { separator: 'to' },
    shooting: { range: 'Shooting Range:' },
  },
  Q$ = { built: { at: 'Built at ' }, photos_one: '{{count}} photo', photos_other: '{{count}} photos' },
  e5 = {
    converting: 'Converting...',
    default: 'Loading',
    heic: { converting: 'Converting HEIC/HEIF image format...', main: 'HEIC' },
    queue: { waiting: 'Waiting for available converter...' },
    webgl: { building: 'Building high-quality textures...', main: 'WebGL Texture Loading' },
  },
  t5 = { loading: 'Loading map...', view: { in: { map: 'View location in map' } } },
  n5 = {
    conversion: { webcodecs: 'WebCodecs' },
    copy: {
      error: 'Failed to copy image, please try again later',
      image: 'Copy Image',
      success: 'Image copied to clipboard',
    },
    copying: 'Copying image...',
    download: 'Download Image',
    error: { loading: 'Failed to load image' },
    live: {
      badge: 'Live',
      converting: { detail: 'Converting video format using {{method}}...', video: 'Converting Live Photo video' },
      playing: 'Playing Live Photo',
      tooltip: {
        desktop: {
          main: 'Click the Live badge to play Live Photo',
          zoom: 'Click the Live badge to play Live Photo / Double-click to zoom',
        },
        mobile: {
          main: 'Tap the Live badge to play Live Photo',
          zoom: 'Tap the Live badge to play Live Photo / Double-tap to zoom',
        },
      },
    },
    reaction: { success: 'Reaction added' },
    share: {
      actions: 'Actions',
      copy: { failed: 'Copy failed', link: 'Copy Link' },
      default: { title: 'Photo Share' },
      embed: {
        code: 'Embed Code',
        copied: 'Embed code copied to clipboard',
        description: 'Copy this code to embed the photo on your website',
      },
      link: { copied: 'Link copied to clipboard' },
      social: { media: 'Social Media' },
      system: 'System Share',
      text: 'Check out this beautiful photo: {{title}}',
      title: 'Share Photo',
      weibo: 'Weibo',
    },
    webgl: {
      creatingTexture: 'Creating texture...',
      loadingImage: 'Loading image...',
      unavailable: 'WebGL is unavailable, unable to render image',
    },
    zoom: { hint: 'Double-tap or pinch to zoom' },
  },
  r5 = { auto: 'Auto', columns: '{{count}} column' },
  o5 = {
    codec: { keyword: 'Encoder' },
    conversion: {
      cached: { result: 'Using cached result' },
      codec: { fallback: 'No MP4 codec found that supports this resolution. Falling back to WebM.' },
      complete: 'Conversion complete',
      converting: 'Converting... {{current}}/{{total}} frames',
      duration: { error: 'Unable to determine video duration or duration is not finite.' },
      encoder: { error: 'Aborting conversion due to encoder error.' },
      failed: 'Video conversion failed',
      initializing: 'Initializing video converter...',
      loading: 'Loading video file...',
      starting: 'Starting conversion...',
      transmux: {
        analyzing: 'Analyzing MOV structure...',
        converting: 'Converting container format...',
        creating: 'Creating MP4 container...',
        fetching: 'Fetching video file...',
        high: { quality: 'Using high-quality transmux converter...' },
        not: { supported: 'Transmux is not supported in this browser' },
        success: 'Transmux completed successfully',
      },
      webcodecs: {
        high: { quality: 'Using high-quality WebCodecs converter...' },
        not: { supported: 'WebCodecs is not supported in this browser' },
      },
    },
    format: {
      mov: {
        not: { supported: 'Browser does not support MOV format, conversion required' },
        supported: 'Browser natively supports MOV format, skipping conversion',
      },
    },
    'motion-photo': { extracting: 'Extracting embedded video...' },
  },
  i5 = {
    action: K$,
    date: Y$,
    error: X$,
    exif: q$,
    explory: J$,
    gallery: Q$,
    loading: e5,
    minimap: t5,
    photo: n5,
    slider: r5,
    video: o5,
  },
  s5 = {
    auto: '自動',
    camera: {
      clear: 'クリア',
      empty: 'カメラがありません',
      filter: 'カメラフィルター',
      'not-found': '検索に一致するカメラがありません',
      search: 'カメラ検索',
    },
    columns: { setting: '列設定' },
    filter: { title: '写真をフィルター' },
    lens: {
      clear: 'クリア',
      empty: 'レンズがありません',
      filter: 'レンズフィルター',
      'not-found': '検索に一致するレンズがありません',
      search: 'レンズ検索',
    },
    map: { explore: 'マップ探索' },
    rating: {
      filter: '評価フィルター',
      'filter-above': '{{rating}} 星以上を表示',
      'filter-all': 'すべての写真を表示',
      search: '評価検索',
    },
    search: {
      clear: 'クリア',
      filter: { 'no-results': '一致する項目がありません', placeholder: '項目を絞り込む...' },
      hint: 'ファイル名、タグ、カメラ、レンズで写真を検索',
      'no-results': '写真が見つかりません',
      placeholder: '写真を検索...',
      preset: { all: 'すべて' },
      results: '{{count}} 枚の写真が見つかりました',
      title: '写真を検索',
      unified: { title: '検索とフィルター' },
    },
    sort: { mode: 'ソートモード', newest: { first: '新しい順' }, oldest: { first: '古い順' } },
    tag: {
      clear: 'クリア',
      empty: 'タグがありません',
      filter: 'タグフィルター',
      mode: { and: 'AND', or: 'OR' },
      'not-found': '検索に一致するタグがありません',
      search: 'タグ検索',
    },
    view: { github: 'GitHub リポジトリを表示', layout: 'レイアウト', settings: 'ビュー設定', title: 'ビュー' },
  },
  a5 = {
    day: [
      null,
      '1 日',
      '2 日',
      '3 日',
      '4 日',
      '5 日',
      '6 日',
      '7 日',
      '8 日',
      '9 日',
      '10 日',
      '11 日',
      '12 日',
      '13 日',
      '14 日',
      '15 日',
      '16 日',
      '17 日',
      '18 日',
      '19 日',
      '20 日',
      '21 日',
      '22 日',
      '23 日',
      '24 日',
      '25 日',
      '26 日',
      '27 日',
      '28 日',
      '29 日',
      '30 日',
      '31 日',
    ],
    month: [null, '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  l5 = {
    feedback: 'まだ問題が解決しませんか？GitHub でフィードバックをお願いします。',
    reload: '再読み込み',
    submit: { issue: '問題を報告' },
    temporary: {
      description:
        'アプリケーションで一時的な問題が発生しました。下のボタンをクリックしてアプリケーションを再読み込みするか、他の解決策をお試しください。',
    },
    title: '申し訳ありませんが、アプリケーションでエラーが発生しました',
  },
  c5 = {
    aperture: { value: '絞り値' },
    artist: 'アーティスト',
    auto: { white: { balance: { grb: 'オートホワイトバランス GRB' } } },
    basic: { info: '基本情報' },
    blue: { adjustment: 'ブルー調整', color: { effect: 'ブルーエフェクト' } },
    brightness: { title: '明度', value: '輝度' },
    camera: 'カメラ',
    capture: { mode: '撮影モード', parameters: '撮影パラメータ', time: '撮影日時' },
    clarity: '明瞭度',
    color: { effect: 'カラーエフェクト', space: '色空間' },
    colorspace: { adobe: { rgb: 'Adobe RGB' }, srgb: 'sRGB', uncalibrated: '未調整' },
    contrast: { title: 'コントラスト' },
    copyright: '著作権',
    custom: { rendered: { normal: '通常処理', special: 'カスタム処理', type: 'カスタムレンダリング' } },
    device: { info: 'デバイス情報' },
    digital: { zoom: 'デジタルズーム' },
    dimensions: 'サイズ',
    dynamic: { range: 'ダイナミックレンジ' },
    exposure: { mode: { auto: '自動露出', bracket: 'オートブラケット', manual: '手動', title: '露出モード' } },
    exposureprogram: {
      action: 'アクションプログラム',
      'aperture-priority': '絞り優先',
      'aperture-priority-ae': '絞り優先',
      creative: 'クリエイティブプログラム',
      landscape: '風景モード',
      manual: '手動',
      normal: '標準',
      'not-defined': '未定義',
      portrait: 'ポートレートモード',
      'program-ae': 'プログラム AE',
      'shutter-priority': 'シャッター優先',
      title: '露出プログラム',
    },
    file: { size: 'ファイルサイズ' },
    filename: 'ファイル名',
    film: { mode: 'フィルムモード' },
    flash: {
      auto: {
        'no-return': 'フラッシュ発光、オートモード、リターンライト検出されず',
        no: { title: 'フラッシュなし、オートモード' },
        return: 'フラッシュ発光、オートモード、リターンライト検出',
        yes: 'フラッシュ発光、オートモード',
      },
      disabled: 'フラッシュ発光せず',
      enabled: 'フラッシュ発光',
      fired: 'オン',
      forced: {
        mode: 'フラッシュ発光、強制フラッシュモード',
        no: { return: 'フラッシュ発光、強制フラッシュモード、リターンライト検出されず' },
        return: 'フラッシュ発光、強制フラッシュモード、リターンライト検出',
      },
      metering: { mode: 'フラッシュ測光モード' },
      'no-flash': 'オフ',
      no: { return: 'フラッシュ発光、リターンライト検出されず' },
      'off-did-not-fire': 'オフ',
      off: { mode: 'フラッシュ発光せず、強制フラッシュモード' },
      return: { detected: 'フラッシュ発光、リターンライト検出' },
      title: 'フラッシュ',
      unavailable: 'フラッシュ機能なし',
    },
    focal: { length: { actual: '焦点距離', equivalent: '35mm 換算' }, plane: { resolution: '焦点面解像度' } },
    format: 'フォーマット',
    fuji: { film: { simulation: 'フィルムシミュレーションレシピ' } },
    'fujirecipe-colorchromeeffect': { off: 'オフ', strong: '強', weak: '弱' },
    'fujirecipe-colorchromefxblue': { off: 'オフ', strong: '強', weak: '弱' },
    'fujirecipe-dynamicrange': { standard: '標準' },
    'fujirecipe-graineffectroughness': { off: 'オフ' },
    'fujirecipe-graineffectsize': { off: 'オフ' },
    'fujirecipe-sharpness': { hard: '硬調', normal: '標準', soft: '軟調' },
    'fujirecipe-whitebalance': { auto: '自動', kelvin: '{{kelvin}}K' },
    gps: {
      altitude: '高度',
      latitude: '緯度',
      location: { info: '位置情報', name: '位置名' },
      longitude: '経度',
      view: { map: '高德地図で表示' },
    },
    grain: { effect: { intensity: 'グレインエフェクト強度', size: 'グレインエフェクトサイズ' } },
    header: { title: 'フォトインスペクター' },
    highlight: { ratio: 'ハイライト比率', tone: 'ハイライトトーン' },
    histogram: 'ヒストグラム',
    lens: 'レンズ',
    lensmake: 'レンズメーカー',
    light: {
      source: {
        auto: '自動',
        cloudy: '曇り',
        cool: { white: { fluorescent: 'クールホワイト蛍光灯 (W 3900 – 4500K)' } },
        d50: 'D50',
        d55: 'D55',
        d65: 'D65',
        d75: 'D75',
        day: { white: { fluorescent: 'デイホワイト蛍光灯 (N 4600 – 5400K)' } },
        daylight: '昼光',
        'daylight-fluorescent': '昼光蛍光灯 (D 5700 – 7100K)',
        fine: { weather: '晴天' },
        flash: 'フラッシュ',
        fluorescent: '蛍光灯',
        iso: { tungsten: 'ISO スタジオタングステン' },
        other: 'その他の光源',
        shade: '日陰',
        standard: { a: '標準光源 A', b: '標準光源 B', c: '標準光源 C' },
        tungsten: 'タングステン (白熱電球)',
        type: '光源',
        unknown: '不明',
        white: { fluorescent: 'ホワイト蛍光灯 (WW 3200 – 3700K)' },
      },
    },
    max: { aperture: '最大絞り' },
    metering: {
      mode: {
        average: '平均',
        center: '中央重点平均測光',
        'center-weighted-average': '中央部重点平均測光',
        multi: 'マルチセグメント',
        'multi-segment': '多分割測光',
        partial: '部分',
        pattern: 'パターン',
        spot: 'スポット測光',
        type: '測光モード',
        unknown: '不明',
      },
    },
    noise: { reduction: 'ノイズリダクション' },
    not: { available: 'N/A' },
    pixels: 'ピクセル',
    rating: '評価',
    raw: {
      category: {
        basic: 'ファイル情報',
        camera: 'カメラ情報',
        datetime: '日時',
        exposure: '露出設定',
        faceDetection: '顔検出',
        flash: 'フラッシュ・光源',
        focus: 'フォーカスシステム',
        fuji: '富士フィルムシミュレーション',
        gps: 'GPS 情報',
        imageProperties: '画像プロパティ',
        lens: 'レンズ情報',
        other: 'その他のメタデータ',
        technical: '技術パラメータ',
        uncategorized: '未分類',
        video: '動画/HEIF プロパティ',
        whiteBalance: 'ホワイトバランス',
      },
      description: '画像ファイルから抽出された完全な EXIF メタデータ',
      loading: 'EXIF データを読み込み中...',
      no: { data: 'EXIF データがありません' },
      parse: { error: 'EXIF データの解析に失敗しました' },
      title: '生の EXIF データ',
    },
    red: { adjustment: 'レッド調整' },
    resolution: { unit: { cm: 'センチメートル', inches: 'インチ', none: '単位なし' } },
    saturation: '彩度',
    scene: { capture: { type: 'シーン撮影タイプ' } },
    sensing: {
      method: {
        color: {
          sequential: { linear: 'カラーシーケンシャルリニアセンサー', main: 'カラーシーケンシャルエリアセンサー' },
        },
        'one-chip-color-area': '1 チップカラーエリアセンサー',
        one: { chip: '1 チップカラーエリアセンサー' },
        three: { chip: '3 チップカラーエリアセンサー' },
        trilinear: 'トライリニアセンサー',
        two: { chip: '2 チップカラーエリアセンサー' },
        type: '撮像方式',
        undefined: '未定義',
      },
    },
    shadow: { ratio: 'シャドウ比率', tone: 'シャドウトーン' },
    sharpness: 'シャープネス',
    shutter: { speed: { value: 'シャッタースピード' } },
    software: 'ソフトウェア',
    standard: { white: { balance: { grb: '標準ホワイトバランス GRB' } } },
    tags: 'タグ',
    technical: { parameters: '技術パラメータ' },
    time: { zone: 'タイムゾーン' },
    tone: {
      'high-contrast': 'ハイコントラスト',
      'high-key': 'ハイキー',
      'low-key': 'ローキー',
      normal: '標準',
      type: 'トーンタイプ',
    },
    unknown: '不明',
    white: {
      balance: {
        auto: '自動',
        bias: 'ホワイトバランス補正',
        blue: 'ブルー',
        daylight: '昼光',
        fine: { tune: 'ホワイトバランス微調整' },
        grb: 'ホワイトバランス GRB レベル',
        kelvin: '手動ケルビン',
        manual: '手動',
        red: 'レッド',
        shift: { ab: 'ホワイトバランス補正 (アンバー-ブルー)', gm: 'ホワイトバランス補正 (グリーン - マゼンタ)' },
        title: 'ホワイトバランス',
      },
    },
  },
  u5 = {
    back: { to: { gallery: 'ギャラリーに戻る' } },
    clear: { selection: '選択をクリア' },
    cluster: {
      click: { details: 'クリックして詳細を表示' },
      more: 'もっと',
      photos_one: '写真{{count}}枚',
      photos_other: '写真{{count}}枚',
    },
    controls: { compass: '方向をリセット', locate: '現在地を取得', zoom: { in: '拡大', out: '縮小' } },
    explore: { map: 'マップを探索' },
    found: { locations: '{{count}} 個の撮影場所を発見' },
    loading: { map: 'マップを読み込み中...' },
    map: {
      error: {
        description: 'ネットワーク接続を確認するか、ページを更新して再試行してください',
        title: 'マップの読み込みに失敗しました',
      },
    },
    parsing: { location: '写真の位置情報を解析中' },
    range: { separator: 'から' },
    shooting: { range: '撮影範囲：' },
  },
  d5 = { built: { at: 'ビルド日時 ' }, photos_one: '写真{{count}}枚', photos_other: '写真{{count}}枚' },
  f5 = {
    converting: '変換中...',
    default: '読み込み中',
    heic: { converting: 'HEIC/HEIF 画像フォーマットを変換中...', main: 'HEIC' },
    queue: { waiting: '変換待機中です...' },
    webgl: { building: '高品質テクスチャを構築中...', main: 'WebGL テクスチャの読み込み' },
  },
  h5 = { loading: '地図を読み込み中...', view: { in: { map: '地図で位置を表示' } } },
  p5 = {
    conversion: { webcodecs: 'WebCodecs' },
    copy: {
      error: '画像のコピーに失敗しました。後でもう一度お試しください。',
      image: '画像をコピー',
      success: '画像がクリップボードにコピーされました。',
    },
    copying: '画像をコピーしています...',
    download: '画像をダウンロード',
    error: { loading: '画像の読み込みに失敗しました' },
    live: {
      badge: 'Live',
      converting: { detail: '{{method}}を使用してビデオ形式を変換しています...', video: 'Live Photo のビデオを変換中' },
      playing: 'ライブ写真を再生中',
      tooltip: {
        desktop: {
          main: 'ライブバッジをクリックして Live Photo を再生',
          zoom: 'ライブバッジをクリックして Live Photo を再生 / ダブルクリックしてズーム',
        },
        mobile: {
          main: 'ライブバッジをタップしてライブフォトを再生',
          zoom: 'ライブバッジをタップしてライブフォトを再生/ダブルタップしてズーム',
        },
      },
    },
    share: {
      actions: 'アクション',
      copy: { failed: 'コピーに失敗しました', link: 'リンクをコピー' },
      default: { title: '写真の共有' },
      embed: {
        code: '埋め込みコード',
        copied: '埋め込みコードがクリップボードにコピーされました',
        description: 'このコードをコピーして、あなたのウェブサイトに写真を埋め込んでください',
      },
      link: { copied: 'リンクがクリップボードにコピーされました' },
      social: { media: 'ソーシャルメディア' },
      system: 'システム共有',
      text: 'この素敵な写真を見てください：{{title}}',
      title: '写真を共有',
      weibo: 'Weibo',
    },
    webgl: { unavailable: 'WebGL が利用できないため、画像をレンダリングできません' },
    zoom: { hint: 'ダブルタップまたはピンチしてズーム' },
  },
  m5 = { auto: '自動', columns: '{{count}} 列' },
  g5 = {
    codec: { keyword: 'エンコーダー' },
    conversion: {
      cached: { result: 'キャッシュされた結果を使用' },
      codec: {
        fallback: 'この解像度でサポートされている MP4 コーデックが見つかりません。WebM にフォールバックします。',
      },
      complete: '変換完了',
      converting: '変換中... {{current}}/{{total}}フレーム',
      duration: { error: 'ビデオの長さを特定できないか、長さが有限ではありません。' },
      encoder: { error: 'エンコーダーエラーのため、変換を中止します。' },
      failed: 'ビデオ変換に失敗しました',
      initializing: 'ビデオコンバーターを初期化しています...',
      loading: 'ビデオファイルを読み込んでいます...',
      starting: '変換を開始しています...',
      transmux: {
        analyzing: 'MOV構造を解析中...',
        converting: 'コンテナ形式を変換中...',
        creating: 'MP4コンテナを作成中...',
        fetching: 'ビデオファイルを取得中...',
        high: { quality: '高品質トランスマックス変換器を使用中...' },
        not: { supported: 'このブラウザはトランスマックスをサポートしていません' },
        success: 'トランスマックス変換が正常に完了しました',
      },
      webcodecs: {
        high: { quality: '高品質の WebCodecs コンバーターを使用しています...' },
        not: { supported: 'このブラウザは WebCodecs をサポートしていません' },
      },
    },
    format: {
      mov: {
        not: { supported: 'ブラウザが MOV 形式をサポートしていないため、変換が必要です' },
        supported: 'ブラウザが MOV 形式をネイティブでサポートしているため、変換をスキップします',
      },
    },
    'motion-photo': { extracting: '埋め込み動画を抽出しています...' },
  },
  y5 = {
    action: s5,
    date: a5,
    error: l5,
    exif: c5,
    explory: u5,
    gallery: d5,
    loading: f5,
    minimap: h5,
    photo: p5,
    slider: m5,
    video: g5,
  },
  v5 = {
    auto: '자동',
    camera: {
      clear: '지우기',
      empty: '카메라가 없습니다',
      filter: '카메라 필터',
      'not-found': '검색과 일치하는 카메라가 없습니다',
      search: '카메라 검색',
    },
    columns: { setting: '열 설정' },
    filter: { title: '사진 필터' },
    lens: {
      clear: '지우기',
      empty: '렌즈가 없습니다',
      filter: '렌즈 필터',
      'not-found': '검색과 일치하는 렌즈가 없습니다',
      search: '렌즈 검색',
    },
    map: { explore: '지도 탐색' },
    rating: {
      filter: '평점 필터',
      'filter-above': '{{rating}} 별 이상 보기',
      'filter-all': '모든 사진 보기',
      search: '평점 검색',
    },
    search: {
      clear: '지우기',
      filter: { 'no-results': '일치하는 항목이 없습니다', placeholder: '항목 필터링...' },
      hint: '파일명, 태그, 카메라, 렌즈로 사진 검색',
      'no-results': '사진을 찾을 수 없습니다',
      placeholder: '사진 검색...',
      preset: { all: '전체' },
      results: '{{count}}장의 사진을 찾았습니다',
      title: '사진 검색',
      unified: { title: '검색 및 필터' },
    },
    sort: { mode: '정렬 모드', newest: { first: '최신순' }, oldest: { first: '오래된순' } },
    tag: {
      clear: '지우기',
      empty: '태그가 없습니다',
      filter: '태그 필터',
      mode: { and: 'AND', or: 'OR' },
      'not-found': '검색과 일치하는 태그가 없습니다',
      search: '태그 검색',
    },
    view: { github: 'GitHub 리포지토리 보기', layout: '레이아웃', settings: '보기 설정', title: '보기' },
  },
  b5 = {
    day: [
      null,
      '1 일',
      '2 일',
      '3 일',
      '4 일',
      '5 일',
      '6 일',
      '7 일',
      '8 일',
      '9 일',
      '10 일',
      '11 일',
      '12 일',
      '13 일',
      '14 일',
      '15 일',
      '16 일',
      '17 일',
      '18 일',
      '19 일',
      '20 일',
      '21 일',
      '22 일',
      '23 일',
      '24 일',
      '25 일',
      '26 일',
      '27 일',
      '28 일',
      '29 일',
      '30 일',
      '31 일',
    ],
    month: [null, '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  },
  w5 = {
    feedback: '문제가 계속 발생하나요? GitHub 에 피드백을 남겨주세요. 감사합니다!',
    reload: '새로고침',
    submit: { issue: '문제 제출' },
    temporary: {
      description:
        '애플리케이션에 일시적인 문제가 발생했습니다. 아래 버튼을 클릭하여 애플리케이션을 새로고침하거나 다른 해결 방법을 시도해 보세요.',
    },
    title: '죄송합니다, 애플리케이션에 오류가 발생했습니다',
  },
  x5 = {
    aperture: { value: '조리개 값' },
    artist: '아티스트',
    auto: { white: { balance: { grb: '자동 화이트 밸런스 GRB' } } },
    basic: { info: '기본 정보' },
    blue: { adjustment: '블루 조정', color: { effect: '블루 효과' } },
    brightness: { title: '밝기', value: '밝기' },
    camera: '카메라',
    capture: { mode: '촬영 모드', parameters: '촬영 매개변수', time: '촬영 시간' },
    clarity: '선명도',
    color: { effect: '색상 효과', space: '색 공간' },
    colorspace: { adobe: { rgb: 'Adobe RGB' }, srgb: 'sRGB', uncalibrated: '보정되지 않음' },
    contrast: { title: '대비' },
    copyright: '저작권',
    custom: { rendered: { normal: '일반 처리', special: '사용자 정의 처리', type: '사용자 정의 렌더링' } },
    device: { info: '장치 정보' },
    digital: { zoom: '디지털 줌' },
    dimensions: '크기',
    dynamic: { range: '다이나믹 레인지' },
    exposure: { mode: { auto: '자동 노출', bracket: '자동 브래킷', manual: '수동', title: '노출 모드' } },
    exposureprogram: {
      action: '액션 프로그램',
      'aperture-priority': '조리개 우선',
      'aperture-priority-ae': '조리개 우선',
      creative: '크리에이티브 프로그램',
      landscape: '풍경 모드',
      manual: '수동',
      normal: '표준',
      'not-defined': '정의되지 않음',
      portrait: '인물 모드',
      'program-ae': '프로그램 AE',
      'shutter-priority': '셔터 우선',
      title: '노출 프로그램',
    },
    file: { size: '파일 크기' },
    filename: '파일 이름',
    film: { mode: '필름 모드' },
    flash: {
      auto: {
        'no-return': '플래시 발광, 자동 모드, 반사광 감지되지 않음',
        no: { title: '플래시 없음, 자동 모드' },
        return: '플래시 발광, 자동 모드, 반사광 감지됨',
        yes: '플래시 발광, 자동 모드',
      },
      disabled: '플래시 발광하지 않음',
      enabled: '플래시 발광',
      fired: '켜짐',
      forced: {
        mode: '플래시 발광, 강제 플래시 모드',
        no: { return: '플래시 발광, 강제 플래시 모드, 반사광 감지되지 않음' },
        return: '플래시 발광, 강제 플래시 모드, 반사광 감지됨',
      },
      metering: { mode: '플래시 측광 모드' },
      'no-flash': '꺼짐',
      no: { return: '플래시 발광, 반사광 감지되지 않음' },
      'off-did-not-fire': '꺼짐',
      off: { mode: '플래시 발광하지 않음, 강제 플래시 모드' },
      return: { detected: '플래시 발광, 반사광 감지됨' },
      title: '플래시',
      unavailable: '플래시 기능 없음',
    },
    focal: { length: { actual: '초점 거리', equivalent: '35mm 환산' }, plane: { resolution: '초점면 해상도' } },
    format: '포맷',
    fuji: { film: { simulation: '필름 시뮬레이션 레시피' } },
    'fujirecipe-colorchromeeffect': { off: '꺼짐', strong: '강하게', weak: '약하게' },
    'fujirecipe-colorchromefxblue': { off: '꺼짐', strong: '강하게', weak: '약하게' },
    'fujirecipe-dynamicrange': { standard: '표준' },
    'fujirecipe-graineffectroughness': { off: '꺼짐' },
    'fujirecipe-graineffectsize': { off: '꺼짐' },
    'fujirecipe-sharpness': { hard: '하드', normal: '표준', soft: '소프트' },
    'fujirecipe-whitebalance': { auto: '자동', kelvin: '{{kelvin}}K' },
    gps: {
      altitude: '고도',
      latitude: '위도',
      location: { info: '위치 정보', name: '위치 이름' },
      longitude: '경도',
      view: { map: '고트맵에서 보기' },
    },
    grain: { effect: { intensity: '그레인 효과 강도', size: '그레인 효과 크기' } },
    header: { title: '사진 검사기' },
    highlight: { ratio: '하이라이트 비율', tone: '하이라이트 톤' },
    histogram: '히스토그램',
    lens: '렌즈',
    lensmake: '렌즈 제조사',
    light: {
      source: {
        auto: '자동',
        cloudy: '흐린 날씨',
        cool: { white: { fluorescent: '쿨 화이트 형광등 (W 3900 – 4500K)' } },
        d50: 'D50',
        d55: 'D55',
        d65: 'D65',
        d75: 'D75',
        day: { white: { fluorescent: '데이 화이트 형광등 (N 4600 – 5400K)' } },
        daylight: '일광',
        'daylight-fluorescent': '일광 형광등 (D 5700 – 7100K)',
        fine: { weather: '맑은 날씨' },
        flash: '플래시',
        fluorescent: '형광등',
        iso: { tungsten: 'ISO 스튜디오 텅스텐' },
        other: '기타 광원',
        shade: '그늘',
        standard: { a: '표준 광원 A', b: '표준 광원 B', c: '표준 광원 C' },
        tungsten: '텅스텐 (백열등)',
        type: '광원',
        unknown: '알 수 없음',
        white: { fluorescent: '화이트 형광등 (WW 3200 – 3700K)' },
      },
    },
    max: { aperture: '최대 조리개' },
    metering: {
      mode: {
        average: '평균',
        center: '중앙 중점 평균 측광',
        'center-weighted-average': '중앙 중점 평균 측광',
        multi: '멀티 세그먼트',
        'multi-segment': '다분할 측광',
        partial: '부분',
        pattern: '패턴',
        spot: '스팟 측광',
        type: '측광 모드',
        unknown: '알 수 없음',
      },
    },
    noise: { reduction: '노이즈 감소' },
    not: { available: 'N/A' },
    pixels: '픽셀',
    rating: '평점',
    raw: {
      category: {
        basic: '파일 정보',
        camera: '카메라 정보',
        datetime: '날짜 및 시간',
        exposure: '노출 설정',
        faceDetection: '얼굴 인식',
        flash: '플래시 및 조명',
        focus: '포커스 시스템',
        fuji: '후지 필름 시뮬레이션',
        gps: 'GPS 정보',
        imageProperties: '이미지 속성',
        lens: '렌즈 정보',
        other: '기타 메타데이터',
        technical: '기술 매개변수',
        uncategorized: '분류되지 않음',
        video: '비디오/HEIF 속성',
        whiteBalance: '화이트 밸런스',
      },
      description: '이미지 파일에서 추출된 완전한 EXIF 메타데이터',
      loading: 'EXIF 데이터 로딩 중...',
      no: { data: 'EXIF 데이터가 없습니다' },
      parse: { error: 'EXIF 데이터 분석에 실패했습니다' },
      title: '원시 EXIF 데이터',
    },
    red: { adjustment: '레드 조정' },
    resolution: { unit: { cm: '센티미터', inches: '인치', none: '단위 없음' } },
    saturation: '채도',
    scene: { capture: { type: '장면 캡처 유형' } },
    sensing: {
      method: {
        color: { sequential: { linear: '컬러 순차 선형 센서', main: '컬러 순차 영역 센서' } },
        'one-chip-color-area': '1 칩 컬러 영역 센서',
        one: { chip: '1 칩 컬러 영역 센서' },
        three: { chip: '3 칩 컬러 영역 센서' },
        trilinear: '삼선형 센서',
        two: { chip: '2 칩 컬러 영역 센서' },
        type: '감지 방식',
        undefined: '정의되지 않음',
      },
    },
    shadow: { ratio: '섀도우 비율', tone: '섀도우 톤' },
    sharpness: '선명도',
    shutter: { speed: { value: '셔터 속도' } },
    software: '소프트웨어',
    standard: { white: { balance: { grb: '표준 화이트 밸런스 GRB' } } },
    tags: '태그',
    technical: { parameters: '기술 매개변수' },
    time: { zone: '시간대' },
    tone: { 'high-contrast': '고대비', 'high-key': '하이키', 'low-key': '로우키', normal: '보통', type: '톤 타입' },
    unknown: '알 수 없음',
    white: {
      balance: {
        auto: '자동',
        bias: '화이트 밸런스 보정',
        blue: '블루',
        daylight: '일광',
        fine: { tune: '화이트 밸런스 미세 조정' },
        grb: '화이트 밸런스 GRB 레벨',
        kelvin: '수동 켈빈',
        manual: '수동',
        red: '레드',
        shift: { ab: '화이트 밸런스 보정 (앰버 - 블루)', gm: '화이트 밸런스 보정 (그린 - 마젠타)' },
        title: '화이트 밸런스',
      },
    },
  },
  S5 = {
    back: { to: { gallery: '갤러리로 돌아가기' } },
    clear: { selection: '선택 해제' },
    cluster: {
      click: { details: '클릭하여 상세 보기' },
      more: '더보기',
      photos_one: '사진 {{count}}장',
      photos_other: '사진 {{count}}장',
    },
    controls: { compass: '방향 초기화', locate: '내 위치 찾기', zoom: { in: '확대', out: '축소' } },
    explore: { map: '지도 탐색' },
    found: { locations: '{{count}}개의 촬영 위치 발견' },
    loading: { map: '지도 로딩 중...' },
    map: {
      error: {
        description: '네트워크 연결을 확인하거나 페이지를 새로고침하여 다시 시도하십시오.',
        title: '지도 로딩 실패',
      },
    },
    parsing: { location: '사진 위치 정보 분석 중' },
    range: { separator: '~' },
    shooting: { range: '촬영 범위:' },
  },
  C5 = { built: { at: '빌드 날짜 ' }, photos_one: '사진 {{count}}장', photos_other: '사진 {{count}}장' },
  E5 = {
    converting: '변환 중...',
    default: '로딩 중',
    heic: { converting: 'HEIC/HEIF 이미지 형식 변환 중...', main: 'HEIC' },
    queue: { waiting: '변환 대기 중입니다...' },
    webgl: { building: '고품질 텍스처 구축 중...', main: 'WebGL 텍스처 로딩' },
  },
  P5 = { loading: '지도 로딩 중...', view: { in: { map: '지도에서 위치 보기' } } },
  R5 = {
    conversion: { webcodecs: 'WebCodecs' },
    copy: {
      error: '이미지 복사에 실패했습니다. 나중에 다시 시도해 주세요.',
      image: '이미지 복사',
      success: '이미지를 클립보드에 복사했습니다.',
    },
    copying: '이미지 복사 중...',
    download: '이미지 다운로드',
    error: { loading: '이미지를 불러오지 못했습니다' },
    live: {
      badge: '라이브',
      converting: { detail: '{{method}}를 사용하여 비디오 형식을 변환하는 중...', video: '라이브 포토 비디오 변환 중' },
      playing: '라이브 포토 재생 중',
      tooltip: {
        desktop: {
          main: '라이브 배지를 클릭하여 라이브 포토 재생',
          zoom: '라이브 배지를 클릭하여 라이브 포토 재생 / 더블 클릭하여 확대',
        },
        mobile: {
          main: '라이브 배지를 탭하여 라이브 포토 재생',
          zoom: '라이브 배지를 탭하여 라이브 포토 재생/더블 탭하여 확대',
        },
      },
    },
    share: {
      actions: '작업',
      copy: { failed: '복사 실패', link: '링크 복사' },
      default: { title: '사진 공유' },
      embed: {
        code: '임베드 코드',
        copied: '임베드 코드를 클립보드에 복사했습니다',
        description: '이 코드를 복사하여 웹사이트에 사진을 임베드하세요',
      },
      link: { copied: '링크를 클립보드에 복사했습니다' },
      social: { media: '소셜 미디어' },
      system: '시스템 공유',
      text: '이 멋진 사진을 확인해 보세요: {{title}}',
      title: '사진 공유',
      weibo: 'Weibo',
    },
    webgl: { unavailable: 'WebGL 을 사용할 수 없어 이미지를 렌더링할 수 없습니다' },
    zoom: { hint: '더블 탭 또는 손가락으로 확대/축소' },
  },
  T5 = { auto: '자동', columns: '{{count}} 열' },
  A5 = {
    codec: { keyword: '인코더' },
    conversion: {
      cached: { result: '캐시된 결과 사용' },
      codec: { fallback: '이 해상도에서 지원되는 MP4 코덱을 찾을 수 없습니다. WebM 으로 대체합니다.' },
      complete: '변환 완료',
      converting: '변환 중... {{current}}/{{total}} 프레임',
      duration: { error: '비디오 길이를 확인할 수 없거나 유한한 값이 아닙니다.' },
      encoder: { error: '인코더 오류로 인해 변환이 중단되었습니다.' },
      failed: '비디오 변환 실패',
      initializing: '비디오 변환기 초기화 중...',
      loading: '비디오 파일 로딩 중...',
      starting: '변환 시작 중...',
      transmux: {
        analyzing: 'MOV 구조 분석 중...',
        converting: '컨테이너 형식 변환 중...',
        creating: 'MP4 컨테이너 생성 중...',
        fetching: '비디오 파일 가져오는 중...',
        high: { quality: '고품질 트랜스먹스 변환기 사용 중...' },
        not: { supported: '이 브라우저는 트랜스먹스를 지원하지 않습니다' },
        success: '트랜스먹스 변환이 성공적으로 완료되었습니다',
      },
      webcodecs: {
        high: { quality: '고품질 WebCodecs 변환기 사용 중...' },
        not: { supported: '이 브라우저는 WebCodecs 를 지원하지 않습니다' },
      },
    },
    format: {
      mov: {
        not: { supported: '브라우저가 MOV 형식을 지원하지 않아 변환이 필요합니다.' },
        supported: '브라우저가 MOV 형식을 기본적으로 지원하므로 변환을 건너뜁니다.',
      },
    },
    'motion-photo': { extracting: '내장된 비디오 추출 중...' },
  },
  _5 = {
    action: v5,
    date: b5,
    error: w5,
    exif: x5,
    explory: S5,
    gallery: C5,
    loading: E5,
    minimap: P5,
    photo: R5,
    slider: T5,
    video: A5,
  },
  M5 = {
    auto: '自动',
    camera: {
      clear: '清除',
      empty: '暂无相机',
      filter: '相机筛选',
      'not-found': '没有相机匹配您的搜索',
      search: '搜索相机',
    },
    columns: { setting: '列设置' },
    filter: { title: '筛选照片' },
    lens: {
      clear: '清除',
      empty: '暂无镜头',
      filter: '镜头筛选',
      'not-found': '没有镜头匹配您的搜索',
      search: '搜索镜头',
    },
    map: { explore: '地图探索' },
    rating: {
      filter: '评分筛选',
      'filter-above': '显示 {{rating}} 星及以上',
      'filter-all': '显示所有照片',
      search: '搜索评分',
    },
    search: {
      clear: '清除',
      filter: { 'no-results': '没有匹配项', placeholder: '筛选项目...' },
      hint: '按文件名、标签、相机或镜头搜索照片',
      'no-results': '未找到照片',
      placeholder: '搜索照片...',
      preset: { all: '全部' },
      results: '找到 {{count}} 张照片',
      title: '搜索照片',
      unified: { title: '搜索和筛选' },
    },
    sort: { mode: '排序模式', newest: { first: '最新优先' }, oldest: { first: '最早优先' } },
    tag: {
      clear: '清除',
      empty: '暂无标签',
      filter: '标签筛选',
      mode: { and: 'AND', or: 'OR' },
      'not-found': '没有标签匹配您的搜索',
      search: '搜索标签',
    },
    view: { github: '查看 GitHub 仓库', layout: '布局', settings: '视图设置', title: '视图' },
  },
  k5 = {
    day: [
      null,
      '1日',
      '2日',
      '3日',
      '4日',
      '5日',
      '6日',
      '7日',
      '8日',
      '9日',
      '10日',
      '11日',
      '12日',
      '13日',
      '14日',
      '15日',
      '16日',
      '17日',
      '18日',
      '19日',
      '20日',
      '21日',
      '22日',
      '23日',
      '24日',
      '25日',
      '26日',
      '27日',
      '28日',
      '29日',
      '30日',
      '31日',
    ],
    month: [null, '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  D5 = {
    feedback: '仍然存在此问题？请在 Github 中提供反馈，谢谢！',
    reload: '重新加载',
    submit: { issue: '提交问题' },
    temporary: { description: '应用程序出现临时问题，单击下面的按钮尝试重新加载应用程序或采用其他解决方案？' },
    title: '抱歉，应用程序遇到错误',
  },
  I5 = {
    aperture: { value: '光圈值' },
    artist: '艺术家',
    auto: { white: { balance: { grb: '自动白平衡 GRB' } } },
    basic: { info: '基本信息' },
    blue: { adjustment: '蓝色调整', color: { effect: '彩色 Fx 蓝色' } },
    brightness: { title: '亮度', value: '亮度' },
    camera: '相机',
    capture: { mode: '拍摄模式', parameters: '拍摄参数', time: '拍摄时间' },
    clarity: '清晰度',
    color: { effect: '色彩效果', space: '色彩空间' },
    colorspace: { adobe: { rgb: 'Adobe RGB' }, srgb: 'sRGB', uncalibrated: '未校准' },
    contrast: { title: '对比度' },
    copyright: '版权',
    custom: { rendered: { normal: '正常处理', special: '自定义处理', type: '自定义渲染' } },
    device: { info: '设备信息' },
    digital: { zoom: '数字变焦' },
    dimensions: '尺寸',
    dynamic: { range: '动态范围' },
    exposure: { mode: { auto: '自动曝光', bracket: '自动包围', manual: '手动', title: '曝光模式' } },
    exposureprogram: {
      action: '运动程序',
      'aperture-priority': '光圈优先',
      'aperture-priority-ae': '光圈优先',
      creative: '创意程序',
      landscape: '风景模式',
      manual: '手动',
      normal: '正常',
      'not-defined': '未定义',
      portrait: '人像模式',
      'program-ae': '程序自动曝光',
      'shutter-priority': '快门优先',
      title: '曝光程序',
    },
    file: { size: '文件大小' },
    filename: '文件名',
    film: { mode: '胶片模式' },
    flash: {
      auto: {
        'no-return': '闪光灯开启，自动模式，检测不到反射光',
        no: { title: '关闭闪光灯，自动模式' },
        return: '闪光灯开启，自动模式，检测到反射光',
        yes: '闪光灯开启，自动模式',
      },
      disabled: '闪光灯关闭',
      enabled: '闪光灯开启',
      fired: '开',
      forced: {
        mode: '闪光灯开启，强制闪光模式',
        no: { return: '闪光灯开启，强制闪光模式，检测不到反射光' },
        return: '闪光灯开启，强制闪光模式，检测到反射光',
      },
      metering: { mode: '闪光灯测光模式' },
      'no-flash': '关',
      no: { return: '闪光灯开启，检测不到反射光' },
      'off-did-not-fire': '关',
      off: { mode: '闪光灯关闭，强制关闭模式' },
      return: { detected: '闪光灯开启，检测到反射光' },
      title: '闪光灯',
      unavailable: '无闪光灯功能',
    },
    focal: { length: { actual: '焦距', equivalent: '35mm 等效' }, plane: { resolution: '焦平面分辨率' } },
    format: '格式',
    fuji: { film: { simulation: '胶片模拟配方' } },
    'fujirecipe-colorchromeeffect': { off: '关', strong: '强', weak: '弱' },
    'fujirecipe-colorchromefxblue': { off: '关', strong: '强', weak: '弱' },
    'fujirecipe-dynamicrange': { standard: '标准' },
    'fujirecipe-graineffectroughness': { off: '关' },
    'fujirecipe-graineffectsize': { off: '关' },
    'fujirecipe-sharpness': { hard: '锐利', normal: '标准', soft: '柔和' },
    'fujirecipe-whitebalance': { auto: '自动', kelvin: '{{kelvin}}K' },
    gps: {
      altitude: '海拔',
      latitude: '纬度',
      location: { info: '位置信息', name: '位置名称' },
      longitude: '经度',
      view: { map: '在高德地图中查看' },
    },
    grain: { effect: { intensity: '颗粒效果强度', size: '颗粒效果大小' } },
    header: { title: '照片信息' },
    highlight: { ratio: '高光占比', tone: '高光色调' },
    histogram: '直方图',
    lens: '镜头',
    lensmake: '镜头制造商',
    light: {
      source: {
        auto: '自动',
        cloudy: '阴天',
        cool: { white: { fluorescent: '冷白荧光灯 (W 3900 – 4500K)' } },
        d50: 'D50',
        d55: 'D55',
        d65: 'D65',
        d75: 'D75',
        day: { white: { fluorescent: '日白荧光灯 (N 4600 – 5400K)' } },
        daylight: '日光',
        'daylight-fluorescent': '日光荧光灯 (D 5700 – 7100K)',
        fine: { weather: '晴天' },
        flash: '闪光灯',
        fluorescent: '荧光灯',
        iso: { tungsten: 'ISO 演播室钨丝灯' },
        other: '其他光源',
        shade: '阴影',
        standard: { a: '标准光源 A', b: '标准光源 B', c: '标准光源 C' },
        tungsten: '钨丝灯 (白炽灯)',
        type: '光源',
        unknown: '未知',
        white: { fluorescent: '白荧光灯 (WW 3200 – 3700K)' },
      },
    },
    max: { aperture: '最大光圈' },
    metering: {
      mode: {
        average: '平均',
        center: '中心重点平均测光',
        'center-weighted-average': '中心重点平均测光',
        multi: '多重测光',
        'multi-segment': '多重测光',
        partial: '部分',
        pattern: '图案',
        spot: '点测光',
        type: '测光模式',
        unknown: '未知',
      },
    },
    noise: { reduction: '降噪' },
    not: { available: '不可用' },
    pixels: '像素',
    rating: '评分',
    raw: {
      category: {
        basic: '文件信息',
        camera: '相机信息',
        datetime: '日期时间',
        exposure: '曝光设置',
        faceDetection: '人脸检测',
        flash: '闪光灯与光源',
        focus: '对焦系统',
        fuji: '富士胶片模拟',
        gps: 'GPS 信息',
        imageProperties: '图像属性',
        lens: '镜头信息',
        other: '其他元数据',
        technical: '技术参数',
        uncategorized: '未分类',
        video: '视频/HEIF 属性',
        whiteBalance: '白平衡',
      },
      description: '从图像文件中提取的完整 EXIF 元数据',
      loading: '正在加载 EXIF 数据...',
      no: { data: '无 EXIF 数据' },
      parse: { error: '解析 EXIF 数据失败' },
      title: '原始 EXIF 数据',
    },
    red: { adjustment: '红色调整' },
    resolution: { unit: { cm: '厘米', inches: '英寸', none: '无单位' } },
    saturation: '饱和度',
    scene: { capture: { type: '场景捕获类型' } },
    sensing: {
      method: {
        color: { sequential: { linear: '颜色顺序线性传感器', main: '颜色顺序区域传感器' } },
        'one-chip-color-area': '单片彩色区域传感器',
        one: { chip: '单片彩色区域传感器' },
        three: { chip: '三片彩色区域传感器' },
        trilinear: '三线性传感器',
        two: { chip: '双片彩色区域传感器' },
        type: '感光方式',
        undefined: '未定义',
      },
    },
    shadow: { ratio: '阴影占比', tone: '阴影色调' },
    sharpness: '锐度',
    shutter: { speed: { value: '快门速度' } },
    software: '软件',
    standard: { white: { balance: { grb: '标准白平衡 GRB' } } },
    tags: '标签',
    technical: { parameters: '技术参数' },
    time: { zone: '时区' },
    tone: {
      analysis: { title: '影调分析' },
      'high-contrast': '高对比度',
      'high-key': '高调',
      'low-key': '低调',
      normal: '正常',
      type: '影调类型',
    },
    unknown: '未知',
    white: {
      balance: {
        auto: '自动',
        bias: '白平衡偏移',
        blue: '蓝色',
        daylight: '日光',
        fine: { tune: '白平衡微调' },
        grb: '白平衡 GRB 等级',
        kelvin: '手动色温',
        manual: '手动',
        red: '红色',
        shift: { ab: '白平衡偏移 (琥珀色 - 蓝色)', gm: '白平衡偏移 (绿色 - 品红色)' },
        title: '白平衡',
      },
    },
  },
  O5 = {
    back: { to: { gallery: '返回相册' } },
    clear: { selection: '清除选择' },
    cluster: {
      click: { details: '点击查看详情' },
      more: '更多',
      photos_one: '{{count}} 张照片',
      photos_other: '{{count}} 张照片',
    },
    controls: { compass: '重置方向', locate: '定位到我的位置', zoom: { in: '放大', out: '缩小' } },
    explore: { map: '探索地图' },
    found: { locations: '发现了 {{count}} 个拍摄位置' },
    loading: { map: '加载地图中...' },
    map: { error: { description: '请检查网络连接或刷新页面重试', title: '地图加载失败' } },
    parsing: { location: '正在解析照片位置信息' },
    range: { separator: '至' },
    shooting: { range: '拍摄范围：' },
  },
  N5 = { built: { at: '构建于 ' }, photos_one: '{{count}} 张照片', photos_other: '{{count}} 张照片' },
  L5 = {
    converting: '转换中...',
    default: '加载中',
    heic: { converting: '正在转换 HEIC/HEIF 图像格式...', main: 'HEIC' },
    queue: { waiting: '正在排队等待转换...' },
    webgl: { building: '正在构建高质量纹理...', main: 'WebGL 纹理加载' },
  },
  j5 = { loading: '加载地图中...', view: { in: { map: '在地图中查看位置' } } },
  $5 = {
    conversion: { webcodecs: 'WebCodecs' },
    copy: { error: '复制图像失败，请稍后重试', image: '复制图像', success: '图像已复制到剪贴板' },
    copying: '正在复制图像...',
    download: '下载图像',
    error: { loading: '图片加载失败' },
    live: {
      badge: '实况',
      converting: { detail: '正在使用 {{method}} 转换视频格式...', video: '正在转换实况照片视频' },
      playing: '正在播放实况照片',
      tooltip: {
        desktop: { main: '点击实况标识播放实况照片', zoom: '点击实况标识播放实况照片 / 双击缩放' },
        mobile: { main: '轻点实况标识播放实况照片', zoom: '轻点实况标识播放实况照片/双击以缩放' },
      },
    },
    reaction: { success: '点赞成功' },
    share: {
      actions: '操作',
      copy: { failed: '复制失败', link: '复制链接' },
      default: { title: '照片分享' },
      embed: { code: '嵌入代码', copied: '嵌入代码已复制到剪贴板', description: '复制此代码以在您的网站中嵌入照片' },
      link: { copied: '链接已复制到剪贴板' },
      social: { media: '社交媒体' },
      system: '系统分享',
      text: '看看这张漂亮的照片：{{title}}',
      title: '分享照片',
      weibo: '微博',
    },
    webgl: {
      creatingTexture: '正在创建纹理...',
      loadingImage: '正在加载图像...',
      unavailable: 'WebGL 不可用，无法渲染图像',
    },
    zoom: { hint: '双击或捏合缩放' },
  },
  F5 = { auto: '自动', columns: '{{count}} 列' },
  z5 = {
    codec: { keyword: '编码器' },
    conversion: {
      cached: { result: '使用缓存结果' },
      codec: { fallback: '找不到此分辨率支持的 MP4 编解码器。回退到 WebM。' },
      complete: '转换完成',
      converting: '转换中... {{current}}/{{total}} 帧',
      duration: { error: '无法确定视频时长或时长不是有限的。' },
      encoder: { error: '由于编码器错误，中止转换。' },
      failed: '视频转换失败',
      initializing: '正在初始化视频转换器...',
      loading: '正在加载视频文件...',
      starting: '开始转换...',
      transmux: {
        analyzing: '分析 MOV 结构...',
        converting: '转换容器格式...',
        creating: '创建 MP4 容器...',
        fetching: '获取视频文件...',
        high: { quality: '使用高质量转封装转换器...' },
        not: { supported: '此浏览器不支持转封装' },
        success: '转封装转换成功完成',
      },
      webcodecs: {
        high: { quality: '使用高质量 WebCodecs 转换器...' },
        not: { supported: '此浏览器不支持 WebCodecs' },
      },
    },
    format: {
      mov: { not: { supported: '浏览器不支持 MOV 格式，需要转换' }, supported: '浏览器原生支持 MOV 格式，跳过转换' },
    },
    'motion-photo': { extracting: '正在提取嵌入的视频...' },
  },
  V5 = {
    action: M5,
    date: k5,
    error: D5,
    exif: I5,
    explory: O5,
    gallery: N5,
    loading: L5,
    minimap: j5,
    photo: $5,
    slider: F5,
    video: z5,
  },
  B5 = {
    auto: '自動',
    camera: {
      clear: '清除',
      empty: '暫無相機',
      filter: '相機篩選',
      'not-found': '沒有相機符合您的搜尋',
      search: '搜尋相機',
    },
    columns: { setting: '欄位設定' },
    filter: { title: '篩選照片' },
    lens: {
      clear: '清除',
      empty: '暫無鏡頭',
      filter: '鏡頭篩選',
      'not-found': '沒有鏡頭符合您的搜尋',
      search: '搜尋鏡頭',
    },
    map: { explore: '地圖探索' },
    rating: {
      filter: '評分篩選',
      'filter-above': '顯示 {{rating}} 星及以上',
      'filter-all': '顯示所有照片',
      search: '搜尋評分',
    },
    search: {
      clear: '清除',
      filter: { 'no-results': '沒有匹配項', placeholder: '篩選項目...' },
      hint: '按檔案名稱、標籤、相機或鏡頭搜尋照片',
      'no-results': '未找到照片',
      placeholder: '搜尋照片...',
      preset: { all: '全部' },
      results: '找到 {{count}} 張照片',
      title: '搜尋照片',
      unified: { title: '搜尋和篩選' },
    },
    sort: { mode: '排序模式', newest: { first: '最新優先' }, oldest: { first: '最早優先' } },
    tag: {
      clear: '清除',
      empty: '暫無標籤',
      filter: '標籤篩選',
      mode: { and: 'AND', or: 'OR' },
      'not-found': '沒有標籤符合您的搜尋',
      search: '搜尋標籤',
    },
    view: { github: '查看 GitHub 倉庫', layout: '佈局', settings: '檢視設定', title: '檢視' },
  },
  U5 = {
    day: [
      null,
      '1 日',
      '2 日',
      '3 日',
      '4 日',
      '5 日',
      '6 日',
      '7 日',
      '8 日',
      '9 日',
      '10 日',
      '11 日',
      '12 日',
      '13 日',
      '14 日',
      '15 日',
      '16 日',
      '17 日',
      '18 日',
      '19 日',
      '20 日',
      '21 日',
      '22 日',
      '23 日',
      '24 日',
      '25 日',
      '26 日',
      '27 日',
      '28 日',
      '29 日',
      '30 日',
      '31 日',
    ],
    month: [null, '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '7月', '8月', '9月'],
  },
  W5 = {
    feedback: '仍然遇到此問題？請在 Github 中提供反饋，謝謝！',
    reload: '重新載入',
    submit: { issue: '提交問題' },
    temporary: { description: '應用程式出現臨時問題，點擊下面的按鈕嘗試重新載入應用程式或採用其他解決方案？' },
    title: '抱歉，應用程式遇到錯誤',
  },
  H5 = {
    aperture: { value: '光圈值' },
    artist: '藝術家',
    auto: { white: { balance: { grb: '自動白平衡 GRB' } } },
    basic: { info: '基本資訊' },
    blue: { adjustment: '藍色調整', color: { effect: '藍色效果' } },
    brightness: { title: '亮度', value: '亮度' },
    camera: '相機',
    capture: { mode: '拍攝模式', parameters: '拍攝參數', time: '拍攝時間' },
    clarity: '清晰度',
    color: { effect: '色彩效果', space: '色彩空間' },
    colorspace: { adobe: { rgb: 'Adobe RGB' }, srgb: 'sRGB', uncalibrated: '未校準' },
    contrast: { title: '對比度' },
    copyright: '版權',
    custom: { rendered: { normal: '正常處理', special: '自訂處理', type: '自訂渲染' } },
    device: { info: '裝置資訊' },
    digital: { zoom: '數位變焦' },
    dimensions: '尺寸',
    dynamic: { range: '動態範圍' },
    exposure: { mode: { auto: '自動曝光', bracket: '自動包圍', manual: '手動', title: '曝光模式' } },
    exposureprogram: {
      action: '運動模式',
      'aperture-priority': '光圈優先',
      'aperture-priority-ae': '光圈優先',
      creative: '創意模式',
      landscape: '風景模式',
      manual: '手動',
      normal: '正常',
      'not-defined': '未定義',
      portrait: '人像模式',
      'program-ae': '程式自動曝光',
      'shutter-priority': '快門優先',
      title: '曝光程式',
    },
    file: { size: '檔案大小' },
    filename: '檔案名',
    film: { mode: '膠片模式' },
    flash: {
      auto: {
        'no-return': '閃光燈開啟，自動模式，檢測不到反射光',
        no: { title: '關閉閃光燈，自動模式' },
        return: '閃光燈開啟，自動模式，檢測到反射光',
        yes: '閃光燈開啟，自動模式',
      },
      disabled: '閃光燈關閉',
      enabled: '閃光燈開啟',
      fired: '開啟',
      forced: {
        mode: '閃光燈開啟，強制閃光模式',
        no: { return: '閃光燈開啟，強制閃光模式，檢測不到反射光' },
        return: '閃光燈開啟，強制閃光模式，檢測到反射光',
      },
      metering: { mode: '閃光燈測光模式' },
      'no-flash': '關閉',
      no: { return: '閃光燈開啟，檢測不到反射光' },
      'off-did-not-fire': '關閉',
      off: { mode: '閃光燈關閉，強制關閉模式' },
      return: { detected: '閃光燈開啟，檢測到反射光' },
      title: '閃光燈',
      unavailable: '無閃光燈功能',
    },
    focal: { length: { actual: '焦距', equivalent: '35mm 等效' }, plane: { resolution: '焦平面解析度' } },
    format: '格式',
    fuji: { film: { simulation: '膠片模擬配方' } },
    'fujirecipe-colorchromeeffect': { off: '關閉', strong: '強', weak: '弱' },
    'fujirecipe-colorchromefxblue': { off: '關閉', strong: '強', weak: '弱' },
    'fujirecipe-dynamicrange': { standard: '標準' },
    'fujirecipe-graineffectroughness': { off: '關閉' },
    'fujirecipe-graineffectsize': { off: '關閉' },
    'fujirecipe-sharpness': { hard: '銳利', normal: '標準', soft: '柔和' },
    'fujirecipe-whitebalance': { auto: '自動', kelvin: '{{kelvin}}K' },
    gps: {
      altitude: '海拔',
      latitude: '緯度',
      location: { info: '位置信息', name: '位置名稱' },
      longitude: '經度',
      view: { map: '在高德地圖中查看' },
    },
    grain: { effect: { intensity: '顆粒效果強度', size: '顆粒效果大小' } },
    header: { title: '照片檢查器' },
    highlight: { ratio: '高光佔比', tone: '高光色調' },
    histogram: '直方圖',
    lens: '鏡頭',
    lensmake: '鏡頭製造商',
    light: {
      source: {
        auto: '自動',
        cloudy: '陰天',
        cool: { white: { fluorescent: '冷白螢光燈 (W 3900 – 4500K)' } },
        d50: 'D50',
        d55: 'D55',
        d65: 'D65',
        d75: 'D75',
        day: { white: { fluorescent: '日白螢光燈 (N 4600 – 5400K)' } },
        daylight: '日光',
        'daylight-fluorescent': '日光螢光燈 (D 5700 – 7100K)',
        fine: { weather: '晴天' },
        flash: '閃光燈',
        fluorescent: '螢光燈',
        iso: { tungsten: 'ISO 演播室鎢絲燈' },
        other: '其他光源',
        shade: '陰影',
        standard: { a: '標準光源 A', b: '標準光源 B', c: '標準光源 C' },
        tungsten: '鎢絲燈 (白熾燈)',
        type: '光源',
        unknown: '未知',
        white: { fluorescent: '白螢光燈 (WW 3200 – 3700K)' },
      },
    },
    max: { aperture: '最大光圈' },
    metering: {
      mode: {
        average: '平均',
        center: '中央重點平均測光',
        'center-weighted-average': '中央重點平均測光',
        multi: '多重測光',
        'multi-segment': '多重測光',
        partial: '部分',
        pattern: '圖案',
        spot: '點測光',
        type: '測光模式',
        unknown: '未知',
      },
    },
    noise: { reduction: '降噪' },
    not: { available: '不可用' },
    pixels: '像素',
    rating: '評分',
    raw: {
      category: {
        basic: '檔案資訊',
        camera: '相機資訊',
        datetime: '日期時間',
        exposure: '曝光設定',
        faceDetection: '人臉檢測',
        flash: '閃光燈與光源',
        focus: '對焦系統',
        fuji: '富士底片模擬',
        gps: 'GPS 資訊',
        imageProperties: '圖像屬性',
        lens: '鏡頭資訊',
        other: '其他元數據',
        technical: '技術參數',
        uncategorized: '未分類',
        video: '影片/HEIF 屬性',
        whiteBalance: '白平衡',
      },
      description: '從圖像檔案中提取的完整 EXIF 元數據',
      loading: '正在載入 EXIF 資料...',
      no: { data: '無 EXIF 數據' },
      parse: { error: '解析 EXIF 數據失敗' },
      title: '原始 EXIF 數據',
    },
    red: { adjustment: '紅色調整' },
    resolution: { unit: { cm: '厘米', inches: '英寸', none: '無單位' } },
    saturation: '飽和度',
    scene: { capture: { type: '場景捕獲類型' } },
    sensing: {
      method: {
        color: { sequential: { linear: '顏色順序線性感測器', main: '顏色順序區域感測器' } },
        'one-chip-color-area': '單晶片彩色區域感測器',
        one: { chip: '單晶片彩色區域感測器' },
        three: { chip: '三晶片彩色區域感測器' },
        trilinear: '三線性感測器',
        two: { chip: '雙晶片彩色區域感測器' },
        type: '感光方式',
        undefined: '未定義',
      },
    },
    shadow: { ratio: '陰影佔比', tone: '陰影色調' },
    sharpness: '銳度',
    shutter: { speed: { value: '快門速度' } },
    software: '軟件',
    standard: { white: { balance: { grb: '標準白平衡 GRB' } } },
    tags: '標籤',
    technical: { parameters: '技術參數' },
    time: { zone: '時區' },
    tone: { 'high-contrast': '高對比度', 'high-key': '高調', 'low-key': '低調', normal: '正常', type: '影調類型' },
    unknown: '未知',
    white: {
      balance: {
        auto: '自動',
        bias: '白平衡偏移',
        blue: '藍色',
        daylight: '日光',
        fine: { tune: '白平衡微調' },
        grb: '白平衡 GRB 等級',
        kelvin: '手動色溫',
        manual: '手動',
        red: '紅色',
        shift: { ab: '白平衡偏移 (琥珀色 - 藍色)', gm: '白平衡偏移 (綠色 - 洋紅色)' },
        title: '白平衡',
      },
    },
  },
  G5 = {
    back: { to: { gallery: '返回相簿' } },
    clear: { selection: '清除選擇' },
    cluster: {
      click: { details: '點擊查看詳情' },
      more: '更多',
      photos_one: '{{count}} 張照片',
      photos_other: '{{count}} 張照片',
    },
    controls: { compass: '重置方向', locate: '定位到我的位置', zoom: { in: '放大', out: '縮小' } },
    explore: { map: '探索地圖' },
    found: { locations: '發現了 {{count}} 個拍攝位置' },
    loading: { map: '載入地圖中...' },
    map: { error: { description: '請檢查網絡連接或刷新頁面重試', title: '地圖載入失敗' } },
    parsing: { location: '正在解析照片位置信息' },
    range: { separator: '至' },
    shooting: { range: '拍攝範圍：' },
  },
  Z5 = { built: { at: '建置於 ' }, photos_one: '{{count}} 張照片', photos_other: '{{count}} 張照片' },
  K5 = {
    converting: '轉換中...',
    default: '載入中',
    heic: { converting: '正在轉換 HEIC/HEIF 圖像格式...', main: 'HEIC' },
    queue: { waiting: '正在排隊等候轉換...' },
    webgl: { building: '正在建置高品質紋理...', main: 'WebGL 紋理載入' },
  },
  Y5 = { loading: '載入地圖中...', view: { in: { map: '在地圖中查看位置' } } },
  X5 = {
    conversion: { webcodecs: 'WebCodecs' },
    copy: { error: '複製圖像失敗，請稍後重試', image: '複製圖像', success: '圖像已複製到剪貼簿' },
    copying: '正在複製圖像...',
    download: '下載圖像',
    error: { loading: '圖片載入失敗' },
    live: {
      badge: '原況',
      converting: { detail: '正在使用 {{method}} 轉換影片格式...', video: '正在轉換原況照片影片' },
      playing: '正在播放原況照片',
      tooltip: {
        desktop: { main: '點擊原況標識播放原況照片', zoom: '點擊原況標識播放原況照片 / 輕按兩下縮放' },
        mobile: { main: '輕點原況標識播放原況照片', zoom: '輕點原況標識播放原況照片/雙擊以縮放' },
      },
    },
    share: {
      actions: '操作',
      copy: { failed: '複製失敗', link: '複製連結' },
      default: { title: '照片分享' },
      embed: { code: '嵌入代碼', copied: '嵌入代碼已複製到剪貼簿', description: '複製此代碼以在您的網站中嵌入照片' },
      link: { copied: '連結已複製到剪貼簿' },
      social: { media: '社交媒體' },
      system: '系統分享',
      text: '看看這張漂亮的照片：{{title}}',
      title: '分享照片',
      weibo: '微博',
    },
    webgl: { unavailable: 'WebGL 不可用，無法渲染圖像' },
    zoom: { hint: '雙擊或捏合縮放' },
  },
  q5 = { auto: '自動', columns: '{{count}} 列' },
  J5 = {
    codec: { keyword: '編碼器' },
    conversion: {
      cached: { result: '使用快取結果' },
      codec: { fallback: '找不到此解析度支援的 MP4 編解碼器。回退到 WebM。' },
      complete: '轉換完成',
      converting: '轉換中... {{current}}/{{total}} 幀',
      duration: { error: '無法確定影片時長或時長不是有限的。' },
      encoder: { error: '由於編碼器錯誤，中止轉換。' },
      failed: '影片轉換失敗',
      initializing: '正在初始化影片轉換器...',
      loading: '正在載入影片檔案...',
      starting: '開始轉換...',
      transmux: {
        analyzing: '分析 MOV 結構...',
        converting: '轉換容器格式...',
        creating: '建立 MP4 容器...',
        fetching: '取得影片檔案...',
        high: { quality: '使用高品質轉封裝轉換器...' },
        not: { supported: '此瀏覽器不支援轉封裝' },
        success: '轉封裝轉換成功完成',
      },
      webcodecs: {
        high: { quality: '使用高品質 WebCodecs 轉換器...' },
        not: { supported: '此瀏覽器不支援 WebCodecs' },
      },
    },
    format: {
      mov: { not: { supported: '瀏覽器不支援 MOV 格式，需要轉換' }, supported: '瀏覽器原生支援 MOV 格式，跳過轉換' },
    },
    'motion-photo': { extracting: '正在提取嵌入的影片...' },
  },
  Q5 = {
    action: B5,
    date: U5,
    error: W5,
    exif: H5,
    explory: G5,
    gallery: Z5,
    loading: K5,
    minimap: Y5,
    photo: X5,
    slider: q5,
    video: J5,
  },
  eF = {
    auto: '自動',
    camera: {
      clear: '清除',
      empty: '暫無相機',
      filter: '相機篩選',
      'not-found': '沒有相機符合您的搜尋',
      search: '搜尋相機',
    },
    columns: { setting: '欄位設定' },
    filter: { title: '篩選照片' },
    lens: {
      clear: '清除',
      empty: '暫無鏡頭',
      filter: '鏡頭篩選',
      'not-found': '沒有鏡頭符合您的搜尋',
      search: '搜尋鏡頭',
    },
    map: { explore: '地圖探索' },
    rating: {
      filter: '評分篩選',
      'filter-above': '顯示 {{rating}} 星及以上',
      'filter-all': '顯示所有照片',
      search: '搜尋評分',
    },
    search: {
      clear: '清除',
      filter: { 'no-results': '沒有匹配項', placeholder: '篩選項目...' },
      hint: '按檔案名稱、標籤、相機或鏡頭搜尋照片',
      'no-results': '未找到照片',
      placeholder: '搜尋照片...',
      preset: { all: '全部' },
      results: '找到 {{count}} 張照片',
      title: '搜尋照片',
      unified: { title: '搜尋和篩選' },
    },
    sort: { mode: '排序模式', newest: { first: '最新優先' }, oldest: { first: '最早優先' } },
    tag: {
      clear: '清除',
      empty: '暫無標籤',
      filter: '標籤篩選',
      mode: { and: 'AND', or: 'OR' },
      'not-found': '沒有標籤符合您的搜尋',
      search: '搜尋標籤',
    },
    view: { github: '檢視 GitHub 存放庫', layout: '佈局', settings: '檢視設定', title: '檢視' },
  },
  tF = {
    day: [
      null,
      '1 日',
      '2 日',
      '3 日',
      '4 日',
      '5 日',
      '6 日',
      '7 日',
      '8 日',
      '9 日',
      '10 日',
      '11 日',
      '12 日',
      '13 日',
      '14 日',
      '15 日',
      '16 日',
      '17 日',
      '18 日',
      '19 日',
      '20 日',
      '21 日',
      '22 日',
      '23 日',
      '24 日',
      '25 日',
      '26 日',
      '27 日',
      '28 日',
      '29 日',
      '30 日',
      '31 日',
    ],
    month: [null, '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },
  nF = {
    feedback: '仍然遇到此問題？請在 Github 中提供回饋，謝謝！',
    reload: '重新載入',
    submit: { issue: '提交問題' },
    temporary: { description: '應用程式出現臨時問題，點擊下面的按鈕嘗試重新載入應用程式或採用其他解決方案？' },
    title: '抱歉，應用程式遇到錯誤',
  },
  rF = {
    aperture: { value: '光圈值' },
    artist: '藝術家',
    auto: { white: { balance: { grb: '自動白平衡 GRB' } } },
    basic: { info: '基本資訊' },
    blue: { adjustment: '藍色調整', color: { effect: '藍色效果' } },
    brightness: { title: '亮度', value: '亮度' },
    camera: '相機',
    capture: { mode: '拍攝模式', parameters: '拍攝參數', time: '拍攝時間' },
    clarity: '清晰度',
    color: { effect: '色彩效果', space: '色彩空間' },
    colorspace: { adobe: { rgb: 'Adobe RGB' }, srgb: 'sRGB', uncalibrated: '未校準' },
    contrast: { title: '對比度' },
    copyright: '版權',
    custom: { rendered: { normal: '正常處理', special: '自訂處理', type: '自訂渲染' } },
    device: { info: '裝置資訊' },
    digital: { zoom: '數位變焦' },
    dimensions: '尺寸',
    dynamic: { range: '動態範圍' },
    exposure: { mode: { auto: '自動曝光', bracket: '自動包圍', manual: '手動', title: '曝光模式' } },
    exposureprogram: {
      action: '運動模式',
      'aperture-priority': '光圈優先',
      'aperture-priority-ae': '光圈優先',
      creative: '創意模式',
      landscape: '風景模式',
      manual: '手動',
      normal: '正常',
      'not-defined': '未定義',
      portrait: '人像模式',
      'program-ae': '程式自動曝光',
      'shutter-priority': '快門優先',
      title: '曝光程式',
    },
    file: { size: '檔案大小' },
    filename: '檔案名',
    film: { mode: '底片模式' },
    flash: {
      auto: {
        'no-return': '閃光燈開啟，自動模式，偵測不到反射光',
        no: { title: '關閉閃光燈，自動模式' },
        return: '閃光燈開啟，自動模式，偵測到反射光',
        yes: '閃光燈開啟，自動模式',
      },
      disabled: '閃光燈關閉',
      enabled: '閃光燈開啟',
      fired: '開啟',
      forced: {
        mode: '閃光燈開啟，強制閃光模式',
        no: { return: '閃光燈開啟，強制閃光模式，偵測不到反射光' },
        return: '閃光燈開啟，強制閃光模式，偵測到反射光',
      },
      metering: { mode: '閃光燈測光模式' },
      'no-flash': '關閉',
      no: { return: '閃光燈開啟，偵測不到反射光' },
      'off-did-not-fire': '關閉',
      off: { mode: '閃光燈關閉，強制關閉模式' },
      return: { detected: '閃光燈開啟，偵測到反射光' },
      title: '閃光燈',
      unavailable: '無閃光燈功能',
    },
    focal: { length: { actual: '焦距', equivalent: '35mm 等效' }, plane: { resolution: '焦平面解析度' } },
    format: '格式',
    fuji: { film: { simulation: '底片模擬配方' } },
    'fujirecipe-colorchromeeffect': { off: '關閉', strong: '強', weak: '弱' },
    'fujirecipe-colorchromefxblue': { off: '關閉', strong: '強', weak: '弱' },
    'fujirecipe-dynamicrange': { standard: '標準' },
    'fujirecipe-graineffectroughness': { off: '關閉' },
    'fujirecipe-graineffectsize': { off: '關閉' },
    'fujirecipe-sharpness': { hard: '銳利', normal: '標準', soft: '柔和' },
    'fujirecipe-whitebalance': { auto: '自動', kelvin: '{{kelvin}}K' },
    gps: {
      altitude: '海拔',
      latitude: '緯度',
      location: { info: '位置信息', name: '位置名稱' },
      longitude: '經度',
      view: { map: '在高德地圖中查看' },
    },
    grain: { effect: { intensity: '顆粒效果強度', size: '顆粒效果大小' } },
    header: { title: '照片檢查器' },
    highlight: { ratio: '高光佔比', tone: '高光色調' },
    histogram: '直方圖',
    lens: '鏡頭',
    lensmake: '鏡頭製造商',
    light: {
      source: {
        auto: '自動',
        cloudy: '陰天',
        cool: { white: { fluorescent: '冷白螢光燈 (W 3900 – 4500K)' } },
        d50: 'D50',
        d55: 'D55',
        d65: 'D65',
        d75: 'D75',
        day: { white: { fluorescent: '日白螢光燈 (N 4600 – 5400K)' } },
        daylight: '日光',
        'daylight-fluorescent': '日光螢光燈 (D 5700 – 7100K)',
        fine: { weather: '晴天' },
        flash: '閃光燈',
        fluorescent: '螢光燈',
        iso: { tungsten: 'ISO 演播室鎢絲燈' },
        other: '其他光源',
        shade: '陰影',
        standard: { a: '標準光源 A', b: '標準光源 B', c: '標準光源 C' },
        tungsten: '鎢絲燈 (白熾燈)',
        type: '光源',
        unknown: '未知',
        white: { fluorescent: '白螢光燈 (WW 3200 – 3700K)' },
      },
    },
    max: { aperture: '最大光圈' },
    metering: {
      mode: {
        average: '平均',
        center: '中央重點平均測光',
        'center-weighted-average': '中央重點平均測光',
        multi: '多重測光',
        'multi-segment': '多重測光',
        partial: '部分',
        pattern: '圖案',
        spot: '點測光',
        type: '測光模式',
        unknown: '未知',
      },
    },
    noise: { reduction: '降噪' },
    not: { available: '不可用' },
    pixels: '像素',
    raw: {
      category: {
        basic: '檔案資訊',
        camera: '相機資訊',
        datetime: '日期時間',
        exposure: '曝光設定',
        faceDetection: '人臉檢測',
        flash: '閃光燈與光源',
        focus: '對焦系統',
        fuji: '富士底片模擬',
        gps: 'GPS 資訊',
        imageProperties: '圖像屬性',
        lens: '鏡頭資訊',
        other: '其他元數據',
        technical: '技術參數',
        uncategorized: '未分類',
        video: '影片/HEIF 屬性',
        whiteBalance: '白平衡',
      },
      description: '從圖像檔案中提取的完整 EXIF 元數據',
      loading: '正在載入 EXIF 資料...',
      no: { data: '無 EXIF 數據' },
      parse: { error: '解析 EXIF 數據失敗' },
      title: '原始 EXIF 數據',
    },
    red: { adjustment: '紅色調整' },
    resolution: { unit: { cm: '公分', inches: '英寸', none: '無單位' } },
    saturation: '飽和度',
    scene: { capture: { type: '場景捕獲類型' } },
    sensing: {
      method: {
        color: { sequential: { linear: '顏色順序線性感測器', main: '顏色順序區域感測器' } },
        'one-chip-color-area': '單晶片彩色區域感測器',
        one: { chip: '單晶片彩色區域感測器' },
        three: { chip: '三晶片彩色區域感測器' },
        trilinear: '三線性感測器',
        two: { chip: '雙晶片彩色區域感測器' },
        type: '感光方式',
        undefined: '未定義',
      },
    },
    shadow: { ratio: '陰影佔比', tone: '陰影色調' },
    sharpness: '銳度',
    shutter: { speed: { value: '快門速度' } },
    software: '軟體',
    standard: { white: { balance: { grb: '標準白平衡 GRB' } } },
    tags: '標籤',
    technical: { parameters: '技術參數' },
    time: { zone: '時區' },
    tone: { 'high-contrast': '高對比度', 'high-key': '高調', 'low-key': '低調', normal: '正常', type: '影調類型' },
    unknown: '未知',
    white: {
      balance: {
        auto: '自動',
        bias: '白平衡偏移',
        blue: '藍色',
        daylight: '日光',
        fine: { tune: '白平衡微調' },
        grb: '白平衡 GRB 等級',
        kelvin: '手動色溫',
        manual: '手動',
        red: '紅色',
        shift: { ab: '白平衡偏移 (琥珀色 - 藍色)', gm: '白平衡偏移 (綠色 - 洋紅色)' },
        title: '白平衡',
      },
    },
  },
  oF = {
    back: { to: { gallery: '返回相簿' } },
    clear: { selection: '清除選擇' },
    cluster: {
      click: { details: '點擊查看詳情' },
      more: '更多',
      photos_one: '{{count}} 張照片',
      photos_other: '{{count}} 張照片',
    },
    controls: { compass: '重置方向', locate: '定位到我的位置', zoom: { in: '放大', out: '縮小' } },
    explore: { map: '探索地圖' },
    found: { locations: '發現了 {{count}} 個拍攝位置' },
    loading: { map: '載入地圖中...' },
    map: { error: { description: '請檢查網路連線或重新整理頁面重試', title: '地圖載入失敗' } },
    parsing: { location: '正在解析照片位置資訊' },
    range: { separator: '至' },
    shooting: { range: '拍攝範圍：' },
  },
  iF = { built: { at: '建置於 ' }, photos_one: '{{count}} 張照片', photos_other: '{{count}} 張照片' },
  sF = {
    converting: '轉換中...',
    default: '載入中',
    heic: { converting: '正在轉換 HEIC/HEIF 圖像格式...', main: 'HEIC' },
    queue: { waiting: '正在排隊等待轉換...' },
    webgl: { building: '正在建置高品質紋理...', main: 'WebGL 紋理載入' },
  },
  aF = { loading: '載入地圖中...', view: { in: { map: '在地圖中查看位置' } } },
  lF = {
    conversion: { webcodecs: 'WebCodecs' },
    copy: { error: '複製圖像失敗，請稍後重試', image: '複製圖像', success: '圖像已複製到剪貼簿' },
    copying: '正在複製圖像...',
    download: '下載圖像',
    error: { loading: '圖片載入失敗' },
    live: {
      badge: '原況',
      converting: { detail: '正在使用 {{method}} 轉換影片格式...', video: '正在轉換原況照片影片' },
      playing: '正在播放原況照片',
      tooltip: {
        desktop: { main: '點擊原況標識播放原況照片', zoom: '點擊原況標識播放原況照片 / 輕按兩下縮放' },
        mobile: { main: '輕點原況標識播放原況照片', zoom: '輕點原況標識播放原況照片/雙擊以縮放' },
      },
    },
    share: {
      actions: '操作',
      copy: { failed: '複製失敗', link: '複製連結' },
      default: { title: '照片分享' },
      embed: { code: '嵌入代碼', copied: '嵌入代碼已複製到剪貼簿', description: '複製此代碼以在您的網站中嵌入照片' },
      link: { copied: '連結已複製到剪貼簿' },
      social: { media: '社群媒體' },
      system: '系統分享',
      text: '看看這張漂亮的照片：{{title}}',
      title: '分享照片',
      weibo: '微博',
    },
    webgl: { unavailable: 'WebGL 不可用，無法渲染圖像' },
    zoom: { hint: '雙擊或捏合縮放' },
  },
  cF = { auto: '自動', columns: '{{count}} 列' },
  uF = {
    codec: { keyword: '編碼器' },
    conversion: {
      cached: { result: '使用快取結果' },
      codec: { fallback: '找不到此解析度支援的 MP4 編解碼器。回退到 WebM。' },
      complete: '轉換完成',
      converting: '轉換中... {{current}}/{{total}} 幀',
      duration: { error: '無法確定影片時長或時長不是有限的。' },
      encoder: { error: '由於編碼器錯誤，中止轉換。' },
      failed: '影片轉換失敗',
      initializing: '正在初始化影片轉換器...',
      loading: '正在載入影片檔案...',
      starting: '開始轉換...',
      transmux: {
        analyzing: '分析 MOV 結構...',
        converting: '轉換容器格式...',
        creating: '建立 MP4 容器...',
        fetching: '取得影片檔案...',
        high: { quality: '使用高品質轉封裝轉換器...' },
        not: { supported: '此瀏覽器不支援轉封裝' },
        success: '轉封裝轉換成功完成',
      },
      webcodecs: {
        high: { quality: '使用高品質 WebCodecs 轉換器...' },
        not: { supported: '此瀏覽器不支援 WebCodecs' },
      },
    },
    format: {
      mov: { not: { supported: '瀏覽器不支援 MOV 格式，需要轉換' }, supported: '瀏覽器原生支援 MOV 格式，跳過轉換' },
    },
    'motion-photo': { extracting: '正在提取嵌入的影片...' },
  },
  dF = {
    action: eF,
    date: tF,
    error: nF,
    exif: rF,
    explory: oF,
    gallery: iF,
    loading: sF,
    minimap: aF,
    photo: lF,
    slider: cF,
    video: uF,
  },
  fF = {
    en: { app: i5 },
    'zh-CN': { app: V5 },
    'zh-HK': { app: Q5 },
    jp: { app: y5 },
    ko: { app: _5 },
    'zh-TW': { app: dF },
  },
  Ww = Yw.createInstance()
Ww.use(Xw)
  .use(qw)
  .init({ fallbackLng: { default: ['en'] }, defaultNS: 'app', resources: fF })
const Hw = Et(Ww),
  fz = () => kr.get(Hw),
  hF = ({ children: e }) => {
    const [t, n] = Un(Hw)
    return g.jsx(Jw, { i18n: t, children: e })
  },
  [hz, , , , pz, pF] = uc(
    Et({
      params: {},
      searchParams: new URLSearchParams(),
      location: { pathname: '', search: '', hash: '', state: null, key: '' },
    }),
  ),
  [, , , , mz, mF] = uc(Et({ fn() {} }))
window.router = { navigate() {} }
const gF = () => {
    const e = de.c(6),
      [t] = f1(),
      n = g0(),
      r = jo(),
      o = qt()
    let i, s
    return (
      e[0] !== o || e[1] !== r || e[2] !== n || e[3] !== t
        ? ((i = () => {
            ;((window.router.navigate = r), pF({ params: n, searchParams: t, location: o }), mF({ fn: r }))
          }),
          (s = [t, n, o, r]),
          (e[0] = o),
          (e[1] = r),
          (e[2] = n),
          (e[3] = t),
          (e[4] = i),
          (e[5] = s))
        : ((i = e[4]), (s = e[5])),
      f.useLayoutEffect(i, s),
      null
    )
  },
  yF = (e) => {
    const t = de.c(8),
      { children: n } = e
    let r, o, i
    t[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((r = g.jsx(G$, {})), (o = g.jsx(gF, {})), (i = g.jsx(N$, {})), (t[0] = r), (t[1] = o), (t[2] = i))
      : ((r = t[0]), (o = t[1]), (i = t[2]))
    let s
    t[3] !== n
      ? ((s = g.jsx(iM, {
          transition: Fo.presets.smooth,
          children: g.jsxs(TS, { store: kr, children: [r, o, i, g.jsx(hF, { children: n })] }),
        })),
        (t[3] = n),
        (t[4] = s))
      : (s = t[4])
    let a
    t[5] === Symbol.for('react.memo_cache_sentinel') ? ((a = g.jsx(i$, {})), (t[5] = a)) : (a = t[5])
    let l
    return (
      t[6] !== s
        ? ((l = g.jsxs(nM, { features: O2, strict: !0, children: [s, a] }, 'framer')), (t[6] = s), (t[7] = l))
        : (l = t[7]),
      l
    )
  }
function vF() {
  return (
    f.useEffect(() => {
      mn(() => import('./index-CXUG0M6S.js'), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
    }, []),
    g.jsx(yF, {
      children: g.jsxs('div', { className: 'overflow-hidden lg:h-svh', children: [g.jsx(O0, {}), g.jsx(bF, {})] }),
    })
  )
}
const bF = () => {
    const e = de.c(5),
      { isOpen: t, setIsOpen: n } = HT()
    let r
    e[0] !== n ? ((r = () => n(!1)), (e[0] = n), (e[1] = r)) : (r = e[1])
    let o
    return (
      e[2] !== t || e[3] !== r
        ? ((o = g.jsx(WT, { isOpen: t, onClose: r })), (e[2] = t), (e[3] = r), (e[4] = o))
        : (o = e[4]),
      o
    )
  },
  wF = { url: 'https://github.com/Jackyhq/Afilmory' }
function xF() {
  const e = yp(),
    t = Ar(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null
  f.useEffect(() => {
    console.error('Error handled by React Router default ErrorBoundary:', e)
  }, [e])
  const r = f.useRef(!1)
  return t.startsWith('Failed to fetch dynamically imported module') && window.sessionStorage.getItem('reload') !== '1'
    ? (r.current || (window.sessionStorage.setItem('reload', '1'), window.location.reload(), (r.current = !0)), null)
    : g.jsxs('div', {
        className: 'flex min-h-screen flex-col',
        children: [
          g.jsx('div', { className: 'h-16' }),
          g.jsx('div', {
            className: 'flex flex-1 items-center justify-center px-6',
            children: g.jsxs('div', {
              className: 'w-full max-w-lg',
              children: [
                g.jsxs('div', {
                  className: 'mb-8 text-center',
                  children: [
                    g.jsx('div', {
                      className:
                        'bg-background-secondary mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full',
                      children: g.jsx('svg', {
                        className: 'text-red h-8 w-8',
                        fill: 'none',
                        viewBox: '0 0 24 24',
                        strokeWidth: 1.5,
                        stroke: 'currentColor',
                        children: g.jsx('path', {
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                          d: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
                        }),
                      }),
                    }),
                    g.jsx('h1', { className: 'text-text mb-2 text-3xl font-medium', children: 'Something went wrong' }),
                    g.jsx('p', {
                      className: 'text-text-secondary text-lg',
                      children: 'We encountered an unexpected error',
                    }),
                  ],
                }),
                g.jsx('div', {
                  className: 'bg-material-medium border-fill-tertiary mb-6 rounded-lg border p-4',
                  children: g.jsx('p', { className: 'text-text-secondary font-mono text-sm break-words', children: t }),
                }),
                !1,
                g.jsxs('div', {
                  className: 'mb-8 flex flex-col gap-3 sm:flex-row',
                  children: [
                    g.jsx(ns, {
                      onClick: () => (window.location.href = '/'),
                      className:
                        'bg-material-opaque text-text-vibrant hover:bg-control-enabled/90 h-10 flex-1 border-0 font-medium transition-colors',
                      children: 'Reload Application',
                    }),
                    g.jsx(ns, {
                      onClick: () => window.history.back(),
                      className:
                        'bg-material-thin text-text border-fill-tertiary hover:bg-fill-tertiary h-10 flex-1 border font-medium transition-colors',
                      children: 'Go Back',
                    }),
                  ],
                }),
                g.jsxs('div', {
                  className: 'text-center',
                  children: [
                    g.jsx('p', {
                      className: 'text-text-secondary mb-3 text-sm',
                      children: 'If this problem persists, please report it to our team.',
                    }),
                    g.jsxs('a', {
                      href: `${wF.url}/issues/new?title=${encodeURIComponent(`Error: ${t}`)}&body=${encodeURIComponent(`### Error

${t}

### Stack

\`\`\`
${n}
\`\`\``)}&label=bug`,
                      target: '_blank',
                      rel: 'noreferrer',
                      className:
                        'text-text-secondary hover:text-text inline-flex items-center text-sm transition-colors',
                      children: [
                        g.jsx('svg', {
                          className: 'mr-2 h-4 w-4',
                          fill: 'currentColor',
                          viewBox: '0 0 24 24',
                          children: g.jsx('path', {
                            d: 'M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
                          }),
                        }),
                        'Report on GitHub',
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
}
const SF = () => {
    const e = de.c(8),
      t = qt(),
      n = jo()
    let r
    e[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((r = g.jsx('p', {
          className: 'font-semibold',
          children: 'You have come to a desert of knowledge where there is nothing.',
        })),
        (e[0] = r))
      : (r = e[0])
    let o
    e[1] !== t.pathname
      ? ((o = g.jsxs('p', { children: ['Current path: ', g.jsx('code', { children: t.pathname })] })),
        (e[1] = t.pathname),
        (e[2] = o))
      : (o = e[2])
    let i
    e[3] !== n
      ? ((i = g.jsx('p', { children: g.jsx(ns, { onClick: () => n('/'), children: 'Back to Home' }) })),
        (e[3] = n),
        (e[4] = i))
      : (i = e[4])
    let s
    return (
      e[5] !== o || e[6] !== i
        ? ((s = g.jsx('div', {
            className: 'prose center dark:prose-invert m-auto size-full flex-col',
            children: g.jsxs('main', {
              className: 'flex grow flex-col items-center justify-center',
              children: [r, o, i],
            }),
          })),
          (e[5] = o),
          (e[6] = i),
          (e[7] = s))
        : (s = e[7]),
      s
    )
  },
  Yh = '(main)'
function CF(e) {
  const t = {}
  return (
    e.forEach((n) => {
      const o = n.replace('./pages/', '').replace('.tsx', '').split('/')
      let i = t
      for (const s of o) (i[s] || (i[s] = {}), (i = i[s]))
    }),
    t
  )
}
function EF(e) {
  const t = Object.keys(e),
    n = CF(t),
    r = new Set(),
    o = []
  function i(s, a, l, c = '') {
    const u = Object.keys(l)
    ;(u.sort((h, p) =>
      h === 'layout' ? -1 : p === 'layout' || h === 'index' ? 1 : p === 'index' ? -1 : h.localeCompare(p),
    ),
      u.sort((h, p) => (h.startsWith('(') && h.endsWith(')') ? 1 : p.startsWith('(') && p.endsWith(')') ? -1 : 0)))
    const d = u.indexOf(Yh)
    d !== -1 && (u.splice(d, 1), u.unshift(Yh))
    for (const h of u) {
      const p = h.startsWith('(') && h.endsWith(')'),
        m = s + h
      if (p) {
        const y = `${m}/layout.tsx`,
          v = ho(e, y) || (() => g.Fragment)
        ;(r.has(y) && console.error(`duplicate path: ${y}`), r.add(y))
        const w = []
        ;(i(`${m}/`, w, l[h], c), a.push({ path: '', lazy: v, children: w, handle: { fs: m, fullPath: c } }))
      } else if (h === 'layout') {
        if (s.endsWith(')/')) continue
        const y = `${m}.tsx`,
          v = ho(e, y),
          w = []
        ;(i(s, w, mC(l, 'layout'), c), a.push({ path: '', lazy: v, children: w, handle: { fs: m, fullPath: c } }))
        break
      } else {
        const y = l[h],
          v = Object.keys(y).length > 0,
          w = PF(h)
        if (v) {
          const b = [],
            x = `${c}/${w}`
          ;(i(`${m}/`, b, l[h], x), a.push({ path: w, children: b, handle: { fs: `${m}/${w}`, fullPath: x } }))
        } else {
          const b = `${m}.tsx`,
            x = ho(e, b)
          ;(r.has(`${m}.tsx`) && console.error(`duplicate path: ${b}`),
            r.add(b),
            a.push({ path: w, lazy: x, handle: { fs: `${m}/${w}`, fullPath: `${c}/${w}` } }))
        }
      }
    }
  }
  return (i('./pages/', o, n), o)
}
const PF = (e) => (e === 'index' ? '' : e.startsWith('[') && e.endsWith(']') ? `:${e.slice(1, -1)}` : e),
  RF = Object.assign({
    './pages/(data)/manifest.tsx': () => mn(() => import('./manifest-D9ig2Y_5.js'), __vite__mapDeps([11, 1, 8])),
    './pages/(debug)/blurhash.tsx': () => mn(() => import('./blurhash-DU-ebuZf.js'), __vite__mapDeps([12, 1, 5, 8])),
    './pages/(debug)/iframe.tsx': () => mn(() => import('./iframe-DRoDFn9t.js'), __vite__mapDeps([13, 1, 8])),
    './pages/(debug)/webgl-preview.tsx': () =>
      mn(() => import('./webgl-preview-C4jzABpz.js'), __vite__mapDeps([14, 1, 9, 8])),
    './pages/(main)/layout.tsx': () => mn(() => import('./layout-Djl0gVHJ.js'), __vite__mapDeps([15, 1, 6, 7, 8, 5])),
    './pages/(main)/photos/[photoId]/index.tsx': () =>
      mn(() => import('./index-CXUG0M6S.js'), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])),
    './pages/explory/index.tsx': () => mn(() => import('./index-DDsl4UBi.js'), __vite__mapDeps([16, 1, 8])),
  }),
  TF = EF(RF),
  AF = i1([
    { path: '/', element: g.jsx(vF, {}), children: TF, errorElement: g.jsx(xF, {}) },
    { path: '*', element: g.jsx(SF, {}) },
  ])
Zw.createRoot(document.querySelector('#root')).render(g.jsx(k0, { router: AF }))
export {
  me as $,
  jS as A,
  ns as B,
  LS as C,
  em as D,
  aC as E,
  Am as F,
  Ae as G,
  OL as H,
  Br as I,
  Re as J,
  Fo as K,
  tM as L,
  Cb as M,
  Gp as N,
  Sb as O,
  ZN as P,
  cc as Q,
  HN as R,
  nz as S,
  QF as T,
  SL as U,
  JF as V,
  Un as W,
  _S as X,
  jo as Y,
  sC as Z,
  jt as _,
  qp as a,
  zs as a$,
  Be as a0,
  Ye as a1,
  FT as a2,
  jF as a3,
  wF as a4,
  zF as a5,
  zT as a6,
  oc as a7,
  WF as a8,
  VF as a9,
  kF as aA,
  mn as aB,
  Cp as aC,
  DF as aD,
  YF as aE,
  XF as aF,
  XN as aG,
  qN as aH,
  JN as aI,
  QN as aJ,
  iz as aK,
  HF as aL,
  U2 as aM,
  O$ as aN,
  Bw as aO,
  xn as aP,
  dz as aQ,
  OT as aR,
  OC as aS,
  ou as aT,
  jb as aU,
  qF as aV,
  Ib as aW,
  Ob as aX,
  Hu as aY,
  SF as aZ,
  KF as a_,
  UF as aa,
  BF as ab,
  lc as ac,
  g0 as ad,
  f1 as ae,
  qt as af,
  O0 as ag,
  $F as ah,
  FF as ai,
  WA as aj,
  qe as ak,
  Bc as al,
  Es as am,
  Dr as an,
  Ro as ao,
  Sn as ap,
  Sf as aq,
  ak as ar,
  YM as as,
  j_ as at,
  KN as au,
  lz as av,
  R$ as aw,
  az as ax,
  kr as ay,
  Hw as az,
  Qp as b,
  Et as b0,
  H$ as b1,
  fz as b2,
  ez as b3,
  tz as b4,
  IL as b5,
  pc as c,
  NS as d,
  OF as e,
  IF as f,
  Xp as g,
  VS as h,
  FS as i,
  XS as j,
  YS as k,
  LF as l,
  KS as m,
  Jp as n,
  zS as o,
  _r as p,
  ZS as q,
  IS as r,
  OS as s,
  GS as t,
  NF as u,
  HS as v,
  WS as w,
  US as x,
  BS as y,
  $S as z,
}
