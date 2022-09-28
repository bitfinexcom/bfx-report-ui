import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import { updateErrorStatus } from 'state/status/actions'
import { fetchUsers, logout } from 'state/auth/actions'
import { getAuthData, selectAuth } from 'state/auth/selectors'
import Authenticator from 'state/auth/Authenticator'

import types from './constants'

const getReqCreateSubAccount = ({
  masterAccount,
  subAccountApiKeys,
}) => {
  if (masterAccount) {
    const auth = {
      email: masterAccount,
      isSubAccount: true,
    }
    return makeFetchCall('createSubAccount', {
      subAccountApiKeys,
    }, auth)
  }
  return makeFetchCall('createSubAccount', {
    subAccountApiKeys,
  })
}

const getReqRemoveSubAccount = (auth) => makeFetchCall('removeUser', null, auth)

const getReqUpdateSubAccount = (params, auth) => {
  const {
    addingSubUsers,
    removingSubUsersByEmails,
  } = params

  return makeFetchCall('updateSubAccount', {
    addingSubUsers,
    removingSubUsersByEmails,
  }, auth)
}

export function* createSubAccount({ payload }) {
  const { preparedAccountData, masterAccount } = payload
  const params = { subAccountApiKeys: preparedAccountData, masterAccount }
  try {
    const { result, error } = yield call(getReqCreateSubAccount, params)
    if (result) {
      yield put(fetchUsers())
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

export function* removeSubAccount({ payload: masterAccount }) {
  try {
    let auth
    let accountEmail
    if (masterAccount) {
      auth = {
        email: masterAccount,
        isSubAccount: true,
      }
      accountEmail = masterAccount
    } else {
      auth = yield select(selectAuth)
      const authData = yield select(getAuthData)
      const { email } = authData
      accountEmail = email
    }

    const { result, error } = yield call(getReqRemoveSubAccount, auth)
    if (result) {
      if (masterAccount) {
        yield put(fetchUsers())
      } else {
        Authenticator.clear()
        yield put({
          type: types.REMOVE_SUCCESS,
          payload: accountEmail,
        })
        yield put(logout())
      }
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

export function* updateSubAccount({ payload }) {
  try {
    const { addedSubUsers, removedSubUsers, masterAccount } = payload

    let auth
    if (masterAccount) {
      auth = {
        email: masterAccount,
        isSubAccount: true,
      }
    } else {
      auth = yield select(selectAuth)
    }

    const params = {}
    if (addedSubUsers.length) {
      params.addingSubUsers = addedSubUsers
    }
    if (removedSubUsers.length) {
      params.removingSubUsersByEmails = removedSubUsers.map(subUserEmail => ({ email: subUserEmail }))
    }
    const { result, error } = yield call(getReqUpdateSubAccount, params, auth)
    if (result) {
      yield put(fetchUsers())
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
  yield takeLatest(types.ADD, createSubAccount)
  yield takeLatest(types.REMOVE, removeSubAccount)
  yield takeLatest(types.UPDATE, updateSubAccount)
}
