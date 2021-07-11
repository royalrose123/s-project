import styled, { setLabel } from 'utils/styled'

export default props => {
  const { hasHeader } = props

  return {
    overPage(isMultipleUpload, isCustomFooter) {
      const header = `${hasHeader ? '& > div:first-of-type' : 'none'}`
      const wrapper = '& > div > div'
      const body = `${hasHeader ? '& > div:nth-of-type(2)' : '& > div:nth-of-type(1)'}`
      const bodyContent = `${hasHeader ? '& > div:nth-of-type(2) > div' : '& > div:nth-of-type(1) > div`'}`
      const footer = `${hasHeader ? '& > div:nth-of-type(3)' : '& > div:nth-of-type(2)'}`
      const footerButtonWrapper = `${hasHeader ? '& > div:nth-of-type(3) > div' : '& > div:nth-of-type(2) > div'}`

      return setLabel(styled.rem`
        ${header} {
          border-bottom: 1px solid #a7a7a7;
          margin-bottom: -1px;
          text-align: center;
          font-weight: bold;
        }

        ${body} {
          padding: 0;
          margin-bottom: ${isCustomFooter ? '65px' : '0px'};
        }

        ${wrapper} {
          height: ${isMultipleUpload ? '100%' : 'inherit'};
        }

        ${bodyContent} {
          display: flex;
          align-items: center;
        }

        ${footer} {
          display: flex;
          flex-direction: row;
          border-top: 1px solid #a7a7a7;
        }

        ${footerButtonWrapper} {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          width: ${isMultipleUpload ? '100%' : '958px'};
          margin: ${isMultipleUpload ? 'initial' : 'auto'};
        }
      `)
    },

    childrenWrapper() {
      return setLabel(styled.rem`
        width: 100%;
        padding: 35px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      `)
    },
  }
}
