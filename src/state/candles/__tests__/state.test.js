import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_CANDLE = {
  low: 90,
  high: 110,
  open: 100,
  volume: 10,
  close: 105,
  mts: 1000000,
}

describe('Candles state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should reset data on initial fetch', () => {
    expect(reducer(initialState, actions.fetchData()))
      .toEqual({
        ...initialState,
        pageLoading: true,
        candles: {
          entries: [],
          nextPage: false,
          isLoading: true,
        },
        trades: {
          entries: [],
          nextPage: false,
          isLoading: true,
        },
      })
  })

  it('should set section loading on subsequent fetch', () => {
    expect(reducer(initialState, actions.fetchData('candles')))
      .toEqual({
        ...initialState,
        candles: {
          ...initialState.candles,
          isLoading: true,
        },
      })
  })

  it('should update candles', () => {
    const { mts, ...candle } = TEST_CANDLE
    expect(reducer(initialState, actions.updateData({ candles: { res: [TEST_CANDLE], nextPage: false } })))
      .toEqual({
        ...initialState,
        dataReceived: true,
        candles: {
          nextPage: false,
          isLoading: false,
          entries: [{
            ...candle,
            time: TEST_CANDLE.mts / 1000,
          }],
        },
      })
  })

  it('should set params', () => {
    const params = {
      pair: 'ETH:USD',
      timeframe: '1D',
    }
    expect(reducer(initialState, actions.setParams(params)))
      .toEqual({
        ...initialState,
        ...params,
      })
  })

  it('should set chart scroll time', () => {
    expect(reducer(initialState, actions.setChartScrollTime(1000)))
      .toEqual({
        ...initialState,
        chartScrollTime: 1000,
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      pair: 'ETH:USD',
      timeframe: '1D',
      dataReceived: true,
    }
    expect(reducer(state, actions.refresh()))
      .toEqual({
        ...initialState,
        pair: state.pair,
        timeframe: state.timeframe,
      })
  })
})
