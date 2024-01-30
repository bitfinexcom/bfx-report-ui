import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Icon from 'icons'
import { tracker } from 'utils/trackers'

const Export = ({ t, toggleDialog }) => {
  const toggleExport = () => {
    tracker.trackEvent('Export', 'Navigation')
    toggleDialog()
  }

  return (
    <div
      className='export'
      onClick={() => toggleExport()}
    >
      <Icon.FILE_EXPORT />
      <span>
        {t('download.export')}
      </span>
    </div>
  )
}

Export.propTypes = {
  t: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

export default memo(Export)
