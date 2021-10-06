import React, { memo } from 'react'
import PropTypes from 'prop-types'

import Tooltip from 'ui/Tooltip'

const JSONFormat = ({ content, children }) => {
  if (!children) {
    return null
  }

  return (
    <Tooltip
      placement='left'
      boundary='document.body'
      targetClassName='json-format-target'
      popoverClassName='json-format-popover'
      content={<pre className='json-format'>{content}</pre>}
    >
      {children}
    </Tooltip>
  )
}

JSONFormat.propTypes = {
  content: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
}

JSONFormat.defaultProps = {
  content: '',
  children: undefined,
}

export default memo(JSONFormat)
