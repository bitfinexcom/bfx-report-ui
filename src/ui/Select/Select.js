import React, { PureComponent } from 'react'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select as BlueprintSelect } from '@blueprintjs/select'
import { IconNames } from '@blueprintjs/icons'
import _isObject from 'lodash/isObject'

import { filterSelectorItem } from 'ui/utils'

import { propTypes, defaultProps } from './Select.props'

class Select extends PureComponent {
  itemRenderer = (item, { modifiers, handleClick }) => {
    const { active, disabled } = modifiers
    const { value } = this.props

    let options = {}
    if (_isObject(item)) {
      const { value: itemValue, label } = item
      options = {
        isCurrent: itemValue === value,
        key: itemValue,
        text: label,
      }
    } else {
      options = {
        isCurrent: item === value,
        key: item,
        text: item,
      }
    }

    const { isCurrent, key, text } = options

    return (
      <MenuItem
        active={active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={disabled}
        key={key}
        onClick={handleClick}
        text={text}
      />
    )
  }

  onChange = (item, e) => {
    const { onChange } = this.props
    if (_isObject(item)) {
      return onChange(item.value, e)
    }
    return onChange(item, e)
  }

  render() {
    const {
      filterable,
      items,
      value,
    } = this.props

    const selectedText = _isObject(items[0])
      ? (items.find(item => item.value === value, {}) || {}).label
      : value

    return (
      <BlueprintSelect
        className='bitfinex-select'
        filterable={filterable}
        disabled={!items.length}
        items={items}
        itemRenderer={this.itemRenderer}
        itemPredicate={filterable && filterSelectorItem}
        onItemSelect={this.onChange}
        popoverProps={{
          minimal: true,
          popoverClassName: 'bitfinex-select-menu',
        }}
      >
        <Button
          text={selectedText}
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
