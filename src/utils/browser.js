export const loadScript = (url) => new Promise((resolve, reject) => {
  const script = document.createElement('script')
  document.body.appendChild(script)
  script.onload = resolve
  script.onerror = reject
  script.async = true
  script.src = url
})
