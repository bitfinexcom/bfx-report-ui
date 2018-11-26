import React, { PureComponent } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import PropTypes from 'prop-types'
import {
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { getFilterType } from 'state/query/utils'

class MultiSymbolSelector extends PureComponent {
  render() {
    const {
      coinList,
      coins,
      currencies,
      currentFilters,
      existingCoins,
      handleTagRemove,
      intl,
      onSymbolSelect,
      type,
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
    const renderTag = coin => coin

    const title = `selector.${getFilterType(type)}.filter`
    return (
      <MultiSelect
        className='bitfinex-multi-select'
        disabled={coins.length === 0}
        placeholder={intl.formatMessage({ id: title })}
        items={coinList}
        itemRenderer={renderSymbol}
        itemPredicate={filterSymbol}
        onItemSelect={onSymbolSelect}
        popoverProps={{ minimal: true }}
        tagInputProps={{ tagProps: { minimal: true }, onRemove: handleTagRemove }}
        tagRenderer={renderTag}
        selectedItems={currentFilters}
      />
    )
  }
}

MultiSymbolSelector.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.string),
  currencies: PropTypes.objectOf(PropTypes.string),
  coinList: PropTypes.arrayOf(PropTypes.string),
  currentFilters: PropTypes.arrayOf(PropTypes.string),
  existingCoins: PropTypes.arrayOf(PropTypes.string),
  handleTagRemove: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  onSymbolSelect: PropTypes.func.isRequired,
  type: PropTypes.string,
}
MultiSymbolSelector.defaultProps = {
  coins: [],
  currencies: {},
  coinList: [],
  currentFilters: [],
  existingCoins: [],
  type: '',
}

export default injectIntl(MultiSymbolSelector)
