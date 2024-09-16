export interface UserId {
  loginId: string;
}

export interface UserPW {
  password: string;
}

export interface UserEmail {
  email: string;
}

export interface UserLogin extends UserId, UserPW {}

export interface UserJoin extends UserLogin, UserEmail {
  passwordConfirm?: string;
}

export interface UserFindPw extends UserId, UserEmail {}

export interface ResponseUserCheckID {
  overlap: boolean;
}

export interface UserLoginResponse {
  AccessToken: string;
  RefreshToken: string;
}

export interface ResetPassword {
  prePassword: string;
  newPassword: string;
}

export interface FindPassword extends UserId, UserEmail {}

export interface ReasonInfo {
  judgement: string;
  createdAt: Date;
}

export interface RestrictionInfo extends ReasonInfo {
  restrictedReason: string;
  restrictingDate: Date;
}

export interface BlacklistInfo extends ReasonInfo {
  blackListReason: string;
  expiredAt: Date;
}

export interface EvaluatePostBase {
  selectedSemester: string;
  satisfaction: number;
  learning: number;
  honey: number;
  team: number;
  difficulty: number;
  homework: number;
  content: string;
}

export type EvaluatePostUpdate = EvaluatePostBase;

export interface EvaluatePostCreate extends EvaluatePostBase {
  lectureName: string;
  professor: string;
}

export interface EvaluateReportCreate {
  evaluateIdx: number;
  content: string;
}

export interface ExamReportCreate {
  examIdx: number;
  content: string;
}

export interface ExamPostCreate {
  lectureName: string;
  professor: string;
  selectedSemester: string;
  examInfo: string;
  examType: string;
  examDifficulty: string;
  content: string;
}

export type ExamPostUpdate = Pick<
  ExamPostCreate,
  'selectedSemester' | 'examInfo' | 'examType' | 'examDifficulty' | 'content'
>;

export interface ExamPostPurChase {
  id: number;
  lectureName: string;
  professor: string;
  majorType: string;
  createDate: Date;
}

// my
export interface UserProfileInfo extends UserId, UserEmail {
  point: number;
  writtenEvaluation: number;
  writtenExam: number;
  viewExam: number;
}

export interface ClientRefresh {
  AccessToken: string;
}
