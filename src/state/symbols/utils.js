import _castArray from 'lodash/castArray'
import _includes from 'lodash/includes'

import symbolMap from './map'

const table = {
  IOTA: 'IOT',
  DATA: 'DAT',
  DASH: 'DSH',
  QTUM: 'QTM',
  QASH: 'QSH',
  YOYO: 'YYW',
  YOYOW: 'YYW',
}

function toRegularPair(symbol) {
  return table[symbol] || symbol.slice(0, 3)
}

const SKIP_PARSING_PAIRS = [
  'BTCF0:USTF0',
  'BTCF0:USTF0',
  'DUSK:BTC',
  'DUSK:USD',
]

const parseSymbol = (symbol) => {
  if (!symbol.includes(':') || _includes(SKIP_PARSING_PAIRS, symbol)) {
    return symbol.toUpperCase()
  }

  return symbol.split(':')
    .map(p => toRegularPair(p))
    .join()
    .toUpperCase()
}

/**
 * Obtains a symbol from a given pair with the corresponding prefix
 * @param symbol {String}
 * @returns {String}
 *
 * ex. BTC:USD -> tBTCUSD
 * ex BTCF0:USDF0 -> tBTCF0:USDF0
 * ex. BTC:IOTA -> tBTCIOT
 * ex. USD -> fUSD
 */
export function addPrefix(symbol = '') {
  const first = symbol.charAt(0)
  // already okay
  if ((symbol.length === 4 || symbol.length === 7)
    && (first === 't' || first === 'f')) {
    return symbol
  }

  const s = parseSymbol(symbol)

  switch (s.length) {
    case 6:
    case 7:
    case 8:
    case 11:
      return `t${s}`

    case 3:
    case 4:
    case 5:
      return `f${s}`

    default:
      return s
  }
}

export function isPair(symbol = '') {
  return symbol.length > 6 && symbol.charAt(0) === 't'
}

export function isSymbol(symbol = '') {
  return symbol.length > 3 && symbol.charAt(0) === 'f'
}

/**
 * Removes the prefix from the provided symbol.
 * @param symbol {String}
 * @returns {String}
 *
 * ex. tBTCUSD -> BTCUSD
 * ex. fUSD -> USD
 */
const removePrefix = (symbol = '') => (isSymbol(symbol) || isPair(symbol)
  ? symbol.substring(1).toUpperCase()
  : symbol.toUpperCase())

const firstInPair = (pair) => {
  const spliter = pair.indexOf(':') > -1 ? ':' : '/'
  return pair.length > 6 ? pair.split(spliter)[0] : pair.substr(0, 3)
}

const lastInPair = (pair) => {
  const spliter = pair.indexOf(':') > -1 ? ':' : '/'
  return pair.length > 6 ? pair.split(spliter)[1] : pair.substr(3, 6)
}

const getSplitPair = pair => [firstInPair(pair), lastInPair(pair)]

// tBTCUSD -> BTCUSD
// fUSD -> USD
export const formatInternalSymbol = symbol => removePrefix(symbol)

// tBTCUSD -> BTC/USD
// BTCF0:USTF0 -> BTCF0/USTF0
export function formatSymbolToPair(symbol) {
  if (_includes(symbol, ':')) {
    return removePrefix(symbol).replace(':', '/')
  }

  const [first, last] = getSplitPair(removePrefix(symbol), true)
  return `${first}/${last}`
}

// BTCUSD -> BTC/USD
export function formatPair(pair) {
  if (!pair || pair === 'ALL') {
    return 'ALL'
  }
  return formatSymbolToPair(pair)
}

// BTC/USD -> BTCUSD
export function parsePairTag(tag) {
  const [first, last] = getSplitPair(tag)
  return `${first}${last}`
}

// ['usd', 'etc'] -> USD,ETC
// ['usd'] -> USD
export function getSymbolsURL(symbols) {
  if (Array.isArray(symbols) && symbols.length) {
    if (symbols.length === 1) {
      return symbols[0].toUpperCase()
    }
    return symbols.map(symbol => symbol.toUpperCase()).join(',')
  }
  return ''
}

// USD,ETC -> ['USD', 'ETC']
// USD -> ['USD']
export function getSymbolsFromUrlParam(param) {
  if (param.indexOf(',') > -1) {
    return param.split(',')
  }
  return [param.toUpperCase()]
}

// BTCUSD,ETHUSD -> ['BTCUSD', 'ETHUSD']
// BTCUSD -> ['BTCUSD']
export function getPairsFromUrlParam(param) {
  if (param.indexOf(',') > -1) {
    return param.split(',')
  }
  return [param]
}

// btcusd -> tBTCUSD
// ['btcusd'] -> 'tBTCUSD'
// ['btcusd', 'ethusd'] -> ['tBTCUSD', 'tETHUSD']
// USD -> fUSD
// ['USD'] -> 'fUSD'
// ['USD', 'BTC'] -> ['fUSD', 'fBTC']
export function formatRawSymbols(symbols) {
  const symbolsArray = _castArray(symbols).map((symbol) => {
    if (_includes(SKIP_PARSING_PAIRS, symbol)) {
      return symbol
    }
    return symbol.replace(':', '')
  }).map(symbol => addPrefix(symbol))

  return symbolsArray.length > 1
    ? symbolsArray
    : symbolsArray[0]
}

// symbol mapping

// BAB -> BCH
export const mapSymbol = currency => symbolMap[currency] || currency

// BTCUSD -> [BTC, USD]
export const splitPair = pair => [pair.slice(0, 3), pair.slice(3)]

// BABUSD -> BCHUSD
export const mapPair = pair => splitPair(pair).map(mapSymbol).join('')

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

export const mapRequestSymbols = (symbols, returnString = false) => {
  const demapped = demapSymbols(symbols)

  if (demapped.includes('BAB') && !returnString) {
    return [...demapped, 'BCH']
  }

  return returnString
    ? demapped[0]
    : demapped
}

// [BCHUSD] -> [BABUSD]
export const mapRequestPairs = (pairs, returnString = false) => {
  const demapped = demapPairs(pairs)

  const additionalPairs = []

  demapped.forEach((pair) => {
    if (pair.includes('BAB')) {
      additionalPairs.push(pair.replace('BAB', 'BCH'))
    }
  })

  if (additionalPairs.length && !returnString) {
    return [...demapped, ...additionalPairs]
  }

  return returnString
    ? demapped[0]
    : demapped
}

export default {
  formatInternalSymbol,
  formatPair,
  formatRawSymbols,
  formatSymbolToPair,
  getPairsFromUrlParam,
  getSymbolsURL,
  getSymbolsFromUrlParam,
  isPair,
  isSymbol,
  parsePairTag,
  splitPair,
  mapSymbol,
  mapPair,
  mapRequestSymbols,
  mapRequestPairs,
}
