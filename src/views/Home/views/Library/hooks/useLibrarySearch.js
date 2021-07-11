import { createContext, useState, useContext } from 'react'
import { SORT_TYPE_TEXT } from '../constant'

export const LibrarySearchContext = createContext({})

export const useLibrarySearchContext = () => {
  return useContext(LibrarySearchContext)
}

const initialSearchParams = {
  tagValues: [],
  keyword: '',
  sort: SORT_TYPE_TEXT,
}

export default function useLibrarySearch() {
  const [searchParams, setSearchParams] = useState(initialSearchParams)

  // console.log('%c searchParams: ', 'background: lightgreen; font-size: 20px; color: #000;', searchParams)

  const updateSearchParams = params => {
    setSearchParams(params)
  }

  return { updateSearchParams, searchParams }
}
