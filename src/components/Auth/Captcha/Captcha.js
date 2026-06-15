import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import _get from 'lodash/get'
import _first from 'lodash/first'
import _isArray from 'lodash/isArray'
import ReCAPTCHA from 'react-google-recaptcha'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { isEqual } from '@bitfinex/lib-js-util-base'

import config from 'config'
import { getCaptchaProviders, isCaptchaRequired } from 'state/utils'

const { recaptchaSiteKey, hcaptchaSiteKey } = config

const getCaptchaConfig = (provider) => {
  if (provider === 'recaptcha') {
    return {
      Component: ReCAPTCHA,
      sitekey: recaptchaSiteKey,
      getToken: (captchaRef) => captchaRef.current.executeAsync(),
      reset: (captchaRef) => captchaRef.current.reset(),
    }
  }
  return {
    Component: HCaptcha,
    sitekey: hcaptchaSiteKey,
    getToken: async (captchaRef) => {
      const res = await captchaRef.current.execute({ async: true })
      return _get(res, 'response')
    },
    reset: (captchaRef) => captchaRef.current.resetCaptcha(),
  }
}

const checkCaptchaRequired = async (method) => {
  try {
    const { result } = await isCaptchaRequired(method)
    // fail-safe: only an explicit `false` means the captcha can be skipped
    return !isEqual(result, false)
  } catch (e) {
    return true
  }
}

// the widget needs its script loaded before `execute()`; even then the first
// execute can reject with a transient `network-error` (notably on an unauthorized
// host like localhost) - we wait for load, then retry once on failure
const WIDGET_LOAD_TIMEOUT = 8000
const RETRY_DELAY = 600

const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms) })

const createDeferred = () => {
  const deferred = {}
  deferred.promise = new Promise((resolve) => { deferred.resolve = resolve })
  return deferred
}

// Invisible captcha widget that auto-selects the provider returned by the
// BFX `captcha/providers` endpoint (reCAPTCHA or hCaptcha). Exposes an
// imperative `getToken(method)` for the auth forms to call before login.
const Captcha = forwardRef((props, ref) => {
  const captchaRef = useRef(null)
  const [provider, setProvider] = useState()
  // resolves once the widget signals (onLoad) that it is ready to `execute()`
  const loadedRef = useRef()
  if (!loadedRef.current) {
    loadedRef.current = createDeferred()
  }

  useEffect(() => {
    let isSubscribed = true
    getCaptchaProviders()
      .then(({ result }) => {
        if (isSubscribed && _isArray(result)) setProvider(_first(result))
      })
      .catch(() => {})
    return () => {
      isSubscribed = false
    }
  }, [])

  const {
    Component,
    sitekey,
    getToken,
    reset,
  } = getCaptchaConfig(provider)

  // the class-based auth forms hold a ref to this component and must pull a fresh
  // token on submit (an imperative, on-demand action that returns a promise, not
  // declarative data) - and only this component can drive the widget via its ref.
  // useImperativeHandle exposes a clean `getToken` over that ref while hiding the
  // provider/required/execute/reset internals.
  useImperativeHandle(ref, () => ({
    getToken: async (method) => {
      const isRequired = await checkCaptchaRequired(method)
      if (!isRequired) {
        return { captchaToken: null, captchaProvider: provider }
      }
      // wait for the widget to load (timeout guards a stuck load), then run it;
      // the first execute can still reject (network-error before the challenge is
      // ready / unauthorized host), so reset and retry once - the second attempt
      // reliably succeeds
      await Promise.race([loadedRef.current.promise, delay(WIDGET_LOAD_TIMEOUT)])
      try {
        const captchaToken = await getToken(captchaRef)
        return { captchaToken, captchaProvider: provider }
      } catch (err) {
        reset(captchaRef)
        await delay(RETRY_DELAY)
        const captchaToken = await getToken(captchaRef)
        return { captchaToken, captchaProvider: provider }
      } finally {
        // always reset so a failed/cancelled challenge doesn't block a retry
        reset(captchaRef)
      }
    },
  }))

  return (
    <Component
      theme='dark'
      ref={captchaRef}
      sitekey={sitekey}
      size='invisible'
      onLoad={() => loadedRef.current.resolve()}
      asyncScriptOnLoad={() => loadedRef.current.resolve()}
    />
  )
})

Captcha.displayName = 'Captcha'

export default Captcha
