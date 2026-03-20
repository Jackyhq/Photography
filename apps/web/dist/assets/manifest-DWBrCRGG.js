import { r as C, j as s, c as k } from '../vendor/1-CkNOVE2J.js'
import { p as L, B as M, S as _ } from './index-BDtK18ZX.js'
import '../vendor/2-VRqxSGaj.js'
const E = (r) => {
    const e = k.c(8),
      { data: t } = r
    let x, o
    if (e[0] !== t) {
      const d = JSON.stringify(t, null, 2),
        l = $
      ;((o = 'text-sm leading-6 text-zinc-300'), (x = l(d)), (e[0] = t), (e[1] = x), (e[2] = o))
    } else ((x = e[1]), (o = e[2]))
    let i
    e[3] !== x ? ((i = s.jsx('code', { dangerouslySetInnerHTML: { __html: x } })), (e[3] = x), (e[4] = i)) : (i = e[4])
    let a
    return (
      e[5] !== o || e[6] !== i
        ? ((a = s.jsx('pre', { className: o, children: i })), (e[5] = o), (e[6] = i), (e[7] = a))
        : (a = e[7]),
      a
    )
  },
  S = (r) => {
    const e = k.c(13),
      { label: t, value: x, icon: o } = r
    let i
    e[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((i = s.jsx('div', {
          className: 'absolute inset-0 bg-gradient-to-br from-zinc-800/0 via-zinc-800/5 to-zinc-800/10',
        })),
        (e[0] = i))
      : (i = e[0])
    let a
    e[1] !== o ? ((a = s.jsx('div', { className: 'text-3xl', children: o })), (e[1] = o), (e[2] = a)) : (a = e[2])
    let d
    e[3] !== x
      ? ((d = s.jsx('div', { className: 'text-2xl font-bold text-zinc-100', children: x })), (e[3] = x), (e[4] = d))
      : (d = e[4])
    let l
    e[5] !== t
      ? ((l = s.jsx('div', { className: 'text-sm text-zinc-400', children: t })), (e[5] = t), (e[6] = l))
      : (l = e[6])
    let n
    e[7] !== d || e[8] !== l
      ? ((n = s.jsxs('div', { className: 'text-right', children: [d, l] })), (e[7] = d), (e[8] = l), (e[9] = n))
      : (n = e[9])
    let c
    return (
      e[10] !== a || e[11] !== n
        ? ((c = s.jsxs('div', {
            className:
              'group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/80',
            children: [
              i,
              s.jsx('div', {
                className: 'relative',
                children: s.jsxs('div', { className: 'flex items-center justify-between', children: [a, n] }),
              }),
            ],
          })),
          (e[10] = a),
          (e[11] = n),
          (e[12] = c))
        : (c = e[12]),
      c
    )
  },
  q = (r) => {
    const e = k.c(24),
      { data: t } = r,
      x = t.length,
      o = t.reduce(O, 0)
    let i
    e[0] !== t
      ? ((i = new Set()),
        t.forEach((g) => {
          g.tags?.forEach((w) => i.add(w))
        }),
        (e[0] = t),
        (e[1] = i))
      : (i = e[1])
    let a
    e[2] !== t
      ? ((a = new Set()),
        t.forEach((g) => {
          g.exif?.Make && g.exif?.Model && a.add(`${g.exif.Make} ${g.exif.Model}`)
        }),
        (e[2] = t),
        (e[3] = a))
      : (a = e[3])
    const d = o / 1073741824
    let l
    e[4] !== d ? ((l = d.toFixed(2)), (e[4] = d), (e[5] = l)) : (l = e[5])
    let n
    e[6] !== a.size || e[7] !== l || e[8] !== x || e[9] !== i.size
      ? ((n = { totalPhotos: x, totalSize: l, uniqueTags: i.size, uniqueCameras: a.size }),
        (e[6] = a.size),
        (e[7] = l),
        (e[8] = x),
        (e[9] = i.size),
        (e[10] = n))
      : (n = e[10])
    const c = n
    let m
    e[11] !== c.totalPhotos
      ? ((m = s.jsx(S, { label: 'Photos', value: c.totalPhotos, icon: '📸' })), (e[11] = c.totalPhotos), (e[12] = m))
      : (m = e[12])
    const b = `${c.totalSize} GB`
    let u
    e[13] !== b ? ((u = s.jsx(S, { label: 'Storage', value: b, icon: '💾' })), (e[13] = b), (e[14] = u)) : (u = e[14])
    let h
    e[15] !== c.uniqueTags
      ? ((h = s.jsx(S, { label: 'Tags', value: c.uniqueTags, icon: '🏷️' })), (e[15] = c.uniqueTags), (e[16] = h))
      : (h = e[16])
    let f
    e[17] !== c.uniqueCameras
      ? ((f = s.jsx(S, { label: 'Cameras', value: c.uniqueCameras, icon: '📷' })),
        (e[17] = c.uniqueCameras),
        (e[18] = f))
      : (f = e[18])
    let p
    return (
      e[19] !== m || e[20] !== u || e[21] !== h || e[22] !== f
        ? ((p = s.jsxs('div', { className: 'grid grid-cols-2 gap-4 lg:grid-cols-4', children: [m, u, h, f] })),
          (e[19] = m),
          (e[20] = u),
          (e[21] = h),
          (e[22] = f),
          (e[23] = p))
        : (p = e[23]),
      p
    )
  },
  P = (r) => {
    const e = k.c(37),
      { photo: t, index: x } = r
    let o
    e[0] === Symbol.for('react.memo_cache_sentinel')
      ? ((o = s.jsx('div', {
          className:
            'absolute inset-0 bg-gradient-to-br from-zinc-800/0 via-zinc-800/5 to-zinc-800/10 opacity-0 transition-opacity group-hover:opacity-100',
        })),
        (e[0] = o))
      : (o = e[0])
    let i
    e[1] !== t.thumbnailUrl || e[2] !== t.title
      ? ((i = s.jsx('div', {
          className: 'flex-shrink-0',
          children: t.thumbnailUrl
            ? s.jsxs('div', {
                className: 'relative overflow-hidden rounded-lg',
                children: [
                  s.jsx('img', {
                    src: t.thumbnailUrl,
                    alt: t.title,
                    className: 'h-16 w-16 object-cover transition-transform group-hover:scale-110',
                  }),
                  s.jsx('div', { className: 'absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' }),
                ],
              })
            : s.jsx('div', {
                className: 'flex h-16 w-16 items-center justify-center rounded-lg bg-zinc-800 text-zinc-600',
                children: s.jsx('span', { className: 'text-xl', children: '📷' }),
              }),
        })),
        (e[1] = t.thumbnailUrl),
        (e[2] = t.title),
        (e[3] = i))
      : (i = e[3])
    const a = x + 1
    let d
    e[4] !== a
      ? ((d = s.jsx('span', {
          className:
            'inline-flex h-6 w-8 items-center justify-center rounded bg-zinc-800 font-mono text-xs text-zinc-400',
          children: a,
        })),
        (e[4] = a),
        (e[5] = d))
      : (d = e[5])
    let l
    e[6] !== t.title
      ? ((l = s.jsx('h3', { className: 'truncate font-medium text-zinc-100', children: t.title })),
        (e[6] = t.title),
        (e[7] = l))
      : (l = e[7])
    let n
    e[8] !== d || e[9] !== l
      ? ((n = s.jsxs('div', { className: 'flex items-center gap-3', children: [d, l] })),
        (e[8] = d),
        (e[9] = l),
        (e[10] = n))
      : (n = e[10])
    let c
    e[11] === Symbol.for('react.memo_cache_sentinel')
      ? ((c = s.jsx('span', { className: 'text-zinc-500', children: '📐' })), (e[11] = c))
      : (c = e[11])
    let m
    e[12] !== t.height || e[13] !== t.width
      ? ((m = s.jsxs('div', {
          className: 'flex items-center gap-2',
          children: [c, s.jsxs('span', { className: 'text-zinc-300', children: [t.width, ' × ', t.height] })],
        })),
        (e[12] = t.height),
        (e[13] = t.width),
        (e[14] = m))
      : (m = e[14])
    let b
    e[15] === Symbol.for('react.memo_cache_sentinel')
      ? ((b = s.jsx('span', { className: 'text-zinc-500', children: '📦' })), (e[15] = b))
      : (b = e[15])
    const u = t.size / 1048576
    let h
    e[16] !== u ? ((h = u.toFixed(1)), (e[16] = u), (e[17] = h)) : (h = e[17])
    let f
    e[18] !== h
      ? ((f = s.jsxs('div', {
          className: 'flex items-center gap-2',
          children: [b, s.jsxs('span', { className: 'text-zinc-300', children: [h, ' MB'] })],
        })),
        (e[18] = h),
        (e[19] = f))
      : (f = e[19])
    let p
    e[20] === Symbol.for('react.memo_cache_sentinel')
      ? ((p = s.jsx('span', { className: 'text-zinc-500', children: '📷' })), (e[20] = p))
      : (p = e[20])
    const g = t.exif?.Make,
      w = t.exif?.Model
    let j
    e[21] !== g || e[22] !== w
      ? ((j = s.jsxs('div', {
          className: 'flex items-center gap-2',
          children: [p, s.jsxs('span', { className: 'truncate text-zinc-300', children: [g, ' ', w] })],
        })),
        (e[21] = g),
        (e[22] = w),
        (e[23] = j))
      : (j = e[23])
    let v
    e[24] !== f || e[25] !== j || e[26] !== m
      ? ((v = s.jsxs('div', {
          className: 'mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm lg:grid-cols-3',
          children: [m, f, j],
        })),
        (e[24] = f),
        (e[25] = j),
        (e[26] = m),
        (e[27] = v))
      : (v = e[27])
    let N
    e[28] !== t.tags
      ? ((N =
          t.tags &&
          t.tags.length > 0 &&
          s.jsxs('div', {
            className: 'mt-4 flex flex-wrap gap-2',
            children: [
              t.tags.slice(0, 3).map(R),
              t.tags.length > 3 &&
                s.jsxs('span', {
                  className: 'inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-400',
                  children: ['+', t.tags.length - 3, ' more'],
                }),
            ],
          })),
        (e[28] = t.tags),
        (e[29] = N))
      : (N = e[29])
    let z
    e[30] !== v || e[31] !== N || e[32] !== n
      ? ((z = s.jsxs('div', { className: 'min-w-0 flex-1', children: [n, v, N] })),
        (e[30] = v),
        (e[31] = N),
        (e[32] = n),
        (e[33] = z))
      : (z = e[33])
    let y
    return (
      e[34] !== z || e[35] !== i
        ? ((y = s.jsxs('div', {
            className:
              'group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/50',
            children: [
              o,
              s.jsx('div', {
                className: 'relative p-6',
                children: s.jsxs('div', { className: 'flex items-start gap-4', children: [i, z] }),
              }),
            ],
          })),
          (e[34] = z),
          (e[35] = i),
          (e[36] = y))
        : (y = e[36]),
      y
    )
  },
  A = () => {
    const [r, e] = C.useState(''),
      [t, x] = C.useState('stats'),
      o = L.getPhotos(),
      i = { version: 'v6', data: o },
      a = C.useMemo(() => {
        if (!r) return o
        const l = r.toLowerCase()
        return o.filter(
          (n) =>
            n.title?.toLowerCase().includes(l) ||
            n.description?.toLowerCase().includes(l) ||
            n.tags?.some((c) => c.toLowerCase().includes(l)) ||
            n.exif?.Make?.toLowerCase().includes(l) ||
            n.exif?.Model?.toLowerCase().includes(l),
        )
      }, [o, r]),
      d = () => {
        const l = JSON.stringify(i, null, 2),
          n = new Blob([l], { type: 'application/json' }),
          c = URL.createObjectURL(n),
          m = document.createElement('a')
        ;((m.href = c),
          (m.download = 'photos-manifest.json'),
          document.body.append(m),
          m.click(),
          m.remove(),
          URL.revokeObjectURL(c))
      }
    return s.jsxs('div', {
      className: 'min-h-screen bg-black',
      children: [
        s.jsx('div', { className: 'fixed inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900' }),
        s.jsx('div', {
          className:
            'fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent',
        }),
        s.jsxs('div', {
          className: 'relative',
          children: [
            s.jsx('div', {
              className: 'sticky top-0 z-50 border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl',
              children: s.jsx('div', {
                className: 'mx-auto max-w-7xl px-6',
                children: s.jsxs('div', {
                  className: 'flex h-16 items-center justify-between',
                  children: [
                    s.jsxs('div', {
                      className: 'flex items-center gap-6',
                      children: [
                        s.jsx('div', {
                          className: 'flex items-center gap-3',
                          children: s.jsx('h1', {
                            className: 'text-xl font-semibold text-zinc-100',
                            children: 'Afilmory Manifest',
                          }),
                        }),
                        s.jsxs('div', {
                          className: 'flex items-center rounded-lg bg-zinc-900/50 p-1',
                          children: [
                            s.jsx(M, {
                              variant: t === 'stats' ? 'primary' : 'ghost',
                              size: 'sm',
                              onClick: () => x('stats'),
                              className: 'h-8 text-xs',
                              children: 'Overview',
                            }),
                            s.jsx(M, {
                              variant: t === 'raw' ? 'primary' : 'ghost',
                              size: 'sm',
                              onClick: () => x('raw'),
                              className: 'h-8 text-xs',
                              children: 'Raw Data',
                            }),
                          ],
                        }),
                      ],
                    }),
                    s.jsxs('div', {
                      className: 'flex items-center gap-4',
                      children: [
                        s.jsxs('div', {
                          className: 'relative',
                          children: [
                            s.jsx('input', {
                              type: 'text',
                              placeholder: 'Search photos, tags, cameras...',
                              value: r,
                              onChange: (l) => e(l.target.value),
                              className:
                                'w-64 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 backdrop-blur-sm transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none',
                            }),
                            s.jsx('div', {
                              className: 'absolute top-1/2 right-3 -translate-y-1/2 text-zinc-500',
                              children: '🔍',
                            }),
                          ],
                        }),
                        s.jsx(M, {
                          variant: 'primary',
                          size: 'sm',
                          onClick: d,
                          className:
                            'h-9 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400',
                          children: 'Export JSON',
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            }),
            s.jsx('div', {
              className: 'relative mx-auto max-w-7xl px-6 py-8',
              children:
                t === 'stats'
                  ? s.jsxs('div', {
                      className: 'space-y-8',
                      children: [
                        s.jsxs('div', {
                          children: [
                            s.jsx('h2', { className: 'mb-6 text-lg font-medium text-zinc-300', children: 'Overview' }),
                            s.jsx(q, { data: a }),
                          ],
                        }),
                        s.jsxs('div', {
                          children: [
                            s.jsxs('div', {
                              className: 'mb-6 flex items-center justify-between',
                              children: [
                                s.jsxs('h2', {
                                  className: 'text-lg font-medium text-zinc-300',
                                  children: ['Photos (', a.length.toLocaleString(), ')'],
                                }),
                                r &&
                                  s.jsxs('div', {
                                    className: 'text-sm text-zinc-400',
                                    children: ['Filtered from ', o.length.toLocaleString(), ' total'],
                                  }),
                              ],
                            }),
                            s.jsx(_, {
                              rootClassName: 'h-[600px]',
                              children: s.jsx('div', {
                                className: 'space-y-4 pr-4',
                                children: a.map((l, n) => s.jsx(P, { photo: l, index: n }, l.id)),
                              }),
                            }),
                          ],
                        }),
                      ],
                    })
                  : s.jsxs('div', {
                      children: [
                        s.jsxs('div', {
                          className: 'mb-6',
                          children: [
                            s.jsx('h2', {
                              className: 'text-lg font-medium text-zinc-300',
                              children: 'Raw Manifest Data',
                            }),
                            s.jsx('p', {
                              className: 'mt-1 text-sm text-zinc-500',
                              children: 'Complete JSON manifest in structured format',
                            }),
                          ],
                        }),
                        s.jsxs('div', {
                          className:
                            'overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm',
                          children: [
                            s.jsx('div', {
                              className: 'border-b border-zinc-800 bg-zinc-900/50 px-6 py-4',
                              children: s.jsxs('div', {
                                className: 'flex items-center gap-3',
                                children: [
                                  s.jsxs('div', {
                                    className: 'flex gap-1.5',
                                    children: [
                                      s.jsx('div', { className: 'h-3 w-3 rounded-full bg-red-500' }),
                                      s.jsx('div', { className: 'h-3 w-3 rounded-full bg-yellow-500' }),
                                      s.jsx('div', { className: 'h-3 w-3 rounded-full bg-green-500' }),
                                    ],
                                  }),
                                  s.jsx('span', {
                                    className: 'font-mono text-sm text-zinc-400',
                                    children: 'photos-manifest.json',
                                  }),
                                ],
                              }),
                            }),
                            s.jsx(_, {
                              rootClassName: 'h-[700px]',
                              children: s.jsx('div', {
                                className: 'p-6',
                                children: s.jsx(E, { data: r ? { version: 'v6', data: a } : i }),
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
            }),
          ],
        }),
      ],
    })
  }
function T(r) {
  let e
  return (
    r.startsWith('"')
      ? r.endsWith(':')
        ? (e = 'text-blue-400')
        : (e = 'text-emerald-400')
      : /true|false/.test(r)
        ? (e = 'text-purple-400')
        : /null/.test(r)
          ? (e = 'text-red-400')
          : (e = 'text-orange-400'),
    `<span class="${e}">${r}</span>`
  )
}
function $(r) {
  return r.replaceAll(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    T,
  )
}
function O(r, e) {
  return r + (e.size || 0)
}
function R(r, e) {
  return s.jsx(
    'span',
    {
      className:
        'inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400 ring-1 ring-blue-500/20',
      children: r,
    },
    e,
  )
}
export { A as Component }
