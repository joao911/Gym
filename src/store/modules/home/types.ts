export interface IState {
  groups: string[];
  loadingFetchingGroups: boolean;
  exercises: Exercise[];
  loadingDetails: boolean;
  loadingRegister: boolean;
  exerciseDetails: Exercise;
  history: HistoryGroupByDayDTO[];
  loadingHistory: boolean;
}

export interface Exercise {
  id: string;
  created_at: string;
  demo: string;
  group: string;
  name: string;
  repetitions: number;
  series: number;
  thumb: string;
  updated_at: string;
}

export interface HistoryGroupByDayDTO {
  title: string;
  data: HistoryDto[];
}
export interface HistoryDto {
  id: string;
  name: string;
  group: string;
  hour: string;
  created_at: string;
}
