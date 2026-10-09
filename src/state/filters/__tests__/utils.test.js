import { FILTERS } from 'var/filterTypes'

import { encodeFilters, getValidSortedFilters } from '../utils'

const buildFilter = (column, value, type = FILTERS.CONTAINS) => ({ column, type, value })

describe('getValidSortedFilters', () => {
  it('should drop filters with a missing column, type or value', () => {
    const filters = [
      buildFilter('currency', 'BTC'),
      buildFilter('', 'BTC'),
      { column: 'amount', type: '', value: 10 },
      { column: 'amount', type: FILTERS.EQUAL_TO, value: undefined },
      { column: 'amount', type: FILTERS.EQUAL_TO, value: '' },
    ]

    expect(getValidSortedFilters(filters)).toEqual([buildFilter('currency', 'BTC')])
  })

  it('should keep falsy but meaningful values', () => {
    const filters = [
      { column: 'amount', type: FILTERS.EQUAL_TO, value: 0 },
      { column: 'hidden', type: FILTERS.EQUAL_TO, value: false },
    ]

    expect(getValidSortedFilters(filters)).toEqual(filters)
  })

  it('should sort by column, then type, then value', () => {
    const filters = [
      buildFilter('currency', 'ETH', FILTERS.EQUAL_TO),
      buildFilter('amount', 10, FILTERS.GREATER_THAN),
      buildFilter('currency', 'BTC', FILTERS.EQUAL_TO),
      buildFilter('currency', 'USD', FILTERS.BEGINS_WITH),
      buildFilter('amount', 5, FILTERS.GREATER_THAN),
    ]

    expect(getValidSortedFilters(filters)).toEqual([
      buildFilter('amount', 5, FILTERS.GREATER_THAN),
      buildFilter('amount', 10, FILTERS.GREATER_THAN),
      buildFilter('currency', 'USD', FILTERS.BEGINS_WITH),
      buildFilter('currency', 'BTC', FILTERS.EQUAL_TO),
      buildFilter('currency', 'ETH', FILTERS.EQUAL_TO),
    ])
  })

  it('should produce the same result regardless of input order', () => {
    const filters = [
      buildFilter('currency', 'BTC'),
      buildFilter('amount', 10, FILTERS.GREATER_THAN),
      buildFilter('description', 'test', FILTERS.ENDS_WITH),
    ]

    expect(getValidSortedFilters(filters)).toEqual(getValidSortedFilters([...filters].reverse()))
  })

  it('should not mutate the source array', () => {
    const filters = [
      buildFilter('currency', 'BTC'),
      buildFilter('amount', 10, FILTERS.GREATER_THAN),
    ]
    const snapshot = [...filters]

    getValidSortedFilters(filters)

    expect(filters).toEqual(snapshot)
  })

  it('should handle an empty filters list', () => {
    expect(getValidSortedFilters([])).toEqual([])
  })
})

describe('encodeFilters', () => {
  it('should encode a single filter', () => {
    expect(encodeFilters([buildFilter('currency', 'BTC')])).toBe('currency=ct,BTC')
  })

  it('should encode filters ordered by column', () => {
    const filters = [
      buildFilter('description', 'test', FILTERS.ENDS_WITH),
      buildFilter('currency', 'BTC'),
      buildFilter('amount', 10, FILTERS.GREATER_THAN),
    ]

    expect(encodeFilters(filters)).toBe('amount=gt,10&currency=ct,BTC&description=ew,test')
  })

  it('should produce the same query regardless of input order', () => {
    const filters = [
      buildFilter('description', 'test', FILTERS.ENDS_WITH),
      buildFilter('currency', 'BTC'),
      buildFilter('amount', 10, FILTERS.GREATER_THAN),
    ]

    expect(encodeFilters(filters)).toBe(encodeFilters([...filters].reverse()))
  })

  it('should uri-encode filter values', () => {
    expect(encodeFilters([buildFilter('description', 'a b&c')])).toBe('description=ct,a%20b%26c')
  })

  it('should skip invalid filters', () => {
    const filters = [
      buildFilter('currency', 'BTC'),
      buildFilter('', 'ignored'),
      { column: 'amount', type: FILTERS.EQUAL_TO, value: '' },
    ]

    expect(encodeFilters(filters)).toBe('currency=ct,BTC')
  })

  it('should handle an empty filters list', () => {
    expect(encodeFilters([])).toBe('')
  })
})
