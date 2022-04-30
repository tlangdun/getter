import { onAuthStateChanged } from 'firebase/auth';
import { FC, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { userMapper } from '../../helpers/auth/userMapper';
import { auth } from '../../services/firebaseconfig';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UserActions } from '../../store/slices/UserSlice';
import LoginPage from './LoginPage';

const AuthRoute: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);

  onAuthStateChanged(auth, (currentUser) => {
      userMapper(currentUser).then((us) => {
        console.log(us)
        dispatch(UserActions.setFirebaseUser(us));
    });
  });

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user]);

  return (
    <>
      {!user && (
        <Routes>
          <Route path='login' element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};

export default AuthRoute;
