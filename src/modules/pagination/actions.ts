import {IPayloadAction, payloadActionCreator} from "../actions";

export interface INextPagePaginationAction {
  page: number;
  maxPages: number;
}

export type PaginationTypes = IPayloadAction<number> | IPayloadAction<INextPagePaginationAction>;
export const PAGINATION_NEXT_PAGE: string = "@PAGINATION/PAGINATION_NEXT_PAGE";
export const onPaginationNextPage: (payload: INextPagePaginationAction) => IPayloadAction<INextPagePaginationAction> =
  payloadActionCreator<INextPagePaginationAction>(PAGINATION_NEXT_PAGE);

export const PAGINATION_PREV_PAGE: string = "@PAGINATION/PAGINATION_PREV_PAGE";
export const onPaginationPrevPage: (page: number) => IPayloadAction<number> =
  payloadActionCreator<number>(PAGINATION_PREV_PAGE);

export const PAGINATION_CHANGE_PAGE: string = "@PAGINATION/PAGINATION_CHANGE_PAGE";
export const onPaginationChangePage: (page: number) => IPayloadAction<number> =
  payloadActionCreator<number>(PAGINATION_CHANGE_PAGE);

export const PAGINATION_CHANGE_PER_PAGE: string = "@PAGINATION/PAGINATION_CHANGE_PER_PAGE";
export const onPaginationChangePerPage: (newPerPage: number) => IPayloadAction<number> =
  payloadActionCreator<number>(PAGINATION_CHANGE_PER_PAGE);
