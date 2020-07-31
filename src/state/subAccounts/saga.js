import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'

import types from './constants'
import { setSubAccounts } from './actions'

const getReqFetchSubAccounts = () => makeFetchCall('verifyUser')

const getReqAddSubAccount = (params) => {
  const { subAccountApiKeys } = params

  return makeFetchCall('createSubAccount', {
    subAccountApiKeys,
  })
}

const getReqRemoveSubAccount = (params) => {
  const { subAccountApiKeys } = params
  return makeFetchCall('removeSubAccount', subAccountApiKeys)
}

export function* getSubAccounts() {
  try {
    const { result, error } = yield call(getReqFetchSubAccounts)
    yield put(setSubAccounts(result))

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'subaccounts.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'subaccounts.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export function* addSubAccount({ payload: subAccounts }) {
  try {
    const { result, error } = yield call(getReqAddSubAccount, { subAccountApiKeys: subAccounts })
    if (result) {
      yield put({
        type: types.ADD_SUCCESS,
        payload: result,
      })
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'subaccounts.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'subaccounts.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export function* removeSubAccount({ payload: subAccounts }) {
  try {
    const { result, error } = yield call(getReqRemoveSubAccount, { subAccountApiKeys: subAccounts })
    if (result) {
      yield put({
        type: types.REMOVE_SUCCESS,
        payload: result,
      })
    }

    if (error) {
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'subaccounts.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'subaccounts.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export default function* subAccountsSaga() {
  yield takeLatest(types.FETCH, getSubAccounts)
  yield takeLatest(types.ADD, addSubAccount)
  yield takeLatest(types.REMOVE, removeSubAccount)
}
