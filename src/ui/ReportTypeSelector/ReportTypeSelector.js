import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/Select'

import constants from './constants'
import { winLossItems } from './ReportTypeSelector.helpers'

const ReportTypeSelector = ({ onChange, value }) => (
  <Select
    value={value}
    items={winLossItems}
    onChange={onChange}
    className='bitfinex-select--report-type'
    popoverClassName='bitfinex-select-menu--report-type'
  />
)

ReportTypeSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

ReportTypeSelector.defaultProps = {
  value: constants.WIN_LOSS,
}

export default memo(ReportTypeSelector)
