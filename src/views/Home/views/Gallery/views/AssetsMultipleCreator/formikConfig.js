import * as Yup from 'yup'

export default (props, dispatch) => {
  return {
    initialValues: {
      assetProgram: '',
      campaignStartDate: '',
      campaignEndDate: '',
      campaignName: '',
      campaignDescription: '',
      uploadingFiles: [],
      newNoAccessCampaignList: [],
    },

    validationSchema: Yup.lazy(values => {
      // 檢查新創建的 campaign 是否因為沒有權限才沒有出現在選單
      // 如果是的話就顯示 error message
      const checkIsCampaignExistByNoAccess = () => {
        const { assetProgram, campaignName, newNoAccessCampaignList } = values

        const existCampaign = find(
          newNoAccessCampaignList.filter(item => item.name === assetProgram),
          program => find(program.campaignList, { campaignName: campaignName }),
        )

        return !existCampaign
      }

      return Yup.object().shape({
        assetProgram: Yup.string().required('Please select a program'),

        campaignStartDate: Yup.string().required('Please select a campaign start date'),

        campaignEndDate: Yup.string().required('Please select a campaign end date'),

        campaignName: Yup.string()
          .required('Please enter the campaign name')
          .min(10, 'Campaign Name should contain at least 10 characters')
          .test(
            'hasNoAccess',
            `You don't have access to this campaign, please contact admin@atom.international for any concerns.`,
            checkIsCampaignExistByNoAccess,
          ),

        campaignDescription: Yup.string()
          .required('Please enter the campaign description')
          .min(10, 'Campaign Description should be at least 10 characters'),
        uploadingFiles: Yup.array().required('Please select at least one file'),
      })
    }),

    onSubmit(data) {},
  }
}
