import actions, { setExactBalance } from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_ENTRIES = [
  {
    balance: 100,
    balanceUsd: 100,
    currency: 'USD',
    type: 'exchange',
  },
  {
    balance: 1,
    balanceUsd: 200,
    currency: 'BTC',
    type: 'margin',
  },
]

describe('Wallets state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set loading on fetch', () => {
    expect(reducer(initialState, actions.fetchWallets(1000)))
      .toEqual({
        ...initialState,
        pageLoading: true,
      })
  })

  it('should update wallets sorted by currency', () => {
    expect(reducer(initialState, actions.updateWallets(TEST_ENTRIES)))
      .toEqual({
        ...initialState,
        dataReceived: true,
        entries: [TEST_ENTRIES[1], TEST_ENTRIES[0]],
      })
  })

  it('should keep entries on empty update', () => {
    expect(reducer(initialState, actions.updateWallets(undefined)))
      .toEqual({
        ...initialState,
        dataReceived: true,
      })
  })

  it('should set timestamp', () => {
    expect(reducer(initialState, actions.setTimestamp(1000)))
      .toEqual({
        ...initialState,
        timestamp: 1000,
      })
  })

  it('should set exact balance', () => {
    expect(reducer(initialState, setExactBalance(true)))
      .toEqual({
        ...initialState,
        exactBalance: true,
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      timestamp: 1000,
      dataReceived: true,
      exactBalance: true,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        timestamp: state.timestamp,
        exactBalance: state.exactBalance,
      })
  })
})
