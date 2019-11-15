import {
  formatInternalSymbol,
  formatSymbolToPair,
  formatPair,
  parsePairTag,
  getPairsFromUrlParam,
  getSymbolsURL,
  getSymbolsFromUrlParam,
  formatRawSymbols,
} from '../utils'

describe('pair convertion', () => {
  it('formatInternalSymbol tBTCUSD -> BTCUSD', () => {
    expect(formatInternalSymbol('tBTCUSD')).toEqual('BTCUSD')
  })

  it('formatInternalSymbol tETHUSD -> ETHUSD', () => {
    expect(formatInternalSymbol('tETHUSD')).toEqual('ETHUSD')
  })

  it('formatInternalSymbol fUSD -> USD', () => {
    expect(formatInternalSymbol('fUSD')).toEqual('USD')
  })

  it('formatSymbolToPair tBTCUSD -> BTC/USD', () => {
    expect(formatSymbolToPair('tBTCUSD')).toEqual('BTC/USD')
  })

  it('formatSymbolToPair tETHUSD -> ETH/USD', () => {
    expect(formatSymbolToPair('tETHUSD')).toEqual('ETH/USD')
  })

  it('formatPair BTCUSD -> BTC/USD', () => {
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

  it('parsePairTag BTC/USD -> BTCUSD', () => {
    expect(parsePairTag('BTC/USD')).toEqual('BTCUSD')
  })

  it('parsePairTag ETH/USD -> ETHUSD', () => {
    expect(parsePairTag('ETH/USD')).toEqual('ETHUSD')
  })

  it('getPairsFromUrlParam BTCUSD,ETHUSD -> [\'BTCUSD\', \'ETHUSD\']', () => {
    expect(getPairsFromUrlParam('btcusd,ethusd')).toEqual(['BTCUSD', 'ETHUSD'])
    expect(getPairsFromUrlParam('BTCUSD,ethusd')).toEqual(['BTCUSD', 'ETHUSD'])
    expect(getPairsFromUrlParam('BTCUSD,ETHUSD')).toEqual(['BTCUSD', 'ETHUSD'])
  })

  it('getPairsFromUrlParam btcusd -> [\'BTCUSD\']', () => {
    expect(getPairsFromUrlParam('btcusd')).toEqual(['BTCUSD'])
    expect(getPairsFromUrlParam('BTCUSD')).toEqual(['BTCUSD'])
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

  it('formatRawSymbols trxusd -> tTRXUSD', () => {
    expect(formatRawSymbols('trxusd')).toEqual('tTRXUSD')
    expect(formatRawSymbols('TRXUSD')).toEqual('tTRXUSD')
  })

  it('formatRawSymbols funusd -> tFUNUSD', () => {
    expect(formatRawSymbols('funusd')).toEqual('tFUNUSD')
    expect(formatRawSymbols('FUNUSD')).toEqual('tFUNUSD')
  })

  it('formatRawSymbols [\'btcusd\'] -> tBTCUSD', () => {
    expect(formatRawSymbols(['btcusd'])).toEqual('tBTCUSD')
    expect(formatRawSymbols(['BTCUSD'])).toEqual('tBTCUSD')
  })

  it('formatRawSymbols [\'trxusd\'] -> tTRXUSD', () => {
    expect(formatRawSymbols(['trxusd'])).toEqual('tTRXUSD')
    expect(formatRawSymbols(['TRXUSD'])).toEqual('tTRXUSD')
  })

  it('formatRawSymbols [\'btcusd\', \'ethusd\'] -> [\'tBTCUSD\', \'tETHUSD\']', () => {
    expect(formatRawSymbols(['btcusd', 'ethusd'])).toEqual(['tBTCUSD', 'tETHUSD'])
    expect(formatRawSymbols(['BTCUSD', 'ethusd'])).toEqual(['tBTCUSD', 'tETHUSD'])
    expect(formatRawSymbols(['BTCUSD', 'ETHUSD'])).toEqual(['tBTCUSD', 'tETHUSD'])
  })

  it('formatRawSymbols [\'trxusd\', \'funusd\'] -> [\'tTRXUSD\', \'tFUNUSD\']', () => {
    expect(formatRawSymbols(['trxusd', 'funusd'])).toEqual(['tTRXUSD', 'tFUNUSD'])
    expect(formatRawSymbols(['TRXUSD', 'funusd'])).toEqual(['tTRXUSD', 'tFUNUSD'])
    expect(formatRawSymbols(['TRXUSD', 'FUNUSD'])).toEqual(['tTRXUSD', 'tFUNUSD'])
  })

  it('formatRawSymbols USD -> fUSD', () => {
    expect(formatRawSymbols('USD')).toEqual('fUSD')
  })

  it('formatRawSymbols TRX -> fTRX', () => {
    expect(formatRawSymbols('TRX')).toEqual('fTRX')
  })

  it('formatRawSymbols FUN -> fFUN', () => {
    expect(formatRawSymbols('FUN')).toEqual('fFUN')
  })

  it('formatRawSymbols [\'USD\'] -> fUSD', () => {
    expect(formatRawSymbols(['USD'])).toEqual('fUSD')
  })

  it('formatRawSymbols [\'USD\', \'BTC\'] -> [\'fUSD\', \'fBTC\']', () => {
    expect(formatRawSymbols(['USD', 'BTC'])).toEqual(['fUSD', 'fBTC'])
  })
})
