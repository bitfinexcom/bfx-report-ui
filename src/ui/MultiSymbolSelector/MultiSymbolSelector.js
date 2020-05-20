import React, { PureComponent } from 'react'
import classNames from 'classnames'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'

import MultiSelect from 'ui/MultiSelect'
import { filterSelectorItem } from 'ui/utils'

import { propTypes, defaultProps } from './MultiSymbolSelector.props'

class MultiSymbolSelector extends PureComponent {
  renderSymbol = (symbol, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currencies, currentFilters, existingCoins } = this.props
    const isCurrent = currentFilters.includes(symbol)

    const classes = classNames({
      'bitfinex-queried-symbol': existingCoins.includes(symbol) && !isCurrent && !active,
      'bp3-menu-item--selected': isCurrent,
    })

    return (
      <MenuItem
        className={classes}
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
      currentFilters,
      existingCoins,
      toggleSymbol,
    } = this.props

    const items = coins.length
      ? coins
      : existingCoins

    return (
      <MultiSelect
        disabled={!coins.length && !existingCoins.length}
        items={items}
        itemRenderer={this.renderSymbol}
        itemPredicate={filterSelectorItem}
        onItemSelect={toggleSymbol}
        tagInputProps={{ tagProps: { minimal: true }, onRemove: toggleSymbol }}
        tagRenderer={coin => coin}
        selectedItems={currentFilters}
      />
    )
  }
}

MultiSymbolSelector.propTypes = propTypes
MultiSymbolSelector.defaultProps = defaultProps

export default MultiSymbolSelector
