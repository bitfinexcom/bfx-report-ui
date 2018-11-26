// tBTCUSD -> btcusd
export function formatInternalPair(symbol) {
  return `${symbol.slice(1).toLowerCase()}`
}

// tBTCUSD -> BTC/USD
export function formatSymbolToPair(symbol) {
  return `${symbol.slice(1, 4)}/${symbol.slice(4, 7)}`
}

// btcusd -> BTC/USD
export function formatPair(pair) {
  if (!pair || pair === 'ALL') {
    return 'ALL'
  }
  return `${pair.slice(0, 3).toUpperCase()}/${pair.slice(3, 6).toUpperCase()}`
}

// ['usd', 'etc'] -> USD,ETC
export function getSymbolsURL(symbols) {
  if (Array.isArray(symbols) && symbols.length > 0) {
    if (symbols.length === 1) {
      return symbols[0].toUpperCase()
    }
    return symbols.map(symbol => symbol.toUpperCase()).join(',')
  }
  return ''
}

// USD,ETC -> ['usd', 'etc']
// usd,etc -> ['usd', 'etc']
// usd -> ['usd']
export function getSymbolsFromUrlParam(param) {
  if (param.indexOf(',') > -1) {
    return param.split(',').map(symbol => symbol.toUpperCase())
  }
  return [param.toUpperCase()]
}

// btcusd -> tBTCUSD
export function formatRawPairToTPair(pair) {
  return `t${pair.toUpperCase()}`
}

// USD -> fUSD
export function formatRawSymbolToFSymbol(symbol) {
  return `f${symbol.toUpperCase()}`
}

export default {
  formatInternalPair,
  formatPair,
  formatRawPairToTPair,
  formatRawSymbolToFSymbol,
  formatSymbolToPair,
  getSymbolsURL,
  getSymbolsFromUrlParam,
}
