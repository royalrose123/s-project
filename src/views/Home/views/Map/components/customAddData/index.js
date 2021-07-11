/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { LoadDataModalFactory, withState } from 'kepler.gl/components'
import keyMirror from 'keymirror'

import { loadRemoteMap } from '../load-data-modal/actions'
import LoadRemote from './LoadRemote'
import UploadFile from './UploadFile'

export const LOADING_METHODS = keyMirror({
  remote: null,
})

const additionalMethods = {
  database: {
    id: LOADING_METHODS.remote,
    label: 'Load Data',
    elementType: LoadRemote,
  },
}

const CustomAddData = props => (props.currentTab === 'loadRemote' ? <LoadRemote {...props} /> : <UploadFile {...props} />)

CustomAddData.propTypes = {
  currentTab: PropTypes.string,
}

export const CustomAddDataFactory = (...deps) => {
  const LoadDataModal = LoadDataModalFactory(...deps)

  const defaultLoadingMethods = LoadDataModal.defaultProps.loadingMethods
  // The following adds the method to the factory
  CustomAddData.defaultProps = {
    ...LoadDataModal.defaultProps,
    loadingMethods: [additionalMethods.database, defaultLoadingMethods.find(lm => lm.id === 'upload')],
  }

  return withState([], state => ({ ...state.keplerGl.app, ...state.keplerGl.map1.uiState }), {
    handleLoadRemoteMap: loadRemoteMap,
  })(CustomAddData)
}

CustomAddDataFactory.deps = LoadDataModalFactory.deps

export function replaceAddData() {
  return [LoadDataModalFactory, CustomAddDataFactory]
}
