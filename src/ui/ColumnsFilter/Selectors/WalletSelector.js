import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'

const WalletSelector = (props) => {
  const {
    className,
    onChange,
    t,
    value,
  } = props

  const items = [
    { value: 'exchange', label: t('wallets.header.exchange') },
    { value: 'margin', label: t('wallets.header.margin') },
    { value: 'funding', label: t('wallets.header.funding') },
    { value: 'contribution', label: t('wallets.header.token-sales') },
  ]

  return (
    <Select
      className={className}
      items={items}
      onChange={onChange}
      value={value}
    />
  )
}

WalletSelector.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

WalletSelector.defaultProps = {
  className: '',
  value: '',
}

export default withTranslation('translations')(WalletSelector)
