// *레이아웃 변경

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import NavHeader from '@components/headers/NavHeader';
import Home from '@pages/Home';
import Login from '@pages/Login';
import Signup from '@pages/Signup';

import Mypage from './pages/Mypage';
import EditUserProfile from './pages/EditUserProfile';
import Reservation from './pages/Reservation';
import ReservationStepTwo from '@pages/ReservationStepTwo';
import ReservationStepThree from '@pages/ReservationStepThree';
import PetsitterViewDetails from '@pages/PetsitterViewDetails';
import Cares from './pages/Cares';
import BackHeader from './components/headers/BackHeader';
import Header from './components/headers/Header';
import RegisterPet from './pages/RegisterPet';
import EditPet from 'pages/EditPet';
import Search from './pages/Search';
import CreateReview from './pages/CreateReview';
import NotFound from '@pages/404';
import CreateJournal from '@pages/CreateJournal';
import SitterSchedule from '@pages/SitterSchedule';
import OAuthBranch from '@pages/OAuthBranch';

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
          <Routes>
            <Route path="/" element={<AddNavHeaderLayout />}>
              <Route path="" element={<Home />} />
              <Route path="mypage" element={<Mypage />} />
              <Route path="reservation" element={<Reservation />} />
              <Route path="reservation/step2" element={<ReservationStepTwo />}></Route>
              <Route path="reservation/step3" element={<ReservationStepThree />}></Route>
              <Route path="cares/:memberId" element={<Cares />} />
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
              <Route path="petsitters/:petsitterId" element={<PetsitterViewDetails />}></Route>
              <Route path="petsitters/:memberId/schedule" element={<SitterSchedule />}></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Wrapper>
      </Container>
    </BrowserRouter>
  );
};

export default App;
