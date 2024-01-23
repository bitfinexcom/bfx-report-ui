import {
  initGoogleTag,
  loadGoogleTag,
  dataLayerPush,
} from 'bfxuilib/utils/analytics/googleTag'
import { canUseAnalyticalCookies } from 'bfxuilib/functions/web/cookieBanner'

import config from 'config'

const isFrameworkMode = config?.showFrameworkMode ?? false

const loadAnalyticsIfCookiesAccepted = () => {
  loadGoogleTag()

  if (!isFrameworkMode) {
    canUseAnalyticalCookies().then((accepted) => {
      if (accepted) {
        initGoogleTag()
      }
    })
  } else initGoogleTag() // No need for waiting cookies confirmation in the app
}

const createTracker = () => {
  loadAnalyticsIfCookiesAccepted()

  const gtmTrackEvent = (label, source, event = 'click') => {
    dataLayerPush({
      label,
      event,
      ...(source && { area_source: source }),
    })
  }

  return {
    trackEvent: (label, source, event) => {
      gtmTrackEvent(label, source, event)
    },
  }
}

export const tracker = createTracker()
