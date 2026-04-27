import { mkdir, readdir, rename, stat } from 'node:fs/promises'
import path from 'node:path'

import consola from 'consola'
import { exiftool } from 'exiftool-vendored'

const PHOTOS_ROOT = path.resolve(process.cwd(), 'photos')
const INCOMING_DIR = path.resolve(PHOTOS_ROOT, 'incoming')
const DEFAULT_TARGET_DIR = path.resolve(PHOTOS_ROOT, '随手')

async function standardize() {
  try {
    // 1. 获取 incoming 目录下的所有子项（文件夹和文件）
    const incomingEntries = await readdir(INCOMING_DIR, { withFileTypes: true })

    // 分别处理文件夹和文件
    for (const entry of incomingEntries) {
      if (entry.name.startsWith('.')) continue // 跳过 .gitkeep 等隐藏文件

      if (entry.isDirectory()) {
        // 2a. 处理分类文件夹：photos/incoming/[Category] -> photos/[Category]
        const category = entry.name
        const categoryIncomingDir = path.join(INCOMING_DIR, category)
        const targetDir = path.join(PHOTOS_ROOT, category)

        await processDirectory(categoryIncomingDir, targetDir)
      } else if (entry.isFile()) {
        // 2b. 处理直接放在 incoming 根目录的文件 -> 默认移动到 photos/随手
        await processSingleFile(path.join(INCOMING_DIR, entry.name), DEFAULT_TARGET_DIR)
      }
    }
  } catch (err) {
    consola.error('标准化流程失败:', err)
  } finally {
    await exiftool.end()
  }
}

/**
 * 处理一个目录下的所有图片
 */
async function processDirectory(sourceDir: string, targetDir: string) {
  const files = await readdir(sourceDir)
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.heic', '.mov', '.mp4', '.webm', '.m4v'].includes(ext)
  })

  if (imageFiles.length === 0) return

  await mkdir(targetDir, { recursive: true })

  for (const file of imageFiles) {
    await processSingleFile(path.join(sourceDir, file), targetDir)
  }
}

/**
 * 处理单个文件：读取 EXIF、重命名、移动
 */
async function processSingleFile(filePath: string, targetDir: string) {
  const fileName = path.basename(filePath)
  const fileStat = await stat(filePath)

  consola.start(`正在处理: ${fileName}`)

  try {
    const tags = await exiftool.read(filePath)
    // 优先使用拍摄时间，其次是创建时间，最后是修改时间
    const date = tags.DateTimeOriginal || tags.CreateDate || tags.ModifyDate || fileStat.mtime

    let dateObj: Date
    if (typeof date === 'string') {
      dateObj = new Date(date)
    } else if (date instanceof Date) {
      dateObj = date
    } else if (date && typeof date === 'object' && 'toDate' in date) {
      // Handle ExifDateTime from exiftool-vendored
      dateObj = (date as any).toDate()
    } else {
      dateObj = new Date(fileStat.mtime)
    }

    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    const hour = String(dateObj.getHours()).padStart(2, '0')
    const minute = String(dateObj.getMinutes()).padStart(2, '0')
    const second = String(dateObj.getSeconds()).padStart(2, '0')

    const timestamp = `${year}${month}${day}${hour}${minute}${second}`
    const ext = path.extname(fileName).toLowerCase()
    let newFileName = `${timestamp}${ext}`
    let targetPath = path.join(targetDir, newFileName)

    // 如果文件名冲突，增加序号
    let counter = 1
    while (await fileExists(targetPath)) {
      newFileName = `${timestamp}_${counter}${ext}`
      targetPath = path.join(targetDir, newFileName)
      counter++
    }

    await mkdir(targetDir, { recursive: true })
    await rename(filePath, targetPath)
    consola.success(`已移动并重命名: ${fileName} -> ${path.join(path.basename(targetDir), newFileName)}`)
  } catch (err) {
    consola.error(`处理文件 ${fileName} 出错:`, err)
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

standardize()
