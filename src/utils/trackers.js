import {
  initGoogleTag,
  loadGoogleTag,
  dataLayerPush,
} from 'bfxuilib/utils/analytics/googleTag'
import { canUseAnalyticalCookies } from 'bfxuilib/functions/web/cookieBanner'

import config from 'config'

const { showFrameworkMode } = config

const loadAnalytics = () => {
  loadGoogleTag()

  if (!showFrameworkMode) {
    canUseAnalyticalCookies()
      .then((accepted) => initGoogleTag({ accepted }))
  } else initGoogleTag() // No need for waiting cookies confirmation in the app
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
