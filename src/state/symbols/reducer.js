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
import types from './constants'

const initialState = {
  coins: [], // symbol
  currencies: {}, // full name
  explorers: {}, // symbol explorer
  inactiveCurrencies: [],
  inactivePairs: [],
  isFetched: false,
  pairs: [], // pair
  fundingCoins: [],
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
        marginCurrencyList = [],
      } = payload

      const coins = []
      const fundingCoins = []
      const dict = {}
      const explorersDict = {}
      const symbolMapping = {}

      console.log('+++currencies', currencies)

      currencies.forEach((currency) => {
        const {
          id, explorer, name, isInPair, isFunding,
        } = currency
        if (!isInPair) return

        let { symbol } = currency

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
          return
        }

        explorersDict[id] = explorer
        dict[id] = name
        coins.push(id)
        if (isFunding) fundingCoins.push(id)
      })

      // console.log('+++symbolMapping', symbolMapping)
      // console.log('+++fundingCoins', fundingCoins)

      const preparedCoins = [...new Set(coins)].sort()

      console.log('+++coins', coins)
      console.log('+++preparedCoins', preparedCoins)

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
