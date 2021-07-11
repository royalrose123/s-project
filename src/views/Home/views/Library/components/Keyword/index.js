// Libs
import React, { useState } from 'react'
// import PropTypes from 'prop-types'

// Components
import { SearchInput } from 'evergreen-ui'

// Style
// import getStyle from './style'
// import { isEmpty } from 'lodash'

// PropTypes
export const propTypes = {
  // children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  // title: PropTypes.string,
  // cardData: PropTypes.shape({
  //   title: PropTypes.string,
  //   subtitle: PropTypes.string,
  //   sourcesPlatform: PropTypes.string,
  //   thumbnail: PropTypes.string,
  //   tags: PropTypes.arrayOf(PropTypes.string),
  //   url: PropTypes.string,
  // }),
  // allData: PropTypes.array,
  // customCss: PropTypes.object,
  // setFileViewerState: PropTypes.func,
  // setFieldValue: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  // cardData: {
  //   title: null,
  //   subtitle: null,
  //   sourcesPlatform: null,
  //   thumbnail: null,
  //   tags: [],
  // },
  // setFileViewerState: null,
  // allData: [],
}

function Keyword(props) {
  // const style = getStyle(props)
  // const { setFieldValue } = props
  const [keyword, setKeyword] = useState('')
  console.log(keyword)

  const handleChange = value => {
    // setFieldValue('keyword', value)
    setKeyword(value)
  }

  return (
    <SearchInput name='keyword' placeholder='Search' onChange={event => handleChange(event.target.value)} value={keyword} height={40} width={260} />
  )
}

Keyword.propTypes = propTypes
Keyword.defaultProps = defaultProps

export default Keyword
