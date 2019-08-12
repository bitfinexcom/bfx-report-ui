import _castArray from 'lodash/castArray'

import authTypes from 'state/auth/constants'
import { formatSymbolToPair, mapPair } from 'state/symbols/utils'

import types from './constants'
import { setSymbolMap } from './map'

const initialState = {
  isFetched: false,
  coins: [], // symbol
  currencies: {}, // full name
  explorers: {}, // symbol explorer
  pairs: [], // pair
}

export function symbolsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_SYMBOLS: {
      const { currencies, pairs } = payload
      const coins = []
      const dict = {}
      const explorersDict = {}
      const symbolMapping = {}
      currencies.forEach((currency) => {
        const {
          id, name, explorer, symbol,
        } = currency
        const cid = id.toUpperCase()
        if (id === 'BAB') { // skip duplicate BAB/BCH
          symbolMapping[cid] = 'BCH'
          return
        }
        if (symbol && id !== symbol) {
          symbolMapping[cid] = symbol
          explorersDict[symbol] = explorer
          dict[symbol] = name
          coins.push(symbol)
          return
        }
        explorersDict[cid] = explorer
        dict[cid] = name
        coins.push(cid)
      })
      setSymbolMap(symbolMapping)

      const formattedPairs = pairs.map(formatSymbolToPair)
      return {
        ...state,
        isFetched: true,
        coins: coins.sort(),
        currencies: dict,
        explorers: explorersDict,
        pairs: _castArray(formattedPairs).map(mapPair).sort(),
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
