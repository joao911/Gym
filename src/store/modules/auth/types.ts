export interface IState {
  loadingRegister: boolean;
  loadingLogin: boolean;
  user: IUser;
}

export interface IUser {
  token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
  };
}
