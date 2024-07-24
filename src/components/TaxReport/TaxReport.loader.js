import React from 'react'
import { Spinner } from '@blueprintjs/core'

export const Loader = () => (
  <div className='loading-container'>
    <div className='loading-progress'>
      75%
    </div>
    <Spinner
      className='loading'
      size={Spinner.SIZE_STANDARD}
    />
  </div>
)

export default Loader
