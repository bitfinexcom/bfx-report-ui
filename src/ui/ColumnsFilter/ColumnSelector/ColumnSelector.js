import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import _find from 'lodash/find'

import Select from 'ui/Select'
import config from 'config'

import SECTION_COLUMNS from './ColumnSelector.columns'

class ColumnSelector extends React.PureComponent {
  static propTypes = {
    section: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: '',
  }

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
    return columns.filter(column => column.filter && (!column.frameworkOnly || config.showFrameworkMode))
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
        value={value}
        items={items}
        filterable={false}
        onChange={this.onColumnChange}
        className='columns-filter-item-column'
      />
    )
  }
}

export default withTranslation('translations')(ColumnSelector)
