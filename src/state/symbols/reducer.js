import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  coins: [],
  currencies: {},
  pairs: [],
}

export function symbolsReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_SYMBOLS: {
      const { currencies, pairs } = action.payload
      const dict = {}
      currencies.forEach(([id, name]) => {
        dict[id.toUpperCase()] = name
      })
      return {
        ...state,
        coins: (currencies && currencies.map(arr => arr[0].toUpperCase()).sort()) || [],
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
