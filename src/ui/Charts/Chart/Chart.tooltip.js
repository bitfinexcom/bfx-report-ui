import React, { memo } from 'react'
import PropTypes from 'prop-types'

const SumUpTooltip = ({
  active,
  startValue,
  endValue,
}) => {
  if (active && startValue) {
    return (
      <div className='custom-tooltip'>
        <p className='title'>Sum up:</p>
        <p className='label'>{`${startValue + endValue} USD`}</p>
      </div>
    )
  }
  return null
}

SumUpTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  startValue: PropTypes.number,
  endValue: PropTypes.number,
}

SumUpTooltip.defaultProps = {
  startValue: null,
  endValue: null,
}

export default memo(SumUpTooltip)
