import actions from '../actions'
import reducer, { initialState } from '../reducer'

const TEST_ENTRY = { id: 1 }

describe('Profits state', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set loading on fetch', () => {
    expect(reducer(initialState, actions.fetchProfits()))
      .toEqual({
        ...initialState,
        pageLoading: true,
      })
  })

  it('should update profits', () => {
    expect(reducer(initialState, actions.updateProfits([TEST_ENTRY])))
      .toEqual({
        ...initialState,
        dataReceived: true,
        entries: [TEST_ENTRY],
      })
  })

  it('should keep entries on empty update', () => {
    const state = {
      ...initialState,
      entries: [TEST_ENTRY],
    }
    expect(reducer(state, actions.updateProfits(undefined)))
      .toEqual({
        ...state,
        dataReceived: true,
      })
  })

  it('should refresh data', () => {
    const state = {
      ...initialState,
      dataReceived: true,
      entries: [TEST_ENTRY],
    }
    expect(reducer(state, actions.refresh()))
      .toEqual(initialState)
  })
})
