import { ReactNode, createContext, useEffect, useState } from "react";

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { UserDto } from "@dtos/UserDto";
import { api } from "@services/api";
import {
  storageTokenGet,
  storageTokenRemove,
  storageTokenSave,
} from "@storage/storageAuthToken";

export interface AuthContextDataProps {
  user: UserDto;
  sigIn: (email: string, password: string) => Promise<void>;
  loadingStorageData: boolean;
  signOut: () => Promise<void>;
  updateUserProfile: (data: UserDto) => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

interface AuthContextProviderProps {
  children: ReactNode;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserDto>({} as UserDto);
  const [loadingStorageData, setLoadingStorageData] = useState(true);

  const storageUserAndTokenUpdate = async (user: UserDto, token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);
  };

  const storageUserAndTokenSave = async (
    user: UserDto,
    token: string,
    refresh_token: string
  ) => {
    try {
      setLoadingStorageData(true);
      await storageUserSave(user);
      await storageTokenSave(token, refresh_token);
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  };
  const sigIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password,
      });
      if (data.user && data.token && data.refresh_token) {
        setLoadingStorageData(true);
        await storageUserAndTokenSave(
          data.user,
          data.token,
          data.refresh_token
        );
        await storageUserAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  };

  const loadUserData = async () => {
    try {
      setLoadingStorageData(true);
      const userLogged = await storageUserGet();
      const { token } = await storageTokenGet();
      if (userLogged && token) {
        storageUserAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  };

  const updateUserProfile = async (data: UserDto) => {
    try {
      setUser(data);
      await storageUserSave(data);
    } catch (error) {
      throw error;
    }
  };
  const signOut = async () => {
    try {
      setLoadingStorageData(true);
      setUser({} as UserDto);
      await storageUserRemove();
      await storageTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);
    return () => subscribe();
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        sigIn,
        loadingStorageData,
        signOut,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
