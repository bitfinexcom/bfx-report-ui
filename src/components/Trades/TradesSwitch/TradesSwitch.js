import React from 'react'
import { withTranslation } from 'react-i18next'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import { propTypes, defaultProps } from './TradesSwitch.props'

class TradesSwitch extends React.PureComponent {
  switchSection = (e) => {
    const { value } = e.currentTarget
    const { target, history } = this.props

    if (value === target) {
      return
    }

    history.push({
      pathname: getPath(value),
      search: history.location.search,
    })
  }

  render() {
    const {
      target,
      t,
    } = this.props

    return (
      <ButtonGroup className='section-switch'>
        <Button
          value={queryConstants.MENU_TRADES}
          intent={target === queryConstants.MENU_TRADES ? Intent.PRIMARY : undefined}
          onClick={this.switchSection}
        >
          {t('trades.title')}
        </Button>
        <Button
          value={queryConstants.MENU_CANDLES}
          intent={target === queryConstants.MENU_CANDLES ? Intent.PRIMARY : undefined}
          onClick={this.switchSection}
        >
          {t('candles.title')}
        </Button>
      </ButtonGroup>
    )
  }
}

TradesSwitch.propTypes = propTypes
TradesSwitch.defaultProps = defaultProps

export default withTranslation('translations')(TradesSwitch)
