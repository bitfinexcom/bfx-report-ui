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
      onSymbolSelect,
    } = this.props

    const renderSymbol = (symbol, { modifiers }) => {
      const { active, disabled, matchesPredicate } = modifiers
      if (!matchesPredicate) {
        return null
      }
      const isCurrent = currentCoin === symbol

      return (
        <MenuItem
          active={active}
          intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
          disabled={disabled}
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
  onSymbolSelect: PropTypes.func.isRequired,
}
SymbolSelector.defaultProps = {
  coins: [],
  currencies: {},
}

export default SymbolSelector
