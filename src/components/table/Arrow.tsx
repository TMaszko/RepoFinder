import styled from "styled-components";

interface IProps {
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
  disabledSorting?: boolean;
}

export default styled.div<IProps> `
  width: 0;
  height: 0;
  ${props => (props.left || props.right) && `
    border-bottom: 8px solid transparent;
    border-top: 8px solid transparent;
  `}
  ${props => (props.top || props.bottom) && `
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  `}
  ${props => props.top && `
    border-top: 8xp solid transparent;
    border-bottom: 8px solid black;
  `}
  ${props => props.bottom && `
    border-bottom: 8px solid transparent;
    border-top: 8px solid black;
  `}
  ${props => props.right && `
    border-right: 8px solid transparent;
    border-left: 8px solid black;
  `}
  ${props => props.left && `
    border-left: 8px solid transparent;
    border-right: 8px solid black;
    `
  }
  opacity: ${props => props.disabledSorting ? 0.4 : 1};
  ${props => (props.top || props.bottom) && `
    &:first-child {
      margin-bottom: 4px;
    }`
  }
`;
