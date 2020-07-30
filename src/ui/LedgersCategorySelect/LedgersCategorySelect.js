import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import _memoize from 'lodash/memoize'

import Select from 'ui/Select'

const getLedgersCategories = _memoize((t) => ([
  { value: '', label: t('selector.all') },
  { value: 5, label: t('ledgers.categories.exchange') },
  { value: 22, label: t('ledgers.categories.position_modified') },
  { value: 23, label: t('ledgers.categories.position_claim') },
  { value: 25, label: t('ledgers.categories.position_transfer') },
  { value: 26, label: t('ledgers.categories.position_swap') },
  { value: 27, label: t('ledgers.categories.position_funding_cost') },
  { value: 28, label: t('ledgers.categories.interest_payment') },
  { value: 31, label: t('ledgers.categories.settlement') },
  { value: 51, label: t('ledgers.categories.transfer') },
  { value: 101, label: t('ledgers.categories.deposit') },
  { value: 104, label: t('ledgers.categories.withdrawal') },
  { value: 105, label: t('ledgers.categories.cancelled_withdrawal') },
  { value: 201, label: t('ledgers.categories.trading_fee') },
  { value: 204, label: t('ledgers.categories.hidden_order_fee') },
  { value: 207, label: t('ledgers.categories.otc_trade_fee') },
  { value: 222, label: t('ledgers.categories.swap_fee') },
  { value: 224, label: t('ledgers.categories.claiming_fee') },
  { value: 226, label: t('ledgers.categories.margin_funding_charge') },
  { value: 228, label: t('ledgers.categories.margin_funding_fee') },
  { value: 241, label: t('ledgers.categories.affiliate_rebate') },
  { value: 243, label: t('ledgers.categories.ethfx_loyalty_fee') },
  { value: 251, label: t('ledgers.categories.deposit_fee') },
  { value: 254, label: t('ledgers.categories.withdrawal_fee') },
  { value: 255, label: t('ledgers.categories.withdrawal_express_fee') },
  { value: 258, label: t('ledgers.categories.miner_fee') },
  { value: 262, label: t('ledgers.categories.staking_payment') },
  { value: 401, label: t('ledgers.categories.adjustment') },
  { value: 501, label: t('ledgers.categories.expense') },
  { value: 905, label: t('ledgers.categories.currency_conversion') },
  { value: 907, label: t('ledgers.categories.monthly_profit_payment') },
  { value: 911, label: t('ledgers.categories.losses') },
]))

const LedgersCategorySelect = (props) => {
  const {
    className,
    onChange,
    t,
    value,
  } = props

  return (
    <Select
      className={className}
      items={getLedgersCategories(t)}
      onChange={onChange}
      value={value}
    />
  )
}

LedgersCategorySelect.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

LedgersCategorySelect.defaultProps = {
  className: '',
  value: '',
}

export default withTranslation('translations')(LedgersCategorySelect)
