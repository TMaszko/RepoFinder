import {ISortBySettings} from "../components/table/Table";
import {ISearchRepoResult} from "./search/ISearchRepoResult";
import {IUser} from "./user/IUser";

export interface ISearchState {
  inputValue: string;
  results: ISearchRepoResult[];
}

export interface IUserState extends IUser {
  isAuth: boolean;
}

export interface IPaginationState {
  currentPage: number;
  perPage: number;
}

export interface ITableState {
  sortBy: ISortBySettings[];
}

export interface IMainState {
  search: ISearchState;
  table: ITableState;
  pagination: IPaginationState;
  user: IUserState;
}
