import { combineReducers } from '../helpers/combineReducers'
import auth from './auth'
import user from './user'
import assetUpload from './assetUpload'
import theme from './theme'

export default combineReducers({
  auth,
  user,
  assetUpload,
  theme,
})
