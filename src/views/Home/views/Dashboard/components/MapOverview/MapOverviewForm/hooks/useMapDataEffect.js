import { useState, useEffect } from 'react'
import worldJson from '../../../../../../../../data/countries(modified).geo.json'
import { find, isEmpty } from 'lodash'

export function useMapDataEffect(isProgramOptionsLoaded, isMapOverviewDataLoaded, selectedProgram, programOptionsByAPI, mapOverviewData) {
  const [mapData, setMapData] = useState({ type: 'FeatureCollection', features: [] })

  useEffect(() => {
    // 將 API 來的 mapOverviewData 處理成 mapbox 可以接受的格式
    if (isProgramOptionsLoaded && isMapOverviewDataLoaded) {
      const errorCountry = []

      // 因為 country list 規則跟 result page 一樣，所以會有國家是 unknown 的情況
      // TODO: 還在等 SA 確認對於 unknown 的資料要怎麼處理
      const newProgramData = mapOverviewData
        .filter(country => country.countryName !== 'Unknown')
        .map((country, index) => {
          const dataWithGeoJson = find(worldJson.features, item => {
            return item?.properties?.ISO_A2 === country.countryCode
          })

          // 如果後端的 countryCode 跟前端的 geojson 不符合就印出來，以利未來除錯
          if (!dataWithGeoJson) errorCountry.push(country.countryName)

          const newData = country.data.map(program => {
            return { ...program, ...find(selectedProgram, { label: program.programName }) }
          })

          // 如果某個 country 裡的 program 不只一個，就把該 country 視為 multi country
          // 如果是 multi country 給特定的 color and border
          // 如果不是 multi country 就給對應的 program 顏色
          if (country.data.length > 1) {
            return {
              id: index,
              countryCode: country.countryCode,
              countryName: country.countryName,
              geometry: dataWithGeoJson?.geometry,
              properties: {
                ...dataWithGeoJson?.properties,
                data: newData,
                program: 'multi',
              },
            }
          } else {
            return {
              id: index,
              countryCode: country.countryCode,
              countryName: country.countryName,
              geometry: dataWithGeoJson?.geometry,
              properties: {
                ...dataWithGeoJson?.properties,
                data: newData,
                program: country.data[0].programName,
                id: index,
              },
            }
          }
        })

      // 如果後端的 countryCode 跟前端的 geojson 不符合就印出來，以利未來除錯
      if (!isEmpty(errorCountry)) console.warn('errorCountry', errorCountry)

      const newMapData = { type: 'FeatureCollection', features: newProgramData }

      setMapData(newMapData)
    }
  }, [isMapOverviewDataLoaded, isProgramOptionsLoaded, mapOverviewData, selectedProgram])

  return { mapData, tempProgramList: programOptionsByAPI }
}
