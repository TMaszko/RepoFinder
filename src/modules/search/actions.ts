import {IPayloadAction, payloadActionCreator} from "../actions";

export const SEARCH_VALUE_CHANGED: string = "@SEARCH/SEARCH_VALUE_CHANGED";
export const onSearchValueChanged: (value: string) => IPayloadAction<string> = payloadActionCreator<string>(SEARCH_VALUE_CHANGED);
