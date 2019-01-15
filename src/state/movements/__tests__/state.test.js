import actions from '../actions'
import reducer from '../reducer'

const initBlockState = {
  currentEntriesSize: 0,
  dataReceived: false,
  entries: [],
  existingCoins: [],
  offset: 0,
  pageLoading: false,
  pageOffset: 0,
  smallestMts: 0,
  targetSymbols: [],
  nextPage: false,
}
const LIMIT = 25

describe('ledger state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initBlockState)
  })

  it('should handle jump page correctly', () => {
    // jump from p1 to p2
    expect(reducer(
      {
        ...initBlockState,
        offset: 25,
        pageOffset: 0,
      },
      actions.jumpPage(2, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 50,
      pageOffset: 0,
    })
  })

  it('should handle prev page correctly', () => {
    // jump from p2 to p1
    expect(reducer(
      {
        ...initBlockState,
        offset: 50,
        pageOffset: 0,
      },
      actions.fetchPrevMovements(LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 25,
      pageOffset: 0,
    })

    // jump from p3 to p2
    expect(reducer(
      {
        ...initBlockState,
        offset: 75,
        pageOffset: 0,
      },
      actions.fetchPrevMovements(LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 50,
      pageOffset: 0,
    })
  })

  it('should handle jump page across the LIMIT correctly', () => {
    // jump from p2 to p1
    expect(reducer(
      {
        ...initBlockState,
        offset: 50,
        pageOffset: 0,
      },
      actions.jumpPage(1, LIMIT),
    )).toEqual({
      ...initBlockState,
      offset: 25,
      pageOffset: 0,
    })
  })

  // jump from p3 to p2
  expect(reducer(
    {
      ...initBlockState,
      offset: 75,
      pageOffset: 0,
    },
    actions.jumpPage(2, LIMIT),
  )).toEqual({
    ...initBlockState,
    offset: 50,
    pageOffset: 0,
  })
})
