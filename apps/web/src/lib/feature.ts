export const canUseWebGL = (() => {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl')
  return gl !== null
})()
