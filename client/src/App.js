import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import Reservation from './pages/Reservation';
import Cares from './pages/Cares';
import SignupMembers from './pages/SignupMembers';
import SignupPetsitter from './pages/SignupPetsitter';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signup/members" element={<SignupMembers />}></Route>
          <Route path="/signup/petsitter" element={<SignupPetsitter />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/cares/:memberId" element={<Reservation />}></Route>
          <Route path="/cares/:memberId/:reservationId/review" element={<Reservation />}></Route>
          <Route path="/cares/:petsitterId" element={<Cares />}></Route>
          <Route path="/cares/:petsitterId/:reservationId/journal" element={<Cares />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
