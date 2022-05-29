import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';

const getCantons = async (country: string) => {
  try {
    const regionsRef = collection(db, `Countries/${country}/Region`);
    return (await getDocs(regionsRef)).docs.map((d) => d.id);
  } catch (error) {
    console.log(error);
  }
};

export default getCantons;
