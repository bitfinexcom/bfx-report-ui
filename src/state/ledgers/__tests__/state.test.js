import actions from '../actions'
import reducer from '../reducer'

const initBlockState = {
  currentEntriesSize: 0,
  existingCoins: [],
  entries: [],
  targetSymbols: [],
  dataReceived: false,
  smallestMts: 0,
  offset: 0,
  pageOffset: 0,
  pageLoading: false,
  nextPage: false,
}
const LIMIT = 5000

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
        offset: 5000,
        pageOffset: 0,
      },
      actions.jumpPage(2, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 5000,
      pageOffset: 125,
    })

    // jump from p1 to p40
    expect(reducer(
      {
        ...initBlockState,
        offset: 5000,
        pageOffset: 0,
      },
      actions.jumpPage(40, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 5000,
      pageOffset: 4875,
    })

    // jump from p40 to p39
    expect(reducer(
      {
        ...initBlockState,
        offset: 5000,
        pageOffset: 4875,
      },
      actions.jumpPage(39, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 5000,
      pageOffset: 4750,
    })
  })

  it('should handle jump page > LIMIT correctly', () => {
    // jump from p41 to p42
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 0,
      },
      actions.jumpPage(42, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 125,
    })

    // jump from p41 to p80
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 0,
      },
      actions.jumpPage(80, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 4875,
    })

    // jump from p80 to p41
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 4875,
      },
      actions.jumpPage(41, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 0,
    })
  })

  it('should handle jump page > 2 * LIMIT correctly', () => {
    // jump from p81 to p82
    expect(reducer(
      {
        ...initBlockState,
        offset: 15000,
        pageOffset: 0,
      },
      actions.jumpPage(82, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 15000,
      pageOffset: 125,
    })

    // jump from p81 to p120
    expect(reducer(
      {
        ...initBlockState,
        offset: 15000,
        pageOffset: 0,
      },
      actions.jumpPage(120, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 15000,
      pageOffset: 4875,
    })

    // jump from p120 to p81
    expect(reducer(
      {
        ...initBlockState,
        offset: 15000,
        pageOffset: 4875,
      },
      actions.jumpPage(81, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 15000,
      pageOffset: 0,
    })
  })

  it('should handle prev page correctly', () => {
    // jump from p41 to p1
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 0,
      },
      actions.fetchPrevLedgers(LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 5000,
      pageOffset: 0,
    })

    // jump from p75 to p26
    expect(reducer(
      {
        ...initBlockState,
        offset: 15000,
        pageOffset: 4800,
      },
      actions.fetchPrevLedgers(LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 0,
    })
  })

  it('should handle jump page across the LIMIT correctly', () => {
    // jump from p41 to p40
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 0,
      },
      actions.jumpPage(40, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 5000,
      pageOffset: 4875,
    })

    // jump from p81 to p80
    expect(reducer(
      {
        ...initBlockState,
        offset: 15000,
        pageOffset: 0,
      },
      actions.jumpPage(80, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 4875,
    })
  })
})

it('should handle jump page < LIMIT correctly', () => {

})
