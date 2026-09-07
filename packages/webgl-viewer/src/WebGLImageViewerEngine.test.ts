import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { WebGLImageViewerEngine } from './WebGLImageViewerEngine'

interface LifecycleProbe {
  destroy: () => void
  loadImage: (url: string) => Promise<void>
  handleWorkerMessage: (event: MessageEvent) => void
  animationFrameId: number | null
  tileProcessingFrameId: number | null
  tileUpdateTimeoutId: number | ReturnType<typeof setTimeout> | null
}

// Exercise the real lifecycle methods with already allocated resources, without requiring a GPU in jsdom.
function createLoadedEngine() {
  const mainTexture = { name: 'main' }
  const tileTexture = { name: 'tile' }
  const gl = { deleteTexture: vi.fn(), deleteBuffer: vi.fn(), deleteProgram: vi.fn() }
  const worker = { onmessage: vi.fn(), onerror: vi.fn(), postMessage: vi.fn(), terminate: vi.fn() }
  const tileCache = new Map([['0-0-1', { texture: tileTexture }]])
  const engine = Object.assign(Object.create(WebGLImageViewerEngine.prototype), {
    canvas: document.createElement('canvas'),
    gl,
    texture: mainTexture,
    lodTextures: new Map([[1, mainTexture]]),
    tileCache,
    currentVisibleTiles: new Set(['0-0-1']),
    loadingTiles: new Map(),
    pendingTileRequests: [],
    positionBuffer: null,
    texCoordBuffer: null,
    tileOutlineBuffer: null,
    program: null,
    resizeObserver: null,
    animationFrameId: null,
    tileProcessingFrameId: null,
    tileUpdateTimeoutId: null,
    worker,
    workerUrl: null,
    isAnimating: true,
    destroyed: false,
  }) as LifecycleProbe
  return { engine, gl, worker, tileCache, mainTexture, tileTexture }
}

describe('WebGL viewer resource lifecycle', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('releases each texture once and cancels scheduled work when destroyed repeatedly', () => {
    const { engine, gl, worker, tileCache, mainTexture, tileTexture } = createLoadedEngine()
    const scheduledWork = vi.fn()
    engine.animationFrameId = requestAnimationFrame(scheduledWork)
    engine.tileProcessingFrameId = requestAnimationFrame(scheduledWork)
    engine.tileUpdateTimeoutId = setTimeout(scheduledWork, 0)

    engine.destroy()
    engine.destroy()
    vi.runAllTimers()

    expect(gl.deleteTexture).toHaveBeenCalledWith(mainTexture)
    expect(gl.deleteTexture).toHaveBeenCalledWith(tileTexture)
    expect(gl.deleteTexture).toHaveBeenCalledTimes(2)
    expect(tileCache.size).toBe(0)
    expect(scheduledWork).not.toHaveBeenCalled()
    expect(worker.terminate).toHaveBeenCalledTimes(1)
    expect(worker.onmessage).toBeNull()
  })

  it('settles an outstanding load and disposes late worker bitmaps without using the destroyed GPU', async () => {
    vi.spyOn(console, 'info').mockImplementation(() => {})
    const { engine, gl, worker } = createLoadedEngine()
    const pendingLoad = engine.loadImage('/public-fixture.jpg')
    const rejection = expect(pendingLoad).rejects.toMatchObject({ name: 'AbortError' })
    expect(worker.postMessage).toHaveBeenCalledWith({ type: 'load-image', payload: { url: '/public-fixture.jpg' } })
    engine.destroy()
    await rejection

    const close = vi.fn()
    gl.deleteTexture.mockClear()
    engine.handleWorkerMessage(
      new MessageEvent('message', { data: { type: 'tile-created', payload: { imageBitmap: { close } } } }),
    )
    expect(close).toHaveBeenCalledTimes(1)
    expect(gl.deleteTexture).not.toHaveBeenCalled()
    await expect(engine.loadImage('/another.jpg')).rejects.toThrow('destroyed')
    expect(worker.postMessage).toHaveBeenCalledTimes(1)
  })
})
