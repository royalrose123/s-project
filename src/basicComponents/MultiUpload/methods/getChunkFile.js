import SparkMD5 from 'spark-md5'

export function getChunkFileMethod(file, chunkSize) {
  return new Promise((resolve, reject) => {
    const slice = Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice
    const chunks = Math.ceil(file.size / chunkSize)
    const spark = new SparkMD5.ArrayBuffer()
    const fileChunkList = []

    let fileChunk = ''
    let currentChunk = 0
    console.log(`${file.name} chunks 11111:>> `, chunks)

    function onload(event) {
      spark.append(event.target.result) // append chunk

      console.log(`${file.name} currentChunk 22222:>> `, currentChunk)
      currentChunk++

      if (currentChunk < chunks) {
        readNextChunk(event.target.result)
      } else {
        const md5 = spark.end()
        resolve({ name: file.name, md5, fileChunkList })
      }
    }

    function readNextChunk() {
      const reader = new FileReader()
      const start = currentChunk * chunkSize
      const end = Math.min(start + chunkSize, file.size)
      const chunkBlob = slice.call(file, start, end, file.type)
      const fileSize = file.size

      fileChunk = new File([chunkBlob], file.name, {
        type: file.type,
      })

      fileChunkList.push({
        name: file.name,
        file: fileChunk,
        totalFileSize: fileSize,
        contentRange: `bytes ${start}-${end - 1}/${fileSize}`,
        chunkBlob,
      })

      reader.onload = onload
      reader.readAsArrayBuffer(fileChunk)
    }

    readNextChunk()
  })
}
