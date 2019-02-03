import {Reducer} from "redux";

import {FETCHED_SEARCH_RESULT_SUCCESS} from "../search/actions";
import {IPaginationState} from "../states";
import {
  INextPagePaginationAction,
  PAGINATION_CHANGE_PAGE,
  PAGINATION_CHANGE_PER_PAGE,
  PAGINATION_NEXT_PAGE,
  PAGINATION_PREV_PAGE,
  PaginationTypes,
} from "./actions";

const DEFAULT_PER_PAGE: number = 5;

export const paginationReducer: Reducer<IPaginationState, PaginationTypes> = (
  state: IPaginationState = { currentPage: 0, perPage: DEFAULT_PER_PAGE },
  action: PaginationTypes,
) => {
  const { type, payload } = action;

  switch (type) {

    case PAGINATION_NEXT_PAGE: {
      const { page, maxPages } = payload as INextPagePaginationAction;
      return {
        ...state,
        currentPage: Math.min((page + 1), maxPages - 1),
      };
    }

    case PAGINATION_PREV_PAGE: {
      return {
        ...state,
        currentPage: Math.max(0, (payload as number) - 1),
      };
    }

    case PAGINATION_CHANGE_PAGE: {
      return {
        ...state,
        currentPage: payload as number,
      };
    }

    case FETCHED_SEARCH_RESULT_SUCCESS: {
      return {
        ...state,
        currentPage: 0,
      };
    }

    case PAGINATION_CHANGE_PER_PAGE: {
      return {
        ...state,
        currentPage: 0,
        perPage: payload as number,
      };
    }

    default: {
      return state;
    }
  }
};

export const rootReducer: Reducer<IPaginationState, PaginationTypes> = paginationReducer;
