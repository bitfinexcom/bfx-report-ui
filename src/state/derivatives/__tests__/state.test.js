import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_PAIR = 'BTCF0:USTF0'
const TEST_ENTRY = {
  key: 'tBTCF0:USTF0',
  price: 100,
  clampMin: 0,
  clampMax: 1,
  fundBal: 5,
  priceSpot: 99,
  fundingStep: 1,
  timestamp: 1000,
  fundingAccrued: 0.1,
}

describe('Derivatives state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set loading on fetch', () => {
    expect(reducer(initialState, actions.fetchDerivatives()))
      .toEqual({
        ...initialState,
        pageLoading: true,
      })
  })

  it('should update derivatives', () => {
    const { key, ...entry } = TEST_ENTRY
    expect(reducer(initialState, actions.updateDerivatives({ res: [TEST_ENTRY] })))
      .toEqual({
        ...initialState,
        dataReceived: true,
        entries: [{
          ...entry,
          pair: TEST_PAIR,
        }],
      })
  })

  it('should keep entries on empty update', () => {
    expect(reducer(initialState, actions.updateDerivatives(undefined)))
      .toEqual({
        ...initialState,
        dataReceived: true,
      })
  })

  it('should add target pair', () => {
    expect(reducer(initialState, actions.addTargetPair(TEST_PAIR)))
      .toEqual({
        ...initialState,
        targetPairs: [TEST_PAIR],
      })
  })

  it('should remove target pair', () => {
    const state = {
      ...initialState,
      targetPairs: [TEST_PAIR],
    }
    expect(reducer(state, actions.removeTargetPair(TEST_PAIR)))
      .toEqual(initialState)
  })

  it('should set target pairs', () => {
    expect(reducer(initialState, actions.setTargetPairs([TEST_PAIR])))
      .toEqual({
        ...initialState,
        targetPairs: [TEST_PAIR],
      })
  })

  it('should clear target pairs', () => {
    const state = {
      ...initialState,
      targetPairs: [TEST_PAIR],
    }
    expect(reducer(state, actions.clearTargetPairs()))
      .toEqual(initialState)
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      dataReceived: true,
      targetPairs: [TEST_PAIR],
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        targetPairs: state.targetPairs,
      })
  })
})
