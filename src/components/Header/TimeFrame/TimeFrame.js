import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  InputGroup,
  Intent,
  Popover,
  Position,
} from '@blueprintjs/core'

import DateRangePicker from 'ui/DateRangePicker'
import Icon from 'icons'
import { DEFAULT_DATETIME_FORMAT, formatDate } from 'state/utils'

import { propTypes, defaultProps } from './TimeFrame.props'

class TimeFrame extends PureComponent {
  render() {
    const {
      end,
      start,
      t,
      timezone,
    } = this.props

    const timeSpan = `${formatDate(start, timezone)} - ${formatDate(end, timezone)}`

    return (
      <div className='timeframe'>
        <Popover
          minimal
          position={Position.BOTTOM}
          content={(
            <div className='timeframe-popover'>
              <InputGroup
                placeholder={t('timeframe.start-date-placeholder')}
                readOnly
                value={formatDate(start, timezone, DEFAULT_DATETIME_FORMAT)}
              />
              <InputGroup
                placeholder={t('timeframe.end-date-placeholder')}
                readOnly
                value={formatDate(end, timezone, DEFAULT_DATETIME_FORMAT)}
              />
              <DateRangePicker>
                <Button intent={Intent.PRIMARY}>
                  {t('timeframe.custom.view')}
                </Button>
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
