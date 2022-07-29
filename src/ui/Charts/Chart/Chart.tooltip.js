import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { formatSumUpValue } from '../Charts.helpers'

const SumUpTooltip = ({
  t,
  active,
  endValue,
  startValue,
}) => {
  if (active && startValue) {
    return (
      <div className='custom-tooltip'>
        <p className='title'>{t('sum_up_tooltip.title')}</p>
        <p className='label'>{`${formatSumUpValue(startValue, endValue)} USD`}</p>
      </div>
    )
  }
  return null
}

SumUpTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  startValue: PropTypes.number,
  endValue: PropTypes.number,
}

SumUpTooltip.defaultProps = {
  startValue: null,
  endValue: null,
}

export default memo(SumUpTooltip)
