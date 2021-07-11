import { useState, useEffect } from 'react'

import { format } from 'date-fns'
import { isEmpty, find } from 'lodash'

function useCampaignNameState({ assetProgram, setValue, isViewMode = false, programCampaignList, campaignOptions, register }) {
  const [isAddNew, setIsAddNew] = useState(false)

  const [currentOptions, setCurrentOptions] = useState([])
  const [noAccessCampaignList, setNoAccessCampaignList] = useState([])
  const [currentCampaignList, setCurrentCampaignList] = useState([])

  // const { assetProgram } = values

  useEffect(() => {
    register('campaignName')
    register('campaignDescription')
    register('campaignStartDate')
    register('campaignEndDate')
    register('newNoAccessCampaignList')
  }, [register])

  // programCampaignList API 為所有 program 的 campaign 列表並包含是否有權限
  // campaignOptions API 為該 role 有權限的 campaign description
  // 拿到兩支 API 後由前端組起來並把沒有權限的 campaign setFieldValue
  useEffect(() => {
    if (!isEmpty(programCampaignList) && !isEmpty(campaignOptions)) {
      const newOptions = programCampaignList.map(item => {
        return {
          ...item,
          campaignList: item.campaignList.map(campaign => {
            const campaignWithDescription = find(campaignOptions, { programName: item.name, campaignName: campaign.campaignName })

            return { ...campaign, ...campaignWithDescription }
          }),
        }
      })

      const newNoAccessCampaignList = newOptions
        .filter(item => !isEmpty(item.campaignList))
        .map(item => {
          return {
            ...item,
            campaignList: item.campaignList.filter(campaign => !campaign.hasPermission),
          }
        })
        .filter(item => !isEmpty(item.campaignList))

      setCurrentOptions(newOptions)
      setNoAccessCampaignList(newNoAccessCampaignList)
      setValue('newNoAccessCampaignList', newNoAccessCampaignList)
    }
  }, [campaignOptions, programCampaignList, setValue])

  // 將 programCampaignList 跟 campaignOptions 組成 currentOptions 後
  // 把內容成 react-select 格式並 setCurrentCampaignList
  useEffect(() => {
    if (!isEmpty(currentOptions)) {
      const newCampaignList = currentOptions
        .filter(item => item.name === assetProgram)
        .map(item => {
          return {
            ...item,
            campaignList: item.campaignList
              .filter(campaign => campaign.hasPermission)
              .map(({ campaignName, campaignDescription, startDate, endDate }) => ({
                value: campaignName,
                label: campaignName,
                campaignDescription,
                startDate: format(new Date(Number(startDate)), 'dd/MM/yyyy'),
                endDate: format(new Date(Number(endDate)), 'dd/MM/yyyy'),
              })),
          }
        })

      setCurrentCampaignList(newCampaignList)
    }
  }, [assetProgram, currentOptions])

  return {
    campainNameSelectProps: {
      onChange(option) {
        setValue('campaignDescription', option.campaignDescription)
        setValue('campaignStartDate', option.startDate)
        setValue('campaignEndDate', option.endDate)
        setIsAddNew(false)
      },

      onCreateOption(option) {
        setValue('campaignDescription', '')
        setValue('campaignStartDate', '')
        setValue('campaignEndDate', '')
        setIsAddNew(true)
      },

      isDisabled: !assetProgram || isViewMode,
    },

    clearCampain() {
      setValue('campaignName', '')
      setValue('campaignDescription', '')
      setValue('campaignStartDate', '')
      setValue('campaignEndDate', '')
    },

    isAddNew,
    campaignList: currentCampaignList[0]?.campaignList,
    noAccessCampaignList,
  }
}

export default useCampaignNameState
