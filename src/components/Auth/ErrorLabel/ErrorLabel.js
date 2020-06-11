import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'

const ErrorLabel = (props) => {
  const { t, text } = props

  if (!text) {
    return null
  }

  return (
    <div className='error-label'>
      <Icon.EXCLAMATION_CIRCLE className='error-label-icon' />
      <span className='error-label-text'>{t(text)}</span>
    </div>
  )
}

ErrorLabel.propTypes = {
  t: PropTypes.func.isRequired,
  text: PropTypes.string,
}

ErrorLabel.defaultProps = {
  text: '',
}

export default withTranslation('translations')(ErrorLabel)
