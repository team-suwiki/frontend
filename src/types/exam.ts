import type { ReviewOptions } from './evaluate';

export interface ExamPost {
  id: number;
  selectedSemester: string;
  examInfo: string;
  examType: string;
  examDifficulty: string;
  content: string;
}

export interface MyExam extends ExamPost, ReviewOptions {}

export interface ExamPostsResponse {
  data: ExamPost[];
  written: boolean;
}
