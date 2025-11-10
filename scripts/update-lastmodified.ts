#!/usr/bin/env node

import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Update lastModified field in MDX files
 */
function updateLastModified(filePath: string): boolean {
  try {
    const content = readFileSync(filePath, 'utf-8')

    // Check if the file has frontmatter
    if (!content.startsWith('---')) {
      console.info(`Skipping ${filePath}: no frontmatter found`)
      return false
    }

    // Parse frontmatter
    const frontmatterEnd = content.indexOf('---', 3)
    if (frontmatterEnd === -1) {
      console.info(`Skipping ${filePath}: invalid frontmatter format`)
      return false
    }

    const frontmatter = content.slice(0, frontmatterEnd + 3)
    const body = content.slice(frontmatterEnd + 3)

    // Check if lastModified field exists
    if (!frontmatter.includes('lastModified:')) {
      console.info(`Skipping ${filePath}: no lastModified field found`)
      return false
    }

    // Generate new timestamp
    const currentDate = new Date()
      .toLocaleString('en-GB', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      .replace(
        /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}:\d{2})/,
        '$3-$2-$1T$4+08:00',
      )

    // Update lastModified field
    const updatedFrontmatter = frontmatter.replace(
      /lastModified:\s[^\n]+$/m,
      `lastModified: ${currentDate}`,
    )

    const updatedContent = updatedFrontmatter + body
    writeFileSync(filePath, updatedContent, 'utf-8')

    console.info(`✅ Updated ${filePath} lastModified to ${currentDate}`)
    return true
  } catch (error) {
    console.error(`❌ Failed to update ${filePath}:`, error)
    return false
  }
}

/**
 * Get modified documentation files
 */
function getModifiedDocsFiles(): string[] {
  try {
    // Get staged files
    const stagedFiles = execSync('git diff --cached --name-only', {
      encoding: 'utf-8',
    })
      .trim()
      .split('\n')
      .filter(Boolean)

    // Filter for md/mdx files in docs contents directory
    const docsFiles = stagedFiles.filter(
      (file) =>
        file.startsWith('packages/docs/contents/') &&
        (file.endsWith('.md') || file.endsWith('.mdx')),
    )

    return docsFiles.map((file) => join(__dirname, '..', file))
  } catch (error) {
    console.error('Failed to get modified files:', error)
    return []
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2)

  // If file paths are provided as arguments, process them directly
  if (args.length > 0) {
    let hasUpdates = false
    for (const filePath of args) {
      if (updateLastModified(filePath)) {
        hasUpdates = true
      }
    }

    if (hasUpdates) {
      console.info('\n📝 Please check updates and re-add to staging area:')
      console.info('git add packages/docs/contents/')
    }
    return
  }

  // Get modified documentation files
  const modifiedFiles = getModifiedDocsFiles()

  if (modifiedFiles.length === 0) {
    console.info('✨ No documentation files need updating')
    return
  }

  console.info(`🔍 Found ${modifiedFiles.length} modified documentation files:`)
  modifiedFiles.forEach((file) => console.info(`  - ${file}`))

  let hasUpdates = false
  for (const filePath of modifiedFiles) {
    if (updateLastModified(filePath)) {
      hasUpdates = true
    }
  }

  if (hasUpdates) {
    console.info(
      '\n📝 Auto-updated lastModified fields, re-adding to staging area...',
    )
    try {
      execSync('git add packages/docs/contents/', { stdio: 'inherit' })
      console.info('✅ Successfully re-added to staging area')
    } catch (error) {
      console.error('❌ Failed to re-add to staging area:', error)
      console.info('Please run manually: git add packages/docs/contents/')
    }
  }
}

// Run main function
main()
