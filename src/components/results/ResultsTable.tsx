import * as React from "react";
import {connect} from "react-redux";

import {zip} from "../../modules/arrays";
import {ISearchRepoResult} from "../../modules/search/ISearchRepoResult";
import {IMainState} from "../../modules/states";
import {SortDirs} from "../../modules/table/SortDirs";
import {IColumn, IRow, Table} from "../table/Table";

interface IStateProps {
  results: ISearchRepoResult[];
}

interface IProps extends IStateProps {
}

const columnKeys: string[] = ["id", "title", "owner", "stars", "createdAt"];

const columnsHeaders: string[] = ["ID", "Repo Title", "Owner", "Stars", "Created at"];

const zippedColumns: IColumn[] = zip<string, string, IColumn>(columnKeys, columnsHeaders, (key, header) => {
  return {
    columnKey: key,
    header,
  };
});

const mapResultsToRows: (results: ISearchRepoResult[]) => IRow[] = (results: ISearchRepoResult[]): IRow[] => {
  return results.map(repo => {
    return {
      id: repo.id,
      data: columnKeys.map(column => {
        return {
          value: repo[column],
        };
      }),
    };
  });
};

class ResultsTableComponent extends React.Component<IProps, {}> {

  public render(): JSX.Element {

    return (
      <Table
        sortBy={[
          {
            columnKey: "id",
            sortDir: SortDirs.DESC,
          },
        ]}
        columnsHeaders={zippedColumns}
        rows={mapResultsToRows(this.props.results)}
      />
    );
  }
}

export const ResultsTable: React.ComponentClass<{}> = connect<IStateProps, {}, {}, IMainState>(
  (state: IMainState): IStateProps => {
    return {
      results: state.search.results,
    };
  },
)(ResultsTableComponent);
