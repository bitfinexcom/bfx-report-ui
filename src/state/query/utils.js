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
  MENU_PUBLIC_TRADES,
  MENU_MOVEMENTS,
} = queryType

export const TYPE_WHITELIST = [
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_PUBLIC_TRADES,
]

export const ROUTE_WHITELIST = [
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_TRADES,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
  MENU_PUBLIC_TRADES,
]

export function isValidTimeStamp(n) {
  return (`${n}`).length === 13
    && (new Date(n)).getTime() === n
}

const MAPPING = {
  [MENU_FCREDIT]: {
    icon: 'book',
    path: '/credits',
    filterType: 'symbol',
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_FLOAN]: {
    icon: 'book',
    path: '/loans',
    filterType: 'symbol',
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_FOFFER]: {
    icon: 'book',
    path: '/offers',
    filterType: 'symbol',
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_LEDGERS]: {
    icon: 'book',
    path: '/ledgers',
    filterType: 'symbol',
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_ORDERS]: {
    icon: 'flows',
    path: '/orders',
    filterType: 'pair',
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_TRADES]: {
    icon: 'exchange',
    path: '/trades',
    filterType: 'pair',
    queryLimit: 1500,
    pageSize: 150,
  },
  [MENU_DEPOSITS]: {
    icon: 'add-to-folder',
    path: '/deposits',
    filterType: 'symbol',
    queryLimit: 25,
    pageSize: 25,
  },
  [MENU_WITHDRAWALS]: {
    icon: 'folder-shared-open',
    path: '/withdrawals',
    filterType: 'symbol',
    queryLimit: 25,
    pageSize: 25,
  },
  [MENU_PUBLIC_TRADES]: {
    icon: 'exchange',
    path: '/pub_trades',
    filterType: 'pair',
    queryLimit: 1000,
    pageSize: 200,
  },
  [MENU_MOVEMENTS]: {
    queryLimit: 1000,
    pageSize: 200,
  }
}

const PATHMAP = {
  [MAPPING[MENU_FCREDIT].path]: MENU_FCREDIT,
  [MAPPING[MENU_FLOAN].path]: MENU_FLOAN,
  [MAPPING[MENU_FOFFER].path]: MENU_FOFFER,
  [MAPPING[MENU_LEDGERS].path]: MENU_LEDGERS,
  [MAPPING[MENU_DEPOSITS].path]: MENU_DEPOSITS,
  [MAPPING[MENU_ORDERS].path]: MENU_ORDERS,
  [MAPPING[MENU_TRADES].path]: MENU_TRADES,
  [MAPPING[MENU_DEPOSITS].path]: MENU_DEPOSITS,
  [MAPPING[MENU_WITHDRAWALS].path]: MENU_WITHDRAWALS,
  [MAPPING[MENU_PUBLIC_TRADES].path]: MENU_PUBLIC_TRADES,
}

// get target from the following link syntax
// /target
// /target?params=
// /target/BTCUSD
// /target/BTCUSD?params=
export function getTarget(link) {
  let baseLink = link
  if (link.slice(1).indexOf('/') > -1) {
    const parts = link.split('/')
    baseLink = link.replace(`/${parts[parts.length - 1]}`, '')
  }
  return PATHMAP[baseLink] || MENU_LEDGERS
}

// get icon from target
export function getIcon(target) {
  return MAPPING[target].icon
}

// get path from target
export function getPath(target) {
  return MAPPING[target].path
}

export function getFilterType(target) {
  return MAPPING[target].filterType
}

export function getQueryLimit(target) {
  return MAPPING[target].queryLimit
}

export function getPageSize(target) {
  return MAPPING[target].pageSize
}

export default {
  getIcon,
  getFilterType,
  getPageSize,
  getPath,
  getQueryLimit,
  getTarget,
  isValidTimeStamp,
  ROUTE_WHITELIST,
  TYPE_WHITELIST,
}
