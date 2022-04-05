import { onAuthStateChanged } from 'firebase/auth';
import { FC, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { userMapper } from '../../helpers/auth/userMapper';
import { auth } from '../../services/firebaseconfig';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GetterUser } from '../../store/Models';
import { UserActions } from '../../store/slices/UserSlice';
import LoginPage from './LoginPage';

const AuthRoute: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const shouldRedirect = useAppSelector((state) => !!state.user.user);

  onAuthStateChanged(auth, (currentUser) => {
    const user: GetterUser = userMapper(currentUser);
    dispatch(UserActions.setFirebaseUser(user));
  });

  useEffect(() => {
  if (shouldRedirect) {
    navigate('/dashboard');
  }}, [shouldRedirect])

  return (
    <>
      {!shouldRedirect && (
        <Routes>
          <Route path='login' element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};

export default AuthRoute;
