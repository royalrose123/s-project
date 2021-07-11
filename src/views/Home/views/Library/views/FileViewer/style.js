import styled, { setLabel } from 'utils/styled'
import { CONTROL_PANEL_THEME, EXTENSIONS } from '../../constant'

export default props => ({
  example() {
    return setLabel(styled.rem``)
  },

  videoViewerWrapper({ width, height }) {
    return setLabel(styled.rem`
      width: ${Math.round(width + 80)}px;
      height: ${Math.round(height + 80)}px;
      max-width: 1063px;
      max-height: 596px;
      display: flex;
      justify-content: center;
      align-items: center;
    `)
  },

  kukuDocsViewer({ extension = EXTENSIONS.PDF, isFullscreenModeOn = true }) {
    const width = extension === EXTENSIONS.XLSX && isFullscreenModeOn === false ? '1100px' : '100%'
    const cursor = extension === EXTENSIONS.PDF ? 'grab' : 'default'

    return setLabel(styled.rem`
      width: ${width};
      height: 100%;
      position: relative;
      color: #000000;
      cursor: ${cursor};
      overflow: scroll;
    `)
  },

  kukuDocsDomWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
      position: relative;
    `)
  },

  pdfControlPanel() {
    // const width = 355
    return setLabel(styled.rem`
      width: auto;
      height: 32px;
      background: #000000;
      color: #ffffff;
      opacity: 0.5;
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-radius: 3px;
      z-index: 9999;
      transition: 0.3s;
      cursor: default;

      :hover {
        opacity: 1;
      }
    `)
  },

  totalPage() {
    return setLabel(styled.rem`
      width: 30px;
      margin: 0 5px;
      display: flex;
      justify-content: center;
    `)
  },

  pageControlButton(isDisabled = false) {
    const svg = '& > svg'
    return setLabel(styled.rem`
      transition: 0.3s;
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};

      ${svg} {
        fill: ${isDisabled ? '#444444' : '#ffffff'} !important;
      }

      &:focus {
        box-shadow: none !important;
      }

      &:hover {
        background-color: ${isDisabled ? 'none' : '#444444'} !important;
      }
    `)
  },

  pageInput() {
    return setLabel(styled.rem`
      border: none;
      background: none;
      color: #ffffff;
      width: 30px;
      font-size: 16px;
      margin: 0 5px;

      &:focus {
        outline: none;
      }
    `)
  },

  // zoomToFit() {
  //   return setLabel(styled.rem`
  //     width: auto;
  //     height: 100%;
  //     display: flex;
  //     align-items: center;
  //     cursor: pointer;
  //     padding: 0 10px;
  //     transition: 0.3s;
  //     border-radius: 3px;
  //
  //     &:hover {
  //       background-color: #444444;
  //     }
  //   `)
  // },

  xlsxControlPanel() {
    return setLabel(styled.rem`
      width: 100%;
      height: 32px;
      background: #eeeeee;
      color: #000000;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      border-radius: 2px;
      z-index: 9999;
      padding: 0 10px;
    `)
  },

  sheetTabs() {
    return setLabel(styled.rem`
      display: flex;
      width: auto;
      height: 100%;
    `)
  },

  fileViewerWrapper() {
    return setLabel(styled.rem`
      position: fixed;
      background: rgb(0, 0, 0, 0.85);
      width: 100%;
      height: 100%;
      top: 0;
      z-index: 10;
      color: #ffffff;
    `)
  },

  sheet(isCurrent = false) {
    return setLabel(styled.rem`
      padding: 0 15px;
      width: auto;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: ${isCurrent ? '#ffffff' : '#eeeeee'};
      box-shadow: ${isCurrent ? '5px 7px 13px -2px rgba(0,0,0,0.27)' : 'none'};
      border-radius: 0 0 2px 2px;
      transition: 0.3s;
      color: rgb(102, 120, 138);

      &:hover {
        background-color: ${isCurrent ? '' : 'rgba(67, 90, 111, 0.06)'};
      }
    `)
  },

  xlsxControlButtonGroup() {
    return setLabel(styled.rem`
      display: flex;
      width: auto;
      height: 100%;
    `)
  },

  xlsxControlButton(isDisabled = false) {
    const svg = '& > svg'
    return setLabel(styled.rem`
      transition: 0.3s;
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};

      ${svg} {
        fill: ${isDisabled ? 'rgb(193,203,214)' : 'rgb(102, 120, 138)'} !important;
      }

      &:focus {
        box-shadow: none !important;
      }

      &:hover {
        background-color: ${isDisabled ? 'none' : 'rgba(67, 90, 111, 0.06)'} !important;
      }
    `)
  },

  zoomPercentage(theme = CONTROL_PANEL_THEME.DARK) {
    const backgroundColor = theme === CONTROL_PANEL_THEME.DARK ? '#444444' : 'rgba(67, 90, 111, 0.06)'
    const color = theme === CONTROL_PANEL_THEME.DARK ? '#ffffff' : 'rgb(102, 120, 138)'

    return setLabel(styled.rem`
      width: 65px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: ${color};
      padding: 0 10px;
      transition: 0.3s;
      border-radius: 3px;

      &:hover {
        background-color: ${backgroundColor};
      }
    `)
  },

  fileViewerHeader() {
    return setLabel(styled.rem`
      width: 100%;
      height: 58px;
      display: flex;
      justify-content: space-between;
      padding: 0 24px;
    `)
  },

  headerLeft() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
    `)
  },

  headerLeftIcon() {
    const svg = '& > svg'
    return setLabel(styled.rem`
      ${svg} {
        fill: #ffffff !important;
      }
    `)
  },

  fileTypeIconWrapper() {
    return setLabel(styled.rem`
      width: 30px;
      height: 30px;
      //background: red;
      margin-right: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    `)
  },

  headerRight() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      cursor: pointer;
    `)
  },

  downloadIcon() {
    return setLabel(styled.rem`
      fill: #ffffff;
    `)
  },

  fileViewerBody(removeBackground = false) {
    const kukuDocsContainer = '& > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)'
    const kukuDocsPage = '& > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div'

    return setLabel(styled.rem`
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100% - 58px);
      position: relative;

      ${kukuDocsContainer} {
        ${removeBackground ? 'background-color: transparent !important;' : ''}
      }

      ${kukuDocsPage} {
        ${removeBackground ? 'background-color: transparent !important;' : ''}
      }
    `)
  },

  fileViewerSpinnerWrapper() {
    return setLabel(styled.rem`
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `)
  },

  fileViewerSpinner() {
    const circle = '& > svg > circle'
    return setLabel(styled.rem`
      ${circle} {
        stroke: #ffffff;
      }
    `)
  },

  iframeWrapper(width = '100%') {
    return setLabel(styled.rem`
      width: ${width};
      height: calc(100% - 58px);
      //margin: 0 auto;
      background: #d1d1d1;
      position: relative;
    `)
  },

  iframe() {
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;
    `)
  },

  fullscreenButton() {
    return setLabel(styled.rem`
      position: absolute;
      width: 40px;
      height: 40px;
      background: #000000;
      top: 12px;
      right: 12px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;
    `)
  },

  notSupportedFileText() {
    return setLabel(styled.rem`
      margin: 0 auto;
      height: 100%;
      width: 50%;
      font-size: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
    `)
  },

  actionButton(isPrev = true) {
    return setLabel(styled.rem`
      width: 34px;
      height: 34px;
      background: #000000;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: absolute;
      top: calc(50% - 34px / 2);
      ${isPrev ? 'left' : 'right'}: 24px;
      fill: #ffffff;
      margin: 10px;
    `)
  },

  actionButtonIcon(isPrev = true) {
    return setLabel(styled.rem`
      transform: rotateZ(${isPrev ? 0 : '180deg'});
    `)
  },
})
