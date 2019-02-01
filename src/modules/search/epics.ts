import {ActionsObservable, ofType, StateObservable} from "redux-observable";
import {Observable} from "rxjs";
import {ajax} from "rxjs/ajax";
import {debounceTime, filter, map, switchMap} from "rxjs/operators";

import {IPayloadAction} from "../actions";
import {EpicActions} from "../epics";
import {IMainState} from "../states";
import {onFetchedSearchResultSuccess, SEARCH_VALUE_CHANGED} from "./actions";
import {ISearchRepoResult} from "./ISearchRepoResult";

const API_URL: string = "https://api.github.com/search/repositories";
const MAX_ITEMS_PER_PAGE_API: number = 100;
const DEBOUNCE_TIME: number = 300;

interface ISearchRepoResultAPI {
  id: string;
  name: string;
  owner: { login: string };
  stargazers_count: number;
  createdAt: Date;
}

interface IResponse {
  items: ISearchRepoResultAPI[];
}

const mapToReposResult: (response: IResponse) => ISearchRepoResult[] = res => {
  return res.items.map(repo => {
    return {
      id: repo.id,
      title: repo.name,
      owner: repo.owner.login,
      stars: repo.stargazers_count,
      createdAt: repo.createdAt,
    };
  });
};

export const searchEpic: (action$: ActionsObservable<EpicActions>, state$: StateObservable<IMainState>)
  => Observable<EpicActions> =
  action$ =>
    action$.pipe(
      ofType<EpicActions, IPayloadAction<string>>(SEARCH_VALUE_CHANGED),
      debounceTime(DEBOUNCE_TIME),
      filter(action => !!action.payload),
      switchMap(action =>
        ajax.getJSON(`${API_URL}?per_page=${MAX_ITEMS_PER_PAGE_API}&q=${action.payload}`).pipe(
          map(response => onFetchedSearchResultSuccess(mapToReposResult(response as IResponse)),
          ),
        ),
      ),
    );
