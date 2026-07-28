import timeframeConstants from 'ui/TimeFrameSelector/constants'
import reportTypeConstants from 'ui/ReportTypeSelector/constants'
import unrealizedProfitConstants from 'ui/UnrealizedProfitSelector/constants'

import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_ENTRY = { id: 1 }

describe('WinLoss state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update win loss', () => {
    expect(reducer(initialState, actions.updateWinLoss([TEST_ENTRY])))
      .toEqual({
        ...initialState,
        dataReceived: true,
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
      isVSPrevDayBalance: true,
      isVsAccountBalanceSelected: true,
      timeframe: timeframeConstants.WEEK,
      reportType: reportTypeConstants.GAINS_BALANCE,
      isUnrealizedProfitExcluded: unrealizedProfitConstants.TRUE,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        timeframe: state.timeframe,
        reportType: state.reportType,
        isVSPrevDayBalance: state.isVSPrevDayBalance,
        isUnrealizedProfitExcluded: state.isUnrealizedProfitExcluded,
        isVsAccountBalanceSelected: state.isVsAccountBalanceSelected,
      })
  })
})
