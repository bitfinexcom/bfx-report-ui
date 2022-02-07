import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

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

export default withTranslation('translations')(Export)
