import { r as je, h as ot, c as at } from '../vendor/1-CkNOVE2J.js'
import { b0 as st, ac as ct, b1 as ft, ay as ee, az as te, aB as Ve, b2 as $e, a3 as oe } from './index-xtYrjsCW.js'
import { B as lt, v as ut } from '../vendor/0-BOriIG77.js'
const mt = {},
  ae = (i, e, t) => (e.has(t) ? e : e.set(t, i())).get(t),
  dt = new WeakMap(),
  ht = (i, e, t, r) => {
    const n = ae(() => new WeakMap(), dt, e),
      o = ae(() => new WeakMap(), n, t)
    return ae(i, o, r)
  }
function pt(i, e, t = Object.is) {
  return ht(
    () => {
      const r = Symbol(),
        n = ([a, u]) => {
          if (u === r) return e(a)
          const l = e(a, u)
          return t(u, l) ? u : l
        },
        o = st((a) => {
          const u = a(o),
            l = a(i)
          return n([l, u])
        })
      return ((o.init = r), o)
    },
    i,
    e,
    t,
  )
}
const xt = (i) => typeof i?.then == 'function'
function gt(
  i = () => {
    try {
      return window.localStorage
    } catch (t) {
      ;(mt ? 'production' : void 0) !== 'production' && typeof window < 'u' && console.warn(t)
      return
    }
  },
  e,
) {
  var t
  let r, n
  const o = {
      getItem: (l, f) => {
        var c, s
        const m = (h) => {
            if (((h = h || ''), r !== h)) {
              try {
                n = JSON.parse(h, e?.reviver)
              } catch {
                return f
              }
              r = h
            }
            return n
          },
          d = (s = (c = i()) == null ? void 0 : c.getItem(l)) != null ? s : null
        return xt(d) ? d.then(m) : m(d)
      },
      setItem: (l, f) => {
        var c
        return (c = i()) == null ? void 0 : c.setItem(l, JSON.stringify(f, void 0))
      },
      removeItem: (l) => {
        var f
        return (f = i()) == null ? void 0 : f.removeItem(l)
      },
    },
    a = (l) => (f, c, s) =>
      l(f, (m) => {
        let d
        try {
          d = JSON.parse(m || '')
        } catch {
          d = s
        }
        c(d)
      })
  let u
  try {
    u = (t = i()) == null ? void 0 : t.subscribe
  } catch {}
  return (
    !u &&
      typeof window < 'u' &&
      typeof window.addEventListener == 'function' &&
      window.Storage &&
      (u = (l, f) => {
        if (!(i() instanceof window.Storage)) return () => {}
        const c = (s) => {
          s.storageArea === i() && s.key === l && f(s.newValue)
        }
        return (
          window.addEventListener('storage', c),
          () => {
            window.removeEventListener('storage', c)
          }
        )
      }),
    u && (o.subscribe = a(u)),
    o
  )
}
gt()
const Ee = (i) => Symbol.iterator in i,
  ze = (i) => 'entries' in i,
  Me = (i, e) => {
    const t = i instanceof Map ? i : new Map(i.entries()),
      r = e instanceof Map ? e : new Map(e.entries())
    if (t.size !== r.size) return !1
    for (const [n, o] of t) if (!r.has(n) || !Object.is(o, r.get(n))) return !1
    return !0
  },
  vt = (i, e) => {
    const t = i[Symbol.iterator](),
      r = e[Symbol.iterator]()
    let n = t.next(),
      o = r.next()
    for (; !n.done && !o.done; ) {
      if (!Object.is(n.value, o.value)) return !1
      ;((n = t.next()), (o = r.next()))
    }
    return !!n.done && !!o.done
  }
function wt(i, e) {
  return Object.is(i, e)
    ? !0
    : typeof i != 'object' ||
        i === null ||
        typeof e != 'object' ||
        e === null ||
        Object.getPrototypeOf(i) !== Object.getPrototypeOf(e)
      ? !1
      : Ee(i) && Ee(e)
        ? ze(i) && ze(e)
          ? Me(i, e)
          : vt(i, e)
        : Me({ entries: () => Object.entries(i) }, { entries: () => Object.entries(e) })
}
const yt = (i) =>
    ct(
      pt(
        ft,
        je.useCallback((e) => i(e), []),
        wt,
      ),
    ),
  Ni = () => yt(bt)
function bt(i) {
  return i.w < 1024 && i.w !== 0
}
const _i = (i) => (i && i.split('.').pop()?.toUpperCase()) || 'UNKNOWN',
  pe = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
  Hi =
    typeof window > 'u'
      ? !1
      : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        'ontouchstart' in window
var G = {}
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ var Te
function kt() {
  return (
    Te ||
      ((Te = 1),
      (G.read = function (i, e, t, r, n) {
        var o,
          a,
          u = n * 8 - r - 1,
          l = (1 << u) - 1,
          f = l >> 1,
          c = -7,
          s = t ? n - 1 : 0,
          m = t ? -1 : 1,
          d = i[e + s]
        for (s += m, o = d & ((1 << -c) - 1), d >>= -c, c += u; c > 0; o = o * 256 + i[e + s], s += m, c -= 8);
        for (a = o & ((1 << -c) - 1), o >>= -c, c += r; c > 0; a = a * 256 + i[e + s], s += m, c -= 8);
        if (o === 0) o = 1 - f
        else {
          if (o === l) return a ? NaN : (d ? -1 : 1) * (1 / 0)
          ;((a = a + Math.pow(2, r)), (o = o - f))
        }
        return (d ? -1 : 1) * a * Math.pow(2, o - r)
      }),
      (G.write = function (i, e, t, r, n, o) {
        var a,
          u,
          l,
          f = o * 8 - n - 1,
          c = (1 << f) - 1,
          s = c >> 1,
          m = n === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          d = r ? 0 : o - 1,
          h = r ? 1 : -1,
          y = e < 0 || (e === 0 && 1 / e < 0) ? 1 : 0
        for (
          e = Math.abs(e),
            isNaN(e) || e === 1 / 0
              ? ((u = isNaN(e) ? 1 : 0), (a = c))
              : ((a = Math.floor(Math.log(e) / Math.LN2)),
                e * (l = Math.pow(2, -a)) < 1 && (a--, (l *= 2)),
                a + s >= 1 ? (e += m / l) : (e += m * Math.pow(2, 1 - s)),
                e * l >= 2 && (a++, (l /= 2)),
                a + s >= c
                  ? ((u = 0), (a = c))
                  : a + s >= 1
                    ? ((u = (e * l - 1) * Math.pow(2, n)), (a = a + s))
                    : ((u = e * Math.pow(2, s - 1) * Math.pow(2, n)), (a = 0)));
          n >= 8;
          i[t + d] = u & 255, d += h, u /= 256, n -= 8
        );
        for (a = (a << n) | u, f += n; f > 0; i[t + d] = a & 255, d += h, a /= 256, f -= 8);
        i[t + d - h] |= y * 128
      })),
    G
  )
}
kt()
function k(i) {
  return new DataView(i.buffer, i.byteOffset)
}
const Ct = {
    len: 1,
    get(i, e) {
      return k(i).getUint8(e)
    },
    put(i, e, t) {
      return (k(i).setUint8(e, t), e + 1)
    },
  },
  g = {
    len: 2,
    get(i, e) {
      return k(i).getUint16(e, !0)
    },
    put(i, e, t) {
      return (k(i).setUint16(e, t, !0), e + 2)
    },
  },
  H = {
    len: 2,
    get(i, e) {
      return k(i).getUint16(e)
    },
    put(i, e, t) {
      return (k(i).setUint16(e, t), e + 2)
    },
  },
  w = {
    len: 4,
    get(i, e) {
      return k(i).getUint32(e, !0)
    },
    put(i, e, t) {
      return (k(i).setUint32(e, t, !0), e + 4)
    },
  },
  Ft = {
    len: 4,
    get(i, e) {
      return k(i).getUint32(e)
    },
    put(i, e, t) {
      return (k(i).setUint32(e, t), e + 4)
    },
  },
  St = {
    len: 4,
    get(i, e) {
      return k(i).getInt32(e)
    },
    put(i, e, t) {
      return (k(i).setInt32(e, t), e + 4)
    },
  },
  Bt = {
    len: 8,
    get(i, e) {
      return k(i).getBigUint64(e, !0)
    },
    put(i, e, t) {
      return (k(i).setBigUint64(e, t, !0), e + 8)
    },
  }
