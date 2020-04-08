import React, { PureComponent } from 'react'
import classNames from 'classnames'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select as BlueprintSelect } from '@blueprintjs/select'
import _isObject from 'lodash/isObject'

import Icon from 'icons'
import { filterSelectorItem } from 'ui/utils'

import { propTypes, defaultProps } from './Select.props'

class Select extends PureComponent {
  state = {
    isOpen: false,
  }

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

  onToggle = (nextOpenState) => {
    this.setState({ isOpen: nextOpenState })
  }

  render() {
    const {
      className,
      filterable,
      itemRenderer,
      items,
      popoverClassName,
      value,
    } = this.props
    const { isOpen } = this.state

    const selectedText = _isObject(items[0])
      ? (items.find(item => item.value === value, {}) || {}).label
      : value

    const icon = isOpen
      ? <Icon.CHEVRON_UP />
      : <Icon.CHEVRON_DOWN />

    const selectClasses = classNames('bitfinex-select', className)
    const popoverClasses = classNames('bitfinex-select-menu', popoverClassName)

    return (
      <BlueprintSelect
        className={selectClasses}
        filterable={filterable}
        disabled={!items.length}
        items={items}
        itemRenderer={itemRenderer || this.itemRenderer}
        itemPredicate={filterable && filterSelectorItem}
        onItemSelect={this.onChange}
        popoverProps={{
          minimal: true,
          onInteraction: this.onToggle,
          popoverClassName: popoverClasses,
        }}
      >
        <Button
          text={selectedText}
          rightIcon={icon}
          disabled={!items.length}
        />
      </BlueprintSelect>
    )
  }
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
