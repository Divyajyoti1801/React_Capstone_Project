import { AnyAction } from "@reduxjs/toolkit";
import { UserData } from "../../utils/firebase/firebase.utils.js";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
} from "./user.action";

export type UserState = {
  currentUser: UserData | null;
  isLoading: boolean;
  error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

//Reducer
export const userReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (
    signOutFailed.match(action) ||
    signInFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }
  return state;
};
