import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, ButtonGroup, Intent } from '@blueprintjs/core'
import _map from 'lodash/map'
import { isEqual } from '@bitfinex/lib-js-util-base'

import { tracker } from 'utils/trackers'
import { getPath } from 'state/query/utils'
import RefreshButton from 'ui/RefreshButton'

import getSections from './SectionSwitch.helpers'

const SectionSwitch = ({
  target,
  history,
  refresh,
  hasSubSections,
}) => {
  const { t } = useTranslation()

  const switchSection = (e) => {
    const { value } = e.currentTarget
    if (isEqual(value, target)) {
      return
    }
    tracker.trackEvent(value, 'Tab')
    history.push({
      pathname: getPath(value),
      search: history.location.search,
    })
  }

  const sections = useMemo(
    () => getSections(target, hasSubSections),
    [target, hasSubSections],
  )

  return (
    <div className='section-switch'>
      <ButtonGroup>
        {_map(sections, ({ targetSection, description }) => (
          <Button
            key={description}
            value={targetSection}
            onClick={switchSection}
            intent={isEqual(target, targetSection) ? Intent.PRIMARY : undefined}
          >
            {t(description)}
          </Button>
        ))}
      </ButtonGroup>
      {refresh && <RefreshButton onClick={refresh} />}
    </div>
  )
}

SectionSwitch.propTypes = {
  refresh: PropTypes.func,
  hasSubSections: PropTypes.bool,
  target: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

SectionSwitch.defaultProps = {
  refresh: undefined,
  hasSubSections: false,
}

export default SectionSwitch
