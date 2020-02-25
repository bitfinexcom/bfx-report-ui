import queryConstants from 'state/query/constants'
import { FILTERS, EMPTY_FILTER } from 'var/filterTypes'
import DATA_TYPES from 'var/dataTypes'

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
  MENU_AFFILIATES_EARNINGS,
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
  MENU_DERIVATIVES,
  MENU_LOGINS,
} = queryConstants

const {
  CONTAINS,
  EQUAL_TO,
  GREATER_THAN,
  LESS_THAN,
} = FILTERS

const {
  NUMBER,
  INTEGER,
  STRING,
} = DATA_TYPES

/* eslint-disable object-curly-newline */
const DEFAULT_LEDGERS = [
  { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
  { column: 'description', type: CONTAINS, dataType: STRING, value: '' },
  { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
  { column: 'balance', type: GREATER_THAN, dataType: NUMBER, value: '' },
]

const DEFAULT_FILTERS = {
  [MENU_LEDGERS]: DEFAULT_LEDGERS,
  [MENU_TRADES]: [
    { column: 'orderID', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'execAmount', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'execPrice', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_ORDERS]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'type', type: CONTAINS, dataType: STRING, value: '' },
    { column: 'amountOrig', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_MOVEMENTS]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'status', type: CONTAINS, dataType: STRING, value: '' },
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_POSITIONS]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'basePrice', type: GREATER_THAN, dataType: NUMBER, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_FOFFER]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'amountOrig', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'status', type: CONTAINS, dataType: STRING, value: '' },
  ],
  [MENU_FLOAN]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'status', type: CONTAINS, dataType: STRING, value: '' },
  ],
  [MENU_FCREDIT]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'status', type: CONTAINS, dataType: STRING, value: '' },
  ],
  [MENU_FPAYMENT]: DEFAULT_LEDGERS,
  [MENU_AFFILIATES_EARNINGS]: DEFAULT_LEDGERS,
  [MENU_PUBLIC_TRADES]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'price', type: LESS_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_PUBLIC_FUNDING]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'amount', type: LESS_THAN, dataType: NUMBER, value: '' },
    { column: 'rate', type: LESS_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_TICKERS]: [
    { column: 'bid', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'ask', type: GREATER_THAN, dataType: NUMBER, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_DERIVATIVES]: [
    { column: 'price', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'priceSpot', type: GREATER_THAN, dataType: NUMBER, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_LOGINS]: [
    { column: 'id', type: EQUAL_TO, dataType: INTEGER, value: '' },
    { column: 'ip', type: EQUAL_TO, dataType: INTEGER, value: '' },
  ],
}

export default DEFAULT_FILTERS
