import React from 'react'
import { withTranslation } from 'react-i18next'

import Select from 'ui/Select'
import { FILTERS } from 'var/filterTypes'
import DATA_TYPES from 'var/dataTypes'

import { propTypes, defaultProps } from './FilterTypeSelector.props'

const {
  NUMBER,
  INTEGER,
  STRING,
  DATE,
} = DATA_TYPES

class FilterTypeSelector extends React.PureComponent {
  onChange = (value) => {
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const {
      dataType, isSelect, value, t,
    } = this.props

    const dateTypes = (dataType === DATE)
      ? [
        { value: FILTERS.GREATER_THAN, label: t('columnsfilter.filters.after') },
        { value: FILTERS.LESS_THAN, label: t('columnsfilter.filters.before') },
      ]
      : []
    const stringTypes = (dataType === STRING)
      ? [
        { value: FILTERS.CONTAINS, label: t('columnsfilter.filters.contains') },
        { value: FILTERS.BEGINS_WITH, label: t('columnsfilter.filters.beginsWith') },
        { value: FILTERS.ENDS_WITH, label: t('columnsfilter.filters.endsWith') },
      ]
      : []
    const equalityTypes = [
      { value: FILTERS.EQUAL_TO, label: t('columnsfilter.filters.equalTo') },
      { value: FILTERS.NOT_EQUAL_TO, label: t('columnsfilter.filters.notEqualTo') },
    ]
    const numberTypes = (dataType === NUMBER || dataType === INTEGER)
      ? [
        { value: FILTERS.GREATER_THAN, label: t('columnsfilter.filters.greaterThan') },
        { value: FILTERS.GREATER_THAN_EQUAL, label: t('columnsfilter.filters.greaterThanEqual') },
        { value: FILTERS.LESS_THAN, label: t('columnsfilter.filters.lessThan') },
        { value: FILTERS.LESS_THAN_EQUAL, label: t('columnsfilter.filters.lessThanEqual') },
      ]
      : []

    const items = isSelect
      ? equalityTypes
      : [
        ...dateTypes,
        ...stringTypes,
        ...equalityTypes,
        ...numberTypes,
      ]

    return (
      <Select
        className='columns-filter-item-filter'
        filterable={false}
        items={items}
        onChange={this.onChange}
        value={value}
      />
    )
  }
}

FilterTypeSelector.propTypes = propTypes
FilterTypeSelector.defaultProps = defaultProps

export default withTranslation('translations')(FilterTypeSelector)
