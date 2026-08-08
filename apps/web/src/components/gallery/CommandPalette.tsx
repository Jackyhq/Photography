import { photoLoader } from '@afilmory/data'
import { glassInnerGlowBackground, glassSurfaceStyle, MageLens } from '@afilmory/ui'
import * as DialogPrimitive from '@afilmory/ui/dialog/radix'
import { clsxm } from '@afilmory/utils'
import { useAtom } from 'jotai'
import * as React from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import { gallerySettingAtom } from '~/atoms/app'
import { useOpenPhotoViewer } from '~/hooks/usePhotoViewer'
import { getLocalizedPhotoDescription, getLocalizedPhotoTitle, getPhotoAltText } from '~/lib/photo-description'
import { getPhotoDetailPath } from '~/lib/photo-route'

import type { Command, GalleryFilterField } from './command-palette-commands'
import { createGalleryFilterCommands } from './command-palette-commands'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const allTags = photoLoader.getAllTags()
const allCameras = photoLoader.getAllCameras()
const allLenses = photoLoader.getAllLenses()

// Fuzzy search utility
const fuzzyMatch = (text: string, query: string): boolean => {
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()

  if (lowerText.includes(lowerQuery)) return true

  let queryIndex = 0
  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++
    }
  }
  return queryIndex === lowerQuery.length
}

