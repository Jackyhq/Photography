#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import * as clack from '@clack/prompts'
import { cancel, isCancel } from '@clack/prompts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export interface DocOptions {
  title: string
  description: string
  category?: string
  filename: string
  template: 'basic' | 'guide' | 'api' | 'deployment'
}

/**
 * Generate current timestamp in Asia/Shanghai timezone
 */
export function getCurrentTimestamp(): string {
  return new Date()
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
    .replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}:\d{2})/, '$3-$2-$1T$4+08:00')
}

/**
 * Get available categories by scanning existing directories
 */
export function getCategories(contentsDir = join(__dirname, '..', 'packages', 'docs', 'contents')): string[] {
  try {
    return readdirSync(contentsDir)
      .filter((item) => {
        const fullPath = join(contentsDir, item)
        return statSync(fullPath).isDirectory()
      })
      .sort()
  } catch {
    return []
  }
}

/**
 * Generate content template based on type
 */
export function generateTemplate(options: DocOptions): string {
  const timestamp = getCurrentTimestamp()
  const title = options.title.trim()
  const description = options.description.trim()
  const frontmatter = `---
title: ${title}
description: ${description}
createdAt: ${timestamp}
lastModified: ${timestamp}
---`

  switch (options.template) {
    case 'guide': {
      return `${frontmatter}

# ${title}

## Overview

Brief description of what this guide covers.

## Prerequisites

- Requirement 1
- Requirement 2

## Step 1: Getting Started

Description of the first step.

\`\`\`bash
# Example command
pnpm install
\`\`\`

## Step 2: Configuration

Description of configuration step.

\`\`\`json
{
  "example": "configuration"
}
\`\`\`

## Step 3: Implementation

Implementation details.

## Troubleshooting

Common issues and solutions.

## Next Steps

- Link to related guides
- Additional resources
`
    }

    case 'api': {
      return `${frontmatter}

# ${title}

## Overview

API documentation for ${title}.

## Authentication

Details about authentication requirements.

## Endpoints

### GET /api/example

Description of the endpoint.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`id\` | string | Yes | The unique identifier |

**Response:**

\`\`\`json
{
  "success": true,
  "data": {
    "id": "example",
    "name": "Example"
  }
}
\`\`\`

## Error Handling

Common error responses and their meanings.

## Examples

Code examples for different programming languages.
`
    }

    case 'deployment': {
      return `${frontmatter}

# ${title}

## Overview

Guide for deploying using ${title}.

## Prerequisites

- System requirements
- Account setup

## Installation

Step-by-step installation process.

\`\`\`bash
# Installation commands
\`\`\`

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| \`EXAMPLE_VAR\` | Example variable | Yes |

### Configuration File

\`\`\`json
{
  "example": "configuration"
}
\`\`\`

## Deployment Steps

1. Step one
2. Step two
3. Step three

## Verification

How to verify the deployment was successful.

## Troubleshooting

Common deployment issues and solutions.
`
    }
    default: {
      return `${frontmatter}

# ${title}

## Introduction

Brief introduction to the topic.

## Content

Main content goes here.

## Examples

\`\`\`bash
# Example command
echo "Hello World"
\`\`\`

## Conclusion

Summary and next steps.
`
    }
  }
}

/**
 * Validate filename
 */
export function validateFilename(filename: string): string | undefined {
  if (!filename.trim()) {
    return 'Filename is required'
  }

  const cleanFilename = filename.trim().toLowerCase()
  // Check for valid characters
  if (!/^[a-z0-9-]+$/.test(cleanFilename)) {
    return 'Filename can only contain lowercase letters, numbers, and hyphens'
  }

  // Check length
  if (cleanFilename.length < 2 || cleanFilename.length > 50) {
    return 'Filename must be between 2 and 50 characters'
  }
}

export function validateTitle(title: string): string | undefined {
  if (!title.trim()) {
    return 'Title is required'
  }

  if (/[\r\n]/.test(title)) {
    return 'Title must be a single line'
  }
}

export function validateDescription(description: string): string | undefined {
  if (!description.trim()) {
    return 'Description is required'
  }

  if (/[\r\n]/.test(description)) {
    return 'Description must be a single line'
  }
}

