import styled, { setLabel } from 'utils/styled'

export default props => ({
  icon(checked, disabled) {
    return setLabel(styled.rem`
      display: block;
      width: 12px;
      height: 12px;
      position: relative;
      background-color: ${checked ? '#407ae2' : 'transparent'};
      border: ${checked ? 'none' : '1px solid black'};
      margin: 0 6px;
      border-radius: 2px;
      font-weight: bold;
      color: white;
      opacity: ${disabled ? 0.4 : 1};

      &:after {
        content: ${checked ? "'✓'" : ''};
        font-size: 12px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.1);
      }

      &:focus {
        outline: #407ae2 solid 1px;
        border-radius: 0;
      }
    `)
  },
})
