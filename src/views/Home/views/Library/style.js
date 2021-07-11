import styled, { setLabel } from 'utils/styled'

export default props => ({
  example() {
    return setLabel(styled.rem``)
  },

  libraryWrapper() {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
      height: calc(100% - 50px);
      position: absolute;
    `)
  },

  librarySideWrapper() {
    return setLabel(styled.rem`
      height: 100%;
      width: 240px;
      //border-right: 1px solid #6d798b;
      box-shadow: 1px 0 0 rgba(0, 0, 0, 0.3);
      z-index: 2;
    `)
  },

  libraryMainPageWrapper() {
    return setLabel(styled.rem`
      height: 100%;
      width: calc(100% - 240px);
      background: #e1e8ea;
    `)
  },

  libraryMainPage() {
    return setLabel(styled.rem`
      height: 100%;
      width: calc(100% - 240px);
      position: absolute;
      //overflow: scroll;
      padding: 0;
      background: #e1e8ea;
    `)
  },

  libraryMainPageHeader() {
    return setLabel(styled.rem`
      margin: 30px 50px 45px 50px;
    `)
  },

  sectionWrapper() {
    return setLabel(styled.rem`
      height: calc(100% - 115px);
      overflow-x: visible;
      overflow-y: scroll;
      padding: 0 35px;
    `)
  },

  quicksight() {
    return setLabel(styled.rem`
      height: auto;
      width: 100%;
      overflow: scroll;
    `)
  },

  overpageWrapper() {
    return setLabel(styled.rem`
      height: 100%;
      width: 100%;
      overflow: scroll;
      align-items: center;
    `)
  },

  overpageHeaderWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    `)
  },

  quicksightDashboard() {
    return setLabel(styled.rem`
      height: calc(100% - 54px);
      display: flex;
      justify-content: center;
      align-items: center;
      background: #586274;
    `)
  },

  title() {
    return setLabel(styled.rem`
      margin: 15px;
      font-size: 24px;
      font-weight: bold;
      color: #000000;
    `)
  },

  back() {
    return setLabel(styled.rem`
      margin: 15px;
      cursor: pointer;
      color: black;
    `)
  },

  itemListWrapper() {
    return setLabel(styled.rem`
      overflow-x: scroll;
      overflow-y: hidden;
      display: flex;
      white-space: nowrap;
      min-height: 250px;
      padding: 30px 15px;
    `)
  },

  thumbnailDummy() {
    return setLabel(styled.rem`
      display: block;
      margin: 15px 45px 15px 15px;
    `)
  },

  titleDummy() {
    return setLabel(styled.rem`
      display: block;
      margin: 25px 15px 0 15px;
    `)
  },
})
