import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  coins: [],
  currencies: {},
  pairs: [],
}

export function symbolsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_SYMBOLS: {
      const { currencies, pairs } = payload
      const coins = []
      const dict = {}
      currencies.forEach(({ id, name }) => {
        dict[id.toUpperCase()] = name
        coins.push(id.toUpperCase())
      })
      return {
        ...state,
        coins: coins.sort(),
        currencies: dict,
        pairs: (pairs && pairs.sort()) || [],
      }
    }
    case authTypes.LOGOUT:
      return initialState
    default: {
      return state
    }
  }
}

export default symbolsReducer
