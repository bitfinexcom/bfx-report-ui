import React from 'react'
import { withTranslation } from 'react-i18next'
import { HTMLSelect } from '@blueprintjs/core'
import _keys from 'lodash/keys'

import FILTER_TYPES from 'var/filterTypes'

import { propTypes, defaultProps } from './FilterTypeSelector.props'

class FilterTypeSelector extends React.PureComponent {
  onChange = (e) => {
    const { value } = e.target
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { value } = this.props

    return (
      <HTMLSelect value={value} onChange={this.onChange} className='columns-filter-item-filter'>
        <option value='' />
        {_keys(FILTER_TYPES).map(filter => (
          <option key={filter} value={FILTER_TYPES[filter]}>{filter}</option>
        ))}
      </HTMLSelect>
    )
  }
}

FilterTypeSelector.propTypes = propTypes
FilterTypeSelector.defaultProps = defaultProps

export default withTranslation('translations')(FilterTypeSelector)
