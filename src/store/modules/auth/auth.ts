import { createModel } from "@rematch/core";
import { RootModel } from "../../models";

import { IState, IUser, ImageAvatar } from "./types";
import { api } from "@services/api";
import { Platform } from "react-native";

function getImageProps(image: any) {
  const imageInfoArray = image.uri.split("/");
  console.log("imageInfoArray: ", imageInfoArray);
  const fileName = imageInfoArray[imageInfoArray.length - 1].split(".")[0];

  const fileExtension = imageInfoArray[imageInfoArray.length - 1].split(".")[1];
  return {
    name: `${fileName}.${fileExtension}`,
    type: `image/${fileExtension}`,
    uri: Platform.select({
      ios: image.uri.replace("file://", ""),
      android: image.uri,
    }),
  };
}

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
    async handleUpdateProfile(payload: {
      name: string;
      password: string;
      old_password: string;
    }) {
      try {
        await api.put("/users", {
          name: payload.name,
          password: payload.password,
          old_password: payload.old_password,
        });
      } catch (error) {
        throw error;
      }
    },
    async updateProfileImage(payload: ImageAvatar) {
      try {
        const formData = new FormData();
        formData.append("avatar", getImageProps(payload.avatar) as any);
        const response = await api.patch("/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("response: ", response.data);
      } catch (error) {
        throw error;
      }
    },
  }),
});
