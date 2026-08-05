import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_DATA = {
  trade_vol_30d: [{ curr: 'USD', vol: 100 }],
}

describe('AccountSummary state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set loading on fetch', () => {
    expect(reducer(initialState, actions.fetchData()))
      .toEqual({
        ...initialState,
        pageLoading: true,
      })
  })

  it('should update data', () => {
    expect(reducer(initialState, actions.updateData([TEST_DATA])))
      .toEqual({
        ...initialState,
        dataReceived: true,
        data: TEST_DATA,
      })
  })

  it('should reset data on empty update', () => {
    expect(reducer(initialState, actions.updateData([])))
      .toEqual({
        ...initialState,
        dataReceived: true,
        data: {},
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      dataReceived: true,
      data: TEST_DATA,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual(initialState)
  })
})
