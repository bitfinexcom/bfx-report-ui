import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Menu,
  MenuDivider,
  MenuItem,
} from '@blueprintjs/core'
import Timeframe from 'components/Timeframe'
import Ledgers from 'components/Ledgers'
import Movements from 'components/Movements'
import Orders from 'components/Orders'
import Trades from 'components/Trades'
import { propTypes, defaultProps } from './ContentContainer.props'

class ContentContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  state = {
    target: 'ledgers',
  }

  handleClick(target) {
    return () => {
      this.setState({ target })
    }
  }

  render() {
    const { intl } = this.props
    const { target } = this.state
    let content
    switch (target) {
      case 'ledgers':
        content = (<Ledgers />)
        break
      case 'trades':
        content = (<Trades />)
        break
      case 'orders':
        content = (<Orders />)
        break
      case 'deposits':
        content = (<Movements type='deposits' />)
        break
      case 'withdrawals':
        content = (<Movements type='withdrawals' />)
        break
      default:
        content = (<Ledgers />)
        break
    }
    return (
      <div className='row'>
        <Menu large className='col-xs-12 col-sm-2 col-md-2 col-lg-2'>
          <Timeframe />
          <MenuDivider />
          <MenuItem icon='folder-close' text={intl.formatMessage({ id: 'ledgers.title' })} onClick={() => this.handleClick('ledgers')} active={this.state.target === 'ledgers'} />
          <MenuItem icon='folder-close' text={intl.formatMessage({ id: 'trades.title' })} onClick={() => this.handleClick('trades')} active={this.state.target === 'trades'} />
          <MenuItem icon='folder-close' text={intl.formatMessage({ id: 'orders.title' })} onClick={() => this.handleClick('orders')} active={this.state.target === 'orders'} />
          <MenuItem icon='folder-close' text={intl.formatMessage({ id: 'movements.title' })} onClick={() => this.handleClick('movements')} active={this.state.target === 'movements'} />
        </Menu>
        <div className='col-xs-12 col-sm-10 col-md-10 col-lg-10'>
          {content}
        </div>
      </div>
    )
  }
}

ContentContainer.propTypes = propTypes
ContentContainer.defaultProps = defaultProps

export default injectIntl(ContentContainer)
