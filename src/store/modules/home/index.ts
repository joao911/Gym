import { createModel } from "@rematch/core";
import { RootModel } from "../../models";
import { IState, Exercise, HistoryGroupByDayDTO } from "./types";
import { api } from "@services/api";

export const home = createModel<RootModel>()({
  state: {
    groups: [],
    loadingFetchingGroups: false,
    exercises: [],
    loadingDetails: false,
    loadingRegister: false,
    exerciseDetails: {} as Exercise,
    history: [],
    loadingHistory: false,
  } as IState,
  reducers: {
    setGroups(state, payload: string[]) {
      return { ...state, groups: payload };
    },
    setLoadingFetchingGroups(state, payload: boolean) {
      return { ...state, loadingFetchingGroups: payload };
    },
    setExercises(state, payload: Exercise[]) {
      return { ...state, exercises: payload };
    },
    setLoadingDetails(state, payload: boolean) {
      return { ...state, loadingDetails: payload };
    },
    setLoadingRegister(state, payload: boolean) {
      return { ...state, loadingRegister: payload };
    },
    setExerciseDetails(state, payload: Exercise) {
      return { ...state, exerciseDetails: payload };
    },
    setHistory(state, payload: HistoryGroupByDayDTO[]) {
      return { ...state, history: payload };
    },
    setLoadingHistory(state, payload: boolean) {
      return { ...state, loadingHistory: payload };
    },
  },
  effects: (dispatch) => ({
    async fetchGroups(payload: { token: string }) {
      const { token } = payload;
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get("/groups");
        dispatch.home.setGroups(response.data);
      } catch (error) {
        throw error;
      }
    },
    async fetchExercisesByGroup(payload: { groupSelected: string }) {
      const { groupSelected } = payload;

      try {
        dispatch.home.setLoadingFetchingGroups(true);
        const response = await api.get(`/exercises/bygroup/${groupSelected}`);
        dispatch.home.setExercises(response.data);
        console.log("response: ", response.data);
        dispatch.home.setLoadingFetchingGroups(false);
      } catch (error) {
        throw error;
      }
    },

    async fetchExerciseDetails(payload: { exerciseId: string }) {
      const { exerciseId } = payload;
      try {
        dispatch.home.setLoadingDetails(true);
        const response = await api.get(`/exercises/${exerciseId}`);
        dispatch.home.setExerciseDetails(response.data);
        dispatch.home.setLoadingDetails(false);
      } catch (error) {
        throw error;
      } finally {
        dispatch.home.setLoadingDetails(false);
      }
    },

    async handleExerciseHistoryRegister(payload: { exerciseId: string }) {
      const { exerciseId } = payload;
      try {
        dispatch.home.setLoadingRegister(true);
        await api.post("/history", { exercise_id: exerciseId });
        dispatch.home.setLoadingRegister(false);
      } catch (error) {
        throw error;
      } finally {
        dispatch.home.setLoadingRegister(false);
      }
    },

    async getAllHistory() {
      try {
        dispatch.home.setLoadingHistory(true);
        const response = await api.get("/history");
        dispatch.home.setHistory(response.data);
      } catch (error) {
        throw error;
      } finally {
        dispatch.home.setLoadingHistory(false);
      }
    },
  }),
});
