import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import queryString from 'query-string'

import Icon from 'icons'

import { propTypes, defaultProps } from './TimeFrameShortcut.props'

class TimeFrameShortcut extends PureComponent {
  onClick = () => {
    const { type, setTimeRange } = this.props
    this.resetRangeQuery()
    setTimeRange(type)
  }

  resetRangeQuery = () => {
    const { location, history } = this.props
    const parsed = queryString.parse(location.search)
    const { range, ...params } = parsed
    history.push(`${location.pathname}?${queryString.stringify(params, { encode: false })}`)
  }

  render() {
    const {
      title,
      t,
    } = this.props

    return (
      <div className='timeframe-shortcut' onClick={this.onClick}>
        <Icon.CALENDAR />
        <div className='timeframe-shortcut-title'>
          {t(title)}
        </div>
      </div>
    )
  }
}

TimeFrameShortcut.propTypes = propTypes
TimeFrameShortcut.defaultProps = defaultProps

export default withTranslation('translations')(TimeFrameShortcut)
