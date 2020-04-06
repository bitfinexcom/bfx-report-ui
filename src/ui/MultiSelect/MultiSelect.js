import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { MultiSelect as BlueprintMultiSelect } from '@blueprintjs/select'

import Icon from 'icons'

import { propTypes, defaultProps } from './MultiSymbolSelector.props'

class MultiSelect extends PureComponent {
  state = {
    isOpen: false,
  }

  onToggle = (nextOpenState) => {
    this.setState({ isOpen: nextOpenState })
  }

  render() {
    const { t, ...selectProps } = this.props
    const { isOpen } = this.state
    const { tagInputProps } = selectProps

    const icon = isOpen
      ? <Icon.CHEVRON_UP className='bp3-multi-select-arrow' />
      : <Icon.CHEVRON_DOWN className='bp3-multi-select-arrow' />

    return (
      <BlueprintMultiSelect
        className='bitfinex-select'
        placeholder={t('selector.select')}
        popoverProps={{
          minimal: true,
          onInteraction: this.onToggle,
          popoverClassName: 'bitfinex-select-menu',
        }}
        {...selectProps}
        tagInputProps={{
          ...tagInputProps,
          leftIcon: icon,
        }}
        resetOnSelect
      />
    )
  }
}

MultiSelect.propTypes = propTypes
MultiSelect.defaultProps = defaultProps

export default withTranslation('translations')(MultiSelect)
