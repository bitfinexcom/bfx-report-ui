import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

const RefreshButton = ({ onClick }) => {
  const { t } = useTranslation()

  const handleClick = () => {
    tracker.trackEvent('Filter')
    onClick()
  }

  return (
    <Button
      onClick={handleClick}
      intent={Intent.SUCCESS}
      className='refresh-button'
    >
      {t('columnsfilter.title')}
    </Button>
  )
}

RefreshButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default memo(RefreshButton)