/**
 * Main CLI function
 */
async function main() {
  clack.intro('📝 Create New Documentation')

  // Get document title
  const title = await clack.text({
    message: 'What is the document title?',
    placeholder: 'My Awesome Guide',
    validate: validateTitle,
  })

  if (isCancel(title)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  // Get the document description used by generated metadata and social previews.
  const description = await clack.text({
    message: 'Provide a brief description:',
    placeholder: 'A comprehensive guide to...',
    validate: validateDescription,
  })

  if (isCancel(description)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  // Get template type
  const template = await clack.select({
    message: 'Choose a template:',
    options: [
      { value: 'basic', label: 'Basic - Simple document structure' },
      { value: 'guide', label: 'Guide - Step-by-step tutorial' },
      { value: 'api', label: 'API - API documentation' },
      { value: 'deployment', label: 'Deployment - Deployment guide' },
    ],
  })

  if (isCancel(template)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  // Get existing categories
  const categories = getCategories()

  // Choose category or create new
  const categoryChoice = await clack.select({
    message: 'Choose a category:',
    options: [
      ...categories.map((cat) => ({ value: cat, label: cat })),
      { value: '__new__', label: '✨ Create new category' },
      { value: '__root__', label: '📁 Root level (no category)' },
    ],
  })

  if (isCancel(categoryChoice)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  let category: string | undefined

  if (categoryChoice === '__new__') {
    const newCategory = await clack.text({
      message: 'Enter new category name:',
      placeholder: 'my-category',
      validate: (value) => validateFilename(value),
    })

    if (isCancel(newCategory)) {
      cancel('Operation cancelled.')
      process.exit(0)
    }

    category = newCategory.trim().toLowerCase()
  } else if (categoryChoice !== '__root__') {
    category = categoryChoice
  }

  // Get filename
  const defaultFilename = title
    .toLowerCase()
    .replaceAll(/[^\w\s-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-')
    .replaceAll(/^-|-$/g, '')

  const filename = await clack.text({
    message: 'Enter filename (without .mdx extension):',
    placeholder: defaultFilename,
    defaultValue: defaultFilename,
    validate: validateFilename,
  })

  if (isCancel(filename)) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  // Confirm before creating
  const confirm = await clack.confirm({
    message: `Create document at ${category ? `${category}/` : ''}${filename}.mdx?`,
  })

  if (isCancel(confirm) || !confirm) {
    cancel('Operation cancelled.')
    process.exit(0)
  }

  // Create the document
  const spinner = clack.spinner()
  spinner.start('Creating document...')

  try {
    const contentsDir = join(__dirname, '..', 'packages', 'docs', 'contents')
    const targetDir = category ? join(contentsDir, category) : contentsDir
    const filePath = join(targetDir, `${filename}.mdx`)

    // Create directory if it doesn't exist
    if (!existsSync(targetDir)) {
      mkdirSync(targetDir, { recursive: true })
    }

    // Check if file already exists
    if (existsSync(filePath)) {
      spinner.stop('File already exists!')
      clack.log.error(`Document ${category ? `${category}/` : ''}${filename}.mdx already exists`)
      process.exit(1)
    }

    // Generate content
    const options: DocOptions = {
      title: title.trim(),
      description: description.trim(),
      category,
      filename,
      template: template as DocOptions['template'],
    }

    const content = generateTemplate(options)

    // Write file
    writeFileSync(filePath, content, 'utf-8')

    spinner.stop('Document created successfully!')

    clack.note(
      `Location: packages/docs/contents/${category ? `${category}/` : ''}${filename}.mdx\n` +
        `Template: ${template}\n` +
        `Title: ${title}`,
      'Document Details',
    )

    clack.outro('✨ Happy writing!')
  } catch (error) {
    spinner.stop('Failed to create document')
    clack.log.error(`Error: ${error instanceof Error ? error.message : String(error)}`)
    process.exit(1)
  }
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : undefined

if (invokedPath === import.meta.url) {
  main().catch((error) => {
    console.error('Unexpected error:', error)
    process.exit(1)
  })
}
