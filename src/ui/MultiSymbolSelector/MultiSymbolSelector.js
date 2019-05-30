import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { propTypes, defaultProps } from './MultiSymbolSelector.props'

class MultiSymbolSelector extends PureComponent {
  filterSymbol = (query, coin) => coin.indexOf(query.toUpperCase()) >= 0

  renderSymbol = (symbol, { modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const {
      currencies, currentFilters, existingCoins, toggleSymbol,
    } = this.props

    const isCurrent = currentFilters.includes(symbol)
    const className = existingCoins.includes(symbol) && !isCurrent
      ? 'bitfinex-queried-symbol'
      : ''

    return (
      <MenuItem
        className={className}
        active={modifiers.active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={modifiers.disabled}
        key={symbol}
        onClick={() => toggleSymbol(symbol)}
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

    return (
      <MultiSelect
        className='bitfinex-multi-select'
        disabled={!coins.length}
        placeholder={t('selector.filter.symbol')}
        items={coins || existingCoins}
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
