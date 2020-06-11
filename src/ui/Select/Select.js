import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withTranslation } from 'react-i18next'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select as BlueprintSelect } from '@blueprintjs/select'
import _isObject from 'lodash/isObject'

import Icons from 'icons'
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
      t,
      value,
    } = this.props
    const { isOpen } = this.state

    const selectedText = _isObject(items[0])
      ? (items.find(item => item.value === value, {}) || {}).label
      : value

    const icon = isOpen
      ? <Icons.CHEVRON_UP />
      : <Icons.CHEVRON_DOWN />

    const selectClasses = classNames('bitfinex-select', className)
    const popoverClasses = classNames('bitfinex-select-menu', popoverClassName)

    return (
      <BlueprintSelect
        className={selectClasses}
        filterable={filterable}
        disabled={!items.length}
        inputProps={{
          leftIcon: <Icons.SEARCH className='bp3-icon' />,
          placeholder: t('inputs.filter_placeholder'),
        }}
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
          text={selectedText || ' '} // button should have an empty span so the icon wouldn't render on the left side
          rightIcon={icon}
        />
      </BlueprintSelect>
    )
  }
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default withTranslation('translations')(Select)
