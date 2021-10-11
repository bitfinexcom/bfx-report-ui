import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const { TRUE, FALSE } = constants

const UnrealizedProfitSelector = ({ onChange, t, value }) => {
  const items = [
    { value: TRUE, label: t('selector.unrealized-profits.yes') },
    { value: FALSE, label: t('selector.unrealized-profits.no') },
  ]

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className='bitfinex-select--unrealized-profit'
      popoverClassName='bitfinex-select-menu--unrealized-profit'
    />
  )
}

UnrealizedProfitSelector.propTypes = {
  t: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withTranslation('translations')(UnrealizedProfitSelector)
