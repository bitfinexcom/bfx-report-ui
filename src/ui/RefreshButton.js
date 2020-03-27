import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Position } from '@blueprintjs/core'

import Icon from 'icons'

import Tooltip from 'ui/Tooltip'

const RefreshButton = ({ handleClickRefresh: onClick, t }) => (
  <span className='refresh-button'>
    <Tooltip
      content={(
        <span>
          {t('timeframe.refresh')}
        </span>
      )}
      position={Position.TOP}
      usePortal={false}
    >
      <Icon.REFRESH_DOUBLE
        onClick={onClick}
        className='refresh-button-icon'
      />
    </Tooltip>
  </span>
)

RefreshButton.propTypes = {
  handleClickRefresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

RefreshButton.defaultProps = {}

export default withTranslation('translations')(RefreshButton)
