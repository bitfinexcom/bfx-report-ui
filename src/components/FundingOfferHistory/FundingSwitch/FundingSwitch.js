import React from 'react'
import { withTranslation } from 'react-i18next'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

import { propTypes, defaultProps } from './FundingSwitch.props'

class FundingSwitch extends React.PureComponent {
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
          value={queryConstants.MENU_FOFFER}
          intent={target === queryConstants.MENU_FOFFER ? Intent.PRIMARY : undefined}
          onClick={this.switchSection}
        >
          {t('navItems.myHistory.fundingTabs.bidsOffers')}
        </Button>
        <Button
          value={queryConstants.MENU_FLOAN}
          intent={target === queryConstants.MENU_FLOAN ? Intent.PRIMARY : undefined}
          onClick={this.switchSection}
        >
          {t('navItems.myHistory.fundingTabs.loans')}
        </Button>
        <Button
          value={queryConstants.MENU_FCREDIT}
          intent={target === queryConstants.MENU_FCREDIT ? Intent.PRIMARY : undefined}
          onClick={this.switchSection}
        >
          {t('navItems.myHistory.fundingTabs.credits')}
        </Button>
      </ButtonGroup>
    )
  }
}

FundingSwitch.propTypes = propTypes
FundingSwitch.defaultProps = defaultProps

export default withTranslation('translations')(FundingSwitch)
