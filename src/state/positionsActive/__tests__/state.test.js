import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_PAIR = 'BTC:USD'
const TEST_ENTRY = {
  id: 1,
  pl: 1.5,
  amount: 0.5,
  plPerc: 0.1,
  leverage: 3,
  basePrice: 100,
  collateral: 50,
  mtsCreate: 1000,
  mtsUpdate: 2000,
  status: 'ACTIVE',
  symbol: 'tBTCUSD',
  liquidationPrice: 50,
}

describe('PositionsActive state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set loading on fetch', () => {
    expect(reducer(initialState, actions.fetchAPositions()))
      .toEqual({
        ...initialState,
        pageLoading: true,
      })
  })

  it('should update active positions', () => {
    const { symbol, ...entry } = TEST_ENTRY
    expect(reducer(initialState, actions.updateAPositions([TEST_ENTRY])))
      .toEqual({
        ...initialState,
        dataReceived: true,
        existingPairs: [TEST_PAIR],
        entries: [{
          ...entry,
          pair: TEST_PAIR,
        }],
      })
  })

  it('should keep entries on empty update', () => {
    expect(reducer(initialState, actions.updateAPositions(undefined)))
      .toEqual({
        ...initialState,
        dataReceived: true,
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      dataReceived: true,
      existingPairs: [TEST_PAIR],
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        existingPairs: state.existingPairs,
      })
  })
})
