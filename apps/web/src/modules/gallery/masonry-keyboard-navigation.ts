export type MasonryNavigationDirection = 'left' | 'right' | 'up' | 'down'

interface MasonryLayoutItem {
  top: number
  left: number
  height: number
  column: number
}

export interface MasonryKeyboardPositioner {
  columnWidth: number
  get: (index: number) => MasonryLayoutItem | undefined
  all: () => MasonryLayoutItem[]
}

type NavigationScore = readonly [number, number, number, number]

const compareScores = (left: NavigationScore, right: NavigationScore) => {
  for (const [index, value] of left.entries()) {
    const difference = value - right[index]
    if (difference !== 0) return difference
  }

  return 0
}

const getVerticalGap = (current: MasonryLayoutItem, candidate: MasonryLayoutItem) => {
  const currentBottom = current.top + current.height
  const candidateBottom = candidate.top + candidate.height

  if (candidateBottom < current.top) return current.top - candidateBottom
  if (candidate.top > currentBottom) return candidate.top - currentBottom
  return 0
}

/**
 * Finds the closest photo in the requested visual direction. Masonry item
 * indices cannot be treated as rows because each column has independent
 * heights, so navigation uses the measured layout instead.
 */
export const findNextMasonryItemIndex = ({
  currentIndex,
  direction,
  positioner,
  isNavigable,
}: {
  currentIndex: number
  direction: MasonryNavigationDirection
  positioner: MasonryKeyboardPositioner
  isNavigable: (index: number) => boolean
}): number | null => {
  const current = positioner.get(currentIndex)
  if (!current) return null

  const currentCenterY = current.top + current.height / 2
  let bestIndex: number | null = null
  let bestScore: NavigationScore | null = null

  positioner.all().forEach((candidate, candidateIndex) => {
    if (!candidate || candidateIndex === currentIndex || !isNavigable(candidateIndex)) return

    const candidateCenterY = candidate.top + candidate.height / 2
    const columnDistance = Math.abs(candidate.column - current.column)
    const verticalCenterDistance = Math.abs(candidateCenterY - currentCenterY)
    let score: NavigationScore | null = null

    switch (direction) {
      case 'left': {
        if (candidate.column >= current.column) return
        score = [columnDistance, getVerticalGap(current, candidate), verticalCenterDistance, candidateIndex]
        break
      }
      case 'right': {
        if (candidate.column <= current.column) return
        score = [columnDistance, getVerticalGap(current, candidate), verticalCenterDistance, candidateIndex]
        break
      }
      case 'up': {
        if (candidateCenterY >= currentCenterY) return
        score = [columnDistance, verticalCenterDistance, Math.abs(candidate.left - current.left), candidateIndex]
        break
      }
      case 'down': {
        if (candidateCenterY <= currentCenterY) return
        score = [columnDistance, verticalCenterDistance, Math.abs(candidate.left - current.left), candidateIndex]
        break
      }
    }

    if (!bestScore || compareScores(score, bestScore) < 0) {
      bestIndex = candidateIndex
      bestScore = score
    }
  })

  return bestIndex
}
