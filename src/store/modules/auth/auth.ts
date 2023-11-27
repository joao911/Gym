import { createModel } from "@rematch/core";
import { RootModel } from "../../models";

import { IState, IUser } from "./types";
import { api } from "@services/api";

export const auth = createModel<RootModel>()({
  state: {
    loadingRegister: false,
    loadingLogin: false,
    user: {},
  } as IState,
  reducers: {
    setLoadingRegister(state, payload: boolean) {
      return { ...state, loadingRegister: payload };
    },
    setLoadingLogin(state, payload: boolean) {
      return { ...state, loadingLogin: payload };
    },
    setUser(state, payload: IUser) {
      return { ...state, user: payload };
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
    async login(payload: { email: string; password: string }) {
      try {
        dispatch.auth.setLoadingLogin(true);
        const response = await api.post("/sessions", payload);
        dispatch.auth.setUser(response.data);
        dispatch.auth.setLoadingLogin(false);
      } catch (error) {
        throw error;
      } finally {
        dispatch.auth.setLoadingLogin(false);
      }
    },
  }),
});
