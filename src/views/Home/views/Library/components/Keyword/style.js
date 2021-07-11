import styled, { setLabel } from 'utils/styled'

export default props => ({
  itemWrapper() {
    return setLabel(styled.rem`
      //display: flex;
      //flex-direction: column;
      width: 240px;
      margin-right: 30px;
      border: 0.5px solid #586274;
      box-shadow: 3px 3px 6px #a6b9c8;
      border-radius: 4px;
      transition: 0.2s;
      background: #ffffff;
      flex-shrink: 0;

      &:hover {
        transform: scale(1.02);
      }
    `)
  },

  itemThumbnail(canView) {
    return setLabel(styled.rem`
      width: 100%;
      height: 140px;
      background: #e1e8ea;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      //margin: 15px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      transition: 0.5s;
      cursor: ${canView ? 'pointer' : 'not-allowed'};

      //&:hover {
      //  transform: scale(1.05);
      //}
    `)
  },

  itemTitle() {
    return setLabel(styled.rem`
      width: 100%;
      height: 34px;
      line-height: 17px;
      margin: 10px 0;
      font-size: 14px;
      font-weight: bold;
      color: #1b273d;
      padding: 0 15px;

      /* Multi-lines ellipsis style */
      /* Ref: https://stackoverflow.com/questions/33058004/applying-an-ellipsis-to-multiline-text */
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    `)
  },

  itemSubtitle() {
    return setLabel(styled.rem`
      width: 100%;
      height: 28px;
      line-height: 14px;
      margin: 10px 0;
      font-size: 12px;
      font-weight: normal;
      color: #979797;
      padding: 0 15px;

      /* Multi-lines ellipsis style */
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    `)
  },

  itemSourcesPlatform() {
    return setLabel(styled.rem`
      width: 100%;
      height: 16px;
      margin: 10px 0;
      font-size: 12px;
      font-weight: normal;
      color: #8c8c8c;
      padding: 0 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
    `)
  },

  tagWrapper() {
    return setLabel(styled.rem`
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      width: 100%;
      height: 50px;
      margin: 10px 0;
      padding: 0 15px;
    `)
  },

  tag() {
    return setLabel(styled.rem`
      display: flex;
      height: 20px;
      margin: 2px;
      padding: 0 5px;
      border: 1px solid #4ea7e8;
      border-radius: 4px;
    `)
  },

  tagText() {
    return setLabel(styled.rem`
      font-size: 12px;
      color: #4ea7e8;
      height: 20px;
      line-height: 20px;
    `)
  },
})
