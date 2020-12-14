import authTypes from 'state/auth/constants'
import { formatPair, mapPair, mapSymbol } from 'state/symbols/utils'

import SymbolMap from './map'
import types from './constants'

const initialState = {
  coins: [], // symbol
  currencies: {}, // full name
  explorers: {}, // symbol explorer
  inactiveCurrencies: [],
  inactivePairs: [],
  isFetched: false,
  pairs: [], // pair
}

export function symbolsReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.UPDATE_SYMBOLS: {
      const {
        currencies = [],
        inactiveCurrencies = [],
        inactiveSymbols = [],
        mapSymbols = [],
        pairs = [],
      } = payload

      const coins = []
      const dict = {}
      const explorersDict = {}
      const symbolMapping = {}

      currencies.forEach((currency) => {
        const { id, explorer, name } = currency
        let { symbol } = currency

        if (symbol && id !== symbol) {
          if (id.includes('F0')) {
            symbol = `${symbol} (deriv)`
          }
          symbolMapping[id] = symbol
          explorersDict[symbol] = explorer
          dict[symbol] = name
          coins.push(symbol)
          return
        }

        explorersDict[id] = explorer
        dict[id] = name
        coins.push(id)
      })

      const pairMapping = mapSymbols.reduce((acc, symbol) => {
        const [from, to] = symbol
        acc[from] = to
        return acc
      }, {})

      SymbolMap.setSymbols(symbolMapping)
      SymbolMap.setPairs(pairMapping)

      const formattedInactiveCurrencies = inactiveCurrencies.map(mapSymbol).sort()
      const formattedPairs = pairs.map(formatPair).map(mapPair).sort()
      const formattedInactivePairs = inactiveSymbols.map(formatPair).map(mapPair).sort()

      return {
        ...state,
        coins: coins.sort(),
        currencies: dict,
        explorers: explorersDict,
        inactiveCurrencies: formattedInactiveCurrencies,
        inactivePairs: formattedInactivePairs,
        isFetched: true,
        pairs: formattedPairs,
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
