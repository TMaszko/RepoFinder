import {Action} from "redux";

export interface IPayloadAction<PayloadType> extends Action<string> {
  payload: PayloadType;
}

export const actionCreator: (type: string) => () => Action<string> = (type: string) => () => {
  return {
    type,
  };
};

export const payloadActionCreator: <PayloadType>(type: string) => (payload: PayloadType) => IPayloadAction<PayloadType> =
  <PayloadType>(type: string) => (payload: PayloadType): IPayloadAction<PayloadType> => {
    return {
      type,
      payload,
    };
  };

export const INIT_APP: string = "@INIT/INIT_APP";
export const onInitApp: () => Action<string> = actionCreator(INIT_APP);
