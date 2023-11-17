import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_STORAGE, USER_STORAGE } from "./storageConfig";

export const storageTokenSave = async (token: string) => {
  await AsyncStorage.setItem(TOKEN_STORAGE, token);
};

export const storageTokenGet = async () => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE);

  return token;
};

export const storageTokenRemove = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE);
};
