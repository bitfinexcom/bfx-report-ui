import React from 'react'
import { Checkbox } from '@blueprintjs/core'

import { propTypes, defaultProps } from './TableScrollPref.props'

const TableScrollPref = (props) => {
  const { tableScroll, toggleTableScroll } = props

  return (
    <Checkbox
      checked={tableScroll}
      onChange={toggleTableScroll}
      large
    />
  )
}

TableScrollPref.propTypes = propTypes
TableScrollPref.defaultProps = defaultProps

export default TableScrollPref
