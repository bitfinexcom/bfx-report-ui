import React, { memo, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import _includes from 'lodash/includes'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

const WalletSelector = ({
  value,
  onChange,
  className,
  disabledValues,
}) => {
  const { t } = useTranslation()

  const items = useMemo(() => [
    { value: 'exchange', label: t('wallets.header.exchange') },
    { value: 'margin', label: t('wallets.header.margin') },
    { value: 'funding', label: t('wallets.header.funding') },
    { value: 'contribution', label: t('wallets.header.token-sales') },
    { value: 'creditline', label: t('wallets.header.credit-line') },
  ], [t])

  const itemDisabled = useCallback(
    item => _includes(disabledValues, item.value), [disabledValues],
  )

  return (
    <Select
      items={items}
      value={value}
      onChange={onChange}
      className={className}
      itemDisabled={itemDisabled}
    />
  )
}

WalletSelector.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabledValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
}

WalletSelector.defaultProps = {
  value: '',
  className: '',
  disabledValues: [],
}

export default memo(WalletSelector)
