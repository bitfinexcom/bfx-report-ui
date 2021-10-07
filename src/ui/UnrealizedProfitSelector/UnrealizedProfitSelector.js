import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const { TRUE, FALSE } = constants

const UnrealizedProfitSelector = (props) => {
  const { onChange, t, value } = props

  const items = [
    { value: TRUE, label: t('selector.unrealized-profits.yes') },
    { value: FALSE, label: t('selector.unrealized-profits.no') },
  ]

  return (
    <Select
      className='bitfinex-select--timeframe'
      popoverClassName='bitfinex-select-menu--timeframe'
      value={value}
      items={items}
      onChange={onChange}
    />
  )
}

UnrealizedProfitSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
UnrealizedProfitSelector.defaultProps = {}

export default withTranslation('translations')(UnrealizedProfitSelector)
