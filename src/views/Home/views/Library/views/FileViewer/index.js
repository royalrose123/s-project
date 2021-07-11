// Libs
import React, { useRef, useEffect, useCallback, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { isEmpty, isArray, compact } from 'lodash'
import { fromEvent } from 'rxjs'
import { map, filter } from 'rxjs/operators'

// Components
import { IconButton, Spinner, Icon } from 'evergreen-ui'
import Icons from 'assets/icons'
import Video from 'basicComponents/Video'

// Lib MISC
import useMediaSizeEffect from './hooks/useMediaSizeEffect'

// Style
import getStyle from './style'

// Constants
import { EXTENSIONS, CONTROL_PANEL_THEME } from '../../constant'

// PropTypes
export const propTypes = {
  fileViewerState: PropTypes.shape({
    isOpen: PropTypes.bool,
    allData: PropTypes.array,
    fileIndex: PropTypes.number,
    file: PropTypes.object,
    renderType: PropTypes.string,
    isLoading: PropTypes.bool,
  }),
  setFileViewerState: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  title: '',
  previewData: {
    index: 0,
    fileName: '',
    fileType: '',
    width: '',
    height: '',
  },
  fileViewerState: {},
  setFileViewerState: null,
  allData: [],
}

const fileViewerVariants = {
  initial: {
    opacity: 0,
    y: '10%',
    scale: 1,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: '10%',
    scale: 1,
  },
}

const fileViewerTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6,
}

// const FILE_VIEWER_DIRECTION = {
//   NEXT: 'next',
//   PREV: 'prev',
// }

const PREVIEW_FILE_TYPES = {
  VIDEO: [EXTENSIONS.MP4],
  IMAGE: [EXTENSIONS.JPG, EXTENSIONS.PNG],
  DOCUMENT: [EXTENSIONS.PDF, EXTENSIONS.XLSX],
}

const INITIAL_CURRENT_ZOOM = 1
const ZOOM_SCALE = 0.2
const ZOOM_ACTIONS = {
  ZOOM_OUT: -1,
  ZOOM_IN: 1,
}
const PAGE_ACTIONS = {
  PREV: -1,
  NEXT: 1,
}
const INITIAL_ZOOM_RANGE = {
  maxZoom: 1,
  minZoom: 1,
}

const getFileType = extension => {
  let fileType = null
  if (PREVIEW_FILE_TYPES.VIDEO.includes(extension)) {
    fileType = 'video'
  } else if (PREVIEW_FILE_TYPES.IMAGE.includes(extension)) {
    fileType = 'image'
  } else {
    fileType = ''
  }

  return fileType
}

// call API 將檔案下載下來，並轉成 File 物件後 return
// const onFilePreview = async ({ fileUrl, fileName = 'unknown' }) => {
//   if (!fileUrl) {
//     return console.error('Please add url param!')
//   } else {
//     return new File([fileUrl], fileName)
//   }
// }

// 在 modal 關閉之前，將 kukudocs 殘留的 DOM 元素移除
const deleteRedundantDomElements = () => {
  const redundantDomElements = document.querySelectorAll('.kuku-modal')
  redundantDomElements.forEach(item => item.parentNode.remove())
}

const KEY_ACTIONS = { PREV: 'prev', NEXT: 'next' }
const RENDER_TYPES = { KUKU_DOCS: 'KukuDocs', VIDEO: 'Video', ERROR: 'error' }
const supportByKukuDocs = PREVIEW_FILE_TYPES.DOCUMENT
const supportVideoPreview = PREVIEW_FILE_TYPES.VIDEO
const KEY_CODES = { ESC: 27, LEFT_ARROW: 37, RIGHT_ARROW: 39 }
const ACCEPTED_KEYS = [KEY_CODES.ESC, KEY_CODES.LEFT_ARROW, KEY_CODES.RIGHT_ARROW]
const initialFileViewer = {
  isOpen: false,
  allData: [],
  fileIndex: null,
  file: null,
  renderType: null,
  isLoading: false,
}

async function getFileFromUrl({ url, fileName, setFileViewerState }) {
  // const fileName = url.split('/').splice(-1)[0]
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.blob())
      .then(data => resolve(new File([data], fileName)))
      .catch(error => {
        console.error(error)
        setFileViewerState(prevState => ({ ...prevState, renderType: RENDER_TYPES.ERROR }))
        reject(error)
      })
  })
}

