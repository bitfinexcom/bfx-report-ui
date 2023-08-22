import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

const RefreshButton = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <Button
      onClick={onClick}
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
