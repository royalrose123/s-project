// Libs
import React, { useEffect, useRef, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import PropTypes from 'prop-types'
import { AutoSizer, Collection } from 'react-virtualized'
import { isEmpty, capitalize } from 'lodash'
import { motion } from 'framer-motion'
import { Formik } from 'formik'

// Components
import { Button, SearchInput, SelectMenu, Spinner } from 'evergreen-ui'
import Icons from 'assets/icons'
import Card from '../../components/Card'
import Filter from '../../components/Filter'
import Form from 'basicComponents/Form'

// Lib MISC
import useLibraryData from '../../hooks/useLibraryData'

// Style
import getStyle from './style'

// Constants
import {
  LIBRARY_PAGES,
  LIBRARY_CATEGORIES,
  SECTION_TITLE,
  pageVariants,
  pageTransition,
  sortOptions,
  SORT_TYPE_PARAM,
  TRIGGER_SEARCH_THRESHOLD,
} from '../../constant'
import getFormikConfig from './formikConfig'

// PropTypes
export const propTypes = {
  setPage: PropTypes.func,
  category: PropTypes.string,
  forwardCustom: PropTypes.number,
  setFileViewerState: PropTypes.func,
  tagOptions: PropTypes.array,
  isTagOptionsLoaded: PropTypes.bool,
  searchParamsRef: PropTypes.shape({
    search: PropTypes.string,
    tags: PropTypes.array,
    col: PropTypes.object,
  }),
}

// DefaultProps
export const defaultProps = {
  data: [],
  category: '',
  setFileViewerState: null,
  tagOptions: [],
  isTagOptionsLoaded: true,
  searchParamsRef: {
    search: '',
    tags: [],
    col: {},
  },
}

const INITIAL_CARD_WRAPPER_SIZE = {
  height: 0,
  width: 0,
}

const ITEM_WIDTH = 270 // mediaItem 寬度
const ITEM_HEIGHT = 348 // mediaItem 高度
const LIST_ADDITIONAL_WIDTH = 30 // 實測後把 width 多加 30 在 onResize 時 UX 比較好

function InnerPage(props) {
  const style = getStyle(props)
  const { setPage, category, forwardCustom, setFileViewerState, tagOptions, isTagOptionsLoaded, searchParamsRef } = props
  const { search, col, tags } = searchParamsRef
  const initialSortStatus = col[category]
  const [keyword, setKeyword] = useState(search)
  const [sortStatus, setSortStatus] = useState(initialSortStatus)
  const [cardWrapperSize, setCardWrapperSize] = useState(INITIAL_CARD_WRAPPER_SIZE)
  const [isDummyLoading, setIsDummyLoading] = useState(true)
  const collectionRef = useRef(null)
  const cardWrapperRef = useRef(null)
  const debounceTimerRef = useRef()

  const title = SECTION_TITLE[category]

  const { innerPageData } = useLibraryData({ category, search, col: SORT_TYPE_PARAM[col], tags })
  const { result, isLoaded, isFetching, updateParameter } = innerPageData

  const hasCreateButton = title === SECTION_TITLE[LIBRARY_CATEGORIES.QUICKSIGHT]

  const cellRenderer = props => {
    // eslint-disable-next-line react/prop-types
    const { index, key, style } = props
    return (
      <div className='grid-cell' key={key} style={{ ...style, margin: 10 }}>
        <Card
          key={`innerPage_${key}`}
          cardData={result[index]}
          allData={result}
          setFileViewerState={setFileViewerState}
          sectionTitle={title}
          category={category}
        />
      </div>
    )
  }

  const onResize = () => {
    if (!isEmpty(collectionRef.current)) {
      // Collection 是透過 position 設置 item 位置，但這樣位置都是寫死的
      // 所以在 resize 時要重新設定 position
      collectionRef.current.recomputeCellSizesAndPositions()
    }
  }

  const cellSizeAndPositionGetter = (cell, width) => {
    const { index } = cell

    // react-virtualized 官方 Collection 的 position 都寫死的
    // 所以要自己算出 position 做出 flex-wrap 的效果，並且 resize 時都要拿到新的 width 重新設置 position
    const WIDTH = width > ITEM_WIDTH ? width + LIST_ADDITIONAL_WIDTH : ITEM_WIDTH

    const itemSizeForRow = Math.floor(WIDTH / ITEM_WIDTH)

    const rowNumber = Math.floor(index / itemSizeForRow)

    const newData = result.map(item => {
      return { ...item, width: ITEM_WIDTH, height: ITEM_HEIGHT, x: ITEM_WIDTH * (index % itemSizeForRow), y: ITEM_HEIGHT * rowNumber }
    })

    const datum = newData[index]

    return {
      height: datum.height,
      width: datum.width,
      x: datum.x,
      y: datum.y,
    }
  }

  useEffect(() => {
    if (cardWrapperRef.current) {
      setCardWrapperSize({ height: cardWrapperRef.current.offsetHeight, width: cardWrapperRef.current.offsetWidth })
    }
  }, [])

  const handleCreate = () => {
    window.open('http://quicksight.aws.amazon.com/', '_blank')
  }

  const onChange = event => {
    const currentValue = event.target.value
    setKeyword(currentValue)
    if (currentValue.length >= TRIGGER_SEARCH_THRESHOLD || currentValue.length === 0) {
      clearTimeout(debounceTimerRef.current)

      debounceTimerRef.current = setTimeout(() => {
        updateParameter({ search: currentValue })
      }, 1000)
    }
  }

  return (
    <motion.div
      css={style.libraryWrapper()}
      key='innerPage'
      initial='initial'
      animate='in'
      exit='out'
      custom={forwardCustom}
      variants={pageVariants}
      transition={pageTransition}
      onAnimationComplete={() => setIsDummyLoading(false)}
    >
      <div css={style.librarySideWrapper()}>
        <Formik {...getFormikConfig(searchParamsRef)}>
          {formikProps => (
            <Form>
              <Filter tagOptions={tagOptions} isLoaded={isTagOptionsLoaded} updateParameter={updateParameter} />
            </Form>
          )}
        </Formik>
      </div>
      <div css={style.libraryMainWrapper()}>
        <div css={style.libraryMain()}>
          <div css={style.mainHeader()}>
            <SearchInput name='keyword' placeholder='Search' height={40} width={260} value={keyword} onChange={onChange} />
            {hasCreateButton && (
              <Button iconBefore='plus' appearance='primary' onClick={handleCreate}>
                Create New
              </Button>
            )}
          </div>
          <div css={style.filterWrapper()}>
            <div css={style.mainTitle()}>
              <span css={style.titleTextHome()} onClick={() => setPage({ pageName: LIBRARY_PAGES.MAIN, pageTitle: '', category: '' })}>
                Library Home
              </span>
              <Icons.Arrow css={style.breadCrumbIcon()} />
              <span css={style.titleTextCurrent()}>All {title}</span>
            </div>
            <SelectMenu
              isMultiSelect={false}
              position='bottom-right'
              closeOnSelect
              height={99}
              width={170}
              hasTitle={false}
              hasFilter={false}
              options={sortOptions}
              selected={sortStatus}
              onSelect={selectedItem => {
                const currentCol = selectedItem.value
                // searchParamsRef.col[category] = currentCol
                updateParameter({ col: SORT_TYPE_PARAM[currentCol] })
                setSortStatus(selectedItem.value)
              }}
            >
              <Button name='sort' appearance='minimal' iconAfter='swap-vertical' marginRight={5} style={{ color: '#586274' }}>
                {capitalize(sortStatus)}
              </Button>
            </SelectMenu>
          </div>
          <div css={style.cardWrapper()} ref={cardWrapperRef}>
            {isDummyLoading || !isLoaded || isFetching ? (
              <Spinner css={style.spinner()} />
            ) : (
              <AutoSizer disableHeight onResize={onResize}>
                {({ width }) => (
                  <Collection
                    id='assets-list'
                    css={style.cardWrapperCollection()}
                    ref={collectionRef}
                    cellCount={result.length}
                    cellRenderer={cellRenderer}
                    cellSizeAndPositionGetter={cell => cellSizeAndPositionGetter(cell, width)}
                    width={cardWrapperSize.width}
                    height={cardWrapperSize.height}
                  />
                )}
              </AutoSizer>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

InnerPage.propTypes = propTypes
InnerPage.defaultProps = defaultProps

export default hot(InnerPage)
