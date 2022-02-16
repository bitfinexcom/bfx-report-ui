import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

class TradesSwitch extends React.PureComponent {
  static propTypes = {
    target: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      location: PropTypes.objectOf(PropTypes.string),
    }).isRequired,
    t: PropTypes.func.isRequired,
  }

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
      t,
      target,
    } = this.props

    return (
      <ButtonGroup className='section-switch'>
        <Button
          onClick={this.switchSection}
          value={queryConstants.MENU_TRADES}
          intent={target === queryConstants.MENU_TRADES ? Intent.PRIMARY : undefined}
        >
          {t('trades.title')}
        </Button>
        <Button
          onClick={this.switchSection}
          value={queryConstants.MENU_CANDLES}
          intent={target === queryConstants.MENU_CANDLES ? Intent.PRIMARY : undefined}
        >
          {t('candles.title')}
        </Button>
      </ButtonGroup>
    )
  }
}

export default withTranslation('translations')(TradesSwitch)
