import types from '../constants'
import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_ENTRY = { asset: 'BTC', amount: 1 }

describe('TaxReport state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set loading on transactions fetch', () => {
    const { transactions } = initialState
    expect(reducer(initialState, actions.fetchTaxReportTransactions()))
      .toEqual({
        ...initialState,
        transactions: {
          pageLoading: true,
          strategy: transactions.strategy,
          showDisclaimer: transactions.showDisclaimer,
          shouldFeesBeDeducted: transactions.shouldFeesBeDeducted,
        },
      })
  })

  it('should update transactions', () => {
    const { transactions } = initialState
    expect(reducer(initialState, actions.updateTaxReportTransactions([TEST_ENTRY])))
      .toEqual({
        ...initialState,
        transactions: {
          progress: null,
          data: [TEST_ENTRY],
          pageLoading: false,
          dataReceived: true,
          strategy: transactions.strategy,
          showDisclaimer: transactions.showDisclaimer,
          shouldFeesBeDeducted: transactions.shouldFeesBeDeducted,
        },
      })
  })

  it('should set transactions strategy', () => {
    expect(reducer(initialState, actions.setTransactionsStrategy(types.STRATEGY_FIFO)))
      .toEqual({
        ...initialState,
        transactions: {
          ...initialState.transactions,
          strategy: types.STRATEGY_FIFO,
        },
      })
  })

  it('should set generation progress', () => {
    expect(reducer(initialState, actions.setGenerationProgress(50)))
      .toEqual({
        ...initialState,
        transactions: {
          ...initialState.transactions,
          progress: 50,
        },
      })
  })

  it('should cancel report generation', () => {
    const state = {
      ...initialState,
      transactions: {
        ...initialState.transactions,
        progress: 50,
        pageLoading: true,
      },
    }
    expect(reducer(state, actions.cancelTaxReportGeneration()))
      .toEqual({
        ...initialState,
        transactions: {
          ...initialState.transactions,
          dataReceived: true,
        },
      })
  })
})
