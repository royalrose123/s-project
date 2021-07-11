// Libs
import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { chunk, isEmpty } from 'lodash'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Icons from 'assets/icons'
import Card from '../Card'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  programData: PropTypes.array,
}

// DefaultProps
export const defaultProps = {}

// framer motion parameters
const framerVariants = {
  enter: direction => {
    return {
      x: direction === NEXT_DIRECTION ? '100%' : '-100%',
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

// initial states
const initialCurrentPageIndex = { currentPageIndex: 0, direction: 0 }

function Slider(props) {
  const { programData = [] } = props
  const style = getStyle(props)
  const sliderRef = useRef(null)

  const [{ currentPageIndex, direction }, setCurrentPageIndex] = useState(initialCurrentPageIndex)
  const [isSliderBodyOverflowHidden, setIsSliderBodyOverflowHidden] = useState(true)
  const [sliderBodyHeight, setSliderBodyHeight] = useState(0)
  const [sliderBodyWidth, setSliderBodyWidth] = useState(0)

  const CARD_WIDTH = 362
  const ITEMS_PER_ROW = 2
  const ITEMS_PER_COLUMN = Math.floor(sliderBodyWidth / CARD_WIDTH)
  const ITEMS_PER_PAGE = ITEMS_PER_ROW * ITEMS_PER_COLUMN

  const dataChunkedByPages = chunk(programData, ITEMS_PER_PAGE)
  const dataChunkedByPagesLength = dataChunkedByPages.length

  const isFirstRef = useRef(true)

  const handleSliderResize = useCallback(() => {
    if (!isEmpty(sliderRef.current)) setSliderBodyWidth(sliderRef.current?.offsetWidth)
  }, [sliderRef])

  useEffect(() => {
    if (isFirstRef.current && isEmpty(sliderRef.current)) {
      isFirstRef.current = false
    } else {
      setSliderBodyWidth(sliderRef.current.offsetWidth)
    }
  }, [isFirstRef, sliderRef])

  useEffect(() => {
    if (sliderRef.current) {
      setSliderBodyHeight(sliderRef.current.offsetHeight)

      window.addEventListener('resize', handleSliderResize)
    }

    return () => {
      window.removeEventListener('resize', handleSliderResize)
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
    setIsSliderBodyOverflowHidden(true)
    setCurrentPageIndex({ currentPageIndex: currentPageIndex + newDirection, direction: newDirection })
  }

  return (
    <div css={style.sliderWrapper()}>
      <div css={style.sliderBody({ isOverflowHidden: isSliderBodyOverflowHidden, height: sliderBodyHeight })}>
        <AnimatePresence initial={false} custom={direction}>
          <div css={style.slider()} ref={sliderRef}>
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
                    key={`card_${index}`}
                    index={index}
                    programData={item}
                    itemsPerColumn={ITEMS_PER_COLUMN}
                    isSliderBodyOverflowHidden={isSliderBodyOverflowHidden}
                    setIsSliderBodyOverflowHidden={setIsSliderBodyOverflowHidden}
                  />
                ))}
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
      <div css={style.sliderActions({ isPrev: true })}>
        <div css={style.actionButton()} className='action-button' onClick={() => paginate(PREV_DIRECTION)}>
          <Icons.Arrow css={style.actionButtonIcon(true)} />
        </div>
      </div>
      <div css={style.sliderActions({ isPrev: false })}>
        <div css={style.actionButton()} onClick={() => paginate(NEXT_DIRECTION)}>
          <Icons.Arrow css={style.actionButtonIcon(false)} />
        </div>
      </div>
    </div>
  )
}

Slider.propTypes = propTypes
Slider.defaultProps = defaultProps

export default Slider
