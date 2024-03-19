import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

const RefreshButton = ({ onClick, disabled }) => {
  const { t } = useTranslation()

  const handleClick = () => {
    tracker.trackEvent('Filter')
    onClick()
  }

  return (
    <Button
      disabled={disabled}
      onClick={handleClick}
      intent={Intent.SUCCESS}
      className='refresh-button'
    >
      {t('columnsfilter.title')}
    </Button>
  )
}

RefreshButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
}

RefreshButton.defaultProps = {
  disabled: false,
}

export default memo(RefreshButton)
