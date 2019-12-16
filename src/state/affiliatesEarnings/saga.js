import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getQuery, getTargetQueryLimit2, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getAffiliatesEarnings } from 'state/affiliatesEarnings/selectors'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { mapRequestSymbols } from 'state/symbols/utils'
import { frameworkCheck } from 'state/ui/saga'
import { fetchNext } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'

const TYPE = queryTypes.MENU_AFFILIATES_EARNINGS

function getReqLedgers({
  smallestMts,
  query,
  targetSymbols,
  filter,
  queryLimit,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.filter = filter
  if (targetSymbols.length) {
    params.symbol = mapRequestSymbols(targetSymbols)
  }
  if (queryLimit) {
    params.limit = queryLimit
  }
  // Affiliates Earnings specific param
  params.isAffiliateRebate = true
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchAffiliatesEarnings({ payload }) {
  const { nextFetch = false } = payload
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateAffiliatesEarnings())
    }

    const { entries, targetSymbols } = yield select(getAffiliatesEarnings)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)
    const queryLimit = yield select(getTargetQueryLimit2, TYPE)
    // data exist, no need to fetch again
    if (nextFetch && entries.length - queryLimit >= offset) {
      return undefined
    }

    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result: resulto, error: erroro } = yield call(getReqLedgers, {
      smallestMts,
      query,
      targetSymbols,
      filter,
      queryLimit,
    })
    const { result = {}, error } = yield call(fetchNext, resulto, erroro, getReqLedgers, {
      smallestMts,
      query,
      targetSymbols,
      filter,
      queryLimit,
    })
    yield put(actions.updateAffiliatesEarnings(result))
    yield put(updatePagination(TYPE, result, queryLimit))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'affiliatesearnings.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'affiliatesearnings.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshAffiliatesEarnings() {
  yield put(refreshPagination(TYPE))
}

function* fetchAffiliatesEarningsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* affiliatesEarningsSaga() {
  yield takeLatest(types.FETCH_AFFILIATES_EARNINGS, fetchAffiliatesEarnings)
  yield takeLatest(types.REFRESH, refreshAffiliatesEarnings)
  yield takeLatest(types.FETCH_FAIL, fetchAffiliatesEarningsFail)
}
