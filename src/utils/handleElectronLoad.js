import _isNull from 'lodash/isNull'

import { store } from 'state/store'
import { checkAuth } from 'state/auth/actions'
import { setApiPort } from 'state/base/actions'
import { electronBackendLoaded } from 'state/ui/actions'
import { setElectronMenuHidden, getElectronMenuConfig } from 'state/electronMenu/actions'
import {
  setAutoUpdateToastTemplate,
  setAutoUpdateToastProgress,
} from 'state/electronAutoUpdateToast/actions'

const handleElectronLoad = () => {
  window.document.addEventListener('electronLoad', (e) => {
    const apiPort = e?.detail?.getApiPort() ?? null

    if (!_isNull(apiPort)) {
      store.dispatch(setApiPort(apiPort))
    }
    store.dispatch(checkAuth())
    store.dispatch(electronBackendLoaded())
    store.dispatch(getElectronMenuConfig())
    window.bfxReportElectronApi?.onHideMenuEvent(({ state }) => {
      store.dispatch(setElectronMenuHidden(state))
    })
    window.bfxReportElectronApi?.onFireToastEvent((args) => {
      console.log('[---onFireToastEvent--]:', args)
      store.dispatch(setAutoUpdateToastTemplate(args))
    })
    window.bfxReportElectronApi?.onProgressToastEvent((args) => {
      console.log('[---onProgressToastEventToastEvent--]:', args)
      store.dispatch(setAutoUpdateToastProgress(args))
    })
  })
}

export default handleElectronLoad
