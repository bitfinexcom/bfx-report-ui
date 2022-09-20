import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/Select'

import { getItems } from './ReportTypeSelector.helpers'

const ReportTypeSelector = ({ onChange, section, value }) => {
  const items = getItems(section)
  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className='bitfinex-select--report-type'
      popoverClassName='bitfinex-select-menu--report-type'
    />
  )
}

ReportTypeSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
}

export default memo(ReportTypeSelector)
