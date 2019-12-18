import queryType from '../constants'

export const TYPE_WHITELIST = [
  queryType.MENU_LEDGERS,
]

export function getPageSize() {
  return 5
}

export default {
  getPageSize,
}
