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
}
