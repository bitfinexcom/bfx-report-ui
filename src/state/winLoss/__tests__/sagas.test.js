import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { toggleErrorDialog } from 'state/ui/actions'
import { getTimeFrame } from 'state/timeRange/selectors'

import actions from '../actions'
import selectors from '../selectors'
import { fetchWinLoss, getReqWinLoss } from '../saga'

const ERROR = { message: 'fail' }
const TIME_FRAME = { start: 1000, end: 2000 }
const PARAMS = {
  timeframe: 'day',
  isVSPrevDayBalance: false,
  isUnrealizedProfitExcluded: false,
  isVsAccountBalanceSelected: false,
}

describe('WinLoss saga', () => {
  const generator = cloneableGenerator(fetchWinLoss)()

  it('selects the time frame', () => {
    const result = generator.next().value
    expect(result).toEqual(select(getTimeFrame))
  })

  it('selects the params', () => {
    const result = generator.next(TIME_FRAME).value
    expect(result).toEqual(select(selectors.getParams))
  })

  it('calls the API', () => {
    const result = generator.next(PARAMS).value
    expect(result).toEqual(call(getReqWinLoss, {
      start: TIME_FRAME.start,
      end: TIME_FRAME.end,
      timeframe: PARAMS.timeframe,
      isUnrealizedProfitExcluded: PARAMS.isUnrealizedProfitExcluded,
    }))
  })

  describe('request returns error', () => {
    let clone

    beforeAll(() => {
      clone = generator.clone()
      clone.next({ result: [], error: ERROR }) // skips data update
    })

    it('toggles the error dialog', () => {
      const result = clone.next().value
      expect(result).toEqual(put(toggleErrorDialog(true, ERROR.message)))
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
        topic: 'averagewinloss.title',
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
    expect(result).toEqual(put(actions.updateWinLoss([])))
  })
})
