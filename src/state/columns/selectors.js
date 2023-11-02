import { get } from '@bitfinex/lib-js-util-base'

export const getColumnsWidth = (state, section) => get(state, ['columns', section])

export default {
  getColumnsWidth,
}
