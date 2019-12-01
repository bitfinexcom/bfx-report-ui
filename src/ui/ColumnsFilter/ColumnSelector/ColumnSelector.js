import React from 'react'
import { withTranslation } from 'react-i18next'
import { HTMLSelect } from '@blueprintjs/core'
import _find from 'lodash/find'

import { platform } from 'var/config'

import SECTION_COLUMNS from './ColumnSelector.columns'
import { propTypes, defaultProps } from './ColumnSelector.props'

class ColumnSelector extends React.PureComponent {
  onColumnChange = (e) => {
    const { onChange } = this.props
    const { value } = e.target
    const columnDataType = this.getColumnDataType(value)

    onChange({
      column: value,
      dataType: columnDataType,
    })
  }

  getSectionColumns = () => {
    const { section } = this.props
    const columns = SECTION_COLUMNS[section] || []
    return columns.filter(column => column.filter && (!column.frameworkOnly || platform.showFrameworkMode))
  }

  getColumnDataType = (column) => {
    const columns = this.getSectionColumns()
    const { type } = _find(columns, { id: column }) || {}

    return type
  }

  render() {
    const { value, t } = this.props
    const columns = this.getSectionColumns()

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
