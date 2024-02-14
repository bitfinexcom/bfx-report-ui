import config from 'config'

import {
  initGoogleTag,
  loadGoogleTag,
  dataLayerPush,
} from './goggleTag'
import { canUseAnalyticalCookies } from './cookieBanner'

const { showFrameworkMode } = config
const { REACT_APP_ENV } = process.env

const loadAnalytics = () => {
  loadGoogleTag()

  if (!showFrameworkMode) {
    canUseAnalyticalCookies()
      .then((accepted) => initGoogleTag({ env: REACT_APP_ENV, accepted }))
  } else initGoogleTag({ env: REACT_APP_ENV }) // No need for waiting cookies confirmation in the app
}

const createTracker = () => {
  loadAnalytics()

  const gtmTrackEvent = (label, source, event = 'click') => {
    dataLayerPush({
      event,
      label,
      area_source: source,
    })
  }

  return {
    trackEvent: (label, source, event) => {
      gtmTrackEvent(label, source, event)
    },
  }
}

export const tracker = createTracker()
