import React from 'react'
import PropTypes from 'prop-types'

// Lib

// Components
import NavMenu from './components/NavMenu'

// Style
import getStyle from './style'

// Variables / Functions

export const propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  navigations: PropTypes.array,
}

const initialItemProps = {
  name: 'All',
  isProgram: true,
  program: 'All',
  path: 'All',
}

function Navigation(props) {
  const style = getStyle(props)
  const { navigations } = props

  const renderMenu = navigations =>
    navigations.map(({ hasSub, nest, ...itemProps }, index) => {
      return <NavMenu.Group.Item key={index} itemProps={itemProps} hasSub={hasSub} subItem={hasSub ? renderMenu(nest) : []} {...props} />
    })

  return (
    <section css={style.navigation()}>
      <NavMenu>
        <>
          <NavMenu.Group title='Program'>
            <NavMenu.Group.Item itemProps={initialItemProps} {...props}>
              All
            </NavMenu.Group.Item>
            {renderMenu(navigations)}
          </NavMenu.Group>
          {/* TODO: For Quicksight POC 先能動就好 */}
          {/* 未來要針對 Gallery 不只有 program 還有 quicksight 而重構 Gallery Navigation  */}
          {/* TODO: Quicksight 不上 PROD，先註解掉 */}
          {/* {canViewQuicksight && (
            <NavLink css={style.navLink()} replace to='/home/quicksight'>
              <div css={style.quicksightWrapper()}>
                <span>Quicksight</span>
              </div>
            </NavLink>
          )} */}
        </>
      </NavMenu>
    </section>
  )
}

Navigation.propTypes = propTypes

export default Navigation
