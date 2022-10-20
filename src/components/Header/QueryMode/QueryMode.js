import React, { memo } from 'react'
import PropTypes from 'prop-types'
import {
  Position,
  Tooltip,
} from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'

import {
  getModeIcon,
  getModeTitle,
  getModeTooltipMessage,
} from './QueryMode.helpers'

const QueryMode = ({ syncMode, switchSyncMode, t }) => {
  const switchMode = () => {
    switchSyncMode(syncMode)
  }

  const modeIcon = getModeIcon(syncMode)

  if (!config.showFrameworkMode) {
    return (
      <div className='query-mode'>
        <div className='query-mode-wrapper'>
          <div className='query-mode-icon-wrapper'>
            <div className='query-mode-icon'>
              <Icon.CHECKMARK_CIRCLE />
            </div>
          </div>
          <span className='query-mode-status'>{t('sync.online')}</span>
        </div>
      </div>
    )
  }

  return (
    <>
      <Tooltip
        className='query-mode'
        content={t(getModeTooltipMessage(syncMode))}
        position={Position.BOTTOM}
      >
        <div className='query-mode-wrapper' onClick={switchMode}>
          <div className='query-mode-icon-wrapper'>
            <div className='query-mode-icon'>
              {modeIcon}
            </div>
          </div>
          <span className='query-mode-status'>{t(getModeTitle(syncMode))}</span>
        </div>
      </Tooltip>
    </>
  )
}

QueryMode.propTypes = {
  t: PropTypes.func.isRequired,
  switchSyncMode: PropTypes.func,
  syncMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool]).isRequired,
}

QueryMode.defaultProps = {
  switchSyncMode: () => {},
}

export default memo(QueryMode)
