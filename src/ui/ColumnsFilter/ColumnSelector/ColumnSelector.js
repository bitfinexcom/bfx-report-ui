import React from 'react'
import { withTranslation } from 'react-i18next'
import { HTMLSelect } from '@blueprintjs/core'

import SECTION_COLUMNS from './ColumnSelector.columns'
import { propTypes, defaultProps } from './ColumnSelector.props'

const getSectionColumns = section => SECTION_COLUMNS[section] || []

class ColumnSelector extends React.PureComponent {
  onColumnChange = (e) => {
    const { onChange } = this.props
    const { value } = e.target
    onChange(value)
  }

  render() {
    const { section, value, t } = this.props
    const columns = getSectionColumns(section)

    return (
      <HTMLSelect value={value} onChange={this.onColumnChange} className='columns-filter-item-column'>
        <option value='' />
        {columns.map((column) => {
          const { id, name } = column
          const columnName = t(`column.${name}`)
          return <option key={id} value={id}>{columnName}</option>
        })}
      </HTMLSelect>
    )
  }
}

ColumnSelector.propTypes = propTypes
ColumnSelector.defaultProps = defaultProps

export default withTranslation('translations')(ColumnSelector)
