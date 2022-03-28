import React from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import Icon from 'icons'
import Tooltip from 'ui/Tooltip'

const ClearFiltersButton = (props) => {
  const { onClick, t } = props

  return (
    <Tooltip
      content={t('symbols.clear_symbols')}
      usePortal={false}
      targetClassName='clear-filters-button'
    >
      <Icon.FILTER_CLEAR onClick={onClick} />
    </Tooltip>
  )
}

ClearFiltersButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

export default withTranslation('translations')(ClearFiltersButton)
