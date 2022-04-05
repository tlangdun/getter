import { User } from 'firebase/auth';
import { collection, query, where } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import { GetterUser } from '../../store/Models';

const userMapper = (user: User | null): GetterUser => {
  if (!user) {
    return null;
  }
  
  const userCollection = collection(db, 'Users')
  console.log(userCollection)

  return {
    uid: user.uid,
    name: user.displayName,
  };
};

export { userMapper };
