import { put, call, select } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { getTimeFrame } from 'state/timeRange/selectors'

import actions from '../actions'
import { getTargetPair } from '../selectors'
import { getWeightedAverages, fetchWeightedAverages } from '../saga'

const ERROR = { message: 'fail' }
const TEST_PAIR = 'BTC:USD'
const TIME_FRAME = { start: 1000, end: 2000 }

describe('WeightedAverages saga', () => {
  const generator = cloneableGenerator(fetchWeightedAverages)()

  it('selects the target pair', () => {
    const result = generator.next().value
    expect(result).toEqual(select(getTargetPair))
  })

  it('selects the time frame', () => {
    const result = generator.next(TEST_PAIR).value
    expect(result).toEqual(select(getTimeFrame))
  })

  it('calls the API', () => {
    const result = generator.next(TIME_FRAME).value
    expect(result).toEqual(call(getWeightedAverages, {
      end: TIME_FRAME.end,
      start: TIME_FRAME.start,
      targetPair: TEST_PAIR,
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
        topic: 'weightedaverages.title',
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
        topic: 'weightedaverages.title',
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
    expect(result).toEqual(put(actions.updateWeightedAwerages([])))
  })
})
