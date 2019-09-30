import _get from 'lodash/get'

export const getFilters = (state, section) => _get(state, ['filters', section])

export default {
  getFilters,
}
