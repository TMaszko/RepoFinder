import styled from "styled-components";

export default styled.div`
  table {
    font-family: Helvetica;
    border-collapse: collapse;

    th, td {
      min-width: 150px;
    }

    .active-row {
      background-color: black;
      color: white;
    }

    .header-cell {
      padding: 6px 13px;
      border: 1px solid #dfe2e5;
      text-align: center;

      .header-wrapper {
        display: flex;
        height: 100%;
        justify-content: space-between;
        align-items: center;
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
