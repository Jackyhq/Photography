import type { PhotoManifestItem } from '@afilmory/builder/photo-types'

import type { SiteConfig } from '../../../../site.config'
import { getPhotoDetailPath, normalizeCanonicalPathname } from './photo-route'

export interface PageMeta {
  title: string
  description: string
  url?: string
  image?: string
  type: 'website' | 'article' | 'video.other'
  robots?: 'noindex, follow'
  jsonLd?: Record<string, unknown>
}

export interface IndexablePageMeta extends PageMeta {
  url: string
  jsonLd: Record<string, unknown>
}

type PhotoMetaSource = Pick<
  PhotoManifestItem,
  | 'id'
  | 'title'
  | 'description'
  | 'originalUrl'
  | 'thumbnailUrl'
  | 'mediaType'
  | 'videoUrl'
  | 'mimeType'
  | 'dateTaken'
  | 'width'
  | 'height'
  | 'duration'
>

export function getCanonicalUrl(pathname: string, siteUrl: string): string {
  return `${siteUrl.replace(/\/+$/, '')}${normalizeCanonicalPathname(pathname)}`
}

export function createSitePageMeta(siteConfig: SiteConfig, pathname = '/', image?: string): IndexablePageMeta {
  const url = getCanonicalUrl(pathname, siteConfig.url)
  const isHome = normalizeCanonicalPathname(pathname) === '/'

  return {
    title: siteConfig.title,
    description: siteConfig.description,
    url,
    image: toAbsoluteUrl(image, siteConfig.url),
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': isHome ? 'WebSite' : 'WebPage',
      name: siteConfig.title,
      description: siteConfig.description,
      url,
      author: createAuthor(siteConfig),
    },
  }
}

export function createNotFoundPageMeta(siteConfig: SiteConfig): PageMeta {
  return {
    title: `Page not found | ${siteConfig.name}`,
    description: 'The requested page could not be found.',
    type: 'website',
    robots: 'noindex, follow',
  }
}

/** Shared by generated HTML and client navigation; does not load full EXIF or browser state. */
export function createPhotoMeta(
  photo: PhotoMetaSource,
  siteConfig: SiteConfig,
  text: { title?: string; description?: string } = photo,
): IndexablePageMeta {
  const title = `${text.title?.trim() || photo.id} | ${siteConfig.name}`
  const description = text.description?.trim() || siteConfig.description
  const url = getCanonicalUrl(getPhotoDetailPath(photo.id), siteConfig.url)
  const isVideo = photo.mediaType === 'video'
  const imageSource =
    !isVideo && hasSocialPreviewImageExtension(photo.originalUrl) ? photo.originalUrl : photo.thumbnailUrl
  const dateCreated = toIsoDate(photo.dateTaken)

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': isVideo ? 'VideoObject' : 'ImageObject',
    name: title,
    description,
    url,
    contentUrl: toAbsoluteUrl(isVideo ? photo.videoUrl || photo.originalUrl : photo.originalUrl, siteConfig.url),
    thumbnailUrl: toAbsoluteUrl(photo.thumbnailUrl, siteConfig.url),
    dateCreated,
    encodingFormat: photo.mimeType,
    width: photo.width > 0 ? photo.width : undefined,
    height: photo.height > 0 ? photo.height : undefined,
    creator: createAuthor(siteConfig),
    creditText: siteConfig.author.name,
    copyrightNotice: siteConfig.author.name,
  }

  // Capture time and filesystem mtime are not verified publication dates.
  if (isVideo && typeof photo.duration === 'number' && Number.isFinite(photo.duration)) {
    jsonLd.duration = `PT${Math.max(0, photo.duration)}S`
  }

  return {
    title,
    description,
    url,
    image: toAbsoluteUrl(imageSource, siteConfig.url),
    type: isVideo ? 'video.other' : 'article',
    jsonLd: Object.fromEntries(Object.entries(jsonLd).filter(([, value]) => value !== undefined)),
  }
}

function createAuthor(siteConfig: SiteConfig) {
  return { '@type': 'Person', name: siteConfig.author.name, url: siteConfig.author.url }
}

function hasSocialPreviewImageExtension(value: string): boolean {
  try {
    return /\.(?:jpe?g|png)$/iu.test(new URL(value, 'https://afilmory.local/').pathname)
  } catch {
    return false
  }
}

function toAbsoluteUrl(value: string | undefined, baseUrl: string): string | undefined {
  if (!value?.trim()) return undefined
  try {
    return new URL(value, baseUrl).toString()
  } catch {
    return undefined
  }
}

function toIsoDate(value: string | undefined): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}
