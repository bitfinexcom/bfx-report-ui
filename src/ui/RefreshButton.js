import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { Button, Position } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import Tooltip from 'ui/Tooltip'

const RefreshButton = ({ handleClickRefresh, t }) => (
  <Tooltip
    content={(
      <span>
        {t('timeframe.refresh')}
      </span>
      )}
    position={Position.TOP}
    usePortal={false}
  >
    <Button
      icon={IconNames.REFRESH}
      onClick={handleClickRefresh}
    />
  </Tooltip>
)

RefreshButton.propTypes = {
  handleClickRefresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

RefreshButton.defaultProps = {}

export default withTranslation('translations')(RefreshButton)
