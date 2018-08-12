// https://docs.bitfinex.com/v2/reference#rest-auth-trades-hist
import { formatPair } from 'state/utils'
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
                "pair": 1,
                "mtsCreate": 2,
                "orderID": 3,
                "execAmount": 4,
                "execPrice": 5,
                "orderType": 6,
                "orderPrice": 7,
                "maker": 8,
                "fee": 9,
                "feeCurrency": 10
            },
            "_boolFields": [
                "maker"
            ],
            "_fieldKeys": [
                "id",
                "pair",
                "mtsCreate",
                "orderID",
                "execAmount",
                "execPrice",
                "orderType",
                "orderPrice",
                "maker",
                "fee",
                "feeCurrency"
            ],
            "id": 24178707,
            "pair": "tBTCUSD",
            "mtsCreate": 1529942518000,
            "orderID": 1149732562,
            "execAmount": 0.00026691,
            "execPrice": 18037,
            "orderType": null,
            "orderPrice": null,
            "maker": null,
            "fee": -2.7e-7,
            "feeCurrency": "BTC"
        }
    ],
    "id": null
}
 */
const initialState = {
  entries: [
    /* {
      id: 24178707,
      pair: "BTC/USD",
      mtsCreate: 1529942518000,
      orderID: 1149732562,
      execAmount: 0.00026691,
      execPrice: 18037,
      orderType: null,
      orderPrice: null,
      maker: null,
      fee: -2.7e-7,
      feeCurrency: "BTC"
    }, */
  ],
  dataReceived: false,
  smallestMts: 0,
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
}

const LIMIT = queryTypes.DEFAULT_TRADES_QUERY_LIMIT
const PAGE_SIZE = queryTypes.DEFAULT_TRADES_PAGE_SIZE

export function tradesReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_TRADES: {
      const result = action.payload
      let smallestMts
      const entries = result.map((entry) => {
        // log smallest mts
        if (!smallestMts || smallestMts > entry.mtsCreate) {
          smallestMts = entry.mtsCreate
        }
        return {
          id: entry.id,
          pair: formatPair(entry.pair),
          mtsCreate: entry.mtsCreate,
          orderID: entry.orderID,
          execAmount: entry.execAmount,
          execPrice: entry.execPrice,
          orderType: entry.orderType,
          orderPrice: entry.orderPrice,
          maker: entry.maker,
          fee: Math.abs(entry.fee),
          feeCurrency: entry.feeCurrency,
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
        dataReceived: true,
        smallestMts,
        offset: state.offset + entries.length,
        pageOffset: 0,
      }
    }
    case types.FETCH_NEXT_TRADES:
      return (state.entries.length - LIMIT >= state.offset)
        ? {
          ...state,
          offset: state.offset + LIMIT,
          pageOffset: 0,
        } : state
    case types.FETCH_PREV_TRADES:
      return {
        ...state,
        offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
        pageOffset: 0,
      }
    case types.JUMP_TRADES_PAGE: {
      const page = action.payload
      const totalOffset = (page - 1) * PAGE_SIZE
      const currentOffset = Math.floor(totalOffset / LIMIT) * LIMIT
      if (totalOffset < LIMIT) {
        return {
          ...state,
          pageOffset: totalOffset - currentOffset,
        }
      }
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

export default tradesReducer
