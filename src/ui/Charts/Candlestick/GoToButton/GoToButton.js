import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

const GoToButton = (props) => {
  const { onClick, t } = props

  return (
    <Tooltip
      usePortal={false}
      content={t('timeframe.go_to')}
      targetClassName='go-to-button'
    >
      <Icon.GO_TO onClick={onClick} />
    </Tooltip>
  )
}

GoToButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(GoToButton)
