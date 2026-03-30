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
import { selectAutoUpdateToast } from 'state/electronAutoUpdateToast/selectors'

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
      // close previous toast before showing the next one
      const { toastId: prevToastId } = selectAutoUpdateToast(store.getState())
      if (prevToastId) {
        window.bfxReportElectronApi?.sendToastClosedEvent({
          toastId: prevToastId,
          dismiss: 'close',
        })
      }
      store.dispatch(setAutoUpdateToastTemplate(args))
    })
    window.bfxReportElectronApi?.onProgressToastEvent((args) => {
      store.dispatch(setAutoUpdateToastProgress(args?.progress))
    })
  })
}

export default handleElectronLoad
