import { call } from 'redux-saga/effects'

export function* fetchNext(result, error, func, options) {
  if (result && result.res && result.res.length === 0 && result.nextPage) {
    const args = {
      ...options,
      smallestMts: result.nextPage,
    }
    const { result: result1 = {}, error: error1 } = yield call(func, args)
    return yield call(fetchNext, result1, error1, func, args)
  }
  return { result, error }
}

export default {
  fetchNext,
}
