const ALLOWED_SOCIAL_SHARE_HOSTS = new Set(['twitter.com', 'www.facebook.com', 't.me', 'service.weibo.com'])

interface SocialShareValues {
  url: string
  title: string
  text: string
}

function assertAllowedSocialShareUrl(value: string): URL {
  const url = new URL(value)
  if (url.protocol !== 'https:' || !ALLOWED_SOCIAL_SHARE_HOSTS.has(url.hostname)) {
    throw new Error(`Unsupported social share destination: ${url.origin}`)
  }
  return url
}

export function createSocialShareUrl(template: string, values: SocialShareValues): string {
  const shareUrl = template
    .replace('{url}', encodeURIComponent(values.url))
    .replace('{title}', encodeURIComponent(values.title))
    .replace('{text}', encodeURIComponent(values.text))

  return assertAllowedSocialShareUrl(shareUrl).toString()
}

export function openSocialShareWindow(
  shareUrl: string,
  openWindow: (url: string, target: string, features: string) => Window | null = window.open.bind(window),
): void {
  const allowedUrl = assertAllowedSocialShareUrl(shareUrl)
  const openedWindow = openWindow(allowedUrl.toString(), '_blank', 'width=600,height=400,noopener,noreferrer')
  if (openedWindow) openedWindow.opener = null
}
