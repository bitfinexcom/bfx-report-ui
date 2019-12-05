const fs = require('fs')

const copyFile = (source, destination) => {
  fs.copyFile(source, destination, (err) => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`Copying file from ${source} to ${destination}`)
  })
}

const copyFileIfNotExists = (source, destination) => {
  fs.access(destination, fs.constants.F_OK, (err) => {
    if (err) {
      copyFile(source, destination)
    }
  })
}

module.exports = {
  copyFile,
  copyFileIfNotExists,
}
