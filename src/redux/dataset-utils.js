// Copyright (c) 2020 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * @author Ding 20200725
 * @description 此檔案是為了完成 匯入檔案筆數的限制，以及匯出須保留原始筆數的需求，
 * 檔案程式碼來自 kepler.gl 的 kepler.gl/dist/utils/dataset-utils.js，
 * 在說明修改方式之前，先簡述一下 kepler.gl 繪圖和匯出的原理：
 *  匯出檔案和繪製到地圖參考的 dataset 皆為 visState 的 dataset
 *    1. 繪圖可參考 addDataToMapUpdater function（來自 kepler.gl/dist/reducers/combined-update.js），
 *      很難追蹤出這支程式為繪圖程式，原因為開發團隊使用 observable pattern（推測），在新增檔案或抓取資料的功能完成之後，
 *      會有通知 addDataToMapUpdater 進行更新。
 *    2. 匯出檔案可參考 exportData function（來自 kepler.gl/dist/utils/export-utils.js)
 *
 * 因為匯出和繪圖參考同一個 state 因此不能直接對這 state 修改， 原始方法是新增一個 limitedDataset 在 visState，
 * 然後匯出檔案邏輯不變，而繪圖邏輯則參考新增的 limitedDataset，但修改幅度很大，且不好交接，因此作罷；
 * 後來觀察到 kepler.gl 帶有 filterIndex 的功能，僅會對繪圖產生影響，因此變相思考，轉而在 filterIndex 做數量限制，
 * 詳情可參考下面的 createNewDataEntry 的 return 部分
 *
 * @summary 欲修改數量上限，請參考 line 121 122 的 slice 部分
 */

import { hexToRgb } from 'kepler.gl/dist/utils/color-utils'
import uniq from 'lodash.uniq'
import { TRIP_POINT_FIELDS, SORT_ORDER } from 'kepler.gl/dist/constants/default-settings'
import { generateHashId } from 'kepler.gl/dist/utils/utils'
import { validateInputData } from 'kepler.gl/dist/processors/data-processor'
import { getGpuFilterProps } from 'kepler.gl/dist/utils/gpu-filter-utils'
import { ascending, descending } from 'd3-array'

// Constants
import { limitCount } from 'constants/map'

// apply a color for each dataset
// to use as label colors
const datasetColors = ['#8F2FBF', '#005CFF', '#C06C84', '#F8B195', '#547A82', '#3EACA8', '#A2D4AB'].map(hexToRgb)

/**
 * Random color generator
 * @return {Generator<import('reducers/types').RGBColor>}
 */
function* generateColor() {
  let index = 0
  while (index < datasetColors.length + 1) {
    if (index === datasetColors.length) {
      index = 0
    }
    yield datasetColors[index++]
  }
}

export const datasetColorMaker = generateColor()

/** @type {typeof import('./dataset-utils').getNewDatasetColor} */
function getNewDatasetColor(datasets) {
  const presetColors = datasetColors.map(String)
  const usedColors = uniq(Object.values(datasets).map(d => String(d.color))).filter(c => presetColors.includes(c))

  if (usedColors.length === presetColors.length) {
    // if we already depleted the pool of color
    return datasetColorMaker.next().value
  }

  let color = datasetColorMaker.next().value
  while (usedColors.includes(String(color))) {
    color = datasetColorMaker.next().value
  }

  return color
}

/**
 * Take datasets payload from addDataToMap, create datasets entry save to visState
 * @type {typeof import('./dataset-utils').createNewDataEntry}
 */
export function createNewDataEntry({ info, data }, datasets = {}) {
  const validatedData = validateInputData(data)
  if (!validatedData) {
    return {}
  }

  const allData = validatedData.rows
  const datasetInfo = {
    id: generateHashId(4),
    label: 'new dataset',
    ...(info || {}),
  }
  const dataId = datasetInfo.id

  // add tableFieldIndex and id to fields
  // TODO: don't need id and name and tableFieldIndex anymore
  // Add value accessor instead
  const fields = validatedData.fields.map((f, i) => ({
    ...f,
    id: f.name,
    tableFieldIndex: i + 1,
  }))

  const allIndexes = allData.map((_, i) => i)

  return {
    [dataId]: {
      ...datasetInfo,
      color: datasetInfo.color || getNewDatasetColor(datasets),
      id: dataId,
      allData,
      allIndexes,
      filteredIndex: allIndexes.slice(0, limitCount),
      filteredIndexForDomain: allIndexes.slice(0, limitCount),
      fieldPairs: findPointFieldPairs(fields),
      fields,
      gpuFilter: getGpuFilterProps([], dataId, fields),
    },
  }
}

export function removeSuffixAndDelimiters(layerName, suffix) {
  return layerName
    .replace(new RegExp(suffix, 'ig'), '')
    .replace(/[_,.]+/g, ' ')
    .trim()
}

/**
 * Find point fields pairs from fields
 *
 * @param fields
 * @returns found point fields
 * @type {typeof import('./dataset-utils').findPointFieldPairs}
 */
export function findPointFieldPairs(fields) {
  const allNames = fields.map(f => f.name.toLowerCase())

  // get list of all fields with matching suffixes
  return allNames.reduce((carry, fieldName, idx) => {
    // This search for pairs will early exit if found.
    for (const suffixPair of TRIP_POINT_FIELDS) {
      // match first suffix```
      if (fieldName.endsWith(suffixPair[0])) {
        // match second suffix
        // eslint-disable-next-line no-useless-escape
        const otherPattern = new RegExp(`${suffixPair[0]}\$`)
        const partner = fieldName.replace(otherPattern, suffixPair[1])

        const partnerIdx = allNames.findIndex(d => d === partner)
        if (partnerIdx > -1) {
          const defaultName = removeSuffixAndDelimiters(fieldName, suffixPair[0])

          carry.push({
            defaultName,
            pair: {
              lat: {
                fieldIdx: idx,
                value: fields[idx].name,
              },
              lng: {
                fieldIdx: partnerIdx,
                value: fields[partnerIdx].name,
              },
            },
            suffix: suffixPair,
          })
          return carry
        }
      }
    }
    return carry
  }, [])
}

/**
 *
 * @param dataset
 * @param column
 * @param mode
 * @type {typeof import('./dataset-utils').sortDatasetByColumn}
 */
export function sortDatasetByColumn(dataset, column, mode) {
  const { allIndexes, fields, allData } = dataset
  const fieldIndex = fields.findIndex(f => f.name === column)
  if (fieldIndex < 0) {
    return dataset
  }

  const sortBy = SORT_ORDER[mode] || SORT_ORDER.ASCENDING

  if (sortBy === SORT_ORDER.UNSORT) {
    return {
      ...dataset,
      sortColumn: {},
      sortOrder: null,
    }
  }

  const sortFunction = sortBy === SORT_ORDER.ASCENDING ? ascending : descending
  const sortOrder = allIndexes.slice().sort((a, b) => sortFunction(allData[a][fieldIndex], allData[b][fieldIndex]))

  return {
    ...dataset,
    sortColumn: {
      [column]: sortBy,
    },
    sortOrder,
  }
}
