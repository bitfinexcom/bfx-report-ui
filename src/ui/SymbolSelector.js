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
  filterSymbol = (query, coin) => coin.toLowerCase().indexOf(query.toLowerCase()) >= 0

  renderSymbol = (symbol, { modifiers, handleClick }) => {
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
        disabled={!coins.length}
        items={coins}
        itemRenderer={this.renderSymbol}
        itemPredicate={this.filterSymbol}
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
