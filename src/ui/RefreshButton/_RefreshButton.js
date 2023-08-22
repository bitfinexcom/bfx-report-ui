import React from 'react'
import { Button, Intent } from '@blueprintjs/core'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

const RefreshButton = (props) => {
  const { onClick, t } = props

  return (
    <Button
      onClick={onClick}
      className='refresh-button'
      intent={Intent.SUCCESS}
    >
      {t('columnsfilter.title')}
    </Button>
  )
}

RefreshButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(RefreshButton)
