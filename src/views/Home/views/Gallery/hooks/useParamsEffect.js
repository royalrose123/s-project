import { useState, useEffect } from 'react'

function useParamsEffect(match) {
  // 為了進入 assetForm 後回到 Gallery 能記住原本的 program 跟 campaign (因為進入 assetForm 會改變 match.url)
  // assetForm 包括 upload, edit, duplicate, view
  const { params } = match
  const { program, campaign } = params

  const [currentProgram, setCurrentProgram] = useState('All')
  const [currentCampaign, setCurrentCampaign] = useState('')

  useEffect(() => {
    if (program && !campaign) {
      setCurrentProgram(program)
      setCurrentCampaign(null)
    }
    if (program && campaign) {
      setCurrentProgram(program)
      setCurrentCampaign(campaign)
    }
  }, [campaign, program])

  return { currentProgram, currentCampaign }
}

export default useParamsEffect
