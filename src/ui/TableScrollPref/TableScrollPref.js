import React from 'react'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'

import { propTypes, defaultProps } from './TableScrollPref.props'

const TableScrollPref = (props) => {
  const { tableScroll, toggleTableScroll } = props
  const onChange = () => {
    tracker.trackEvent('Table Scroll')
    toggleTableScroll()
  }

  return (
    <Checkbox
      checked={tableScroll}
      onChange={() => onChange()}
      large
    />
  )
}

TableScrollPref.propTypes = propTypes
TableScrollPref.defaultProps = defaultProps

export default TableScrollPref
