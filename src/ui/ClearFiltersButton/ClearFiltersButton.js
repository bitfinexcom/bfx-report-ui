import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'
import { tracker } from 'utils/trackers'

const ClearFiltersButton = ({ onClick, t }) => {
  const handleClick = () => {
    tracker.trackEvent('Clear Symbols')
    onClick()
  }
  return (
    <Tooltip
      usePortal={false}
      content={t('symbols.clear_symbols')}
      targetClassName='clear-filters-button'
    >
      <Icon.FILTER_CLEAR onClick={handleClick} />
    </Tooltip>
  )
}

ClearFiltersButton.propTypes = {
  t: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default withTranslation('translations')(ClearFiltersButton)
