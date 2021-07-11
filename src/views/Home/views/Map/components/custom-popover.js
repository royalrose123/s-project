// mapPopoverFactory.js
import { MapPopoverFactory, LayerHoverInfoFactory, CoordinateInfoFactory, withState } from 'kepler.gl/dist/components'
import CustomMapPopover from './map-popover'
import { visStateLens } from 'kepler.gl/dist/reducers'
import { reversegeocode } from './load-data-modal/actions'

const LayerHoverInfo = LayerHoverInfoFactory()
const CoordinateInfo = CoordinateInfoFactory()

export const CustomMapPopoverFactory = () =>
  withState([visStateLens], state => ({ ...state }), { onreverseGeocode: reversegeocode })(CustomMapPopover(LayerHoverInfo, CoordinateInfo))

CustomMapPopoverFactory.deps = [LayerHoverInfoFactory, CoordinateInfoFactory]

export function replaceMapPopover() {
  return [MapPopoverFactory, CustomMapPopoverFactory]
}
