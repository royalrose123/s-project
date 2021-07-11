// Libs
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import findStaticPath from 'utils/find-static-path'

// Components
import { Menu, Icon } from 'evergreen-ui'

// Style
import getStyle from './style'

// PropTypes

export const propTypes = {
  match: PropTypes.object,
  hasSub: PropTypes.bool,
  subItem: PropTypes.array,
  itemProps: PropTypes.object,
}

function Item(props) {
  const style = getStyle(props)
  const { match, hasSub, subItem, itemProps } = props

  const { name, isProgram, program, path } = itemProps

  const [isOpen, setIsOpen] = useState(false)

  const { params } = match
  const { program: currentProgram, campaign: currentCampaign } = params

  const currentPath = currentCampaign ? `${currentProgram}/${currentCampaign}` : currentProgram

  const itemPath = isProgram ? window.encodeURIComponent(path) : `${program}/${window.encodeURIComponent(path)}`

  useEffect(() => {
    if (currentCampaign && currentProgram === program) setIsOpen(true)
  }, [currentCampaign, currentProgram, program])

  const onItemClick = () => {
    setIsOpen(!isOpen)
  }

  const renderMenuItemIcon = isOpen => (isOpen ? <Icon icon='chevron-up' size={16} /> : <Icon icon='chevron-down' size={16} />)

  const renderSecondaryText = (isProgram, isOpen) => {
    if (isProgram) return renderMenuItemIcon(isOpen)
  }

  return (
    <>
      <NavLink css={style.navLink()} replace to={`${findStaticPath(match.path)}/${itemPath}`}>
        <Menu.Item
          onSelect={onItemClick}
          secondaryText={name !== 'All' && renderSecondaryText(isProgram, isOpen)}
          style={{ height: 'auto' }}
          css={style.menuItem(window.decodeURIComponent(currentPath) === window.decodeURIComponent(itemPath))}
        >
          <span css={style.menuItemName(isProgram)}>{name}</span>
        </Menu.Item>
      </NavLink>
      {hasSub && <div css={style.menuCampignList(isOpen)}>{subItem}</div>}
    </>
  )
}

Item.propTypes = propTypes

export default Item
