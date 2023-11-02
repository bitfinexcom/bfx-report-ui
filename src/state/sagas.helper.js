import { call } from 'redux-saga/effects'
import { get } from '@bitfinex/lib-js-util-base'

import { paginationCheck } from 'state/ui/saga'

import { PAGINATION_SEARCH_LIMIT } from 'var'

const shouldFetchNext = ({ result }) => get(result, 'res.length', 0) === 0 && get(result, 'nextPage')

export function* fetchDataWithPagination(requestFunction, options) {
  let requestsCounter = 0

  let response = yield call(requestFunction, options)
  while (shouldFetchNext(response)) {
    requestsCounter += 1
    const nextPage = get(response, 'result.nextPage')
    if (PAGINATION_SEARCH_LIMIT <= requestsCounter) {
      const shouldProceed = yield call(paginationCheck, nextPage)
      if (!shouldProceed) {
        break
      }
      requestsCounter = 0
    }

    options.end = nextPage // eslint-disable-line no-param-reassign
    response = yield call(requestFunction, options)
  }

  const { result, error } = response
  return { result, error }
}

export default {
  fetchDataWithPagination,
}
