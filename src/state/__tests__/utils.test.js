import queryConstants from 'state/query/constants'

import { checkInit, getQueryWithoutParams } from '../utils'

const { MENU_POSITIONS_AUDIT } = queryConstants

const buildProps = (props = {}) => ({
  dataReceived: true,
  pageLoading: false,
  isSyncRequired: false,
  fetchData: jest.fn(),
  setTargetIds: jest.fn(),
  match: { params: { id: '1,2,3' } },
  targetIds: ['1', '2', '3'],
  ...props,
})

describe('checkInit - positions audit ids', () => {
  it('should not refetch when the url ids match the target ids', () => {
    const props = buildProps()

    checkInit(props, MENU_POSITIONS_AUDIT)

    expect(props.fetchData).not.toHaveBeenCalled()
    expect(props.setTargetIds).not.toHaveBeenCalled()
  })

  it('should not refetch when the url ids match the target ids in a different order', () => {
    const props = buildProps({ targetIds: ['3', '1', '2'] })

    checkInit(props, MENU_POSITIONS_AUDIT)

    expect(props.fetchData).not.toHaveBeenCalled()
    expect(props.setTargetIds).not.toHaveBeenCalled()
  })

  it('should refetch when the url ids differ from the target ids', () => {
    const props = buildProps({ targetIds: ['1', '2'] })

    checkInit(props, MENU_POSITIONS_AUDIT)

    expect(props.setTargetIds).toHaveBeenCalledWith(['1', '2', '3'])
    expect(props.fetchData).toHaveBeenCalled()
  })

  it('should refetch when the target ids are empty', () => {
    const props = buildProps({ targetIds: [] })

    checkInit(props, MENU_POSITIONS_AUDIT)

    expect(props.setTargetIds).toHaveBeenCalledWith(['1', '2', '3'])
    expect(props.fetchData).toHaveBeenCalled()
  })

  it('should fetch on the initial load even when the ids match', () => {
    const props = buildProps({ dataReceived: false })

    checkInit(props, MENU_POSITIONS_AUDIT)

    expect(props.fetchData).toHaveBeenCalled()
  })
})

describe('getQueryWithoutParams', () => {
  const setSearch = (search) => window.history.replaceState(null, '', search || '/')

  afterEach(() => setSearch('/'))

  // query-string stringifies keys in alphabetical order
  it('should remove a single param', () => {
    setSearch('?range=custom&start=1&end=2')

    expect(getQueryWithoutParams('range')).toBe('?end=2&start=1')
  })

  it('should remove several params', () => {
    setSearch('?range=custom&start=1&end=2')

    expect(getQueryWithoutParams(['start', 'end'])).toBe('?range=custom')
  })

  it('should keep the query untouched when the param is absent', () => {
    setSearch('?range=custom')

    expect(getQueryWithoutParams('start')).toBe('?range=custom')
  })

  it('should return an empty string when every param is removed', () => {
    setSearch('?range=custom')

    expect(getQueryWithoutParams('range')).toBe('')
  })

  it('should return an empty string for an empty query', () => {
    setSearch('/')

    expect(getQueryWithoutParams('range')).toBe('')
  })
})
