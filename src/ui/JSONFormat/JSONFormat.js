import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from 'ui/Tooltip'

const JSONFormat = (props) => {
  const { content, children } = props

  return (
    <Tooltip
      content={<pre className='json-format'>{content}</pre>}
      targetClassName='json-format-target'
      popoverClassName='json-format-popover'
      boundary='window'
    >
      {children}
    </Tooltip>
  )
}

JSONFormat.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
}

export default JSONFormat
