import { MDXProvider } from '@mdx-js/react'
import type { Element, MDXComponents } from 'mdx/types'

const components: MDXComponents = {}

export function MDX({ content }: { content: Element }) {
  return <MDXProvider components={components}>{content}</MDXProvider>
}
