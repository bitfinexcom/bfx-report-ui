import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { getQuery, getTargetQueryLimit, getTimeFrame } from 'state/query/selectors'
import { getFilterQuery } from 'state/filters/selectors'
import { updateErrorStatus } from 'state/status/actions'
import { refreshPagination, updatePagination } from 'state/pagination/actions'
import { getFundingOfferHistory } from 'state/fundingOfferHistory/selectors'
import { getPaginationData } from 'state/pagination/selectors'
import queryTypes from 'state/query/constants'
import { mapRequestSymbols } from 'state/symbols/utils'
import { frameworkCheck } from 'state/ui/saga'
import { fetchDataWithPagination } from 'state/sagas.helper'

import types from './constants'
import actions from './actions'

const TYPE = queryTypes.MENU_FPAYMENT

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
  // Funding Payment specific param
  params.isMarginFundingPayment = true
  return makeFetchCall('getLedgers', params)
}

/* eslint-disable-next-line consistent-return */
function* fetchFPayment() {
  try {
    const shouldProceed = yield call(frameworkCheck)
    if (!shouldProceed) {
      // stop loading for first request
      return yield put(actions.updateFPayment())
    }

    const { targetSymbols } = yield select(getFundingOfferHistory, TYPE)
    const { smallestMts } = yield select(getPaginationData, TYPE)
    const queryLimit = yield select(getTargetQueryLimit, TYPE)

    const query = yield select(getQuery)
    const filter = yield select(getFilterQuery, TYPE)
    const { result, error } = yield call(fetchDataWithPagination, getReqLedgers, {
      smallestMts,
      query,
      targetSymbols,
      filter,
      queryLimit,
    })
    yield put(actions.updateFPayment(result))
    yield put(updatePagination(TYPE, result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'fpayment.title',
        detail: JSON.stringify(error),
      }))
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
