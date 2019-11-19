import {
  mapSymbol,
  mapPair,
  mapCurrency,
  mapDescription,
  demapSymbols,
  demapPairs,
  mapRequestSymbols,
  mapRequestPairs,
} from '../utils/mapping'

jest.mock('../map')

describe('mapSymbol', () => {
  it('BAB -> BCH', () => {
    expect(mapSymbol('BAB')).toEqual('BCH')
  })

  it('USD -> USD', () => {
    expect(mapSymbol('USD')).toEqual('USD')
  })
})

describe('mapPair', () => {
  it('CNHT:USD -> CNHt:USD', () => {
    expect(mapPair('CNHT:USD')).toEqual('CNHt:USD')
  })

  it('BTC:USD -> BTC:USD', () => {
    expect(mapPair('BTC:USD')).toEqual('BTC:USD')
  })
})

describe('mapCurrency', () => {
  it('correctly maps symbols and pairs', () => {
    expect(mapCurrency('BAB')).toEqual('BCH')
    expect(mapCurrency('USD')).toEqual('USD')
    expect(mapCurrency('CNHT:USD')).toEqual('CNHt:USD')
    expect(mapCurrency('BTC:USD')).toEqual('BTC:USD')
  })
})

describe('mapDescription', () => {
  it('Trading fees (BABUSD) -> Trading fees (BCHUSD)', () => {
    expect(mapDescription('Trading fees (BABUSD)')).toEqual('Trading fees (BCHUSD)')
  })
})

// [CNHt] -> [CNHT]
// [BCH], true -> BAB
describe('demapSymbols', () => {
  it('[CNHt] -> [CNHT]', () => {
    expect(demapSymbols(['CNHt'])).toEqual(['CNHT'])
  })

  it('[BCH], true -> BAB', () => {
    expect(demapSymbols(['BCH'], true)).toEqual('BAB')
  })
})

// [BCH:USD] -> [BAB:USD]
// [BCH:USD], true -> [BAB:USD]
describe('demapPairs', () => {
  it('[BCH:USD] -> [BAB:USD]', () => {
    expect(demapPairs(['BCH:USD'])).toEqual(['BAB:USD'])
  })

  it('[BCH:USD], true -> [BAB:USD]', () => {
    expect(demapPairs(['BCH:USD'], true)).toEqual('BAB:USD')
  })
})

// [CNHt] -> [CNHT]
// [BCH] -> [BAB, BCH]
// [BCH], true -> BAB
describe('mapRequestSymbols', () => {
  it('[CNHt] -> [CNHT]', () => {
    expect(mapRequestSymbols(['CNHt'])).toEqual(['CNHT'])
  })

  it('[BCH] -> [BAB, BCH]', () => {
    expect(mapRequestSymbols(['BCH'])).toEqual(['BAB', 'BCH'])
  })

  it('[BCH], true -> BAB', () => {
    expect(mapRequestSymbols(['BCH'], true)).toEqual('BAB')
  })
})

// [BCH:USD] -> [BAB:USD, BCH:USD]
// [BCH:USD], true -> [BAB:USD]
describe('mapRequestPairs', () => {
  it('[BCH:USD] -> [BAB:USD, BCH:USD]', () => {
    expect(mapRequestPairs(['BCH:USD'])).toEqual(['BAB:USD', 'BCH:USD'])
  })

  it('[BCH:USD], true -> [BAB:USD]', () => {
    expect(mapRequestPairs(['BCH:USD'], true)).toEqual('BAB:USD')
  })
})
