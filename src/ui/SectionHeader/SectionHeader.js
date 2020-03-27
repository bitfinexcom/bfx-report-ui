import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'

import ColumnsFilter from 'ui/ColumnsFilter'
import TimeRange from 'ui/TimeRange'
import RefreshButton from 'ui/RefreshButton'
import MultiSymbolSelector from 'ui/MultiSymbolSelector'

import { propTypes, defaultProps } from './SectionHeader.props'

class SectionHeader extends PureComponent {
  render() {
    const {
      title,
      target,
      symbolSelectorProps,
      refresh,
      t,
    } = this.props

    return (
      <div className='section-header'>
        <div className='section-header-title'>
          {t(title)}
        </div>
        <TimeRange className='section-header-time-range' />
        <div>
          <div>
            {t('selector.filter.symbol')}
          </div>
          <MultiSymbolSelector {...symbolSelectorProps} />
          <ColumnsFilter target={target} />
          <RefreshButton handleClickRefresh={refresh} />
        </div>
      </div>
    )
  }
}

SectionHeader.propTypes = propTypes
SectionHeader.defaultProps = defaultProps

export default withTranslation('translations')(SectionHeader)
