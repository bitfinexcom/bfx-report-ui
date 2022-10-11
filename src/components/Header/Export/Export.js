import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Icon from 'icons'

const Export = ({ t, toggleDialog }) => (
  <div
    className='export'
    onClick={toggleDialog}
  >
    <Icon.FILE_EXPORT />
    <span>
      {t('download.export')}
    </span>
  </div>
)

Export.propTypes = {
  t: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

export default memo(Export)
