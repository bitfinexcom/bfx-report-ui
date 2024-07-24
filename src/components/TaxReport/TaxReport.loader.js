import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '@blueprintjs/core'
import { isNil } from '@bitfinex/lib-js-util-base'

import { getTransactionsGenerationProgress } from 'state/taxReport/selectors'

export const Loader = () => {
  const progress = useSelector(getTransactionsGenerationProgress)
  const spinnerContent = isNil(progress) ? '' : `${progress}%`

  return (
    <div className='loading-container'>
      <div className='loading-progress'>
        {spinnerContent}
      </div>
      <Spinner
        className='loading'
        size={Spinner.SIZE_STANDARD}
      />
    </div>
  )
}

export default Loader
