import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'

const NoMerchant = ({ t }) => (
  <div className='no-data'>
    <div className='no-data-wrapper'>
      <Icon.WARNING />
      <>
        {t('no_merchant.title')}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://pay.bitfinex.com/'
        >
          {t('no_merchant.link')}
        </a>
        .
      </>
    </div>
  </div>
)

NoMerchant.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(NoMerchant)
