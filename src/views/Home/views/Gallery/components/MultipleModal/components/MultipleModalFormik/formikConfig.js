import * as Yup from 'yup'
import { ACTION_TYPES } from '../../../../constants/actionTypes'

export default (props, history) => {
  const { setIsMultipleModalOpen, setMultipleModalInfo, setShowActionFooter, isMultipleMove, setIsMultipleAssetsShown } = props

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({}),

    initialValues: {
      assetProgram: '',
      campaignDescription: '',
      campaignEndDate: '',
      campaignName: '',
      campaignStartDate: '',
      endDate: '',
      newNoAccessCampaignList: [],
      startDate: '',
    },

    onSubmit(data) {
      if (isMultipleMove) {
        // multiple move
        setMultipleModalInfo(data)
        setIsMultipleModalOpen(false)
        setIsMultipleAssetsShown(true)
        history.push('/home/gallery/moveMultipleAssets')
      } else {
        // multiple edit
        setMultipleModalInfo(data)
        setIsMultipleModalOpen(false)
        setShowActionFooter(ACTION_TYPES.EDIT)
      }
    },
  }
}
