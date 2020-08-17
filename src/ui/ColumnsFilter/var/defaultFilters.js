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
  MENU_SPAYMENTS,
  MENU_AFFILIATES_EARNINGS,
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
  MENU_DERIVATIVES,
  MENU_LOGINS,
  MENU_CHANGE_LOGS,
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
    { column: 'type', type: CONTAINS, dataType: STRING, value: '' },
    { column: 'amountOrig', type: GREATER_THAN, dataType: NUMBER, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_MOVEMENTS]: [
    { column: 'status', type: CONTAINS, dataType: STRING, value: '' },
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_POSITIONS]: [
    { column: 'basePrice', type: GREATER_THAN, dataType: NUMBER, value: '' },
    EMPTY_FILTER,
    EMPTY_FILTER,
  ],
  [MENU_FOFFER]: [
    { column: 'amountOrig', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'status', type: CONTAINS, dataType: STRING, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_FLOAN]: [
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'status', type: CONTAINS, dataType: STRING, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_FCREDIT]: [
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
    { column: 'status', type: CONTAINS, dataType: STRING, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_FPAYMENT]: DEFAULT_LEDGERS,
  [MENU_SPAYMENTS]: DEFAULT_LEDGERS,
  [MENU_AFFILIATES_EARNINGS]: DEFAULT_LEDGERS,
  [MENU_PUBLIC_TRADES]: [
    { column: 'price', type: LESS_THAN, dataType: NUMBER, value: '' },
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
    EMPTY_FILTER,
  ],
  [MENU_PUBLIC_FUNDING]: [
    { column: 'amount', type: LESS_THAN, dataType: NUMBER, value: '' },
    { column: 'rate', type: LESS_THAN, dataType: NUMBER, value: '' },
    EMPTY_FILTER,
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
    { column: 'ip', type: CONTAINS, dataType: STRING, value: '' },
  ],
  [MENU_CHANGE_LOGS]: [
    { column: 'log', type: CONTAINS, dataType: STRING, value: '' },
    { column: 'ip', type: CONTAINS, dataType: STRING, value: '' },
    { column: 'userAgent', type: CONTAINS, dataType: STRING, value: '' },
  ],
}

const DEFAULT_LEDGERS_MIN = [
  { column: 'description', type: CONTAINS, dataType: STRING, value: '' },
]

const DEFAULT_FILTERS_MIN = {
  [MENU_LEDGERS]: DEFAULT_LEDGERS_MIN,
  [MENU_TRADES]: [
    { column: 'execAmount', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_ORDERS]: [
    { column: 'amountOrig', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_MOVEMENTS]: [
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_POSITIONS]: [
    { column: 'basePrice', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_FOFFER]: [
    { column: 'amountOrig', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_FLOAN]: [
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_FCREDIT]: [
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_FPAYMENT]: DEFAULT_LEDGERS,
  [MENU_SPAYMENTS]: DEFAULT_LEDGERS,
  [MENU_AFFILIATES_EARNINGS]: DEFAULT_LEDGERS,
  [MENU_PUBLIC_TRADES]: [
    { column: 'amount', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_PUBLIC_FUNDING]: [
    { column: 'amount', type: LESS_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_TICKERS]: [
    { column: 'bid', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_DERIVATIVES]: [
    { column: 'price', type: GREATER_THAN, dataType: NUMBER, value: '' },
  ],
  [MENU_LOGINS]: [
    { column: 'ip', type: CONTAINS, dataType: STRING, value: '' },
  ],
  [MENU_CHANGE_LOGS]: [
    { column: 'log', type: CONTAINS, dataType: STRING, value: '' },
  ],
}

export default window.innerWidth >= 1024
  ? DEFAULT_FILTERS
  : DEFAULT_FILTERS_MIN
