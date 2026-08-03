import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'
import { promisify } from 'node:util'

import { exiftool } from 'exiftool-vendored'
import sharp from 'sharp'

import { resolveE2EFixtureRoot } from './e2e-fixture-path.js'

const fixtureRoot = resolveE2EFixtureRoot(process.cwd(), process.env.AFILMORY_PHOTOS_PATH)
const requireFromBuilder = createRequire(new URL('../packages/builder/package.json', import.meta.url))
const ffmpegPath = (requireFromBuilder('@ffmpeg-installer/ffmpeg') as { path: string }).path
const execFileAsync = promisify(execFile)

const fixtures = [
  {
    fileName: '2026-01-01_fixture-landscape.jpg',
    label: 'Synthetic Landscape',
    colors: ['#172554', '#38bdf8'],
    coordinates: { latitude: 31.2304, longitude: 121.4737 },
    livePhoto: true,
  },
  {
    fileName: '2026-01-02_fixture-portrait.jpg',
    label: 'Synthetic Portrait',
    colors: ['#4c0519', '#fb7185'],
    coordinates: { latitude: 31.2989, longitude: 120.5853 },
    livePhoto: false,
  },
] as const

async function createFixture(): Promise<void> {
  const categoryDirectory = path.join(fixtureRoot, 'synthetic')
  await fs.rm(fixtureRoot, { recursive: true, force: true })
  await fs.mkdir(path.join(fixtureRoot, 'incoming', 'synthetic'), { recursive: true })
  await fs.mkdir(categoryDirectory, { recursive: true })

  await Promise.all(
    fixtures.map(async ({ fileName, label, colors, coordinates, livePhoto }) => {
      const svg = Buffer.from(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="${colors[0]}" />
              <stop offset="1" stop-color="${colors[1]}" />
            </linearGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#background)" />
          <circle cx="920" cy="210" r="110" fill="white" fill-opacity="0.32" />
          <path d="M0 650 L300 390 L520 590 L760 330 L1200 690 L1200 800 L0 800 Z" fill="white" fill-opacity="0.22" />
          <text x="64" y="104" fill="white" font-family="sans-serif" font-size="44" font-weight="700">${label}</text>
          <text x="66" y="150" fill="white" fill-opacity="0.8" font-family="sans-serif" font-size="24">Public E2E fixture — no private photography</text>
        </svg>
      `)

      const imagePath = path.join(categoryDirectory, fileName)
      await sharp(svg).jpeg({ quality: 86 }).toFile(imagePath)
      await exiftool.write(
        imagePath,
        {
          GPSLatitude: coordinates.latitude,
          GPSLatitudeRef: 'N',
          GPSLongitude: coordinates.longitude,
          GPSLongitudeRef: 'E',
        },
        { writeArgs: ['-overwrite_original'] },
      )

      if (livePhoto) {
        const videoPath = path.join(categoryDirectory, `${path.parse(fileName).name}.mov`)
        await execFileAsync(ffmpegPath, [
          '-hide_banner',
          '-loglevel',
          'error',
          '-f',
          'lavfi',
          '-i',
          'color=c=0x172554:s=320x180:d=0.8:r=12',
          '-an',
          '-c:v',
          'mpeg4',
          '-q:v',
          '5',
          '-movflags',
          '+faststart',
          '-y',
          videoPath,
        ])
      }
    }),
  )
}

void createFixture().finally(() => exiftool.end())
