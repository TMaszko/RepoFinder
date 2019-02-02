import {ISortBySettings} from "../../components/table/Table";
import {IPayloadAction, payloadActionCreator} from "../actions";

export const TABLE_SORTING_DIR_CHANGED: string = "@TABLE/TABLE_SORTING_DIR_CHANGED";
export const onTableSortingDirChanged: (column: ISortBySettings) => IPayloadAction<ISortBySettings> =
  payloadActionCreator<ISortBySettings>(TABLE_SORTING_DIR_CHANGED);
