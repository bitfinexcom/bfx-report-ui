// https://docs.bitfinex.com/v2/reference#rest-auth-trades-hist
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
}

export function tradesReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_TRADES: {
      const result = action.payload
      const entries = result.map(entry => ({
        id: entry.id,
        pair: `${entry.pair.slice(1, 4)}/${entry.pair.slice(4, 7)}`,
        mtsCreate: entry.mtsCreate,
        orderID: entry.orderID,
        execAmount: entry.execAmount,
        execPrice: entry.execPrice,
        orderType: entry.orderType,
        orderPrice: entry.orderPrice,
        maker: entry.maker,
        fee: parseFloat(entry.fee) < 0 ? parseFloat(entry.fee) * -1 : entry.fee,
        feeCurrency: entry.feeCurrency,
      }))
      return {
        ...state,
        entries,
      }
    }
    default: {
      return state
    }
  }
}

export default tradesReducer
