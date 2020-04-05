import React from 'react'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'

import { propTypes, defaultProps } from './NoData.props'

const NoData = (props) => {
  const { t, title } = props

  return (
    <div className='no-data'>
      <div className='no-data-wrapper'>
        <Icon.WARNING />
        <div>{t(title || 'nodata')}</div>
      </div>
    </div>
  )
}

NoData.propTypes = propTypes
NoData.defaultProps = defaultProps

export default withTranslation('translations')(NoData)
