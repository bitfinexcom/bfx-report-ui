import actions, { setParams } from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_PAIR = 'BTC:USD'
const TEST_ENTRY = {
  id: 1,
  fee: -0.1,
  maker: 1,
  orderID: 10,
  execPrice: 100,
  execAmount: 0.5,
  orderPrice: 100,
  mtsCreate: 1000,
  symbol: 'tBTCUSD',
  feeCurrency: 'USD',
  orderType: 'LIMIT',
}

describe('OrderTrades state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set loading on fetch', () => {
    expect(reducer(initialState, actions.fetchOrderTrades()))
      .toEqual({
        ...initialState,
        pageLoading: true,
      })
  })

  it('should update order trades', () => {
    const { symbol, ...entry } = TEST_ENTRY
    expect(reducer(initialState, actions.updateOrderTrades({ res: [TEST_ENTRY] })))
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
    expect(reducer(initialState, actions.updateOrderTrades(undefined)))
      .toEqual({
        ...initialState,
        dataReceived: true,
      })
  })

  it('should set target pair', () => {
    const state = {
      ...initialState,
      id: 1,
      dataReceived: true,
    }
    expect(reducer(state, actions.setTargetPair(TEST_PAIR)))
      .toEqual({
        ...initialState,
        targetPair: TEST_PAIR,
      })
  })

  it('should set params', () => {
    const params = {
      id: 1,
      targetPair: TEST_PAIR,
    }
    expect(reducer(initialState, setParams(params)))
      .toEqual({
        ...initialState,
        ...params,
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      id: 1,
      dataReceived: true,
      targetPair: TEST_PAIR,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        id: state.id,
        targetPair: state.targetPair,
      })
  })
})
