import _map from 'lodash/map'
import _pick from 'lodash/pick'

export const prepareColumns = (columns) => _map(columns,
  column => _pick(column, ['id', 'width']))
