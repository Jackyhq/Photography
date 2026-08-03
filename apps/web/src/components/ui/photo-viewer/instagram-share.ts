import { openNativeShare } from './share-media'
import { openSocialShareWindow } from './social-share'

interface InstagramShareDependencies {
  share?: (data: ShareData) => Promise<void>
  writeText: (text: string) => Promise<void>
  openInstagram: () => void
}

type InstagramShareData = ShareData & { url: string }

export type InstagramShareResult = 'shared' | 'cancelled' | 'fallback-copied' | 'fallback-opened'

export function openInstagramShare(
  data: InstagramShareData,
  dependencies: InstagramShareDependencies = createBrowserDependencies(),
): Promise<InstagramShareResult> {
  if (dependencies.share) {
    // Invoke the Web Share API synchronously so transient user activation is
    // still available. Instagram sharing intentionally stays link-only here.
    return openNativeShare(dependencies.share, data)
  }

  let copyPromise: Promise<void>
  try {
    // Start the clipboard operation while this document still has focus, then
    // open Instagram synchronously so the popup is not blocked.
    copyPromise = dependencies.writeText(data.url)
  } catch (error) {
    copyPromise = Promise.reject(error)
  }
  dependencies.openInstagram()

  return copyPromise.then(
    () => 'fallback-copied',
    () => 'fallback-opened',
  )
}

function createBrowserDependencies(): InstagramShareDependencies {
  return {
    share: typeof navigator.share === 'function' ? navigator.share.bind(navigator) : undefined,
    writeText: (text) => navigator.clipboard.writeText(text),
    openInstagram: () => openSocialShareWindow('https://www.instagram.com/'),
  }
}
