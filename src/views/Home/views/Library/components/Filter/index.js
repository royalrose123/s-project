// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, FieldArray } from 'formik'
// import useFetcher from 'effects/useFetcher'
import { isArray, isEmpty } from 'lodash'

// Components
import { Icon, Spinner } from 'evergreen-ui'
import Form from 'basicComponents/Form'
import AssetItemSmall from '../../../Gallery/sharedComponents/AssetsForm/components/AssetItemSmall'

// Lib MISC
// import { fetchMaterialTagKeyNValue } from 'api/Library/fetchMaterialTagKeyNValue'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  tagOptions: PropTypes.array,
  isLoaded: PropTypes.bool,
  updateParameter: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  tagOptions: [],
  isLoaded: true,
  updateParameter: null,
}

function Filter(props) {
  const style = getStyle(props)
  const { tagOptions, isLoaded, updateParameter } = props
  // const { tags, title, subtitle, sourcesPlatform, thumbnail } = cardData
  const { values } = useFormikContext()
  const { tags } = values

  // const { response, isLoaded } = useFetcher(fetchMaterialTagKeyNValue)
  // const { tagOptions } = response

  // console.log('%c values: ', 'background: gray; font-size: 20px; color: #000;', values)

  return (
    <div css={style.filterWrapper()}>
      <div css={style.titleWrapper()}>
        <Icon icon='filter' marginRight={4} size={16} />
        Filter
      </div>
      <div className='filter'>
        {!isLoaded ? (
          <Spinner css={style.spinner()} />
        ) : (
          <FieldArray name='tags'>
            {arrayHelpers => (
              <>
                {isArray(tagOptions) && !isEmpty(tagOptions) ? (
                  <>
                    {tagOptions.map((tagOption, index) => (
                      <AssetItemSmall title={tagOption.label} key={tagOption.value}>
                        <Form.MultiSelectField
                          placeholder='Select'
                          options={tagOption.tagValueOptions}
                          name={`tags.${index}`}
                          onBlur={() => updateParameter({ tags })}
                        />
                      </AssetItemSmall>
                    ))}
                  </>
                ) : (
                  <div css={style.noDataText()}>No Data</div>
                )}
              </>
            )}
          </FieldArray>
        )}
      </div>
    </div>
  )
}

Filter.propTypes = propTypes
Filter.defaultProps = defaultProps

export default Filter
