import { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import BackHeader from '@components/headers/BackHeader';
import Header from './components/headers/Header';
import LoadingFallback from '@components/LoadingFallback';
import NavHeader from '@components/headers/NavHeader';

const Home = lazy(() => import('@pages/main/Home'));
const Login = lazy(() => import('@pages/login/Login'));
const Signup = lazy(() => import('@pages/login/Signup'));
const Mypage = lazy(() => import('@pages/mypage/Mypage'));
const EditUserProfile = lazy(() => import('@pages/mypage/EditUserProfile'));
const ViewPetsitters = lazy(() => import('@pages/reservation/ViewPetsitters'));
const Reservation = lazy(() => import('@pages/reservation/Reservation'));
const ReservationStepTwo = lazy(() => import('@pages/reservation/ReservationStepTwo'));
const ReservationStepThree = lazy(() => import('@pages/reservation/ReservationStepThree'));
const Cares = lazy(() => import('@pages/care/Cares'));
const RegisterPet = lazy(() => import('@pages/mypage/RegisterPet'));
const EditPet = lazy(() => import('@pages/mypage/EditPet'));
const PetsitterViewDetails = lazy(() => import('@pages/reservation/PetsitterViewDetails'));
const Search = lazy(() => import('@pages/main/Search'));
const CreateReview = lazy(() => import('@pages/care/CreateReview'));
const CreateJournal = lazy(() => import('@pages/care/CreateJournal'));
const SitterSchedule = lazy(() => import('@pages/mypage/SitterSchedule'));
const OAuthBranch = lazy(() => import('@pages/login/OAuthBranch'));
const ViewJournal = lazy(() => import('@pages/common/ViewJournal'));
const QnA = lazy(() => import('@pages/main/QnA'));
const NotFound = lazy(() => import('@pages/common/404'));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  height: 100%;
  background-color: white;
`;

const AddNavHeaderLayout = () => {
  return (
    <>
      <NavHeader />
      <Outlet />
    </>
  );
};

// const HeaderLayout = () => {
//   return (
//     <>
//       <Header />
//       <Outlet />
//     </>
//   );
// };

const BackHeaderLayout = () => {
  return (
    <>
      <BackHeader />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Wrapper>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<AddNavHeaderLayout />}>
                <Route path="" element={<Home />} />
                <Route path="mypage" element={<Mypage />} />
                <Route path="reservation" element={<Reservation />} />
                <Route path="reservation/step2" element={<ReservationStepTwo />}></Route>
                <Route path="cares" element={<Cares />} />
                <Route path="cares/:reservationId/review" element={<CreateReview />} />
                <Route path="cares/:reservationId/journal" element={<CreateJournal />} />
              </Route>
              <Route path="/" element={<BackHeaderLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signup/branch" element={<OAuthBranch />} />
                <Route path="mypage/edit" element={<EditUserProfile />} />
                <Route path="mypage/register" element={<RegisterPet />} />
                <Route path="mypage/:petId/edit" element={<EditPet />}></Route>
                <Route path="search" element={<Search />} />
                <Route path="qna" element={<QnA />} />
                <Route path="petsitters" element={<ViewPetsitters />}></Route>
                <Route path="reservation/step3" element={<ReservationStepThree />}></Route>
                <Route path="cares/journal/:journalId" element={<ViewJournal />}></Route>
                <Route path="petsitters/:petsitterId" element={<PetsitterViewDetails />}></Route>
                <Route path="petsitters/:memberId/schedule" element={<SitterSchedule />}></Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Wrapper>
      </Container>
    </BrowserRouter>
  );
};

export default App;
