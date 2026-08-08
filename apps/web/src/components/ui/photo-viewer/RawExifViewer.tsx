import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@afilmory/ui/dialog'
import { ScrollArea } from '@afilmory/ui/scroll-areas'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { ExifToolManager } from '~/lib/exiftool'
import type { FullPhotoManifest } from '~/types/photo'

import type { RawExifEntry } from './raw-exif-data'
import { categorizeRawExifData, parseRawExifData } from './raw-exif-data'

interface RawExifViewerProps {
  currentPhoto: FullPhotoManifest
}

const ExifDataRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border-b border-white/15 py-2 last:border-b-0">
    <span className="max-w-[45%] min-w-0 flex-shrink-0 self-start pr-4 text-sm font-medium break-words text-white/70">
      {label}
    </span>
    <span className="max-w-[55%] min-w-0 text-right font-mono text-sm break-words text-white/95">{value}</span>
  </div>
)

const ExifDataSection = ({ title, entries }: { title: string; entries: readonly RawExifEntry[] }) => (
  <section>
    <h4 className="mb-3 border-b border-white/25 pb-2 text-sm font-semibold text-white/90">{title}</h4>
    <div className="space-y-2">
      {entries.map(([key, value]) => (
        <ExifDataRow key={key} label={key} value={String(value)} />
      ))}
    </div>
  </section>
)

export const RawExifViewer: React.FC<RawExifViewerProps> = ({ currentPhoto }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [rawExifData, setRawExifData] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsOpen(false)
    setRawExifData(null)
    setIsLoading(false)
  }, [currentPhoto.id])

  const handleOpenModal = async () => {
    if (rawExifData) {
      setIsOpen(true)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(currentPhoto.originalUrl)
      const blob = await response.blob()
      const data = await ExifToolManager.parse(blob, currentPhoto.s3Key)

      setRawExifData(data || null)
      setIsOpen(true)
    } catch (error) {
      console.error('Failed to parse EXIF data:', error)
      toast.error(
        t('exif.raw.parse.error', {
          defaultValue: 'Failed to parse EXIF data',
        }),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const categorizedData = useMemo(
    () => categorizeRawExifData(rawExifData ? parseRawExifData(rawExifData) : {}),
    [rawExifData],
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={handleOpenModal}
          disabled={isLoading}
          aria-label={t('exif.raw.title', { defaultValue: 'Raw EXIF Data' })}
          title={t('exif.raw.title', { defaultValue: 'Raw EXIF Data' })}
          className="cursor-pointer text-white/70 duration-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <i className="i-mingcute-loading-3-line animate-spin" aria-hidden="true" />
          ) : (
            <i className="i-mingcute-braces-line" aria-hidden="true" />
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="flex h-[80vh] max-w-4xl flex-col gap-2 text-white">
        <DialogHeader>
          <DialogTitle>{t('exif.raw.title', { defaultValue: 'Raw EXIF Data' })}</DialogTitle>
          <DialogDescription>
            {t('exif.raw.description', {
              defaultValue: 'Complete EXIF metadata extracted from the image file',
            })}
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex h-full grow flex-col items-center justify-center gap-4 text-white/70">
            <i className="i-mingcute-loading-3-line animate-spin text-3xl" />
            <span className="text-sm">
              {t('exif.raw.loading', {
                defaultValue: 'Loading EXIF data...',
              })}
            </span>
          </div>
        ) : null}

        <ScrollArea
          rootClassName="h-0 grow flex-1 -mb-6 -mx-6"
          viewportClassName="px-7 pb-6 pt-4 [&_*]:select-text"
          flex
        >
          <div className="min-w-0 space-y-6">
            {categorizedData.sections.map(({ definition, entries }) =>
              entries.length > 0 ? (
                <ExifDataSection
                  key={definition.key}
                  title={t(definition.translationKey, { defaultValue: definition.defaultLabel })}
                  entries={entries}
                />
              ) : null,
            )}

            {categorizedData.uncategorized.length > 0 ? (
              <ExifDataSection
                title={t('exif.raw.category.uncategorized', { defaultValue: 'Uncategorized' })}
                entries={categorizedData.uncategorized}
              />
            ) : null}

            {categorizedData.entries.length === 0 ? (
              <div className="py-8 text-center text-white/50">
                {t('exif.raw.no.data', {
                  defaultValue: 'No EXIF data available',
                })}
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
