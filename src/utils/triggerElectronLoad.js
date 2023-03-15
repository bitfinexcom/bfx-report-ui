// used from electron app to trigger the backend loading event
(() => {
  const apiPort = null
  const event = new CustomEvent('electronLoad', {
    detail: { getApiPort: () => `${apiPort}` },
  })

  document.dispatchEvent(event)
})()
