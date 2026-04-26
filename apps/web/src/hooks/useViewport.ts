import type { ExtractAtomValue, getDefaultStore } from 'jotai'
import { useAtomValue } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { useCallback, useMemo } from 'react'
import { shallow } from 'zustand/shallow'

import { viewportAtom } from '../atoms/viewport'

export const useViewport = <T>(selector: (value: ExtractAtomValue<typeof viewportAtom>) => T): T => {
  const selectViewport = useCallback(
    (atomValue: ExtractAtomValue<typeof viewportAtom>) => selector(atomValue),
    [selector],
  )
  const selectedAtom = useMemo(() => selectAtom(viewportAtom, selectViewport, shallow), [selectViewport])

  return useAtomValue(selectedAtom)
}

type JotaiStore = ReturnType<typeof getDefaultStore>
export const getViewport = (store: JotaiStore) => store.get(viewportAtom)
