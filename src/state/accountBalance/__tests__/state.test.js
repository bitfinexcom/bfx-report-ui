import timeframeConstants from 'ui/TimeframeSelector/constants'

import actions from '../actions'
import reducer from '../reducer'

const initialState = {
  dataReceived: false,
  entries: [],
  startDate: undefined,
  endDate: undefined,
  timeframe: timeframeConstants.DAY,
  skip: undefined,
}

const TEST_ENTRY = { id: 1 }

describe('Account balance state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update balance', () => {
    expect(reducer(initialState, actions.updateBalance([TEST_ENTRY])))
      .toEqual({
        ...initialState,
        dataReceived: true,
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
