import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { getTimeFrame } from 'state/timeRange/selectors'
import timeframeConstants from 'ui/TimeFrameSelector/constants'
import unrealizedProfitConstants from 'ui/UnrealizedProfitSelector/constants'

import actions from '../actions'
import { fetchProfits, getReqWinLoss } from '../saga'

const ERROR = { message: 'fail' }
const TIME_FRAME = { start: 1000, end: 2000 }

describe('Profits saga', () => {
  const generator = cloneableGenerator(fetchProfits)()

  it('selects the time frame', () => {
    const result = generator.next().value
    expect(result).toEqual(select(getTimeFrame))
  })

  it('calls the API', () => {
    const result = generator.next(TIME_FRAME).value
    expect(result).toEqual(call(getReqWinLoss, {
      end: TIME_FRAME.end,
      start: TIME_FRAME.start,
      timeframe: timeframeConstants.DAY,
      isUnrealizedProfitExcluded: unrealizedProfitConstants.FALSE,
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
        topic: 'summary.profits.title',
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
        topic: 'summary.profits.title',
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
    expect(result).toEqual(put(actions.updateProfits([])))
  })
})
