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
  } else initGoogleTag()
}
