// https://docs.bitfinex.com/v2/reference#rest-auth-trades-hist
// import types from './constants'

/*
{
    "result": [
        {
            "domain": null,
            "_events": {},
            "_eventsCount": 0,
            "_fields": {
                "id": 0,
                "mts": 1,
                "amount": 2,
                "price": 3
            },
            "_boolFields": [],
            "_fieldKeys": [
                "id",
                "mts",
                "amount",
                "price"
            ],
            "id": 24172397,
            "mts": 1528147137131,
            "amount": -0.1,
            "price": 17602
        }
    ],
    "id": 5
}
 */
const initialState = {
  trades: [
    {
      id: 24172397,
      mts: 1528147137131,
      amount: -0.1,
      price: 17602,
    },
  ],
}

export function tradesReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default tradesReducer
