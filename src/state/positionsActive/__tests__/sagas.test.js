import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import actions from '../actions'
import { getReqPositions, fetchActivePositions } from '../saga'

const ERROR = { message: 'fail' }

describe('PositionsActive saga', () => {
  const generator = cloneableGenerator(fetchActivePositions)()

  it('calls the API', () => {
    const result = generator.next().value
    expect(result).toEqual(call(getReqPositions))
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
        topic: 'positions.title',
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
        topic: 'positions.title',
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
    expect(result).toEqual(put(actions.updateAPositions([])))
  })
})
