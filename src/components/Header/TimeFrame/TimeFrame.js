import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  InputGroup,
  Popover,
  Position,
} from '@blueprintjs/core'

import DateRangePicker from 'ui/DateRangePicker'
import Icon from 'icons'
import { DEFAULT_DATETIME_FORMAT, formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeFrame.props'

class TimeFrame extends PureComponent {
  state = {
    isOpen: false,
  }

  onToggle = (isOpen) => {
    this.setState(() => ({
      isOpen,
    }))
  }

  render() {
    const {
      end,
      start,
      t,
      timezone,
    } = this.props
    const { isOpen } = this.state

    const timeSpan = `${formatDate(start, timezone)} - ${formatDate(end, timezone)}`

    return (
      <div className='timeframe'>
        <Popover
          minimal
          position={Position.BOTTOM}
          content={(
            <div className='timeframe-popover'>
              <DateRangePicker isOpen={isOpen} onClose={() => this.onToggle(false)}>
                <Fragment>
                  <InputGroup
                    onClick={() => this.onToggle(true)}
                    placeholder={t('timeframe.start-date-placeholder')}
                    readOnly
                    value={formatDate(start, timezone, DEFAULT_DATETIME_FORMAT)}
                  />
                  <InputGroup
                    onClick={() => this.onToggle(true)}
                    placeholder={t('timeframe.end-date-placeholder')}
                    readOnly
                    value={formatDate(end, timezone, DEFAULT_DATETIME_FORMAT)}
                  />
                </Fragment>
              </DateRangePicker>
            </div>
          )}
          targetTagName='div'
        >
          <div className='timeframe-wrapper'>
            <div className='timeframe-target'>
              <Icon.CALENDAR />
              <div className='timeframe-range'>
                {timeSpan}
              </div>
              <Icon.CHEVRON_DOWN />
              <Icon.CHEVRON_UP />
            </div>
          </div>
        </Popover>
      </div>
    )
  }
}

TimeFrame.propTypes = propTypes
TimeFrame.defaultProps = defaultProps

export default withTranslation('translations')(TimeFrame)
