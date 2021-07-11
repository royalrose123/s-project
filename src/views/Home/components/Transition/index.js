import React from 'react'
import { TransitionGroup as ReactTransitionGroup, Transition as ReactTransition } from 'react-transition-group'
import PropTypes from 'prop-types'

const STATUS = {
  ENTERING: 'entering',
  ENTERED: 'entered',
  EXITING: 'exiting',
}

const TIMEOUT = 300

export const propTypes = {
  children: PropTypes.node,
  location: PropTypes.string,
  hasTransition: PropTypes.bool,
}

function Transition(props) {
  const { children, location, hasTransition = true } = props

  if (!hasTransition) return children

  return (
    <ReactTransitionGroup style={{ position: 'relative', width: '100%', flexGrow: 1 }}>
      <ReactTransition key={location} timeout={{ enter: TIMEOUT, exit: TIMEOUT }}>
        {status => (
          <div
            style={{
              height: '100%',
              position: status === STATUS.ENTERING ? 'absolute' : 'relative',
              opacity: status === STATUS.ENTERED ? 1 : 0,
              transition: status === STATUS.ENTERING ? 'initial' : `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
              transform: status === STATUS.ENTERING ? 'translateY(50px)' : status === STATUS.ENTERED ? 'translateY(0px)' : 'translateY(50px)',
              // overflow: 'scroll',
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </ReactTransitionGroup>
  )
}

Transition.propTypes = propTypes

export default Transition
