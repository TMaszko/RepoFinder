import {ActionsObservable, ofType, StateObservable} from "redux-observable";
import {Observable} from "rxjs";
import {ajax} from "rxjs/ajax";
import {debounceTime, filter, map, switchMap, tap, withLatestFrom} from "rxjs/operators";

import {IPayloadAction} from "../actions";
import {EpicActions} from "../epics";
import {dateFormatter} from "../formaters";
import {IMainState} from "../states";
import {
  FETCHED_SEARCH_RESULT_SUCCESS,
  onFetchedSearchResultSuccess,
  onSearchStateSaved,
  SEARCH_VALUE_CHANGED,
} from "./actions";
import {ISearchRepoResult} from "./ISearchRepoResult";

const API_URL: string = "https://api.github.com/search/repositories";
const MAX_ITEMS_PER_PAGE_API: number = 100;
const DEBOUNCE_TIME: number = 300;

interface ISearchRepoResultAPI {
  id: string;
  name: string;
  owner: { login: string };
  stargazers_count: number;
  created_at: string;
}

interface IResponse {
  items: ISearchRepoResultAPI[];
}

const mapToReposResult: (response: IResponse) => ISearchRepoResult[] = res =>
  res.items.map(repo => {
    return {
      id: repo.id,
      title: repo.name,
      owner: repo.owner.login,
      stars: repo.stargazers_count,
      createdAt: dateFormatter(new Date(repo.created_at)),
    };
  });

export const searchEpic: (action$: ActionsObservable<EpicActions>) => Observable<EpicActions> = action$ =>
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

export const saveEpic: (actions$: ActionsObservable<EpicActions>, state$: StateObservable<IMainState>) => Observable<EpicActions> =
  (action$, state$) =>
    action$.pipe(
      ofType<EpicActions, IPayloadAction<ISearchRepoResult[]>>(FETCHED_SEARCH_RESULT_SUCCESS),
      withLatestFrom(state$, (_, state) => state),
      tap(state => {
        const serializedState: string = JSON.stringify(state);
        window.localStorage.setItem("initialState", serializedState);
      }),
      map(onSearchStateSaved),
    );
