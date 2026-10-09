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

  it('should fetch snapshots from scratch', () => {
    const state = {
      ...initialState,
      timestamp: 1000,
      dataReceived: true,
      positionsTotalPlUsd: 10,
    }
    expect(reducer(state, actions.fetchSnapshots(2000)))
      .toEqual({
        ...initialState,
        pageLoading: true,
        timestamp: state.timestamp,
      })
  })

  it('should cancel generation', () => {
    const state = {
      ...initialState,
      timestamp: 1000,
      pageLoading: true,
    }
    expect(reducer(state, actions.cancelSnapshotsGeneration()))
      .toEqual({
        ...state,
        pageLoading: false,
        dataReceived: true,
      })
  })
})
