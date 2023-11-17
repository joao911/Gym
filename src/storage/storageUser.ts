import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDto } from "@dtos/UserDto";
import { USER_STORAGE } from "./storageConfig";

export const storageUserSave = async (user: UserDto) => {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
};

export const storageUserGet = async () => {
  const storage = await AsyncStorage.getItem(USER_STORAGE);
  const user: UserDto = storage ? JSON.parse(storage) : ({} as UserDto);

  return user;
};

export const storageUserRemove = async () => {
  await AsyncStorage.removeItem(USER_STORAGE);
};
