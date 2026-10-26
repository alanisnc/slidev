import { describe, expect, it } from 'vitest'
import { isPathInsideRoots } from './fs'
import { parseRangeString } from './utils'

describe('isPathInsideRoots', () => {
  it('accepts a path nested inside a root', () => {
    expect(isPathInsideRoots('/a/b/c', ['/a'])).toBe(true)
  })

  it('accepts a path that equals the root itself', () => {
    expect(isPathInsideRoots('/a', ['/a'])).toBe(true)
  })

  it('rejects a path outside every root', () => {
    expect(isPathInsideRoots('/x', ['/a'])).toBe(false)
  })

  it('rejects a `..`-escaping relative resolution', () => {
    expect(isPathInsideRoots('/a/../x', ['/a'])).toBe(false)
  })
})

describe('parseRangeString', () => {
  it('dedupes, sorts, and drops indexes above the total', () => {
    expect(parseRangeString(5, '4,2-3,3,1-2,9')).toEqual([1, 2, 3, 4])
  })

  it('keeps indexes below 1 because only the upper bound is clipped', () => {
    expect(parseRangeString(5, '0,2')).toEqual([0, 2])
  })
})
