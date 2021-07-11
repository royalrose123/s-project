import styled, { setLabel } from 'utils/styled'

export default props => ({
  example() {
    return setLabel(styled.rem``)
  },

  libraryOuter(isActive) {
    return setLabel(styled.rem`
      width: 100%;
      height: calc(100% - 50px);
      position: absolute;
      transition: 0.5s;
      filter: brightness(${isActive ? 1 : 0.5});
      background: #ffffff;
    `)
  },

  libraryWrapper(isActive) {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
      height: 100%;
      //position: absolute;
      transition: 0.5s;
      transform: scale(${isActive ? 1 : 0.95});
      // filter: brightness(${isActive ? 1 : 0.5});
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

  libraryMainWrapper() {
    return setLabel(styled.rem`
      height: 100%;
      width: calc(100% - 240px);
      background: #e1e8ea;
    `)
  },

  libraryMain() {
    return setLabel(styled.rem`
      height: 100%;
      width: calc(100% - 240px);
      position: absolute;
      //overflow: scroll;
      padding: 0;
      background: #e1e8ea;
    `)
  },

  libraryMainHeader() {
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
})
