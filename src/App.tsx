import { isLoginState } from 'app/recoilStore';
import Layout from 'components/Etc/Layout';
import {
  BadGateway,
  BanReason,
  EmailSignUp,
  Exit,
  HistoryTest,
  IdSearch,
  LectureInfo,
  Login,
  Main,
  MyInfo,
  MyPosting,
  NotFound,
  Notice,
  NoticeDetail,
  PwSearch,
  ResetPassword,
  Search,
  SignUp,
} from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';
import type { MutableSnapshot } from 'recoil';
import { RecoilRoot } from 'recoil';
import { getAccessToken } from 'utils/tokenManeger';

const App = () => {
  const initialState = ({ set }: MutableSnapshot) => {
    const isLogin = !!getAccessToken();
    set(isLoginState, isLogin || false);
  };

  return (
    <RecoilRoot initializeState={initialState}>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pwsearch" element={<PwSearch />} />
          <Route path="/idsearch" element={<IdSearch />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myinformation" element={<MyInfo />} />
          <Route path="/myposting" element={<MyPosting />} />
          <Route path="/lectureinfo" element={<LectureInfo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/emailsignup" element={<EmailSignUp />} />
          <Route path="/notice/detail" element={<NoticeDetail />} />
          <Route path="/historytest" element={<HistoryTest />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/exit" element={<Exit />} />
          <Route path="/banreason" element={<BanReason />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/502" element={<BadGateway />} />
          <Route path="/*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Layout>
    </RecoilRoot>
  );
};

export default App;
