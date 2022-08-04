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
        <p className='label'>{`USD : ${sumUpValue}`}</p>
      </div>
    )
  }
  return null
}

SumUpTooltip.propTypes = {
  t: PropTypes.func.isRequired,
  sumUpValue: PropTypes.string,
  active: PropTypes.bool.isRequired,
}

SumUpTooltip.defaultProps = {
  sumUpValue: null,
}

export default memo(SumUpTooltip)
