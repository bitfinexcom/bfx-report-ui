import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_PAIR = 'BTC:USD'
const TEST_ENTRY = {
  cost: 100,
  sale: 50,
  buyingAmount: 1,
  sellingAmount: -0.5,
  lastTradeMts: 2000,
  firstTradeMts: 1000,
  symbol: 'tBTCUSD',
  cumulativeAmount: 0.5,
  buyingWeightedPrice: 100,
  sellingWeightedPrice: 110,
}

describe('WeightedAverages state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set loading on fetch', () => {
    expect(reducer(initialState, actions.fetchWeightedAwerages()))
      .toEqual({
        ...initialState,
        pageLoading: true,
      })
  })

  it('should update weighted averages', () => {
    const { symbol, ...entry } = TEST_ENTRY
    expect(reducer(initialState, actions.updateWeightedAwerages({ res: [TEST_ENTRY], nextPage: false })))
      .toEqual({
        ...initialState,
        nextPage: false,
        dataReceived: true,
        entries: [{
          ...entry,
          pair: TEST_PAIR,
        }],
      })
  })

  it('should keep entries on empty update', () => {
    expect(reducer(initialState, actions.updateWeightedAwerages(undefined)))
      .toEqual({
        ...initialState,
        nextPage: false,
        dataReceived: true,
      })
  })

  it('should set target pair', () => {
    expect(reducer(initialState, actions.setTargetPair('ETH:USD')))
      .toEqual({
        ...initialState,
        targetPair: 'ETH:USD',
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      dataReceived: true,
      targetPair: 'ETH:USD',
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        targetPair: state.targetPair,
      })
  })
})
