import React from 'react'
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

function QueryRangeMenu() {
  return (
    <Menu>
      <MenuItem text='Last 24 hours' disabled />
      <MenuItem text='Yesterday' disabled />
      <MenuItem text='Last 2 weeks' active />
      <MenuItem text='Month to date' disabled />
      <MenuItem text='Past month' disabled />
      <MenuItem text='Past 3 month' disabled />
      <MenuItem text='Custom (max range 3 months)' disabled />
    </Menu>
  )
}

function Timeframe() {
  return (
    <Card interactive elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12' align='right'>
      <ButtonGroup minimal>
        <Popover content={<QueryRangeMenu />} position={Position.BOTTOM_LEFT}>
          <Button icon='database' rightIcon='caret-down'>Query Range</Button>
        </Popover>
        <Button icon='cloud-download' disabled>Download</Button>
      </ButtonGroup>
    </Card>
  )
}

export default Timeframe
