import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../../services/firebaseconfig';
import { UserActions } from '../../store/slices/UserSlice';
import store from '../../store/store';

const googleProvider = new GoogleAuthProvider();

const loginGoogle = (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider);
}

const registerEmailPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};


const loginEmailPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};


const logout = async () => {
  store.dispatch(UserActions.setFirebaseUser(null));
  await signOut(auth);
};

export { registerEmailPassword, loginEmailPassword, logout, loginGoogle };
