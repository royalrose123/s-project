import styled, { setLabel } from 'utils/styled'

export default props => ({
  multipleAssetWrapper() {
    return setLabel(styled.rem`
      height: 100%;
      justify-content: initial;
      padding: 50px 72px;
    `)
  },

  form() {
    return setLabel(styled.rem`
      display: inherit;
      flex: inherit;
      flex-direction: inherit;
      width: inherit;
      height: auto;
      max-height: 650px;
    `)
  },

  multipleAssetForm(isCampaign) {
    // 為了讓 datepicker 不受 overflow: scroll 影響
    // mutilple asset table 的 datepicker 會掛載到 multipleAssetForm
    const datepickerPpopper = '& .datepicker-popper'

    return setLabel(styled.rem`
      display: inherit;
      flex: inherit;
      flex-direction: inherit;
      width: ${isCampaign ? 'fit-content' : 'inherit'};
      height: inherit;
      max-height: inherit;

      ${datepickerPpopper} {
        z-index: 30;
      }
    `)
  },
})
