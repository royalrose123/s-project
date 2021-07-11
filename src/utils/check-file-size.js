import { BigNumber } from 'bignumber.js'

const BYTES = 1024

export const getUnitSize = {
  KB: number => number * BYTES,
  MB: number => number * BYTES * BYTES,
  GB: number => number * BYTES * BYTES * BYTES,
}

export const checkAllFilesIsOverSize = (files, maxSize) =>
  BigNumber.sum.apply(
    null,
    files.map(file => file.size),
  ) > maxSize

export const checkFileIsOverSize = (file, maxSize) => file.size > maxSize
