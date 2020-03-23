import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'

const HeaderHelpLink = ({ t }) => (
  <a
    className='help-link'
    href='https://support.bitfinex.com/hc/en-us/articles/360008951853'
    target='_blank'
    rel='noopener noreferrer'
  >
    <Icon.INFO_CIRCLE />
    <span>{t('header.help')}</span>
  </a>
)

HeaderHelpLink.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(HeaderHelpLink)
