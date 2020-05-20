import React from 'react'
import PropTypes from 'prop-types'

import Tooltip from 'ui/Tooltip'

const JSONFormat = (props) => {
  const { content, children } = props

  if (!children) {
    return null
  }

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
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  content: PropTypes.string,
}

JSONFormat.defaultProps = {
  children: undefined,
  content: '',
}

export default JSONFormat
