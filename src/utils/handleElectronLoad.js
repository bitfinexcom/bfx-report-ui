import { store } from 'state/store'
import { checkAuth } from 'state/auth/actions'
import { electronBackendLoaded } from 'state/ui/actions'

const handleElectronLoad = () => {
  window.document.addEventListener('electronLoad', (e) => {
    /*
     * TODO: Only for electron app, there is needed to pass the API port
     * to appropriate place to overwrite default value of src/config.js file
     */
    // eslint-disable-next-line no-unused-vars
    const apiPort = e?.detail?.getApiPort() ?? null

    store.dispatch(checkAuth())
    store.dispatch(electronBackendLoaded())
  })
}

export default handleElectronLoad
