import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import _map from 'lodash/map'
import _times from 'lodash/times'

const CollapsedTable = ({ numRows, tableColumns }) => {
  const { t } = useTranslation()

  return (
    <div className='collapsed-table'>
      {_times(numRows, rowIndex => (
        <div
          key={rowIndex}
          className='collapsed-table-item'
        >
          {_map(tableColumns, (column) => {
            const {
              id, name, nameStr, renderer, description,
            } = column
            const cell = renderer(rowIndex)
            return (
              <div key={id}>
                <div>
                  {nameStr || t(name)}
                  <br />
                  {description && (
                    <span className='cell-description'>
                      {t(description)}
                    </span>
                  )}
                </div>
                <div>{cell.props.children}</div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

CollapsedTable.propTypes = {
  numRows: PropTypes.number.isRequired,
  tableColumns: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    width: PropTypes.number,
    nameStr: PropTypes.string,
    id: PropTypes.string.isRequired,
    renderer: PropTypes.func.isRequired,
    copyText: PropTypes.func,
  })).isRequired,
}

export default memo(CollapsedTable)
