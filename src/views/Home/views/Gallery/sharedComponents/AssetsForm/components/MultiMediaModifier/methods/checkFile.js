export const isUniqueFile = (lastFiles, file) => {
  const hasSameFile = lastFiles.some(item => item.file.name === file.name && item.file.size === file.size)

  return !hasSameFile
}

export const isValidFile = file => {
  const isValidFile = Boolean(file.type.match(/^image\//) || Boolean(file.type.match(/^video\//)) || Boolean(file.type.match(/zip$/)))
  return isValidFile
}

export const isValidSize = file => {
  const isValidSize = file.size <= 1024 * 1024 * 1024 * 2 // 目前限制每個檔案最大為 2GB

  return isValidSize
}

export const checkWidthAndHeight = (fileList, standardWidthHeight) => {
  const hasDifferntSizeImage = Boolean(
    fileList.find(file => {
      return file.fileFormat === 'image' && file.width !== standardWidthHeight.width && file.height !== standardWidthHeight.height
    }),
  )

  return hasDifferntSizeImage
}

export const isValidFileName = file => {
  const isValidFileName = !file.name.match(/[/ +@!#$%^&*()<>?\\|}{~:]/)

  return isValidFileName
}
