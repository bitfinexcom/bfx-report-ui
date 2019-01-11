import queryTypes from 'state/query/constants'
import { getTargetQueryLimit } from '../selectors'

const defaultState = {
  base: { queryLimit: 250 },
}

test('Can get right query limit via getQueryLimit', () => {
  const ql = getTargetQueryLimit(defaultState)
  expect(ql(queryTypes.MENU_LEDGERS)).toEqual(250)
  expect(ql(queryTypes.MENU_ORDERS)).toEqual(250)
  expect(ql(queryTypes.MENU_TRADES)).toEqual(250)
  expect(ql(queryTypes.MENU_WITHDRAWALS)).toEqual(25)
  expect(ql(queryTypes.MENU_PUBLIC_TRADES)).toEqual(500)
})
