const getFileNameByMediaURL = mediaUrl => {
  // 最後一個斜線後面的字串為 filename
  const index = mediaUrl.lastIndexOf('/')

  return mediaUrl.slice(index + 1)
}

export default getFileNameByMediaURL
