import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { toggleErrorDialog } from 'state/ui/actions'
import { getTimeFrame } from 'state/timeRange/selectors'
import { getQueryLimit } from 'state/query/utils'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { mapRequestSymbols } from 'state/symbols/utils'
import { fetchDataWithPagination } from 'state/sagas.helper'
import LEDGERS_CATEGORIES from 'var/ledgersCategories'

import types from './constants'
import actions from './actions'
import selectors from './selectors'

const TYPE = queryTypes.MENU_FPAYMENT

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
    category: LEDGERS_CATEGORIES.FUNDING_PAYMENT,
    symbol: targetSymbols.length ? mapRequestSymbols(targetSymbols) : undefined,
  }
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchFPayment() {
  try {
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
    yield put(actions.updateFPayment(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'fpayment.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshFPayment() {
  yield put(refreshPagination(TYPE))
}

function* fetchFPaymentFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* fpaymentSaga() {
  yield takeLatest(types.FETCH_FPAYMENT, fetchFPayment)
  yield takeLatest([types.REFRESH, types.ADD_SYMBOL, types.REMOVE_SYMBOL], refreshFPayment)
  yield takeLatest(types.FETCH_FAIL, fetchFPaymentFail)
}
