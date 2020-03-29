import React, { PureComponent } from 'react'
import {
  Button,
  Intent,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import types from 'state/base/constants'

import { propTypes, defaultProps } from './DateFormatSelector.props'

class DateFormatSelector extends PureComponent {
  handleClick = (format) => {
    const { dateFormat, setDateFormat } = this.props
    if (dateFormat !== format) {
      setDateFormat(format)
    }
  }

  render() {
    const { dateFormat } = this.props

    const renderOptions = types.DATE_FORMATS.map(item => (
      <MenuItem
        key={item}
        text={item}
        onClick={() => this.handleClick(item)}
        intent={item === dateFormat ? Intent.PRIMARY : undefined}
      />
    ))

    const options = (
      <Menu>
        {renderOptions}
      </Menu>
    )
    return (
      <Popover
        content={options}
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.BOTTOM}
      >
        <Button
          className='button--medium'
          rightIcon={IconNames.CARET_DOWN}
          text={dateFormat}
        />
      </Popover>
    )
  }
}

DateFormatSelector.propTypes = propTypes
DateFormatSelector.defaultProps = defaultProps

export default DateFormatSelector
