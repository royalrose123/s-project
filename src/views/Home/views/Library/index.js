// Libs
import React, { useRef, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { AnimatePresence } from 'framer-motion'
import useFetcher from 'effects/useFetcher'

// Components
import MainPage from './views/MainPage'
import InnerPage from './views/InnerPage'
import FileViewer from './views/FileViewer'

// Lib MISC
// import useLibraryData from './hooks/useLibraryData'
import { fetchMaterialTagKeyNValue } from 'api/Library/fetchMaterialTagKeyNValue'
import { getCookie } from 'api/getCookie'

// Style
// import getStyle from './style'

// Constants
import { LIBRARY_PAGES, MOTION_DIRECTION, SORT_TYPE_TEXT, LIBRARY_CATEGORIES } from './constant'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

const initialPage = {
  pageName: LIBRARY_PAGES.MAIN,
  pageTitle: '',
  category: '',
}

const initialFileViewer = {
  isOpen: false,
  allData: [],
  fileIndex: null,
  file: null,
  renderType: null,
  isLoading: false,
}

const initialSearchParamsRef = {
  search: '',
  tags: [],
  col: {
    [LIBRARY_CATEGORIES.QUICKSIGHT]: SORT_TYPE_TEXT.MOST_FREQUENTLY_USED,
    [LIBRARY_CATEGORIES.PRESENTATION]: SORT_TYPE_TEXT.MOST_FREQUENTLY_USED,
    [LIBRARY_CATEGORIES.DATA_RESOURCE]: SORT_TYPE_TEXT.MOST_FREQUENTLY_USED,
    [LIBRARY_CATEGORIES.EXTERNAL_URL]: SORT_TYPE_TEXT.MOST_FREQUENTLY_USED,
  },
}

function Library(props) {
  // const style = getStyle(props)
  const [page, setPage] = useState(initialPage)
  const [fileViewerState, setFileViewerState] = useState(initialFileViewer)

  const searchParamsRef = useRef(initialSearchParamsRef)

  const { response, isLoaded: isTagOptionsLoaded } = useFetcher(fetchMaterialTagKeyNValue)
  const { tagOptions } = response

  useFetcher(getCookie)

  // if (isCookieLoaded) console.log(cookieResponse)

  const direction = page.pageName === LIBRARY_PAGES.MAIN ? MOTION_DIRECTION.NEXT : MOTION_DIRECTION.PREV

  return (
    <>
      <MainPage
        setPage={setPage}
        forwardCustom={direction}
        tagOptions={tagOptions}
        isTagOptionsLoaded={isTagOptionsLoaded}
        searchParamsRef={searchParamsRef.current}
        setFileViewerState={setFileViewerState}
        isActive={page.pageName === LIBRARY_PAGES.MAIN}
      />
      <AnimatePresence custom={direction} initial={false}>
        {page.pageName === LIBRARY_PAGES.INNER_PAGE && (
          <InnerPage
            setPage={setPage}
            category={page.category}
            setFileViewerState={setFileViewerState}
            forwardCustom={direction}
            tagOptions={tagOptions}
            isTagOptionsLoaded={isTagOptionsLoaded}
            searchParamsRef={searchParamsRef.current}
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {fileViewerState.isOpen && <FileViewer fileViewerState={fileViewerState} setFileViewerState={setFileViewerState} />}
      </AnimatePresence>
    </>
  )
}

Library.propTypes = propTypes
Library.defaultProps = defaultProps

export default hot(Library)
