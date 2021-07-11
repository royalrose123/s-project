import styled, { setLabel } from 'utils/styled'

export default props => ({
  dropBoxBig() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: #d8d8d8;
    `)
  },

  dropBoxSmall() {
    return setLabel(styled.rem`
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #777;
      color: #fff;
      cursor: pointer;
    `)
  },

  dropBoxTitle() {
    return setLabel(styled.rem`
      margin-top: 20px;
      text-align: center;
      color: #9b9b9b;

      &:last-of-type {
        margin-top: 7px;
        font-size: 14px;
      }
    `)
  },

  plusIconBox() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `)
  },

  plusIconWrapper() {
    return setLabel(styled.rem`
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 8px solid #9b9b9b;
      border-radius: 50%;
    `)
  },

  fileInput() {
    return setLabel(styled.rem`
      display: none;
    `)
  },

  imagePreviewBox() {
    return setLabel(styled.rem`
      width: 100%;
    `)
  },
})
