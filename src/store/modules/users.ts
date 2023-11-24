import { createModel } from "@rematch/core";
import { RootModel } from "../models";

import { IState } from "./types";

export const users = createModel<RootModel>()({
  state: {
    userAge: 0,
  } as IState,
  reducers: {
    setUserAge(state, payload: number) {
      return { ...state, userAge: payload };
    },
  },
  effects: (dispatch) => ({
    async upAge(payload: string, state) {
      console.log("payload", payload);
      const { userAge } = state.users;
      dispatch.users.setUserAge(userAge + 1);
    },
    async downAge(payload: string, state) {
      console.log("payload", payload);
      const { userAge } = state.users;
      if (userAge >= 1) {
        dispatch.users.setUserAge(userAge - 1);
      }
    },
  }),
});
