import { toaster } from 'evergreen-ui'

export function showToaster(result, successMessage) {
  if (!successMessage) return

  if (!result.isResponseError && successMessage) {
    toaster.success(successMessage, {
      duration: 3,
      id: successMessage,
    })
  } else {
    toaster.danger(result.detail, {
      duration: 3,
    })
  }
}
