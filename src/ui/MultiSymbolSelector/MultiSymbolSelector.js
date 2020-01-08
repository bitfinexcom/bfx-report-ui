import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { propTypes, defaultProps } from './MultiSymbolSelector.props'

class MultiSymbolSelector extends PureComponent {
  filterSymbol = (query, coin) => coin.toUpperCase().indexOf(query.toUpperCase()) >= 0

  renderSymbol = (symbol, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const {
      currencies, currentFilters, existingCoins, toggleSymbol,
    } = this.props

    const isCurrent = currentFilters.includes(symbol)
    const className = existingCoins.includes(symbol) && !isCurrent && !active
      ? 'bitfinex-queried-symbol'
      : ''

    return (
      <MenuItem
        className={className}
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
      t,
    } = this.props

    const items = coins.length
      ? coins
      : existingCoins

    return (
      <MultiSelect
        className='bitfinex-multi-select'
        disabled={!coins.length && !existingCoins.length}
        placeholder={t('selector.filter.symbol')}
        items={items}
        itemRenderer={this.renderSymbol}
        itemPredicate={this.filterSymbol}
        onItemSelect={toggleSymbol}
        popoverProps={{ minimal: true }}
        tagInputProps={{ tagProps: { minimal: true }, onRemove: toggleSymbol }}
        tagRenderer={coin => coin}
        selectedItems={currentFilters}
        resetOnSelect
      />
    )
  }
}

MultiSymbolSelector.propTypes = propTypes
MultiSymbolSelector.defaultProps = defaultProps

export default withTranslation('translations')(MultiSymbolSelector)