function FileViewer(props) {
  const style = getStyle(props)
  const { fileViewerState, setFileViewerState } = props
  const [isFullscreenModeOn, setIsFullscreenModeOn] = useState(false)

  // const iframeRef = useRef(null)
  const instance = useRef(null) // 用來暫存 KukuDocs 的建立預覽 function（之後會在 window 物件下取得）
  const wrapper = useRef(null) // KukuDocs 需要的是實體 DOM 元素，而不是 virtual DOM
  const kukuDocsViewer = useRef(null)

  const [isDummyLoading, setIsDummyLoading] = useState(true)
  const [currentFileTotalPages, setCurrentFileTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState('1')
  const [currentZoom, setCurrentZoom] = useState(INITIAL_CURRENT_ZOOM)
  const [sheets, setSheets] = useState([])
  const [currentSheetId, setCurrentSheetId] = useState('1') // kukuDocs 的 sheetId 為字串，而且不一定從 '1' 開始
  const [zoomRange, setZoomRange] = useState(INITIAL_ZOOM_RANGE)

  const totalFiles = isArray(fileViewerState.allData) ? fileViewerState.allData.length : 0
  const hasNavButtons = totalFiles > 0
  const isFirstFile = fileViewerState.fileIndex === 0
  const isLastFile = fileViewerState.fileIndex === totalFiles - 1
  const currentFile = fileViewerState.file
  const url = currentFile?.content?.url ? currentFile?.content?.url : ''
  const streamFile = currentFile?.content?.streamFile ? currentFile?.content?.streamFile : ''
  const extension = currentFile?.content?.extension ? currentFile.content.extension : ''
  const width = currentFile?.content?.width ? currentFile.content.width : ''
  const height = currentFile?.content?.height ? currentFile.content.height : ''
  const title = currentFile?.content?.title ? currentFile.content.title : ''

  const isFirstPage = Number(currentPage) === 1
  const isLastPage = Number(currentPage) === currentFileTotalPages

  // FUNCTIONS
  const handleClose = useCallback(() => {
    setFileViewerState(initialFileViewer)
  }, [setFileViewerState])

  const { mediaWidth: mediaDialogWidth, mediaHeight: mediaDialogHeight } = useMediaSizeEffect({
    maxMediaWidth: 1020,
    maxMediaHeight: 520,
    src: url,
    mediaType: getFileType(extension),
    width,
    height,
  })

  const switchPage = (pageAction = PAGE_ACTIONS.NEXT) => {
    if (!instance.current?.gotoPage && !instance.current?.getCurrentId && !instance.current?.setZoom) return
    const currentPageIndex = instance.current.getCurrentId()
    const switchPageIndex = currentPageIndex + pageAction
    const switchPage = switchPageIndex + 1
    const currentFileTotalPagesIndex = currentFileTotalPages - 1

    if (switchPageIndex < 0 || switchPageIndex > currentFileTotalPagesIndex) return

    instance.current.gotoPage(switchPageIndex)
    setCurrentPage(String(switchPage))
    instance.current.setZoom(INITIAL_CURRENT_ZOOM)
    setCurrentZoom(INITIAL_CURRENT_ZOOM)
  }

  const goToPage = event => {
    const onChangeValue = event.target.value

    if (!Number(onChangeValue) && onChangeValue.length !== 0) return console.error('please insert number!')

    setCurrentPage(onChangeValue)
    // gotoPage 函式的參數是頁數的 index，從 0 開始（也就是 0 為第一頁）
    const goToPageNumberIndex = Number(onChangeValue) - 1

    if (!instance.current?.gotoPage && !instance.current?.setZoom) return
    if (goToPageNumberIndex < 0 || goToPageNumberIndex >= currentFileTotalPages) return

    instance.current.gotoPage(goToPageNumberIndex)
    instance.current.setZoom(INITIAL_CURRENT_ZOOM)
    setCurrentZoom(INITIAL_CURRENT_ZOOM)
  }

  const zoom = (zoomAction = ZOOM_ACTIONS.ZOOM_IN) => {
    if (!instance.current?.getZoom && !instance.current?.setZoom) return
    const currentZoom = instance.current.getZoom()
    const newZoom = currentZoom + ZOOM_SCALE * zoomAction

    if (newZoom < zoomRange.minZoom) {
      instance.current.setZoom(zoomRange.minZoom)
      setCurrentZoom(zoomRange.minZoom)
    } else if (newZoom > zoomRange.maxZoom) {
      instance.current.setZoom(zoomRange.maxZoom)
      setCurrentZoom(zoomRange.maxZoom)
    } else {
      instance.current.setZoom(newZoom)
      setCurrentZoom(newZoom)
    }
  }

  const resetZoom = () => {
    if (!instance.current?.setZoom) return
    instance.current.setZoom(INITIAL_CURRENT_ZOOM)
    setCurrentZoom(INITIAL_CURRENT_ZOOM)
  }

  const goToSheet = sheet => {
    if (!instance.current?.gotoPage) return
    instance.current.gotoPage(sheet.sheetId)
    setCurrentSheetId(sheet.sheetId)
  }

  const toggleFullScreen = () => {
    if (!instance.current?.setZoom) return
    instance.current.setZoom(INITIAL_CURRENT_ZOOM)
    setCurrentZoom(INITIAL_CURRENT_ZOOM)

    if (!document.fullscreenElement) {
      kukuDocsViewer.current.requestFullscreen()
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  const afterRender = useCallback(
    (file, fileType) => {
      const endCallBackFunction = result => {
        if (result.isError) {
          console.log(
            '%c KukuDocs %c Failed Render ',
            'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#BF0000; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
          )
        } else {
          console.log(
            '%c KukuDocs %c Success Render ',
            'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
            'background:#3F8C7B; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
          )

          if (extension === EXTENSIONS.PDF) {
            setCurrentFileTotalPages(instance.current?.getFileInfo()?.totalPage)
          } else if (extension === EXTENSIONS.XLSX) {
            // 因為從 kukuDocs instance 的 getFileInfo 函式返回的 data 當中，sheetNames 陣列有 empty item，所以先用 lodash 將其刪除
            const sheets = compact(instance.current?.getFileInfo()?.sheetNames)
            setSheets(sheets)
            // 因為 kukuDocs 的 sheetId 不一定從 '1' 開始，所以取第一個 sheetId 並變更 state
            setCurrentSheetId(sheets[0].sheetId)
          }

          console.log(instance.current)

          if (instance.current?.options) {
            const { maxZoom, minZoom } = instance.current.options
            setZoomRange({ maxZoom, minZoom })
          }
        }
      }

      if (!wrapper.current) return

      if (fileType === EXTENSIONS.DOCX) {
        window.docxAfterRender(wrapper.current, endCallBackFunction)
      } else if (fileType === EXTENSIONS.XLSX) {
        window.cellAfterRender(wrapper.current, endCallBackFunction)
      } else if (fileType === EXTENSIONS.PPTX) {
        window.slideAfterRender(wrapper.current, endCallBackFunction, 0)
      } else if (fileType === EXTENSIONS.PDF) {
        window.pdfAfterRender(wrapper.current, endCallBackFunction, 0)
      }
    },
    [extension],
  )

  // 將檔案丟給 kukuDocs 去解析
  const documentParser = useCallback(
    async ({ fileUrl, fileName }) => {
      // const data = await fetchFile({ url: fileUrl })

      if (!fileUrl || !extension) return

      // kukuDocs 不接受檔案連結預覽，需要先下載下來，並轉成 File 物件後，才能解析並渲染
      const rawFile = await getFileFromUrl({ url: fileUrl, fileName, setFileViewerState })
      // console.log('%c rawFile: ', 'background: lightgreen; font-size: 20px; color: #000;', rawFile)

      // localhost 測試用
      // pdf = 5, noGridXlsx = 37, gridXlsx = 38, multipleSheet = 39
      // const sampleId = fileViewerState.fileIndex % 2 === 1 ? 47 : 23
      // const fetchUrl = `https://taitra-sit-webapi.cloud-interactive.com/api/sample/download?id=${sampleId}`
      // 外貿的 API token，如果過期，要去外貿 SIT 拿最新的 token
      // const token =
      //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxOTg2IiwiYWdlbnQiOiIiLCJleHAiOjE2MDIyMTM1NTMsImlzcyI6InRhaXRyYS5pZGVudGl0eSIsImF1ZCI6ImlkZW50aXR5In0.4luDruyscZG83JYkuGGYO9WQ5YFnmr5gaHx-LzfMFIc'

      // const myHeaders = new Headers({
      //   Authorization: token,
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // })

      // const response = await fetch(fetchUrl, {
      //   headers: myHeaders,
      //   method: 'GET',
      // })

      // const rawFile = await response.blob()

      // 若 window 物件沒有找到 kukuDocs 的函式，則不執行後續動作
      if (!window.DocxJS || !window.CellJS || !window.SlideJS || !window.PdfJS) return

      // 若 instance.current 已經有 kukuDocs 的實例，則不再重新 create 一個 kukuDocs 的實例，以免 jQuery 渲染重複的 kukuDocs DOM 元素
      if (instance.current) return

      if (extension === EXTENSIONS.DOCX) {
        instance.current = window.docxJS = window.createDocxJS ? window.createDocxJS() : new window.DocxJS()
      } else if (extension === EXTENSIONS.XLSX) {
        instance.current = window.cellJS = window.createCellJS ? window.createCellJS() : new window.CellJS()
      } else if (extension === EXTENSIONS.PPTX) {
        instance.current = window.slideJS = window.createSlideJS ? window.createSlideJS() : new window.SlideJS()
      } else if (extension === EXTENSIONS.PDF) {
        instance.current = window.pdfJS = window.createPdfJS ? window.createPdfJS() : new window.PdfJS()
      } else {
        return // fileType 不符合上列情況，不執行後續
      }

      // 將上面拿到的檔案，丟給 kukuDocs 解析函式（存放在 instance.current 裡）解析並渲染
      if (instance.current) {
        instance.current.parse(
          rawFile,
          function() {
            afterRender(rawFile, extension)
          },
          function(event) {
            if (event.isError && event.msg) {
              console.log(event.msg)
              // alert(event.msg)
            }
          },
          null,
        )
      }
    },
    [afterRender, extension, setFileViewerState],
  )

  const switchFile = useCallback(
    async direction => {
      const fileIndex = fileViewerState.fileIndex

      const attachmentIndex = totalFiles - 1
      let directionIndex = fileIndex

      if (direction === KEY_ACTIONS.PREV) directionIndex--
      if (direction === KEY_ACTIONS.NEXT) directionIndex++

      if (directionIndex < 0) return
      if (directionIndex > attachmentIndex) return
      if (isFullscreenModeOn) return

      const nextPreviewFile = fileViewerState.allData[directionIndex]
      const currentFileExtension = nextPreviewFile?.content?.extension

      if (instance.current && instance.current?.setZoom) {
        instance.current.setZoom(INITIAL_CURRENT_ZOOM)
        setCurrentZoom(INITIAL_CURRENT_ZOOM)
        setCurrentPage('1')
      }

      // 如果是 kukudocs 支援預覽的話
      if (supportByKukuDocs.includes(currentFileExtension)) {
        instance.current = null // 清除實體

        setTimeout(() => {
          setFileViewerState(prevState => ({
            ...prevState,
            isLoading: false,
            file: nextPreviewFile,
            fileIndex: directionIndex,
            renderType: RENDER_TYPES.KUKU_DOCS,
          }))
        }, 500)

        // 先渲染 loading Div，待 500ms 後再將檔案指定給 fileViewerState.file（上面的 setState）
        // PS. 先將 file 設為 null，用意在將 render Kukudocs Viewer 渲染出來的 DOM 元素徹底移除，
        //     解決再次渲染 kukuDocs 時部分 UI 錯誤的問題（例如：從別的檔案切到 Excel 檔時，表單 tab 樣式會跑掉）
        setFileViewerState(prevState => ({
          ...prevState,
          isLoading: true,
          file: null,
          fileIndex: directionIndex,
          renderType: RENDER_TYPES.KUKU_DOCS,
        }))
      } else if (supportVideoPreview.includes(currentFileExtension)) {
        setTimeout(() => {
          setFileViewerState(prevState => ({
            ...prevState,
            isLoading: false,
            file: nextPreviewFile,
            fileIndex: directionIndex,
            renderType: RENDER_TYPES.VIDEO,
          }))
        }, 500)

        // 先渲染 loading Div，待 500ms 後再將檔案指定給 fileViewerState.file（上面的 setState）
        setFileViewerState(prevState => ({
          ...prevState,
          isLoading: true,
          file: null,
          fileIndex: directionIndex,
          renderType: RENDER_TYPES.VIDEO,
        }))
      } else {
        setTimeout(() => {
          setFileViewerState(prevState => ({
            ...prevState,
            isLoading: false,
            file: nextPreviewFile,
            fileIndex: directionIndex,
            renderType: RENDER_TYPES.ERROR,
          }))
        }, 500)

        // 先渲染 loading Div，待 500ms 後再將檔案指定給 fileViewerState.file（上面的 setState）
        setFileViewerState(prevState => ({
          ...prevState,
          isLoading: true,
          file: null,
          fileIndex: directionIndex,
          renderType: RENDER_TYPES.ERROR,
        }))
        console.error('not support file')
      }
    },
    [fileViewerState.allData, fileViewerState.fileIndex, isFullscreenModeOn, setFileViewerState, totalFiles],
  )

  // EFFECTS
  // 載入點擊的檔案（第一個檔案）
  useEffect(() => {
    // 若 caseData 是空物件，則不做任何事
    // if (Object.entries(caseData).length === 0) return

    if (!currentFile) return
    if (isDummyLoading) return

    // 當 props: caseData 資料傳進來時，更新初始 state
    // const { caseId, caseName, samples, fileIndex } = caseData
    const initialFile = fileViewerState.file
    // const fileType = getFileExtension(initialFile)

    if (supportByKukuDocs.includes(extension)) {
      setFileViewerState(prevState => ({
        ...prevState,
        allData: fileViewerState.allData,
        fileIndex: fileViewerState.fileIndex,
        file: initialFile,
        renderType: RENDER_TYPES.KUKU_DOCS,
      }))
    } else if (supportVideoPreview.includes(extension)) {
      setFileViewerState(prevState => ({
        ...prevState,
        allData: fileViewerState.allData,
        fileIndex: fileViewerState.fileIndex,
        file: initialFile,
        renderType: RENDER_TYPES.VIDEO,
      }))
    } else {
      setFileViewerState(prevState => ({ ...prevState, renderType: RENDER_TYPES.ERROR }))
    }
  }, [currentFile, extension, fileViewerState.allData, fileViewerState.file, fileViewerState.fileIndex, isDummyLoading, setFileViewerState])

  useEffect(() => {
    // 若 modal 沒有開啟、或 file 為 null 的時候，不執行清除 DOM 的函式
    // 當關閉 modal 的時候，刪除多餘的 DOM 元素
    if (!fileViewerState.isOpen) deleteRedundantDomElements()
  }, [fileViewerState.isOpen])

  // 監聽 keydown 事件，並呼叫 switchFile 函式切換檔案
  useEffect(() => {
    if (fileViewerState.isOpen) {
      const subscription = fromEvent(window, 'keydown')
        .pipe(
          map(event => event.keyCode),
          filter(keyCode => ACCEPTED_KEYS.includes(keyCode)),
        )
        .subscribe(keyCode => {
          // 卡 isLoading 條件，不讓使用者連擊鍵盤做快速檔案切換
          if (fileViewerState.isLoading) return

          switch (keyCode) {
            case KEY_CODES.ESC:
              handleClose()
              break
            case KEY_CODES.LEFT_ARROW:
              switchFile(KEY_ACTIONS.PREV)
              break
            case KEY_CODES.RIGHT_ARROW:
              switchFile(KEY_ACTIONS.NEXT)
              break
          }
        })

      return () => subscription.unsubscribe()
    }
  }, [fileViewerState.isLoading, fileViewerState.isOpen, handleClose, switchFile])

  // 當轉換檔案的時候，判斷是否要載入 kukuDocs loader 檔、以及是否要執行 documentParser 函式
  useEffect(() => {
    if (!currentFile) return

    if (fileViewerState.renderType !== RENDER_TYPES.KUKU_DOCS) return

    const dependencePackage = document.querySelector('script[src="/scripts/kukudocs.loader.js"]')
    // 當 html 有 kukuDocs 的 js 檔時，用 kukuDocs 瀏覽檔案
    if (dependencePackage) {
      documentParser({ fileUrl: url, fileName: `${title}.${extension}` })
    } else {
      // 否則，先載入 kukuDocs 的 js 檔，再用 kukuDocs 瀏覽檔案
      const script = document.createElement('script')
      script.setAttribute('src', '/scripts/kukudocs.loader.js')
      document.head.appendChild(script)
      window.callback = () => documentParser({ fileUrl: url, fileName: `${title}.${extension}` })
    }
  }, [currentFile, documentParser, extension, fileViewerState, title, url])

  useEffect(() => {
    if (!kukuDocsViewer.current) return

    kukuDocsViewer.current.addEventListener('fullscreenchange', event => {
      if (document.fullscreenElement) {
        setIsFullscreenModeOn(true)

        console.log(
          `%c Browser %c Enter full-screen mode. `,
          'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
          'background:#C6EBE6; padding: 1px; border-radius: 0 3px 3px 0;  color: #35495e',
        )
      } else {
        setIsFullscreenModeOn(false)

        console.log(
          `%c Browser %c Leave full-screen mode. `,
          'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
          'background:#C6EBE6; padding: 1px; border-radius: 0 3px 3px 0;  color: #35495e',
        )
      }
    })

    return () => document.removeEventListener('fullscreenchange', event => console.log('remove event'))
  }, [fileViewerState])

  const renderVideoViewer = () => {
    if (!currentFile) return

    return (
      <div css={style.videoViewerWrapper({ width: mediaDialogWidth, height: mediaDialogHeight })}>
        <Video
          id='playVideo'
          // src={streamFile}
          sources={[{ src: streamFile, type: '' }]}
          customSetting={{
            controlBar: true,
            width: mediaDialogWidth,
            height: mediaDialogHeight,
          }}
        />
      </div>
    )
  }

  const renderKukuDocsViewer = () => {
    if (!currentFile) return
    // 必須在 wrapper div 外層再包一層 div，解決檔案切換的時候，kukuDocs 的瀏覽工具列（上下黑底區塊）殘留問題
    return (
      <div ref={kukuDocsViewer} css={style.kukuDocsViewer({ extension, isFullscreenModeOn })}>
        <div ref={wrapper} css={style.kukuDocsDomWrapper()} />
        {/* pdf 的控制面板 */}
        {extension === EXTENSIONS.PDF && (
          <div css={style.pdfControlPanel()}>
            <IconButton
              icon='chevron-left'
              appearance='minimal'
              css={style.pageControlButton(isFirstPage)}
              onClick={() => switchPage(PAGE_ACTIONS.PREV)}
            />
            <div className='pageText'>Page</div>
            <input type='text' css={style.pageInput()} value={currentPage} onChange={event => goToPage(event)} />
            <Icon icon='slash' color='#ffffff' size={16} />
            <div css={style.totalPage()}>{currentFileTotalPages}</div>
            <IconButton
              icon='chevron-right'
              appearance='minimal'
              marginRight={20}
              css={style.pageControlButton(isLastPage)}
              onClick={() => switchPage(PAGE_ACTIONS.NEXT)}
            />
            <IconButton
              icon='minus'
              appearance='minimal'
              css={style.pageControlButton(currentZoom <= zoomRange.minZoom)}
              onClick={() => zoom(ZOOM_ACTIONS.ZOOM_OUT)}
            />
            <div css={style.zoomPercentage(CONTROL_PANEL_THEME.DARK)} onClick={resetZoom}>
              {Number.parseFloat(String(currentZoom * 100)).toFixed(0)}%
            </div>
            <IconButton
              icon='plus'
              appearance='minimal'
              css={style.pageControlButton(currentZoom >= zoomRange.maxZoom)}
              onClick={() => zoom(ZOOM_ACTIONS.ZOOM_IN)}
            />
            <IconButton
              icon={isFullscreenModeOn ? 'minimize' : 'maximize'}
              appearance='minimal'
              css={style.pageControlButton()}
              onClick={toggleFullScreen}
            />
          </div>
        )}

        {/* excel 的控制面板 */}
        {extension === EXTENSIONS.XLSX && (
          <div css={style.xlsxControlPanel()}>
            <div css={style.sheetTabs()}>
              {sheets.map(sheet => (
                <div key={`${sheet.name}_${sheet.sheetId}`} css={style.sheet(currentSheetId === sheet.sheetId)} onClick={() => goToSheet(sheet)}>
                  {sheet.name}
                </div>
              ))}
            </div>
            <div css={style.xlsxControlButtonGroup()}>
              <IconButton
                icon='minus'
                appearance='minimal'
                css={style.xlsxControlButton(currentZoom <= zoomRange.minZoom)}
                onClick={() => zoom(ZOOM_ACTIONS.ZOOM_OUT)}
              />
              <div css={style.zoomPercentage(CONTROL_PANEL_THEME.LIGHT)} onClick={resetZoom}>
                {Number.parseFloat(String(currentZoom * 100)).toFixed(0)}%
              </div>
              <IconButton
                icon='plus'
                appearance='minimal'
                css={style.xlsxControlButton(currentZoom >= zoomRange.maxZoom)}
                onClick={() => zoom(ZOOM_ACTIONS.ZOOM_IN)}
              />
              <IconButton
                icon={isFullscreenModeOn ? 'minimize' : 'maximize'}
                appearance='minimal'
                css={style.xlsxControlButton()}
                onClick={toggleFullScreen}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  const getFileIcon = () => {
    let outputIcon

    if (!isEmpty(extension)) {
      if (extension === EXTENSIONS.PDF) {
        outputIcon = <Icons.PDFFile style={{ width: 20, height: 20 }} />
      } else if (extension === EXTENSIONS.MP4) {
        outputIcon = <Icons.MP4File style={{ width: 20, height: 20 }} />
      } else if (extension === EXTENSIONS.XLSX) {
        outputIcon = <Icons.ExcelFile style={{ width: 20, height: 20 }} />
      } else {
        outputIcon = null
      }
    } else {
      outputIcon = null
    }
    return outputIcon
  }

  return (
    <motion.div
      css={style.fileViewerWrapper()}
      key='fileViewer'
      initial='initial'
      animate='in'
      exit='out'
      variants={fileViewerVariants}
      transition={fileViewerTransition}
      onAnimationComplete={() => setIsDummyLoading(false)}
    >
      <div css={style.fileViewerHeader()}>
        <div css={style.headerLeft()}>
          <IconButton
            icon='arrow-left'
            appearance='minimal'
            onClick={() => setFileViewerState(initialFileViewer)}
            marginRight={20}
            css={style.headerLeftIcon()}
          />
          <div css={style.fileTypeIconWrapper()}>{getFileIcon()}</div>
          {fileViewerState.isLoading ? 'Loading...' : title || 'File Name Not Available'}
        </div>
        <a css={style.headerRight()} download href={url} target='_blank' rel='noopener noreferrer'>
          <Icons.Download css={style.downloadIcon()} />
        </a>
      </div>
      <div css={style.fileViewerBody(extension === EXTENSIONS.PDF)}>
        {isDummyLoading ? (
          <Spinner css={style.fileViewerSpinner()} />
        ) : (
          <>
            {fileViewerState.renderType === RENDER_TYPES.VIDEO && renderVideoViewer()}
            {fileViewerState.renderType === RENDER_TYPES.KUKU_DOCS && renderKukuDocsViewer()}
            {fileViewerState.renderType === RENDER_TYPES.ERROR && !fileViewerState.isLoading && <div>Preview Error</div>}
            {fileViewerState.isLoading && (
              <div css={style.fileViewerSpinnerWrapper()}>
                <Spinner css={style.fileViewerSpinner()} />
              </div>
            )}
          </>
        )}
      </div>
      {!isFirstFile && hasNavButtons && !fileViewerState.isLoading && (
        <div css={style.actionButton(true)} onClick={() => switchFile(KEY_ACTIONS.PREV)}>
          <Icons.Arrow css={style.actionButtonIcon(true)} />
        </div>
      )}
      {!isLastFile && hasNavButtons && !fileViewerState.isLoading && (
        <div css={style.actionButton(false)} onClick={() => switchFile(KEY_ACTIONS.NEXT)}>
          <Icons.Arrow css={style.actionButtonIcon(false)} />
        </div>
      )}
    </motion.div>
  )
}

FileViewer.propTypes = propTypes
FileViewer.defaultProps = defaultProps

export default hot(FileViewer)
