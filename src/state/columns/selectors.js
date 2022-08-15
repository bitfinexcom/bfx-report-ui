import _get from 'lodash/get'

export const getColumnsData = state => state?.columns
export const getColumnsSum = state => getColumnsData(state)?.sum
export const getColumnsWidth = (state, section) => _get(state, ['columns', section])

export default {
  getColumnsSum,
  getColumnsData,
  getColumnsWidth,
}
