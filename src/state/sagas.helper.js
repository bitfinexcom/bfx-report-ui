import { call } from 'redux-saga/effects'

// make sure the first params is the `smallestMts` to be processed by fetchNext helper
export function* fetchNext(result, error, func, ...params) {
  if (result && result.res && result.res.length === 0 && result.nextPage) {
    const args = [result.nextPage, ...params.slice(1, params.length)]
    const { result: result1 = {}, error: error1 } = yield call(func, ...args)
    return yield call(fetchNext, result1, error1, func, ...args)
  }
  return { result, error }
}

export default {
  fetchNext,
}
