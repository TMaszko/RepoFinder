import * as React from "react";

import {SortDirs} from "../../modules/table/SortDirs";
import Arrow from "./Arrow";
import TableWrapper from "./TableWrapper";

export interface IRow {
  data: { value: string | number | boolean | Date }[];
  id: string;
}

export interface IColumn {
  columnKey: string;
  header: string;
}

export interface ISortBySettings {
  columnKey: string;
  sortDir: SortDirs;
}

interface IProps {
  columnsHeaders: IColumn[];
  rows: IRow[];
  sortBy: ISortBySettings[];
}

export class Table extends React.Component<IProps, {}> {

  public render(): JSX.Element {
    return (
      <TableWrapper>
        <table>
          <thead>
            {this.props.rows.length !== 0 && this.props.columnsHeaders.map(({ columnKey, header }) =>
              <th className="header-cell" key={columnKey}>
                <div className="header-wrapper">
                  {header}
                  {this.props.sortBy.find(el => el.columnKey === columnKey)
                    &&
                    <Arrow
                      top={SortDirs.ASC === (this.props.sortBy.find(el => el.columnKey === columnKey) as ISortBySettings).sortDir}
                    />
                  }
                </div>
              </th>,
            )}
          </thead>
          <tbody>
            {this.props.rows.map(({ data, id }) =>
              <tr className="row" key={id}>
                {data.map((el, i) =>
                  <td className="body-cell" key={i}>
                    {el.value}
                  </td>,
                )}
              </tr>,
            )}
          </tbody>
        </table>
      </TableWrapper>
    );
  }
}
