import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Footer, Nav, ScrollButton } from 'components';
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
import RouteChangeTracker from 'components/RouteChangeTracker';

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
