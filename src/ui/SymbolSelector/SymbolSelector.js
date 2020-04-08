import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Intent, MenuItem } from '@blueprintjs/core'

import Select from 'ui/Select'

class SymbolSelector extends PureComponent {
  itemRenderer = (symbol, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentCoin, currencies } = this.props
    const isCurrent = currentCoin === symbol

    return (
      <MenuItem
        active={active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={disabled}
        key={symbol}
        onClick={handleClick}
        text={symbol}
        label={currencies[symbol]}
      />
    )
  }

  render() {
    const {
      coins,
      currentCoin,
      onSymbolSelect,
    } = this.props

    return (
      <Select
        onChange={onSymbolSelect}
        filterable
        itemRenderer={this.itemRenderer}
        items={coins}
        popoverClassName='bitfinex-select-menu--symbol'
        value={currentCoin}
      />
    )
  }
}

SymbolSelector.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  currencies: PropTypes.objectOf(PropTypes.string),
  currentCoin: PropTypes.string.isRequired,
  onSymbolSelect: PropTypes.func.isRequired,
}
SymbolSelector.defaultProps = {
  coins: [],
  currencies: {},
}

export default SymbolSelector
