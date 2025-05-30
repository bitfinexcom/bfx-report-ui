import authTypes from 'state/auth/constants'
import {
  formatPair, mapPair, mapSymbol, isTestSymbol,
} from 'state/symbols/utils'
import _map from 'lodash/map'
import _join from 'lodash/join'
import _split from 'lodash/split'
import _reduce from 'lodash/reduce'
import _replace from 'lodash/replace'
import _includes from 'lodash/includes'

import SymbolMap from './map'
import types, { EXTENDED_CCY_LIST } from './constants'

const initialState = {
  coins: [], // symbol
  currencies: {}, // full name
  explorers: {}, // symbol explorer
  inactiveCurrencies: [],
  inactivePairs: [],
  isFetched: false,
  pairs: [], // pair
  fundingCoins: [],
  tetherNames: {},
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
      const fundingCoins = []
      const dict = {}
      const explorersDict = {}
      const symbolMapping = {}
      const tetherNames = {}

      currencies.forEach((currency) => {
        const {
          id, explorer, name, isInPair, isFunding,
        } = currency

        let { symbol } = currency

        if (symbol === 'USDt' || _includes(symbol, 'USDT')) {
          tetherNames[id] = name
        }

        if (!EXTENDED_CCY_LIST.includes(id) && !isInPair) {
          return
        }

        if (symbol && id !== symbol) {
          if (id.includes('TEST')) {
            symbol = `${symbol} (Test)`
          }
          if (id.includes('F0')) {
            symbol = `${symbol} (deriv)`
          }

          symbolMapping[id] = symbol
          explorersDict[symbol] = explorer
          dict[symbol] = name
          coins.push(symbol)
          if (isFunding) fundingCoins.push(symbol)
        } else if (_includes(symbol, 'F0')) {
          symbol = _replace(symbol, 'F0', ' (deriv)')
          symbolMapping[id] = symbol
          explorersDict[symbol] = explorer
          dict[symbol] = name
          coins.push(symbol)
        } else {
          explorersDict[id] = explorer
          dict[id] = name
          coins.push(id)
          if (isFunding) fundingCoins.push(id)
        }
      })

      const preparedCoins = [...new Set(coins)].sort()

      const preparedMapSymbols = _map(mapSymbols, item => {
        const [itemId, itemName] = item
        if (_includes(itemId, 'TEST')) return [itemId, `${itemName} (Test)`]
        return item
      })

      const pairMapping = _reduce(preparedMapSymbols, (acc, symbol) => {
        const [from, to] = symbol
        acc[from] = to
        return acc
      }, {})

      SymbolMap.setSymbols(symbolMapping)
      SymbolMap.setPairs(pairMapping)

      const formattedInactiveCurrencies = inactiveCurrencies.map(mapSymbol).sort()
      const formattedPairs = pairs.map(formatPair).map(mapPair).sort()
      const formattedInactivePairs = inactiveSymbols.map(formatPair).map(mapPair).sort()

      const preparedPairs = _map(formattedPairs, pair => {
        const [firstSymbol, secondSymbol] = _split(pair, ':')
        if (isTestSymbol(firstSymbol) && isTestSymbol(secondSymbol)) {
          return _join([_replace(firstSymbol, ' (Test)', ''), secondSymbol], ':')
        }
        return pair
      })

      return {
        ...state,
        coins: preparedCoins,
        currencies: dict,
        explorers: explorersDict,
        inactiveCurrencies: formattedInactiveCurrencies,
        inactivePairs: formattedInactivePairs,
        isFetched: true,
        pairs: preparedPairs,
        fundingCoins,
        tetherNames,
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
