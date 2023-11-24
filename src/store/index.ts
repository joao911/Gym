import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import persist from "@rematch/persist";
import Reactotron from "../config/ReatotronConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { models, RootModel } from "./models";

const persistConfig = {
  key: "persist-storage",
  storage: AsyncStorage,
  whitelist: ["login"],
  version: 2,
};

export const store = init({
  models,
  plugins: [persist(persistConfig)],
  redux: {
    enhancers: [Reactotron.createEnhancer!() as any],
    rootReducers: { RESET_APP: () => undefined },
  },
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
