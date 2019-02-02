import styled from "styled-components";

interface IProps {
  top?: boolean;
  disabledSorting?: boolean;
}

export default styled.div<IProps> `
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  opacity: ${props => props.disabledSorting ? 0.4 : 1};
  border-right: 8px solid transparent;
  ${props => "border-" + (props.top ? "bottom" : "top") + ": 8px solid black;"}

  &:first-child {
    margin-bottom: 4px;
  }
`;