// Search photos utility
const searchPhotos = (photos: ReturnType<typeof photoLoader.getPhotos>, query: string) => {
  const lowerQuery = query.trim().toLowerCase()
  if (!lowerQuery) return []

  return photos.filter((photo) => {
    const matchesText = photoLoader
      .getSearchablePhotoText(photo)
      .some((text) => text.toLowerCase().includes(lowerQuery))
    const matchesTags = photo.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
    const matchesCamera = photo.cameraDisplayName?.toLowerCase().includes(lowerQuery)
    const matchesLens = photo.lensDisplayName?.toLowerCase().includes(lowerQuery)

    return matchesText || matchesTags || matchesCamera || matchesLens
  })
}

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const { i18n, t } = useTranslation()
  const [gallerySetting, setGallerySetting] = useAtom(gallerySettingAtom)
  const navigate = useNavigate()
  const location = useLocation()
  const { openViewerByPhotoId } = useOpenPhotoViewer()
  const locale = i18n.resolvedLanguage ?? i18n.language

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [searchTextRevision, setSearchTextRevision] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const triggerElementRef = useRef<HTMLElement | null>(null)
  const dialogTitleId = React.useId()
  const listboxId = React.useId()

  const updateTagFilterMode = useCallback(
    (mode: 'union' | 'intersection') => {
      setGallerySetting((prev) => ({
        ...prev,
        tagFilterMode: mode,
      }))
    },
    [setGallerySetting],
  )

  const toggleGalleryFilter = useCallback(
    (field: GalleryFilterField, value: string) => {
      setGallerySetting((prev) => {
        const selectedValues = prev[field]
        return {
          ...prev,
          [field]: selectedValues.includes(value)
            ? selectedValues.filter((selectedValue) => selectedValue !== value)
            : [...selectedValues, value],
        }
      })
    },
    [setGallerySetting],
  )

  const handleReset = useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    setGallerySetting((prev) => ({
      ...prev,
      selectedTags: [],
      selectedCameras: [],
      selectedLenses: [],
      selectedRatings: null,
      tagFilterMode: 'union',
    }))
  }, [setGallerySetting])

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    let isCancelled = false
    photoLoader
      .loadPhotoText('en')
      .then(() => {
        if (!isCancelled) {
          setSearchTextRevision((revision) => revision + 1)
        }
      })
      .catch((error) => {
        console.error('Failed to load photo search text:', error)
      })

    return () => {
      isCancelled = true
    }
  }, [isOpen])

  // Generate commands
  const commands = useMemo((): Command[] => {
    void searchTextRevision

    const cmds: Command[] = []

    cmds.push(
      ...createGalleryFilterCommands({
        tags: allTags,
        cameras: allCameras,
        lenses: allLenses,
        selectedTags: gallerySetting.selectedTags,
        selectedCameras: gallerySetting.selectedCameras,
        selectedLenses: gallerySetting.selectedLenses,
        labels: {
          tag: t('action.tag.filter'),
          camera: t('action.camera.filter'),
          lens: t('action.lens.filter'),
        },
        lensIcon: <MageLens />,
        onToggle: toggleGalleryFilter,
      }),
    )

    // Tag filter mode toggle
    if (allTags.length > 0) {
      const isUnionMode = gallerySetting.tagFilterMode === 'union'
      cmds.push({
        id: 'tag-filter-mode-toggle',
        type: 'action',
        title: isUnionMode ? t('action.tag.match.any') : t('action.tag.match.all'),
        subtitle: t('action.tag.match.label'),
        icon: 'i-mingcute-switch-line',
        badge: isUnionMode ? t('action.tag.mode.or') : t('action.tag.mode.and'),
        action: () => updateTagFilterMode(isUnionMode ? 'intersection' : 'union'),
        keywords: ['tag', 'filter', 'mode', 'toggle'],
      })
    }

    // Filter commands - Ratings
    for (let rating = 1; rating <= 5; rating++) {
      const isActive = gallerySetting.selectedRatings === rating
      cmds.push({
        id: `rating-${rating}`,
        type: 'filter',
        title: t('action.rating.filter-above', { rating }),
        subtitle: t('action.rating.filter'),
        icon: 'i-mingcute-star-line',
        active: isActive,
        action: () => {
          setGallerySetting((prev) => ({
            ...prev,
            selectedRatings: isActive ? null : rating,
          }))
        },
        keywords: ['rating', 'filter', 'star', rating.toString()],
      })
    }

    // Clear all filters
    const hasFilters =
      gallerySetting.selectedTags.length > 0 ||
      gallerySetting.selectedCameras.length > 0 ||
      gallerySetting.selectedLenses.length > 0 ||
      gallerySetting.selectedRatings !== null

    if (hasFilters) {
      cmds.push({
        id: 'clear-filters',
        type: 'action',
        title: t('action.search.clear'),
        subtitle: t('action.search.clearActiveFilters'),
        icon: 'i-mingcute-close-line',
        action: () => {
          setGallerySetting((prev) => ({
            ...prev,
            selectedTags: [],
            selectedCameras: [],
            selectedLenses: [],
            selectedRatings: null,
            tagFilterMode: 'union',
          }))
        },
        keywords: ['clear', 'reset', 'remove', 'filter'],
      })
    }

    // Photo search results
    if (query.trim()) {
      const photos = searchPhotos(photoLoader.getPhotos(), query)
      photos.slice(0, 10).forEach((photo) => {
        const photoTitle = getLocalizedPhotoTitle(photo, locale)
        const photoDescription = getLocalizedPhotoDescription(photo, locale)
        cmds.push({
          id: `photo-${photo.id}`,
          type: 'photo',
          title: photoTitle || photo.id,
          subtitle: photoDescription || photo.cameraDisplayName || t('photo.fallback.title'),
          icon: (
            <img
              src={photo.thumbnailUrl}
              alt={getPhotoAltText(photo, locale)}
              className="h-6 w-6 rounded object-cover"
            />
          ),
          action: () => {
            if (openViewerByPhotoId(photo.id, { resetFiltersIfHidden: true })) {
              navigate({ pathname: getPhotoDetailPath(photo.id), search: location.search })
              onClose()
            }
          },
          keywords: [...photoLoader.getSearchablePhotoText(photo), ...(photo.tags || [])].filter(Boolean) as string[],
        })
      })
    }

    return cmds
  }, [
    t,
    locale,
    gallerySetting,
    query,
    location.search,
    navigate,
    onClose,
    setGallerySetting,
    openViewerByPhotoId,
    updateTagFilterMode,
    toggleGalleryFilter,
    searchTextRevision,
  ])

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) {
      // Show all filters when no query - group by type
      const activeFilters = commands.filter((cmd) => cmd.active)
      const allFilters = commands.filter((cmd) => cmd.type === 'filter')

      // Prioritize active filters, then show all available filters
      const uniqueFilters = new Map<string, Command>()

      // First add active filters
      activeFilters.forEach((cmd) => uniqueFilters.set(cmd.id, cmd))

      // Then add remaining filters
      allFilters.forEach((cmd) => {
        if (!uniqueFilters.has(cmd.id)) {
          uniqueFilters.set(cmd.id, cmd)
        }
      })

      return Array.from(uniqueFilters.values()).slice(0, 30)
    }

    return commands
      .filter((cmd) => {
        const searchText = `${cmd.title} ${cmd.subtitle || ''} ${cmd.keywords?.join(' ') || ''}`
        return fuzzyMatch(searchText, query)
      })
      .slice(0, 20)
  }, [commands, query])
  const activeOptionId = filteredOptionId(filteredCommands[selectedIndex]?.id)

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          setSelectedIndex((prev) =>
            filteredCommands.length === 0 ? 0 : Math.min(prev + 1, filteredCommands.length - 1),
          )
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
          break
        }
        case 'Enter': {
          e.preventDefault()
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action()
          }
          break
        }
      }
    },
    [filteredCommands, selectedIndex],
  )

  // Scroll selected item into view
  useEffect(() => {
    const selectedElement = listRef.current?.children[selectedIndex] as HTMLElement
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [selectedIndex])

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0)
  }, [filteredCommands.length])

  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogPrimitive.Portal>
        {/* Backdrop with blur */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-9999 bg-black/40 backdrop-blur-xl transition-all duration-200" />

        {/* Command Palette Panel */}
        <DialogPrimitive.Content
          aria-labelledby={dialogTitleId}
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            if (document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
              triggerElementRef.current = document.activeElement
            }
            inputRef.current?.focus()
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            const triggerElement = triggerElementRef.current
            triggerElementRef.current = null
            requestAnimationFrame(() => {
              const { activeElement, body } = document
              if (activeElement instanceof HTMLElement && activeElement !== body && activeElement.isConnected) {
                return
              }
              if (triggerElement?.isConnected) {
                triggerElement.focus({ preventScroll: true })
              }
            })
          }}
          className="animate-in fade-in slide-in-from-bottom-4 border-accent/20 lg:slide-in-from-top-4 fixed right-0 bottom-0 left-0 z-10000 mx-auto w-full max-w-2xl overflow-hidden rounded-2xl rounded-b-none border backdrop-blur-2xl duration-200 lg:top-[15vh] lg:right-auto lg:bottom-auto lg:left-1/2 lg:-translate-x-1/2 lg:rounded-2xl!"
          style={glassSurfaceStyle}
        >
          <DialogPrimitive.Title asChild>
            <h2 id={dialogTitleId} className="sr-only">
              {t('action.search.unified.title')}
            </h2>
          </DialogPrimitive.Title>
          {/* Inner glow layer */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{ background: glassInnerGlowBackground }}
          />
          {/* Search Input */}
          <div className="border-accent/20 relative flex items-center gap-3 border-b px-4 py-4">
            <i className="i-mingcute-search-line text-text-tertiary shrink-0 text-xl" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('action.search.placeholder')}
              aria-label={t('action.search.placeholder')}
              aria-controls={listboxId}
              aria-activedescendant={activeOptionId}
              className="text-text placeholder-text-tertiary flex-1 bg-transparent text-base outline-none"
            />
            <button
              type="button"
              onClick={handleReset}
              aria-label={t('action.search.reset')}
              className="glassmorphic-btn border-accent/20 text-text-secondary inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium transition-all duration-200"
            >
              <i className="i-mingcute-refresh-1-line text-sm" />
              {t('action.search.reset')}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('action.search.close')}
              className="glassmorphic-btn border-accent/20 text-text-secondary inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium transition-all duration-200"
            >
              <i className="i-mingcute-close-line text-sm" />
              {t('action.search.close')}
            </button>
          </div>

          <div className="border-accent/20 bg-accent/3 text-text-secondary relative flex items-center justify-between gap-3 border-b px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <i className="i-mingcute-filter-3-line text-sm" />
              <span>{t('action.tag.match.label')}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => updateTagFilterMode('union')}
                aria-pressed={gallerySetting.tagFilterMode === 'union'}
                className={clsxm(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                  gallerySetting.tagFilterMode === 'union'
                    ? 'bg-accent text-white'
                    : 'glassmorphic-btn text-text-secondary',
                )}
              >
                {t('action.tag.match.any')}
              </button>
              <button
                type="button"
                onClick={() => updateTagFilterMode('intersection')}
                aria-pressed={gallerySetting.tagFilterMode === 'intersection'}
                className={clsxm(
                  'rounded-full px-3 py-1 text-xs font-medium transition-all duration-200',
                  gallerySetting.tagFilterMode === 'intersection'
                    ? 'bg-accent text-white'
                    : 'glassmorphic-btn text-text-secondary',
                )}
              >
                {t('action.tag.match.all')}
              </button>
            </div>
          </div>

          {/* Commands List */}
          <div
            id={listboxId}
            ref={listRef}
            role="listbox"
            aria-label={t('action.search.resultsList')}
            className="max-h-[60vh] overflow-y-auto overscroll-contain py-2"
          >
            {filteredCommands.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <i className="i-mingcute-search-line text-text-quaternary mb-3 text-4xl" />
                <p className="text-text-secondary text-sm">{t('action.search.no-results')}</p>
              </div>
            ) : (
              filteredCommands.map((cmd, index) => (
                <button
                  id={filteredOptionId(cmd.id)}
                  key={cmd.id}
                  type="button"
                  role="option"
                  aria-selected={selectedIndex === index}
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={clsxm(
                    'command-item group flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200',
                    selectedIndex === index && 'selected',
                  )}
                >
                  {/* Icon */}
                  <div
                    className={clsxm(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition-all duration-200',
                      cmd.active ? 'bg-accent/10 text-accent' : 'bg-background/95 text-text-secondary',
                    )}
                    style={
                      cmd.active
                        ? {
                            boxShadow: 'inset 0 0 0 1px color-mix(in srgb, var(--color-accent) 20%, transparent)',
                          }
                        : undefined
                    }
                  >
                    {typeof cmd.icon === 'string' ? <i className={cmd.icon} /> : cmd.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-text truncate text-sm font-medium">{cmd.title}</span>
                      {cmd.badge !== undefined && (
                        <span className="bg-fill-tertiary text-text-secondary rounded-full px-2 py-0.5 text-xs">
                          {cmd.badge}
                        </span>
                      )}
                      {cmd.active && (
                        <span className="bg-accent flex h-5 w-5 items-center justify-center rounded-full text-white">
                          <i className="i-mingcute-check-line text-xs" />
                        </span>
                      )}
                    </div>
                    {cmd.subtitle && <p className="text-text-secondary truncate text-xs">{cmd.subtitle}</p>}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-accent/20 relative border-t px-4 py-2">
            <div className="text-text-secondary flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="border-accent/20 bg-accent/5 rounded border px-1.5 py-0.5 font-mono">↑↓</kbd>
                  {t('action.search.navigate')}
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="border-accent/20 bg-accent/5 rounded border px-1.5 py-0.5 font-mono">↵</kbd>
                  {t('action.search.select')}
                </span>
              </div>
              {filteredCommands.length > 0 && (
                <span>{t('action.search.command.results', { count: filteredCommands.length })}</span>
              )}
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

const filteredOptionId = (id: string | undefined) => (id ? `command-option-${encodeURIComponent(id)}` : undefined)
