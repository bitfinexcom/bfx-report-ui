import React, { PureComponent } from 'react'
import {
  Position,
  Tooltip,
} from '@blueprintjs/core'

import Icon from 'icons'
import config from 'config'

import { propTypes, defaultProps } from './QueryMode.props'
import {
  getModeIcon,
  getModeTitle,
  getModeTooltipMessage,
} from './QueryMode.helpers'

class QueryMode extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  switchMode = () => {
    const { syncMode, switchSyncMode } = this.props
    switchSyncMode(syncMode)
  }

  render() {
    const {
      syncMode,
      t,
    } = this.props

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

    const modeIcon = getModeIcon(syncMode)

    return (
      <>
        <Tooltip
          className='query-mode'
          content={t(getModeTooltipMessage(syncMode))}
          position={Position.BOTTOM}
        >
          <div className='query-mode-wrapper' onClick={this.switchMode}>
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
}

export default QueryMode
