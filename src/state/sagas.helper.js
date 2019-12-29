import { call } from 'redux-saga/effects'
import _get from 'lodash/get'

import { paginationCheck } from 'state/ui/saga'

import { PAGINATION_SEARCH_LIMIT } from 'var'

const shouldFetchNext = ({ result }) => result && result.res && result.res.length === 0 && result.nextPage

export function* fetchDataWithPagination(requestFunction, options) {
  let requestsCounter = 0
  let response

  do {
    const nextPage = _get(response, 'result.nextPage')
    if (PAGINATION_SEARCH_LIMIT <= requestsCounter) {
      const shouldProceed = yield call(paginationCheck, nextPage)
      if (!shouldProceed) {
        break
      }
      requestsCounter = 0
    }

    if (response) {
      options.smallestMts = nextPage // eslint-disable-line no-param-reassign
    }

    response = yield call(requestFunction, options)
    requestsCounter += 1
  } while (shouldFetchNext(response))

  const { result, error } = response
  return { result, error }
}

export default {
  fetchDataWithPagination,
}
