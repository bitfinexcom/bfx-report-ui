import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'


import Icon from 'icons'
import Tooltip from 'ui/Tooltip'
// import { getTimezone } from 'state/base/selectors'

// import { formatDate } from 'state/utils'

const REPORTS_LINK = 'https://reporting.bitfinex.com/'

const LimitNote = ({ t }) => (
  <Tooltip
    usePortal
    targetClassName='affiliates_link'
    content={t('affiliatesearnings.dashboard_link')}
  >
    <a
      target='_blank'
      rel='noreferrer'
      href={REPORTS_LINK}
    >
      <Icon.AFFILIATES />
    </a>
  </Tooltip>
)

LimitNote.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(LimitNote)


// <Callout>
// {t('auth.note1')}
// <a href={config.KEY_URL} target='_blank' rel='noopener noreferrer'>
//   {config.KEY_URL.split('https://')[1]}
// </a>
// {t('auth.note2')}
// </Callout>
