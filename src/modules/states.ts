import {ISortBySettings} from "../components/table/Table";
import {ISearchRepoResult} from "./search/ISearchRepoResult";

export interface ISearchState {
  inputValue: string;
  results: ISearchRepoResult[];
}

export interface ITableState {
  sortBy: ISortBySettings[];
}

export interface IMainState {
  search: ISearchState;
  table: ITableState;
}
