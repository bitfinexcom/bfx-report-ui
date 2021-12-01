import _includes from 'lodash/includes'
import _castArray from 'lodash/castArray'

import { mapCurrency } from './mapping'

export * from './mapping'

// BTCUSD -> tBTCUSD
// BTCF0:USDF0 -> tBTCF0:USDF0
// USD -> fUSD
const addPrefix = (symbol = '', isFunding = false) => (
  (isFunding || symbol.length < 6) ? `f${symbol}` : `t${symbol}`
)

const hasPrefix = pair => pair.charAt(0) === 't' || pair.charAt(0) === 'f'
export const removePrefix = pair => (hasPrefix(pair) ? pair.substr(1) : pair)

export const isFundingSymbol = symbol => symbol.length > 3 && symbol.charAt(0) === 'f'
export const isTradingPair = pair => pair.length > 6 && pair.charAt(0) === 't'

// BTCUSD -> BTC:USD
// BTCF0:USTF0 -> BTCF0:USTF0
export const formatPair = (pair) => {
  if (!pair) {
    return pair
  }

  // eslint-disable-next-line no-param-reassign
  pair = removePrefix(pair)

  if (pair.length === 6) {
    return `${pair.substr(0, 3)}:${pair.substr(3, 6)}`
  }

  return pair
}

// USD,ETC -> ['USD', 'ETC']
// USD -> ['USD']
// BTC:USD,ETH:USD -> ['BTC:USD', 'ETH:USD']
// BTC:USD -> ['BTC:USD']
// works for both symbols and pairs
export const getMappedSymbolsFromUrl = (params) => {
  if (_includes(params, ',')) {
    return params.split(',').map(mapCurrency)
  }
  return [mapCurrency(params)]
}

// ['USD'] -> USD
// ['USD 'ETC'] -> USD,ETC
export const getSymbolsURL = (symbols) => {
  if (Array.isArray(symbols) && symbols.length) {
    if (symbols.length === 1) {
      return symbols[0]
    }
    return symbols.join(',')
  }
  return ''
}

// BTC:USD -> BTCUSD
// BTCF0:USTF0 -> BTCF0:USTF0
const deformatPair = pair => ((pair.length === 7) ? pair.replace(':', '') : pair)

// BTCUSD -> tBTCUSD
// ['BTCUSD'] -> 'tBTCUSD'
// ['BTCUSD', 'ETHUSD'] -> ['tBTCUSD', 'tETHUSD']
// USD -> fUSD
// ['USD'] -> 'fUSD'
// ['USD', 'BTC'] -> ['fUSD', 'fBTC']
export const formatRawSymbols = (symbols, isFunding) => {
  const symbolsArray = _castArray(symbols)
    .map(deformatPair)
    .map((symbol) => addPrefix(symbol, isFunding))

  return symbolsArray.length > 1
    ? symbolsArray
    : symbolsArray[0]
}

export default {
  formatPair,
  formatRawSymbols,
  getMappedSymbolsFromUrl,
  getSymbolsURL,
  isFundingSymbol,
  isTradingPair,
  removePrefix,
}
