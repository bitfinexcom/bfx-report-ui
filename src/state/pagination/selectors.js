import { getTargetQueryLimit } from 'state/query/selectors'
import { getPageSize } from 'state/query/utils'
import { getCurrentEntries } from 'state/utils'

export const getPagination = (state, section) => state.pagination[section] || {}
export const getOffset = state => getPagination(state).offset
export const getPageOffset = state => getPagination(state).pageOffset

export const getPaginationData = (state, section) => {
  const {
    entriesSize, offset, pageOffset, smallestMts, nextPage,
  } = getPagination(state, section)

  return {
    entriesSize,
    offset,
    pageOffset,
    smallestMts,
    nextPage,
  }
}

export const getFilteredEntries = (state, section, entries) => {
  const { offset, pageOffset } = getPagination(state, section)
  const limit = getTargetQueryLimit(state, section)
  const pageSize = getPageSize(section)

  return getCurrentEntries(entries, offset, limit, pageOffset, pageSize)
}

export default {
  getPagination,
  getPaginationData,
  getOffset,
  getPageOffset,
  getFilteredEntries,
}
