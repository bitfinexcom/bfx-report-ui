import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { mapRequestSymbols } from 'state/symbols/utils'
import { getFilterQuery } from 'state/filters/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { fetchNext } from 'state/sagas.helper'
import { frameworkCheck } from 'state/ui/saga'

import types from './constants'
import actions from './actions'
import { getLedgers } from './selectors'

const TYPE = queryTypes.MENU_LEDGERS

function getReqLedgers({
  smallestMts,
  query,
  targetSymbols,
  queryLimit,
  filter,
}) {
  const params = getTimeFrame(query, smallestMts)
  params.filter = filter
  if (targetSymbols.length) {
    params.symbol = mapRequestSymbols(targetSymbols)
  }
  if (queryLimit) {
    params.limit = queryLimit
  }
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchLedgers({ payload }) {
  const { nextFetch = false } = payload
  try {
    if (!nextFetch) {
      const shouldProceed = yield call(frameworkCheck)
      if (!shouldProceed) {
        // stop loading for first request
        return yield put(actions.updateLedgers())
      }
    }

    const { entries, targetSymbols } = yield select(getLedgers)
    const filter = yield select(getFilterQuery, TYPE)
    const { offset, smallestMts } = yield select(getPaginationData, TYPE)
    const queryLimit = yield select(getTargetQueryLimit, TYPE)

    // data exist, no need to fetch again
    if (nextFetch && entries.length - queryLimit >= offset) {
      return undefined
    }

    const query = yield select(getQuery)
    const { result: resulto = {}, error: erroro } = yield call(getReqLedgers, {
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
    yield put(actions.updateLedgers(result, queryLimit))
    yield put(updatePagination(TYPE, result, queryLimit))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'ledgers.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'ledgers.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshLedgers() {
  yield put(refreshPagination(TYPE))
}

function* fetchLedgersFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* ledgersSaga() {
  yield takeLatest(types.FETCH_LEDGERS, fetchLedgers)
  yield takeLatest(types.REFRESH, refreshLedgers)
  yield takeLatest(types.FETCH_FAIL, fetchLedgersFail)
}
