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
