import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

const SyncButton = (props) => {
  const { onClick, t } = props

  return (
    <Tooltip
      content={t('preferences.sync.title')}
      usePortal={false}
      targetClassName='sync-pref-button'
    >
      <Icon.TRAY_IMPORT onClick={onClick} />
    </Tooltip>
  )
}

SyncButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(SyncButton)
