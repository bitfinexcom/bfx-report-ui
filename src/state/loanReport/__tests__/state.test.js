import timeframeConstants from 'ui/TimeFrameSelector/constants'

import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_ENTRY = { id: 1 }

describe('Loan Report state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update loan report', () => {
    expect(reducer(initialState, actions.updateLoanReport([TEST_ENTRY])))
      .toEqual({
        ...initialState,
        dataReceived: true,
        pageLoading: false,
        entries: [TEST_ENTRY],
      })
  })

  it('should set params', () => {
    const params = {
      timeframe: timeframeConstants.WEEK,
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
      targetSymbols: ['BTC'],
      timeframe: timeframeConstants.WEEK,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        timeframe: state.timeframe,
        targetSymbols: state.targetSymbols,
      })
  })
})
