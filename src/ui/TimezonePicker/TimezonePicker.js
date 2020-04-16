import React, { PureComponent } from 'react'
import { TimezonePicker as BlueprintTimezonePicker } from '@blueprintjs/timezone'

import Icon from 'icons'

import { propTypes, defaultProps } from './TimezonePicker.props'

class TimezonePicker extends PureComponent {
  state = {
    isOpen: false,
  }

  onToggle = (nextOpenState) => {
    this.setState({ isOpen: nextOpenState })
  }

  render() {
    const { onChange, value } = this.props
    const { isOpen } = this.state

    const icon = isOpen
      ? <Icon.CHEVRON_UP />
      : <Icon.CHEVRON_DOWN />

    return (
      <BlueprintTimezonePicker
        buttonProps={{
          className: 'timezone-picker',
          rightIcon: icon,
        }}
        className='bitfinex-select'
        onChange={onChange}
        popoverProps={{
          minimal: true,
          onInteraction: this.onToggle,
          popoverClassName: 'bitfinex-select-menu',
        }}
        showLocalTimezone
        value={value}
      />
    )
  }
}

TimezonePicker.propTypes = propTypes
TimezonePicker.defaultProps = defaultProps

export default TimezonePicker
