import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import queryTypes from 'state/query/constants'
import { getFilterQuery } from 'state/filters/selectors'

import actions from '../actions'
import { getTargetPairs } from '../selectors'
import { fetchDerivatives, getReqDerivatives } from '../saga'

const FILTER = {}
const ERROR = { message: 'fail' }
const TARGET_PAIRS = ['BTCF0:USTF0']

describe('Derivatives saga', () => {
  const generator = cloneableGenerator(fetchDerivatives)()

  it('selects the target pairs', () => {
    const result = generator.next().value
    expect(result).toEqual(select(getTargetPairs))
  })

  it('selects the filter query', () => {
    const result = generator.next(TARGET_PAIRS).value
    expect(result).toEqual(select(getFilterQuery, queryTypes.MENU_DERIVATIVES))
  })

  it('calls the API', () => {
    const result = generator.next(FILTER).value
    expect(result).toEqual(call(getReqDerivatives, {
      targetPairs: TARGET_PAIRS,
      filter: FILTER,
    }))
  })

  describe('request returns error', () => {
    let clone

    beforeAll(() => {
      clone = generator.clone()
      clone.next({ result: [], error: ERROR }) // skips data update
    })

    it('raises failed action', () => {
      const result = clone.next().value
      expect(result).toEqual(put(actions.fetchFail({
        id: 'status.fail',
        topic: 'derivatives.title',
        detail: ERROR.message,
      })))
    })
  })

  describe('request throws error', () => {
    let clone

    beforeAll(() => {
      clone = generator.clone()
    })

    it('raises failed action', () => {
      const result = clone.throw({}).value
      expect(result).toEqual(put(actions.fetchFail({
        id: 'status.request.error',
        topic: 'derivatives.title',
        detail: JSON.stringify({}),
      })))
    })

    it('performs no further work', () => {
      const result = clone.next().done
      expect(result).toBe(true)
    })
  })

  it('updates data', () => {
    const result = generator.next({ result: [], error: false }).value
    expect(result).toEqual(put(actions.updateDerivatives([])))
  })
})
