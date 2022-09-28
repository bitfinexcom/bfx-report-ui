import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'

import MultiSelect from 'ui/MultiSelect'

import { propTypes, defaultProps } from './MultiSymbolSelector.props'

class MultiSymbolSelector extends PureComponent {
  renderSymbol = (symbol, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const {
      currencies, currentFilters, existingCoins, t,
    } = this.props
    const isCurrent = currentFilters.includes(symbol)
    const text = symbol === 'inactive' ? t('selector.inactive') : symbol

    const classes = classNames({
      'bitfinex-queried-symbol': existingCoins.includes(symbol) && !isCurrent && !active,
      'bp3-menu-item--selected': isCurrent,
    })

    return (
      <MenuItem
        className={classes}
        active={active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={disabled || symbol === 'inactive'}
        key={symbol}
        onClick={handleClick}
        text={text}
        label={currencies[symbol]}
      />
    )
  }

  itemPredicate = (query, item) => {
    if (item === 'inactive') {
      const { inactiveCurrencies } = this.props
      return !!inactiveCurrencies.find((currency) => currency.toLowerCase().indexOf(query.toLowerCase()) >= 0)
    }

    return item.toLowerCase().indexOf(query.toLowerCase()) >= 0
  }

  render() {
    const {
      coins,
      currentFilters,
      existingCoins,
      inactiveCurrencies,
      toggleSymbol,
    } = this.props

    const shownCoins = coins.length
      ? coins
      : existingCoins

    const items = inactiveCurrencies.length
      ? [
        ...shownCoins,
        'inactive',
        ...inactiveCurrencies,
      ]
      : shownCoins

    return (
      <MultiSelect
        disabled={!coins.length && !existingCoins.length}
        items={items}
        itemRenderer={this.renderSymbol}
        itemPredicate={this.itemPredicate}
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

export default withTranslation('translations')(MultiSymbolSelector)
