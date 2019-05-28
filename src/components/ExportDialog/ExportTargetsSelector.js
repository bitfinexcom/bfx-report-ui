import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Intent, MenuItem } from '@blueprintjs/core'
import { MultiSelect } from '@blueprintjs/select'

import { ORDERED_TARGETS } from 'state/query/utils'

class ExportTargetsSelector extends PureComponent {
  render() {
    const {
      currentTargets,
      toggleTarget,
      t,
    } = this.props

    const renderTarget = (item, { modifiers }) => {
      if (!modifiers.matchesPredicate) {
        return null
      }

      const isCurrent = currentTargets.includes(item)

      return (
        <MenuItem
          active={modifiers.active}
          intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
          disabled={modifiers.disabled}
          key={item}
          onClick={() => toggleTarget(item)}
          text={t(`${item}.title`)}
        />
      )
    }

    const filterTarget = (query, item) => item.toLowerCase().indexOf(query.toLowerCase()) >= 0
    const renderTag = item => t(`${item}.title`)

    return (
      <MultiSelect
        className='bitfinex-multi-select'
        items={ORDERED_TARGETS}
        itemRenderer={renderTarget}
        itemPredicate={filterTarget}
        onItemSelect={toggleTarget}
        popoverProps={{ minimal: true }}
        tagInputProps={{
          tagProps: { minimal: true },
          onRemove: (target, index) => toggleTarget(currentTargets[index]),
        }}
        tagRenderer={renderTag}
        selectedItems={currentTargets}
        resetOnSelect
      />
    )
  }
}

ExportTargetsSelector.propTypes = {
  currentTargets: PropTypes.arrayOf(PropTypes.string),
  toggleTarget: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}
ExportTargetsSelector.defaultProps = {
  currentTargets: [],
}

export default withTranslation('translations')(ExportTargetsSelector)
