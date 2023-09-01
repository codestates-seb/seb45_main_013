import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { styled } from 'styled-components';

import Header from './components/headers/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Reservation from './pages/Reservation';
import Cares from './pages/Cares';
import BackHeader from './components/headers/BackHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  min-width: 360px;

  @media (width >= 600px) {
    width: 600px;
  }
`;

const AddHeaderLayout = () => {
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
          <Route path="/" element={<AddHeaderLayout />}>
            <Route path="" element={<Home />}></Route>
          </Route>
          <Route path="/" element={<BackHeaderLayout />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<Signup />}></Route>
          </Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/cares/:memberId" element={<Reservation />}></Route>
          <Route path="/cares/:memberId/:reservationId/review" element={<Reservation />}></Route>
          <Route path="/cares/:petsitterId" element={<Cares />}></Route>
          <Route path="/cares/:petsitterId/:reservationId/journal" element={<Cares />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
