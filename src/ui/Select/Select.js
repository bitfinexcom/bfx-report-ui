import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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

class Select extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    filterable: PropTypes.bool,
    itemPredicate: PropTypes.func,
    itemRenderer: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string,
          PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
      }),
    ])).isRequired,
    onChange: PropTypes.func.isRequired,
    popoverClassName: PropTypes.string,
    t: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number]).isRequired,
  }

  static defaultProps = {
    filterable: false,
    className: '',
    popoverClassName: '',
    itemRenderer: undefined,
    itemPredicate: undefined,
  }

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
        key={key}
        text={text}
        active={active}
        disabled={disabled}
        onClick={handleClick}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
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
      t,
      items,
      value,
      className,
      filterable,
      itemPredicate,
      itemRenderer,
      popoverClassName,
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
        itemPredicate={itemPredicate || (filterable && filterSelectorItem)}
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

export default withTranslation('translations')(Select)
