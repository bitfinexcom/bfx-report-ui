// https://docs.bitfinex.com/v2/reference#ledgers
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
}

export function ledgersReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_LEDGERS: {
      const result = action.payload
      const entries = result.map(entry => ({
        id: entry.id,
        currency: entry.currency,
        mts: entry.mts,
        amount: entry.amount,
        balance: entry.balance,
        description: entry.description,
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

export default ledgersReducer
