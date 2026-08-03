import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { SlidingNumber } from './SlidingNumber'

describe('SlidingNumber', () => {
  it('exposes one stable text value and hides the animated digits', () => {
    const html = renderToStaticMarkup(<SlidingNumber number={-12.5} decimalPlaces={1} />)

    expect(html).toContain('class="sr-only">-12.5</span>')
    expect(html).toContain('aria-hidden="true"')
  })
})
