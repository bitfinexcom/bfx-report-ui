import React from 'react'
import { withTranslation } from 'react-i18next'
import { HTMLSelect } from '@blueprintjs/core'
import _keys from 'lodash/keys'

import { propTypes, defaultProps } from './FilterTypeSelector.props'

const FILTER_TYPES = {
  GT: '$gt',
  GTE: '$gte',
  LT: '$lt',
  LTE: '$lte',
  NOT: '$not',
  LIKE: '$like',
  EQ: '$eq',
  NE: '$ne',
  IN: '$in',
  NIN: '$nin',
  IS_NULL: '$isNull',
  IS_NOT_NULL: '$isNotNull',
}

class FilterTypeSelector extends React.PureComponent {
  render() {
    const { value, onChange } = this.props

    return (
      <HTMLSelect value={value} onChange={onChange}>
        {_keys(FILTER_TYPES).map(filter => <option key={filter} value={filter}>{filter}</option>)}
      </HTMLSelect>
    )
  }
}

FilterTypeSelector.propTypes = propTypes
FilterTypeSelector.defaultProps = defaultProps

export default withTranslation('translations')(FilterTypeSelector)
