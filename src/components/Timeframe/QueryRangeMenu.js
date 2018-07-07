import React from 'react'
import { injectIntl } from 'react-intl'
import {
  Menu,
  MenuItem,
} from '@blueprintjs/core'
import { propTypes, defaultProps } from './QueryRangeMenu.props'

function QueryRangeMenu({ intl }) {
  return (
    <Menu>
      <MenuItem text={intl.formatMessage({ id: 'timeframe.24h' })} disabled />
      <MenuItem text={intl.formatMessage({ id: 'timeframe.yesterday' })} disabled />
      <MenuItem text={intl.formatMessage({ id: 'timeframe.2w' })} active />
      <MenuItem text={intl.formatMessage({ id: 'timeframe.month_to_date' })} disabled />
      <MenuItem text={intl.formatMessage({ id: 'timeframe.past_month' })} disabled />
      <MenuItem text={intl.formatMessage({ id: 'timeframe.past_3m' })} disabled />
      <MenuItem text={intl.formatMessage({ id: 'timeframe.custom' })} disabled />
    </Menu>
  )
}

QueryRangeMenu.propTypes = propTypes
QueryRangeMenu.defaultProps = defaultProps

export default injectIntl(QueryRangeMenu)
