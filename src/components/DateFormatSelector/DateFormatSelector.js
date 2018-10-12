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

import types from 'state/base/constants'

import { propTypes, defaultProps } from './DateFormatSelector.props'

class DateFormatSelector extends PureComponent {
  constructor(props) {
    super(props)
    this.handlers = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(format) {
    if (!this.handlers[format]) {
      this.handlers[format] = () => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.setDateFormat(format)
      }
    }
    return this.handlers[format]
  }

  render() {
    const { dateFormat } = this.props

    const renderOptions = types.DATE_FORMATS.map(item => (
      <MenuItem
        key={item}
        text={item}
        onClick={this.handleClick(item)}
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
          rightIcon='caret-down'
          text={dateFormat}
        />
      </Popover>
    )
  }
}

DateFormatSelector.propTypes = propTypes
DateFormatSelector.defaultProps = defaultProps

export default DateFormatSelector
