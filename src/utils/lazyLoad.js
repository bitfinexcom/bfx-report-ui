import { lazy } from 'react'

const RELOAD_FLAG = 'chunk_failed_reload'

const lazyLoad = (importer) => lazy(() => importer()
  .then((module) => {
    sessionStorage.removeItem(RELOAD_FLAG)
    return module
  })
  .catch((err) => {
    if (!sessionStorage.getItem(RELOAD_FLAG)) {
      sessionStorage.setItem(RELOAD_FLAG, 'true')
      window.location.reload()
    }
    throw err
  }))

export default lazyLoad
