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

const isFuture = symbol => symbol.toUpperCase().endsWith('F0')

const isFuturePair = (symbol) => {
  if (!symbol.includes(':')) {
    return false
  }

  const spl = symbol.split(':')

  return isFuture(spl[0]) || isFuture(spl[1])
}

const parseSymbol = (symbol) => {
  if (!symbol.includes(':') || isFuturePair(symbol)) {
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
  const sym = `${symbol}`
  const first = sym.charAt(0)
  // already okay
  if ((sym.length === 4 || sym.length === 7)
    && (first === 't' || first === 'f')) {
    return sym
  }

  const s = parseSymbol(sym)

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

const firstInPair = (pair, uppercase = true) => {
  const spliter = pair.indexOf(':') > -1 ? ':' : '/'
  const first = pair.length > 6 ? pair.split(spliter)[0] : pair.substr(0, 3)
  return uppercase ? first.toUpperCase() : first.toLowerCase()
}

const lastInPair = (pair, uppercase = true) => {
  const spliter = pair.indexOf(':') > -1 ? ':' : '/'
  const last = pair.length > 6 ? pair.split(spliter)[1] : pair.substr(3, 6)
  return uppercase ? last.toUpperCase() : last.toLowerCase()
}

const getSplitPair = (pair, uppercase = true) => [firstInPair(pair, uppercase), lastInPair(pair, uppercase)]

// tBTCUSD -> btcusd
// fUSD -> usd
export function formatInternalSymbol(symbol) {
  return removePrefix(symbol).toLowerCase()
}

// tBTCUSD -> BTC/USD
export function formatSymbolToPair(symbol) {
  const [first, last] = getSplitPair(removePrefix(symbol), true)
  return `${first}/${last}`
}

// btcusd -> BTC/USD
export function formatPair(pair) {
  if (!pair || pair === 'ALL') {
    return 'ALL'
  }
  return formatSymbolToPair(pair)
}

// BTC/USD -> btcusd
export function parsePairTag(tag) {
  const [first, last] = getSplitPair(tag, false)
  return `${first}${last}`
}

// ['usd', 'etc'] -> USD,ETC
// ['usd'] -> USD
export function getSymbolsURL(symbols) {
  if (Array.isArray(symbols) && symbols.length > 0) {
    if (symbols.length === 1) {
      return symbols[0].toUpperCase()
    }
    return symbols.map(symbol => symbol.toUpperCase()).join(',')
  }
  return ''
}

// USD,ETC -> ['USD', 'ETC']
// usd,etc -> ['USD', 'ETC']
// usd -> ['USD']
export function getSymbolsFromUrlParam(param) {
  if (param.indexOf(',') > -1) {
    return param.split(',').map(symbol => symbol.toUpperCase())
  }
  return [param.toUpperCase()]
}

// BTCUSD,ETHUSD -> ['btcusd', 'etcusd']
// btcusd,ethusd -> ['btcusd', 'ethusd']
// btcusd -> ['btcusd']
export function getPairsFromUrlParam(param) {
  if (param.indexOf(',') > -1) {
    return param.split(',').map(pair => pair.toLowerCase())
  }
  return [param.toLowerCase()]
}

// btcusd -> tBTCUSD
// ['btcusd'] -> 'tBTCUSD'
// ['btcusd', 'ethusd'] -> ['tBTCUSD', 'tETHUSD']
// USD -> fUSD
// ['USD'] -> 'fUSD'
// ['USD', 'BTC'] -> ['fUSD', 'fBTC']
export function formatRawSymbols(symbols) {
  if (Array.isArray(symbols) && symbols.length > 0) {
    if (symbols.length === 1) {
      return addPrefix(symbols[0])
    }
    return symbols.map(symbol => addPrefix(symbol))
  }
  return addPrefix(symbols)
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
}
