import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import actions from '../actions'
import selectors from '../selectors'
import { getReqOrderTrades, fetchOrderTrades } from '../saga'

const ERROR = { message: 'fail' }
const PARAMS = { id: 1, targetPair: 'BTC:USD' }

describe('OrderTrades saga', () => {
  const generator = cloneableGenerator(fetchOrderTrades)()

  it('selects the params', () => {
    const result = generator.next().value
    expect(result).toEqual(select(selectors.getParams))
  })

  it('calls the API', () => {
    const result = generator.next(PARAMS).value
    expect(result).toEqual(call(getReqOrderTrades, PARAMS))
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
        topic: 'ordertrades.title',
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
        topic: 'ordertrades.title',
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
    expect(result).toEqual(put(actions.updateOrderTrades([])))
  })
})
