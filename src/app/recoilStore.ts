import { atom } from 'recoil';
import type { Review } from 'types/evaluate';

export const lectureState = atom<Review>({
  key: 'lectureState',
  default: {
    id: -1,
    lectureName: '',
    professor: '',
    semesterList: '',
    selectedSemester: '',
    examInfo: '',
    examType: '',
    examDifficulty: '',
    content: '',
    satisfaction: -1,
    learning: -1,
    honey: -1,
    team: -1,
    difficulty: -1,
    homework: -1,
    majorType: '',
    totalAvg: -1,
  },
});

export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null,
});
