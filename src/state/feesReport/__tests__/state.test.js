import timeframeConstants from 'ui/TimeFrameSelector/constants'
import reportTypeConstants from 'ui/ReportTypeSelector/constants'

import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_ENTRY = { id: 1, USD: -100 }

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
        entries: [{ id: 1, USD: 100 }],
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
      isTradingFees: false,
      isFundingFees: true,
      targetSymbols: ['BTC'],
      timeframe: timeframeConstants.WEEK,
      reportType: reportTypeConstants.FUNDING_FEES,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        timeframe: state.timeframe,
        reportType: state.reportType,
        isTradingFees: state.isTradingFees,
        isFundingFees: state.isFundingFees,
        targetSymbols: state.targetSymbols,
      })
  })

  describe('symbols handling keeps selected params', () => {
    const state = {
      ...initialState,
      dataReceived: true,
      isTradingFees: false,
      isFundingFees: true,
      targetSymbols: ['BTC'],
      timeframe: timeframeConstants.WEEK,
      reportType: reportTypeConstants.FUNDING_FEES,
    }

    it('should add symbol', () => {
      expect(reducer(state, actions.addTargetSymbol('ETH')))
        .toEqual({
          ...state,
          targetSymbols: ['BTC', 'ETH'],
        })
    })

    it('should ignore already selected symbol', () => {
      expect(reducer(state, actions.addTargetSymbol('BTC'))).toBe(state)
    })

    it('should remove symbol', () => {
      expect(reducer(state, actions.removeTargetSymbol('BTC')))
        .toEqual({
          ...state,
          targetSymbols: [],
        })
    })

    it('should ignore removing not selected symbol', () => {
      expect(reducer(state, actions.removeTargetSymbol('ETH'))).toBe(state)
    })

    it('should set symbols', () => {
      expect(reducer(state, actions.setTargetSymbols(['ETH', 'XRP'])))
        .toEqual({
          ...state,
          targetSymbols: ['ETH', 'XRP'],
        })
    })

    it('should clear symbols', () => {
      expect(reducer(state, actions.clearTargetSymbols()))
        .toEqual({
          ...state,
          targetSymbols: [],
        })
    })
  })
})
