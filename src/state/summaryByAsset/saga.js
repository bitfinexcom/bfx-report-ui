import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { getIsSyncRequired } from 'state/sync/selectors'
import { getTimeFrame } from 'state/timeRange/selectors'
import unrealizedProfitConstants from 'ui/UnrealizedProfitSelector/constants'

import types from './constants'
import actions from './actions'

export const getReqSummaryByAsset = (params) => makeFetchCall('getSummaryByAsset', params)

export function* fetchSummaryByAsset() {
  try {
    const { start, end } = yield select(getTimeFrame)
    const params = {
      end,
      start,
      isUnrealizedProfitExcluded: unrealizedProfitConstants.FALSE,
    }
    const { result = {}, error } = yield call(getReqSummaryByAsset, params)
    yield put(actions.updateData(result))

    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'summary.by_asset.title',
        detail: error?.message ?? JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'summary.by_asset.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* refreshSummaryByAsset() {
  const isSyncRequired = yield select(getIsSyncRequired)
  if (!isSyncRequired) {
    yield put(actions.fetchData())
  }
}

function* fetchSummaryByAssetFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* accountSummarySaga() {
  yield takeLatest(types.FETCH, fetchSummaryByAsset)
  yield takeLatest(types.REFRESH, refreshSummaryByAsset)
  yield takeLatest(types.FETCH_FAIL, fetchSummaryByAssetFail)
}
