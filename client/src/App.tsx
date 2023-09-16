import { Suspense, lazy } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

import BackHeader from '@components/headers/BackHeader';
import Header from './components/headers/Header';
import LoadingFallback from '@components/LoadingFallback';
import NavHeader from '@components/headers/NavHeader';

const Home = lazy(() => import('@pages/Home'));
const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));
const Mypage = lazy(() => import('@pages/Mypage'));
const EditUserProfile = lazy(() => import('@pages/EditUserProfile'));
const ViewPetsitters = lazy(() => import('@pages/ViewPetsitters'));
const Reservation = lazy(() => import('@pages/Reservation'));
const ReservationStepTwo = lazy(() => import('@pages/ReservationStepTwo'));
const ReservationStepThree = lazy(() => import('@pages/ReservationStepThree'));
const Cares = lazy(() => import('@pages/Cares'));
const RegisterPet = lazy(() => import('@pages/RegisterPet'));
const EditPet = lazy(() => import('@pages/EditPet'));
const PetsitterViewDetails = lazy(() => import('@pages/PetsitterViewDetails'));
const Search = lazy(() => import('@pages/Search'));
const CreateReview = lazy(() => import('@pages/CreateReview'));
const CreateJournal = lazy(() => import('@pages/CreateJournal'));
const SitterSchedule = lazy(() => import('@pages/SitterSchedule'));
const OAuthBranch = lazy(() => import('@pages/OAuthBranch'));
const ViewJournal = lazy(() => import('@pages/ViewJournal'));
const QnA = lazy(() => import('@pages/QnA'));
const NotFound = lazy(() => import('@pages/404'));

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
                <Route path="reservation/step3" element={<ReservationStepThree />}></Route>
                <Route path="cares/detail" element={<Cares />} />
                <Route path="cares/:memberId/:reservationId/review" element={<CreateReview />} />
                <Route path="cares/:memberId/:reservationId/journal" element={<CreateJournal />} />
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
