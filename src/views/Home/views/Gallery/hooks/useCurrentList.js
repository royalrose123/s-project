import { useState, useEffect, useRef } from 'react'

export function useCurrenList(isAssetsLoaded, hasAssets) {
  const [currentListNode, setCurrentListNode] = useState('')

  const isFirstRef = useRef(true)

  // didMount 完才 setCurrentList，不然會得到 null
  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false
    } else {
      if ((isAssetsLoaded, hasAssets)) {
        const newListNode = document.getElementById('assets-list')

        if (!newListNode) return

        newListNode.children[0].style.position = 'relative'

        setCurrentListNode(newListNode.children[0])
      }
    }
  }, [hasAssets, isAssetsLoaded])

  return { currentListNode }
}
