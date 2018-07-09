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


function Timeframe({
  intl, setTimeRange, start, end, timeRange,
}) {
  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12' align='left'>
      <ButtonGroup minimal>
        <Popover content={<QueryRangeMenu intl={intl} setTimeRange={setTimeRange} start={start} end={end} timeRange={timeRange} />} position={Position.BOTTOM_LEFT}>
          <Button rightIcon='caret-down'>{formatDate(start)} — {formatDate(end)}</Button>
        </Popover>
      </ButtonGroup>
    </Card>
  )
}

Timeframe.propTypes = propTypes
Timeframe.defaultProps = defaultProps

export default injectIntl(Timeframe)
