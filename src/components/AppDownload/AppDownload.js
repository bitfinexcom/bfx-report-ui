import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Intent } from '@blueprintjs/core'

import config from 'var/electronVersion'

import getDownloadLink from './AppDownload.helpers'

const {
  DEFAULT_ELECTRON_VERSION,
  LATEST_ELECTRON_RELEASE_LINK,
} = config

const AppDownload = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [latestAppVersion, setLatestAppVersion] = useState(DEFAULT_ELECTRON_VERSION)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(LATEST_ELECTRON_RELEASE_LINK)
      const json = await data.json()
      const latestVersion = json?.tag_name
      if (latestVersion) {
        setLatestAppVersion(latestVersion)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const link = getDownloadLink(latestAppVersion)

  return (
    <div className='app-download'>
      <h2 className='app-download--title'>
        {t('download_app.title')}
      </h2>
      <h3 className='app-download--sub-title'>
        {t('download_app.description')}
      </h3>
      <ul className='app-download--list'>
        <li>{t('download_app.risk')}</li>
        <li>{t('download_app.win_loss')}</li>
        <li>{t('download_app.tax')}</li>
        <li>{t('download_app.snapshots')}</li>
        <li>{t('download_app.more')}</li>
      </ul>
      <Button
        loading={isLoading}
        intent={Intent.SUCCESS}
        className='app-download--btn'
        onClick={() => window.open(link)}
      >
        {t('download_app.download_reports')}
      </Button>
    </div>
  )
}

export default AppDownload
