import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { toggleErrorDialog } from 'state/ui/actions'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import actions from './actions'

export const getReqSnapshots = (end) => {
  const params = end ? { end } : {}
  return makeFetchCall('getFullSnapshotReport', params)
}

export const getReqSnapshotsCancel = () => makeFetchCall('interruptOperations', { names: [types.SNAPSHOTS_CANCEL] })

/* eslint-disable-next-line consistent-return */
export function* fetchSnapshots({ payload: end }) {
  try {
    // save current query time in state for csv export reference
    yield put(actions.setTimestamp(end))

    const { result = {}, error } = yield call(getReqSnapshots, end)

    yield put(actions.updateSnapshots(result))

    if (error) {
      yield put(toggleErrorDialog(true, error.message))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'snapshots.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export function* cancelSnapshotsGeneration() {
  try {
    const { error } = yield call(getReqSnapshotsCancel)
    if (error) {
      yield put(actions.fetchFail({
        id: 'status.fail',
        topic: 'snapshots.title',
        detail: error?.message ?? JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(actions.fetchFail({
      id: 'status.request.error',
      topic: 'snapshots.title',
      detail: JSON.stringify(fail),
    }))
  }
}

function* fetchSnapshotsFail({ payload }) {
  yield put(updateErrorStatus(payload))
}

export default function* snapshotsSaga() {
  yield takeLatest([types.FETCH_SNAPSHOTS, types.GENERATE_SNAPSHOTS], fetchSnapshots)
  yield takeLatest(types.FETCH_FAIL, fetchSnapshotsFail)
  yield takeLatest(types.CANCEL_SNAPSHOTS_GENERATION, cancelSnapshotsGeneration)
}
