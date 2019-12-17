import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
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
import { IconNames } from '@blueprintjs/icons'

import { propTypes, defaultProps } from './QueryLimitSelector.props'

class QueryLimitSelector extends PureComponent {
  onClick = (e) => {
    const { setQueryLimit } = this.props
    setQueryLimit(parseInt(e.currentTarget.getAttribute('value'), 10))
  }

  render() {
    const { queryLimit, t } = this.props
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
      <Popover
        content={options}
        interactionKind={PopoverInteractionKind.CLICK}
        position={Position.BOTTOM}
      >
        <Tooltip
          content={(
            <span>
              {t('querylimit.tooltip')}
            </span>
          )}
          hoverOpenDelay={300}
        >
          <Button
            rightIcon={IconNames.CARET_DOWN}
            className='query-limit-selector'
            text={queryLimit}
          />
        </Tooltip>
      </Popover>
    )
  }
}

QueryLimitSelector.propTypes = propTypes
QueryLimitSelector.defaultProps = defaultProps

export default withTranslation('translations')(QueryLimitSelector)
