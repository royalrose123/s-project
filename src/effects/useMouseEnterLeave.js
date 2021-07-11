import { useEffect } from 'react'
import { fromEvent } from 'rxjs'

function useMouseEnterLeave(targetRef, handleEvent) {
  useEffect(() => {
    let mouseEnterSubscription
    if (targetRef.current) {
      mouseEnterSubscription = fromEvent(targetRef.current, 'mouseenter').subscribe(() => handleEvent(true))
    }

    return () => {
      if (mouseEnterSubscription) {
        mouseEnterSubscription.unsubscribe()
      }
    }
  }, [handleEvent, targetRef])

  useEffect(() => {
    let mouseLeaveSubscription
    if (targetRef.current) {
      mouseLeaveSubscription = fromEvent(targetRef.current, 'mouseleave').subscribe(() => handleEvent(false))
    }

    return () => {
      if (mouseLeaveSubscription) {
        mouseLeaveSubscription.unsubscribe()
      }
    }
  }, [handleEvent, targetRef])
}

export default useMouseEnterLeave
