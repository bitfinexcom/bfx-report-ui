// https://docs.bitfinex.com/v2/reference#ledgers
import queryTypes from 'state/query/constants'

import types from './constants'

/*
{
    "result": [
        {
            "domain": null,
            "_events": {},
            "_eventsCount": 0,
            "_fields": {
                "id": 0,
                "currency": 1,
                "mts": 3,
                "amount": 5,
                "balance": 6,
                "description": 8
            },
            "_boolFields": [],
            "_fieldKeys": [
                "id",
                "currency",
                "mts",
                "amount",
                "balance",
                "description"
            ],
            "id": 131916849,
            "currency": "USD",
            "mts": 1527625475000,
            "amount": 91.8,
            "balance": 20091.8,
            "description": "Exchange 0.09 BTC for USD @ 1020.0 on wallet exchange"
        },
        {
            "domain": null,
            "_events": {},
            "_eventsCount": 0,
            "_fields": {
                "id": 0,
                "currency": 1,
                "mts": 3,
                "amount": 5,
                "balance": 6,
                "description": 8
            },
            "_boolFields": [],
            "_fieldKeys": [
                "id",
                "currency",
                "mts",
                "amount",
                "balance",
                "description"
            ],
            "id": 131916850,
            "currency": "BTC",
            "mts": 1527625475000,
            "amount": -0.09,
            "balance": 19.91,
            "description": "Exchange 0.09 BTC for USD @ 1020.0 on wallet exchange"
        }
    ],
    "id": 5
}
*/
const initialState = {
  currencies: [],
  entries: [
    /* {
      id: 131919156,
      currency: 'USD',
      mts: 1528335001000,
      amount: 17.18587619,
      balance: 5018.07087619,
      description: 'Margin Funding Payment on wallet funding',
    },
    {
      id: 131918375,
      currency: 'USD',
      mts: 1528274257000,
      amount: 5000.885,
      balance: 5000.885,
      description: 'Transfer of 5000.885 USD from wallet Exchange to Deposit on wallet funding',
    }, */
  ],
  dataReceived: false,
  smallestMts: 0,
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
}

const LIMIT = queryTypes.DEFAULT_LEDGERS_QUERY_LIMIT
const PAGE_SIZE = queryTypes.DEFAULT_LEDGERS_PAGE_SIZE

export function ledgersReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_LEDGERS: {
      const result = action.payload
      const { currencies } = state
      let smallestMts
      const entries = result.map((entry) => {
        // save new symbol to currencies list
        if (currencies.indexOf(entry.currency) === -1) {
          currencies.push(entry.currency)
        }
        // log smallest mts
        if (!smallestMts || smallestMts > entry.mts) {
          smallestMts = entry.mts
        }
        return {
          id: entry.id,
          currency: entry.currency,
          mts: entry.mts,
          amount: entry.amount,
          balance: entry.balance,
          description: entry.description,
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
        currencies: currencies.sort(),
        dataReceived: true,
        smallestMts,
        offset: state.offset + entries.length,
        pageOffset: 0,
      }
    }
    case types.FETCH_NEXT_LEDGERS:
      return (state.entries.length - LIMIT >= state.offset)
        ? {
          ...state,
          offset: state.offset + LIMIT,
          pageOffset: 0,
        } : state
    case types.FETCH_PREV_LEDGERS:
      return {
        ...state,
        offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
        pageOffset: 0,
      }
    case types.JUMP_LEDGERS_PAGE: {
      const page = action.payload
      const totalOffset = (page - 1) * PAGE_SIZE
      const currentOffset = Math.floor(totalOffset / LIMIT) * LIMIT
      return {
        ...state,
        offset: currentOffset + LIMIT,
        pageOffset: totalOffset - currentOffset,
      }
    }
    case queryTypes.SET_TIME_RANGE:
      return initialState
    default: {
      return state
    }
  }
}

export default ledgersReducer
