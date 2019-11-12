import React from 'react'
import { Tooltip as BptTooltip } from '@blueprintjs/core'

import { propTypes, defaultProps } from './Tooltip.props'

const Tooltip = (props) => {
  const { content, className, children } = props

  if (!content || !children) {
    return children
  }

  return (
    <BptTooltip
      content={content}
      className={className}
    >
      {children}
    </BptTooltip>
  )
}

Tooltip.propTypes = propTypes

Tooltip.defaultProps = defaultProps

export default Tooltip
