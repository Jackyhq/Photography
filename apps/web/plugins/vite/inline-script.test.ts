import { describe, expect, it } from 'vitest'

import { serializeForInlineScript } from './inline-script'

describe('serializeForInlineScript', () => {
  it('escapes every character that can break out of an inline script context', () => {
    const serialized = serializeForInlineScript({
      payload: '</script><script>alert("xss")</script>&\u2028\u2029',
    })

    expect(serialized).not.toContain('</script>')
    expect(serialized).not.toContain('<script>')
    expect(serialized).not.toContain('&')
    expect(serialized).not.toContain('\u2028')
    expect(serialized).not.toContain('\u2029')
    expect(serialized).toContain('\\u003C/script\\u003E')
    expect(JSON.parse(serialized)).toEqual({
      payload: '</script><script>alert("xss")</script>&\u2028\u2029',
    })
  })

  it('rejects values that JSON cannot serialize', () => {
    expect(() => serializeForInlineScript(Symbol('unsupported'))).toThrow('must be JSON serializable')
  })
})
