// Libs
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

// Components
import { SelectMenu, Button } from 'evergreen-ui'

// Style
import getStyle from './style'

// PropTypes
export const propTypes = {
  programOptions: PropTypes.array,
  selectedProgram: PropTypes.array,
  selectRef: PropTypes.object,
  setSelectedProgram: PropTypes.func,
}

// DefaultProps
export const defaultProps = {}

function Select(props) {
  const style = getStyle(props)
  const { programOptions, selectedProgram, selectRef, setSelectedProgram } = props
  const { setFieldValue } = useFormikContext()

  const [isActionsPopupOpened, setIsActionsPopupOpened] = useState(false)

  const handleSelectProgram = selectedItem => {
    const { label } = selectedItem

    if (label === 'All') {
      setFieldValue('program', programOptions)
      return setSelectedProgram(programOptions)
    }

    const newSelectedProgram = selectedProgram.concat(selectedItem)

    setFieldValue('program', newSelectedProgram)
    setSelectedProgram(newSelectedProgram)
  }

  const handleUnSelectProgram = selectedItem => {
    const { label } = selectedItem
    if (label === 'All') {
      setFieldValue('program', [])
      setSelectedProgram([])
    } else {
      const newSelectedProgram = selectedProgram.filter(item => item.value !== selectedItem.value).filter(item => item.value !== 'All')

      setFieldValue('program', newSelectedProgram)
      setSelectedProgram(newSelectedProgram)
    }
  }

  const selectedProgramText = () => {
    if (selectedProgram.length >= 1) {
      return `Select Programs (${selectedProgram.filter(item => item.label !== 'All').length})`
    } else {
      return 'All Programs'
    }
  }

  return (
    <>
      <SelectMenu
        name='program'
        isMultiSelect
        title='Select Programs'
        filterPlaceholder='Search Program'
        hasTitle={false}
        hasFilter={false}
        options={programOptions}
        selected={selectedProgram.map(item => item.value)}
        onSelect={handleSelectProgram}
        onDeselect={handleUnSelectProgram}
        onOpen={() => setIsActionsPopupOpened(true)}
        onClose={() => setIsActionsPopupOpened(false)}
        ref={selectRef}
      >
        <Button
          css={style.selectButton()}
          style={{ backgroundColor: '#e5ebed', padding: '0 4px' }}
          type='button'
          iconAfter={isActionsPopupOpened ? 'chevron-up' : 'chevron-down'}
        >
          {selectedProgramText()}
        </Button>
      </SelectMenu>
    </>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
