export interface IAction {
  type: string;
}

export interface IPayloadAction<T> extends IAction {
  payload: T;
}

export const actionCreator: (type: string) => () => IAction = (type: string) => () => {
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
