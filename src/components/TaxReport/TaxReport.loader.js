import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '@blueprintjs/core'

import { getTransactionsGenerationProgress } from 'state/taxReport/selectors'

export const Loader = () => {
  const progress = useSelector(getTransactionsGenerationProgress)

  return (
    <div className='loading-container'>
      <div className='loading-progress'>
        {progress}
      </div>
      <Spinner
        className='loading'
        size={Spinner.SIZE_STANDARD}
      />
    </div>
  )
}

export default Loader
