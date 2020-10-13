import authTypes from 'state/auth/constants'
import { formatPair, mapPair } from 'state/symbols/utils'

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
      const { currencies, inactiveSymbols, pairs } = payload
      const coins = []
      const dict = {}
      const explorersDict = {}
      const symbolMapping = {}

      currencies.forEach((currency) => {
        const { id, explorer } = currency
        let { name, symbol } = currency

        if (id === 'BCH') {
          name = 'Bitcoin Cash (Pre Fork)'
          symbol = 'pBCH'
        }

        if (id.includes('F0')) {
          const [perpSymbol] = id.split('F0')
          const formattedPerpSymbol = `${perpSymbol}-PERP`
          name = formattedPerpSymbol
          symbol = formattedPerpSymbol
        }

        if (symbol && id !== symbol) {
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
      setSymbolMap(symbolMapping)

      const formattedPairs = [...pairs, ...inactiveSymbols].map(formatPair).map(mapPair).sort()

      return {
        ...state,
        isFetched: true,
        coins: coins.sort(),
        currencies: dict,
        explorers: explorersDict,
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
