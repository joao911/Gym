import { ReactNode, createContext, useEffect, useState } from "react";

import { storageUserGet, storageUserSave } from "@storage/storageUser";
import { UserDto } from "@dtos/UserDto";
import { api } from "@services/api";

export interface AuthContextDataProps {
  user: UserDto;
  sigIn: (email: string, password: string) => Promise<void>;
  loadingStorageData: boolean;
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

  const sigIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/sessions", {
        email,
        password,
      });
      if (data.user) {
        setUser(data.user);
        storageUserSave(data.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet();
      if (userLogged) {
        setUser(userLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingStorageData(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        sigIn,
        loadingStorageData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
