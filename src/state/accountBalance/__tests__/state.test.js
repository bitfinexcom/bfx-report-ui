import timeframeConstants from 'ui/TimeFrameSelector/constants'
import unrealizedProfitConstants from 'ui/UnrealizedProfitSelector/constants'

import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_ENTRY = { id: 1 }

describe('Account balance state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update balance', () => {
    expect(reducer(initialState, actions.updateBalance({ result: [TEST_ENTRY], useDefaults: false })))
      .toEqual({
        ...initialState,
        dataReceived: true,
        entries: [TEST_ENTRY],
        defaultDataReceived: false,
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
      timeframe: timeframeConstants.WEEK,
      isUnrealizedProfitExcluded: unrealizedProfitConstants.TRUE,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        timeframe: state.timeframe,
        isUnrealizedProfitExcluded: state.isUnrealizedProfitExcluded,
      })
  })
})
