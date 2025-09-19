import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

const WalletSelector = ({
  value,
  onChange,
  className,
}) => {
  const { t } = useTranslation()

  const items = useMemo(() => [
    { value: 'exchange', label: t('wallets.header.exchange') },
    { value: 'margin', label: t('wallets.header.margin') },
    { value: 'funding', label: t('wallets.header.funding') },
    { value: 'contribution', label: t('wallets.header.token-sales') },
    { value: 'creditline', label: t('wallets.header.credit-line') },
  ], [t])

  return (
    <Select
      items={items}
      value={value}
      onChange={onChange}
      className={className}
    />
  )
}

WalletSelector.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

WalletSelector.defaultProps = {
  value: '',
  className: '',
}

export default memo(WalletSelector)
