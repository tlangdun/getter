import { FC, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import SignupEmployee from './SignupPageEmployee';
import SignupRecruiter from './SignupPageRecruiter';

const AuthRoute: FC = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <>
      {!user && (
        <Routes>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='signup-rec' element={<SignupRecruiter />} />
          <Route path='signup-tal' element={<SignupEmployee />} />
        </Routes>
      )}
    </>
  );
};

export default AuthRoute;
