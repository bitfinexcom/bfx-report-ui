import React from 'react'
import PropTypes from 'prop-types'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

const FundingSwitch = ({
  t,
  target,
  history,
}) => {
  const switchSection = (e) => {
    const { value } = e.currentTarget
    if (value === target) {
      return
    }

    history.push({
      pathname: getPath(value),
      search: history.location.search,
    })
  }

  return (
    <ButtonGroup className='section-switch'>
      <Button
        value={queryConstants.MENU_FOFFER}
        intent={target === queryConstants.MENU_FOFFER ? Intent.PRIMARY : undefined}
        onClick={switchSection}
      >
        {t('navItems.myHistory.fundingTabs.bidsOffers')}
      </Button>
      <Button
        value={queryConstants.MENU_FLOAN}
        intent={target === queryConstants.MENU_FLOAN ? Intent.PRIMARY : undefined}
        onClick={switchSection}
      >
        {t('navItems.myHistory.fundingTabs.loans')}
      </Button>
      <Button
        value={queryConstants.MENU_FCREDIT}
        intent={target === queryConstants.MENU_FCREDIT ? Intent.PRIMARY : undefined}
        onClick={switchSection}
      >
        {t('navItems.myHistory.fundingTabs.credits')}
      </Button>
    </ButtonGroup>
  )
}

FundingSwitch.propTypes = {
  target: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

export default FundingSwitch
