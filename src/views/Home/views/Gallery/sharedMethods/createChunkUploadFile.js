import { createFileInitialChunk } from 'api/Gallery/createFileInitialChunk'
import { fetchFileChunkUrl } from 'api/Gallery/fetchFileChunkUrl'
import { createFileChunkComplete } from 'api/Gallery/createFileChunkComplete'
import { startSwitch } from 'utils/start-switch'
import { start } from 'utils/start-flow'
import { updateUploadingItem, getCurrentUploadingItem } from '../../../sharedMethods/updateUploadingItem'
import { getProgressParams } from 'basicComponents/ProgressRing'
import axios from 'axios'

export async function createChunkUploadFile({ chunkFile, fileType, dispatch, uploadingFileId }) {
  let count = 0
  let fileId = ''
  let isError = false
  const eTagList = [] // 每個 AWS s3 API 的 response headers 會有 ETag，chunk API call 完要把所有的 ETag 送給 complete API

  const createChunk = result => {
    const { fileChunkList } = chunkFile
    const currentChunk = fileChunkList[count]
    const currentFile = currentChunk.file
    const currentBlob = currentChunk.chunkBlob
    const currentRange = currentChunk.contentRange
    const chunkListLength = fileChunkList.length
    const isOnlyOneChunk = chunkListLength === 1
    const isFirstCount = count === 0
    const isLastCount = count === chunkListLength - 1

    const fileState = {
      file: currentFile,
      fileType,
    }

    const fileChunkState = {
      contentRange: currentRange,
      uploadId: fileId,
    }

    const setUploadId = response => {
      fileId = response.uploadId

      return response
    }

    const checkError = response => {
      if (isError) return

      if (!response?.isResponseError) return response

      isError = true

      return updateUploadingItem(uploadingFileId, dispatch, {
        isUploadFailed: true,
        isUploading: false,
        errorMessage: response.message,
      })
    }

    const setProgressBar = response => {
      if (isError) return

      const progress = (count / chunkListLength) * 100

      const progressItem = document.getElementById(`${uploadingFileId}`)

      if (progressItem) {
        const { strokeDashoffset } = getProgressParams({ progress })
        progressItem.style.strokeDashoffset = String(strokeDashoffset)
      }

      return response
    }

    const createNextChunk = () => {
      const currentUploadingItem = getCurrentUploadingItem(uploadingFileId)
      const isCanceled = currentUploadingItem.isCanceled

      if (isCanceled || isError) return

      count++

      return createChunk(result)
    }

    const getFirstChunkState = () => {
      if (!isFirstCount || isOnlyOneChunk) return

      return {
        requestParams: fileState,
        requestEndAction: start(checkError)
          .next(setProgressBar)
          .next(setUploadId)
          .end(createNextChunk),
      }
    }

    const getInsideChunkState = () => {
      if (isFirstCount || isLastCount) return

      return {
        requestParams: { ...fileState, ...fileChunkState },
        requestEndAction: start(checkError)
          .next(setProgressBar)
          .end(createNextChunk),
      }
    }

    const getFinalChunkState = response => {
      if (!isLastCount) return

      const createFinalFile = response => {
        const { uploadId, key, bucket } = response

        return createFileChunkComplete({
          key,
          uploadId,
          bucket,
          parts: eTagList,
          type: fileType,
        }).then(response => response)
      }

      return {
        requestParams: { ...fileState, ...fileChunkState },
        requestEndAction: start(checkError)
          .next(setProgressBar)
          .end(createFinalFile),
      }
    }

    const getCurrentChunkState = startSwitch(getFirstChunkState)
      .next(getInsideChunkState)
      .end(getFinalChunkState)

    const { requestEndAction } = getCurrentChunkState()

    const { key, uploadId, bucket } = result

    const partNumber = count + 1

    return fetchFileChunkUrl({ key, uploadId, partNumber, bucket })
      .then(response => {
        const requestConfig = {
          method: 'PUT',
          url: response,
          data: currentBlob,
        }

        // 因為是直接 call AWS s3 API，沒有走後端，所以 url 不一樣而獨立用 axios call
        return axios(requestConfig)
          .then(response => {
            const eTag = response.headers.etag.split('"').join('') // 因為後端回傳的為 "d55bddf8d62910879ed9f605522149a8"，多了兩邊的雙引號，所以要先去掉

            eTagList.push({ PartNumber: partNumber, ETag: eTag })

            return { uploadId, key, bucket }
          })
          .catch(error => console.log('error 99999:>> ', error))
      })
      .then(requestEndAction)
  }

  const result = await createFileInitialChunk({ filename: chunkFile.name, type: fileType })

  return createChunk(result)
}
