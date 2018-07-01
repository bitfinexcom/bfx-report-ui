import React from 'react'
import { injectIntl } from 'react-intl'
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
  Popover,
  Position,
} from '@blueprintjs/core'
import { formatDate } from 'state/utils'
import QueryRangeMenu from './QueryRangeMenu'
import { propTypes, defaultProps } from './Timeframe.props'


function Timeframe({ intl, start, end }) {
  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12' align='left'>
      <ButtonGroup minimal>
        <Popover content={<QueryRangeMenu intl={intl} />} position={Position.BOTTOM_LEFT}>
          <Button icon='database' rightIcon='caret-down'>{intl.formatMessage({ id: 'timeframe.queryrange' })}</Button>
        </Popover>
        <span className='bitfinex-timerange'>{formatDate(start)} — {formatDate(end)}</span>
      </ButtonGroup>
    </Card>
  )
}

Timeframe.propTypes = propTypes
Timeframe.defaultProps = defaultProps

export default injectIntl(Timeframe)
