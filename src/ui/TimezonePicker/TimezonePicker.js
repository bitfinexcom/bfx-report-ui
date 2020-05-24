import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
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

  onOpening = (element) => {
    const { t } = this.props
    const localTimezoneText = element.querySelector('.bp3-menu li div')
    if (localTimezoneText) {
      localTimezoneText.innerHTML = t('inputs.timezone_local')
    }
  }

  render() {
    const {
      onChange,
      t,
      value,
    } = this.props
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
        inputProps={{
          placeholder: t('inputs.timezone_placeholder'),
        }}
        popoverProps={{
          minimal: true,
          onInteraction: this.onToggle,
          onOpening: this.onOpening,
          popoverClassName: 'bitfinex-select-menu',
        }}
        value={value}
      />
    )
  }
}

TimezonePicker.propTypes = propTypes
TimezonePicker.defaultProps = defaultProps

export default withTranslation('translations')(TimezonePicker)
