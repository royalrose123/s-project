import styled, { setLabel } from 'utils/styled'

export default props => ({
  noAssetsWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: calc(100% - 60px);
      min-height: 220px;
      width: 100%;
      margin: auto;
      margin-top: 12px;
      margin-bottom: 8px;
      background-color: #f1f1f1;
      color: #2c313a;
    `)
  },

  noAssetsTitle() {
    return setLabel(styled.rem`
      font-size: 18px;
      font-weight: bold;
      margin: 6px;
    `)
  },
})
