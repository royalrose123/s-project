import { MapControlFactory, withState } from 'kepler.gl/dist/components'
// import CustomMapControl from './map-control/map-control'
import CustomMapControl from './custom-map-control'

import { togglemodal, getpointsofinterest } from './load-data-modal/actions'

export const CustomMapControlFactory = () =>
  withState([], state => ({ ...state.keplerGl.map1 }), {
    onToggleModal: togglemodal,
    onGetPOI: getpointsofinterest,
  })(CustomMapControl)

export function replaceMapControl() {
  return [MapControlFactory, CustomMapControlFactory]
}
