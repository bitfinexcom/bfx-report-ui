import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import Select from 'ui/Select'

const SideSelector = ({
  value,
  onChange,
  className,
}) => {
  const { t } = useTranslation()

  const items = useMemo(() => [
    { value: 0, label: t('floan.side.both') },
    { value: -1, label: t('floan.side.taken') },
    { value: 1, label: t('floan.side.provided') },
  ], [t])

  return (
    <Select
      value={value}
      items={items}
      onChange={onChange}
      className={className}
    />
  )
}

SideSelector.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

SideSelector.defaultProps = {
  value: '',
  className: '',
}

export default memo(SideSelector)
