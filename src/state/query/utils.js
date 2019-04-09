import { platform } from 'var/config'

import queryType from './constants'

const {
  FILTER_ID,
  FILTER_PAIR,
  FILTER_SYMBOL,
  MENU_DEPOSITS,
  MENU_FCREDIT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
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
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
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
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_ORDERS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_WALLETS,
  MENU_WITHDRAWALS,
]

// Should keep the order, which used in ExportTargetsSelector
const BASIC_TARGETS = [
  MENU_LEDGERS,
  MENU_TRADES,
  MENU_ORDERS,
  MENU_DEPOSITS,
  MENU_WITHDRAWALS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  // MENU_POSITIONS_AUDIT,
  MENU_WALLETS,
]
// MENU_FPAYMENT only for sync mode
const FUNDING_TARGETS = platform.showSyncMode ? [
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
  MENU_FPAYMENT,
] : [
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
]
const PUBLIC_TARGETS = [
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
]
export const ORDERED_TARGETS = [
  ...BASIC_TARGETS,
  ...FUNDING_TARGETS,
  ...PUBLIC_TARGETS,
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
    queryLimit: 500,
    pageSize: 125,
  },
  [MENU_FLOAN]: {
    icon: 'book',
    path: '/loans',
    filterType: FILTER_SYMBOL,
    queryLimit: 500,
    pageSize: 125,
  },
  [MENU_FOFFER]: {
    icon: 'book',
    path: '/offers',
    filterType: FILTER_SYMBOL,
    queryLimit: 500,
    pageSize: 125,
  },
  [MENU_FPAYMENT]: {
    icon: 'book',
    path: '/payments',
    filterType: FILTER_SYMBOL,
    // queryLimit: 500,
    pageSize: 125,
  },
  [MENU_LEDGERS]: {
    icon: 'book',
    path: '/ledgers',
    filterType: FILTER_SYMBOL,
    // queryLimit: 500,
    pageSize: 125,
  },
  [MENU_ORDERS]: {
    icon: 'flows',
    path: '/orders',
    filterType: FILTER_PAIR,
    // queryLimit: 500,
    pageSize: 125,
  },
  [MENU_TICKERS]: {
    icon: 'property',
    path: '/tickers',
    filterType: FILTER_PAIR,
    queryLimit: 250,
    pageSize: 125,
  },
  [MENU_TRADES]: {
    icon: 'exchange',
    path: '/trades',
    filterType: FILTER_PAIR,
    // queryLimit: 1000,
    pageSize: 125,
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
  [MENU_PUBLIC_FUNDING]: {
    icon: 'exchange',
    path: '/pub_trades_funding',
    filterType: FILTER_SYMBOL,
    queryLimit: 5000,
    pageSize: 125,
  },
  [MENU_PUBLIC_TRADES]: {
    icon: 'exchange',
    path: '/pub_trades',
    filterType: FILTER_PAIR,
    queryLimit: 5000,
    pageSize: 125,
  },
  [MENU_POSITIONS]: {
    icon: 'numbered-list',
    path: '/positions',
    filterType: FILTER_PAIR,
    queryLimit: 50,
    pageSize: 25,
  },
  [MENU_POSITIONS_ACTIVE]: {
    icon: 'numbered-list',
    path: '/activepositions',
    filterType: FILTER_PAIR,
    queryLimit: 50,
    pageSize: 25,
  },
  [MENU_POSITIONS_AUDIT]: {
    icon: 'numbered-list',
    path: '/positions_audit',
    filterType: FILTER_ID,
    queryLimit: 250,
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
    // queryLimit: 100,
  },
}

const PATHMAP = {}
ROUTE_WHITELIST.forEach((key) => {
  PATHMAP[MAPPING[key].path] = key
})

function error(target, action) {
  // eslint-disable-next-line no-console
  console.error(`${target}'s ${action} param is not defined`)
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
  const { icon } = MAPPING[target]
  if (icon) {
    return icon
  }
  error(target, 'icon')
  return ''
}

// get path from target
export function getPath(target) {
  const { path } = MAPPING[target]
  if (path) {
    return path
  }
  error(target, 'path')
  return ''
}

export function getFilterType(target) {
  const { filterType } = MAPPING[target]
  if (filterType) {
    return filterType
  }
  error(target, 'filterType')
  return ''
}

export function getQueryLimit(target) {
  const { queryLimit } = MAPPING[target]
  if (queryLimit) {
    return queryLimit
  }
  error(target, 'queryLimit')
  return 0
}

export function getPageSize(target) {
  const { pageSize } = MAPPING[target]
  if (pageSize) {
    return pageSize
  }
  error(target, 'pageSize')
  return 0
}

export function canChangeQueryLimit(target) {
  return [
    MENU_LEDGERS,
    MENU_ORDERS,
    MENU_TRADES,
    MENU_FPAYMENT,
  ].includes(target)
}

export default {
  canChangeQueryLimit,
  getIcon,
  getFilterType,
  getPageSize,
  getPath,
  getQueryLimit,
  getTarget,
  isValidTimeStamp,
  ORDERED_TARGETS,
  ROUTE_WHITELIST,
  TYPE_WHITELIST,
}
