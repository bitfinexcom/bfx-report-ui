import authTypes from 'state/auth/constants'
import { formatPair, mapPair, mapSymbol } from 'state/symbols/utils'
import _filter from 'lodash/filter'
import _reduce from 'lodash/reduce'
import _includes from 'lodash/includes'

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

const isTestAccount = false

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

      const preparedCurrencies = isTestAccount
        ? _filter(currencies, item => _includes(item?.id, 'TEST'))
        : _filter(currencies, item => !_includes(item?.id, 'TEST'))

      preparedCurrencies.forEach((currency) => {
        const { id, explorer, name } = currency
        let { symbol } = currency

        if (symbol && id !== symbol) {
          if (id.includes('F0')) {
            symbol = `${symbol} (deriv)`
          }
          if (symbol === 'USDt') {
            symbolMapping.UST = symbol
          } else {
            symbolMapping[id] = symbol
          }

          explorersDict[symbol] = explorer
          dict[symbol] = name
          coins.push(symbol)
          return
        }

        explorersDict[id] = explorer
        dict[id] = name
        coins.push(id)
      })

      const preparedCoins = [...new Set(coins)].sort()

      const preparedMapSymbols = isTestAccount
        ? _filter(mapSymbols, item => _includes(item?.[0], 'TEST'))
        : _filter(mapSymbols, item => !_includes(item?.[0], 'TEST'))

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

      const preparedPairs = isTestAccount
        ? _filter(formattedPairs, item => _includes(item, 'TEST'))
        : _filter(formattedPairs, item => !_includes(item, 'TEST'))

      return {
        ...state,
        coins: preparedCoins,
        currencies: dict,
        explorers: explorersDict,
        inactiveCurrencies: formattedInactiveCurrencies,
        inactivePairs: formattedInactivePairs,
        isFetched: true,
        pairs: preparedPairs,
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
