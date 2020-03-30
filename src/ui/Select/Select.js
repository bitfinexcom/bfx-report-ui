import React, { PureComponent } from 'react'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select as BlueprintSelect } from '@blueprintjs/select'
import { IconNames } from '@blueprintjs/icons'

import { filterSelectorItem } from 'ui/utils'

import { propTypes, defaultProps } from './Select.props'

class Select extends PureComponent {
  itemRenderer = (item, { modifiers, handleClick }) => {
    const { active, disabled } = modifiers
    const { value } = this.props
    const isCurrent = item === value

    return (
      <MenuItem
        active={active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={disabled}
        key={item}
        onClick={handleClick}
        text={item}
      />
    )
  }

  render() {
    const {
      filterable,
      items,
      onChange,
      value,
    } = this.props

    return (
      <BlueprintSelect
        className='bitfinex-select'
        filterable={filterable}
        disabled={!items.length}
        items={items}
        itemRenderer={this.itemRenderer}
        itemPredicate={filterSelectorItem}
        onItemSelect={onChange}
        popoverProps={{
          minimal: true,
          popoverClassName: 'bitfinex-select-menu',
        }}
      >
        <Button
          text={value}
          rightIcon={IconNames.CARET_DOWN}
          disabled={!items.length}
        />
      </BlueprintSelect>
    )
  }
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
