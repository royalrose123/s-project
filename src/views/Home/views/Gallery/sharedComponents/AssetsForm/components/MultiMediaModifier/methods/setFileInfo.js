const resolveVideo = (video, file, resolve, forceResloveTimeOut) => {
  // TODO: 目前有些影片 file 沒辦法拿到 metadata，暫時用以下各種方法去讀取
  // 如果沒辦法讀取就設定五秒後強制 resolve
  // 但這時拿到的 duration 會是 NaN
  if (video.readyState > 0) {
    clearTimeout(forceResloveTimeOut)
    return resolve({
      name: file.name,
      size: file.size,
      type: file.type,
      duration: video.duration.toFixed(0),
      fileFormat: 'video',
    })
  }

  video.ondurationchange = () => {
    clearTimeout(forceResloveTimeOut)
    return resolve({
      name: file.name,
      size: file.size,
      type: file.type,
      duration: video.duration.toFixed(0),
      fileFormat: 'video',
    })
  }
  video.onloadeddata = () => {
    clearTimeout(forceResloveTimeOut)
    return resolve({
      name: file.name,
      size: file.size,
      type: file.type,
      duration: video.duration.toFixed(0),
      fileFormat: 'video',
    })
  }
  video.onloadedmetadata = () => {
    clearTimeout(forceResloveTimeOut)
    return resolve({
      name: file.name,
      size: file.size,
      type: file.type,
      duration: video.duration.toFixed(0),
      fileFormat: 'video',
    })
  }
  video.onstalled = () => {
    clearTimeout(forceResloveTimeOut)
    return resolve({
      name: file.name,
      size: file.size,
      type: file.type,
      duration: video.duration.toFixed(0),
      fileFormat: 'video',
    })
  }
  video.onsuspend = () => {
    clearTimeout(forceResloveTimeOut)
    return resolve({
      name: file.name,
      size: file.size,
      type: file.type,
      duration: video.duration.toFixed(0),
      fileFormat: 'video',
    })
  }
  video.onloadend = () => {
    clearTimeout(forceResloveTimeOut)
    return resolve({
      name: file.name,
      size: file.size,
      type: file.type,
      duration: video.duration.toFixed(0),
      fileFormat: 'video',
    })
  }
  video.oncanplaythrough = () => {
    clearTimeout(forceResloveTimeOut)
    return resolve({
      name: file.name,
      size: file.size,
      type: file.type,
      duration: video.duration.toFixed(0),
      fileFormat: 'video',
    })
  }
}

export const setFileInfo = (file, currentFileType, fileUrl) => {
  return new Promise((resolve, reject) => {
    if (!currentFileType) {
      return resolve({
        name: file.name,
        size: file.size,
        type: file.type,
        fileFormat: 'other',
      })
    }

    const video = document.createElement('video')

    video.src = fileUrl

    const image = new Image()

    image.src = fileUrl

    function onload(event) {
      if (currentFileType === 'image') {
        image.onload = () => {
          clearTimeout(forceResloveTimeOut)
          return resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            width: image.width,
            height: image.height,
            fileFormat: 'image',
          })
        }
      } else if (currentFileType === 'video') {
        resolveVideo(video, file, resolve, forceResloveTimeOut)
      } else if (currentFileType === 'zip') {
        return resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          fileFormat: 'html5',
        })
      }
    }

    function onloadend(event) {
      if (currentFileType === 'image') {
        image.onload = () => {
          clearTimeout(forceResloveTimeOut)
          return resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            width: image.width,
            height: image.height,
            fileFormat: 'image',
          })
        }
      } else if (currentFileType === 'video') {
        resolveVideo(video, file, resolve, forceResloveTimeOut)
      }
    }

    const reader = new FileReader()

    reader.onload = onload
    reader.onprogress = onprogress
    reader.onloadend = onloadend
    reader.readAsArrayBuffer(file)

    const forceResloveTimeOut = setTimeout(() => {
      console.log('force resolve')
      return resolve({
        name: file.name,
        size: file.size,
        type: file.type,
        duration: video.duration.toFixed(0),
        fileFormat: 'video',
      })
    }, 5000)
  })
}
