import { makeFetchCall } from 'state/utils'

const getSymbols = auth => makeFetchCall('getSymbols', null, auth)

const { REACT_APP_API_KEY, REACT_APP_API_SECRET } = process.env

const AUTH = {
  apiKey: REACT_APP_API_KEY,
  apiSecret: REACT_APP_API_SECRET,
}

let res = null

describe('Symbols fetch', () => {
  beforeAll(async () => {
    jest.setTimeout(20000)
    await getSymbols(AUTH).then(({ result }) => {
      res = result || {}
    })
  })

  it('should return data', () => {
    const { pairs, currencies } = res
    expect(Array.isArray(pairs)).toBe(true)
    expect(Array.isArray(currencies)).toBe(true)
  })

  it('should contain only uppercase currencies', () => {
    const { currencies } = res
    currencies.forEach(({ id }) => expect(id.toUpperCase()).toEqual(id))
  })

  it('should contain valid pairs', () => {
    const { pairs } = res
    pairs.forEach((pair) => {
      const isValidPair = pair.length === 6 || pair.includes(':')
      expect(isValidPair).toBe(true)
    })
  })
})
