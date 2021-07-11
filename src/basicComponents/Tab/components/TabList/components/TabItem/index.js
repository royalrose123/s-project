import React from 'react'
import PropTypes from 'prop-types'

// Components

// Style

// Variables / Functions

export const propTypes = {
  itemCss: PropTypes.object,
  customCss: PropTypes.object,
  name: PropTypes.string.isRequired,
  currentTab: PropTypes.string,
  onItemClick: PropTypes.func,
  onTabItemClickProps: PropTypes.func,
  icon: PropTypes.object,
}

function TabItem(props) {
  const { itemCss, customCss, name, currentTab, onItemClick, onTabItemClickProps, icon, ...restProps } = props

  const onTabItemClick = event => {
    onItemClick(event)
    if (onTabItemClickProps) onTabItemClickProps(event)
  }

  return (
    <div css={[itemCss, customCss]} data-for={name} onClick={onTabItemClick} {...restProps}>
      {icon}
      <span>{name}</span>
    </div>
  )
}

TabItem.propTypes = propTypes

export default TabItem
