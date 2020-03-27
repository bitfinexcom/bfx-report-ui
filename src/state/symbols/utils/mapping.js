import _includes from 'lodash/includes'
import _castArray from 'lodash/castArray'

import symbolMap from '../map'

// BAB -> BCH
export const mapSymbol = symbol => symbolMap[symbol] || symbol

// BAB:USD -> BCH:USD
export const mapPair = pair => pair.split(':').map(mapSymbol).join(':')

// automatic mapping
export const mapCurrency = currency => (_includes(currency, ':') ? mapPair(currency) : mapSymbol(currency))

// 'BAB from wallet exchange' -> 'BCH from wallet exchange'
export const mapDescription = (description) => {
  const mapKeys = Object.keys(symbolMap)
  return mapKeys.reduce((desc, symbol) => desc.replace(new RegExp(symbol, 'g'), symbolMap[symbol]), description)
}

// [BCH, USD] -> [BAB, USD]
export const demapSymbols = (symbols, returnString = false) => {
  const mapKeys = Object.keys(symbolMap)
  const mappedSymbols = _castArray(symbols).map((symbol) => {
    const key = mapKeys.find(k => symbolMap[k] === symbol)
    if (key) {
      return key
    }
    return symbol
  })

  return returnString
    ? mappedSymbols[0]
    : mappedSymbols
}

// [BCH:USD] -> [BAB:USD]
export const demapPairs = (pairs, returnString = false) => {
  const mappedPairs = _castArray(pairs).map(pair => demapSymbols(pair.split(':')).join(':'))

  return returnString
    ? mappedPairs[0]
    : mappedPairs
}

// [CNHt] -> [CNHT]
// [BCH] -> [BAB, BCH]
// [BCH], true -> BAB
export const mapRequestSymbols = (symbols, returnString = false) => {
  const demapped = demapSymbols(symbols)

  return returnString
    ? demapped[0]
    : demapped
}

// [BCHUSD] -> [BABUSD]
/**
 * Demaps pairs
 * @param {Object[]|string} pairs data for demapping
 * @param {boolean} returnString if a single string should be a returned value or an array
 */
export const mapRequestPairs = (pairs, returnString = false) => {
  const demapped = demapPairs(pairs)

  return returnString
    ? demapped[0]
    : demapped
}

export default {
  mapSymbol,
  mapPair,
  mapCurrency,
  mapDescription,
  demapSymbols,
  demapPairs,
  mapRequestSymbols,
  mapRequestPairs,
}
