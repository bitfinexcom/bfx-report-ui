import _includes from 'lodash/includes'
import _castArray from 'lodash/castArray'

import SymbolMap from '../map'

// BAB -> BCH
export const mapSymbol = symbol => SymbolMap.symbols[symbol] || symbol

// ETHF0:BTCF0: "ETH:BTC-PERP
// BAB:USD -> BCH:USD
export const mapPair = (pair) => {
  if (SymbolMap.pairs[pair]) {
    return SymbolMap.pairs[pair]
  }
  return pair.split(':').map(mapSymbol).join(':')
}

// automatic mapping
export const mapCurrency = currency => (_includes(currency, ':') ? mapPair(currency) : mapSymbol(currency))

// 'BAB from wallet exchange' -> 'BCH from wallet exchange'
// Prevent changing words that have the symbols in them as to do that
// only change the beginning/end of a word, consider that pair might be in ()
export const mapDescription = (description) => {
  const pairMapKeys = Object.keys(SymbolMap.pairs)
  const symbolMapKeys = Object.keys(SymbolMap.symbols)
  const descPairsMapped = pairMapKeys
    .reduce((desc, symbol) => desc.replace(new RegExp(symbol, 'g'), SymbolMap.pairs[symbol]), description)
  return symbolMapKeys.reduce((desc, symbol) => desc.replace(
    new RegExp(
      `^${symbol}|${symbol}$|${symbol}[ ]|[ ]${symbol}|${symbol}[)]|[(]${symbol}`,
      'g',
    ),
    (str) => str.replace(new RegExp(symbol, 'g'), SymbolMap.symbols[symbol]),
  ), descPairsMapped)
}

// [BCH, USD] -> [BAB, USD]
export const demapSymbols = (symbols, returnString = false) => {
  const mappedSymbols = _castArray(symbols).map((symbol) => {
    if (SymbolMap.symbolsDemap[symbol]) {
      return SymbolMap.symbolsDemap[symbol]
    }
    return symbol
  })

  return returnString
    ? mappedSymbols[0]
    : mappedSymbols
}

// [BCH:USD] -> [BAB:USD]
export const demapPairs = (pairs, returnString = false) => {
  const mappedPairs = _castArray(pairs).map((pair) => {
    if (SymbolMap.pairsDemap[pair]) {
      return SymbolMap.pairsDemap[pair]
    }
    return demapSymbols(pair.split(':')).join(':')
  })

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
