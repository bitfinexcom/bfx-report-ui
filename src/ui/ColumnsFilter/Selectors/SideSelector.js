import React, { memo, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import _includes from 'lodash/includes'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

const SideSelector = ({
  value,
  onChange,
  className,
  disabledValues,
}) => {
  const { t } = useTranslation()

  const items = useMemo(() => [
    { value: 0, label: t('floan.side.both') },
    { value: -1, label: t('floan.side.taken') },
    { value: 1, label: t('floan.side.provided') },
  ], [t])

  const itemDisabled = useCallback(
    item => _includes(disabledValues, item.value), [disabledValues],
  )

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className={className}
      itemDisabled={itemDisabled}
    />
  )
}

SideSelector.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabledValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
}

SideSelector.defaultProps = {
  value: '',
  className: '',
  disabledValues: [],
}

export default memo(SideSelector)
