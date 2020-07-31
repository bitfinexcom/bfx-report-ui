import React from 'react'
import { withTranslation } from 'react-i18next'
import _find from 'lodash/find'

import Select from 'ui/Select'
import { platform } from 'var/config'

import SECTION_COLUMNS from './ColumnSelector.columns'
import { propTypes, defaultProps } from './ColumnSelector.props'

class ColumnSelector extends React.PureComponent {
  onColumnChange = (column) => {
    const { onChange } = this.props
    const columnData = this.getColumnData(column)
    const {
      id, type, dataType, ...rest
    } = columnData

    onChange({
      ...rest,
      column: id,
      dataType: type,
    })
  }

  getSectionColumns = () => {
    const { section } = this.props
    const columns = SECTION_COLUMNS[section] || []
    return columns.filter(column => column.filter && (!column.frameworkOnly || platform.showFrameworkMode))
  }

  getColumnData = (id) => {
    const columns = this.getSectionColumns()
    return _find(columns, { id }) || {}
  }

  render() {
    const { value, t } = this.props
    const columns = this.getSectionColumns()

    const items = columns.map(({ id, name }) => ({
      value: id,
      label: t(`column.${name}`),
    }))

    return (
      <Select
        className='columns-filter-item-column'
        filterable={false}
        items={items}
        onChange={this.onColumnChange}
        value={value}
      />
    )
  }
}

ColumnSelector.propTypes = propTypes
ColumnSelector.defaultProps = defaultProps

export default withTranslation('translations')(ColumnSelector)
