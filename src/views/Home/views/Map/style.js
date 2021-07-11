import styled, { setLabel } from 'utils/styled'

export default props => ({
  mapWrapper() {
    const mapboxLogo =
      '& > div:nth-of-type(1) > div > div:nth-of-type(3) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(3) > div'
    return setLabel(styled.rem`
      width: 100%;
      height: 100%;

      ${mapboxLogo} {
        display: none !important;
      }
    `)
  },
})
