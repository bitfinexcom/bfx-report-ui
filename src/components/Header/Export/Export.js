import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import _includes from 'lodash/includes'

import Icon from 'icons'
import { tracker } from 'utils/trackers'
import { toggleExportDialog } from 'state/ui/actions'
import { getTarget, NO_EXPORT_TARGETS } from 'state/query/utils'

const Export = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()
  const toggleExport = () => {
    tracker.trackEvent('Export', 'Navigation')
    dispatch(toggleExportDialog())
  }

  const target = getTarget(location.pathname)

  const isExportDisabled = _includes(NO_EXPORT_TARGETS, target)

  return (
    <div
      onClick={toggleExport}
      className={classNames('export', { disabled: isExportDisabled })}
    >
      <Icon.FILE_EXPORT />
      <span>
        {t('download.export')}
      </span>
    </div>
  )
}

export default Export
