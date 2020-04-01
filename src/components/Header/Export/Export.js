import React from 'react'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'

import { propTypes, defaultProps } from './Export.props'

const Export = (props) => {
  const { t, toggleDialog } = props

  return (
    <div className='export' onClick={toggleDialog}>
      <Icon.FILE_EXPORT />
      <span>{t('download.export')}</span>
    </div>
  )
}

Export.propTypes = propTypes
Export.defaultProps = defaultProps

export default withTranslation('translations')(Export)
