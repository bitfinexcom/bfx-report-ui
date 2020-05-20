import React from 'react'
import { Spinner } from '@blueprintjs/core'

export const Loading = () => (
  <div className='loading-container'>
    <Spinner
      className='loading'
      size={Spinner.SIZE_STANDARD}
    />
  </div>
)

export default Loading
