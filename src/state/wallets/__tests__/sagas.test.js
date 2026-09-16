import { put, call } from 'redux-saga/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'

import { toggleErrorDialog } from 'state/ui/actions'

import actions from '../actions'
import { getReqWallets, fetchWallets } from '../saga'

const TIMESTAMP = 1000
const ERROR = { message: 'fail' }

describe('Wallets saga', () => {
  const generator = cloneableGenerator(fetchWallets)({ payload: TIMESTAMP })

  it('sets the timestamp', () => {
    const result = generator.next().value
    expect(result).toEqual(put(actions.setTimestamp(TIMESTAMP)))
  })

  it('calls the API', () => {
    const result = generator.next().value
    expect(result).toEqual(call(getReqWallets, TIMESTAMP))
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
        topic: 'wallets.title',
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
    expect(result).toEqual(put(actions.updateWallets([])))
  })
})
