import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'

import MultiSelect from 'ui/MultiSelect'

class MultiSymbolSelector extends PureComponent {
  static propTypes = {
    coins: PropTypes.arrayOf(PropTypes.string),
    currencies: PropTypes.objectOf(PropTypes.string),
    currentFilters: PropTypes.arrayOf(PropTypes.string),
    existingCoins: PropTypes.arrayOf(PropTypes.string),
    inactiveCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleSymbol: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    coins: [],
    currencies: {},
    currentFilters: [],
    existingCoins: [],
  }

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
        text={text}
        key={symbol}
        active={active}
        className={classes}
        onClick={handleClick}
        label={currencies[symbol]}
        disabled={disabled || symbol === 'inactive'}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
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
      toggleSymbol,
      existingCoins,
      currentFilters,
      inactiveCurrencies,
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
        items={items}
        tagRenderer={coin => coin}
        onItemSelect={toggleSymbol}
        selectedItems={currentFilters}
        itemRenderer={this.renderSymbol}
        itemPredicate={this.itemPredicate}
        disabled={!coins.length && !existingCoins.length}
        tagInputProps={{ tagProps: { minimal: true }, onRemove: toggleSymbol }}
      />
    )
  }
}

export default MultiSymbolSelector
