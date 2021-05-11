import React, { PureComponent } from 'react'
import classNames from 'classnames'

import Icon from 'icons'
import { formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeRange.props'

class TimeRange extends PureComponent {
  onClick = () => {
    const { togglePreferencesDialog, toggleTimeFrameDialog } = this.props
    if (window.innerWidth > 855) {
      toggleTimeFrameDialog(true)
    } else {
      togglePreferencesDialog()
    }
  }

  render() {
    const {
      className,
      end,
      icon,
      start,
      timezone,
    } = this.props

    return (
      <div className={classNames('time-range', className)} onClick={this.onClick}>
        {icon && <Icon.CALENDAR />}
        <span>
          {`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
        </span>
      </div>
    )
  }
}

TimeRange.propTypes = propTypes
TimeRange.defaultProps = defaultProps

export default TimeRange
