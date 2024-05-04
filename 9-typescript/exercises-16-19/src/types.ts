export interface HeaderProps {
  title: string;
}

export interface DiaryProps {
  entries: DiaryEntry[];
}

export interface ErrorProps {
  errorMessage: string;
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
