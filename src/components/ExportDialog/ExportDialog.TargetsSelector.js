import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Intent, MenuItem } from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { filterSelectorItem } from 'ui/utils'
import { ORDERED_TARGETS } from 'state/query/utils'

class ExportDialogTargetsSelector extends PureComponent {
  renderTag = (item) => {
    const { t } = this.props
    return t(`${item}.title`)
  }

  renderTarget = (item, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const { currentTargets } = this.props
    const isCurrent = currentTargets.includes(item)

    return (
      <MenuItem
        active={modifiers.active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={modifiers.disabled}
        key={item}
        onClick={handleClick}
        text={this.renderTag(item)}
      />
    )
  }

  render() {
    const { currentTargets, toggleTarget } = this.props

    return (
      <MultiSelect
        className='bitfinex-select'
        items={ORDERED_TARGETS}
        itemRenderer={this.renderTarget}
        itemPredicate={filterSelectorItem}
        onItemSelect={toggleTarget}
        popoverProps={{ minimal: true }}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: (target, index) => toggleTarget(currentTargets[index]),
        }}
        tagRenderer={this.renderTag}
        selectedItems={currentTargets}
        resetOnSelect
      />
    )
  }
}

ExportDialogTargetsSelector.propTypes = {
  currentTargets: PropTypes.arrayOf(PropTypes.string),
  toggleTarget: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
ExportDialogTargetsSelector.defaultProps = {
  currentTargets: [],
}

export default withTranslation('translations')(ExportDialogTargetsSelector)
