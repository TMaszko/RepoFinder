import styled from "styled-components";

export default styled.div`
  table {
    font-family: Helvetica;
    border-collapse: collapse;

    .header-cell {
      padding: 6px 13px;
      border: 1px solid #dfe2e5;
      text-align: center;

      &:first-child {
        text-align: right;
      }
    }

    .body-cell {
      border: 1px solid #dfe2e5;
      text-align: center;

      &:nth-child(4) {
         text-align: right;
      }
    }
  }
`;
