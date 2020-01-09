import queryTypes from 'state/query/constants'

import actions from '../actions'
import reducer, { initialState } from '../reducer'

jest.mock('state/query/utils')

const TYPE = queryTypes.MENU_LEDGERS

const getTotalState = state => ({
  ...initialState,
  [TYPE]: {
    ...initialState[TYPE],
    ...state,
  },
})

describe('Pagination state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle jump page 1 => 2', () => {
    expect(reducer(
      getTotalState({}),
      actions.jumpPage(TYPE, 2),
    )).toEqual(getTotalState({ page: 2 }))
  })

  it('should handle jump page 7 => 2', () => {
    expect(reducer(
      getTotalState({ page: 7 }),
      actions.jumpPage(TYPE, 2),
    )).toEqual(getTotalState({ page: 2 }))
  })

  it('should handle section update', () => {
    expect(reducer(
      initialState,
      actions.updatePagination(TYPE, {
        res: [{}, {}, {}],
        nextPage: 1234,
      }),
    )).toEqual(getTotalState({
      entriesSize: 3,
      smallestMts: 1234,
      nextPage: 1234,
      page: 1,
    }))
  })

  it('should handle smallestMts calculation', () => {
    expect(reducer(
      initialState,
      actions.updatePagination(TYPE, {
        res: [{ mts: 15 }, { mts: 13 }, { mts: 10 }],
        nextPage: false,
      }),
    )).toEqual(getTotalState({
      entriesSize: 3,
      smallestMts: 9,
      nextPage: false,
      page: 1,
    }))
  })

  it('should jump next page if entries size exceeds page limit', () => {
    expect(reducer(
      getTotalState({
        entriesSize: 1, // first request was already done
      }),
      actions.updatePagination(TYPE, {
        res: [{}, {}, {}, {}, {}],
        nextPage: 1234,
      }),
    )).toEqual(getTotalState({
      entriesSize: 6,
      smallestMts: 1234,
      nextPage: 1234,
      page: 2,
    }))
  })

  it('should handle section refresh', () => {
    expect(reducer(
      getTotalState(),
      actions.refreshPagination(TYPE),
    )).toEqual(getTotalState({ page: 1 }))
  })
})
