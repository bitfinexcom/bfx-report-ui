import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import {
  Button,
  Position,
  Tooltip,
} from '@blueprintjs/core'

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
      icon='refresh'
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
