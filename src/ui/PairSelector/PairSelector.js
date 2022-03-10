import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Intent, MenuItem } from '@blueprintjs/core'

import Select from 'ui/Select'

class PairSelector extends PureComponent {
  static propTypes = {
    onPairSelect: PropTypes.func.isRequired,
    currentPair: PropTypes.string.isRequired,
    pairs: PropTypes.arrayOf(PropTypes.string),
    inactivePairs: PropTypes.arrayOf(PropTypes.string).isRequired,
    t: PropTypes.func.isRequired,
  }

  static defaultProps = {
    pairs: [],
  }

  itemRenderer = (pair, { modifiers, handleClick }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentPair, t } = this.props
    const isCurrent = currentPair === pair
    const text = pair === 'inactive' ? t('selector.inactive') : pair

    return (
      <MenuItem
        key={pair}
        text={text}
        active={active}
        onClick={handleClick}
        disabled={disabled || pair === 'inactive'}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
      />
    )
  }

  itemPredicate = (query, item) => {
    if (item === 'inactive') {
      const { inactivePairs } = this.props
      return !!inactivePairs.find((pair) => pair.toLowerCase().indexOf(query.toLowerCase()) >= 0)
    }

    return item.toLowerCase().indexOf(query.toLowerCase()) >= 0
  }

  render() {
    const {
      pairs,
      currentPair,
      onPairSelect,
      inactivePairs,
    } = this.props

    const items = inactivePairs.length
      ? [
        ...pairs,
        'inactive',
        ...inactivePairs,
      ]
      : pairs

    return (
      <Select
        filterable
        items={items}
        value={currentPair}
        onChange={onPairSelect}
        itemRenderer={this.itemRenderer}
        itemPredicate={this.itemPredicate}
        popoverClassName='bitfinex-select-menu--pair'
      />
    )
  }
}

export default withTranslation('translations')(PairSelector)
