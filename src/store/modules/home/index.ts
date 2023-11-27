import { createModel } from "@rematch/core";
import { RootModel } from "../../models";
import { IState } from "./types";

export const auth = createModel<RootModel>()({
  state: {
    loadingRegister: false,
    loadingLogin: false,
    user: {},
  } as IState,
  reducers: {},
  effects: (dispatch) => ({}),
});
