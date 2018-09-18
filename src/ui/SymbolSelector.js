import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'

import { Select } from '@blueprintjs/select'

class SymbolSelector extends PureComponent {
  render() {
    const {
      coinList,
      coins,
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
          onClick={onSymbolSelect(symbol)}
          text={symbol}
        />
      )
    }

    const filterSymbol = (query, coin) => coin.toLowerCase().indexOf(query.toLowerCase()) >= 0

    return (
      <Select
        disabled={coins.length === 0}
        items={coinList}
        itemRenderer={renderSymbol}
        itemPredicate={filterSymbol}
        onItemSelect={onSymbolSelect}
      >
        <Button
          text={currentCoin}
          rightIcon='caret-down'
          disabled={coins.length === 0}
        />
      </Select>
    )
  }
}

SymbolSelector.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  coinList: PropTypes.arrayOf(PropTypes.string),
  currentCoin: PropTypes.string.isRequired,
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  onSymbolSelect: PropTypes.func.isRequired,
  wildCard: PropTypes.arrayOf(PropTypes.string),
}
SymbolSelector.defaultProps = {
  coins: [],
  coinList: [],
  existingCoins: [],
  wildCard: [],
}

export default SymbolSelector
