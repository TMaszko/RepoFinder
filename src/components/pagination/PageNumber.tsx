import styled from "styled-components";

interface IProps {
  isActive?: boolean;
}

export default styled.span<IProps>`
  display: flex;
  padding: 5px;
  color: ${props => props.isActive ? "blue" : "#463c3c"};
  border: 1px solid #eeeeee;
  min-width: 20px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0px 5px;

  &:active, &:hover{
    color: blue;
  };

`;
