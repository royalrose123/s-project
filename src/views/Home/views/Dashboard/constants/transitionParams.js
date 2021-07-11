export const pageVariants = {
  initial: {
    opacity: 0,
    y: '10%',
    scale: 1,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: '10%',
    scale: 1,
  },
}

export const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.6,
}
