import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm, FormProvider, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'

// Components
import { Button } from 'evergreen-ui'
import TagRow from './components/TagRow'
import OverPage from 'basicComponents/OverPage'

// Lib MISC
import useAssetFormOptions from 'src/views/Home/views/Gallery/sharedHooks/useAssetFormOptions'

// Variables
import { schema } from './validation'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  index: PropTypes.number,
  isShown: PropTypes.bool,
  setIsTagsModalOpen: PropTypes.func,
  confirmLabel: PropTypes.string,
  filterOptions: PropTypes.object,
  tags: PropTypes.array,
  setValueProps: PropTypes.func,
}

export const defaultProps = {
  setCurrentMode: () => {},
}

function TagsModal(props) {
  const style = getStyle(props)
  const { index, isShown, setIsTagsModalOpen, confirmLabel, filterOptions, tags: tagsProps, setValueProps } = props

  const [selectedRemoveItem, setSelectedRemoveItem] = useState(null)

  const methods = useForm({ defaultValues: { tags: tagsProps }, resolver: yupResolver(schema) })
  const { setValue, control, register, handleSubmit } = methods

  const tags = useWatch({
    control,
    name: 'tags',
  })

  useEffect(() => {
    register('tags')
  }, [register])

  const { currentTagOptions } = useAssetFormOptions({
    filterOptions,
    tags,
  })

  const onAddTagClick = () => {
    const newTags = tags.concat({ tagKey: '', tagValues: '' })
    setValue(`tags`, newTags)
  }

  const onSubmit = data => {
    setValueProps(`uploadingFiles[${index}].tags`, data.tags)
    setIsTagsModalOpen(false)
  }

  return (
    <OverPage
      isShown={isShown}
      confirmLabel={confirmLabel}
      header={() => {
        return (
          <div css={style.headerWrapper()}>
            <div css={style.headerTitle()}>Edit Tags</div>
            <Button appearance='minimal' height={18} iconBefore='plus' css={style.addTagButton()} onClick={onAddTagClick} type='button'>
              Add
            </Button>
          </div>
        )
      }}
      onConfirm={handleSubmit(onSubmit)}
      onCloseComplete={() => setIsTagsModalOpen(false)}
      style={{ width: '600px', height: '496px', maxHeight: 'initial', margin: 'auto', marginTop: '12vmin' }}
      shouldCloseOnEscapePress={false}
      shouldCloseOnOverlayClick={false}
    >
      <FormProvider {...methods}>
        <form>
          {tags?.map((item, index) => (
            <TagRow
              key={index}
              index={index}
              currentTagOptions={currentTagOptions}
              tags={tags}
              selectedRemoveItem={selectedRemoveItem}
              setSelectedRemoveItem={setSelectedRemoveItem}
            />
          ))}
        </form>
      </FormProvider>
    </OverPage>
  )
}

TagsModal.defaultProps = defaultProps
TagsModal.propTypes = propTypes

export default TagsModal
