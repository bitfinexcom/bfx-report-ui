import {
  all,
  put,
  call,
  select,
} from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { getTimeFrame } from 'state/timeRange/selectors'

import actions from '../actions'
import selectors from '../selectors'
import {
  fetchData,
  fetchCandles,
  getReqTrades,
  getReqCandles,
} from '../saga'

const ERROR = { message: 'fail' }
const TIME_FRAME = { start: 1000, end: 2000 }
const PARAMS = { timeframe: '1h', pair: 'BTC:USD' }
const CANDLES = { entries: [], nextPage: false, isLoading: false }
const TRADES = { entries: [], nextPage: false, isLoading: false }

describe('Candles saga', () => {
  describe('fetches a single section', () => {
    const generator = cloneableGenerator(fetchCandles)({ payload: 'candles' })

    it('selects the candles', () => {
      const result = generator.next().value
      expect(result).toEqual(select(selectors.getCandles))
    })

    it('selects the trades', () => {
      const result = generator.next(CANDLES).value
      expect(result).toEqual(select(selectors.getTrades))
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
          topic: 'candles.title',
          detail: JSON.stringify({}),
        })))
      })
    })

    it('delegates to fetchData', () => {
      const result = generator.next(TRADES).value
      expect(result).toEqual(call(fetchData, 'candles', CANDLES, getReqCandles))
    })

    it('performs no further work', () => {
      const result = generator.next().done
      expect(result).toBe(true)
    })
  })

  describe('fetches both sections', () => {
    const generator = cloneableGenerator(fetchCandles)({ payload: undefined })

    it('runs both fetches in parallel', () => {
      generator.next() // selects the candles
      generator.next(CANDLES) // selects the trades
      const result = generator.next(TRADES).value
      expect(result).toEqual(all([
        call(fetchData, 'candles', CANDLES, getReqCandles),
        call(fetchData, 'trades', TRADES, getReqTrades),
      ]))
    })
  })

  describe('fetchData', () => {
    const generator = cloneableGenerator(fetchData)('candles', CANDLES, getReqCandles)

    it('selects the params', () => {
      const result = generator.next().value
      expect(result).toEqual(select(selectors.getParams))
    })

    it('selects the time frame', () => {
      const result = generator.next(PARAMS).value
      expect(result).toEqual(select(getTimeFrame, CANDLES.nextPage))
    })

    it('calls the API', () => {
      const result = generator.next(TIME_FRAME).value
      expect(result).toEqual(call(getReqCandles, {
        ...PARAMS,
        end: TIME_FRAME.end,
        start: TIME_FRAME.start,
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
          topic: 'candles.title',
          detail: ERROR.message,
        })))
      })
    })

    it('updates data', () => {
      const result = generator.next({ result: [], error: false }).value
      expect(result).toEqual(put(actions.updateData({ candles: [] })))
    })
  })
})
