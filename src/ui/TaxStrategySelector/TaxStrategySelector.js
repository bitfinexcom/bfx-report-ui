import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import types from 'state/taxReport/constants'
import { setTransactionsStrategy } from 'state/taxReport/actions'
import { getTransactionsStrategy } from 'state/taxReport/selectors'

import Select from 'ui/Select'

const items = [
  { value: types.STRATEGY_LIFO, label: 'LIFO' },
  { value: types.STRATEGY_FIFO, label: 'FIFO' },
]

const TaxStrategySelector = ({ className }) => {
  const dispatch = useDispatch()
  const strategy = useSelector(getTransactionsStrategy)

  const handleChange = useCallback((value) => {
    dispatch(setTransactionsStrategy(value))
  }, [dispatch])

  return (
    <Select
      items={items}
      value={strategy}
      className={className}
      onChange={handleChange}
    />
  )
}

TaxStrategySelector.propTypes = {
  className: PropTypes.string,
}

TaxStrategySelector.defaultProps = {
  className: '',
}

export default memo(TaxStrategySelector)
