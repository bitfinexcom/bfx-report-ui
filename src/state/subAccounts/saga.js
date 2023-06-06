import {
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects'

import { makeFetchCall } from 'state/utils'
import Authenticator from 'state/auth/Authenticator'
import { updateErrorStatus, updateSuccessStatus } from 'state/status/actions'
import { fetchUsers, logout } from 'state/auth/actions'
import { getAuthData, selectAuth } from 'state/auth/selectors'
import { hasValidUsername } from 'components/Auth/SignInList/SignInList.helpers'

import types from './constants'
import { setSubAccountLoadingStatus } from './actions'

const getReqCreateSubAccount = ({
  masterAccount,
  localUsername,
  password,
  subAccountApiKeys,
}) => {
  if (masterAccount) {
    const auth = {
      isSubAccount: true,
      email: masterAccount,
      password: password || undefined,
    }
    return makeFetchCall('createSubAccount', {
      subAccountApiKeys,
      ...(hasValidUsername(localUsername) && { localUsername }),
    }, auth)
  }
  return makeFetchCall('createSubAccount', {
    subAccountApiKeys,
    ...(hasValidUsername(localUsername) && { localUsername }),
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
  const {
    preparedAccountData, masterAccount, userPassword, localUsername,
  } = payload
  const params = {
    masterAccount,
    localUsername,
    password: userPassword,
    subAccountApiKeys: preparedAccountData,
  }
  try {
    yield put(setSubAccountLoadingStatus(true))
    const { result, error } = yield call(getReqCreateSubAccount, params)
    if (result) {
      yield put(setSubAccountLoadingStatus(false))
      yield put(fetchUsers())
    }

    if (error) {
      yield put(setSubAccountLoadingStatus(false))
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'subaccounts.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(setSubAccountLoadingStatus(false))
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
    const {
      userPassword,
      addedSubUsers,
      masterAccount,
      localUsername,
      removedSubUsers,
    } = payload

    let auth
    if (masterAccount) {
      auth = {
        email: masterAccount,
        isSubAccount: true,
        password: userPassword || undefined,
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
    yield put(setSubAccountLoadingStatus(true))
    if (hasValidUsername(localUsername)) {
      yield makeFetchCall('updateUser', { localUsername }, auth)
    }
    const { result, error } = yield call(getReqUpdateSubAccount, params, auth)
    if (result) {
      yield put(setSubAccountLoadingStatus(false))
      yield put(fetchUsers())
    }

    if (error) {
      yield put(setSubAccountLoadingStatus(false))
      yield put(updateErrorStatus({
        id: 'status.fail',
        topic: 'subaccounts.title',
        detail: JSON.stringify(error),
      }))
    }
  } catch (fail) {
    yield put(setSubAccountLoadingStatus(false))
    yield put(updateErrorStatus({
      id: 'status.request.error',
      topic: 'subaccounts.title',
      detail: JSON.stringify(fail),
    }))
  }
}

export function* updateLocalUsername({ payload }) {
  try {
    const { masterAccount, localUsername } = payload
    let auth
    if (masterAccount) {
      auth = {
        email: masterAccount,
        isSubAccount: true,
      }
    } else {
      auth = yield select(selectAuth)
    }

    if (hasValidUsername(localUsername)) {
      const { result, error } = yield makeFetchCall('updateUser', { localUsername }, auth)
      if (result) {
        yield put(fetchUsers())
        yield put(updateSuccessStatus({ id: 'subaccounts.name_updated' }))
      }
      if (error) {
        yield put(updateErrorStatus({
          id: 'status.fail',
          topic: 'subaccounts.title',
          detail: JSON.stringify(error),
        }))
      }
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
  yield takeLatest(types.UPDATE_LOCAL_USERNAME, updateLocalUsername)
}
