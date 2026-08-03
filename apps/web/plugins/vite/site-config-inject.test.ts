import { describe, expect, it } from 'vitest'

import { createSiteConfigScript } from './site-config-inject'

describe('site config injection', () => {
  it('keeps malicious config strings inside the script payload', () => {
    const script = createSiteConfigScript({
      description: '</script><script>window.compromised = true</script>',
    })

    expect(script).not.toContain('</script>')
    expect(script).not.toContain('<script>')
    expect(script).toContain('\\u003C/script\\u003E')
  })
})
