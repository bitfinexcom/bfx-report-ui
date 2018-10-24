// https://docs.bitfinex.com/v2/reference#rest-auth-trades-hist
import { formatInternalPair, formatSymbolToPair } from 'state/utils'
import queryTypes from 'state/query/constants'
import authTypes from 'state/auth/constants'

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
                "symbol": 1,
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
                "symbol",
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
            "symbol": "tBTCUSD",
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
  dataReceived: false,
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
  existingPairs: [],
  smallestMts: 0,
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
  pageLoading: false,
  targetPair: '',
}

const LIMIT = queryTypes.DEFAULT_TRADES_QUERY_LIMIT
const PAGE_SIZE = queryTypes.DEFAULT_TRADES_PAGE_SIZE

export function tradesReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_TRADES: {
      const { existingPairs } = state
      const updatePairs = [...existingPairs]
      let smallestMts
      const entries = payload.map((entry) => {
        const {
          execAmount,
          execPrice,
          fee,
          feeCurrency,
          id,
          symbol,
          maker,
          mtsCreate,
          orderID,
          orderPrice,
          orderType,
        } = entry
        const internalPair = formatInternalPair(symbol)
        // save new pair to updatePairs list
        if (updatePairs.indexOf(internalPair) === -1) {
          updatePairs.push(internalPair)
        }
        // log smallest mts
        if (!smallestMts || smallestMts > mtsCreate) {
          smallestMts = mtsCreate
        }
        return {
          id,
          pair: formatSymbolToPair(symbol),
          mtsCreate,
          orderID,
          execAmount,
          execPrice,
          orderType,
          orderPrice,
          maker,
          fee: Math.abs(fee),
          feeCurrency,
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
        existingPairs: updatePairs.sort(),
        dataReceived: true,
        smallestMts,
        offset: state.offset + entries.length,
        pageOffset: 0,
        pageLoading: false,
      }
    }
    case types.FETCH_FAIL:
      return {
        ...state,
        pageLoading: false,
      }
    case types.FETCH_NEXT_TRADES:
      return (state.entries.length - LIMIT >= state.offset)
        ? {
          ...state,
          offset: state.offset + LIMIT,
          pageOffset: 0,
        } : {
          ...state,
          pageLoading: true,
        }
    case types.FETCH_PREV_TRADES:
      return {
        ...state,
        offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
        pageOffset: 0,
      }
    case types.JUMP_TRADES_PAGE: {
      const page = payload
      const totalOffset = (page - 1) * PAGE_SIZE
      const currentOffset = Math.floor(totalOffset / LIMIT) * LIMIT
      if (totalOffset < LIMIT) {
        const baseOffset = Math.ceil(page / LIMIT * PAGE_SIZE) * LIMIT
        return {
          ...state,
          offset: state.offset < baseOffset ? state.offset : baseOffset,
          pageOffset: totalOffset - currentOffset,
        }
      }
      return {
        ...state,
        offset: currentOffset + LIMIT,
        pageOffset: totalOffset - currentOffset,
      }
    }
    case types.SET_PAIR:
      return {
        ...initialState,
        targetPair: payload,
        existingPairs: state.existingPairs,
      }
    // existingPairs should be re-calc in new time range
    case types.REFRESH:
    case queryTypes.SET_TIME_RANGE:
      return {
        ...initialState,
        targetPair: state.targetPair,
      }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default tradesReducer
