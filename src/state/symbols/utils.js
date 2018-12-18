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

/**
 * Obtains a symbol from a given pair with the corresponding prefix
 * @param symbol {String}
 * @returns {String}
 *
 * ex. BTCUSD -> tBTCUSD
 * ex. BTC:IOTA -> tBTCIOT
 * ex. USD -> fUSD
 */
export function addPrefix(symbol = '') {
  const sym = `${symbol}`
  const first = sym.charAt(0)
  // already okay
  if (first === 't' || first === 'f') {
    return sym
  }
  // pretty pair ex. BTC:IOTA
  const s = (sym.indexOf(':') > -1)
    ? sym
      .split(':')
      .map(p => toRegularPair(p))
      .join()
      .toUpperCase()
    : sym.toUpperCase()

  switch (s.length) {
    case 6:
    case 7:
    case 8:
      return `t${s}`

    case 3:
    case 4:
      return `f${s}`

    default:
      return s
  }
}

/**
 * Removes the prefix from the provided symbol.
 * @param symbol {String}
 * @returns {String}
 *
 * ex. tBTCUSD -> BTCUSD
 * ex. fUSD -> USD
 */
const removePrefix = (symbol = '') => {
  const s = symbol.charAt(0)
  return (s === 't' || s === 'f')
    ? symbol.substring(1).toUpperCase()
    : symbol.toUpperCase()
}

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
export function formatInternalPair(symbol) {
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
  formatInternalPair,
  formatPair,
  formatRawSymbols,
  formatSymbolToPair,
  getPairsFromUrlParam,
  getSymbolsURL,
  getSymbolsFromUrlParam,
  parsePairTag,
}
