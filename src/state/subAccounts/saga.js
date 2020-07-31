import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { getAuthData } from 'state/auth/selectors'

import types from './constants'
import { setSubAccounts } from './actions'

const getReqFetchSubAccounts = (auth) => makeFetchCall('verifyUser', null, { ...auth, isSubAccount: true })

const getReqAddSubAccount = (params) => {
  const { subAccountApiKeys } = params

  return makeFetchCall('createSubAccount', {
    subAccountApiKeys,
  })
}

const getReqRemoveSubAccount = (auth) => makeFetchCall('removeUser', null, auth)

export function* getSubAccounts({ payload: auth }) {
  try {
    const { result, error } = yield call(getReqFetchSubAccounts, auth)
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

export function* removeSubAccount() {
  try {
    const { email, password } = yield select(getAuthData)
    const { result, error } = yield call(getReqRemoveSubAccount, {
      email,
      password,
      isSubAccount: true,
    })
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
