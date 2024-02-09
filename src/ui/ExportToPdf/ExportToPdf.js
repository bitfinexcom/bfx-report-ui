import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from '@blueprintjs/core'

import { tracker } from 'utils/trackers'
import { setIsPdfRequired } from 'state/query/actions'
import { getIsPdfExportRequired } from 'state/query/selectors'

const ExportToPdf = () => {
  const dispatch = useDispatch()
  const isPdfExportRequired = useSelector(getIsPdfExportRequired)

  const handleChange = () => {
    tracker.trackEvent('Export as PDF')
    dispatch(setIsPdfRequired(!isPdfExportRequired))
  }

  return (
    <Checkbox
      large
      onChange={handleChange}
      checked={isPdfExportRequired}
    />
  )
}

export default ExportToPdf
