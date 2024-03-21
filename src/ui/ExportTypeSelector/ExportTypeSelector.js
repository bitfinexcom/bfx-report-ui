import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'

const ExportTypeSelector = ({ onChange, t, value }) => {
  const items = [
    { value: false, label: t('download.exportAsCsv') },
    { value: true, label: t('download.exportAsPdf') },
  ]

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      // type='Export Format'
      // className='bitfinex-select--unrealized-profit'
      // popoverClassName='bitfinex-select-menu--unrealized-profit'
    />
  )
}

ExportTypeSelector.propTypes = {
  t: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withTranslation('translations')(ExportTypeSelector)
