// Libs
import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { chunk, isEmpty } from 'lodash'
import { motion, AnimatePresence } from 'framer-motion'
import { fromEvent } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

// Components
import Icons from 'assets/icons'
import Card from '../Card'

// Style
import getStyle from './style'

// constants

// PropTypes
export const propTypes = {
  data: PropTypes.array,
  category: PropTypes.string,
  setFileViewerState: PropTypes.func,
  isLoaded: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  category: '',
  isLoaded: true,
}

// framer motion parameters
const framerVariants = {
  enter: direction => {
    let x

    if (direction === NEXT_DIRECTION) {
      x = '100%'
    } else if (direction === PREV_DIRECTION) {
      x = '-100%'
    } else {
      x = 0
    }

    return {
      x,
      opacity: 1,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: direction => {
    return {
      zIndex: 0,
      x: direction === PREV_DIRECTION ? '100%' : '-100%',
      opacity: 1,
    }
  },
}

const framerTransition = {
  x: { type: 'spring', stiffness: 300, damping: 200 },
  opacity: { duration: 0.6 },
}

// slider items

// slider actions
const NEXT_DIRECTION = 1
const PREV_DIRECTION = -1
const INITIAL_DIRECTION = 0

// initial states
const initialCurrentPageIndex = { currentPageIndex: 0, direction: INITIAL_DIRECTION }

const loadingCards = () => {
  const renderLoadingCards = []
  for (let i = 0; i < 4; i++) {
    renderLoadingCards.push(<Card key={Math.random()} isLoaded={false} />)
  }

  return renderLoadingCards
}

function Slider(props) {
  const { data, category, setFileViewerState, isLoaded } = props
  const style = getStyle(props)
  const sliderRef = useRef(null)

  const [{ currentPageIndex, direction }, setCurrentPageIndex] = useState(initialCurrentPageIndex)
  const [sliderBodyHeight, setSliderBodyHeight] = useState(0)
  const [sliderBodyWidth, setSliderBodyWidth] = useState(0)

  const CARD_WIDTH = 250
  const ITEMS_PER_ROW = 1
  const ITEMS_PER_COLUMN = Math.floor(sliderBodyWidth / CARD_WIDTH)
  const ITEMS_PER_PAGE = ITEMS_PER_ROW * ITEMS_PER_COLUMN

  const dataChunkedByPages = chunk(data, ITEMS_PER_PAGE)
  const dataChunkedByPagesLength = dataChunkedByPages.length

  const isFirstPage = currentPageIndex === 0
  const isLastPage = currentPageIndex === dataChunkedByPagesLength - 1

  const handleSliderResize = useCallback(() => {
    if (!isEmpty(sliderRef.current)) setSliderBodyWidth(sliderRef.current?.offsetWidth)
  }, [sliderRef])

  useEffect(() => {
    setSliderBodyWidth(sliderRef.current.offsetWidth)
  }, [sliderRef, data])

  useEffect(() => {
    let resizeSubscription
    if (sliderRef.current) {
      setSliderBodyHeight(sliderRef.current.offsetHeight)

      resizeSubscription = fromEvent(window, 'resize')
        .pipe(debounceTime(300))
        .subscribe(handleSliderResize)
    }

    return () => {
      if (resizeSubscription) {
        resizeSubscription.unsubscribe()
      }
    }
  }, [currentPageIndex, handleSliderResize])

  const getPageData = page => {
    let pageIndex = 0

    // 處理循環輪播的資料
    // currentPageIndex 與 programDataIndex 的對照表（假設有6頁的資料）
    // currentPageIndex --> ...  -7   -6 -5 -4 -3 -2 -1    0  1  2  3  4  5    6  7  ...
    // programDataIndex --> ...   5]  [0  1  2  3  4  5]  [0  1  2  3  4  5]  [0  1  ...
    if (page >= 0) {
      pageIndex = page % dataChunkedByPagesLength
    } else {
      if (Math.abs(page) % dataChunkedByPagesLength === 0) {
        pageIndex = 0
      } else {
        pageIndex = dataChunkedByPagesLength - (Math.abs(page) % dataChunkedByPagesLength)
      }
    }
    return dataChunkedByPages[pageIndex]
  }

  const paginate = newDirection => {
    setCurrentPageIndex({ currentPageIndex: currentPageIndex + newDirection, direction: newDirection })
  }

  const renderCards = () => {
    if (!isLoaded) {
      return loadingCards()
    } else {
      if (isEmpty(data)) {
        return <div css={style.noData()}>No Data Available</div>
      } else {
        return (
          <motion.div
            css={style.motionWrapper()}
            key={currentPageIndex}
            custom={direction}
            variants={framerVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={framerTransition}
          >
            {dataChunkedByPages.length > 0 &&
              getPageData(currentPageIndex).map((item, index) => (
                <Card
                  key={`${category}_${index}`}
                  cardData={item}
                  allData={data}
                  setFileViewerState={setFileViewerState}
                  isLoaded={isLoaded}
                  category={category}
                />
              ))}
          </motion.div>
        )
      }
    }
  }

  return (
    <div css={style.sliderWrapper()}>
      <div css={style.sliderBody({ height: sliderBodyHeight })}>
        <AnimatePresence initial={false} custom={direction}>
          <div css={style.slider()} ref={sliderRef}>
            {renderCards()}
          </div>
        </AnimatePresence>
      </div>
      {!isEmpty(data) && !isFirstPage && isLoaded && (
        <div css={style.sliderActions({ isPrev: true })}>
          <div css={style.actionButton({ isPrev: true })} className='action-button' onClick={() => paginate(PREV_DIRECTION)}>
            <Icons.Arrow css={style.actionButtonIcon(true)} />
          </div>
        </div>
      )}
      {!isEmpty(data) && !isLastPage && isLoaded && (
        <div css={style.sliderActions({ isPrev: false })}>
          <div css={style.actionButton({ isPrev: false })} onClick={() => paginate(NEXT_DIRECTION)}>
            <Icons.Arrow css={style.actionButtonIcon(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

Slider.propTypes = propTypes
Slider.defaultProps = defaultProps

export default Slider
