import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import types from 'state/taxReport/constants'
import { setTransactionsStrategy } from 'state/taxReport/actions'
import { getTransactionsStrategy } from 'state/taxReport/selectors'

import Select from 'ui/Select'

const items = [
  { value: types.STRATEGY_LIFO, label: 'LIFO' },
  { value: types.STRATEGY_FIFO, label: 'FIFO' },
]

const TaxStrategySelector = () => {
  const dispatch = useDispatch()
  const strategy = useSelector(getTransactionsStrategy)

  const handleChange = useCallback((value) => {
    dispatch(setTransactionsStrategy(value))
  }, [dispatch])

  return (
    <Select
      items={items}
      value={strategy}
      onChange={handleChange}
    />
  )
}

export default TaxStrategySelector
