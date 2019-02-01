import {ISearchRepoResult} from "./search/ISearchRepoResult";

export interface ISearchState {
  inputValue: string;
  results: ISearchRepoResult[];
}

export interface IMainState {
  search: ISearchState;
}
