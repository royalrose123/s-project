export function getCurrentTime() {
  const currentHours = new Date().getHours()
  const currentMinutes = new Date().getMinutes()

  return `${currentHours}:${currentMinutes}`
}
