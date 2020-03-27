import _isArray from 'lodash/isArray'

import Icons from 'icons'
import { platform } from 'var/config'

import queryType from './constants'

const {
  FILTER_ID,
  FILTER_PAIR,
  FILTER_SYMBOL,
  MENU_ACCOUNT_BALANCE,
  MENU_ACCOUNT_SUMMARY,
  MENU_AFFILIATES_EARNINGS,
  MENU_CANDLES,
  MENU_CONCENTRATION_RISK,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FEES_REPORT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_LOAN_REPORT,
  MENU_LOGINS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_ORDER_TRADES,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_TRADED_VOLUME,
  MENU_TRADES,
  MENU_WALLETS,
  MENU_WIN_LOSS,
} = queryType

export const TYPE_WHITELIST = [
  MENU_ACCOUNT_BALANCE,
  MENU_ACCOUNT_SUMMARY,
  MENU_AFFILIATES_EARNINGS,
  MENU_CANDLES,
  MENU_CONCENTRATION_RISK,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FEES_REPORT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_LOAN_REPORT,
  MENU_LOGINS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_ORDER_TRADES,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_TRADED_VOLUME,
  MENU_TRADES,
  MENU_WALLETS,
  MENU_WIN_LOSS,
]

export const ROUTE_WHITELIST = [
  MENU_ACCOUNT_BALANCE,
  MENU_ACCOUNT_SUMMARY,
  MENU_AFFILIATES_EARNINGS,
  MENU_CANDLES,
  MENU_CONCENTRATION_RISK,
  MENU_DERIVATIVES,
  MENU_FCREDIT,
  MENU_FEES_REPORT,
  MENU_FLOAN,
  MENU_FOFFER,
  MENU_FPAYMENT,
  MENU_LEDGERS,
  MENU_LOAN_REPORT,
  MENU_LOGINS,
  MENU_MOVEMENTS,
  MENU_ORDERS,
  MENU_ORDER_TRADES,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  MENU_POSITIONS_AUDIT,
  MENU_PUBLIC_FUNDING,
  MENU_PUBLIC_TRADES,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
  MENU_TICKERS,
  MENU_TRADES,
  MENU_TRADED_VOLUME,
  MENU_WALLETS,
  MENU_WIN_LOSS,
]

export const FILTERS_WHITELIST = [
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
]

// Should keep the order, which used in ExportTargetsSelector
const BASIC_TARGETS = [
  MENU_LEDGERS,
  MENU_TRADES,
  MENU_ORDERS,
  // MENU_ORDER_TRADES, // needs specific id
  MENU_MOVEMENTS,
  MENU_POSITIONS,
  MENU_POSITIONS_ACTIVE,
  // MENU_POSITIONS_AUDIT, // needs specific id
  MENU_WALLETS,
]
// MENU_FPAYMENT and MENU_AFFILIATES_EARNINGS only for framework mode
const FUNDING_TARGETS = platform.showFrameworkMode ? [
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
  MENU_FPAYMENT,
  MENU_AFFILIATES_EARNINGS,
] : [
  MENU_FOFFER,
  MENU_FLOAN,
  MENU_FCREDIT,
]
const PUBLIC_TARGETS = [
  MENU_PUBLIC_TRADES,
  MENU_PUBLIC_FUNDING,
  MENU_TICKERS,
  MENU_DERIVATIVES,
]

const CHART_REPORTS_TARGETS = [
  MENU_ACCOUNT_BALANCE,
  MENU_LOAN_REPORT,
  MENU_TRADED_VOLUME,
  MENU_FEES_REPORT,
  MENU_WIN_LOSS,
  MENU_SNAPSHOTS,
  MENU_TAX_REPORT,
]

export const ORDERED_TARGETS = [
  ...BASIC_TARGETS,
  ...FUNDING_TARGETS,
  ...PUBLIC_TARGETS,
  ...CHART_REPORTS_TARGETS,
]

