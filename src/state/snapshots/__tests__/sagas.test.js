import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { toggleErrorDialog } from 'state/ui/actions'

import actions from '../actions'
import { fetchSnapshots, getReqSnapshots } from '../saga'

const ERROR = { message: 'fail' }
const END_TIMESTAMP = 1000

describe('Snapshots saga', () => {
  const generator = cloneableGenerator(fetchSnapshots)(actions.fetchSnapshots(END_TIMESTAMP))

  it('sets the timestamp', () => {
    const result = generator.next().value
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
      clone.next({ result: {}, error: ERROR }) // skips data update
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
    const result = generator.next({ result: {}, error: false }).value
    expect(result).toEqual(put(actions.updateSnapshots({})))
  })
})
