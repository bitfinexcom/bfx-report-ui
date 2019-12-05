const { copyFileIfNotExists } = require('./helpers')

const envMap = [
  {
    source: '.env.example',
    destination: '.env',
  },
]

envMap.forEach((pair) => {
  copyFileIfNotExists(pair.source, pair.destination)
})
