import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Intent, MenuItem } from '@blueprintjs/core'

import Select from 'ui/Select'

class SymbolSelector extends PureComponent {
  itemRenderer = (symbol, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    const { t } = this.props

    if (!matchesPredicate) {
      return null
    }

    const { currentCoin, currencies } = this.props
    const isCurrent = currentCoin === symbol
    const text = symbol === 'inactive' ? t('selector.inactive') : symbol

    return (
      <MenuItem
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
      currentCoin,
      inactiveCurrencies,
      onSymbolSelect,
    } = this.props

    const items = inactiveCurrencies.length
      ? [
        ...coins,
        'inactive',
        ...inactiveCurrencies,
      ]
      : coins

    return (
      <Select
        onChange={onSymbolSelect}
        filterable
        itemRenderer={this.itemRenderer}
        itemPredicate={this.itemPredicate}
        items={items}
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
  inactiveCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSymbolSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
SymbolSelector.defaultProps = {
  coins: [],
  currencies: {},
}

export default withTranslation('translations')(SymbolSelector)
