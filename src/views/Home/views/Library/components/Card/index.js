// Libs
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { isEmpty, isArray } from 'lodash'

// Components
import Skeleton from 'react-loading-skeleton'
import { Spinner } from 'evergreen-ui'
import Icons from 'assets/icons'

// Style
import getStyle from './style'

// Misc
import { fetchQuicksightDashboard } from 'api/Gallery/fetchQuicksightDashboard'
import { updateMaterialClick } from 'api/Library/updateMaterialClick'
import { LIBRARY_CATEGORIES, EXTENSIONS } from '../../constant'

// Images
import thumbnailQuicksightDefault from 'assets/icons/img/thumbnail_quicksight_default.png'
import thumbnailPDFDefault from 'assets/icons/img/thumbnail_pdf_default.png'
import thumbnailMP4Default from 'assets/icons/img/thumbnail_mp4_default.png'
import thumbnailExcelDefault from 'assets/icons/img/thumbnail_excel_default.png'
import thumbnailLinkDefault from 'assets/icons/img/thumbnail_link_default.png'
import thumbnailUnknownDefault from 'assets/icons/img/thumbnail_unknown_default.png'

// PropTypes
export const propTypes = {
  cardData: PropTypes.shape({
    materialId: PropTypes.string,
    content: PropTypes.shape({
      title: PropTypes.string,
      subtitle: PropTypes.string,
      sourcePlatform: PropTypes.string,
      thumbnail: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      url: PropTypes.string,
      dashboardId: PropTypes.string,
      extension: PropTypes.string,
    }),
    tags: PropTypes.array,
    index: PropTypes.number,
  }),
  allData: PropTypes.array,
  customCss: PropTypes.object,
  setFileViewerState: PropTypes.func,
  category: PropTypes.string,
  isLoaded: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  cardData: {
    materialId: '',
    content: {},
    tags: [],
    index: null,
  },
  setFileViewerState: null,
  allData: [],
  category: '',
  isLoaded: true,
}

const defaultContent = {
  title: null,
  subtitle: null,
  sourcePlatform: null,
  thumbnail: null,
  tags: [],
  extension: '',
  url: '',
}

function Card(props) {
  const style = getStyle(props)
  const { cardData, customCss, setFileViewerState, allData, category, isLoaded } = props
  const { materialId, content = defaultContent, tags, index } = cardData
  const { url, title, subtitle, sourcePlatform, thumbnail, dashboardId, extension } = content
  // const urlRef = useRef(null)
  const [isShowMask, setIsShowMask] = useState(false)

  const handleClick = async () => {
    if (isShowMask || !isLoaded) return

    if (category === LIBRARY_CATEGORIES.QUICKSIGHT) {
      setIsShowMask(true)
      const response = await fetchQuicksightDashboard({ dashboardId })
      const { embeddedUrl } = await response

      if (!isEmpty(embeddedUrl)) {
        window.open(embeddedUrl, '_blank')
        updateMaterialClick({ materialId })
      } else {
        console.error('no embeddedUrl!')
      }

      setIsShowMask(false)
    } else if (category === LIBRARY_CATEGORIES.EXTERNAL_URL) {
      if (!isEmpty(url)) {
        window.open(url, '_blank')
        updateMaterialClick({ materialId })
      } else {
        alert('url error!')
      }
    } else {
      setFileViewerState({ isOpen: true, fileIndex: index, allData, file: cardData })
      updateMaterialClick({ materialId })
    }
  }

  const renderLoadingSkeleton = () => (
    <>
      <Skeleton height={140} />
      <div css={style.itemTitle()}>
        <Skeleton height={34} />
      </div>
      <div css={style.itemSubtitle()}>
        <Skeleton height={28} />
      </div>
      <div css={style.tagWrapper()}>
        <Skeleton height={20} width={50} style={{ margin: 2 }} />
        <Skeleton height={20} width={40} style={{ margin: 2 }} />
        <Skeleton height={20} width={70} style={{ margin: 2 }} />
        <Skeleton height={20} width={40} style={{ margin: 2 }} />
        <Skeleton height={20} width={60} style={{ margin: 2 }} />
      </div>
      <div css={style.itemSourcePlatform()}>
        <Skeleton height={16} />
      </div>
    </>
  )

  const getDefaultThumbnail = () => {
    let outputThumbnail

    if (!isEmpty(extension)) {
      if (extension === EXTENSIONS.PDF) {
        outputThumbnail = thumbnailPDFDefault
      } else if (extension === EXTENSIONS.MP4) {
        outputThumbnail = thumbnailMP4Default
      } else if (extension === EXTENSIONS.XLSX) {
        outputThumbnail = thumbnailExcelDefault
      } else {
        outputThumbnail = thumbnailUnknownDefault
      }
    } else if (category === LIBRARY_CATEGORIES.QUICKSIGHT) {
      outputThumbnail = thumbnailQuicksightDefault
    } else if (category === LIBRARY_CATEGORIES.EXTERNAL_URL) {
      outputThumbnail = thumbnailLinkDefault
    } else {
      outputThumbnail = thumbnailUnknownDefault
    }
    return outputThumbnail
  }

  const getFileIcon = () => {
    let outputIcon

    if (!isEmpty(extension)) {
      if (extension === EXTENSIONS.PDF) {
        outputIcon = <Icons.PDFFile css={style.fileIcon()} />
      } else if (extension === EXTENSIONS.MP4) {
        outputIcon = <Icons.MP4File css={style.fileIcon()} />
      } else if (extension === EXTENSIONS.XLSX) {
        outputIcon = <Icons.ExcelFile css={style.fileIcon()} />
      } else {
        outputIcon = null
      }
    } else {
      outputIcon = null
    }
    return outputIcon
  }

  const getThumbnail = () => {
    if (extension === EXTENSIONS.MP4) {
      return (
        <video css={style.itemThumbnailImage()} controls={false}>
          <source src={url} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      )
    } else {
      return <img src={thumbnail || getDefaultThumbnail()} alt={`${title}_thumbnail`} css={style.itemThumbnailImage()} />
    }
  }

  const getSourcePlatform = () => {
    let outputSourcePlatform = ''

    if (category === LIBRARY_CATEGORIES.EXTERNAL_URL) {
      outputSourcePlatform = sourcePlatform || url
    } else {
      outputSourcePlatform = sourcePlatform || ''
    }

    return outputSourcePlatform
  }

  return (
    <div css={[style.itemWrapper(isLoaded), customCss]} onClick={handleClick}>
      {!isLoaded ? (
        renderLoadingSkeleton()
      ) : (
        <>
          <div css={style.itemThumbnail()}>{getThumbnail()}</div>
          <div css={style.itemTitle()}>
            {getFileIcon()}
            {title || ''}
          </div>
          <div css={style.itemSubtitle()}>{subtitle || ''}</div>
          <div css={style.tagWrapper()}>
            {isArray(tags) && !isEmpty(tags) && (
              <>
                {tags.map((tag, index) => (
                  <div key={index} css={style.tag()}>
                    <p css={style.tagText()}>{tag}</p>
                  </div>
                ))}
              </>
            )}
          </div>
          <div css={style.itemSourcePlatform()}>{getSourcePlatform()}</div>
        </>
      )}
      {isShowMask && (
        <div css={style.itemMask()}>
          <div css={style.itemMaskText()}>Opening...</div>
          <Spinner css={style.itemMaskSpinner()} />
        </div>
      )}
    </div>
  )
}

Card.propTypes = propTypes
Card.defaultProps = defaultProps

export default Card
