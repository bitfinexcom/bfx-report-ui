import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

const AFFILIATES_LINK = 'https://affiliate.bitfinex.com/'

const AffiliatesLink = ({ t }) => (
  <Tooltip
    usePortal
    targetClassName='affiliates_link'
    content={t('affiliatesearnings.dashboard_link')}
  >
    <a
      target='_blank'
      href={AFFILIATES_LINK}
      rel='noopener noreferrer'
    >
      <Icon.AFFILIATES />
    </a>
  </Tooltip>
)

AffiliatesLink.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(AffiliatesLink)
