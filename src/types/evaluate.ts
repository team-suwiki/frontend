import type { ExamPost } from './exam';

export interface ReviewBase {
  id: number;
  selectedSemester: string;
  satisfaction: number;
  learning: number;
  honey: number;
  team: number;
  difficulty: number;
  homework: number;
  content: string;
}

export interface ReviewOptions {
  lectureName: string;
  professor: string;
  majorType: string;
  semesterList: string;
  totalAvg: number;
}

export interface Review extends ExamPost, ReviewBase, ReviewOptions {}

export interface ReviewResponse {
  data: Review[];
  written: boolean;
}

export interface PostReviewRequest extends ReviewBase {
  lectureName: string;
  professor: string;
}
