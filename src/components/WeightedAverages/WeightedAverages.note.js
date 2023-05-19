import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { formatDate } from 'state/utils'
import { getTimezone } from 'state/base/selectors'

const REPORTS_LINK = 'https://reporting.bitfinex.com/'

const LimitNote = ({ start, end }) => {
  const { t } = useTranslation()
  const timezone = useSelector(getTimezone)
  return (
    <div className='limit-note'>
      <p className='limit-note--header'>
        {t('weightedaverages.limitNote.displayDate')}
        {`${formatDate(start, timezone)} - ${formatDate(end, timezone)}`}
      </p>
      <div className='limit-note--body'>
        {t('weightedaverages.limitNote.note1')}
        <br />
        <a
          target='_blank'
          href={REPORTS_LINK}
          rel='noopener noreferrer'
          className='limit-note--body-link'
        >
          {t('weightedaverages.limitNote.link')}
        </a>
        {t('weightedaverages.limitNote.note2')}
      </div>
    </div>
  )
}

LimitNote.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
}

export default memo(LimitNote)
