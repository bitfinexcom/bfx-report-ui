import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  Intent,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position,
  Tooltip,
} from '@blueprintjs/core'

import { propTypes, defaultProps } from './QueryLimitSelector.props'

class QueryLimitSelector extends PureComponent {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    e.preventDefault()
    const { setQueryLimit } = this.props
    setQueryLimit(parseInt(e.currentTarget.getAttribute('value'), 10))
  }

  render() {
    const {
      getQueryLimit,
      intl,
      target,
    } = this.props
    const queryLimit = getQueryLimit(target)
    const options = (
      <Menu>
        <MenuItem
          text='125'
          value={125}
          onClick={this.onClick}
          intent={queryLimit === 125 ? Intent.PRIMARY : undefined}
        />
        <MenuItem
          text='250'
          value={250}
          onClick={this.onClick}
          intent={queryLimit === 250 ? Intent.PRIMARY : undefined}
        />
        <MenuItem
          text='500'
          value={500}
          onClick={this.onClick}
          intent={queryLimit === 500 ? Intent.PRIMARY : undefined}
        />
      </Menu>
    )
    return (
      <Tooltip
        content={(
          <span>
            {intl.formatMessage({ id: 'pagination.querylimit.tooltip' })}
          </span>
        )}
        usePortal
      >
        <Popover
          content={options}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM}
        >
          <Button
            rightIcon='caret-down'
            text={queryLimit}
          />
        </Popover>
      </Tooltip>
    )
  }
}

QueryLimitSelector.propTypes = propTypes
QueryLimitSelector.defaultProps = defaultProps

export default injectIntl(QueryLimitSelector)
