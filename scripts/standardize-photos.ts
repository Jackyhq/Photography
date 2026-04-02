import { mkdir, readdir, rename, stat } from 'node:fs/promises'
import path from 'node:path'

import consola from 'consola'
import { exiftool } from 'exiftool-vendored'

const INCOMING_DIR = path.resolve(process.cwd(), 'photos/incoming')
const TARGET_DIR = path.resolve(process.cwd(), 'photos/随手')

async function standardize() {
  try {
    const files = await readdir(INCOMING_DIR)
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.heic', '.mov', '.mp4'].includes(ext)
    })

    if (imageFiles.length === 0) {
      consola.info('没有发现需要处理的图片。')
      return
    }

    await mkdir(TARGET_DIR, { recursive: true })

    for (const file of imageFiles) {
      const filePath = path.join(INCOMING_DIR, file)
      const fileStat = await stat(filePath)

      if (fileStat.isDirectory()) continue

      consola.start(`正在处理: ${file}`)

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
          // Handle ExifDateTime
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
        const ext = path.extname(file).toLowerCase()
        let newFileName = `${timestamp}${ext}`
        let targetPath = path.join(TARGET_DIR, newFileName)

        // 如果文件名冲突，增加序号
        let counter = 1
        while (await fileExists(targetPath)) {
          newFileName = `${timestamp}_${counter}${ext}`
          targetPath = path.join(TARGET_DIR, newFileName)
          counter++
        }

        await rename(filePath, targetPath)
        consola.success(`已移动并重命名: ${file} -> ${newFileName}`)
      } catch (err) {
        consola.error(`处理文件 ${file} 出错:`, err)
      }
    }
  } catch (err) {
    consola.error('标准化流程失败:', err)
  } finally {
    await exiftool.end()
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
