import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'

import ColumnsFilter from 'ui/ColumnsFilter'
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import MultiPairSelector from 'ui/MultiPairSelector'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'
import PairSelector from 'ui/PairSelector'
import SymbolSelector from 'ui/SymbolSelector'

import { propTypes, defaultProps } from './SectionHeader.props'

class SectionHeader extends PureComponent {
  getSelector = () => {
    const {
      pairSelectorProps,
      pairsSelectorProps,
      symbolSelectorProps,
      symbolsSelectorProps,
    } = this.props

    if (symbolSelectorProps) {
      return <SymbolSelector {...symbolSelectorProps} />
    }
    if (symbolsSelectorProps) {
      return <MultiSymbolSelector {...symbolsSelectorProps} />
    }
    if (pairSelectorProps) {
      return <PairSelector {...pairSelectorProps} />
    }
    if (pairsSelectorProps) {
      return <MultiPairSelector {...pairsSelectorProps} />
    }

    return null
  }

  render() {
    const {
      filter,
      title,
      target,
      refresh,
      t,
    } = this.props

    const selector = this.getSelector()

    return (
      <div className='section-header'>
        <div className='section-header-title'>
          {t(title)}
        </div>
        <TimeRange className='section-header-time-range' />
        <div>
          {selector && (
            <Fragment>
              <div>
                {t('selector.filter.symbol')}
              </div>
              {selector}
            </Fragment>
          )}
          {filter && <ColumnsFilter target={target} />}
          {refresh && <RefreshButton handleClickRefresh={refresh} />}
        </div>
      </div>
    )
  }
}

SectionHeader.propTypes = propTypes
SectionHeader.defaultProps = defaultProps

export default withTranslation('translations')(SectionHeader)
