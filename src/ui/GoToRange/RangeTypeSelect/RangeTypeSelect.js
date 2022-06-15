import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import _memoize from 'lodash/memoize'

import Select from 'ui/Select'
import goToRangeTypes from 'state/goToRange/constants'

import { propTypes } from './RangeTypeSelect.props'

const {
  DATE,
  CUSTOM,
} = goToRangeTypes

class RangeTypeSelect extends PureComponent {
  constructor() {
    super()

    this.getItems = _memoize(this.getItems)
  }

  getItems = (t) => ([
    { value: DATE, label: t('timeframe.date') },
    { value: CUSTOM, label: t('timeframe.custom_range') },
  ])

  render() {
    const { onChange, range, t } = this.props

    const items = this.getItems(t)

    return (
      <div className='range-type-select-row'>
        <Select
          className='range-type-select'
          items={items}
          onChange={onChange}
          value={range}
        />
      </div>
    )
  }
}

RangeTypeSelect.propTypes = propTypes

export default withTranslation('translations')(RangeTypeSelect)
