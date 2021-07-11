import { LoadDataModalFactory, withState } from 'kepler.gl/components'

import LoadRemoteMap from './load-remote-map'
import { loadRemoteMap, getcolours } from './actions'
import keyMirror from 'keymirror'

export const LOADING_METHODS = keyMirror({
  remote: null,
})

/// /The following sets up the name for each tab included
const additionalMethods = {
  database: {
    id: LOADING_METHODS.remote,
    label: 'Load From the Database',
    elementType: LoadRemoteMap,
  },
}

export const CustomLoadDataModalFactory = (...deps) => {
  const LoadDataModal = LoadDataModalFactory(...deps)
  const defaultLoadingMethods = LoadDataModal.defaultProps.loadingMethods

  // The following adds the method to the factory
  LoadDataModal.defaultProps = {
    ...LoadDataModal.defaultProps,
    loadingMethods: [additionalMethods.database, defaultLoadingMethods.find(lm => lm.id === 'upload')],
  }

  return withState([], state => ({ ...state.keplerGl.app, ...state.keplerGl.map1.uiState }), {
    handleLoadRemoteMap: loadRemoteMap,
    onGetColours: getcolours,
  })(LoadDataModal)
}

CustomLoadDataModalFactory.deps = LoadDataModalFactory.deps

export function replaceLoadDataModal() {
  return [LoadDataModalFactory, CustomLoadDataModalFactory]
}
