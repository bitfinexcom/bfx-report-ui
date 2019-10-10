import React from 'react'
import { withTranslation } from 'react-i18next'
import { HTMLSelect } from '@blueprintjs/core'

import { FILTERS } from 'var/filterTypes'

import { propTypes, defaultProps } from './FilterTypeSelector.props'

class FilterTypeSelector extends React.PureComponent {
  onChange = (e) => {
    const { value } = e.target
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { value, t } = this.props

    return (
      <HTMLSelect value={value} onChange={this.onChange} className='columns-filter-item-filter'>
        <option value='' />
        {<option value={FILTERS.CONTAINS}>{t('columnsfilter.filters.contains')}</option>}
        {<option value={FILTERS.BEGINS_WITH}>{t('columnsfilter.filters.beginsWith')}</option>}
        {<option value={FILTERS.ENDS_WITH}>{t('columnsfilter.filters.endsWith')}</option>}
        {<option value={FILTERS.EQUAL_TO}>{t('columnsfilter.filters.equalTo')}</option>}
        {<option value={FILTERS.NOT_EQUAL_TO}>{t('columnsfilter.filters.notEqualTo')}</option>}
        {<option value={FILTERS.GREATER_THAN}>{t('columnsfilter.filters.greaterThan')}</option>}
        {<option value={FILTERS.LESS_THAN}>{t('columnsfilter.filters.lessThan')}</option>}
      </HTMLSelect>
    )
  }
}

FilterTypeSelector.propTypes = propTypes
FilterTypeSelector.defaultProps = defaultProps

export default withTranslation('translations')(FilterTypeSelector)
