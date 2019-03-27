import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { propTypes, defaultProps } from './MultiSymbolSelector.props'

class MultiSymbolSelector extends PureComponent {
  render() {
    const {
      coins,
      currencies,
      currentFilters,
      existingCoins,
      handleTagRemove,
      onSymbolSelect,
      t,
    } = this.props

    const renderSymbol = (symbol, { modifiers }) => {
      if (!modifiers.matchesPredicate) {
        return null
      }
      const isCurrent = currentFilters.includes(symbol)
      const className = existingCoins.includes(symbol) && !isCurrent
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
          label={currencies[symbol]}
        />
      )
    }

    const filterSymbol = (query, coin) => coin.toLowerCase().indexOf(query.toLowerCase()) >= 0
    const renderTag = coin => coin.toUpperCase()

    return (
      <MultiSelect
        className='bitfinex-multi-select'
        disabled={coins.length === 0}
        placeholder={t('selector.filter.symbol')}
        items={coins || existingCoins}
        itemRenderer={renderSymbol}
        itemPredicate={filterSymbol}
        onItemSelect={onSymbolSelect}
        popoverProps={{ minimal: true }}
        tagInputProps={{ tagProps: { minimal: true }, onRemove: handleTagRemove }}
        tagRenderer={renderTag}
        selectedItems={currentFilters}
        resetOnSelect
      />
    )
  }
}

MultiSymbolSelector.propTypes = propTypes
MultiSymbolSelector.defaultProps = defaultProps

export default withTranslation('translations')(MultiSymbolSelector)
