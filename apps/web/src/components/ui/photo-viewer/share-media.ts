import { isAbortError } from '~/lib/abort-error'

export const MAX_NATIVE_SHARE_FILE_BYTES = 100 * 1024 * 1024

export async function openNativeShare(
  share: (data: ShareData) => Promise<void>,
  data: ShareData,
): Promise<'shared' | 'cancelled'> {
  try {
    await share(data)
    return 'shared'
  } catch (error) {
    if (isAbortError(error)) return 'cancelled'
    throw error
  }
}

export async function fetchShareMediaBlob(
  mediaUrl: string,
  expectedMediaType: 'image' | 'video',
  signal: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<Blob> {
  const response = await fetcher(mediaUrl, { signal })
  if (!response.ok) {
    throw new Error(`Share media request failed with status ${response.status}`)
  }

  const declaredSize = Number(response.headers.get('content-length'))
  if (Number.isFinite(declaredSize) && declaredSize > MAX_NATIVE_SHARE_FILE_BYTES) {
    throw new Error('Share media is too large')
  }

  const blob = await response.blob()
  if (blob.size > MAX_NATIVE_SHARE_FILE_BYTES) {
    throw new Error('Share media is too large')
  }

  if (!blob.type.toLowerCase().startsWith(`${expectedMediaType}/`)) {
    throw new Error(`Share media has an unexpected content type: ${blob.type || 'unknown'}`)
  }

  return blob
}
