// Libs
import React, { useRef } from 'react'
import { hot } from 'react-hot-loader/root'
import PropTypes from 'prop-types'
// import { motion } from 'framer-motion'
import { Formik } from 'formik'
import getFormikConfig from './formikConfig'

// Components
import Form from 'basicComponents/Form'
import Filter from '../../components/Filter'
import { SearchInput } from 'evergreen-ui'
import Section from '../../components/Section'
import Slider from '../../components/Slider'

// Lib MISC
import useLibraryData from '../../hooks/useLibraryData'

// Style
import getStyle from './style'

// Constants
import { LIBRARY_CATEGORIES, TRIGGER_SEARCH_THRESHOLD } from '../../constant'

// PropTypes
export const propTypes = {
  setPage: PropTypes.func,
  // forwardCustom: PropTypes.number,
  tagOptions: PropTypes.array,
  isTagOptionsLoaded: PropTypes.bool,
  searchParamsRef: PropTypes.shape({
    search: PropTypes.string,
    tags: PropTypes.array,
    col: PropTypes.object,
  }),
  setFileViewerState: PropTypes.func,
  isActive: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  setPage: null,
  tagOptions: [],
  isTagOptionsLoaded: true,
  searchParamsRef: {
    search: '',
    tags: [],
    col: {},
  },
  setFileViewerState: null,
  isActive: true,
}

function MainPage(props) {
  const style = getStyle(props)
  const { setPage, tagOptions, isTagOptionsLoaded, searchParamsRef, setFileViewerState, isActive } = props
  const debounceTimerRef = useRef()

  const {
    quicksightResults,
    isQuicksightLoaded,
    isQuicksightFetching,
    updateQuicksight,
    presentationResults,
    isPresentationLoaded,
    isPresentationFetching,
    updatePresentation,
    dataResourcesResults,
    isDataResourcesLoaded,
    isDataResourcesFetching,
    updateDataResources,
    externalUrlResults,
    isExternalUrlLoaded,
    isExternalUrlFetching,
    updateExternalUrl,
    updateLibraryParameters,
  } = useLibraryData()

  const onChange = event => {
    const currentValue = event.target.value
    searchParamsRef.search = currentValue
    if (currentValue.length >= TRIGGER_SEARCH_THRESHOLD || currentValue.length === 0) {
      clearTimeout(debounceTimerRef.current)

      debounceTimerRef.current = setTimeout(() => {
        updateLibraryParameters({ search: currentValue })
      }, 1000)
    }
  }

  return (
    <div css={style.libraryOuter(isActive)}>
      <div css={style.libraryWrapper(isActive)}>
        <div css={style.librarySideWrapper()}>
          <Formik {...getFormikConfig(searchParamsRef)}>
            {formikProps => {
              const { values } = formikProps
              const { tags } = values
              searchParamsRef.tags = tags

              return (
                <Form>
                  <Filter tagOptions={tagOptions} isLoaded={isTagOptionsLoaded} updateParameter={updateLibraryParameters} />
                </Form>
              )
            }}
          </Formik>
        </div>
        <div css={style.libraryMainWrapper()}>
          <div css={style.libraryMain()}>
            <div css={style.libraryMainHeader()}>
              <SearchInput name='keyword' placeholder='Search' height={40} width={260} onChange={onChange} />
            </div>
            <div css={style.sectionWrapper()}>
              <Section
                category={LIBRARY_CATEGORIES.QUICKSIGHT}
                setPage={setPage}
                updateParameter={updateQuicksight}
                searchParamsRef={searchParamsRef}
              >
                <Slider
                  data={quicksightResults}
                  setFileViewerState={setFileViewerState}
                  category={LIBRARY_CATEGORIES.QUICKSIGHT}
                  isLoaded={isQuicksightLoaded && !isQuicksightFetching}
                />
              </Section>
              <Section
                category={LIBRARY_CATEGORIES.PRESENTATION}
                setPage={setPage}
                updateParameter={updatePresentation}
                searchParamsRef={searchParamsRef}
              >
                <Slider
                  data={presentationResults}
                  setFileViewerState={setFileViewerState}
                  category={LIBRARY_CATEGORIES.PRESENTATION}
                  isLoaded={isPresentationLoaded && !isPresentationFetching}
                />
              </Section>
              <Section
                category={LIBRARY_CATEGORIES.DATA_RESOURCE}
                setPage={setPage}
                updateParameter={updateDataResources}
                searchParamsRef={searchParamsRef}
              >
                <Slider
                  data={dataResourcesResults}
                  setFileViewerState={setFileViewerState}
                  category={LIBRARY_CATEGORIES.DATA_RESOURCE}
                  isLoaded={isDataResourcesLoaded && !isDataResourcesFetching}
                />
              </Section>
              <Section
                category={LIBRARY_CATEGORIES.EXTERNAL_URL}
                setPage={setPage}
                updateParameter={updateExternalUrl}
                searchParamsRef={searchParamsRef}
              >
                <Slider
                  data={externalUrlResults}
                  setFileViewerState={setFileViewerState}
                  category={LIBRARY_CATEGORIES.EXTERNAL_URL}
                  isLoaded={isExternalUrlLoaded && !isExternalUrlFetching}
                />
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

MainPage.propTypes = propTypes
MainPage.defaultProps = defaultProps

export default hot(MainPage)
