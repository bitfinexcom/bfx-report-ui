import queryType from './constants'

const {
  FILTER_PAIR,
  FILTER_SYMBOL,
  MENU_DEPOSITS,
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_POSITIONS,
  MENU_PUBLIC_TRADES,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_WALLETS,
  MENU_WITHDRAWALS,
} = queryType

export const TYPE_WHITELIST = [
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_POSITIONS,
  MENU_PUBLIC_TRADES,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_WALLETS,
]

export const ROUTE_WHITELIST = [
  MENU_DEPOSITS,
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_POSITIONS,
  MENU_PUBLIC_TRADES,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_WALLETS,
  MENU_WITHDRAWALS,
]

export function isValidTimeStamp(n) {
  return (`${n}`).length === 13
    && (new Date(n)).getTime() === n
}

/*
 * Mapping of each page's metadata
 * The queryLimit / pageSize MUST be divisible
 */
const MAPPING = {
  [MENU_FCREDIT]: {
    icon: 'book',
    path: '/credits',
    filterType: FILTER_SYMBOL,
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_FLOAN]: {
    icon: 'book',
    path: '/loans',
    filterType: FILTER_SYMBOL,
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_FOFFER]: {
    icon: 'book',
    path: '/offers',
    filterType: FILTER_SYMBOL,
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_LEDGERS]: {
    icon: 'book',
    path: '/ledgers',
    filterType: FILTER_SYMBOL,
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_ORDERS]: {
    icon: 'flows',
    path: '/orders',
    filterType: FILTER_PAIR,
    queryLimit: 5000,
    pageSize: 200,
  },
  [MENU_TICKERS]: {
    icon: 'property',
    path: '/tickers',
    filterType: FILTER_PAIR,
    queryLimit: 2500,
    pageSize: 125,
  },
  [MENU_TRADES]: {
    icon: 'exchange',
    path: '/trades',
    filterType: FILTER_PAIR,
    queryLimit: 1500,
    pageSize: 150,
  },
  [MENU_DEPOSITS]: {
    icon: 'add-to-folder',
    path: '/deposits',
    filterType: FILTER_SYMBOL,
    queryLimit: 25,
    pageSize: 25,
  },
  [MENU_WITHDRAWALS]: {
    icon: 'folder-shared-open',
    path: '/withdrawals',
    filterType: FILTER_SYMBOL,
    queryLimit: 25,
    pageSize: 25,
  },
  [MENU_PUBLIC_TRADES]: {
    icon: 'exchange',
    path: '/pub_trades',
    filterType: FILTER_PAIR,
    queryLimit: 1000,
    pageSize: 200,
  },
  [MENU_POSITIONS]: {
    icon: 'exchange',
    path: '/positions',
    filterType: FILTER_PAIR,
    queryLimit: 500,
    pageSize: 125,
  },
  [MENU_MOVEMENTS]: {
    filterType: FILTER_SYMBOL,
    queryLimit: 25,
    pageSize: 25,
  },
  [MENU_WALLETS]: {
    icon: 'dollar',
    path: '/wallets',
  },
}

const PATHMAP = {}
ROUTE_WHITELIST.forEach((key) => {
  PATHMAP[MAPPING[key].path] = key
})

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
