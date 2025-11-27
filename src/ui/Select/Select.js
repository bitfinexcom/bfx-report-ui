import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withTranslation } from 'react-i18next'
import { isObject, isEqual } from '@bitfinex/lib-js-util-base'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select as BlueprintSelect } from '@blueprintjs/select'

import Icons from 'icons'
import { tracker } from 'utils/trackers'
import { LANGUAGE_NAMES } from 'locales/i18n'
import { filterSelectorItem } from 'ui/utils'
import { getSourceFromPathName } from 'utils/browser'

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
        label: PropTypes.oneOfType([
          PropTypes.string.isRequired,
          PropTypes.node.isRequired,
        ]),
      }),
    ])).isRequired,
    onChange: PropTypes.func.isRequired,
    popoverClassName: PropTypes.string,
    t: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.number]),
  }

  static defaultProps = {
    value: '',
    className: '',
    filterable: false,
    popoverClassName: '',
    itemRenderer: undefined,
    itemPredicate: undefined,
    type: 'Select',
  }

  state = {
    isOpen: false,
  }

  itemRenderer = (item, { modifiers, handleClick }) => {
    const { disabled } = modifiers
    const { value } = this.props

    let options = {}
    if (isObject(item)) {
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
        active={isCurrent}
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
    if (isObject(item)) {
      return onChange(item.value, e)
    }
    return onChange(item, e)
  }

  onToggle = (nextOpenState) => {
    const { type } = this.props
    tracker.trackEvent(type, getSourceFromPathName())
    this.setState({ isOpen: nextOpenState })
  }

  render() {
    const {
      className,
      filterable,
      itemPredicate,
      itemRenderer,
      items,
      popoverClassName,
      t,
      value,
      type,
    } = this.props
    const { isOpen } = this.state

    let selectedText = isObject(items[0])
      ? (items.find(item => item.value === value, {}) || {}).label
      : value

    if (isEqual(type, 'Language')) selectedText = LANGUAGE_NAMES[value]

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
