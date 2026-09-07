import { AlignLeftIcon, ArrowRight } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { MDX } from './components'
import { DocumentFooter } from './components/DocumentFooter'
import { MobileTableOfContents } from './components/MobileTableOfContents'
import { Sidebar } from './components/Sidebar'
import { TableOfContents } from './components/TableOfContents'
import { updateDocsPageMeta } from './page-meta'
import { docsSite, getDocsPath, normalizeDocsPath } from './site'
import { getMatchedRoute } from './utils/routes'

function App({ url }: { url?: string }) {
  const [currentPath, setCurrentPath] = useState(() => normalizeDocsPath(url || '/'))
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const matchedRoute = getMatchedRoute(currentPath)
  const mainContentRef = useRef<HTMLDivElement>(null)

  const handleScrollMainContent = (top: number) => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({
        top,
        behavior: 'smooth',
      })
    }
  }

  const scrollToLocation = useCallback(() => {
    const fragment = window.location.hash.slice(1)
    let target: HTMLElement | null = null
    try {
      // URL fragments identify literal IDs, including characters that are special in CSS selectors.
      // eslint-disable-next-line unicorn/prefer-query-selector
      target = fragment ? document.getElementById(decodeURIComponent(fragment)) : null
    } catch {
      // An invalid URL fragment should not interrupt route navigation.
    }
    if (target) target.scrollIntoView()
    else mainContentRef.current?.scrollTo({ top: 0 })
  }, [])

  const handleLinkClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return

    const destination = new URL(link.href, window.location.href)
    if (destination.origin !== window.location.origin || !getMatchedRoute(destination.pathname)) return
    destination.pathname = getDocsPath(destination.pathname)
    event.preventDefault()

    if (destination.href !== window.location.href) {
      window.history.pushState({}, '', `${destination.pathname}${destination.search}${destination.hash}`)
    }
    setCurrentPath(normalizeDocsPath(destination.pathname))
    setIsSidebarOpen(false)
    requestAnimationFrame(scrollToLocation)
  }

  useEffect(() => {
    const syncLocation = () => {
      const path = window.location.pathname
      const canonicalPath = getDocsPath(path)
      if (getMatchedRoute(path) && path !== canonicalPath) {
        window.history.replaceState(null, '', `${canonicalPath}${window.location.search}${window.location.hash}`)
      }
      setCurrentPath(normalizeDocsPath(path))
      setIsSidebarOpen(false)
    }
    syncLocation()
    window.addEventListener('popstate', syncLocation)
    return () => window.removeEventListener('popstate', syncLocation)
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(scrollToLocation)
    return () => cancelAnimationFrame(frame)
  }, [currentPath, scrollToLocation])

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen)
  }, [isSidebarOpen])

  useEffect(() => {
    updateDocsPageMeta(document, matchedRoute)
  }, [matchedRoute])

  if (!matchedRoute) {
    return (
      <div className="bg-background flex h-screen" onClick={handleLinkClick}>
        {/* 桌面端侧边栏 */}
        <div className="hidden lg:block">
          <Sidebar currentPath={currentPath} />
        </div>

        {/* 移动端侧边栏 */}
        {isSidebarOpen && (
          <>
            <div
              className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="fixed top-0 left-0 z-50 h-full lg:hidden">
              <Sidebar currentPath={currentPath} />
            </div>
          </>
        )}

        <main className="bg-background flex flex-1 items-center justify-center">
          {/* 移动端顶部栏 */}
          <div className="bg-background fixed top-0 right-0 left-0 z-30 h-16 border-b border-gray-200 lg:hidden">
            <div className="flex h-full items-center px-4">
              <button
                onClick={toggleSidebar}
                className="text-text-primary hover:bg-background-secondary rounded-lg p-2 transition-colors"
                type="button"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex-1 text-center">
                <h1 className="text-text-primary text-lg font-semibold">{docsSite.name}</h1>
              </div>
              <div className="w-10" /> {/* 平衡按钮 */}
            </div>
          </div>

          <div className="mx-4 mt-16 rounded-xl p-8 text-center lg:mt-0">
            <div className="mb-6 flex items-center justify-center text-4xl">(・_・;)</div>
            <h1 className="mb-1 text-3xl font-semibold">404</h1>
            <p className="text-text-secondary text-lg">Page not found</p>
            <a href="/" className="bg-accent mt-6 rounded-2xl px-4 py-2 text-white transition-opacity hover:opacity-90">
              Return Home <ArrowRight className="inline-block h-4 w-4" />
            </a>
          </div>

          {/* 移动端 TOC (404页面不需要，但为了一致性保留结构) */}
          <MobileTableOfContents currentPath={currentPath} />
        </main>
      </div>
    )
  }

  const Component = matchedRoute.component
  const meta = matchedRoute.meta as {
    createdAt?: string
    lastModified?: string
  }

  return (
    <div className="bg-background flex h-screen" onClick={handleLinkClick}>
      {/* 桌面端侧边栏 */}
      <div className="hidden lg:block">
        <Sidebar currentPath={currentPath} />
      </div>

      <>
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black/10 lg:hidden"
          style={{ display: isSidebarOpen ? 'block' : 'none' }}
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className="fixed top-0 left-0 z-50 h-full lg:hidden"
          style={{
            transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <Sidebar currentPath={currentPath} />
        </div>
      </>

      {/* 主内容区域 */}
      <main className="bg-background relative flex-1 overflow-y-auto" ref={mainContentRef}>
        <div className="bg-background border-border sticky top-0 z-30 h-16 border-b backdrop-blur-3xl lg:hidden">
          <div className="flex h-full items-center px-4">
            <button
              onClick={toggleSidebar}
              className="text-text-primary hover:bg-background-secondary rounded-lg p-2 transition-colors"
              type="button"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex-1 text-center">
              <a href="/" className="select-none">
                <h1 className="text-text-primary text-lg font-semibold">{docsSite.name}</h1>
              </a>
            </div>
            <div className="w-10" /> {/* 平衡按钮 */}
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl">
          {/* 文档内容 */}
          <div className="w-full flex-1 px-4 py-6 lg:px-8 lg:py-12">
            <article className="prose prose-lg bg-background max-w-none rounded-xl p-4 lg:p-8">
              <MDX content={<Component />} />
              <DocumentFooter createdAt={meta.createdAt} lastModified={meta.lastModified} />
            </article>
          </div>

          {/* 桌面端目录 */}
          <div className="hidden w-64 px-4 pt-6 lg:pt-12 xl:block">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-normal text-gray-600">
              <AlignLeftIcon className="mr-1 inline-block h-4 w-4" />
              On this page
            </h4>
            <div className="scrollbar-hide sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <TableOfContents currentPath={currentPath} handleScroll={handleScrollMainContent} />
            </div>
          </div>
        </div>

        {/* 移动端 TOC */}
        <MobileTableOfContents currentPath={currentPath} handleScroll={handleScrollMainContent} />
      </main>
    </div>
  )
}

export default App
