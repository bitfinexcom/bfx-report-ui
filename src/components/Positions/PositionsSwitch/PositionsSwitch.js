import React from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'

import RefreshButton from 'ui/RefreshButton'
import { getPath } from 'state/query/utils'
import queryConstants from 'state/query/constants'

class PositionsSwitch extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      location: PropTypes.shape({ search: PropTypes.string }),
    }).isRequired,
    refresh: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    target: PropTypes.string.isRequired,
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
      refresh,
      target,
    } = this.props

    return (
      <div className='section-switch'>
        <ButtonGroup>
          <Button
            onClick={this.switchSection}
            value={queryConstants.MENU_POSITIONS}
            intent={target === queryConstants.MENU_POSITIONS ? Intent.PRIMARY : undefined}
          >
            {t('positions.closed')}
          </Button>
          <Button
            onClick={this.switchSection}
            value={queryConstants.MENU_POSITIONS_ACTIVE}
            intent={target === queryConstants.MENU_POSITIONS_ACTIVE ? Intent.PRIMARY : undefined}
          >
            {t('positions.active')}
          </Button>
        </ButtonGroup>
        {refresh && <RefreshButton onClick={refresh} />}
      </div>
    )
  }
}

export default withTranslation('translations')(PositionsSwitch)
