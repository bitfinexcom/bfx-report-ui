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
  },
  [MENU_FLOAN]: {
    icon: 'book',
    path: '/loans',
    filterType: 'symbol',
  },
  [MENU_FOFFER]: {
    icon: 'book',
    path: '/offers',
    filterType: 'symbol',
  },
  [MENU_LEDGERS]: {
    icon: 'book',
    path: '/ledgers',
    filterType: 'symbol',
  },
  [MENU_ORDERS]: {
    icon: 'flows',
    path: '/orders',
    filterType: 'pair',
  },
  [MENU_TRADES]: {
    icon: 'exchange',
    path: '/trades',
    filterType: 'pair',
  },
  [MENU_DEPOSITS]: {
    icon: 'add-to-folder',
    path: '/deposits',
    filterType: 'symbol',
  },
  [MENU_WITHDRAWALS]: {
    icon: 'folder-shared-open',
    path: '/withdrawals',
    filterType: 'symbol',
  },
  [MENU_PUBLIC_TRADES]: {
    icon: 'exchange',
    path: '/pub_trades',
    filterType: 'pair',
  },
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

export default {
  getIcon,
  getFilterType,
  getPath,
  getTarget,
  isValidTimeStamp,
  ROUTE_WHITELIST,
  TYPE_WHITELIST,
}
