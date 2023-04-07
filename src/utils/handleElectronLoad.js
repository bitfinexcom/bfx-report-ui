import _isNull from 'lodash/isNull'

import { store } from 'state/store'
import { checkAuth } from 'state/auth/actions'
import { setApiPort } from 'state/base/actions'
import { electronBackendLoaded } from 'state/ui/actions'

const handleElectronLoad = () => {
  window.document.addEventListener('electronLoad', (e) => {
    const apiPort = e?.detail?.getApiPort() ?? null

    if (!_isNull(apiPort)) {
      store.dispatch(setApiPort(apiPort))
    }
    store.dispatch(checkAuth())
    store.dispatch(electronBackendLoaded())
  })
}

export default handleElectronLoad
