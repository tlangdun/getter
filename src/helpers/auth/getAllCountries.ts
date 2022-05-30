import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';

const getAllCountries = async () => {
  try {
    const countriesRef = collection(db, 'Countries');
    return (await getDocs(countriesRef)).docs.map((d) => d.id);
  } catch (error) {
    console.log(error);
  }
};

export default getAllCountries;
