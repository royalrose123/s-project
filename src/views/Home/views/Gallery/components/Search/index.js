// Libs
import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

// Components
import Form from 'basicComponents/Form'
import { Button, Icon, SearchInput, Popover, Pane, Position } from 'evergreen-ui'

// Lib MISC
import { start } from 'utils/start-flow'
import { getCampaignOptions } from '../../sharedMethods/getCampaignOptions'
import useAssetFormOptions from '../../sharedHooks/useAssetFormOptions'
import getformikConfig from './formikConfig'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  match: PropTypes.object,
  filterOptions: PropTypes.object,
  onInputChange: PropTypes.func,
  searchForm: PropTypes.shape({
    assetName: PropTypes.string,
    programName: PropTypes.string,
    campaignName: PropTypes.string,
    platform: PropTypes.string,
    format: PropTypes.string,
    countryCode: PropTypes.string,
    language: PropTypes.string,
    runningDate: PropTypes.string,
  }),
}

// DefaultProps
export const defaultProps = {}

function Search(props) {
  const { match, searchForm, filterOptions, onInputChange } = props
  const { params } = match
  const { programOptions, platformOptions, languageOptions, countryOptions, tagOptions } = filterOptions

  const style = getStyle(props)
  const formikConfig = getformikConfig(props)

  const { assetName } = searchForm

  const [platform, setPlatform] = useState(searchForm.platform)
  const [isFilter, setIsFilter] = useState(false)

  const { formatOptions } = useAssetFormOptions({ filterOptions, assetPlatform: platform })

  const currentProgram = params.program
  const currentCampaign = params.campaign

  useEffect(() => {
    setPlatform(searchForm.platform)
  }, [searchForm])

  const getTagValueOptions = tagKey => {
    if (tagKey) {
      const currentTagValueOptions = tagOptions?.find(item => item.value === tagKey)
      return currentTagValueOptions?.tagValueOptions
    }
  }

  return (
    <>
      <div css={style.searchInputWrapper()}>
        <SearchInput
          onChange={event => {
            onInputChange(event.target.value)
          }}
          value={assetName} // 因為 search 的 value 都透過 searchForm keep 住，所以 assetName 的 value 從 searchForm 來
          css={style.searchInput()}
          height={40}
          width={260}
          paddingRight={12}
          placeholder='Search for Asset Name'
        />
        <Popover
          minWidth={400}
          minHeight={260}
          statelessProps={{ style: { overflow: 'visible' } }}
          onOpen={() => setIsFilter(true)}
          onClose={() => setIsFilter(false)}
          content={({ close }) => (
            <Formik {...formikConfig}>
              {({ values, setFieldValue }) => (
                <Form>
                  <Pane display='flex' flexDirection='column' paddingY={12}>
                    {currentProgram === 'All' && (
                      <div css={style.filterRow()}>
                        <p css={style.filterLabel()}>Program</p>
                        <Form.SelectField
                          selectCss={style.filterSelect()}
                          onChange={() => setFieldValue('campaignName', 'All')}
                          options={programOptions}
                          name='programName'
                        />
                      </div>
                    )}
                    {!currentCampaign && (
                      <div css={style.filterRow()}>
                        <p css={style.filterLabel()}>Campaign</p>
                        <Form.SelectField
                          selectCss={style.filterSelect()}
                          options={getCampaignOptions({
                            filterOptions,
                            assetProgram: values.programName,
                          })}
                          isDisabled={values.programName === 'All'}
                          name='campaignName'
                        />
                      </div>
                    )}
                    <div css={style.filterRow()}>
                      <p css={style.filterLabel()}>Platform</p>
                      <Form.SelectField
                        selectCss={style.filterSelect()}
                        options={platformOptions}
                        onChange={start(option => setPlatform(option.value)).end(() => setFieldValue('format', 'All'))}
                        name='platform'
                      />
                    </div>
                    <div css={style.filterRow()}>
                      <p css={style.filterLabel()}>Placement</p>
                      <Form.SelectField selectCss={style.filterSelect()} options={formatOptions} name='format' />
                    </div>
                    <div css={style.filterRow()}>
                      <p css={style.filterLabel()}>Country</p>
                      <Form.SelectField selectCss={style.filterSelect()} options={countryOptions} name='countryCode' />
                    </div>
                    <div css={style.filterRow()}>
                      <p css={style.filterLabel()}>Language</p>
                      <Form.SelectField selectCss={style.filterSelect()} options={languageOptions} name='language' />
                    </div>
                    <div css={style.filterRow()}>
                      <p css={style.filterLabel()}>Tag (key)</p>
                      <Form.SelectField
                        selectCss={style.filterSelect()}
                        options={tagOptions}
                        onChange={() => setFieldValue('tagValue', 'All')}
                        name='tagKey'
                      />
                    </div>
                    <div css={style.filterRow()}>
                      <p css={style.filterLabel()}>Tag (value)</p>
                      <Form.SelectField
                        selectCss={style.filterSelect()}
                        options={getTagValueOptions(values.tagKey)}
                        name='tagValue'
                        isDisabled={values.tagKey === 'All'}
                      />
                    </div>
                    <div css={style.filterRow()}>
                      <p css={style.filterLabel()}>Running Date</p>
                      <Form.DatePickerField inputCss={style.datePickerInput()} name='runningDate' />
                    </div>
                    <div css={style.filterSearchRow()}>
                      <Button width={90} height={40} margin={16} type='submit' onClick={close}>
                        Search
                      </Button>
                    </div>
                  </Pane>
                </Form>
              )}
            </Formik>
          )}
          position={Position.BOTTOM_LEFT}
        >
          <Pane css={style.filterPopover()} minWidth={260} minHeight={40}>
            <button type='button' css={style.filterButton()}>
              {isFilter ? <Icon icon='chevron-up' size={16} /> : <Icon icon='chevron-down' size={16} />}
            </button>
          </Pane>
        </Popover>
      </div>
    </>
  )
}

Search.propTypes = propTypes
Search.defaultProps = defaultProps

export default withRouter(Search)
