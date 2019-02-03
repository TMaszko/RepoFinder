import {Reducer} from "redux";

import {ISearchState} from "../states";
import {FETCHED_SEARCH_RESULT_SUCCESS, SEARCH_VALUE_CHANGED, SearchTypes} from "./actions";
import {ISearchRepoResult} from "./ISearchRepoResult";

const searchReducer: Reducer<ISearchState, SearchTypes> = (
  state: ISearchState = { inputValue: "", results: [] },
  action: SearchTypes,
): ISearchState => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_VALUE_CHANGED: {
      return {
        ...state,
        inputValue: payload as string,
      };
    }

    case FETCHED_SEARCH_RESULT_SUCCESS: {
      return {
        ...state,
        results: payload as ISearchRepoResult[],
      };
    }

    default: {
      return state;
    }
  }
};

export const rootReducer: Reducer<ISearchState, SearchTypes> = searchReducer;
