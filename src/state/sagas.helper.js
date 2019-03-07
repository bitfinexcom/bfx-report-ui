import { call } from 'redux-saga/effects'

export function* fetchNext(result, error, func, ...params) {
  if (result && result.res && result.res.length === 0 && result.nextPage) {
    const { result: result1 = {}, error: error1 } = yield call(func, ...params)
    return yield call(fetchNext, result1, error1, func, ...params)
  }
  return { result, error }
}

export default {
  fetchNext,
}
