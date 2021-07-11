import styled, { setLabel } from 'utils/styled'

export default props => ({
  libraryWrapper() {
    return setLabel(styled.rem`
      display: flex;
      width: 100%;
      height: calc(100% - 50px);
      position: absolute;
      z-index: 10;
    `)
  },

  librarySideWrapper() {
    return setLabel(styled.rem`
      height: 100%;
      width: 240px;
      //border-right: 1px solid #6d798b;
      box-shadow: 1px 0 0 rgba(0, 0, 0, 0.3);
      z-index: 2;
      background: #ffffff;
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

  mainHeader() {
    return setLabel(styled.rem`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 52px;
      margin-top: 30px;
      padding: 0 55px;
    `)
  },

  mainTitle() {
    return setLabel(styled.rem`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `)
  },

  titleTextHome() {
    return setLabel(styled.rem`
      font-size: 18px;
      font-weight: 600;
      color: #586274;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        color: #1b273d;
      }
    `)
  },

  breadCrumbIcon() {
    return setLabel(styled.rem`
      fill: #586274;
      transform: rotate(180deg);
      margin: 0 10px;
      height: 12px;
    `)
  },

  titleTextCurrent() {
    return setLabel(styled.rem`
      font-size: 18px;
      font-weight: 600;
      color: #1b273d;
    `)
  },

  filterWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      padding: 0 40px 0 55px;
    `)
  },

  cardWrapper() {
    return setLabel(styled.rem`
      width: 100%;
      height: calc(100% - 168px);
      display: flex;
      overflow: scroll;
      flex-wrap: wrap;
      padding: 10px 0;
    `)
  },

  cardWrapperCollection() {
    return setLabel(styled.rem`
      margin: 0 45px;

      &:focus {
        outline: none;
      }
    `)
  },

  spinner() {
    return setLabel(styled.rem`
      position: absolute;
      top: calc(50% - 40px);
      left: calc(50% - 40px);
    `)
  },
})
