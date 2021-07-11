import { useState, useEffect } from 'react'

import { format } from 'date-fns'
import { isEmpty, find } from 'lodash'

function useCampaignNameState({ values, setFieldValue, isViewMode = false, programCampaignList, campaignOptions }) {
  const [isAddNew, setIsAddNew] = useState(false)

  const [currentOptions, setCurrentOptions] = useState([])
  const [noAccessCampaignList, setNoAccessCampaignList] = useState([])
  const [currentCampaignList, setCurrentCampaignList] = useState([])

  const { assetProgram } = values

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
      setFieldValue('newNoAccessCampaignList', newNoAccessCampaignList)
    }
  }, [campaignOptions, programCampaignList, setFieldValue])

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
        setFieldValue('campaignDescription', option.campaignDescription)
        setFieldValue('campaignStartDate', option.startDate)
        setFieldValue('campaignEndDate', option.endDate)
        setFieldValue('startDate', option.startDate)
        setFieldValue('endDate', option.endDate)
        setIsAddNew(false)
      },

      onCreateOption(option) {
        setFieldValue('campaignDescription', '')
        setFieldValue('campaignStartDate', '')
        setFieldValue('campaignEndDate', '')
        setFieldValue('startDate', '')
        setFieldValue('endDate', '')
        setIsAddNew(true)
      },

      isDisabled: !values.assetProgram || isViewMode,
    },

    clearCampain() {
      setFieldValue('campaignName', '')
      setFieldValue('campaignDescription', '')
      setFieldValue('campaignStartDate', '')
      setFieldValue('campaignEndDate', '')
      setFieldValue('startDate', '')
      setFieldValue('endDate', '')
    },

    isAddNew,
    campaignList: currentCampaignList[0]?.campaignList,
    noAccessCampaignList,
  }
}

export default useCampaignNameState
