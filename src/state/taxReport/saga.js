import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'
import { isEmpty } from '@bitfinex/lib-js-util-base'

import { makeFetchCall } from 'state/utils'
import { updateSuccessStatus, updateErrorStatus } from 'state/status/actions'
import { getTimeFrame } from 'state/timeRange/selectors'

import types from './constants'
import actions from './actions'
import { getTransactionsStrategy, getTransactionsShouldFeesBeDeducted } from './selectors'

export const getReqTaxReport = (params) => makeFetchCall('makeTrxTaxReportInBackground', params)
export const getReqTaxReportCancel = () => makeFetchCall('interruptOperations', { names: [types.TAX_REPORT_CANCEL] })

export function* fetchTaxReport() {
  try {
    const { start, end } = yield select(getTimeFrame)
    const strategy = yield select(getTransactionsStrategy)
    const shouldFeesBeDeducted = yield select(getTransactionsShouldFeesBeDeducted)
    const params = {
      start, end, strategy, shouldFeesBeDeducted,
    }
    const { error } = yield call(getReqTaxReport, params)

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'taxreport.title',
        detail: error?.message ?? JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'taxreport.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchTaxReportFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

function* handleTaxTrxReportGenerationCompleted({ payload }) {
  const { result, error } = payload
  if (result) {
    const { taxes, delistedCcyList } = result
    yield put(actions.updateTaxReportTransactions(result))
    if (!isEmpty(taxes)) yield put(updateSuccessStatus({ id: 'taxreport.generation.success' }))
    if (!isEmpty(delistedCcyList)) yield put(actions.setShowCalcPrecisionModal(true))
  }
  if (error) {
    yield put(actions.fetchFail({
      id: 'status.fail',
      topic: 'taxreport.title',
      detail: error?.message ?? JSON.stringify(error),
    }))
  }
}

function* handleTaxTrxReportGenerationProgress({ payload }) {
  const { result } = payload
  if (result) {
    const { progress } = result
    yield put(actions.setGenerationProgress(progress))
  }
}

function* cancelTaxReportGeneration() {
  try {
    const { error } = yield call(getReqTaxReportCancel)
    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'taxreport.title',
        detail: error?.message ?? JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'taxreport.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export default function* taxReportSaga() {
  yield takeLatest(types.FETCH_FAIL, fetchTaxReportFail)
  yield takeLatest([types.FETCH_TRANSACTIONS], fetchTaxReport)
  yield takeLatest([types.CANCEL_TAX_REPORT_GENERATION], cancelTaxReportGeneration)
  yield takeLatest(types.WS_TAX_TRANSACTION_REPORT_GENERATION_PROGRESS, handleTaxTrxReportGenerationProgress)
  yield takeLatest(types.WS_TAX_TRANSACTION_REPORT_GENERATION_COMPLETED, handleTaxTrxReportGenerationCompleted)
}
