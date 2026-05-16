import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

const AFFILIATES_LINK = 'https://affiliate.bitfinex.com/'

const AffiliatesLink = () => {
  const { t } = useTranslation()

  return (
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
}

export default AffiliatesLink
