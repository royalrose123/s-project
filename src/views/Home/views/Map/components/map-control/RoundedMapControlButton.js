import { MapControlButton } from 'kepler.gl/dist/components/common/styled-components'
import styled from 'styled-components'

const RoundedMapControlButton = styled(MapControlButton)`
  border-radius: 50%;
  background-color: ${props => (props.isActive ? '#fff' : '#586274')};
`
export default RoundedMapControlButton
