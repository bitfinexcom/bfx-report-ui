import { makeFetchCall } from 'state/utils'

const getSymbols = () => makeFetchCall('getSymbols')

describe('symbols fetch', () => {
  it('should return non empty success response', () => {
    return getSymbols().then((res) => {
      expect(res).toEqual('BTCUSD')
    })
  })
})
