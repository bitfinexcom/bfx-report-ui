import React from 'react'
import {
  Button,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
} from '@blueprintjs/core'

function handleClick(event) {
  if (event.target.name === 'dark') {
    document.body.className = 'pt-dark'
  } else {
    document.body.className = ''
  }
}

function Header() {
  return (
    <Navbar>
      <NavbarGroup align='left'>
        <NavbarHeading>Bfx Report</NavbarHeading>
      </NavbarGroup>
      <NavbarGroup align='right'>
        <Button name='light' className='pt-minimal' text='Light' onClick={handleClick} />
        <NavbarDivider />
        <Button name='dark' className='pt-minimal' text='Dark' onClick={handleClick} />
      </NavbarGroup>
    </Navbar>
  )
}

export default Header
