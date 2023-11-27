import { Models } from "@rematch/core";
import { auth } from "./modules/auth/auth";
import { home } from "./modules/home";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
  home: typeof home;
}

export const models: RootModel = {
  auth,
  home,
};
