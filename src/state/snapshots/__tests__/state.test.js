import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_RESPONSE = {
  positionsEntries: [],
  positionsTickersEntries: [],
  walletsTickersEntries: [],
  walletsEntries: [],
}

describe('Snapshots state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should update snapshots', () => {
    expect(reducer(initialState, actions.updateSnapshots(TEST_RESPONSE)))
      .toEqual({
        ...initialState,
        dataReceived: true,
        positionsTotalPlUsd: null,
        positionsEntries: [],
        positionsTickersEntries: [],
        walletsTotalBalanceUsd: null,
        walletsTickersEntries: [],
        walletsEntries: [],
      })
  })

  it('should set params', () => {
    const timestamp = 1000
    expect(reducer(initialState, actions.setTimestamp(timestamp)))
      .toEqual({
        ...initialState,
        timestamp,
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      timestamp: 1000,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        timestamp: state.timestamp,
      })
  })
})
