import { createModel } from "@rematch/core";
import { RootModel } from "../models";

import { IState } from "./types";
import { api } from "@services/api";

export const auth = createModel<RootModel>()({
  state: {
    loadingRegister: false,
  } as IState,
  reducers: {
    setLoadingRegister(state, payload: boolean) {
      return { ...state, loadingRegister: payload };
    },
  },
  effects: (dispatch) => ({
    async register(payload: { name: string; email: string; password: string }) {
      try {
        dispatch.auth.setLoadingRegister(true);
        const response = await api.post("/users", payload);
        dispatch.auth.setLoadingRegister(false);
        console.log("response: ", response);
      } catch (error) {
        throw error;
      } finally {
        dispatch.auth.setLoadingRegister(false);
      }
    },
  }),
});
