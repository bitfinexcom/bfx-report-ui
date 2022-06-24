import _get from 'lodash/get'

export const getColumnsWidth = (state, section) => _get(state, ['columns', section])

export default {
  getColumnsWidth,
}
