import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getQueryLimit } from 'state/query/utils'
import { updateErrorStatus } from 'state/status/actions'
import queryTypes from 'state/query/constants'
import { mapRequestSymbols } from 'state/symbols/utils'
import { getFilterQuery } from 'state/filters/selectors'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'
import { getLedgers } from './selectors'

const TYPE = queryTypes.MENU_LEDGERS

function getReqLedgers({
  start,
  end,
  targetCategory,
  targetSymbols,
  filter,
}) {
  const params = {
    start,
    end,
    filter,
    limit: getQueryLimit(TYPE),
    category: targetCategory,
    symbol: targetSymbols.length ? mapRequestSymbols(targetSymbols) : undefined,
  }
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchLedgers() {
  try {
    const { targetCategory, targetSymbols } = yield select(getLedgers)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const filter = yield select(getFilterQuery, TYPE)

    const { start, end } = yield select(getTimeFrame, smallestMts)
    const { result, error } = yield call(fetchDataWithPagination, getReqLedgers, {
      start,
      end,
      targetCategory,
      targetSymbols,
      filter,
    })
    yield put(actions.updateLedgers(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'ledgers.title',
        detail: error?.message ?? JSON.stringify(error),
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
  yield takeLatest([
    types.REFRESH, types.SET_PARAMS, types.ADD_SYMBOL, types.REMOVE_SYMBOL, types.CLEAR_SYMBOLS,
  ], refreshLedgers)
  yield takeLatest(types.FETCH_FAIL, fetchLedgersFail)
}
