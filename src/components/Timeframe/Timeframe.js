import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'

import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
  Menu,
  MenuItem,
  Popover,
  Position,
} from '@blueprintjs/core'

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

QueryRangeMenu.propTypes = {
  intl: PropTypes.object.isRequired,
}

function Timeframe({ intl }) {
  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12' align='right'>
      <ButtonGroup minimal>
        <Popover content={<QueryRangeMenu intl={intl} />} position={Position.BOTTOM_LEFT}>
          <Button icon='database' rightIcon='caret-down'>{intl.formatMessage({ id: 'timeframe.queryrange' })}</Button>
        </Popover>
        <Button icon='cloud-download' disabled>{intl.formatMessage({ id: 'timeframe.download' })}</Button>
      </ButtonGroup>
    </Card>
  )
}

Timeframe.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(Timeframe)
