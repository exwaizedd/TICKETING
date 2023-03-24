import HomePage from './pages/HomePage';
import DashBoard from './pages/DashBoard';
import { Routes, Route } from 'react-router-dom';
import DashBoardMain from './components/Dashboard/DashBoardMain';
import TicketPage from './pages/TicketPage';
import ErrorPage from './pages/ErrorPage';
import AboutUsPage from './pages/AboutUsPage';
import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
import RequireAuth from './RequireAuth';
import RequireAdminAuth from './RequireAminAuth';
import AdminPage from './pages/AdminPage';
import { useAddress } from '@thirdweb-dev/react';

export default function Home() {
  const address = useAddress();

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route element={<RequireAuth address={address} />}>
        <Route path='dashboard' element={<DashBoard />}>
          <Route index element={<DashBoardMain />} />
          <Route path='ticket' element={<TicketPage />} />
          <Route path='profile' element={<ProfilePage />} />
          {/* <Route path='aboutus' element={<About />} /> */}
        </Route>
      </Route>
      <Route path='/about' element={<AboutUsPage />}></Route>
      <Route path='/admin/*' element={<RequireAdminAuth address={address} />}>
        <Route path='' element={<AdminPage />} />
      </Route>
      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  );
}
