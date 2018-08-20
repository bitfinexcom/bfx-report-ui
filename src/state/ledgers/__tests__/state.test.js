import actions from '../actions'
import reducer from '../reducer'

const initBlockState = {
  currencies: [],
  entries: [],
  currentSymbol: '',
  dataReceived: false,
  smallestMts: 0,
  offset: 0,
  pageOffset: 0,
  pageLoading: false,
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
      pageOffset: 200,
    })

    // jump from p1 to p2
    expect(reducer(
      {
        ...initBlockState,
        offset: 5000,
        pageOffset: 0,
      },
      actions.jumpPage(2),
    )).toEqual({
      ...initBlockState,
      offset: 5000,
      pageOffset: 200,
    })
  })

  // jump from p1 to p25
  expect(reducer(
    {
      ...initBlockState,
      offset: 5000,
      pageOffset: 0,
    },
    actions.jumpPage(25),
  )).toEqual({
    ...initBlockState,
    offset: 5000,
    pageOffset: 4800,
  })

  // jump from p25 to p24
  expect(reducer(
    {
      ...initBlockState,
      offset: 5000,
      pageOffset: 4800,
    },
    actions.jumpPage(24),
  )).toEqual({
    ...initBlockState,
    offset: 5000,
    pageOffset: 4600,
  })

  it('should handle jump page > LIMIT correctly', () => {
    // jump from p26 to p27
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 0,
      },
      actions.jumpPage(27),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 200,
    })

    // jump from p26 to p50
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 0,
      },
      actions.jumpPage(50),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 4800,
    })

    // jump from p50 to p26
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 4800,
      },
      actions.jumpPage(26),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 0,
    })
  })

  it('should handle jump page > 2 * LIMIT correctly', () => {
    // jump from p51 to p52
    expect(reducer(
      {
        ...initBlockState,
        offset: 15000,
        pageOffset: 0,
      },
      actions.jumpPage(52),
    )).toEqual({
      ...initBlockState,
      offset: 15000,
      pageOffset: 200,
    })

    // jump from p51 to p75
    expect(reducer(
      {
        ...initBlockState,
        offset: 15000,
        pageOffset: 0,
      },
      actions.jumpPage(75),
    )).toEqual({
      ...initBlockState,
      offset: 15000,
      pageOffset: 4800,
    })

    // jump from p75 to p51
    expect(reducer(
      {
        ...initBlockState,
        offset: 15000,
        pageOffset: 4800,
      },
      actions.jumpPage(51),
    )).toEqual({
      ...initBlockState,
      offset: 15000,
      pageOffset: 0,
    })
  })

  it('should handle prev page correctly', () => {
    // jump from p26 to p1
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 0,
      },
      actions.fetchPrevLedgers(),
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
      actions.fetchPrevLedgers(),
    )).toEqual({
      ...initBlockState,
      offset: 10000,
      pageOffset: 0,
    })
  })

  it('should handle jump page across the LIMIT correctly', () => {
    // jump from p26 to p25
    expect(reducer(
      {
        ...initBlockState,
        offset: 10000,
        pageOffset: 0,
      },
      actions.jumpPage(25),
    )).toEqual({
      ...initBlockState,
      offset: 5000,
      pageOffset: 4800,
    })
  })

  // jump from p51 to p50
  expect(reducer(
    {
      ...initBlockState,
      offset: 15000,
      pageOffset: 0,
    },
    actions.jumpPage(50),
  )).toEqual({
    ...initBlockState,
    offset: 10000,
    pageOffset: 4800,
  })
})
