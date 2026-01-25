import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '@blueprintjs/core'

const SpinnerWithPercent = ({ progress }) => {
  const value = Number.isFinite(progress)
    ? Math.min(progress / 100, 1)
    : null

  return (
    <div className='au-toast__spinner'>
      <Spinner size={36} value={value} intent='primary' />
      {Number.isFinite(progress) && (
        <div className='au-toast__spinner-percent'>
          {Math.trunc(progress)}
          %
        </div>
      )}
    </div>
  )
}

SpinnerWithPercent.propTypes = {
  progress: PropTypes.number,
}

SpinnerWithPercent.defaultProps = {
  progress: null,
}

export default SpinnerWithPercent
