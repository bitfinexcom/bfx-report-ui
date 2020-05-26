import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withTranslation } from 'react-i18next'
import { MultiSelect as BlueprintMultiSelect } from '@blueprintjs/select'

import Icon from 'icons'

import { propTypes, defaultProps } from './MultiSymbolSelector.props'

class MultiSelect extends PureComponent {
  state = {
    isOpen: false,
  }

  popoverProps = {
    minimal: true,
    popoverClassName: 'bitfinex-select-menu',
    onOpening: () => this.onToggle(true),
    onClosing: () => this.onToggle(false),
  }

  onToggle = (isOpen) => {
    this.setState({ isOpen })
  }

  render() {
    const { className, t, ...selectProps } = this.props
    const { isOpen } = this.state
    const { tagInputProps } = selectProps

    const classes = classNames('bitfinex-select', className)

    const placeholder = isOpen
      ? ''
      : t('selector.select')
    const icon = isOpen
      ? <Icon.CHEVRON_UP className='bp3-multi-select-arrow' />
      : <Icon.CHEVRON_DOWN className='bp3-multi-select-arrow' />

    return (
      <BlueprintMultiSelect
        className={classes}
        placeholder={placeholder}
        popoverProps={this.popoverProps}
        {...selectProps}
        tagInputProps={{
          ...tagInputProps,
          leftIcon: icon,
        }}
      />
    )
  }
}

MultiSelect.propTypes = propTypes
MultiSelect.defaultProps = defaultProps

export default withTranslation('translations')(MultiSelect)
