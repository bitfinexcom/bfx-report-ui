import { call } from 'redux-saga/effects'
import _get from 'lodash/get'

import { paginationCheck } from 'state/ui/saga'

import { PAGINATION_SEARCH_LIMIT } from 'var'

const shouldFetchNext = ({ result }) => _get(result, 'res.length', 0) === 0 && _get(result, 'nextPage')

export function* fetchDataWithPagination(requestFunction, options) {
  let requestsCounter = 0

  let response = yield call(requestFunction, options)
  while (shouldFetchNext(response)) {
    requestsCounter += 1
    const nextPage = _get(response, 'result.nextPage')
    if (PAGINATION_SEARCH_LIMIT <= requestsCounter) {
      const shouldProceed = yield call(paginationCheck, nextPage)
      if (!shouldProceed) {
        break
      }
      requestsCounter = 0
    }

    options.smallestMts = nextPage // eslint-disable-line no-param-reassign
    response = yield call(requestFunction, options)
  }

  const { result, error } = response
  return { result, error }
}

export default {
  fetchDataWithPagination,
}
