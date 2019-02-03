import {Reducer} from "redux";

import {IPayloadAction} from "../actions";
import {IUserState} from "../states";
import {USER_AUTH_FAILED, USER_AUTH_SUCCESSFUL} from "./actions";
import {IUser} from "./IUser";

export type UserTypes = IPayloadAction<IUser>;
const userReducer: Reducer<IUserState, UserTypes> = (
  state: IUserState = { isAuth: false, uid: "" },
  action: UserTypes,
) => {
  const { type, payload } = action;

  switch (type) {
    case USER_AUTH_SUCCESSFUL: {
      return {
        ...state,
        isAuth: true,
        uid: payload.uid,
      };
    }

    case USER_AUTH_FAILED: {
      return {
        ...state,
        isAuth: false,
        uid: "",
      };
    }

    default: {
      return state;
    }
  }
};

export const rootReducer: Reducer<IUserState, UserTypes> = userReducer;
