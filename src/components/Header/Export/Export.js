import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import Icon from 'icons'
import { tracker } from 'utils/trackers'
import { toggleExportDialog } from 'state/ui/actions'
import { getIsExportDisabled } from 'state/query/utils'

const Export = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()
  const toggleExport = () => {
    tracker.trackEvent('Export', 'Navigation')
    dispatch(toggleExportDialog())
  }

  const disabled = useMemo(
    () => getIsExportDisabled(location.pathname),
    [location.pathname],
  )

  return (
    <div
      onClick={toggleExport}
      className={classNames('export', { disabled })}
    >
      <Icon.FILE_EXPORT />
      <span>
        {t('download.export')}
      </span>
    </div>
  )
}

export default Export
