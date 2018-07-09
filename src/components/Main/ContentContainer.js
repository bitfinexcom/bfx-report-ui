import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Menu,
  MenuItem,
} from '@blueprintjs/core'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Trades from 'components/Trades'
import { propTypes, defaultProps } from './ContentContainer.props'

const MENU_LEDGERS = 'ledgers'
const MENU_ORDERS = 'orders'
const MENU_TRADES = 'trades'
const MENU_MOVEMENTS = 'movements'

class ContentContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClickLedgers = this.handleClick.bind(this, MENU_LEDGERS)
    this.handleClickOrders = this.handleClick.bind(this, MENU_ORDERS)
    this.handleClickTrades = this.handleClick.bind(this, MENU_TRADES)
    this.handleClickMovements = this.handleClick.bind(this, MENU_MOVEMENTS)
  }

  state = {
    target: MENU_LEDGERS,
  }

  handleClick(target) {
    this.setState({ target })
  }

  render() {
    const { intl } = this.props
    const { target } = this.state
    let content
    switch (target) {
      case MENU_LEDGERS:
        content = (<Ledgers />)
        break
      case MENU_TRADES:
        content = (<Trades />)
        break
      case MENU_ORDERS:
        content = (<Orders />)
        break
      case MENU_MOVEMENTS:
        content = (<Movements />)
        break
      default:
        content = (<Ledgers />)
        break
    }
    return (
      <div className='row'>
        <Menu large className='col-xs-12 col-sm-12 col-md-12 col-lg-1 col-xl-2'>
          <MenuItem
            icon='book'
            text={intl.formatMessage({ id: 'ledgers.title' })}
            onClick={this.handleClickLedgers}
            active={target === MENU_LEDGERS}
          />
          <MenuItem
            icon='exchange'
            text={intl.formatMessage({ id: 'trades.title' })}
            onClick={this.handleClickTrades}
            active={target === MENU_TRADES}
          />
          <MenuItem
            icon='flows'
            text={intl.formatMessage({ id: 'orders.title' })}
            onClick={this.handleClickOrders}
            active={target === MENU_ORDERS}
          />
          <MenuItem
            icon='folder-close'
            text={intl.formatMessage({ id: 'movements.title' })}
            onClick={this.handleClickMovements}
            active={target === MENU_MOVEMENTS}
          />
        </Menu>
        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-10'>
          {content}
        </div>
      </div>
    )
  }
}

ContentContainer.propTypes = propTypes
ContentContainer.defaultProps = defaultProps

export default injectIntl(ContentContainer)
