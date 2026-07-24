import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { getTimeFrame } from 'state/timeRange/selectors'

import actions from '../actions'
import { fetchTaxReport, getReqTaxReport } from '../saga'
import { getTransactionsStrategy, getTransactionsShouldFeesBeDeducted } from '../selectors'

const ERROR = { message: 'fail' }
const STRATEGY = 'FIFO'
const TIME_FRAME = { start: 1000, end: 2000 }

describe('Tax report saga', () => {
  const generator = cloneableGenerator(fetchTaxReport)(actions.fetchTaxReportTransactions())

  it('selects the time frame', () => {
    const result = generator.next().value
    expect(result).toEqual(select(getTimeFrame))
  })

  it('selects the transactions strategy', () => {
    const result = generator.next(TIME_FRAME).value
    expect(result).toEqual(select(getTransactionsStrategy))
  })

  it('selects the deduct fees setting', () => {
    const result = generator.next(STRATEGY).value
    expect(result).toEqual(select(getTransactionsShouldFeesBeDeducted))
  })

  it('calls the API', () => {
    const result = generator.next(false).value
    expect(result).toEqual(call(getReqTaxReport, {
      start: TIME_FRAME.start,
      end: TIME_FRAME.end,
      strategy: STRATEGY,
      shouldFeesBeDeducted: false,
    }))
  })

  describe('request returns error', () => {
    let clone

    beforeAll(() => {
      clone = generator.clone()
    })

    it('raises failed action', () => {
      const result = clone.next({ error: ERROR }).value
      expect(result).toEqual(put(actions.fetchFail({
        id: 'status.fail',
        topic: 'taxreport.title',
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
        topic: 'taxreport.title',
        detail: JSON.stringify({}),
      })))
    })

    it('performs no further work', () => {
      const result = clone.next().done
      expect(result).toBe(true)
    })
  })

  it('finishes with no error', () => {
    const result = generator.next({ error: false }).done
    expect(result).toBe(true)
  })
})
