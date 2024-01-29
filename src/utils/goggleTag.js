import _forEach from 'lodash/forEach'
import _includes from 'lodash/includes'
import _keys from 'lodash/keys'
import _get from 'lodash/get'

import { loadScript } from './browser'
import { getBfxEnvName } from '../var/platform'
import { logger } from '../../functions/utils'

const GOOGLE_TAG_PARAMS_BY_ENV = {
  production: 'id=GTM-563T9K2&gtm_auth=vIxlKeWaoJV1jbfRu0Kmow&gtm_preview=env-1&gtm_cookies_win=x',
  staging: 'id=GTM-563T9K2&gtm_auth=hCNAo7MSiEpKxv4ASFJ6IA&gtm_preview=env-44&gtm_cookies_win=x',
}

const GOOGLE_TAG_SUPPORTED_ENVS = _keys(GOOGLE_TAG_PARAMS_BY_ENV)

const GOOGLE_TAG_INIT_DEFAULT_OPTIONS = {
  env: getBfxEnvName(),
  accepted: true,
}

// @testable
const state = {
  initialised: false,
  queueCallbacks: [],
  params: undefined,
}

export const initGoogleTag = (options) => {
  const env = _get(options, 'env', GOOGLE_TAG_INIT_DEFAULT_OPTIONS.env)
  const accepted = _get(options, 'accepted', GOOGLE_TAG_INIT_DEFAULT_OPTIONS.accepted)

  if (!window) {
    logger.warn('GTM: window object unavailable')
    return
  }

  if (state.initialised) {
    logger.warn('GTM: initialised already')
    return
  }

  if (!_includes(GOOGLE_TAG_SUPPORTED_ENVS, env)) {
    logger.error(`GTM: unsupported env "${env}"`)
    return
  }

  state.params = GOOGLE_TAG_PARAMS_BY_ENV[env]

  if (!state.params) {
    logger.error(`GTM: unknown env "${env}"`)
    return
  }

  if (accepted) {
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    })
  }
  /*
    <noscript><iframe required only for users who disabled javascript on websites.
    We can skip it because our SPA is not working without JS.
  */
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  loadScript(`https://www.googletagmanager.com/gtm.js?${state.params}`)

  _forEach(state.queueCallbacks, (callback) => callback())
  state.queueCallbacks = []
  state.initialised = true
}

export const loadGoogleTag = () => {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  if (window?.dataLayer?.length === 0) {
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    })
  }
}

const exec = (callback) => {
  if (state.initialised) {
    callback()
  } else {
    state.queueCallbacks.push(callback)
  }
}

export const setUserId = (userId) => {
  exec(() => window.dataLayer.push({ userId }))
}

export const dataLayerPush = (data) => {
  exec(() => window.dataLayer.push(data))
}

export const gtag = (...args) => {
  exec(() => window.gtag(...args))
}
