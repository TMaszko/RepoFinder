import styled from "styled-components";

interface IProps {
  top: boolean;
}

export default styled.div<IProps> `
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  ${props => "border-" + (props.top ? "bottom" : "top") + ": 5px solid black;"}
`;
