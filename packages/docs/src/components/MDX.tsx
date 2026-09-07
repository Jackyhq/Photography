import { MDXProvider } from '@mdx-js/react'
import type { Element, MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'

import { docsSite, getDocsPath } from '../site'
import { getMatchedRoute } from '../utils/routes'

export function DocsAnchor({ href, ...props }: ComponentPropsWithoutRef<'a'>) {
  let destination = href
  if (href?.startsWith('/') && !href.startsWith('//')) {
    const url = new URL(href, docsSite.url)
    if (getMatchedRoute(url.pathname)) {
      destination = `${getDocsPath(url.pathname)}${url.search}${url.hash}`
    }
  }
  return <a {...props} href={destination} />
}

const components: MDXComponents = { a: DocsAnchor }

export function MDX({ content }: { content: Element }) {
  return <MDXProvider components={components}>{content}</MDXProvider>
}
