import { LinearProgress } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router'
import authUser from '$/api/authUser'
import Navbar from '$/components/Navbar/Navbar'
import { useAuth } from '$/context/AuthContext/AuthContext'
import JwtManager from '$/utils/JwtManager'
import ChangePasswordRoute from './ChangePasswordRoute/ChangePasswordRoute'
import ClientsRoute from './ClientsRoute/ClientsRoute'
import LoginRoute from './LoginRoute/LoginRoute'
import RegisterRoute from './RegisterRoute/RegisterRoute'
import Footer from '$/components/Footer'


const HomeLayout: React.FC = ({ children }) => <><Navbar /><Outlet />{children}<Footer /></>



const AppRoutes: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();


  const userFallback = (fallback: JSX.Element, exists: JSX.Element) => user ? exists : fallback;

  const onAuthSuccess = useCallback((username: string, authenticated: boolean) => {
    setUser(username);
  }, [setUser]);

  const onAuthFailed = useCallback((e: string) => {
    JwtManager.delete();
  }, [])

  useEffect(() => {
    setLoading(true);
    authUser()(onAuthSuccess, onAuthFailed)
      .finally(() => setLoading(false));
  }, [onAuthSuccess, onAuthFailed]);



  return loading ? <LinearProgress /> :
    <Routes>
      <Route path="*" element={userFallback(<Navigate to="/login" />, <HomeLayout />)} >
        <Route path="changePassword" element={<ChangePasswordRoute />} />
        <Route path="clients/*" element={<ClientsRoute />} />
      </Route>

      <Route path="/login" element={userFallback(<LoginRoute />, <Navigate to="/" />)} />
      <Route path="/register" element={userFallback(<RegisterRoute />, <Navigate to="/" />)} />
    </Routes>
}
export default AppRoutes;

