import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import { IconNames } from '@blueprintjs/icons'

class SymbolSelector extends PureComponent {
  render() {
    const {
      coins,
      currencies,
      currentCoin,
      existingCoins,
      onSymbolSelect,
      wildCard,
    } = this.props

    const renderSymbol = (symbol, { modifiers }) => {
      if (!modifiers.matchesPredicate) {
        return null
      }
      const isCurrent = currentCoin === symbol
      const className = (wildCard.includes(symbol) || existingCoins.includes(symbol)) && !isCurrent
        ? 'bitfinex-queried-symbol' : ''

      return (
        <MenuItem
          className={className}
          active={modifiers.active}
          intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
          disabled={modifiers.disabled}
          key={symbol}
          onClick={() => onSymbolSelect(symbol)}
          text={symbol}
          label={currencies[symbol]}
        />
      )
    }

    const filterSymbol = (query, coin) => coin.toLowerCase().indexOf(query.toLowerCase()) >= 0

    return (
      <Select
        disabled={!coins.length}
        items={coins}
        itemRenderer={renderSymbol}
        itemPredicate={filterSymbol}
        onItemSelect={onSymbolSelect}
      >
        <Button
          text={currentCoin.toUpperCase()}
          rightIcon={IconNames.CARET_DOWN}
          disabled={!coins.length}
        />
      </Select>
    )
  }
}

SymbolSelector.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  currencies: PropTypes.objectOf(PropTypes.string),
  currentCoin: PropTypes.string.isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  onSymbolSelect: PropTypes.func.isRequired,
  wildCard: PropTypes.arrayOf(PropTypes.string),
}
SymbolSelector.defaultProps = {
  coins: [],
  currencies: {},
  existingCoins: [],
  wildCard: [],
}

export default SymbolSelector
