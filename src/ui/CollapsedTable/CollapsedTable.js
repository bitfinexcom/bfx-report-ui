import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import _times from 'lodash/times'

class CollapsedTable extends PureComponent {
  render() {
    const { numRows, tableColumns, t } = this.props

    return (
      <div className='collapsed-table'>
        {_times(numRows, rowIndex => (
          <div className='collapsed-table-item' key={rowIndex}>
            {tableColumns.map((column) => {
              const {
                id, name, nameStr, renderer,
              } = column
              const cell = renderer(rowIndex)

              return (
                <div key={id}>
                  <div>{nameStr || t(name)}</div>
                  <div>{cell.props.children}</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
}

const TABLE_COLUMNS_PROPS = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  nameStr: PropTypes.string,
  renderer: PropTypes.func.isRequired,
  copyText: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
})

CollapsedTable.propTypes = {
  numRows: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  tableColumns: PropTypes.arrayOf(TABLE_COLUMNS_PROPS).isRequired,
}

CollapsedTable.defaultProps = {}

export default withTranslation('translations')(CollapsedTable)
