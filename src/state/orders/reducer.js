// https://docs.bitfinex.com/v2/reference#orders-history
import { formatPair } from 'state/utils'
import queryTypes from 'state/query/constants'

import types from './constants'
/*
{
    "result": [NEXT
        {
            "domain": null,
            "_events": {},
            "_eventsCount": 0,
            "_fields": {
                "id": 0,
                "gid": 1,
                "cid": 2,
                "symbol": 3,
                "mtsCreate": 4,
                "mtsUpdate": 5,
                "amount": 6,
                "amountOrig": 7,
                "type": 8,
                "typePrev": 9,
                "flags": 12,
                "status": 13,
                "price": 16,
                "priceAvg": 17,
                "priceTrailing": 18,
                "priceAuxLimit": 19,
                "notify": 23,
                "placedId": 25
            },
            "_boolFields": [
                "notify"
            ],
            "_fieldKeys": [
                "id",
                "gid",
                "cid",
                "symbol",
                "mtsCreate",
                "mtsUpdate",
                "amount",
                "amountOrig",
                "type",
                "typePrev",
                "flags",
                "status",
                "price",
                "priceAvg",
                "priceTrailing",
                "priceAuxLimit",
                "notify",
                "placedId"
            ],
            "id": 1149715964,
            "gid": null,
            "cid": 12175783466,
            "symbol": "tBTCUSD",
            "mtsCreate": 1527564176000,
            "mtsUpdate": 1527625559000,
            "amount": 0,
            "amountOrig": -1,
            "type": "EXCHANGE LIMIT",
            "typePrev": null,
            "flags": 0,
            "status": "EXECUTED @ 1020.0(-0.81): was PARTIALLY FILLED @ 1020.0(-0.09), PARTIALLY FILLED @ 1020.0(-0.1)",
            "price": 1020,
            "priceAvg": 1020,
            "priceTrailing": 0,
            "priceAuxLimit": 0,
            "notify": 0,
            "placedId": null,
            "_lastAmount": 0
        }
    ],
    "id": 5
}
 */
const initialState = {
  entries: [
    /* {
      gid: '',
      cid: 12175783466,
      pair: 'BTC/USD',
      mtsCreate: 1527564176000,
      mtsUpdate: 1527625559000,
      amout: 0,
      amountOrig: -1,
      type: 'EXCHANGE LIMIT',
      typePrev: '',
      flags: 0,
      status: 'EXECUTED @ 1020.0(-0.81): was PARTIALLY FILLED @ 1020.0(-0.09), PARTIALLY FILLED @ 1020.0(-0.1)',
      price: 1020,
      priceAvg: 1020,
      priceTrailing: 0,
      priceAuxLimit: 0,
      notify: 0,
      placedId: '',
    }, */
  ],
  dataReceived: false,
  smallestMts: 0,
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
}

const LIMIT = queryTypes.DEFAULT_ORDERS_QUERY_LIMIT
const PAGE_SIZE = queryTypes.DEFAULT_ORDERS_PAGE_SIZE

export function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_ORDERS: {
      const result = action.payload
      let smallestMts
      const entries = result.map((entry) => {
        // log smallest mts
        if (!smallestMts || smallestMts > entry.mtsUpdate) {
          smallestMts = entry.mtsUpdate
        }
        return {
          id: entry.id,
          gid: entry.gid,
          cid: entry.cid,
          pair: formatPair(entry.symbol),
          mtsCreate: entry.mtsCreate,
          mtsUpdate: entry.mtsUpdate,
          amount: entry.amount,
          amountOrig: entry.amountOrig,
          type: entry.type,
          typePrev: entry.typePrev,
          flags: entry.flags,
          status: entry.status,
          price: entry.price,
          priceAvg: entry.priceAvg,
          priceTrailing: entry.priceTrailing,
          priceAuxLimit: entry.priceAuxLimit,
          notify: entry.notify,
          placedId: entry.placedId,
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
    case types.FETCH_NEXT_ORDERS:
      return (state.entries.length - LIMIT > state.offset)
        ? {
          ...state,
          offset: state.offset + LIMIT,
          pageOffset: 0,
        } : state
    case types.FETCH_PREV_ORDERS:
      return {
        ...state,
        offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
        pageOffset: 0,
      }
    case types.JUMP_ORDERS_PAGE: {
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

export default ordersReducer
