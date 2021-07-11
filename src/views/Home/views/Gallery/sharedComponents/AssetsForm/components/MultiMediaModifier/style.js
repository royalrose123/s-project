import styled, { setLabel } from 'utils/styled'

export default props => ({
  multiMediaModifier(hasFile, isMultipleUpload, hasFileAction) {
    return setLabel(styled.rem`
      position: relative;
      width: ${isMultipleUpload ? '100%' : hasFileAction ? '520px' : '420px'};
      height: ${isMultipleUpload ? '388px' : '250px'};
      margin-bottom: ${hasFile ? '65px' : '20px'};
    `)
  },

  multiMediaWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      display: flex;
      align-content: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      overflow-y: scroll;
    `)
  },

  singleMediaWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
    `)
  },

  uploadBox(hasCurrentFile, hasFile) {
    return setLabel(styled.rem`
      display: ${hasFile ? 'none' : 'block'};
      position: absolute;
      width: 100%;
      height: ${hasCurrentFile ? '45px' : '100%'};
      z-index: 1;
    `)
  },

  downloadButton() {
    return setLabel(styled.rem`
      text-decoration: none;
      font-size: 16px;
      background: #777;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      width: 100%;
      height: 45px;
      z-index: 1;
      cursor: pointer;
    `)
  },

  uploadButton() {
    return setLabel(styled.rem`
      margin-right: 4px;
    `)
  },
})
