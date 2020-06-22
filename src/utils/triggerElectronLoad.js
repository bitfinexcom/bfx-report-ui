// used from electron app to trigger the backend loading event
const triggerElectronLoad = () => {
  const event = new Event('electronLoad')
  document.dispatchEvent(event)
}

export default triggerElectronLoad
