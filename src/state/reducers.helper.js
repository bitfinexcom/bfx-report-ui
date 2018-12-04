import { getQueryLimit, getPageSize } from 'state/query/utils'

export function fetchNext(type, state) {
  const LIMIT = getQueryLimit(type)
  return (state.entries.length - LIMIT >= state.offset)
    ? {
      ...state,
      offset: state.offset + LIMIT,
      pageOffset: 0,
    } : {
      ...state,
      pageLoading: true,
    }
}

export function fetchPrev(type, state) {
  const LIMIT = getQueryLimit(type)
  return {
    ...state,
    offset: state.offset >= LIMIT ? state.offset - LIMIT : 0,
    pageOffset: 0,
  }
}

export function jumpPage(type, state, page) {
  const LIMIT = getQueryLimit(type)
  const PAGE_SIZE = getPageSize(type)
  const totalOffset = (page - 1) * PAGE_SIZE
  const currentOffset = Math.floor(totalOffset / LIMIT) * LIMIT
  if (totalOffset < LIMIT) {
    const baseOffset = Math.ceil(page / LIMIT * PAGE_SIZE) * LIMIT
    return {
      ...state,
      offset: state.offset < baseOffset ? state.offset : baseOffset,
      pageOffset: totalOffset - currentOffset,
    }
  }
  return {
    ...state,
    offset: currentOffset + LIMIT,
    pageOffset: totalOffset - currentOffset,
  }
}


export default {
  fetchNext,
  fetchPrev,
  jumpPage,
}
