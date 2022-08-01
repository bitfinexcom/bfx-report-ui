import React, { memo } from 'react'
import PropTypes from 'prop-types'

const SumUpTooltip = ({
  t,
  active,
  sumUpValue,
}) => {
  if (active && sumUpValue) {
    return (
      <div className='custom-tooltip'>
        <p className='title'>{t('sum_up_tooltip.title')}</p>
        <p className='label'>{`${sumUpValue} USD`}</p>
      </div>
    )
  }
  return null
}

SumUpTooltip.propTypes = {
  active: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  sumUpValue: PropTypes.string,
}

SumUpTooltip.defaultProps = {
  sumUpValue: null,
}

export default memo(SumUpTooltip)
