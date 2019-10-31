import queryConstants from 'state/query/constants'
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
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
  MENU_DERIVATIVES,
} = queryConstants

const {
  NUMBER,
  INTEGER,
  STRING,
} = DATA_TYPES

const LEDGERS_COLUMNS = [
  { id: 'description', name: 'description', type: STRING },
  { id: 'amount', name: 'amount', type: NUMBER },
  { id: 'amountUsd', name: 'amountUsd', type: NUMBER },
  { id: 'balance', name: 'balance', type: NUMBER },
  { id: 'balanceUsd', name: 'balanceUsd', type: NUMBER },
  { id: 'wallet', name: 'wallet', type: STRING },
]

const SECTION_COLUMNS = {
  [MENU_LEDGERS]: LEDGERS_COLUMNS,

  [MENU_TRADES]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'orderID', name: 'orderid', type: INTEGER },
    { id: 'execAmount', name: 'amount', type: NUMBER },
    { id: 'execPrice', name: 'price', type: NUMBER },
    { id: 'fee', name: 'fee', type: NUMBER },
  ],

  [MENU_ORDERS]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'type', name: 'type', type: STRING },
    { id: 'amountOrig', name: 'amount', type: NUMBER },
    { id: 'amountExecuted', name: 'amount-exe', type: NUMBER },
    { id: 'price', name: 'price', type: NUMBER },
    { id: 'priceAvg', name: 'avgprice', type: NUMBER },
    { id: 'status', name: 'status', type: STRING },
    { id: 'priceTrailing', name: 'pricetrail', type: NUMBER },
    { id: 'typePrev', name: 'typeprev', type: STRING },
  ],

  [MENU_MOVEMENTS]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'status', name: 'status', type: STRING },
    { id: 'amount', name: 'amount', type: NUMBER },
    { id: 'amountUsd', name: 'amountUsd', type: NUMBER },
    { id: 'fees', name: 'fees', type: NUMBER },
    { id: 'destinationAddress', name: 'destination', type: STRING },
    { id: 'transactionId', name: 'transactionId', type: STRING },
  ],

  [MENU_POSITIONS]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'amount', name: 'amount', type: NUMBER },
    { id: 'basePrice', name: 'base-price', type: NUMBER },
    { id: 'marginFunding', name: 'swap', type: NUMBER },
    { id: 'marginFundingType', name: 'swap-type', type: INTEGER },
    { id: 'status', name: 'status', type: STRING },
  ],

  [MENU_FOFFER]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'amountOrig', name: 'amount', type: NUMBER },
    { id: 'amountExecuted', name: 'amount-exe', type: INTEGER },
    { id: 'type', name: 'type', type: STRING },
    { id: 'status', name: 'status', type: STRING },
    { id: 'rate', name: 'rate', type: STRING },
    { id: 'period', name: 'period', type: INTEGER },
  ],

  [MENU_FLOAN]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'side', name: 'side', type: INTEGER },
    { id: 'amount', name: 'amount', type: NUMBER },
    { id: 'status', name: 'status', type: STRING },
    { id: 'rate', name: 'rate', type: STRING },
    { id: 'period', name: 'period', type: INTEGER },
  ],

  [MENU_FCREDIT]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'side', name: 'side', type: INTEGER },
    { id: 'amount', name: 'amount', type: NUMBER },
    { id: 'status', name: 'status', type: STRING },
    { id: 'rate', name: 'rate', type: STRING },
    { id: 'period', name: 'period', type: INTEGER },
    { id: 'positionPair', name: 'positionpair', type: STRING },
  ],

  [MENU_FPAYMENT]: LEDGERS_COLUMNS,

  [MENU_PUBLIC_TRADES]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'price', name: 'price', type: NUMBER },
    { id: 'amount', name: 'amount', type: NUMBER },
  ],

  [MENU_PUBLIC_FUNDING]: [
    { id: 'id', name: 'id', type: INTEGER },
    { id: 'amount', name: 'amount', type: NUMBER },
    { id: 'rate', name: 'rate', type: NUMBER },
    { id: 'period', name: 'period', type: INTEGER },
  ],

  [MENU_TICKERS]: [
    { id: 'bid', name: 'bid', type: NUMBER },
    { id: 'ask', name: 'ask', type: NUMBER },
  ],

  [MENU_DERIVATIVES]: [
    { id: 'price', name: 'priceDeriv', type: NUMBER },
    { id: 'priceSpot', name: 'priceSpot', type: NUMBER },
    { id: 'fundBal', name: 'fundBalance', type: NUMBER },
    { id: 'fundingAccrued', name: 'fundingAccrued', type: NUMBER },
    { id: 'fundingStep', name: 'fundingStep', type: NUMBER },
  ],
}

export default SECTION_COLUMNS
