import { clsxm, decompressUint8Array } from '@afilmory/utils'
import { useMemo } from 'react'
import { thumbHashToDataURL } from 'thumbhash'

export const Thumbhash = ({
  thumbHash,
  className,
  as = 'img',
}: {
  thumbHash: ArrayLike<number> | string
  className?: string
  as?: 'img' | 'div'
}) => {
  const dataURL = useMemo(() => {
    if (typeof thumbHash === 'string') {
      return thumbHashToDataURL(decompressUint8Array(thumbHash))
    }
    return thumbHashToDataURL(thumbHash)
  }, [thumbHash])

  if (as === 'div') {
    return (
      <div
        aria-hidden="true"
        className={clsxm('h-full w-full bg-cover bg-center', className)}
        style={{ backgroundImage: `url("${dataURL}")` }}
      />
    )
  }

  return <img src={dataURL} alt="" aria-hidden="true" className={clsxm('h-full w-full', className)} />
}
