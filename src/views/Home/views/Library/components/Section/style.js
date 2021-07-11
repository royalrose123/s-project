import styled, { setLabel } from 'utils/styled'

export default props => ({
  section() {
    return setLabel(styled.rem`
      height: auto;
      width: 100%;
      //overflow: scroll;
    `)
  },

  sectionHeader() {
    return setLabel(styled.rem`
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `)
  },

  titleWrapper() {
    return setLabel(styled.rem`
      display: flex;
      align-items: center;
      cursor: pointer;
      padding-right: 30px;
      transition: 0.5s;
      color: #1b273d;
      fill: #1b273d;

      &:hover {
        transform: translateX(15px);
        //color: #586274;
        //fill: #586274;
      }
    `)
  },

  enterIcon() {
    return setLabel(styled.rem`
      transform: rotate(180deg);
      //fill: #000000;
    `)
  },

  title() {
    return setLabel(styled.rem`
      margin: 15px;
      font-size: 24px;
      font-weight: bold;
      //color: #000000;
    `)
  },

  itemListWrapper() {
    return setLabel(styled.rem`
      display: flex;
      height: 384px;
      min-height: 250px;
      padding: 0;
      overflow: visible;
    `)
  },
})
