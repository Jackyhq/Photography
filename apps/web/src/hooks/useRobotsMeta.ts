import { useEffect } from 'react'

export function useRobotsMeta(content: string, removeCanonical = false) {
  useEffect(() => {
    const existingRobots = Array.from(document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'))
    const robots = existingRobots[0] ?? document.createElement('meta')
    const previousContent = robots.getAttribute('content')
    const wasConnected = robots.isConnected

    if (!wasConnected) {
      robots.name = 'robots'
      document.head.append(robots)
    }

    existingRobots.slice(1).forEach((duplicate) => duplicate.remove())
    robots.content = content

    if (removeCanonical) {
      document.querySelectorAll('link[rel="canonical"]').forEach((canonical) => canonical.remove())
    }

    return () => {
      if (!wasConnected) {
        robots.remove()
      } else if (previousContent === null) {
        robots.removeAttribute('content')
      } else {
        robots.content = previousContent
      }
    }
  }, [content, removeCanonical])
}

export function useNoIndex(removeCanonical = false) {
  useRobotsMeta('noindex, follow', removeCanonical)
}
