import queryTypes from 'state/query/constants'
import { getTargetQueryLimit } from '../selectors'

const defaultState = {
  base: { queryLimit: 250 },
}

test('Can get right query limit via getQueryLimit', () => {
  const ql = getTargetQueryLimit(defaultState)
  expect(ql(queryTypes.MENU_AFFILIATES_EARNINGS)).toEqual(250)
  expect(ql(queryTypes.MENU_FCREDIT)).toEqual(500)
  expect(ql(queryTypes.MENU_FLOAN)).toEqual(500)
  expect(ql(queryTypes.MENU_FOFFER)).toEqual(500)
  expect(ql(queryTypes.MENU_FPAYMENT)).toEqual(250)
  expect(ql(queryTypes.MENU_LEDGERS)).toEqual(250)
  expect(ql(queryTypes.MENU_ORDERS)).toEqual(250)
  expect(ql(queryTypes.MENU_TICKERS)).toEqual(250)
  expect(ql(queryTypes.MENU_TRADES)).toEqual(250)
  expect(ql(queryTypes.MENU_POSITIONS)).toEqual(50)
  expect(ql(queryTypes.MENU_POSITIONS_ACTIVE)).toEqual(50)
  expect(ql(queryTypes.MENU_POSITIONS_AUDIT)).toEqual(250)
  expect(ql(queryTypes.MENU_PUBLIC_FUNDING)).toEqual(5000)
  expect(ql(queryTypes.MENU_PUBLIC_TRADES)).toEqual(5000)
  expect(ql(queryTypes.MENU_DEPOSITS)).toEqual(25)
  expect(ql(queryTypes.MENU_WITHDRAWALS)).toEqual(25)
})
