// used from electron app to trigger the backend loading event
(() => {
  const event = new Event('electronLoad')
  document.dispatchEvent(event)
})()
