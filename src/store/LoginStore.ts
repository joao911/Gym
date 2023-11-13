import create from "zustand";

export const loginStore = create((set) => ({
  state: {
    token: "",
    name: "",
    email: "",
    password: "",
  },
  dispatch: {
    setToken: (token: string) => set({ token: token }),
    setLogin: (email: string, password: string) => {
      try {
        set({ email: email, password: password });
      } catch (error) {
        console.error("Erro ao definir credenciais:", error);
      }
    },
    setRegister: (name: string, email: string, password: string) => {
      try {
        set({ name: name, email: email, password: password });
      } catch (error) {
        console.error("Erro ao definir credenciais:", error);
      }
    },
  },
}));
