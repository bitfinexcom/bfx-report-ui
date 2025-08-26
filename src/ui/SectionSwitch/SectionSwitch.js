import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
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
  refresh,
  hasSubSections,
}) => {
  const history = useHistory()
  const { t } = useTranslation()

  const switchSection = useCallback((e) => {
    const { value } = e.currentTarget
    if (isEqual(value, target)) {
      return
    }
    tracker.trackEvent(value, 'Tab')
    history.push({
      pathname: getPath(value),
      search: history.location.search,
    })
  }, [target, history, getPath])

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
}

SectionSwitch.defaultProps = {
  refresh: undefined,
  hasSubSections: false,
}

export default SectionSwitch
