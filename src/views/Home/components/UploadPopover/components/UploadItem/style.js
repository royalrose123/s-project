import styled, { setLabel } from 'utils/styled'
import { itemStyle } from '../../sharedStyle'

export default props => {
  const iconWrapperStyle = styled.plainText`
    background: #26334d;
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    //position: absolute;
    //top: 0;
    cursor: pointer;
    border-radius: 50%;
  `

  return {
    fileNameWrapper() {
      return setLabel(styled.rem`
        overflow: hidden;
        width: calc(100% - 50px);
      `)
    },

    fileName() {
      return setLabel(styled.rem`
        width: 100%;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
      `)
    },

    uploadItem() {
      return setLabel(styled.rem`
        background: #fff;
        padding: 16px 28px;
        justify-content: space-between;
        ${itemStyle}
      `)
    },

    iconWrapper() {
      return setLabel(styled.rem`
        position: relative;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
      `)
    },

    stopUpload() {
      return setLabel(styled.rem`
        ${iconWrapperStyle}
      `)
    },

    cancelUpload() {
      return setLabel(styled.rem`
        ${iconWrapperStyle};
        background: transparent;
      `)
    },

    reUpload() {
      return setLabel(styled.rem`
        ${iconWrapperStyle}
      `)
    },

    errorMessage() {
      return setLabel(styled.rem`
        color: #d0021b;
        font-size: 12px;
        margin-top: 6px;
      `)
    },

    failedButton() {
      return setLabel(styled.rem`
        display: inline-block;
        margin: 5px 10px 0 0;
        color: #d0021b;
        font-weight: bold;
      `)
    },
  }
}
