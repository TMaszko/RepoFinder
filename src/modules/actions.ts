import {Action} from "redux";

export interface IPayloadAction<T> extends Action<string> {
  payload: T;
}

export const actionCreator: (type: string) => () => Action<string> = (type: string) => () => {
  return {
    type,
  };
};

export const payloadActionCreator: <T>(type: string) => (payload: T) => IPayloadAction<T> =
  <T>(type: string) => (payload: T): IPayloadAction<T> => {
    return {
      type,
      payload,
    };
  };

export const INIT_APP: string = "@INIT/INIT_APP";
export const onInitApp: () => Action<string> = actionCreator(INIT_APP);