class I {
  constructor(e, t) {
    ;((this.len = e), (this.encoding = t), (this.textDecoder = new TextDecoder(t)))
  }
  get(e, t) {
    return this.textDecoder.decode(e.subarray(t, t + this.len))
  }
}
const Et = 'End-Of-Stream'
class B extends Error {
  constructor() {
    ;(super(Et), (this.name = 'EndOfStreamError'))
  }
}
class zt extends Error {
  constructor(e = 'The operation was aborted') {
    ;(super(e), (this.name = 'AbortError'))
  }
}
class Ne {
  constructor() {
    ;((this.endOfStream = !1), (this.interrupted = !1), (this.peekQueue = []))
  }
  async peek(e, t = !1) {
    const r = await this.read(e, t)
    return (this.peekQueue.push(e.subarray(0, r)), r)
  }
  async read(e, t = !1) {
    if (e.length === 0) return 0
    let r = this.readFromPeekBuffer(e)
    if ((this.endOfStream || (r += await this.readRemainderFromStream(e.subarray(r), t)), r === 0 && !t)) throw new B()
    return r
  }
  readFromPeekBuffer(e) {
    let t = e.length,
      r = 0
    for (; this.peekQueue.length > 0 && t > 0; ) {
      const n = this.peekQueue.pop()
      if (!n) throw new Error('peekData should be defined')
      const o = Math.min(n.length, t)
      ;(e.set(n.subarray(0, o), r), (r += o), (t -= o), o < n.length && this.peekQueue.push(n.subarray(o)))
    }
    return r
  }
  async readRemainderFromStream(e, t) {
    let r = 0
    for (; r < e.length && !this.endOfStream; ) {
      if (this.interrupted) throw new zt()
      const n = await this.readFromStream(e.subarray(r), t)
      if (n === 0) break
      r += n
    }
    if (!t && r < e.length) throw new B()
    return r
  }
}
class Mt extends Ne {
  constructor(e) {
    ;(super(), (this.reader = e))
  }
  async abort() {
    return this.close()
  }
  async close() {
    this.reader.releaseLock()
  }
}
class Tt extends Mt {
  async readFromStream(e, t) {
    if (e.length === 0) return 0
    const r = await this.reader.read(new Uint8Array(e.length), { min: t ? void 0 : e.length })
    return (r.done && (this.endOfStream = r.done), r.value ? (e.set(r.value), r.value.length) : 0)
  }
}
class Ie extends Ne {
  constructor(e) {
    ;(super(), (this.reader = e), (this.buffer = null))
  }
  writeChunk(e, t) {
    const r = Math.min(t.length, e.length)
    return (e.set(t.subarray(0, r)), r < t.length ? (this.buffer = t.subarray(r)) : (this.buffer = null), r)
  }
  async readFromStream(e, t) {
    if (e.length === 0) return 0
    let r = 0
    for (this.buffer && (r += this.writeChunk(e, this.buffer)); r < e.length && !this.endOfStream; ) {
      const n = await this.reader.read()
      if (n.done) {
        this.endOfStream = !0
        break
      }
      n.value && (r += this.writeChunk(e.subarray(r), n.value))
    }
    if (!t && r === 0 && this.endOfStream) throw new B()
    return r
  }
  abort() {
    return ((this.interrupted = !0), this.reader.cancel())
  }
  async close() {
    ;(await this.abort(), this.reader.releaseLock())
  }
}
function It(i) {
  try {
    const e = i.getReader({ mode: 'byob' })
    return e instanceof ReadableStreamDefaultReader ? new Ie(e) : new Tt(e)
  } catch (e) {
    if (e instanceof TypeError) return new Ie(i.getReader())
    throw e
  }
}
class _e {
  constructor(e) {
    ;((this.numBuffer = new Uint8Array(8)),
      (this.position = 0),
      (this.onClose = e?.onClose),
      e?.abortSignal &&
        e.abortSignal.addEventListener('abort', () => {
          this.abort()
        }))
  }
  async readToken(e, t = this.position) {
    const r = new Uint8Array(e.len)
    if ((await this.readBuffer(r, { position: t })) < e.len) throw new B()
    return e.get(r, 0)
  }
  async peekToken(e, t = this.position) {
    const r = new Uint8Array(e.len)
    if ((await this.peekBuffer(r, { position: t })) < e.len) throw new B()
    return e.get(r, 0)
  }
  async readNumber(e) {
    if ((await this.readBuffer(this.numBuffer, { length: e.len })) < e.len) throw new B()
    return e.get(this.numBuffer, 0)
  }
  async peekNumber(e) {
    if ((await this.peekBuffer(this.numBuffer, { length: e.len })) < e.len) throw new B()
    return e.get(this.numBuffer, 0)
  }
  async ignore(e) {
    if (this.fileInfo.size !== void 0) {
      const t = this.fileInfo.size - this.position
      if (e > t) return ((this.position += t), t)
    }
    return ((this.position += e), e)
  }
  async close() {
    ;(await this.abort(), await this.onClose?.())
  }
  normalizeOptions(e, t) {
    if (!this.supportsRandomAccess() && t && t.position !== void 0 && t.position < this.position)
      throw new Error('`options.position` must be equal or greater than `tokenizer.position`')
    return { mayBeLess: !1, offset: 0, length: e.length, position: this.position, ...t }
  }
  abort() {
    return Promise.resolve()
  }
}
const At = 256e3
class Ut extends _e {
  constructor(e, t) {
    ;(super(t), (this.streamReader = e), (this.fileInfo = t?.fileInfo ?? {}))
  }
  async readBuffer(e, t) {
    const r = this.normalizeOptions(e, t),
      n = r.position - this.position
    if (n > 0) return (await this.ignore(n), this.readBuffer(e, t))
    if (n < 0) throw new Error('`options.position` must be equal or greater than `tokenizer.position`')
    if (r.length === 0) return 0
    const o = await this.streamReader.read(e.subarray(0, r.length), r.mayBeLess)
    if (((this.position += o), (!t || !t.mayBeLess) && o < r.length)) throw new B()
    return o
  }
  async peekBuffer(e, t) {
    const r = this.normalizeOptions(e, t)
    let n = 0
    if (r.position) {
      const o = r.position - this.position
      if (o > 0) {
        const a = new Uint8Array(r.length + o)
        return ((n = await this.peekBuffer(a, { mayBeLess: r.mayBeLess })), e.set(a.subarray(o)), n - o)
      }
      if (o < 0) throw new Error('Cannot peek from a negative offset in a stream')
    }
    if (r.length > 0) {
      try {
        n = await this.streamReader.peek(e.subarray(0, r.length), r.mayBeLess)
      } catch (o) {
        if (t?.mayBeLess && o instanceof B) return 0
        throw o
      }
      if (!r.mayBeLess && n < r.length) throw new B()
    }
    return n
  }
  async ignore(e) {
    const t = Math.min(At, e),
      r = new Uint8Array(t)
    let n = 0
    for (; n < e; ) {
      const o = e - n,
        a = await this.readBuffer(r, { length: Math.min(t, o) })
      if (a < 0) return a
      n += a
    }
    return n
  }
  abort() {
    return this.streamReader.abort()
  }
  async close() {
    return this.streamReader.close()
  }
  supportsRandomAccess() {
    return !1
  }
}
class Rt extends _e {
  constructor(e, t) {
    ;(super(t), (this.uint8Array = e), (this.fileInfo = { ...(t?.fileInfo ?? {}), size: e.length }))
  }
  async readBuffer(e, t) {
    t?.position && (this.position = t.position)
    const r = await this.peekBuffer(e, t)
    return ((this.position += r), r)
  }
  async peekBuffer(e, t) {
    const r = this.normalizeOptions(e, t),
      n = Math.min(this.uint8Array.length - r.position, r.length)
    if (!r.mayBeLess && n < r.length) throw new B()
    return (e.set(this.uint8Array.subarray(r.position, r.position + n)), n)
  }
  close() {
    return super.close()
  }
  supportsRandomAccess() {
    return !0
  }
  setPosition(e) {
    this.position = e
  }
}
function Lt(i, e) {
  const t = It(i),
    r = e ?? {},
    n = r.onClose
  return (
    (r.onClose = async () => {
      if ((await t.close(), n)) return n()
    }),
    new Ut(t, r)
  )
}
function Dt(i, e) {
  return new Rt(i, e)
}
var F = Uint8Array,
  j = Uint16Array,
  Ot = Int32Array,
  He = new F([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]),
  qe = new F([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]),
  Pt = new F([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
  We = function (i, e) {
    for (var t = new j(31), r = 0; r < 31; ++r) t[r] = e += 1 << i[r - 1]
    for (var n = new Ot(t[30]), r = 1; r < 30; ++r) for (var o = t[r]; o < t[r + 1]; ++o) n[o] = ((o - t[r]) << 5) | r
    return { b: t, r: n }
  },
  Ke = We(He, 2),
  Je = Ke.b,
  jt = Ke.r
;((Je[28] = 258), (jt[258] = 28))
var Vt = We(qe, 0),
  $t = Vt.b,
  he = new j(32768)
for (var p = 0; p < 32768; ++p) {
  var L = ((p & 43690) >> 1) | ((p & 21845) << 1)
  ;((L = ((L & 52428) >> 2) | ((L & 13107) << 2)),
    (L = ((L & 61680) >> 4) | ((L & 3855) << 4)),
    (he[p] = (((L & 65280) >> 8) | ((L & 255) << 8)) >> 1))
}
var q = function (i, e, t) {
    for (var r = i.length, n = 0, o = new j(e); n < r; ++n) i[n] && ++o[i[n] - 1]
    var a = new j(e)
    for (n = 1; n < e; ++n) a[n] = (a[n - 1] + o[n - 1]) << 1
    var u
    if (t) {
      u = new j(1 << e)
      var l = 15 - e
      for (n = 0; n < r; ++n)
        if (i[n])
          for (var f = (n << 4) | i[n], c = e - i[n], s = a[i[n] - 1]++ << c, m = s | ((1 << c) - 1); s <= m; ++s)
            u[he[s] >> l] = f
    } else for (u = new j(r), n = 0; n < r; ++n) i[n] && (u[n] = he[a[i[n] - 1]++] >> (15 - i[n]))
    return u
  },
  W = new F(288)
for (var p = 0; p < 144; ++p) W[p] = 8
for (var p = 144; p < 256; ++p) W[p] = 9
for (var p = 256; p < 280; ++p) W[p] = 7
for (var p = 280; p < 288; ++p) W[p] = 8
var Qe = new F(32)
for (var p = 0; p < 32; ++p) Qe[p] = 5
var Nt = q(W, 9, 1),
  _t = q(Qe, 5, 1),
  se = function (i) {
    for (var e = i[0], t = 1; t < i.length; ++t) i[t] > e && (e = i[t])
    return e
  },
  z = function (i, e, t) {
    var r = (e / 8) | 0
    return ((i[r] | (i[r + 1] << 8)) >> (e & 7)) & t
  },
  ce = function (i, e) {
    var t = (e / 8) | 0
    return (i[t] | (i[t + 1] << 8) | (i[t + 2] << 16)) >> (e & 7)
  },
  Ht = function (i) {
    return ((i + 7) / 8) | 0
  },
  qt = function (i, e, t) {
    return ((t == null || t > i.length) && (t = i.length), new F(i.subarray(e, t)))
  },
  Wt = [
    'unexpected EOF',
    'invalid block type',
    'invalid length/literal',
    'invalid distance',
    'stream finished',
    'no stream handler',
    ,
    'no callback',
    'invalid UTF-8 data',
    'extra field too long',
    'date not in range 1980-2099',
    'filename too long',
    'stream finishing',
    'invalid zip data',
  ],
  C = function (i, e, t) {
    var r = new Error(e || Wt[i])
    if (((r.code = i), Error.captureStackTrace && Error.captureStackTrace(r, C), !t)) throw r
    return r
  },
  xe = function (i, e, t, r) {
    var n = i.length,
      o = 0
    if (!n || (e.f && !e.l)) return t || new F(0)
    var a = !t,
      u = a || e.i != 2,
      l = e.i
    a && (t = new F(n * 3))
    var f = function (Fe) {
        var Se = t.length
        if (Fe > Se) {
          var Be = new F(Math.max(Se * 2, Fe))
          ;(Be.set(t), (t = Be))
        }
      },
      c = e.f || 0,
      s = e.p || 0,
      m = e.b || 0,
      d = e.l,
      h = e.d,
      y = e.m,
      x = e.n,
      v = n * 8
    do {
      if (!d) {
        c = z(i, s, 1)
        var E = z(i, s + 1, 3)
        if (((s += 3), E))
          if (E == 1) ((d = Nt), (h = _t), (y = 9), (x = 5))
          else if (E == 2) {
            var K = z(i, s, 31) + 257,
              D = z(i, s + 10, 15) + 4,
              J = K + z(i, s + 5, 31) + 1
            s += 14
            for (var U = new F(J), N = new F(19), S = 0; S < D; ++S) N[Pt[S]] = z(i, s + S * 3, 7)
            s += D * 3
            for (var ve = se(N), et = (1 << ve) - 1, tt = q(N, ve, 1), S = 0; S < J; ) {
              var we = tt[z(i, s, et)]
              s += we & 15
              var b = we >> 4
              if (b < 16) U[S++] = b
              else {
                var O = 0,
                  Q = 0
                for (
                  b == 16
                    ? ((Q = 3 + z(i, s, 3)), (s += 2), (O = U[S - 1]))
                    : b == 17
                      ? ((Q = 3 + z(i, s, 7)), (s += 3))
                      : b == 18 && ((Q = 11 + z(i, s, 127)), (s += 7));
                  Q--;

                )
                  U[S++] = O
              }
            }
            var ye = U.subarray(0, K),
              R = U.subarray(K)
            ;((y = se(ye)), (x = se(R)), (d = q(ye, y, 1)), (h = q(R, x, 1)))
          } else C(1)
        else {
          var b = Ht(s) + 4,
            $ = i[b - 4] | (i[b - 3] << 8),
            A = b + $
          if (A > n) {
            l && C(0)
            break
          }
          ;(u && f(m + $), t.set(i.subarray(b, A), m), (e.b = m += $), (e.p = s = A * 8), (e.f = c))
          continue
        }
        if (s > v) {
          l && C(0)
          break
        }
      }
      u && f(m + 131072)
      for (var it = (1 << y) - 1, rt = (1 << x) - 1, ie = s; ; ie = s) {
        var O = d[ce(i, s) & it],
          P = O >> 4
        if (((s += O & 15), s > v)) {
          l && C(0)
          break
        }
        if ((O || C(2), P < 256)) t[m++] = P
        else if (P == 256) {
          ;((ie = s), (d = null))
          break
        } else {
          var be = P - 254
          if (P > 264) {
            var S = P - 257,
              _ = He[S]
            ;((be = z(i, s, (1 << _) - 1) + Je[S]), (s += _))
          }
          var re = h[ce(i, s) & rt],
            ne = re >> 4
          ;(re || C(3), (s += re & 15))
          var R = $t[ne]
          if (ne > 3) {
            var _ = qe[ne]
            ;((R += ce(i, s) & ((1 << _) - 1)), (s += _))
          }
          if (s > v) {
            l && C(0)
            break
          }
          u && f(m + 131072)
          var ke = m + be
          if (m < R) {
            var Ce = o - R,
              nt = Math.min(R, ke)
            for (Ce + m < 0 && C(3); m < nt; ++m) t[m] = r[Ce + m]
          }
          for (; m < ke; ++m) t[m] = t[m - R]
        }
      }
      ;((e.l = d), (e.p = ie), (e.b = m), (e.f = c), d && ((c = 1), (e.m = y), (e.d = h), (e.n = x)))
    } while (!c)
    return m != t.length && a ? qt(t, 0, m) : t.subarray(0, m)
  },
  Kt = new F(0),
  Jt = function (i) {
    ;(i[0] != 31 || i[1] != 139 || i[2] != 8) && C(6, 'invalid gzip data')
    var e = i[3],
      t = 10
    e & 4 && (t += (i[10] | (i[11] << 8)) + 2)
    for (var r = ((e >> 3) & 1) + ((e >> 4) & 1); r > 0; r -= !i[t++]);
    return t + (e & 2)
  },
  Qt = function (i) {
    var e = i.length
    return (i[e - 4] | (i[e - 3] << 8) | (i[e - 2] << 16) | (i[e - 1] << 24)) >>> 0
  },
  Gt = function (i, e) {
    return (
      ((i[0] & 15) != 8 || i[0] >> 4 > 7 || ((i[0] << 8) | i[1]) % 31) && C(6, 'invalid zlib data'),
      ((i[1] >> 5) & 1) == 1 && C(6, 'invalid zlib data: ' + (i[1] & 32 ? 'need' : 'unexpected') + ' dictionary'),
      ((i[1] >> 3) & 4) + 2
    )
  }
function Xt(i, e) {
  return xe(i, { i: 2 }, e, e)
}
function Zt(i, e) {
  var t = Jt(i)
  return (t + 8 > i.length && C(6, 'invalid gzip data'), xe(i.subarray(t, -8), { i: 2 }, new F(Qt(i)), e))
}
function Yt(i, e) {
  return xe(i.subarray(Gt(i), -4), { i: 2 }, e, e)
}
function ei(i, e) {
  return i[0] == 31 && i[1] == 139 && i[2] == 8
    ? Zt(i, e)
    : (i[0] & 15) != 8 || i[0] >> 4 > 7 || ((i[0] << 8) | i[1]) % 31
      ? Xt(i, e)
      : Yt(i, e)
}
var ti = typeof TextDecoder < 'u' && new TextDecoder(),
  ii = 0
try {
  ;(ti.decode(Kt, { stream: !0 }), (ii = 1))
} catch {}
var X = { exports: {} },
  fe,
  Ae
function ri() {
  if (Ae) return fe
  Ae = 1
  var i = 1e3,
    e = i * 60,
    t = e * 60,
    r = t * 24,
    n = r * 7,
    o = r * 365.25
  fe = function (c, s) {
    s = s || {}
    var m = typeof c
    if (m === 'string' && c.length > 0) return a(c)
    if (m === 'number' && isFinite(c)) return s.long ? l(c) : u(c)
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(c))
  }
  function a(c) {
    if (((c = String(c)), !(c.length > 100))) {
      var s =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          c,
        )
      if (s) {
        var m = parseFloat(s[1]),
          d = (s[2] || 'ms').toLowerCase()
        switch (d) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return m * o
          case 'weeks':
          case 'week':
          case 'w':
            return m * n
          case 'days':
          case 'day':
          case 'd':
            return m * r
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return m * t
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return m * e
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return m * i
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return m
          default:
            return
        }
      }
    }
  }
  function u(c) {
    var s = Math.abs(c)
    return s >= r
      ? Math.round(c / r) + 'd'
      : s >= t
        ? Math.round(c / t) + 'h'
        : s >= e
          ? Math.round(c / e) + 'm'
          : s >= i
            ? Math.round(c / i) + 's'
            : c + 'ms'
  }
  function l(c) {
    var s = Math.abs(c)
    return s >= r
      ? f(c, s, r, 'day')
      : s >= t
        ? f(c, s, t, 'hour')
        : s >= e
          ? f(c, s, e, 'minute')
          : s >= i
            ? f(c, s, i, 'second')
            : c + ' ms'
  }
  function f(c, s, m, d) {
    var h = s >= m * 1.5
    return Math.round(c / m) + ' ' + d + (h ? 's' : '')
  }
  return fe
}
var le, Ue
function ni() {
  if (Ue) return le
  Ue = 1
  function i(e) {
    ;((r.debug = r),
      (r.default = r),
      (r.coerce = f),
      (r.disable = u),
      (r.enable = o),
      (r.enabled = l),
      (r.humanize = ri()),
      (r.destroy = c),
      Object.keys(e).forEach((s) => {
        r[s] = e[s]
      }),
      (r.names = []),
      (r.skips = []),
      (r.formatters = {}))
    function t(s) {
      let m = 0
      for (let d = 0; d < s.length; d++) ((m = (m << 5) - m + s.charCodeAt(d)), (m |= 0))
      return r.colors[Math.abs(m) % r.colors.length]
    }
    r.selectColor = t
    function r(s) {
      let m,
        d = null,
        h,
        y
      function x(...v) {
        if (!x.enabled) return
        const E = x,
          b = Number(new Date()),
          $ = b - (m || b)
        ;((E.diff = $),
          (E.prev = m),
          (E.curr = b),
          (m = b),
          (v[0] = r.coerce(v[0])),
          typeof v[0] != 'string' && v.unshift('%O'))
        let A = 0
        ;((v[0] = v[0].replace(/%([a-zA-Z%])/g, (D, J) => {
          if (D === '%%') return '%'
          A++
          const U = r.formatters[J]
          if (typeof U == 'function') {
            const N = v[A]
            ;((D = U.call(E, N)), v.splice(A, 1), A--)
          }
          return D
        })),
          r.formatArgs.call(E, v),
          (E.log || r.log).apply(E, v))
      }
      return (
        (x.namespace = s),
        (x.useColors = r.useColors()),
        (x.color = r.selectColor(s)),
        (x.extend = n),
        (x.destroy = r.destroy),
        Object.defineProperty(x, 'enabled', {
          enumerable: !0,
          configurable: !1,
          get: () => (d !== null ? d : (h !== r.namespaces && ((h = r.namespaces), (y = r.enabled(s))), y)),
          set: (v) => {
            d = v
          },
        }),
        typeof r.init == 'function' && r.init(x),
        x
      )
    }
    function n(s, m) {
      const d = r(this.namespace + (typeof m > 'u' ? ':' : m) + s)
      return ((d.log = this.log), d)
    }
    function o(s) {
      ;(r.save(s), (r.namespaces = s), (r.names = []), (r.skips = []))
      const m = (typeof s == 'string' ? s : '').trim().replace(/\s+/g, ',').split(',').filter(Boolean)
      for (const d of m) d[0] === '-' ? r.skips.push(d.slice(1)) : r.names.push(d)
    }
    function a(s, m) {
      let d = 0,
        h = 0,
        y = -1,
        x = 0
      for (; d < s.length; )
        if (h < m.length && (m[h] === s[d] || m[h] === '*')) m[h] === '*' ? ((y = h), (x = d), h++) : (d++, h++)
        else if (y !== -1) ((h = y + 1), x++, (d = x))
        else return !1
      for (; h < m.length && m[h] === '*'; ) h++
      return h === m.length
    }
    function u() {
      const s = [...r.names, ...r.skips.map((m) => '-' + m)].join(',')
      return (r.enable(''), s)
    }
    function l(s) {
      for (const m of r.skips) if (a(s, m)) return !1
      for (const m of r.names) if (a(s, m)) return !0
      return !1
    }
    function f(s) {
      return s instanceof Error ? s.stack || s.message : s
    }
    function c() {
      console.warn(
        'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
      )
    }
    return (r.enable(r.load()), r)
  }
  return ((le = i), le)
}
var Re
function oi() {
  return (
    Re ||
      ((Re = 1),
      (function (i, e) {
        var t = {}
        ;((e.formatArgs = n),
          (e.save = o),
          (e.load = a),
          (e.useColors = r),
          (e.storage = u()),
          (e.destroy = (() => {
            let f = !1
            return () => {
              f ||
                ((f = !0),
                console.warn(
                  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.',
                ))
            }
          })()),
          (e.colors = [
            '#0000CC',
            '#0000FF',
            '#0033CC',
            '#0033FF',
            '#0066CC',
            '#0066FF',
            '#0099CC',
            '#0099FF',
            '#00CC00',
            '#00CC33',
            '#00CC66',
            '#00CC99',
            '#00CCCC',
            '#00CCFF',
            '#3300CC',
            '#3300FF',
            '#3333CC',
            '#3333FF',
            '#3366CC',
            '#3366FF',
            '#3399CC',
            '#3399FF',
            '#33CC00',
            '#33CC33',
            '#33CC66',
            '#33CC99',
            '#33CCCC',
            '#33CCFF',
            '#6600CC',
            '#6600FF',
            '#6633CC',
            '#6633FF',
            '#66CC00',
            '#66CC33',
            '#9900CC',
            '#9900FF',
            '#9933CC',
            '#9933FF',
            '#99CC00',
            '#99CC33',
            '#CC0000',
            '#CC0033',
            '#CC0066',
            '#CC0099',
            '#CC00CC',
            '#CC00FF',
            '#CC3300',
            '#CC3333',
            '#CC3366',
            '#CC3399',
            '#CC33CC',
            '#CC33FF',
            '#CC6600',
            '#CC6633',
            '#CC9900',
            '#CC9933',
            '#CCCC00',
            '#CCCC33',
            '#FF0000',
            '#FF0033',
            '#FF0066',
            '#FF0099',
            '#FF00CC',
            '#FF00FF',
            '#FF3300',
            '#FF3333',
            '#FF3366',
            '#FF3399',
            '#FF33CC',
            '#FF33FF',
            '#FF6600',
            '#FF6633',
            '#FF9900',
            '#FF9933',
            '#FFCC00',
            '#FFCC33',
          ]))
        function r() {
          if (typeof window < 'u' && window.process && (window.process.type === 'renderer' || window.process.__nwjs))
            return !0
          if (
            typeof navigator < 'u' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1
          let f
          return (
            (typeof document < 'u' &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            (typeof window < 'u' &&
              window.console &&
              (window.console.firebug || (window.console.exception && window.console.table))) ||
            (typeof navigator < 'u' &&
              navigator.userAgent &&
              (f = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
              parseInt(f[1], 10) >= 31) ||
            (typeof navigator < 'u' &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          )
        }
        function n(f) {
          if (
            ((f[0] =
              (this.useColors ? '%c' : '') +
              this.namespace +
              (this.useColors ? ' %c' : ' ') +
              f[0] +
              (this.useColors ? '%c ' : ' ') +
              '+' +
              i.exports.humanize(this.diff)),
            !this.useColors)
          )
            return
          const c = 'color: ' + this.color
          f.splice(1, 0, c, 'color: inherit')
          let s = 0,
            m = 0
          ;(f[0].replace(/%[a-zA-Z%]/g, (d) => {
            d !== '%%' && (s++, d === '%c' && (m = s))
          }),
            f.splice(m, 0, c))
        }
        e.log = console.debug || console.log || (() => {})
        function o(f) {
          try {
            f ? e.storage.setItem('debug', f) : e.storage.removeItem('debug')
          } catch {}
        }
        function a() {
          let f
          try {
            f = e.storage.getItem('debug') || e.storage.getItem('DEBUG')
          } catch {}
          return (!f && typeof process < 'u' && 'env' in process && (f = t.DEBUG), f)
        }
        function u() {
          try {
            return localStorage
          } catch {}
        }
        i.exports = ni()(e)
        const { formatters: l } = i.exports
        l.j = function (f) {
          try {
            return JSON.stringify(f)
          } catch (c) {
            return '[UnexpectedJSONParseError]: ' + c.message
          }
        }
      })(X, X.exports)),
    X.exports
  )
}
var ai = oi()
const si = ot(ai),
  V = {
    LocalFileHeader: 67324752,
    DataDescriptor: 134695760,
    CentralFileHeader: 33639248,
    EndOfCentralDirectory: 101010256,
  },
  Le = {
    get(i) {
      return (g.get(i, 6), { signature: w.get(i, 0), compressedSize: w.get(i, 8), uncompressedSize: w.get(i, 12) })
    },
    len: 16,
  },
  ci = {
    get(i) {
      const e = g.get(i, 6)
      return {
        signature: w.get(i, 0),
        minVersion: g.get(i, 4),
        dataDescriptor: !!(e & 8),
        compressedMethod: g.get(i, 8),
        compressedSize: w.get(i, 18),
        uncompressedSize: w.get(i, 22),
        filenameLength: g.get(i, 26),
        extraFieldLength: g.get(i, 28),
        filename: null,
      }
    },
    len: 30,
  },
  fi = {
    get(i) {
      return {
        signature: w.get(i, 0),
        nrOfThisDisk: g.get(i, 4),
        nrOfThisDiskWithTheStart: g.get(i, 6),
        nrOfEntriesOnThisDisk: g.get(i, 8),
        nrOfEntriesOfSize: g.get(i, 10),
        sizeOfCd: w.get(i, 12),
        offsetOfStartOfCd: w.get(i, 16),
        zipFileCommentLength: g.get(i, 20),
      }
    },
    len: 22,
  },
  li = {
    get(i) {
      const e = g.get(i, 8)
      return {
        signature: w.get(i, 0),
        minVersion: g.get(i, 6),
        dataDescriptor: !!(e & 8),
        compressedMethod: g.get(i, 10),
        compressedSize: w.get(i, 20),
        uncompressedSize: w.get(i, 24),
        filenameLength: g.get(i, 28),
        extraFieldLength: g.get(i, 30),
        fileCommentLength: g.get(i, 32),
        relativeOffsetOfLocalHeader: w.get(i, 42),
        filename: null,
      }
    },
    len: 46,
  }
function Ge(i) {
  const e = new Uint8Array(w.len)
  return (w.put(e, 0, i), e)
}
const M = si('tokenizer:inflate'),
  ue = 256 * 1024,
  ui = Ge(V.DataDescriptor),
  Z = Ge(V.EndOfCentralDirectory)
class mi {
  constructor(e) {
    ;((this.tokenizer = e), (this.syncBuffer = new Uint8Array(ue)))
  }
  async isZip() {
    return (await this.peekSignature()) === V.LocalFileHeader
  }
  peekSignature() {
    return this.tokenizer.peekToken(w)
  }
  async findEndOfCentralDirectoryLocator() {
    const e = this.tokenizer,
      t = Math.min(16 * 1024, e.fileInfo.size),
      r = this.syncBuffer.subarray(0, t)
    await this.tokenizer.readBuffer(r, { position: e.fileInfo.size - t })
    for (let n = r.length - 4; n >= 0; n--)
      if (r[n] === Z[0] && r[n + 1] === Z[1] && r[n + 2] === Z[2] && r[n + 3] === Z[3]) return e.fileInfo.size - t + n
    return -1
  }
  async readCentralDirectory() {
    if (!this.tokenizer.supportsRandomAccess()) {
      M('Cannot reading central-directory without random-read support')
      return
    }
    M('Reading central-directory...')
    const e = this.tokenizer.position,
      t = await this.findEndOfCentralDirectoryLocator()
    if (t > 0) {
      M('Central-directory 32-bit signature found')
      const r = await this.tokenizer.readToken(fi, t),
        n = []
      this.tokenizer.setPosition(r.offsetOfStartOfCd)
      for (let o = 0; o < r.nrOfEntriesOfSize; ++o) {
        const a = await this.tokenizer.readToken(li)
        if (a.signature !== V.CentralFileHeader) throw new Error('Expected Central-File-Header signature')
        ;((a.filename = await this.tokenizer.readToken(new I(a.filenameLength, 'utf-8'))),
          await this.tokenizer.ignore(a.extraFieldLength),
          await this.tokenizer.ignore(a.fileCommentLength),
          n.push(a),
          M(`Add central-directory file-entry: n=${o + 1}/${n.length}: filename=${n[o].filename}`))
      }
      return (this.tokenizer.setPosition(e), n)
    }
    this.tokenizer.setPosition(e)
  }
  async unzip(e) {
    const t = await this.readCentralDirectory()
    if (t) return this.iterateOverCentralDirectory(t, e)
    let r = !1
    do {
      const n = await this.readLocalFileHeader()
      if (!n) break
      const o = e(n)
      r = !!o.stop
      let a
      if ((await this.tokenizer.ignore(n.extraFieldLength), n.dataDescriptor && n.compressedSize === 0)) {
        const u = []
        let l = ue
        M('Compressed-file-size unknown, scanning for next data-descriptor-signature....')
        let f = -1
        for (; f < 0 && l === ue; ) {
          ;((l = await this.tokenizer.peekBuffer(this.syncBuffer, { mayBeLess: !0 })),
            (f = di(this.syncBuffer.subarray(0, l), ui)))
          const c = f >= 0 ? f : l
          if (o.handler) {
            const s = new Uint8Array(c)
            ;(await this.tokenizer.readBuffer(s), u.push(s))
          } else await this.tokenizer.ignore(c)
        }
        ;(M(`Found data-descriptor-signature at pos=${this.tokenizer.position}`),
          o.handler && (await this.inflate(n, hi(u), o.handler)))
      } else
        o.handler
          ? (M(`Reading compressed-file-data: ${n.compressedSize} bytes`),
            (a = new Uint8Array(n.compressedSize)),
            await this.tokenizer.readBuffer(a),
            await this.inflate(n, a, o.handler))
          : (M(`Ignoring compressed-file-data: ${n.compressedSize} bytes`),
            await this.tokenizer.ignore(n.compressedSize))
      if (
        (M(`Reading data-descriptor at pos=${this.tokenizer.position}`),
        n.dataDescriptor && (await this.tokenizer.readToken(Le)).signature !== 134695760)
      )
        throw new Error(`Expected data-descriptor-signature at position ${this.tokenizer.position - Le.len}`)
    } while (!r)
  }
  async iterateOverCentralDirectory(e, t) {
    for (const r of e) {
      const n = t(r)
      if (n.handler) {
        this.tokenizer.setPosition(r.relativeOffsetOfLocalHeader)
        const o = await this.readLocalFileHeader()
        if (o) {
          await this.tokenizer.ignore(o.extraFieldLength)
          const a = new Uint8Array(r.compressedSize)
          ;(await this.tokenizer.readBuffer(a), await this.inflate(o, a, n.handler))
        }
      }
      if (n.stop) break
    }
  }
  inflate(e, t, r) {
    if (e.compressedMethod === 0) return r(t)
    M(`Decompress filename=${e.filename}, compressed-size=${t.length}`)
    const n = ei(t)
    return r(n)
  }
  async readLocalFileHeader() {
    const e = await this.tokenizer.peekToken(w)
    if (e === V.LocalFileHeader) {
      const t = await this.tokenizer.readToken(ci)
      return ((t.filename = await this.tokenizer.readToken(new I(t.filenameLength, 'utf-8'))), t)
    }
    if (e === V.CentralFileHeader) return !1
    throw e === 3759263696 ? new Error('Encrypted ZIP') : new Error('Unexpected signature')
  }
}
function di(i, e) {
  const t = i.length,
    r = e.length
  if (r > t) return -1
  for (let n = 0; n <= t - r; n++) {
    let o = !0
    for (let a = 0; a < r; a++)
      if (i[n + a] !== e[a]) {
        o = !1
        break
      }
    if (o) return n
  }
  return -1
}
function hi(i) {
  const e = i.reduce((n, o) => n + o.length, 0),
    t = new Uint8Array(e)
  let r = 0
  for (const n of i) (t.set(n, r), (r += n.length))
  return t
}
new globalThis.TextDecoder('utf8')
new globalThis.TextEncoder()
Array.from({ length: 256 }, (i, e) => e.toString(16).padStart(2, '0'))
function De(i) {
  const { byteLength: e } = i
  if (e === 6) return i.getUint16(0) * 2 ** 32 + i.getUint32(2)
  if (e === 5) return i.getUint8(0) * 2 ** 32 + i.getUint32(1)
  if (e === 4) return i.getUint32(0)
  if (e === 3) return i.getUint8(0) * 2 ** 16 + i.getUint16(1)
  if (e === 2) return i.getUint16(0)
  if (e === 1) return i.getUint8(0)
}
function pi(i) {
  return [...i].map((e) => e.charCodeAt(0))
}
function xi(i, e = 0) {
  const t = Number.parseInt(new I(6).get(i, 148).replace(/\0.*$/, '').trim(), 8)
  if (Number.isNaN(t)) return !1
  let r = 256
  for (let n = e; n < e + 148; n++) r += i[n]
  for (let n = e + 156; n < e + 512; n++) r += i[n]
  return t === r
}
const gi = { get: (i, e) => (i[e + 3] & 127) | (i[e + 2] << 7) | (i[e + 1] << 14) | (i[e] << 21), len: 4 },
  vi = [
    'jpg',
    'png',
    'apng',
    'gif',
    'webp',
    'flif',
    'xcf',
    'cr2',
    'cr3',
    'orf',
    'arw',
    'dng',
    'nef',
    'rw2',
    'raf',
    'tif',
    'bmp',
    'icns',
    'jxr',
    'psd',
    'indd',
    'zip',
    'tar',
    'rar',
    'gz',
    'bz2',
    '7z',
    'dmg',
    'mp4',
    'mid',
    'mkv',
    'webm',
    'mov',
    'avi',
    'mpg',
    'mp2',
    'mp3',
    'm4a',
    'oga',
    'ogg',
    'ogv',
    'opus',
    'flac',
    'wav',
    'spx',
    'amr',
    'pdf',
    'epub',
    'elf',
    'macho',
    'exe',
    'swf',
    'rtf',
    'wasm',
    'woff',
    'woff2',
    'eot',
    'ttf',
    'otf',
    'ttc',
    'ico',
    'flv',
    'ps',
    'xz',
    'sqlite',
    'nes',
    'crx',
    'xpi',
    'cab',
    'deb',
    'ar',
    'rpm',
    'Z',
    'lz',
    'cfb',
    'mxf',
    'mts',
    'blend',
    'bpg',
    'docx',
    'pptx',
    'xlsx',
    '3gp',
    '3g2',
    'j2c',
    'jp2',
    'jpm',
    'jpx',
    'mj2',
    'aif',
    'qcp',
    'odt',
    'ods',
    'odp',
    'xml',
    'mobi',
    'heic',
    'cur',
    'ktx',
    'ape',
    'wv',
    'dcm',
    'ics',
    'glb',
    'pcap',
    'dsf',
    'lnk',
    'alias',
    'voc',
    'ac3',
    'm4v',
    'm4p',
    'm4b',
    'f4v',
    'f4p',
    'f4b',
    'f4a',
    'mie',
    'asf',
    'ogm',
    'ogx',
    'mpc',
    'arrow',
    'shp',
    'aac',
    'mp1',
    'it',
    's3m',
    'xm',
    'skp',
    'avif',
    'eps',
    'lzh',
    'pgp',
    'asar',
    'stl',
    'chm',
    '3mf',
    'zst',
    'jxl',
    'vcf',
    'jls',
    'pst',
    'dwg',
    'parquet',
    'class',
    'arj',
    'cpio',
    'ace',
    'avro',
    'icc',
    'fbx',
    'vsdx',
    'vtt',
    'apk',
    'drc',
    'lz4',
    'potx',
    'xltx',
    'dotx',
    'xltm',
    'ott',
    'ots',
    'otp',
    'odg',
    'otg',
    'xlsm',
    'docm',
    'dotm',
    'potm',
    'pptm',
    'jar',
    'rm',
    'ppsm',
    'ppsx',
  ],
  wi = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/flif',
    'image/x-xcf',
    'image/x-canon-cr2',
    'image/x-canon-cr3',
    'image/tiff',
    'image/bmp',
    'image/vnd.ms-photo',
    'image/vnd.adobe.photoshop',
    'application/x-indesign',
    'application/epub+zip',
    'application/x-xpinstall',
    'application/vnd.ms-powerpoint.slideshow.macroenabled.12',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.presentation',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/zip',
    'application/x-tar',
    'application/x-rar-compressed',
    'application/gzip',
    'application/x-bzip2',
    'application/x-7z-compressed',
    'application/x-apple-diskimage',
    'application/vnd.apache.arrow.file',
    'video/mp4',
    'audio/midi',
    'video/matroska',
    'video/webm',
    'video/quicktime',
    'video/vnd.avi',
    'audio/wav',
    'audio/qcelp',
    'audio/x-ms-asf',
    'video/x-ms-asf',
    'application/vnd.ms-asf',
    'video/mpeg',
    'video/3gpp',
    'audio/mpeg',
    'audio/mp4',
    'video/ogg',
    'audio/ogg',
    'audio/ogg; codecs=opus',
    'application/ogg',
    'audio/flac',
    'audio/ape',
    'audio/wavpack',
    'audio/amr',
    'application/pdf',
    'application/x-elf',
    'application/x-mach-binary',
    'application/x-msdownload',
    'application/x-shockwave-flash',
    'application/rtf',
    'application/wasm',
    'font/woff',
    'font/woff2',
    'application/vnd.ms-fontobject',
    'font/ttf',
    'font/otf',
    'font/collection',
    'image/x-icon',
    'video/x-flv',
    'application/postscript',
    'application/eps',
    'application/x-xz',
    'application/x-sqlite3',
    'application/x-nintendo-nes-rom',
    'application/x-google-chrome-extension',
    'application/vnd.ms-cab-compressed',
    'application/x-deb',
    'application/x-unix-archive',
    'application/x-rpm',
    'application/x-compress',
    'application/x-lzip',
    'application/x-cfb',
    'application/x-mie',
    'application/mxf',
    'video/mp2t',
    'application/x-blender',
    'image/bpg',
    'image/j2c',
    'image/jp2',
    'image/jpx',
    'image/jpm',
    'image/mj2',
    'audio/aiff',
    'application/xml',
    'application/x-mobipocket-ebook',
    'image/heif',
    'image/heif-sequence',
    'image/heic',
    'image/heic-sequence',
    'image/icns',
    'image/ktx',
    'application/dicom',
    'audio/x-musepack',
    'text/calendar',
    'text/vcard',
    'text/vtt',
    'model/gltf-binary',
    'application/vnd.tcpdump.pcap',
    'audio/x-dsf',
    'application/x.ms.shortcut',
    'application/x.apple.alias',
    'audio/x-voc',
    'audio/vnd.dolby.dd-raw',
    'audio/x-m4a',
    'image/apng',
    'image/x-olympus-orf',
    'image/x-sony-arw',
    'image/x-adobe-dng',
    'image/x-nikon-nef',
    'image/x-panasonic-rw2',
    'image/x-fujifilm-raf',
    'video/x-m4v',
    'video/3gpp2',
    'application/x-esri-shape',
    'audio/aac',
    'audio/x-it',
    'audio/x-s3m',
    'audio/x-xm',
    'video/MP1S',
    'video/MP2P',
    'application/vnd.sketchup.skp',
    'image/avif',
    'application/x-lzh-compressed',
    'application/pgp-encrypted',
    'application/x-asar',
    'model/stl',
    'application/vnd.ms-htmlhelp',
    'model/3mf',
    'image/jxl',
    'application/zstd',
    'image/jls',
    'application/vnd.ms-outlook',
    'image/vnd.dwg',
    'application/vnd.apache.parquet',
    'application/java-vm',
    'application/x-arj',
    'application/x-cpio',
    'application/x-ace-compressed',
    'application/avro',
    'application/vnd.iccprofile',
    'application/x.autodesk.fbx',
    'application/vnd.visio',
    'application/vnd.android.package-archive',
    'application/vnd.google.draco',
    'application/x-lz4',
    'application/vnd.openxmlformats-officedocument.presentationml.template',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
    'application/vnd.ms-excel.template.macroenabled.12',
    'application/vnd.oasis.opendocument.text-template',
    'application/vnd.oasis.opendocument.spreadsheet-template',
    'application/vnd.oasis.opendocument.presentation-template',
    'application/vnd.oasis.opendocument.graphics',
    'application/vnd.oasis.opendocument.graphics-template',
    'application/vnd.ms-excel.sheet.macroenabled.12',
    'application/vnd.ms-word.document.macroenabled.12',
    'application/vnd.ms-word.template.macroenabled.12',
    'application/vnd.ms-powerpoint.template.macroenabled.12',
    'application/vnd.ms-powerpoint.presentation.macroenabled.12',
    'application/java-archive',
    'application/vnd.rn-realmedia',
  ],
  Y = 4100
async function Xe(i, e) {
  return new Ze(e).fromBlob(i)
}
function me(i) {
  switch (((i = i.toLowerCase()), i)) {
    case 'application/epub+zip':
      return { ext: 'epub', mime: i }
    case 'application/vnd.oasis.opendocument.text':
      return { ext: 'odt', mime: i }
    case 'application/vnd.oasis.opendocument.text-template':
      return { ext: 'ott', mime: i }
    case 'application/vnd.oasis.opendocument.spreadsheet':
      return { ext: 'ods', mime: i }
    case 'application/vnd.oasis.opendocument.spreadsheet-template':
      return { ext: 'ots', mime: i }
    case 'application/vnd.oasis.opendocument.presentation':
      return { ext: 'odp', mime: i }
    case 'application/vnd.oasis.opendocument.presentation-template':
      return { ext: 'otp', mime: i }
    case 'application/vnd.oasis.opendocument.graphics':
      return { ext: 'odg', mime: i }
    case 'application/vnd.oasis.opendocument.graphics-template':
      return { ext: 'otg', mime: i }
    case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
      return { ext: 'ppsx', mime: i }
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return { ext: 'xlsx', mime: i }
    case 'application/vnd.ms-excel.sheet.macroenabled':
      return { ext: 'xlsm', mime: 'application/vnd.ms-excel.sheet.macroenabled.12' }
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.template':
      return { ext: 'xltx', mime: i }
    case 'application/vnd.ms-excel.template.macroenabled':
      return { ext: 'xltm', mime: 'application/vnd.ms-excel.template.macroenabled.12' }
    case 'application/vnd.ms-powerpoint.slideshow.macroenabled':
      return { ext: 'ppsm', mime: 'application/vnd.ms-powerpoint.slideshow.macroenabled.12' }
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return { ext: 'docx', mime: i }
    case 'application/vnd.ms-word.document.macroenabled':
      return { ext: 'docm', mime: 'application/vnd.ms-word.document.macroenabled.12' }
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
      return { ext: 'dotx', mime: i }
    case 'application/vnd.ms-word.template.macroenabledtemplate':
      return { ext: 'dotm', mime: 'application/vnd.ms-word.template.macroenabled.12' }
    case 'application/vnd.openxmlformats-officedocument.presentationml.template':
      return { ext: 'potx', mime: i }
    case 'application/vnd.ms-powerpoint.template.macroenabled':
      return { ext: 'potm', mime: 'application/vnd.ms-powerpoint.template.macroenabled.12' }
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return { ext: 'pptx', mime: i }
    case 'application/vnd.ms-powerpoint.presentation.macroenabled':
      return { ext: 'pptm', mime: 'application/vnd.ms-powerpoint.presentation.macroenabled.12' }
    case 'application/vnd.ms-visio.drawing':
      return { ext: 'vsdx', mime: 'application/vnd.visio' }
    case 'application/vnd.ms-package.3dmanufacturing-3dmodel+xml':
      return { ext: '3mf', mime: 'model/3mf' }
  }
}
function T(i, e, t) {
  t = { offset: 0, ...t }
  for (const [r, n] of e.entries())
    if (t.mask) {
      if (n !== (t.mask[r] & i[r + t.offset])) return !1
    } else if (n !== i[r + t.offset]) return !1
  return !0
}
class Ze {
  constructor(e) {
    ;((this.options = { mpegOffsetTolerance: 0, ...e }),
      (this.detectors = [
        ...(e?.customDetectors ?? []),
        { id: 'core', detect: this.detectConfident },
        { id: 'core.imprecise', detect: this.detectImprecise },
      ]),
      (this.tokenizerOptions = { abortSignal: e?.signal }))
  }
  async fromTokenizer(e) {
    const t = e.position
    for (const r of this.detectors) {
      const n = await r.detect(e)
      if (n) return n
      if (t !== e.position) return
    }
  }
  async fromBuffer(e) {
    if (!(e instanceof Uint8Array || e instanceof ArrayBuffer))
      throw new TypeError(
        `Expected the \`input\` argument to be of type \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``,
      )
    const t = e instanceof Uint8Array ? e : new Uint8Array(e)
    if (t?.length > 1) return this.fromTokenizer(Dt(t, this.tokenizerOptions))
  }
  async fromBlob(e) {
    return this.fromStream(e.stream())
  }
  async fromStream(e) {
    const t = await Lt(e, this.tokenizerOptions)
    try {
      return await this.fromTokenizer(t)
    } finally {
      await t.close()
    }
  }
  async toDetectionStream(e, t) {
    const { sampleSize: r = Y } = t
    let n, o
    const a = e.getReader({ mode: 'byob' })
    try {
      const { value: f, done: c } = await a.read(new Uint8Array(r))
      if (((o = f), !c && f))
        try {
          n = await this.fromBuffer(f.subarray(0, r))
        } catch (s) {
          if (!(s instanceof B)) throw s
          n = void 0
        }
      o = f
    } finally {
      a.releaseLock()
    }
    const u = new TransformStream({
        async start(f) {
          f.enqueue(o)
        },
        transform(f, c) {
          c.enqueue(f)
        },
      }),
      l = e.pipeThrough(u)
    return ((l.fileType = n), l)
  }
  check(e, t) {
    return T(this.buffer, e, t)
  }
  checkString(e, t) {
    return this.check(pi(e), t)
  }
  detectConfident = async (e) => {
    if (
      ((this.buffer = new Uint8Array(Y)),
      e.fileInfo.size === void 0 && (e.fileInfo.size = Number.MAX_SAFE_INTEGER),
      (this.tokenizer = e),
      await e.peekBuffer(this.buffer, { length: 12, mayBeLess: !0 }),
      this.check([66, 77]))
    )
      return { ext: 'bmp', mime: 'image/bmp' }
    if (this.check([11, 119])) return { ext: 'ac3', mime: 'audio/vnd.dolby.dd-raw' }
    if (this.check([120, 1])) return { ext: 'dmg', mime: 'application/x-apple-diskimage' }
    if (this.check([77, 90])) return { ext: 'exe', mime: 'application/x-msdownload' }
    if (this.check([37, 33]))
      return (
        await e.peekBuffer(this.buffer, { length: 24, mayBeLess: !0 }),
        this.checkString('PS-Adobe-', { offset: 2 }) && this.checkString(' EPSF-', { offset: 14 })
          ? { ext: 'eps', mime: 'application/eps' }
          : { ext: 'ps', mime: 'application/postscript' }
      )
    if (this.check([31, 160]) || this.check([31, 157])) return { ext: 'Z', mime: 'application/x-compress' }
    if (this.check([199, 113])) return { ext: 'cpio', mime: 'application/x-cpio' }
    if (this.check([96, 234])) return { ext: 'arj', mime: 'application/x-arj' }
    if (this.check([239, 187, 191])) return (this.tokenizer.ignore(3), this.detectConfident(e))
    if (this.check([71, 73, 70])) return { ext: 'gif', mime: 'image/gif' }
    if (this.check([73, 73, 188])) return { ext: 'jxr', mime: 'image/vnd.ms-photo' }
    if (this.check([31, 139, 8])) return { ext: 'gz', mime: 'application/gzip' }
    if (this.check([66, 90, 104])) return { ext: 'bz2', mime: 'application/x-bzip2' }
    if (this.checkString('ID3')) {
      await e.ignore(6)
      const t = await e.readToken(gi)
      return e.position + t > e.fileInfo.size
        ? { ext: 'mp3', mime: 'audio/mpeg' }
        : (await e.ignore(t), this.fromTokenizer(e))
    }
    if (this.checkString('MP+')) return { ext: 'mpc', mime: 'audio/x-musepack' }
    if ((this.buffer[0] === 67 || this.buffer[0] === 70) && this.check([87, 83], { offset: 1 }))
      return { ext: 'swf', mime: 'application/x-shockwave-flash' }
    if (this.check([255, 216, 255]))
      return this.check([247], { offset: 3 }) ? { ext: 'jls', mime: 'image/jls' } : { ext: 'jpg', mime: 'image/jpeg' }
    if (this.check([79, 98, 106, 1])) return { ext: 'avro', mime: 'application/avro' }
    if (this.checkString('FLIF')) return { ext: 'flif', mime: 'image/flif' }
    if (this.checkString('8BPS')) return { ext: 'psd', mime: 'image/vnd.adobe.photoshop' }
    if (this.checkString('MPCK')) return { ext: 'mpc', mime: 'audio/x-musepack' }
    if (this.checkString('FORM')) return { ext: 'aif', mime: 'audio/aiff' }
    if (this.checkString('icns', { offset: 0 })) return { ext: 'icns', mime: 'image/icns' }
    if (this.check([80, 75, 3, 4])) {
      let t
      return (
        await new mi(e).unzip((r) => {
          switch (r.filename) {
            case 'META-INF/mozilla.rsa':
              return ((t = { ext: 'xpi', mime: 'application/x-xpinstall' }), { stop: !0 })
            case 'META-INF/MANIFEST.MF':
              return ((t = { ext: 'jar', mime: 'application/java-archive' }), { stop: !0 })
            case 'mimetype':
              return {
                async handler(n) {
                  const o = new TextDecoder('utf-8').decode(n).trim()
                  t = me(o)
                },
                stop: !0,
              }
            case '[Content_Types].xml':
              return {
                async handler(n) {
                  let o = new TextDecoder('utf-8').decode(n)
                  const a = o.indexOf('.main+xml"')
                  if (a === -1) {
                    const u = 'application/vnd.ms-package.3dmanufacturing-3dmodel+xml'
                    o.includes(`ContentType="${u}"`) && (t = me(u))
                  } else {
                    o = o.slice(0, Math.max(0, a))
                    const u = o.lastIndexOf('"'),
                      l = o.slice(Math.max(0, u + 1))
                    t = me(l)
                  }
                },
                stop: !0,
              }
            default:
              return /classes\d*\.dex/.test(r.filename)
                ? ((t = { ext: 'apk', mime: 'application/vnd.android.package-archive' }), { stop: !0 })
                : {}
          }
        }),
        t ?? { ext: 'zip', mime: 'application/zip' }
      )
    }
    if (this.checkString('OggS')) {
      await e.ignore(28)
      const t = new Uint8Array(8)
      return (
        await e.readBuffer(t),
        T(t, [79, 112, 117, 115, 72, 101, 97, 100])
          ? { ext: 'opus', mime: 'audio/ogg; codecs=opus' }
          : T(t, [128, 116, 104, 101, 111, 114, 97])
            ? { ext: 'ogv', mime: 'video/ogg' }
            : T(t, [1, 118, 105, 100, 101, 111, 0])
              ? { ext: 'ogm', mime: 'video/ogg' }
              : T(t, [127, 70, 76, 65, 67])
                ? { ext: 'oga', mime: 'audio/ogg' }
                : T(t, [83, 112, 101, 101, 120, 32, 32])
                  ? { ext: 'spx', mime: 'audio/ogg' }
                  : T(t, [1, 118, 111, 114, 98, 105, 115])
                    ? { ext: 'ogg', mime: 'audio/ogg' }
                    : { ext: 'ogx', mime: 'application/ogg' }
      )
    }
    if (
      this.check([80, 75]) &&
      (this.buffer[2] === 3 || this.buffer[2] === 5 || this.buffer[2] === 7) &&
      (this.buffer[3] === 4 || this.buffer[3] === 6 || this.buffer[3] === 8)
    )
      return { ext: 'zip', mime: 'application/zip' }
    if (this.checkString('MThd')) return { ext: 'mid', mime: 'audio/midi' }
    if (
      this.checkString('wOFF') &&
      (this.check([0, 1, 0, 0], { offset: 4 }) || this.checkString('OTTO', { offset: 4 }))
    )
      return { ext: 'woff', mime: 'font/woff' }
    if (
      this.checkString('wOF2') &&
      (this.check([0, 1, 0, 0], { offset: 4 }) || this.checkString('OTTO', { offset: 4 }))
    )
      return { ext: 'woff2', mime: 'font/woff2' }
    if (this.check([212, 195, 178, 161]) || this.check([161, 178, 195, 212]))
      return { ext: 'pcap', mime: 'application/vnd.tcpdump.pcap' }
    if (this.checkString('DSD ')) return { ext: 'dsf', mime: 'audio/x-dsf' }
    if (this.checkString('LZIP')) return { ext: 'lz', mime: 'application/x-lzip' }
    if (this.checkString('fLaC')) return { ext: 'flac', mime: 'audio/flac' }
    if (this.check([66, 80, 71, 251])) return { ext: 'bpg', mime: 'image/bpg' }
    if (this.checkString('wvpk')) return { ext: 'wv', mime: 'audio/wavpack' }
    if (this.checkString('%PDF')) return { ext: 'pdf', mime: 'application/pdf' }
    if (this.check([0, 97, 115, 109])) return { ext: 'wasm', mime: 'application/wasm' }
    if (this.check([73, 73])) {
      const t = await this.readTiffHeader(!1)
      if (t) return t
    }
    if (this.check([77, 77])) {
      const t = await this.readTiffHeader(!0)
      if (t) return t
    }
    if (this.checkString('MAC ')) return { ext: 'ape', mime: 'audio/ape' }
    if (this.check([26, 69, 223, 163])) {
      async function t() {
        const u = await e.peekNumber(Ct)
        let l = 128,
          f = 0
        for (; (u & l) === 0 && l !== 0; ) (++f, (l >>= 1))
        const c = new Uint8Array(f + 1)
        return (await e.readBuffer(c), c)
      }
      async function r() {
        const u = await t(),
          l = await t()
        l[0] ^= 128 >> (l.length - 1)
        const f = Math.min(6, l.length),
          c = new DataView(u.buffer),
          s = new DataView(l.buffer, l.length - f, f)
        return { id: De(c), len: De(s) }
      }
      async function n(u) {
        for (; u > 0; ) {
          const l = await r()
          if (l.id === 17026) return (await e.readToken(new I(l.len))).replaceAll(/\00.*$/g, '')
          ;(await e.ignore(l.len), --u)
        }
      }
      const o = await r()
      switch (await n(o.len)) {
        case 'webm':
          return { ext: 'webm', mime: 'video/webm' }
        case 'matroska':
          return { ext: 'mkv', mime: 'video/matroska' }
        default:
          return
      }
    }
    if (this.checkString('SQLi')) return { ext: 'sqlite', mime: 'application/x-sqlite3' }
    if (this.check([78, 69, 83, 26])) return { ext: 'nes', mime: 'application/x-nintendo-nes-rom' }
    if (this.checkString('Cr24')) return { ext: 'crx', mime: 'application/x-google-chrome-extension' }
    if (this.checkString('MSCF') || this.checkString('ISc('))
      return { ext: 'cab', mime: 'application/vnd.ms-cab-compressed' }
    if (this.check([237, 171, 238, 219])) return { ext: 'rpm', mime: 'application/x-rpm' }
    if (this.check([197, 208, 211, 198])) return { ext: 'eps', mime: 'application/eps' }
    if (this.check([40, 181, 47, 253])) return { ext: 'zst', mime: 'application/zstd' }
    if (this.check([127, 69, 76, 70])) return { ext: 'elf', mime: 'application/x-elf' }
    if (this.check([33, 66, 68, 78])) return { ext: 'pst', mime: 'application/vnd.ms-outlook' }
    if (this.checkString('PAR1') || this.checkString('PARE'))
      return { ext: 'parquet', mime: 'application/vnd.apache.parquet' }
    if (this.checkString('ttcf')) return { ext: 'ttc', mime: 'font/collection' }
    if (this.check([207, 250, 237, 254])) return { ext: 'macho', mime: 'application/x-mach-binary' }
    if (this.check([4, 34, 77, 24])) return { ext: 'lz4', mime: 'application/x-lz4' }
    if (this.check([79, 84, 84, 79, 0])) return { ext: 'otf', mime: 'font/otf' }
    if (this.checkString('#!AMR')) return { ext: 'amr', mime: 'audio/amr' }
    if (this.checkString('{\\rtf')) return { ext: 'rtf', mime: 'application/rtf' }
    if (this.check([70, 76, 86, 1])) return { ext: 'flv', mime: 'video/x-flv' }
    if (this.checkString('IMPM')) return { ext: 'it', mime: 'audio/x-it' }
    if (
      this.checkString('-lh0-', { offset: 2 }) ||
      this.checkString('-lh1-', { offset: 2 }) ||
      this.checkString('-lh2-', { offset: 2 }) ||
      this.checkString('-lh3-', { offset: 2 }) ||
      this.checkString('-lh4-', { offset: 2 }) ||
      this.checkString('-lh5-', { offset: 2 }) ||
      this.checkString('-lh6-', { offset: 2 }) ||
      this.checkString('-lh7-', { offset: 2 }) ||
      this.checkString('-lzs-', { offset: 2 }) ||
      this.checkString('-lz4-', { offset: 2 }) ||
      this.checkString('-lz5-', { offset: 2 }) ||
      this.checkString('-lhd-', { offset: 2 })
    )
      return { ext: 'lzh', mime: 'application/x-lzh-compressed' }
    if (this.check([0, 0, 1, 186])) {
      if (this.check([33], { offset: 4, mask: [241] })) return { ext: 'mpg', mime: 'video/MP1S' }
      if (this.check([68], { offset: 4, mask: [196] })) return { ext: 'mpg', mime: 'video/MP2P' }
    }
    if (this.checkString('ITSF')) return { ext: 'chm', mime: 'application/vnd.ms-htmlhelp' }
    if (this.check([202, 254, 186, 190])) return { ext: 'class', mime: 'application/java-vm' }
    if (this.checkString('.RMF')) return { ext: 'rm', mime: 'application/vnd.rn-realmedia' }
    if (this.checkString('DRACO')) return { ext: 'drc', mime: 'application/vnd.google.draco' }
    if (this.check([253, 55, 122, 88, 90, 0])) return { ext: 'xz', mime: 'application/x-xz' }
    if (this.checkString('<?xml ')) return { ext: 'xml', mime: 'application/xml' }
    if (this.check([55, 122, 188, 175, 39, 28])) return { ext: '7z', mime: 'application/x-7z-compressed' }
    if (this.check([82, 97, 114, 33, 26, 7]) && (this.buffer[6] === 0 || this.buffer[6] === 1))
      return { ext: 'rar', mime: 'application/x-rar-compressed' }
    if (this.checkString('solid ')) return { ext: 'stl', mime: 'model/stl' }
    if (this.checkString('AC')) {
      const t = new I(4, 'latin1').get(this.buffer, 2)
      if (t.match('^d*') && t >= 1e3 && t <= 1050) return { ext: 'dwg', mime: 'image/vnd.dwg' }
    }
    if (this.checkString('070707')) return { ext: 'cpio', mime: 'application/x-cpio' }
    if (this.checkString('BLENDER')) return { ext: 'blend', mime: 'application/x-blender' }
    if (this.checkString('!<arch>'))
      return (
        await e.ignore(8),
        (await e.readToken(new I(13, 'ascii'))) === 'debian-binary'
          ? { ext: 'deb', mime: 'application/x-deb' }
          : { ext: 'ar', mime: 'application/x-unix-archive' }
      )
    if (
      this.checkString('WEBVTT') &&
      [
        `
`,
        '\r',
        '	',
        ' ',
        '\0',
      ].some((t) => this.checkString(t, { offset: 6 }))
    )
      return { ext: 'vtt', mime: 'text/vtt' }
    if (this.check([137, 80, 78, 71, 13, 10, 26, 10])) {
      await e.ignore(8)
      async function t() {
        return { length: await e.readToken(St), type: await e.readToken(new I(4, 'latin1')) }
      }
      do {
        const r = await t()
        if (r.length < 0) return
        switch (r.type) {
          case 'IDAT':
            return { ext: 'png', mime: 'image/png' }
          case 'acTL':
            return { ext: 'apng', mime: 'image/apng' }
          default:
            await e.ignore(r.length + 4)
        }
      } while (e.position + 8 < e.fileInfo.size)
      return { ext: 'png', mime: 'image/png' }
    }
    if (this.check([65, 82, 82, 79, 87, 49, 0, 0])) return { ext: 'arrow', mime: 'application/vnd.apache.arrow.file' }
    if (this.check([103, 108, 84, 70, 2, 0, 0, 0])) return { ext: 'glb', mime: 'model/gltf-binary' }
    if (
      this.check([102, 114, 101, 101], { offset: 4 }) ||
      this.check([109, 100, 97, 116], { offset: 4 }) ||
      this.check([109, 111, 111, 118], { offset: 4 }) ||
      this.check([119, 105, 100, 101], { offset: 4 })
    )
      return { ext: 'mov', mime: 'video/quicktime' }
    if (this.check([73, 73, 82, 79, 8, 0, 0, 0, 24])) return { ext: 'orf', mime: 'image/x-olympus-orf' }
    if (this.checkString('gimp xcf ')) return { ext: 'xcf', mime: 'image/x-xcf' }
    if (this.checkString('ftyp', { offset: 4 }) && (this.buffer[8] & 96) !== 0) {
      const t = new I(4, 'latin1').get(this.buffer, 8).replace('\0', ' ').trim()
      switch (t) {
        case 'avif':
        case 'avis':
          return { ext: 'avif', mime: 'image/avif' }
        case 'mif1':
          return { ext: 'heic', mime: 'image/heif' }
        case 'msf1':
          return { ext: 'heic', mime: 'image/heif-sequence' }
        case 'heic':
        case 'heix':
          return { ext: 'heic', mime: 'image/heic' }
        case 'hevc':
        case 'hevx':
          return { ext: 'heic', mime: 'image/heic-sequence' }
        case 'qt':
          return { ext: 'mov', mime: 'video/quicktime' }
        case 'M4V':
        case 'M4VH':
        case 'M4VP':
          return { ext: 'm4v', mime: 'video/x-m4v' }
        case 'M4P':
          return { ext: 'm4p', mime: 'video/mp4' }
        case 'M4B':
          return { ext: 'm4b', mime: 'audio/mp4' }
        case 'M4A':
          return { ext: 'm4a', mime: 'audio/x-m4a' }
        case 'F4V':
          return { ext: 'f4v', mime: 'video/mp4' }
        case 'F4P':
          return { ext: 'f4p', mime: 'video/mp4' }
        case 'F4A':
          return { ext: 'f4a', mime: 'audio/mp4' }
        case 'F4B':
          return { ext: 'f4b', mime: 'audio/mp4' }
        case 'crx':
          return { ext: 'cr3', mime: 'image/x-canon-cr3' }
        default:
          return t.startsWith('3g')
            ? t.startsWith('3g2')
              ? { ext: '3g2', mime: 'video/3gpp2' }
              : { ext: '3gp', mime: 'video/3gpp' }
            : { ext: 'mp4', mime: 'video/mp4' }
      }
    }
    if (this.check([82, 73, 70, 70])) {
      if (this.checkString('WEBP', { offset: 8 })) return { ext: 'webp', mime: 'image/webp' }
      if (this.check([65, 86, 73], { offset: 8 })) return { ext: 'avi', mime: 'video/vnd.avi' }
      if (this.check([87, 65, 86, 69], { offset: 8 })) return { ext: 'wav', mime: 'audio/wav' }
      if (this.check([81, 76, 67, 77], { offset: 8 })) return { ext: 'qcp', mime: 'audio/qcelp' }
    }
    if (this.check([73, 73, 85, 0, 24, 0, 0, 0, 136, 231, 116, 216]))
      return { ext: 'rw2', mime: 'image/x-panasonic-rw2' }
    if (this.check([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
      async function t() {
        const r = new Uint8Array(16)
        return (await e.readBuffer(r), { id: r, size: Number(await e.readToken(Bt)) })
      }
      for (await e.ignore(30); e.position + 24 < e.fileInfo.size; ) {
        const r = await t()
        let n = r.size - 24
        if (T(r.id, [145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101])) {
          const o = new Uint8Array(16)
          if (
            ((n -= await e.readBuffer(o)), T(o, [64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43]))
          )
            return { ext: 'asf', mime: 'audio/x-ms-asf' }
          if (T(o, [192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43]))
            return { ext: 'asf', mime: 'video/x-ms-asf' }
          break
        }
        await e.ignore(n)
      }
      return { ext: 'asf', mime: 'application/vnd.ms-asf' }
    }
    if (this.check([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10])) return { ext: 'ktx', mime: 'image/ktx' }
    if ((this.check([126, 16, 4]) || this.check([126, 24, 4])) && this.check([48, 77, 73, 69], { offset: 4 }))
      return { ext: 'mie', mime: 'application/x-mie' }
    if (this.check([39, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], { offset: 2 }))
      return { ext: 'shp', mime: 'application/x-esri-shape' }
    if (this.check([255, 79, 255, 81])) return { ext: 'j2c', mime: 'image/j2c' }
    if (this.check([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10]))
      switch ((await e.ignore(20), await e.readToken(new I(4, 'ascii')))) {
        case 'jp2 ':
          return { ext: 'jp2', mime: 'image/jp2' }
        case 'jpx ':
          return { ext: 'jpx', mime: 'image/jpx' }
        case 'jpm ':
          return { ext: 'jpm', mime: 'image/jpm' }
        case 'mjp2':
          return { ext: 'mj2', mime: 'image/mj2' }
        default:
          return
      }
    if (this.check([255, 10]) || this.check([0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10]))
      return { ext: 'jxl', mime: 'image/jxl' }
    if (this.check([254, 255]))
      return this.check([0, 60, 0, 63, 0, 120, 0, 109, 0, 108], { offset: 2 })
        ? { ext: 'xml', mime: 'application/xml' }
        : void 0
    if (this.check([208, 207, 17, 224, 161, 177, 26, 225])) return { ext: 'cfb', mime: 'application/x-cfb' }
    if (
      (await e.peekBuffer(this.buffer, { length: Math.min(256, e.fileInfo.size), mayBeLess: !0 }),
      this.check([97, 99, 115, 112], { offset: 36 }))
    )
      return { ext: 'icc', mime: 'application/vnd.iccprofile' }
    if (this.checkString('**ACE', { offset: 7 }) && this.checkString('**', { offset: 12 }))
      return { ext: 'ace', mime: 'application/x-ace-compressed' }
    if (this.checkString('BEGIN:')) {
      if (this.checkString('VCARD', { offset: 6 })) return { ext: 'vcf', mime: 'text/vcard' }
      if (this.checkString('VCALENDAR', { offset: 6 })) return { ext: 'ics', mime: 'text/calendar' }
    }
    if (this.checkString('FUJIFILMCCD-RAW')) return { ext: 'raf', mime: 'image/x-fujifilm-raf' }
    if (this.checkString('Extended Module:')) return { ext: 'xm', mime: 'audio/x-xm' }
    if (this.checkString('Creative Voice File')) return { ext: 'voc', mime: 'audio/x-voc' }
    if (this.check([4, 0, 0, 0]) && this.buffer.length >= 16) {
      const t = new DataView(this.buffer.buffer).getUint32(12, !0)
      if (t > 12 && this.buffer.length >= t + 16)
        try {
          const r = new TextDecoder().decode(this.buffer.subarray(16, t + 16))
          if (JSON.parse(r).files) return { ext: 'asar', mime: 'application/x-asar' }
        } catch {}
    }
    if (this.check([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) return { ext: 'mxf', mime: 'application/mxf' }
    if (this.checkString('SCRM', { offset: 44 })) return { ext: 's3m', mime: 'audio/x-s3m' }
    if (this.check([71]) && this.check([71], { offset: 188 })) return { ext: 'mts', mime: 'video/mp2t' }
    if (this.check([71], { offset: 4 }) && this.check([71], { offset: 196 })) return { ext: 'mts', mime: 'video/mp2t' }
    if (this.check([66, 79, 79, 75, 77, 79, 66, 73], { offset: 60 }))
      return { ext: 'mobi', mime: 'application/x-mobipocket-ebook' }
    if (this.check([68, 73, 67, 77], { offset: 128 })) return { ext: 'dcm', mime: 'application/dicom' }
    if (this.check([76, 0, 0, 0, 1, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70]))
      return { ext: 'lnk', mime: 'application/x.ms.shortcut' }
    if (this.check([98, 111, 111, 107, 0, 0, 0, 0, 109, 97, 114, 107, 0, 0, 0, 0]))
      return { ext: 'alias', mime: 'application/x.apple.alias' }
    if (this.checkString('Kaydara FBX Binary  \0')) return { ext: 'fbx', mime: 'application/x.autodesk.fbx' }
    if (
      this.check([76, 80], { offset: 34 }) &&
      (this.check([0, 0, 1], { offset: 8 }) ||
        this.check([1, 0, 2], { offset: 8 }) ||
        this.check([2, 0, 2], { offset: 8 }))
    )
      return { ext: 'eot', mime: 'application/vnd.ms-fontobject' }
    if (this.check([6, 6, 237, 245, 216, 29, 70, 229, 189, 49, 239, 231, 254, 116, 183, 29]))
      return { ext: 'indd', mime: 'application/x-indesign' }
    if (
      (await e.peekBuffer(this.buffer, { length: Math.min(512, e.fileInfo.size), mayBeLess: !0 }),
      (this.checkString('ustar', { offset: 257 }) &&
        (this.checkString('\0', { offset: 262 }) || this.checkString(' ', { offset: 262 }))) ||
        (this.check([0, 0, 0, 0, 0, 0], { offset: 257 }) && xi(this.buffer)))
    )
      return { ext: 'tar', mime: 'application/x-tar' }
    if (this.check([255, 254]))
      return this.check([60, 0, 63, 0, 120, 0, 109, 0, 108, 0], { offset: 2 })
        ? { ext: 'xml', mime: 'application/xml' }
        : this.check(
              [
                255, 14, 83, 0, 107, 0, 101, 0, 116, 0, 99, 0, 104, 0, 85, 0, 112, 0, 32, 0, 77, 0, 111, 0, 100, 0, 101,
                0, 108, 0,
              ],
              { offset: 2 },
            )
          ? { ext: 'skp', mime: 'application/vnd.sketchup.skp' }
          : void 0
    if (this.checkString('-----BEGIN PGP MESSAGE-----')) return { ext: 'pgp', mime: 'application/pgp-encrypted' }
  }
  detectImprecise = async (e) => {
    if (
      ((this.buffer = new Uint8Array(Y)),
      await e.peekBuffer(this.buffer, { length: Math.min(8, e.fileInfo.size), mayBeLess: !0 }),
      this.check([0, 0, 1, 186]) || this.check([0, 0, 1, 179]))
    )
      return { ext: 'mpg', mime: 'video/mpeg' }
    if (this.check([0, 1, 0, 0, 0])) return { ext: 'ttf', mime: 'font/ttf' }
    if (this.check([0, 0, 1, 0])) return { ext: 'ico', mime: 'image/x-icon' }
    if (this.check([0, 0, 2, 0])) return { ext: 'cur', mime: 'image/x-icon' }
    if (
      (await e.peekBuffer(this.buffer, {
        length: Math.min(2 + this.options.mpegOffsetTolerance, e.fileInfo.size),
        mayBeLess: !0,
      }),
      this.buffer.length >= 2 + this.options.mpegOffsetTolerance)
    )
      for (let t = 0; t <= this.options.mpegOffsetTolerance; ++t) {
        const r = this.scanMpeg(t)
        if (r) return r
      }
  }
  async readTiffTag(e) {
    const t = await this.tokenizer.readToken(e ? H : g)
    switch ((this.tokenizer.ignore(10), t)) {
      case 50341:
        return { ext: 'arw', mime: 'image/x-sony-arw' }
      case 50706:
        return { ext: 'dng', mime: 'image/x-adobe-dng' }
    }
  }
  async readTiffIFD(e) {
    const t = await this.tokenizer.readToken(e ? H : g)
    for (let r = 0; r < t; ++r) {
      const n = await this.readTiffTag(e)
      if (n) return n
    }
  }
  async readTiffHeader(e) {
    const t = (e ? H : g).get(this.buffer, 2),
      r = (e ? Ft : w).get(this.buffer, 4)
    if (t === 42) {
      if (r >= 6) {
        if (this.checkString('CR', { offset: 8 })) return { ext: 'cr2', mime: 'image/x-canon-cr2' }
        if (r >= 8) {
          const o = (e ? H : g).get(this.buffer, 8),
            a = (e ? H : g).get(this.buffer, 10)
          if ((o === 28 && a === 254) || (o === 31 && a === 11)) return { ext: 'nef', mime: 'image/x-nikon-nef' }
        }
      }
      return (await this.tokenizer.ignore(r), (await this.readTiffIFD(e)) ?? { ext: 'tif', mime: 'image/tiff' })
    }
    if (t === 43) return { ext: 'tif', mime: 'image/tiff' }
  }
  scanMpeg(e) {
    if (this.check([255, 224], { offset: e, mask: [255, 224] })) {
      if (this.check([16], { offset: e + 1, mask: [22] }))
        return this.check([8], { offset: e + 1, mask: [8] })
          ? { ext: 'aac', mime: 'audio/aac' }
          : { ext: 'aac', mime: 'audio/aac' }
      if (this.check([2], { offset: e + 1, mask: [6] })) return { ext: 'mp3', mime: 'audio/mpeg' }
      if (this.check([4], { offset: e + 1, mask: [6] })) return { ext: 'mp2', mime: 'audio/mpeg' }
      if (this.check([6], { offset: e + 1, mask: [6] })) return { ext: 'mp1', mime: 'audio/mpeg' }
    }
  }
}
new Set(vi)
new Set(wi)
const yi = Object.freeze(
  Object.defineProperty(
    { __proto__: null, FileTypeParser: Ze, fileTypeFromBlob: Xe, reasonableDetectionSizeInBytes: Y },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)
class bi {
  maxConcurrent
  queue = []
  activeCount = 0
  constructor(e = {}) {
    const { maxConcurrent: t = 2 } = e
    this.maxConcurrent = Math.max(1, t)
  }
  enqueue(e) {
    return new Promise((t, r) => {
      const n = { execute: e, resolve: t, reject: r }
      ;(this.queue.push(n), this.drainQueue())
    })
  }
  getActiveCount() {
    return this.activeCount
  }
  getPendingCount() {
    return this.queue.length
  }
  getMaxConcurrent() {
    return this.maxConcurrent
  }
  setMaxConcurrent(e) {
    if (!Number.isFinite(e)) throw new TypeError('maxConcurrent must be a finite number')
    const t = Math.max(1, Math.floor(e))
    t !== this.maxConcurrent && ((this.maxConcurrent = t), this.drainQueue())
  }
  drainQueue() {
    if (this.activeCount >= this.maxConcurrent) return
    const e = this.queue.shift()
    e &&
      ((this.activeCount += 1),
      (async () => {
        try {
          const t = await e.execute()
          e.resolve(t)
        } catch (t) {
          e.reject(t)
        } finally {
          ;((this.activeCount = Math.max(0, this.activeCount - 1)), this.drainQueue())
        }
      })())
  }
}
class ge {
  maxSize
  cache
  cleanupFn
  constructor(e = 10, t) {
    ;((this.maxSize = e), (this.cache = new Map()), (this.cleanupFn = t))
  }
  get(e) {
    const t = this.cache.get(e)
    if (t !== void 0) return (this.cache.delete(e), this.cache.set(e, t), t)
  }
  set(e, t) {
    if (this.cache.has(e)) {
      const r = this.cache.get(e)
      ;(this._cleanup(r, e, `Replacing existing cache entry for ${String(e)}`), this.cache.delete(e))
    } else if (this.cache.size >= this.maxSize) {
      const r = this.cache.keys().next().value
      if (r !== void 0) {
        const n = this.cache.get(r)
        ;(this._cleanup(n, r, `LRU eviction: ${String(r)}`), this.cache.delete(r))
      }
    }
    ;(this.cache.set(e, t),
      console.info(`LRU Cache: Added ${String(e)}, cache size: ${this.cache.size}/${this.maxSize}`))
  }
  delete(e) {
    const t = this.cache.get(e)
    return t !== void 0 ? (this._cleanup(t, e, `Manual deletion: ${String(e)}`), this.cache.delete(e)) : !1
  }
  has(e) {
    return this.cache.has(e)
  }
  clear() {
    let e = 0
    for (const [t, r] of this.cache.entries()) (this._cleanup(r, t, `Cache clear: ${String(t)}`), e++)
    ;(this.cache.clear(), console.info(`LRU Cache: Cleared ${e} cached items`))
  }
  size() {
    return this.cache.size
  }
  getStats() {
    return { size: this.cache.size, maxSize: this.maxSize, keys: Array.from(this.cache.keys()) }
  }
  values() {
    return this.cache.values()
  }
  entries() {
    return this.cache.entries()
  }
  _cleanup(e, t, r) {
    if (this.cleanupFn)
      try {
        this.cleanupFn(e, t, r)
      } catch (n) {
        console.warn(`LRU Cache cleanup failed (${r}):`, n)
      }
  }
}
class ki {
  getName() {
    return 'HEIC'
  }
  getSupportedFormats() {
    return ['image/heic', 'image/heif']
  }
  async shouldConvert(e) {
    try {
      return !Si()
    } catch (t) {
      return (console.error('HEIC browser support detection failed:', t), !1)
    }
  }
  async convert(e, t, r) {
    const { onLoadingStateUpdate: n } = r || {}
    try {
      const o = ee.get(te)
      n?.({
        isConverting: !0,
        isQueueWaiting: !1,
        conversionMessage: o.t('loading.heic.converting'),
        isHeicFormat: !0,
        loadingProgress: 100,
        loadedBytes: e.size,
        totalBytes: e.size,
      })
      const a = await Bi(e, t)
      return { url: a.url, convertedSize: a.convertedSize, format: a.format, originalSize: a.originalSize }
    } catch (o) {
      throw (console.error('HEIC conversion failed:', o), new Error(`HEIC conversion failed: ${o}`))
    }
  }
}
const Oe = new ge(10, (i, e, t) => {
  try {
    ;(URL.revokeObjectURL(i.url), console.info(`HEIC cache: Revoked blob URL - ${t}`))
  } catch (r) {
    console.warn(`Failed to revoke HEIC blob URL (${t}):`, r)
  }
})
function Ci(i, e) {
  const t = e.quality || 1,
    r = e.format || 'image/jpeg'
  return `${i}-${t}-${r}`
}
async function Fi(i) {
  try {
    return await ut(i)
  } catch (e) {
    return (console.warn('Failed to detect HEIC format:', e), !1)
  }
}
const Si = () => {
  const e = navigator.userAgent.match(/version\/(\d+)/i)?.[1],
    t = e ? Number.parseInt(e, 10) : 0
  return pe && t >= 17
}
async function Bi(i, e, t = {}) {
  const { quality: r = 1, format: n = 'image/jpeg' } = t,
    o = Ci(e, t),
    a = Oe.get(o)
  if (a) return (console.info('Using cached HEIC conversion result', a), a)
  try {
    if (!(await Fi(i))) throw new Error('File is not in HEIC/HEIF format')
    const l = await lt({ blob: i, type: n, quality: r }),
      c = { url: URL.createObjectURL(l), originalSize: i.size, convertedSize: l.size, format: n }
    return (
      Oe.set(o, c),
      console.info(
        `HEIC conversion completed and cached: ${(i.size / 1024).toFixed(1)}KB → ${(l.size / 1024).toFixed(1)}KB`,
      ),
      c
    )
  } catch (u) {
    throw (
      console.error('HEIC conversion failed:', u),
      new Error(`Failed to convert HEIC image: ${u instanceof Error ? u.message : 'Unknown error'}`)
    )
  }
}
class Ei {
  getName() {
    return 'TIFF'
  }
  getSupportedFormats() {
    return ['image/tiff', 'image/tif']
  }
  async shouldConvert(e) {
    return !this.isBrowserSupportTiff()
  }
  async convert(e, t, r) {
    const { onLoadingStateUpdate: n } = r || {}
    try {
      n?.({ isConverting: !0, isQueueWaiting: !1, conversionMessage: 'Converting TIFF image...' })
      const o = await this.convertTiffToJpeg(e)
      return { url: o.url, convertedSize: o.size, format: 'image/jpeg', originalSize: e.size }
    } catch (o) {
      throw (console.error('TIFF conversion failed:', o), new Error(`TIFF conversion failed: ${o}`))
    }
  }
  isBrowserSupportTiff() {
    return !!pe
  }
  async convertTiffToJpeg(e) {
    try {
      const t = await Ve(() => import('./index-uHGvuG-h.js'), []),
        r = await e.arrayBuffer(),
        n = t.decode(r)
      if (!n || n.length === 0) throw new Error('Failed to decode TIFF image')
      const o = n[0],
        { width: a, height: u, data: l, bitsPerSample: f } = o,
        c = document.createElement('canvas'),
        s = c.getContext('2d')
      if (!s) throw new Error('Failed to get canvas context')
      ;((c.width = a), (c.height = u))
      const m = s.createImageData(a, u),
        d = m.data
      return (
        this.processPixelData(l, d, f, o.alpha),
        s.putImageData(m, 0, 0),
        new Promise((h, y) => {
          c.toBlob(
            (x) => {
              if (x) {
                const v = URL.createObjectURL(x)
                h({ url: v, size: x.size })
              } else y(new Error('Failed to convert TIFF to JPEG'))
            },
            'image/jpeg',
            1,
          )
        })
      )
    } catch (t) {
      throw (console.error('TIFF to JPEG conversion failed:', t), t)
    }
  }
  processPixelData(e, t, r, n = !1) {
    const o = n ? 4 : 3,
      a = t.length / 4
    for (let u = 0; u < a; u++) {
      const l = u * o,
        f = u * 4
      switch (r) {
        case 8: {
          const c = e
          ;((t[f] = c[l] || 0),
            (t[f + 1] = o > 1 ? c[l + 1] || 0 : c[l] || 0),
            (t[f + 2] = o > 2 ? c[l + 2] || 0 : c[l] || 0),
            (t[f + 3] = (n && c[l + 3]) || 255))
          break
        }
        case 16: {
          const c = e
          ;((t[f] = Math.round((c[l] || 0) / 257)),
            (t[f + 1] = o > 1 ? Math.round((c[l + 1] || 0) / 257) : Math.round((c[l] || 0) / 257)),
            (t[f + 2] = o > 2 ? Math.round((c[l + 2] || 0) / 257) : Math.round((c[l] || 0) / 257)),
            (t[f + 3] = n ? Math.round((c[l + 3] || 65535) / 257) : 255))
          break
        }
        case 32: {
          const c = e
          ;((t[f] = Math.round((c[l] || 0) * 255)),
            (t[f + 1] = o > 1 ? Math.round((c[l + 1] || 0) * 255) : Math.round((c[l] || 0) * 255)),
            (t[f + 2] = o > 2 ? Math.round((c[l + 2] || 0) * 255) : Math.round((c[l] || 0) * 255)),
            (t[f + 3] = n ? Math.round((c[l + 3] || 1) * 255) : 255))
          break
        }
      }
    }
  }
}
class zi {
  strategies = new Map()
  conversionPipeline
  pendingConversions = new Map()
  constructor(e = {}) {
    ;((this.conversionPipeline = new bi({ maxConcurrent: e.maxConcurrent ?? 2 })),
      this.registerStrategy(new ki()),
      this.registerStrategy(new Ei()))
  }
  registerStrategy(e) {
    ;(e.getSupportedFormats().forEach((t) => {
      this.strategies.set(t, e)
    }),
      console.info(`Registered image converter strategy: ${e.getName()}`))
  }
  removeStrategy(e) {
    let t = !1
    const r = Array.from(this.strategies.values()).find((n) => n.getName() === e)
    return (
      r &&
        (r.getSupportedFormats().forEach((n) => {
          this.strategies.get(n) === r && (this.strategies.delete(n), (t = !0))
        }),
        t && console.info(`Removed image converter strategy: ${e}`)),
      t
    )
  }
  getStrategies() {
    const e = new Set(this.strategies.values())
    return Array.from(e)
  }
  async findSuitableStrategy(e) {
    try {
      const { fileTypeFromBlob: t } = await Ve(
          async () => {
            const { fileTypeFromBlob: o } = await Promise.resolve().then(() => yi)
            return { fileTypeFromBlob: o }
          },
          void 0,
        ),
        r = await t(e)
      if (!r) return (console.info('Could not detect file type with file-type library'), null)
      console.info(`Detected file type: ${r.ext} (${r.mime})`)
      const n = this.strategies.get(r.mime)
      return n
        ? (await n.shouldConvert(e))
          ? (console.info(`Found suitable conversion strategy: ${n.getName()}`), n)
          : (console.info(`Strategy ${n.getName()} detected but conversion not needed`), null)
        : (console.info(`No strategy found for MIME type: ${r.mime}`), null)
    } catch (t) {
      return (console.error('File type detection failed:', t), null)
    }
  }
  async convertImage(e, t, r) {
    const n = await this.findSuitableStrategy(e)
    if (!n) return (console.info('No conversion strategy needed for this image'), null)
    console.info(`Converting image using ${n.getName()} strategy`)
    const o = this.getConversionTaskKey(n, t),
      a = r?.onLoadingStateUpdate,
      u = this.conversionPipeline.getActiveCount(),
      l = this.conversionPipeline.getMaxConcurrent(),
      f = u >= l,
      c = this.pendingConversions.get(o)
    if (c) return (console.info(`Joining pending conversion task for ${n.getName()} (${t})`), await c)
    if (a && f) {
      const m = ee.get(te)
      a({ isConverting: !0, isQueueWaiting: !0, conversionMessage: m.t('loading.queue.waiting') })
    }
    const s = this.conversionPipeline.enqueue(async () => {
      try {
        return (a?.({ isQueueWaiting: !1, conversionMessage: void 0 }), await n.convert(e, t, r))
      } finally {
        this.pendingConversions.delete(o)
      }
    })
    return (this.pendingConversions.set(o, s), await s)
  }
  getSupportedFormats() {
    return Array.from(this.strategies.keys())
  }
  getPipelineStats() {
    return { active: this.conversionPipeline.getActiveCount(), pending: this.conversionPipeline.getPendingCount() }
  }
  setMaxConcurrentConversions(e) {
    this.conversionPipeline.setMaxConcurrent(e)
  }
  getConversionTaskKey(e, t) {
    return `${e.getName()}::${t}`
  }
}
const Mi = new zi()
async function Ti(i, e) {
  try {
    const { motionPhotoOffset: t, motionPhotoVideoSize: r } = e
    if (r && r > 0)
      try {
        const o = await Ii(i, t, r)
        if (o) return URL.createObjectURL(o)
      } catch (o) {
        console.warn('[motion-photo] Range request failed, falling back to full fetch:', o)
      }
    const n = await Ai(i, t, r)
    return n ? URL.createObjectURL(n) : null
  } catch (t) {
    return (console.error('[motion-photo] Failed to extract video:', t), null)
  }
}
async function Ii(i, e, t) {
  const r = e + t - 1,
    n = await fetch(i, { headers: { Range: `bytes=${e}-${r}` } })
  if (n.status !== 206) throw new Error('Range request not supported')
  const o = await n.blob()
  if (!(await Ye(o))) throw new Error('Invalid MP4 data')
  return new Blob([o], { type: 'video/mp4' })
}
async function Ai(i, e, t) {
  const n = await (await fetch(i)).arrayBuffer(),
    o = t ? n.slice(e, e + t) : n.slice(e),
    a = new Blob([o], { type: 'video/mp4' })
  return (await Ye(a)) ? a : (console.error('[motion-photo] Extracted data is not a valid MP4'), null)
}
async function Ye(i) {
  if (i.size < 32) return !1
  const e = await i.slice(0, 32).arrayBuffer(),
    t = new Uint8Array(e),
    r = [102, 116, 121, 112]
  for (let n = 0; n <= t.length - 4; n++)
    if (t[n] === r[0] && t[n + 1] === r[1] && t[n + 2] === r[2] && t[n + 3] === r[3]) return !0
  return !1
}
async function Ui(i, e = {}) {
  try {
    return await Ri(i, e)
  } catch (t) {
    return (
      console.error('Transmux error:', t),
      { success: !1, error: t instanceof Error ? t.message : 'Unknown transmux error' }
    )
  }
}
async function Ri(i, e = {}) {
  const { onProgress: t } = e
  try {
    console.info('🎯 Starting simple transmux conversion')
    const { t: r } = $e()
    t?.({ isConverting: !0, progress: 10, message: r('video.conversion.transmux.fetching') })
    const n = await fetch(i)
    if (!n.ok) throw new Error(`Failed to fetch video: ${n.statusText}`)
    const o = await n.arrayBuffer()
    ;(t?.({ isConverting: !0, progress: 30, message: r('video.conversion.transmux.analyzing') }),
      t?.({ isConverting: !0, progress: 60, message: r('video.conversion.transmux.converting') }))
    const a = new Uint8Array(o)
    t?.({ isConverting: !0, progress: 80, message: r('video.conversion.transmux.creating') })
    const u = new Blob([a], { type: 'video/mp4' }),
      l = URL.createObjectURL(u)
    return (
      t?.({ isConverting: !1, progress: 100, message: r('video.conversion.transmux.success') }),
      { success: !0, videoUrl: l, convertedSize: u.size }
    )
  } catch (r) {
    return (
      console.error('Simple transmux error:', r),
      { success: !1, error: r instanceof Error ? r.message : 'Simple transmux failed' }
    )
  }
}
const de = new ge(10, (i, e, t) => {
  if (i.videoUrl)
    try {
      ;(URL.revokeObjectURL(i.videoUrl), console.info(`Video cache: Revoked blob URL - ${t}`))
    } catch (r) {
      console.warn(`Failed to revoke video blob URL (${t}):`, r)
    }
})
function Li(i, e) {
  return new Promise((t) => {
    Ui(i, { onProgress: e })
      .then((r) => {
        t(r)
      })
      .catch((r) => {
        ;(console.error('Transmux conversion failed:', r),
          t({ success: !1, error: r instanceof Error ? r.message : 'Transmux failed' }))
      })
  })
}
function Di() {
  const e = document.createElement('video').canPlayType('video/quicktime')
  return pe ? !0 : e === 'probably' || e === 'maybe'
}
function Oi(i) {
  const e = i.toLowerCase()
  return e.includes('.mov') || e.endsWith('.mov')
    ? Di()
      ? (console.info('Browser natively supports MOV format, skipping conversion'), !1)
      : (console.info('Browser does not support MOV format, conversion needed'), !0)
    : !1
}
async function Pi(i, e, t = !1) {
  const { t: r } = $e()
  if (t) (console.info('Force reconversion: clearing cached result for', i), de.delete(i))
  else {
    const n = de.get(i)
    if (n)
      return (
        console.info('Using cached video conversion result'),
        e?.({ isConverting: !1, progress: 100, message: r('video.conversion.cached.result') }),
        console.info('Cached video conversion result:', n),
        n
      )
  }
  try {
    ;(console.info('🎯 Target format: MP4 (H.264)'),
      e?.({ isConverting: !0, progress: 0, message: r('video.conversion.transmux.high.quality') }))
    const n = await Li(i, e)
    return (
      de.set(i, n),
      n.success
        ? console.info('conversion completed successfully and cached')
        : console.error('conversion failed:', n.error),
      n
    )
  } catch (n) {
    return (
      console.error('conversion failed:', n),
      { success: !1, error: `Conversion Failed: ${n instanceof Error ? n.message : n}` }
    )
  }
}
const Pe = new ge(10, (i, e, t) => {
  try {
    ;(URL.revokeObjectURL(i.blobSrc), console.info(`Regular image cache: Revoked blob URL - ${t}`))
  } catch (r) {
    console.warn(`Failed to revoke regular image blob URL (${t}):`, r)
  }
})
class qi {
  currentXHR = null
  delayTimer = null
  async isValidImageBlob(e) {
    if (e.size === 0) return (console.warn('Empty blob detected'), !1)
    try {
      const t = await Xe(e)
      return t
        ? t.mime.startsWith('image/')
          ? (console.info(`Valid image detected: ${t.ext} (${t.mime})`), !0)
          : (console.warn(`Invalid file type detected: ${t.ext} (${t.mime})`), !1)
        : (console.warn('Could not detect file type from blob'), !1)
    } catch (t) {
      return (console.error('Failed to detect file type:', t), !1)
    }
  }
  async loadImage(e, t = {}) {
    const { onProgress: r, onError: n, onLoadingStateUpdate: o } = t
    return (
      o?.({ isVisible: !0 }),
      new Promise((a, u) => {
        this.delayTimer = setTimeout(async () => {
          const l = new XMLHttpRequest()
          ;(l.open('GET', e),
            (l.responseType = 'blob'),
            (l.onload = async () => {
              if (l.status === 200)
                try {
                  const f = l.response
                  if (!(await this.isValidImageBlob(f))) {
                    ;(o?.({ isVisible: !1 }), n?.(), u(new Error('Response is not a valid image')))
                    return
                  }
                  const c = await this.processImageBlob(f, e, t)
                  a(c)
                } catch (f) {
                  ;(o?.({ isVisible: !1 }), n?.(), u(f))
                }
              else (o?.({ isVisible: !1 }), n?.(), u(new Error(`HTTP ${l.status}`)))
            }),
            (l.onprogress = (f) => {
              if (f.lengthComputable) {
                const c = (f.loaded / f.total) * 100
                ;(o?.({ loadingProgress: c, loadedBytes: f.loaded, totalBytes: f.total }), r?.(c))
              }
            }),
            (l.onerror = () => {
              ;(o?.({ isVisible: !1 }), n?.(), u(new Error('Network error')))
            }),
            l.send(),
            (this.currentXHR = l))
        }, 300)
      })
    )
  }
  async processVideo(e, t, r = {}) {
    const { onLoadingStateUpdate: n } = r
    return new Promise((o, a) => {
      ;(async () => {
        const l = ee.get(te)
        try {
          if (e.type === 'motion-photo') {
            ;(console.info('Processing Motion Photo embedded video...'),
              n?.({ isVisible: !0, conversionMessage: l.t('video.motion-photo.extracting') }))
            const f = await Ti(e.imageUrl, {
              motionPhotoOffset: e.offset,
              motionPhotoVideoSize: e.size,
              presentationTimestampUs: e.presentationTimestamp,
            })
            if (f) {
              ;((t.src = f),
                t.load(),
                console.info('Motion Photo video extracted successfully'),
                n?.({ isVisible: !1 }))
              const c = await new Promise((s) => {
                const m = () => {
                  ;(t.removeEventListener('canplaythrough', m),
                    s({ convertedVideoUrl: f, conversionMethod: 'motion-photo-extraction' }))
                }
                t.addEventListener('canplaythrough', m)
              })
              o(c)
            } else throw new Error('Failed to extract Motion Photo video')
          } else if (e.type === 'live-photo')
            if (Oi(e.videoUrl)) {
              const f = await this.convertVideo(e.videoUrl, t, r)
              o(f)
            } else {
              const f = await this.loadDirectVideo(e.videoUrl, t)
              o(f)
            }
          else throw new Error('No video source provided')
        } catch (f) {
          ;(console.error('Failed to process video:', f), n?.({ isVisible: !1 }), a(f))
        }
      })()
    })
  }
  async processImageBlob(e, t, r) {
    const { onError: n, onLoadingStateUpdate: o } = r
    try {
      const a = await Mi.convertImage(e, t, r)
      return a
        ? (console.info(`Image converted: ${(e.size / 1024).toFixed(1)}KB → ${(a.convertedSize / 1024).toFixed(1)}KB`),
          o?.({ isVisible: !1 }),
          { blobSrc: a.url, convertedUrl: a.url })
        : this.processRegularImage(e, t, r)
    } catch (a) {
      console.error('Image conversion failed:', a)
      try {
        return (console.info('Falling back to regular image processing'), this.processRegularImage(e, t, r))
      } catch (u) {
        throw (console.error('Fallback to regular image processing also failed:', u), o?.({ isVisible: !1 }), n?.(), a)
      }
    }
  }
  processRegularImage(e, t, r) {
    const { onLoadingStateUpdate: n } = r,
      o = t,
      a = Pe.get(o)
    if (a) return (console.info('Using cached regular image result', a), n?.({ isVisible: !1 }), { blobSrc: a.blobSrc })
    const u = URL.createObjectURL(e),
      l = { blobSrc: u, originalSize: e.size, format: e.type }
    return (
      Pe.set(o, l),
      console.info(`Regular image processed and cached: ${(e.size / 1024).toFixed(1)}KB, URL: ${t}`),
      n?.({ isVisible: !1 }),
      { blobSrc: u }
    )
  }
  async convertVideo(e, t, r) {
    const { onLoadingStateUpdate: n } = r
    ;(n?.({ isVisible: !0, isConverting: !0, loadingProgress: 0 }), console.info('Converting MOV video to MP4...'))
    const o = ee.get(te),
      a = await Pi(e, (u) => {
        const f = [o.t('video.codec.keyword'), 'encoder', 'codec', '编码器'].some((c) =>
          u.message.toLowerCase().includes(c.toLowerCase()),
        )
        n?.({
          isVisible: !0,
          isConverting: u.isConverting,
          loadingProgress: u.progress,
          conversionMessage: u.message,
          codecInfo: f ? u.message : void 0,
        })
      })
    if (a.success && a.videoUrl) {
      const u = a.videoUrl
      return (
        (t.src = a.videoUrl),
        t.load(),
        console.info(
          `Video conversion completed. Size: ${a.convertedSize ? Math.round(a.convertedSize / 1024) : 'unknown'}KB`,
        ),
        n?.({ isVisible: !1 }),
        new Promise((l) => {
          const f = () => {
            ;(t.removeEventListener('canplaythrough', f), l({ convertedVideoUrl: u }))
          }
          t.addEventListener('canplaythrough', f)
        })
      )
    } else
      throw (
        console.error('Video conversion failed:', a.error),
        n?.({ isVisible: !1 }),
        new Error(a.error || 'Video conversion failed')
      )
  }
  async loadDirectVideo(e, t) {
    return (
      (t.src = e),
      t.load(),
      new Promise((r) => {
        const n = () => {
          ;(t.removeEventListener('canplaythrough', n), r({ conversionMethod: '' }))
        }
        t.addEventListener('canplaythrough', n)
      })
    )
  }
  cleanup() {
    ;(this.delayTimer && (clearTimeout(this.delayTimer), (this.delayTimer = null)),
      this.currentXHR && (this.currentXHR.abort(), (this.currentXHR = null)))
  }
}
const Wi = (i) => {
  const e = at.c(3)
  let t, r
  ;(e[0] !== i
    ? ((t = () => {
        const n = oe.url.endsWith('/') ? oe.url.slice(0, -1) : oe.url,
          o = i ? `${n}${i.startsWith('/') ? '' : '/'}${i}` : n
        let a = document.querySelector('link[rel="canonical"]')
        ;(a || ((a = document.createElement('link')), (a.rel = 'canonical'), document.head.append(a)), (a.href = o))
      }),
      (r = [i]),
      (e[0] = i),
      (e[1] = t),
      (e[2] = r))
    : ((t = e[1]), (r = e[2])),
    je.useEffect(t, r))
}
export { qi as I, Wi as a, _i as g, Hi as i, Ni as u }
