import queryType from './constants'

const {
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
} = queryType

export function isValidTimeStamp(n) {
  return (`${n}`).length === 13
    && (new Date(n)).getTime() === n
}

export const MAPPING = {
  [MENU_FCREDIT]: {
    icon: 'book',
    path: '/funding_credit_history',
  },
  [MENU_FLOAN]: {
    icon: 'book',
    path: '/funding_loan_history',
  },
  [MENU_FOFFER]: {
    icon: 'book',
    path: '/funding_offer_history',
  },
  [MENU_LEDGERS]: {
    icon: 'book',
    path: '/ledgers',
  },
  [MENU_ORDERS]: {
    icon: 'flows',
    path: '/orders',
  },
  [MENU_TRADES]: {
    icon: 'exchange',
    path: '/trades',
  },
  [MENU_DEPOSITS]: {
    icon: 'add-to-folder',
    path: '/deposits',
  },
  [MENU_WITHDRAWALS]: {
    icon: 'folder-shared-open',
    path: '/withdrawals',
  },
}

export const PATHMAP = {
  [MAPPING[MENU_FCREDIT].path]: MENU_FCREDIT,
  [MAPPING[MENU_FLOAN].path]: MENU_FLOAN,
  [MAPPING[MENU_FOFFER].path]: MENU_FOFFER,
  [MAPPING[MENU_LEDGERS].path]: MENU_LEDGERS,
  [MAPPING[MENU_DEPOSITS].path]: MENU_DEPOSITS,
  [MAPPING[MENU_ORDERS].path]: MENU_ORDERS,
  [MAPPING[MENU_TRADES].path]: MENU_TRADES,
  [MAPPING[MENU_DEPOSITS].path]: MENU_DEPOSITS,
  [MAPPING[MENU_WITHDRAWALS].path]: MENU_WITHDRAWALS,
}

export default {
  isValidTimeStamp,
  MAPPING,
  PATHMAP,
}
