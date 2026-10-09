import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_DATA = {
  total: 100,
  summaryByAsset: [{ currency: 'USD' }],
}

describe('SummaryByAsset state', () => {
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
    expect(reducer(initialState, actions.updateData(TEST_DATA)))
      .toEqual({
        ...initialState,
        dataReceived: true,
        data: TEST_DATA,
      })
  })

  it('should set minimum balance', () => {
    expect(reducer(initialState, actions.setMinimumBalance('0.5')))
      .toEqual({
        ...initialState,
        minimumBalance: 0.5,
      })
  })

  it('should toggle use minimum balance', () => {
    expect(reducer(initialState, actions.toggleUseMinimumBalance()))
      .toEqual({
        ...initialState,
        useMinBalance: true,
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
