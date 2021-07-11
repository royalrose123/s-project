import styled, { setLabel } from 'utils/styled'

export default props => ({
  assetItemBig(hasAlignCheckbox) {
    const { hasChild } = props

    return setLabel(styled.rem`
      width: 100%;
      margin-bottom: ${hasChild ? '0' : hasAlignCheckbox ? '60' : '30'}px;
      position: relative;
    `)
  },

  assetItemTitleWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: row;
      align-items: center;
    `)
  },

  assetItemTitleComment() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #9ba3ad;
      margin-bottom: 9px;
      margin-left: 4px;
    `)
  },
})
