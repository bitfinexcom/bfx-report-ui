import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import { fetchSnapshots, getReqSnapshots } from '../saga'
import actions from '../actions'

const END_TIMESTAMP = 1000

describe('Snapshots saga', () => {
  const generator = cloneableGenerator(fetchSnapshots)(actions.fetchSnapshots(END_TIMESTAMP))

  it('sets timestamp', () => {
    const result = generator.next(true).value
    expect(result).toEqual(put(actions.setTimestamp(END_TIMESTAMP)))
  })

  it('calls the API', () => {
    const result = generator.next().value
    expect(result).toEqual(call(getReqSnapshots, END_TIMESTAMP))
  })

  describe('request returns error', () => {
    let clone

    beforeAll(() => {
      clone = generator.clone()
      clone.next({ error: {} }) // skips data update
    })

    it('raises failed action', () => {
      const result = clone.next().value
      expect(result).toEqual(put(actions.fetchFail({
        id: 'status.fail',
        topic: 'snapshots.title',
        detail: JSON.stringify({}),
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
        topic: 'snapshots.title',
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
    expect(result).toEqual(put(actions.updateSnapshots([])))
  })
})
