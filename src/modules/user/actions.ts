import {Action} from "redux";

import {actionCreator, IPayloadAction, payloadActionCreator} from "../actions";
import {IUser} from "./IUser";

export const USER_AUTH_SUCCESSFUL: string = "@USER/USER_AUTH_SUCCESSFUL";
export const onUserAuthSuccessful: (user: IUser) => IPayloadAction<IUser> =
  payloadActionCreator<IUser>(USER_AUTH_SUCCESSFUL);

export const USER_AUTH_FAILED: string = "@USER/USER_AUTH_FAILED";
export const onUserAuthFailed: () => Action<string> =
  actionCreator(USER_AUTH_FAILED);
