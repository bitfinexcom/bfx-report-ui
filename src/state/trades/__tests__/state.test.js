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

describe('ledger state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initBlockState)
  })

  it('should handle jump page < LIMIT correctly', () => {
    // jump from p1 to p2
    expect(reducer(
      {
        ...initBlockState,
        offset: 300,
        pageOffset: 0,
      },
      actions.jumpPage(2),
    )).toEqual({
      ...initBlockState,
      offset: 300,
      pageOffset: 150,
    })

    // jump from p1 to p2
    expect(reducer(
      {
        ...initBlockState,
        offset: 1500,
        pageOffset: 0,
      },
      actions.jumpPage(2),
    )).toEqual({
      ...initBlockState,
      offset: 1500,
      pageOffset: 150,
    })
  })

  // jump from p1 to p10
  expect(reducer(
    {
      ...initBlockState,
      offset: 1500,
      pageOffset: 0,
    },
    actions.jumpPage(10),
  )).toEqual({
    ...initBlockState,
    offset: 1500,
    pageOffset: 1350,
  })

  // jump from p10 to p9
  expect(reducer(
    {
      ...initBlockState,
      offset: 1500,
      pageOffset: 1350,
    },
    actions.jumpPage(9),
  )).toEqual({
    ...initBlockState,
    offset: 1500,
    pageOffset: 1200,
  })

  it('should handle jump page > LIMIT correctly', () => {
    // jump from p11 to p12
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 0,
      },
      actions.jumpPage(12),
    )).toEqual({
      ...initBlockState,
      offset: 3000,
      pageOffset: 150,
    })

    // jump from p11 to p20
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 0,
      },
      actions.jumpPage(20),
    )).toEqual({
      ...initBlockState,
      offset: 3000,
      pageOffset: 1350,
    })

    // jump from p20 to p11
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 1350,
      },
      actions.jumpPage(11),
    )).toEqual({
      ...initBlockState,
      offset: 3000,
      pageOffset: 0,
    })
  })

  it('should handle jump page > 2 * LIMIT correctly', () => {
    // jump from p21 to p22
    expect(reducer(
      {
        ...initBlockState,
        offset: 4500,
        pageOffset: 0,
      },
      actions.jumpPage(22),
    )).toEqual({
      ...initBlockState,
      offset: 4500,
      pageOffset: 150,
    })

    // jump from p21 to p30
    expect(reducer(
      {
        ...initBlockState,
        offset: 4500,
        pageOffset: 0,
      },
      actions.jumpPage(30),
    )).toEqual({
      ...initBlockState,
      offset: 4500,
      pageOffset: 1350,
    })

    // jump from p30 to p21
    expect(reducer(
      {
        ...initBlockState,
        offset: 4500,
        pageOffset: 1350,
      },
      actions.jumpPage(21),
    )).toEqual({
      ...initBlockState,
      offset: 4500,
      pageOffset: 0,
    })
  })

  it('should handle prev page correctly', () => {
    // jump from p20 to p1
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 0,
      },
      actions.fetchPrevTrades(),
    )).toEqual({
      ...initBlockState,
      offset: 1500,
      pageOffset: 0,
    })

    // jump from p30 to p21
    expect(reducer(
      {
        ...initBlockState,
        offset: 4500,
        pageOffset: 1350,
      },
      actions.fetchPrevTrades(),
    )).toEqual({
      ...initBlockState,
      offset: 3000,
      pageOffset: 0,
    })
  })

  it('should handle jump page across the LIMIT correctly', () => {
    // jump from p11 to p10
    expect(reducer(
      {
        ...initBlockState,
        offset: 3000,
        pageOffset: 0,
      },
      actions.jumpPage(10),
    )).toEqual({
      ...initBlockState,
      offset: 1500,
      pageOffset: 1350,
    })
  })

  // jump from p31 to p30
  expect(reducer(
    {
      ...initBlockState,
      offset: 6000,
      pageOffset: 0,
    },
    actions.jumpPage(30),
  )).toEqual({
    ...initBlockState,
    offset: 4500,
    pageOffset: 1350,
  })
})
