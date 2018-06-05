// https://docs.bitfinex.com/v2/reference#ledgers
// import types from './constants'

const initialState = {
  // the default might be configuable on server only,
  // can we fetch that config?
  valueCurrency: 'default', // if the user specified a value currency
  balances: [{
    type: 'Exchange',
    symbol: 'BTC',
    total: '19.0',
    available: '19.0',
  },
  {
    type: 'Exchange',
    symbol: 'ETH',
    total: '50.0',
    available: '50.0',
  },
  {
    type: 'Exchange',
    symbol: 'USD',
    total: '200.0',
    available: '200.0',
  },
  ],
}

export function ledgersReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default ledgersReducer
