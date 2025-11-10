export const kaomojiList = [
  'Σ(lliдﾟﾉ)ﾉ',
  '(((ﾟДﾟ;)))',
  '。･ﾟ･(つд`ﾟ)･ﾟ･',
  '（；へ：）',
  '（；´д｀）ゞ',
  '（；￣Д￣）',
  '（；＿；）',
  '（Ｔ＿Ｔ）',
  '(╥﹏╥)',
  '(ノД`)・゜・。',
  '(つд⊂)',
  '(つω`｡)',
  '(；д；)',
  '(；＿；)',
  '(；ω；)',
  '(；д；)',
  '(；д；`)',
]

export function getRandomKaomoji() {
  const index = Math.floor(Math.random() * kaomojiList.length)
  return kaomojiList[index]
}
