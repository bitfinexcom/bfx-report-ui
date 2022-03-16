import React from 'react'
import _map from 'lodash/map'

import Select from 'ui/Select'

import { propTypes, defaultProps } from './IndicatorsSelect.props'
import INDICATORS from './var'

const IndicatorsSelect = (props) => {
  const { value, onChange } = props
  const items = _map(INDICATORS, indicator => indicator)

  return (
    <Select
      className='bitfinex-select--indicatorsSelect'
      popoverClassName='bitfinex-select-menu--indicatorsSelect'
      value={value}
      items={items}
      onChange={onChange}
    />
  )
}

IndicatorsSelect.propTypes = propTypes
IndicatorsSelect.defaultProps = defaultProps

export default IndicatorsSelect
