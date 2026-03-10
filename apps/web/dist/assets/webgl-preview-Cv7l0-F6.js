import { c as u, r as f, j as o } from '../vendor/1-CkNOVE2J.js'
import { B as p } from './index-DSipzPdn.js'
import { W as U } from './WebGLImageViewer-CUmzmelI.js'
import '../vendor/2-VRqxSGaj.js'
function j(e) {
  const t = u.c(8),
    [s, n] = f.useState(null)
  let r
  t[0] !== e || t[1] !== s
    ? ((r = () => {
        if (!e) {
          s && (URL.revokeObjectURL(s), n(null))
          return
        }
        const a = URL.createObjectURL(e)
        return (
          n(a),
          () => {
            URL.revokeObjectURL(a)
          }
        )
      }),
      (t[0] = e),
      (t[1] = s),
      (t[2] = r))
    : (r = t[2])
  let l
  ;(t[3] !== e ? ((l = [e]), (t[3] = e), (t[4] = l)) : (l = t[4]), f.useEffect(r, l))
  let c
  t[5] !== s
    ? ((c = () => () => {
        s && URL.revokeObjectURL(s)
      }),
      (t[5] = s),
      (t[6] = c))
    : (c = t[6])
  let i
  return (t[7] === Symbol.for('react.memo_cache_sentinel') ? ((i = []), (t[7] = i)) : (i = t[7]), f.useEffect(c, i), s)
}
const v = () => {
  const e = u.c(5),
    [t, s] = f.useState(null),
    n = j(t) || '/test.jpg'
  let r
  e[0] === Symbol.for('react.memo_cache_sentinel')
    ? ((r = o.jsx('div', {
        children: o.jsx(p, {
          className: 'shrink-0',
          onClick: () => {
            const i = document.createElement('input')
            ;((i.type = 'file'),
              (i.accept = 'image/*'),
              (i.onchange = (a) => {
                const m = a.target.files?.[0]
                m && s(m)
              }),
              i.click())
          },
          children: 'Upload',
        }),
      })),
      (e[0] = r))
    : (r = e[0])
  let l
  e[1] !== n
    ? ((l = o.jsx('div', { className: 'relative grow', children: o.jsx(U, { debug: !0, src: n }) })),
      (e[1] = n),
      (e[2] = l))
    : (l = e[2])
  let c
  return (
    e[3] !== l
      ? ((c = o.jsxs('div', { className: 'relative flex h-svh w-full flex-col gap-4', children: [r, l] })),
        (e[3] = l),
        (e[4] = c))
      : (c = e[4]),
    c
  )
}
export { v as Component }
