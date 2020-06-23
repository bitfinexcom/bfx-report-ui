import { store } from 'state/store'
import { checkAuth } from 'state/auth/actions'
import { electronBackendLoaded } from 'state/ui/actions'

const handleElectronLoad = () => {
  window.document.addEventListener('electronLoad', () => {
    store.dispatch(checkAuth())
    store.dispatch(electronBackendLoaded())
  })
}

export default handleElectronLoad
