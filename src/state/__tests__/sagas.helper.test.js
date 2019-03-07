import { call } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import { fetchNext } from 'state/sagas.helper'

describe('Test fetchNext', () => {
  const normalResult = {
    result: {
      res: [],
      nextPage: false,
    },
    error: undefined,
  }
  const errorResult = {
    result: undefined,
    error: 'error',
  }
  const hasNextResult = {
    result: {
      res: [],
      nextPage: true,
    },
    error: undefined,
  }
  const func = () => {}

  it('Test Normal Case', () => {
    const generator = cloneableGenerator(fetchNext)(normalResult.result, normalResult.error, func, 'some', 'params')
    const gen = generator.clone()

    expect(gen.next().value).toEqual(normalResult)
    expect(gen.next().done).toEqual(true)
  })

  it('Test Error Case', () => {
    const generator = cloneableGenerator(fetchNext)(errorResult.result, errorResult.error, func, 'some', 'params')
    const gen = generator.clone()

    expect(gen.next().value).toEqual(errorResult)
    expect(gen.next().done).toEqual(true)
  })

  it('Test 1st no data Case', () => {
    const generator = cloneableGenerator(fetchNext)(hasNextResult.result, hasNextResult.error, func, 'some', 'params')
    const gen = generator.clone()

    expect(gen.next().value).toEqual(call(func, 'some', 'params'))
    expect(gen.next(normalResult).value)
      .toEqual(call(fetchNext, normalResult.result, normalResult.error, func, 'some', 'params'))
    expect(gen.next().done).toEqual(true)
  })

  it('Test 1st and 2nd no data Case', () => {
    const generator = cloneableGenerator(fetchNext)(hasNextResult.result, hasNextResult.error, func, 'some', 'params')
    const gen = generator.clone()

    expect(gen.next().value).toEqual(call(func, 'some', 'params'))
    expect(gen.next(hasNextResult).value)
      .toEqual(call(fetchNext, hasNextResult.result, hasNextResult.error, func, 'some', 'params'))
    expect(gen.next().done).toEqual(true)
  })

  it('Test pass more params Case', () => {
    const generator = cloneableGenerator(fetchNext)(
      hasNextResult.result, hasNextResult.error, func, 'some', 'more', 'params',
    )
    const gen = generator.clone()

    expect(gen.next().value).toEqual(call(func, 'some', 'more', 'params'))
    expect(gen.next(normalResult).value)
      .toEqual(call(fetchNext, normalResult.result, normalResult.error, func, 'some', 'more', 'params'))
    expect(gen.next().done).toEqual(true)
  })
})
