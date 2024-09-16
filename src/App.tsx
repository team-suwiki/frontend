import { Footer, Nav, ScrollButton } from 'components';
import RouteChangeTracker from 'components/RouteChangeTracker';
import { useHttp } from 'hooks/useHttp';
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

const App = () => {
  useHttp();

  return (
    <>
      <RouteChangeTracker />
      <Nav />
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
      <ScrollButton />
      <Footer />
    </>
  );
};

export default App;
