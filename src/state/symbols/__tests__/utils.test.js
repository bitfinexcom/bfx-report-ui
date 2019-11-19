import {
  formatPair,
  formatRawSymbols,
  getMappedSymbolsFromUrl,
  getSymbolsURL,
  isFundingSymbol,
  isTradingPair,
  removePrefix,
} from '../utils'

describe('formatPair', () => {
  it('BTCUSD -> BTC:USD', () => {
    expect(formatPair('BTCUSD')).toEqual('BTC:USD')
  })

  it('BTCF0:USTF0 -> BTCF0:USTF0', () => {
    expect(formatPair('BTCF0:USTF0')).toEqual('BTCF0:USTF0')
  })

  it('tBTCUSD -> BTC:USD', () => {
    expect(formatPair('tBTCUSD')).toEqual('BTC:USD')
  })
})

describe('formatRawSymbols', () => {
  it('BTCUSD -> tBTCUSD', () => {
    expect(formatRawSymbols('BTCUSD')).toEqual('tBTCUSD')
  })

  it('[BTCUSD] -> tBTCUSD', () => {
    expect(formatRawSymbols(['BTCUSD'])).toEqual('tBTCUSD')
  })

  it('[BTCUSD, ETHUSD] -> [tBTCUSD, tETHUSD]', () => {
    expect(formatRawSymbols(['BTCUSD', 'ETHUSD'])).toEqual(['tBTCUSD', 'tETHUSD'])
  })

  it('USD -> fUSD', () => {
    expect(formatRawSymbols(['USD'])).toEqual('fUSD')
  })

  it('[USD] -> fUSD', () => {
    expect(formatRawSymbols(['USD'])).toEqual('fUSD')
  })

  it('[USD, BTC] -> [fUSD, fBTC]', () => {
    expect(formatRawSymbols(['USD', 'BTC'])).toEqual(['fUSD', 'fBTC'])
  })
})

describe('getMappedSymbolsFromUrl', () => {
  it('USD,ETC -> [USD, ETC]', () => {
    expect(getMappedSymbolsFromUrl('USD,ETC')).toEqual(['USD', 'ETC'])
  })

  it('USD -> [USD]', () => {
    expect(getMappedSymbolsFromUrl('USD')).toEqual(['USD'])
  })

  it('BTC:USD,ETH:USD -> [BTC:USD, ETH:USD]', () => {
    expect(getMappedSymbolsFromUrl('BTC:USD,ETH:USD')).toEqual(['BTC:USD', 'ETH:USD'])
  })

  it('BTC:USD -> [BTC:USD]', () => {
    expect(getMappedSymbolsFromUrl('BTC:USD')).toEqual(['BTC:USD'])
  })
})

describe('getSymbolsURL', () => {
  it('[USD] -> USD', () => {
    expect(getSymbolsURL(['USD'])).toEqual('USD')
  })

  it('[USD, ETC] -> USD,ETC', () => {
    expect(getSymbolsURL(['USD', 'ETC'])).toEqual('USD,ETC')
  })

  it('empty input', () => {
    expect(getSymbolsURL()).toEqual('')
  })
})

describe('isFundingSymbol', () => {
  it('fUSD', () => {
    expect(isFundingSymbol('fUSD')).toEqual(true)
  })
})

describe('isTradingPair', () => {
  it('tBTCUSD', () => {
    expect(isTradingPair('tBTCUSD')).toEqual(true)
  })
})

describe('removePrefix', () => {
  it('fUSD -> USD', () => {
    expect(removePrefix('fUSD')).toEqual('USD')
  })

  it('tBTCUSD -> BTCUSD', () => {
    expect(removePrefix('tBTCUSD')).toEqual('BTCUSD')
  })
})
