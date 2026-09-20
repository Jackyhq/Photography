import type { SiteConfig } from '../../../../site.config'
import { getCanonicalUrl } from '../../src/lib/page-meta'

function escapeMarkdownText(value: string): string {
  return value
    .trim()
    .replaceAll(/\s+/g, ' ')
    .replaceAll(/[\\`*_[\]<>#]/g, '\\$&')
}

export function generateLlmsTxt(config: SiteConfig): string {
  const galleryUrl = getCanonicalUrl('/', config.url)
  const resourceUrl = (fileName: string) => new URL(fileName, galleryUrl).href

  return `# ${escapeMarkdownText(config.title)}

> ${escapeMarkdownText(config.description)}

A personal photography gallery by ${escapeMarkdownText(config.author.name)}. Individual photo pages contain captions and available camera metadata; the sitemap lists their canonical URLs. The public manifest provides structured metadata for the published collection.

Photographs and their derived media are copyrighted works. This index does not grant permission to reuse them.

## Gallery and photo information

- [Photo gallery](${galleryUrl}): Browse the published collection.
- [Photo sitemap](${resourceUrl('sitemap.xml')}): Canonical gallery and individual photo page URLs, with image metadata.
- [Public photo manifest](${resourceUrl('photos-manifest.json')}): Published photo metadata and media URLs in JSON.

## Optional

- [Photo feed](${resourceUrl('feed.xml')}): RSS entries for the published collection.
`
}
