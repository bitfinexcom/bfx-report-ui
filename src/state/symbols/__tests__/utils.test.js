import {
  formatInternalPair,
  formatSymbolToPair,
  formatPair,
  parsePairTag,
  getPairsFromUrlParam,
  getSymbolsURL,
  getSymbolsFromUrlParam,
  formatRawSymbols,
} from '../utils'

describe('pair convertion', () => {
  it('formatInternalPair tBTCUSD -> btcusd', () => {
    expect(formatInternalPair('tBTCUSD')).toEqual('btcusd')
  })

  it('formatInternalPair tETHUSD -> ethusd', () => {
    expect(formatInternalPair('tETHUSD')).toEqual('ethusd')
  })

  it('formatSymbolToPair tBTCUSD -> BTC/USD', () => {
    expect(formatSymbolToPair('tBTCUSD')).toEqual('BTC/USD')
  })

  it('formatSymbolToPair tETHUSD -> ETH/USD', () => {
    expect(formatSymbolToPair('tETHUSD')).toEqual('ETH/USD')
  })

  it('formatPair btcusd -> BTC/USD', () => {
    expect(formatPair('btcusd')).toEqual('BTC/USD')
    expect(formatPair('BTCUSD')).toEqual('BTC/USD')
  })

  it('formatPair ethusd -> ETH/USD', () => {
    expect(formatPair('ethusd')).toEqual('ETH/USD')
  })

  it('formatPair trxusd -> TRX/USD', () => {
    expect(formatPair('trxusd')).toEqual('TRX/USD')
  })

  it('formatPair trxbtc -> TRX/BTC', () => {
    expect(formatPair('trxbtc')).toEqual('TRX/BTC')
  })

  it('formatPair tknusd -> TKN/USD', () => {
    expect(formatPair('tknusd')).toEqual('TKN/USD')
  })

  it('formatPair ALL -> ALL', () => {
    expect(formatPair('ALL')).toEqual('ALL')
  })

  it('parsePairTag BTC/USD -> btcusd', () => {
    expect(parsePairTag('BTC/USD')).toEqual('btcusd')
  })

  it('parsePairTag ETH/USD -> ethusd', () => {
    expect(parsePairTag('ETH/USD')).toEqual('ethusd')
  })

  it('getPairsFromUrlParam BTCUSD,ETHUSD -> [\'btcusd\', \'etcusd\']', () => {
    expect(getPairsFromUrlParam('btcusd,ethusd')).toEqual(['btcusd', 'ethusd'])
    expect(getPairsFromUrlParam('BTCUSD,ethusd')).toEqual(['btcusd', 'ethusd'])
    expect(getPairsFromUrlParam('BTCUSD,ETHUSD')).toEqual(['btcusd', 'ethusd'])
  })

  it('getPairsFromUrlParam btcusd -> [\'btcusd\']', () => {
    expect(getPairsFromUrlParam('btcusd')).toEqual(['btcusd'])
    expect(getPairsFromUrlParam('BTCUSD')).toEqual(['btcusd'])
  })
})

describe('symbol convertion', () => {
  it('getSymbolsURL [\'usd\', \'etc\'] -> USD,ETC', () => {
    expect(getSymbolsURL(['usd', 'etc'])).toEqual('USD,ETC')
    expect(getSymbolsURL(['USD', 'etc'])).toEqual('USD,ETC')
    expect(getSymbolsURL(['USD', 'ETC'])).toEqual('USD,ETC')
  })

  it('getSymbolsURL [\'usd\'] -> USD', () => {
    expect(getSymbolsURL(['usd'])).toEqual('USD')
    expect(getSymbolsURL(['USD'])).toEqual('USD')
  })

  it('getSymbolsFromUrlParam USD,ETC -> [\'USD\', \'ETC\']', () => {
    expect(getSymbolsFromUrlParam('USD,ETC')).toEqual(['USD', 'ETC'])
    expect(getSymbolsFromUrlParam('usd,etc')).toEqual(['USD', 'ETC'])
  })

  it('getSymbolsFromUrlParam USD -> [\'USD\']', () => {
    expect(getSymbolsFromUrlParam('USD')).toEqual(['USD'])
    expect(getSymbolsFromUrlParam('usd')).toEqual(['USD'])
  })
})

describe('trading/funding symbols convertion', () => {
  it('formatRawSymbols btcusd -> tBTCUSD', () => {
    expect(formatRawSymbols('btcusd')).toEqual('tBTCUSD')
    expect(formatRawSymbols('BTCUSD')).toEqual('tBTCUSD')
  })

  it('formatRawSymbols [\'btcusd\'] -> tBTCUSD', () => {
    expect(formatRawSymbols(['btcusd'])).toEqual('tBTCUSD')
    expect(formatRawSymbols(['BTCUSD'])).toEqual('tBTCUSD')
  })

  it('formatRawSymbols [\'btcusd\', \'ethusd\'] -> [\'tBTCUSD\', \'tETHUSD\']', () => {
    expect(formatRawSymbols(['btcusd', 'ethusd'])).toEqual(['tBTCUSD', 'tETHUSD'])
    expect(formatRawSymbols(['BTCUSD', 'ethusd'])).toEqual(['tBTCUSD', 'tETHUSD'])
    expect(formatRawSymbols(['BTCUSD', 'ETHUSD'])).toEqual(['tBTCUSD', 'tETHUSD'])
  })

  it('formatRawSymbols USD -> fUSD', () => {
    expect(formatRawSymbols('USD')).toEqual('fUSD')
  })

  it('formatRawSymbols [\'USD\'] -> fUSD', () => {
    expect(formatRawSymbols(['USD'])).toEqual('fUSD')
  })

  it('formatRawSymbols [\'USD\', \'BTC\'] -> [\'fUSD\', \'fBTC\']', () => {
    expect(formatRawSymbols(['USD', 'BTC'])).toEqual(['fUSD', 'fBTC'])
  })
})
