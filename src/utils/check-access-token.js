import { isEmpty } from 'lodash'

export const checkAccessTokenExpired = () => {
  const oktaTokenStorage = JSON.parse(window.localStorage.getItem('okta-token-storage'))

  if (isEmpty(oktaTokenStorage)) return true

  // 如果 accessToken 過期，就清除 localStorage
  const oktaTokenExpiredTime = oktaTokenStorage?.accessToken?.expiresAt * 1000
  const currentTime = new Date().getTime()

  return oktaTokenExpiredTime <= currentTime
}
