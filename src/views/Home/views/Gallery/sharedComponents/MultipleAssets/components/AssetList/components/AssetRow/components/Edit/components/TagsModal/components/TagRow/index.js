import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, useWatch } from 'react-hook-form'
import { cloneDeep } from 'lodash'

// Components
import { IconButton } from 'evergreen-ui'
import HookForm from 'basicComponents/HookForm'
import AssetItemSmall from 'src/views/Home/views/Gallery/sharedComponents/AssetsForm/components/AssetItemSmall'

// Lib MISC

// Variables

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  currentTagOptions: PropTypes.array,
  tags: PropTypes.array,
  selectedRemoveItem: PropTypes.number,
  setSelectedRemoveItem: PropTypes.func,
}

export const defaultProps = {
  setCurrentMode: () => {},
  assetInfo: {},
}

function TagsRow(props) {
  const style = getStyle(props)
  const { index, currentTagOptions, tags, selectedRemoveItem, setSelectedRemoveItem } = props

  const { control, setValue, register, reset } = useFormContext()

  const tagKey = useWatch({
    control,
    name: `tags.${index}.tagKey`,
  })

  useEffect(() => {
    register('tags')
  }, [register])

  useEffect(() => {
    register(`tags.${index}.tagKey`)
    register(`tags.${index}.tagName`)
    register(`tags.${index}.tagValues`)
  }, [index, register])

  const getTagValueOptions = tagKey => {
    if (tagKey) {
      const currentTagValueOptions = currentTagOptions.find(item => item.value === tagKey)

      return currentTagValueOptions?.tagValueOptions
    }
  }

  const onRemoveTagClick = () => {
    const newTags = cloneDeep(tags)
    newTags.splice(selectedRemoveItem, 1)

    reset({ tags: newTags })

    setSelectedRemoveItem(null)
  }

  return (
    <div css={style.tagField()}>
      <div css={style.tagSelectWrapper()}>
        <AssetItemSmall hasTitle={false} customCss={{ width: 160, marginRight: 15 }}>
          <HookForm.SelectField
            placeholder='Select key'
            options={currentTagOptions}
            name={`tags.${index}.tagKey`}
            onChange={options => {
              setValue(`tags.${index}.tagValues`, '')
            }}
          />
        </AssetItemSmall>
        <AssetItemSmall hasTitle={false} customCss={{ width: 260 }}>
          <HookForm.MultiSelectField
            placeholder='Select value'
            options={getTagValueOptions(tagKey)}
            onChange={options => {
              setValue(
                `tags.${index}.tagName`,
                options?.map(item => item.label),
              )
            }}
            name={`tags.${index}.tagValues`}
          />
        </AssetItemSmall>
        {selectedRemoveItem === index ? (
          <IconButton
            type='button'
            appearance='minimal'
            intent='danger'
            icon='delete'
            onBlur={() => setSelectedRemoveItem(null)}
            onClick={onRemoveTagClick}
            marginBottom={30}
          />
        ) : (
          <IconButton
            type='button'
            appearance='minimal'
            icon='remove'
            onBlur={() => setSelectedRemoveItem(null)}
            onClick={() => setSelectedRemoveItem(index)}
            marginBottom={30}
          />
        )}
      </div>
    </div>
  )
}

TagsRow.defaultProps = defaultProps
TagsRow.propTypes = propTypes

export default TagsRow
