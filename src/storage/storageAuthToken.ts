import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_STORAGE, USER_STORAGE } from "./storageConfig";

type StorageAuthTokenProps = {
  token: string;
  refresh_token: string;
};
export const storageTokenSave = async (
  token: string,
  refresh_token: string
) => {
  await AsyncStorage.setItem(
    TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token })
  );
};

export const storageTokenGet = async () => {
  const response = await AsyncStorage.getItem(TOKEN_STORAGE);
  const { token, refresh_token }: StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {};
  return { token, refresh_token };
};

export const storageTokenRemove = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE);
};