export const NO_QUERY_LIMIT_TARGETS = [
  MENU_ORDER_TRADES,
  MENU_DERIVATIVES,
  MENU_FEES_REPORT,
  MENU_LOAN_REPORT,
  MENU_WALLETS,
  MENU_SNAPSHOTS,
  MENU_TRADED_VOLUME,
  MENU_TAX_REPORT,
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
  [MENU_ACCOUNT_BALANCE]: {
    icon: Icons.ACCOUNT_BALANCE,
    path: '/account_balance',
  },
  [MENU_ACCOUNT_SUMMARY]: {
    icon: Icons.FILE_TABLE,
    path: '/account_summary',
  },
  [MENU_CANDLES]: {
    icon: Icons.LOOP,
    path: '/candles',
    queryLimit: 500,
  },
  [MENU_CONCENTRATION_RISK]: {
    icon: Icons.DISK,
    path: '/concentration_risk',
  },
  [MENU_DERIVATIVES]: {
    icon: Icons.DERIVATIVES,
    filterType: FILTER_PAIR,
    path: '/derivatives',
  },
  [MENU_FCREDIT]: {
    icon: Icons.NOTEBOOK,
    path: '/credits',
    filterType: FILTER_SYMBOL,
    queryLimit: 500,
    pageSize: 125,
  },
  [MENU_FEES_REPORT]: {
    icon: Icons.FILE_TABLE,
    path: '/fees_report',
  },
  [MENU_FLOAN]: {
    icon: Icons.NOTEBOOK,
    path: '/loans',
    filterType: FILTER_SYMBOL,
    queryLimit: 500,
    pageSize: 125,
  },
  [MENU_FOFFER]: {
    icon: Icons.NOTEBOOK,
    path: '/offers',
    filterType: FILTER_SYMBOL,
    queryLimit: 500,
    pageSize: 125,
  },
  [MENU_FPAYMENT]: {
    icon: Icons.NOTEBOOK,
    path: '/payments',
    filterType: FILTER_SYMBOL,
    // queryLimit: 500,
    pageSize: 125,
  },
  [MENU_AFFILIATES_EARNINGS]: {
    icon: Icons.NOTEBOOK,
    path: '/affiliates',
    filterType: FILTER_SYMBOL,
    // queryLimit: 500,
    pageSize: 125,
  },
  [MENU_LEDGERS]: {
    icon: Icons.NOTEBOOK,
    path: ['/ledgers', '/'],
    filterType: FILTER_SYMBOL,
    // queryLimit: 500,
    pageSize: 125,
  },
  [MENU_LOAN_REPORT]: {
    icon: Icons.STICKY_NOTES,
    path: '/loan_report',
  },
  [MENU_LOGINS]: {
    icon: Icons.SIGN_IN,
    path: '/logins',
    queryLimit: 50, // 250 maximum
    pageSize: 50,
  },
  [MENU_ORDERS]: {
    icon: Icons.ORDERS,
    path: '/orders',
    filterType: FILTER_PAIR,
    // queryLimit: 500,
    pageSize: 125,
  },
  [MENU_ORDER_TRADES]: {
    icon: Icons.ORDERS,
    path: '/order_trades',
    filterType: FILTER_ID,
  },
  [MENU_TICKERS]: {
    icon: Icons.TICKERS,
    path: '/tickers',
    filterType: FILTER_PAIR,
    queryLimit: 250,
    pageSize: 125,
  },
  [MENU_TRADES]: {
    icon: Icons.LOOP,
    path: '/trades',
    filterType: FILTER_PAIR,
    // queryLimit: 1000,
    pageSize: 125,
  },
  [MENU_MOVEMENTS]: {
    icon: Icons.MOVEMENTS,
    path: '/movements',
    filterType: FILTER_SYMBOL,
    queryLimit: 25,
    pageSize: 25,
  },
  [MENU_WIN_LOSS]: {
    icon: Icons.SLIDER_CIRCLE_H,
    path: '/average_win_loss',
  },
  [MENU_PUBLIC_FUNDING]: {
    icon: Icons.LOOP,
    path: '/pub_trades_funding',
    filterType: FILTER_SYMBOL,
    queryLimit: 5000,
    pageSize: 125,
  },
  [MENU_PUBLIC_TRADES]: {
    icon: Icons.LOOP,
    path: '/pub_trades',
    filterType: FILTER_PAIR,
    queryLimit: 5000,
    pageSize: 125,
  },
  [MENU_POSITIONS]: {
    icon: Icons.LIST_NUMBER,
    path: '/positions',
    filterType: FILTER_PAIR,
    queryLimit: 50,
    pageSize: 25,
  },
  [MENU_POSITIONS_ACTIVE]: {
    icon: Icons.LIST_NUMBER,
    path: '/activepositions',
    filterType: FILTER_PAIR,
    queryLimit: 50,
    pageSize: 25,
  },
  [MENU_POSITIONS_AUDIT]: {
    icon: Icons.LIST_NUMBER,
    path: '/positions_audit',
    filterType: FILTER_ID,
    queryLimit: 250,
    pageSize: 125,
  },
  [MENU_SNAPSHOTS]: {
    icon: Icons.COLLAPSE_WIDE,
    path: ['/snapshots_positions', '/snapshots_tickers', '/snapshots_wallets'],
  },
  [MENU_TAX_REPORT]: {
    icon: Icons.FEES_REPORT,
    path: '/tax_report',
  },
  [MENU_TRADED_VOLUME]: {
    icon: Icons.TRADE_VOLUME,
    path: '/traded_volume',
  },
  [MENU_WALLETS]: {
    icon: Icons.WALLET,
    path: '/wallets',
  },
}

export const PATHMAP = {}
ROUTE_WHITELIST.forEach((key) => {
  const { path } = MAPPING[key]

  if (_isArray(path)) {
    path.forEach((subpath) => {
      PATHMAP[subpath] = key
    })
  } else {
    PATHMAP[path] = key
  }
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
export function getTarget(link, defaultValue = true) {
  const baseLink = `/${link.split('/')[1]}`
  const target = PATHMAP[baseLink]

  return defaultValue
    ? target || MENU_LEDGERS
    : target
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
  return queryLimit || queryType.DEFAULT_QUERY_LIMIT
}

export function getPageSize(target) {
  const { pageSize } = MAPPING[target]
  if (pageSize) {
    return pageSize
  }
  error(target, 'pageSize')
  return 0
}

export default {
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
  NO_QUERY_LIMIT_TARGETS,
}
