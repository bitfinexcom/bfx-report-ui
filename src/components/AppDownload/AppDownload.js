import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Button } from '@blueprintjs/core'

import config from 'var/electronVersion'
import { getOS, PLATFORMS } from 'utils/getOS'

import PropTypes from 'prop-types'

const { DEFAULT_ELECTRON_VERSION, LATEST_ELECTRON_RELEASE_LINK, getElectronReleaseLink } = config

const getData = (version) => {
  const platform = getOS()

  console.log('+++platform', platform)

  switch (platform) {
    case PLATFORMS.mac:
      return {
        text: 'header.mac',
        link: getElectronReleaseLink({ version, platform, ext: 'zip' }),
      }
    case PLATFORMS.windows:
      return {
        text: 'header.windows',
        link: getElectronReleaseLink({ version, platform, ext: 'exe' }),
      }
    case PLATFORMS.linux:
    default:
      return {
        text: 'header.linux',
        link: getElectronReleaseLink({ version, platform, ext: 'AppImage.zip' }),
      }
  }
}

class AppDownload extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
    latestElectronVersion: DEFAULT_ELECTRON_VERSION,
  }

  componentDidMount() {
    fetch(LATEST_ELECTRON_RELEASE_LINK).then(res => res.json()).then(res => {
      const { tag_name: latestElectronVersion } = res
      if (latestElectronVersion) {
        this.setState({ latestElectronVersion })
      }
    })
    this.setState({
      isLoading: false,
    })
  }

  render() {
    const { isLoading, latestElectronVersion } = this.state
    const { t } = this.props

    const { text, link } = getData(latestElectronVersion)

    return (
      <Button
        className='lp-header-install-btn'
        onClick={() => {
          window.open(link)
        }}
        loading={isLoading}
      >
        {t(text)}
      </Button>
    )
  }
}

export default withTranslation('translations')(AppDownload)
