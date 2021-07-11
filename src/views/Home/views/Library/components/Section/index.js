// Libs
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { capitalize } from 'lodash'

// Components
import Icons from 'assets/icons'
import { Button, SelectMenu } from 'evergreen-ui'

// Style
import getStyle from './style'

// Constants
import { sortOptions, LIBRARY_PAGES, SECTION_TITLE, SORT_TYPE_PARAM } from '../../constant'

// PropTypes
export const propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  category: PropTypes.string,
  setPage: PropTypes.func,
  updateParameter: PropTypes.func,
  searchParamsRef: PropTypes.object,
}

// DefaultProps
export const defaultProps = {
  setPage: null,
  category: '',
  updateParameter: null,
}

function Section(props) {
  const style = getStyle(props)
  const { children, category, setPage, updateParameter, searchParamsRef } = props
  const { col } = searchParamsRef
  const initialSortStatus = col[category]
  const [sortStatus, setSortStatus] = useState(initialSortStatus)

  const title = SECTION_TITLE[category]

  return (
    <div css={style.section()}>
      <div css={style.sectionHeader()}>
        <div css={style.titleWrapper()} onClick={() => setPage && setPage({ pageName: LIBRARY_PAGES.INNER_PAGE, pageTitle: title, category })}>
          <div css={style.title()}>{title}</div>
          <Icons.Arrow css={style.enterIcon()} />
        </div>
        <SelectMenu
          isMultiSelect={false}
          position='bottom-right'
          closeOnSelect
          height={99}
          width={170}
          hasTitle={false}
          hasFilter={false}
          options={sortOptions}
          selected={sortStatus}
          onSelect={selectedItem => {
            const currentCol = selectedItem.value
            searchParamsRef.col[category] = currentCol
            updateParameter({ col: SORT_TYPE_PARAM[currentCol] })
            setSortStatus(selectedItem.value)
          }}
        >
          <Button name='sort' appearance='minimal' iconAfter='swap-vertical' marginRight={5} style={{ color: '#586274' }}>
            {capitalize(sortStatus)}
          </Button>
        </SelectMenu>
      </div>
      <div css={style.itemListWrapper()}>{children}</div>
    </div>
  )
}

Section.propTypes = propTypes
Section.defaultProps = defaultProps

export default Section
