import authTypes from 'state/auth/constants'

import types from './constants'

const initialState = {
  coins: [],
  currencies: {},
  explorers: {},
  pairs: [],
}

export function symbolsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_SYMBOLS: {
      const { currencies, pairs } = payload
      const coins = []
      const dict = {}
      const explorersDict = {}
      currencies.forEach(({ id, name, explorer }) => {
        const cid = id.toUpperCase()
        dict[cid] = name
        explorersDict[cid] = explorer
        coins.push(cid)
      })
      return {
        ...state,
        coins: coins.sort(),
        currencies: dict,
        explorers: explorersDict,
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
