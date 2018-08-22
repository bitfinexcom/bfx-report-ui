// https://docs.bitfinex.com/v2/reference#movements
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
                "currencyName": 2,
                "mtsStarted": 5,
                "mtsUpdated": 6,
                "status": 9,
                "amount": 12,
                "fees": 13,
                "destinationAddress": 16,
                "transactionId": 20
            },
            "_boolFields": [],
            "_fieldKeys": [
                "id",
                "currency",
                "currencyName",
                "mtsStarted",
                "mtsUpdated",
                "status",
                "amount",
                "fees",
                "destinationAddress",
                "transactionId"
            ],
            "id": 1350463,
            "currency": "ETH",
            "currencyName": "ETHEREUM",
            "mtsStarted": 1528251777000,
            "mtsUpdated": 1528251998000,
            "status": "PENDING REVIEW",
            "amount": -0.9976,
            "fees": -0.0024,
            "destinationAddress": "0x9AE5d369c3E5833A1664fA7F8A757D226669f3c6",
            "transactionId": null
        }
    ],
    "id": 5
}
 */
const initialState = {
  entries: [
    /* {
      currency: 'ETH',
      currencyName: 'ETHEREUM',
      mtsStarted: 1528251777000,
      mtsUpdated: 1528251998000,
      status: 'PENDING REVIEW',
      amount: -0.9976,
      fees: -0.0024,
      destinationAddress: '0x9AE5d369c3E5833A1664fA7F8A757D226669f3c6',
      transactionId: '',
    }, */
  ],
  dataReceived: false,
  smallestMts: 0,
  offset: 0, // end of current offset
  pageOffset: 0, // start of current page
  pageLoading: false,
}

const LIMIT = queryTypes.DEFAULT_MOVEMENTS_QUERY_LIMIT
const PAGE_SIZE = queryTypes.DEFAULT_MOVEMENTS_PAGE_SIZE

export function movementsReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_MOVEMENTS: {
      const result = action.payload
      let smallestMts
      const entries = result.map((entry) => {
        // log smallest mts
        if (!smallestMts || smallestMts > entry.mtsUpdated) {
          smallestMts = entry.mtsUpdated
        }
        return {
          id: entry.id,
          currency: entry.currency,
          currencyName: entry.currencyName,
          mtsStarted: entry.mtsStarted,
          mtsUpdated: entry.mtsUpdated,
          status: entry.status,
          amount: entry.amount,
          fees: entry.fees,
          destinationAddress: entry.destinationAddress,
          transactionId: entry.transactionId,
        }
      })
      return {
        ...state,
        entries: [...state.entries, ...entries],
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
    case types.FETCH_NEXT_MOVEMENTS:
      return (state.entries.length - LIMIT >= state.offset)
        ? {
          ...state,
          offset: state.offset + LIMIT,
          pageOffset: 0,
        } : {
          ...state,
          pageLoading: true,
        }
    case types.FETCH_PREV_MOVEMENTS:
      return {
        ...state,
        offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
        pageOffset: 0,
      }
    case types.JUMP_MOVEMENTS_PAGE: {
      const page = action.payload
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
    case queryTypes.SET_TIME_RANGE:
      return initialState
    default: {
      return state
    }
  }
}

export default movementsReducer
