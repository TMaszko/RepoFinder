import * as React from "react";

export interface IRow {
  data: { value: string | number | boolean | Date }[];
  id: string;
}

export interface IColumn {
  keyName: string;
  header: string;
}

interface IProps {
  columnsHeaders: IColumn[];
  rows: IRow[];
}

export class Table extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    return (
      <table>
        <thead>
          {this.props.rows.length !== 0 && this.props.columnsHeaders.map(({ keyName, header }) =>
            <th key={keyName}>
              {header}
            </th>,
          )}
        </thead>
        <tbody>
          {this.props.rows.map(({ data, id }) =>
            <tr key={id}>
              {data.map((el, i) =>
                <td key={i}>
                  {el.value}
                </td>,
              )}
            </tr>,
          )}
        </tbody>
      </table>
    );
  }
}
