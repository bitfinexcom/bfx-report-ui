import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'

import constants from './constants'

const { TRUE, FALSE } = constants

const ReportTypeSelector = ({ onChange, t, value }) => {
  const items = [
    { value: FALSE, label: t('selector.report-type.win_loss') },
    { value: TRUE, label: t('selector.report-type.win_loss_vs_acc_balance') },
  ]

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className='bitfinex-select--report-type'
      popoverClassName='bitfinex-select-menu--report-type'
    />
  )
}

ReportTypeSelector.propTypes = {
  t: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withTranslation('translations')(ReportTypeSelector)
