import { PanelHeaderFactory } from 'kepler.gl/dist/components'
import KeplerGlLogo from './logo/logo'

// Custom Panel Header renders default panel header, changing its default props
// to avoid rendering any action items on the top right

export function CustomPanelHeaderFactory() {
  const PanelHeader = PanelHeaderFactory()

  // appName: 'Ptolomy Testing', //PropTypes.string,
  // appWebsite: 'atom.international',
  // version: 'Testversion',
  // visibleDropdown: PropTypes.string,
  // logoComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  // actionItems: PropTypes.arrayOf(PropTypes.any),
  // onExportImage: PropTypes.func,
  // onExportData: PropTypes.func,
  // onExportConfig: PropTypes.func,
  // onExportMap: PropTypes.func,
  // onSaveToStorage: PropTypes.func,
  // onSaveAsToStorage: PropTypes.func,
  // onSaveMap: PropTypes.func,
  // onShareMap: PropTypes.func

  PanelHeader.defaultProps = {
    ...PanelHeader.defaultProps,
    actionItems: [],
  }

  PanelHeader.defaultProps.logoComponent = KeplerGlLogo

  return PanelHeader
}

export default CustomPanelHeaderFactory //
