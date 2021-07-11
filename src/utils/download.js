export function getFilename(disposition) {
  const regex = /filename\*=UTF-8''(.*)?\.(.*)/gi
  const matches = regex.exec(disposition)
  let filename = new Date().toISOString()
  if (matches !== null && matches[1] && matches[2]) {
    filename = `${decodeURIComponent(matches[1])}.${matches[2]}`
  }
  return filename
}

export function exportFile({ blob, fileName }) {
  const DownloadElement = document.createElement('a')
  const url = window.URL.createObjectURL(blob)

  DownloadElement.href = url
  DownloadElement.download = fileName
  document.body.appendChild(DownloadElement)
  DownloadElement.click()
  document.body.removeChild(DownloadElement)
}
