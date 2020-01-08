import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_ENTRY = { id: 1 }

describe('Fees Report state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update fees report', () => {
    expect(reducer(initialState, actions.updateFeesReport([TEST_ENTRY])))
      .toEqual({
        ...initialState,
        dataReceived: true,
        pageLoading: false,
        entries: [TEST_ENTRY],
      })
  })

  it('should set params', () => {
    const params = {
      start: 1000,
      end: 2000,
    }
    expect(reducer(initialState, actions.setParams(params)))
      .toEqual({
        ...initialState,
        ...params,
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      start: 1000,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        start: state.start,
        end: state.end,
        timeframe: state.timeframe,
      })
  })
})
