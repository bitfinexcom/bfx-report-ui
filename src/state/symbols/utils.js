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

// BTC/USD -> btcusd
export function parsePairTag(tag) {
  return tag.split('/').join('').toLowerCase()
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
export function formatRawPairToTPair(pairs) {
  if (Array.isArray(pairs) && pairs.length > 0) {
    if (pairs.length === 1) {
      return `t${pairs[0].toUpperCase()}`
    }
    return pairs.map(pair => `t${pair.toUpperCase()}`)
  }
  return `t${pairs.toUpperCase()}`
}

// USD -> fUSD
// ['USD'] -> 'fUSD'
// ['USD', 'BTC'] -> ['fUSD', 'fBTC']
export function formatRawSymbolToFSymbol(symbols) {
  if (Array.isArray(symbols) && symbols.length > 0) {
    if (symbols.length === 1) {
      return `f${symbols[0].toUpperCase()}`
    }
    return symbols.map(symbol => `f${symbol.toUpperCase()}`)
  }
  return `f${symbols.toUpperCase()}`
}

export default {
  formatInternalPair,
  formatPair,
  formatRawPairToTPair,
  formatRawSymbolToFSymbol,
  formatSymbolToPair,
  getPairsFromUrlParam,
  getSymbolsURL,
  getSymbolsFromUrlParam,
  parsePairTag,
}
