import queryConstants from 'state/query/constants'
import { FILTERS, EMPTY_FILTER } from 'var/filterTypes'

const {
  MENU_LEDGERS,
  MENU_TRADES,
  MENU_ORDERS,
  MENU_MOVEMENTS,
  MENU_POSITIONS,
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
  MENU_FPAYMENT,
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
  MENU_DERIVATIVES,
} = queryConstants

const {
  CONTAINS,
  EQUAL_TO,
  GREATER_THAN,
  LESS_THAN,
} = FILTERS

const DEFAULT_FILTERS = {
  [MENU_LEDGERS]: [
    { column: 'description', type: CONTAINS, value: '' },
    { column: 'amountUsd', type: GREATER_THAN, value: '' },
    { column: 'balanceUsd', type: GREATER_THAN, value: '' },
  ],
  [MENU_TRADES]: [
    { column: 'orderID', type: EQUAL_TO, value: '' },
    { column: 'execAmount', type: GREATER_THAN, value: '' },
    { column: 'execPrice', type: GREATER_THAN, value: '' },
  ],
  [MENU_ORDERS]: [
    { column: 'id', type: EQUAL_TO, value: '' },
    { column: 'type', type: CONTAINS, value: '' },
    { column: 'amountOrig', type: GREATER_THAN, value: '' },
  ],
  [MENU_MOVEMENTS]: [
    { column: 'id', type: EQUAL_TO, value: '' },
    { column: 'status', type: CONTAINS, value: '' },
    { column: 'amountUsd', type: GREATER_THAN, value: '' },
  ],
  [MENU_POSITIONS]: [
    { column: 'id', type: EQUAL_TO, value: '' },
    { column: 'basePrice', type: GREATER_THAN, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_FOFFER]: [
    { column: 'id', type: EQUAL_TO, value: '' },
    { column: 'amountOrig', type: GREATER_THAN, value: '' },
    { column: 'status', type: CONTAINS, value: '' },
  ],
  [MENU_FLOAN]: [
    { column: 'id', type: EQUAL_TO, value: '' },
    { column: 'amount', type: GREATER_THAN, value: '' },
    { column: 'status', type: CONTAINS, value: '' },
  ],
  [MENU_FCREDIT]: [
    { column: 'id', type: EQUAL_TO, value: '' },
    { column: 'amount', type: GREATER_THAN, value: '' },
    { column: 'status', type: CONTAINS, value: '' },
  ],
  [MENU_FPAYMENT]: [
    { column: 'description', type: CONTAINS, value: '' },
    { column: 'amountUsd', type: GREATER_THAN, value: '' },
    { column: 'balanceUsd', type: GREATER_THAN, value: '' },
  ],
  [MENU_PUBLIC_TRADES]: [
    { column: 'id', type: EQUAL_TO, value: '' },
    { column: 'amount', type: GREATER_THAN, value: '' },
    { column: 'price', type: LESS_THAN, value: '' },
  ],
  [MENU_PUBLIC_FUNDING]: [
    { column: 'id', type: EQUAL_TO, value: '' },
    { column: 'amount', type: LESS_THAN, value: '' },
    { column: 'rate', type: LESS_THAN, value: '' },
  ],
  [MENU_TICKERS]: [
    { column: 'bid', type: GREATER_THAN, value: '' },
    { column: 'ask', type: GREATER_THAN, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_DERIVATIVES]: [
    { column: 'price', type: GREATER_THAN, value: '' },
    { column: 'priceSpot', type: GREATER_THAN, value: '' },
    EMPTY_FILTER,
  ],
}

export default DEFAULT_FILTERS
