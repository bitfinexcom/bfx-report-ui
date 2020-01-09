import { getPageSize } from 'state/query/utils'
import { getCurrentEntries } from 'state/utils'

export const getPagination = (state, section) => state.pagination[section] || {}

export const getPaginationData = (state, section) => {
  const {
    entriesSize, smallestMts, page, nextPage,
  } = getPagination(state, section)

  return {
    entriesSize,
    smallestMts,
    page,
    nextPage,
  }
}

export const getFilteredEntries = (state, section, entries) => {
  const { page } = getPagination(state, section)
  const pageSize = getPageSize(section)

  return getCurrentEntries(entries, page, pageSize)
}

export default {
  getPagination,
  getPaginationData,
  getFilteredEntries,
}
