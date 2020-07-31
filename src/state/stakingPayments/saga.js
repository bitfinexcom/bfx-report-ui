import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getQueryLimit } from 'state/query/utils'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { mapRequestSymbols } from 'state/symbols/utils'
import { frameworkCheck } from 'state/ui/saga'
import { fetchDataWithPagination } from 'state/sagas.helper'
import LEDGERS_CATEGORIES from 'var/ledgersCategories'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

const TYPE = queryTypes.MENU_SPAYMENTS

function getReqLedgers({
  start,
  end,
  targetSymbols,
  filter,
}) {
  const params = {
    start,
    end,
    filter,
    limit: getQueryLimit(TYPE),
    category: LEDGERS_CATEGORIES.STAKING_PAYMENT,
    symbol: targetSymbols.length ? mapRequestSymbols(targetSymbols) : undefined,
  }
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchSPayments() {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateData())
    }

    const targetSymbols = yield select(selectors.getTargetSymbols, TYPE)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const { start, end } = yield select(getTimeFrame, smallestMts)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqLedgers, {
      start,
      end,
      targetSymbols,
      filter,
    })
    yield put(actions.updateData(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'spayments.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'spayments.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshSPayments() {
  yield put(refreshPagination(TYPE))
}

function* fetchSPaymentsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* sPaymentsSaga() {
  yield takeLatest(types.FETCH_DATA, fetchSPayments)
  yield takeLatest([types.REFRESH, types.ADD_SYMBOL, types.REMOVE_SYMBOL], refreshSPayments)
  yield takeLatest(types.FETCH_FAIL, fetchSPaymentsFail)
}
