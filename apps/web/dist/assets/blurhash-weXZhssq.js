import { c as i, j as e } from '../vendor/1-CkNOVE2J.js'
import { p as r, S as m } from './index-Bk0rQ-jT.js'
import { T as l } from './index-xedKp0Lt.js'
import '../vendor/2-VRqxSGaj.js'
const d = () => {
  const s = i.c(1)
  let t
  if (s[0] === Symbol.for('react.memo_cache_sentinel')) {
    const a = r.getPhotos()
    ;((t = e.jsx(m, {
      rootClassName: 'h-screen',
      children: e.jsx('div', { className: 'columns-4 gap-0', children: a.map(c) }),
    })),
      (s[0] = t))
  } else t = s[0]
  return t
}
function c(s) {
  return e.jsxs(
    'div',
    {
      className: 'group relative m-2',
      style: { paddingBottom: `${(s.height / s.width) * 100}%` },
      children: [
        e.jsx('img', {
          src: s.thumbnailUrl,
          alt: s.title,
          height: s.height,
          width: s.width,
          className: 'absolute inset-0',
        }),
        s.thumbHash &&
          e.jsx('div', {
            className: 'absolute inset-0 opacity-0 group-hover:opacity-100',
            children: e.jsx(l, { thumbHash: s.thumbHash }),
          }),
      ],
    },
    s.id,
  )
}
export { d as Component }
