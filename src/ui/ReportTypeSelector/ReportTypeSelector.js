import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'

import Select from 'ui/Select'

import { getItems } from './ReportTypeSelector.helpers'

const ReportTypeSelector = ({
  value,
  section,
  onChange,
  className,
}) => {
  const items = useMemo(() => getItems(section), [section])
  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className={className}
      type={'Select Report Type'}
      popoverClassName='bitfinex-select-menu--report-type'
    />
  )
}

ReportTypeSelector.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
}

ReportTypeSelector.defaultProps = {
  className: '',
}

export default memo(ReportTypeSelector)
