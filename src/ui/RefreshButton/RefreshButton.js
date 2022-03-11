import React, { memo } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

const RefreshButton = ({ onClick, t }) => (
  <Tooltip
    usePortal={false}
    content={t('timeframe.refresh')}
    targetClassName='refresh-button'
  >
    <Icon.REFRESH_DOUBLE onClick={onClick} />
  </Tooltip>
)

RefreshButton.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default withTranslation('translations')(memo(RefreshButton))
