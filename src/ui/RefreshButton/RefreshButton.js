import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

const RefreshButton = (props) => {
  const { onClick, t } = props

  return (
    <Tooltip
      content={t('timeframe.refresh')}
      usePortal={false}
      targetClassName='refresh-button'
    >
      <Icon.REFRESH_DOUBLE onClick={onClick} />
    </Tooltip>
  )
}

RefreshButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(RefreshButton)
