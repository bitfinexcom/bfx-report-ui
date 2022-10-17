import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'

const NoMerchant = ({ t }) => (
  <div className='no-data'>
    <div className='no-data-wrapper'>
      <Icon.WARNING />
      <div>
        This section is only available for
        {' '}
        <a href='https://pay.bitfinex.com/'>
          merchant accounts
        </a>
        .
      </div>
    </div>
  </div>
)

NoMerchant.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(NoMerchant)
