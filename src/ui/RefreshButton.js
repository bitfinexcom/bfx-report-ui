import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import {
  Button,
  Position,
  Tooltip,
} from '@blueprintjs/core'

const RefreshButton = ({ intl, handleClickRefresh }) => (
  <Tooltip
    content={(
      <span>
        {intl.formatMessage({ id: 'timeframe.refresh' })}
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
  intl: intlShape.isRequired,
  handleClickRefresh: PropTypes.func.isRequired,
}

RefreshButton.defaultProps = {}

export default injectIntl(RefreshButton)
