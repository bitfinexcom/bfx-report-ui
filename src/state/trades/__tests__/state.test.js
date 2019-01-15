import actions from '../actions'
import reducer from '../reducer'

const initBlockState = {
  currentEntriesSize: 0,
  dataReceived: false,
  entries: [],
  existingPairs: [],
  offset: 0,
  pageLoading: false,
  pageOffset: 0,
  smallestMts: 0,
  targetPairs: [],
  nextPage: false,
}
const LIMIT = 1500

describe('ledger state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initBlockState)
  })

  it('should handle jump page < LIMIT correctly', () => {
    // jump from p1 to p2
    expect(reducer(
      {
        ...initBlockState,
        offset: 250,
        pageOffset: 0,
      },
      actions.jumpPage(2, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 250,
      pageOffset: 125,
    })

    // jump from p1 to p2
    expect(reducer(
      {
        ...initBlockState,
        offset: 1500,
        pageOffset: 0,
      },
      actions.jumpPage(2, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 1500,
      pageOffset: 125,
    })

    // jump from p1 to p12
    expect(reducer(
      {
        ...initBlockState,
        offset: 1500,
        pageOffset: 0,
      },
      actions.jumpPage(12, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 1500,
      pageOffset: 1375,
    })

    // jump from p12 to p11
    expect(reducer(
      {
        ...initBlockState,
        offset: 1500,
        pageOffset: 1375,
      },
      actions.jumpPage(11, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 1500,
      pageOffset: 1250,
    })
  })

  it('should handle jump page > LIMIT correctly', () => {
    // jump from p13 to p14
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 0,
      },
      actions.jumpPage(14, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 3000,
      pageOffset: 125,
    })

    // jump from p13 to p24
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 0,
      },
      actions.jumpPage(24, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 3000,
      pageOffset: 1375,
    })

    // jump from p24 to p13
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 1375,
      },
      actions.jumpPage(13, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 3000,
      pageOffset: 0,
    })
  })

  it('should handle jump page > 2 * LIMIT correctly', () => {
    // jump from p25 to p26
    expect(reducer(
      {
        ...initBlockState,
        offset: 4500,
        pageOffset: 0,
      },
      actions.jumpPage(26, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 4500,
      pageOffset: 125,
    })

    // jump from p25 to p36
    expect(reducer(
      {
        ...initBlockState,
        offset: 4500,
        pageOffset: 0,
      },
      actions.jumpPage(36, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 4500,
      pageOffset: 1375,
    })

    // jump from p36 to p25
    expect(reducer(
      {
        ...initBlockState,
        offset: 4500,
        pageOffset: 1375,
      },
      actions.jumpPage(25, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 4500,
      pageOffset: 0,
    })
  })

  it('should handle prev page correctly', () => {
    // jump from p24 to p1
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 0,
      },
      actions.fetchPrevTrades(LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 1500,
      pageOffset: 0,
    })

    // jump from p36 to p25
    expect(reducer(
      {
        ...initBlockState,
        offset: 4500,
        pageOffset: 1375,
      },
      actions.fetchPrevTrades(LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 3000,
      pageOffset: 0,
    })
  })

  it('should handle jump page across the LIMIT correctly', () => {
    // jump from p13 to p12
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 0,
      },
      actions.jumpPage(12, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 1500,
      pageOffset: 1375,
    })

    // jump from p37 to p36
    expect(reducer(
      {
        ...initBlockState,
        offset: 6000,
        pageOffset: 0,
      },
      actions.jumpPage(36, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 4500,
      pageOffset: 1375,
    })
  })
})
