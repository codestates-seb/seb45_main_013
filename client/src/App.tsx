import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import NavHeader from './components/headers/NavHeader';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';
import EditUserProfile from './pages/EditUserProfile';
import Reservation from './pages/Reservation';
import ReservationStepTwo from 'pages/ReservationStepTwo';
import Cares from './pages/Cares';
import BackHeader from './components/headers/BackHeader';
import Header from './components/headers/Header';
import RegisterPet from './pages/RegisterPet';
import EditPet from 'pages/EditPet';
import Search from './pages/Search';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  min-width: 360px;

  @media (width >= 600px) {
    width: 600px;
  }
  @media (height <= 780px) {
    height: 780px;
  }
`;

const AddNavHeaderLayout = () => {
  return (
    <>
      <NavHeader />
      <Outlet />
    </>
  );
};

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const BackHeaderLayout = () => {
  return (
    <>
      <BackHeader />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddNavHeaderLayout />}>
            <Route path="" element={<Home />}></Route>
          </Route>
          <Route path="/" element={<HeaderLayout />}>
            <Route path="mypage" element={<Mypage />}></Route>
            <Route path="reservation" element={<Reservation />}></Route>
            <Route path="reservation/step2" element={<ReservationStepTwo />}></Route>
            <Route path="/cares/:memberId" element={<Cares />}></Route>
          </Route>
          <Route path="/" element={<BackHeaderLayout />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="mypage/edit" element={<EditUserProfile />}></Route>
            <Route path="mypage/register" element={<RegisterPet />}></Route>
            {/* <Route path="mypage/:petId/edit" element={<EditPet />}></Route> */}
            <Route path="mypage/pets/edit" element={<EditPet />}></Route>
            <Route path="search" element={<Search />}></Route>
          </Route>
          <Route path="/cares/:memberId/:reservationId/review" element={<Reservation />}></Route>
          <Route path="/cares/:petsitterId" element={<Cares />}></Route>
          <Route path="/cares/:petsitterId/:reservationId/journal" element={<Cares />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
