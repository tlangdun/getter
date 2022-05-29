import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';

const getAllProgLangs = async () => {
  try {
    const skillsRef = collection(db, 'Programming_languages');
    return (await getDocs(skillsRef)).docs.map((d) => d.id);
  } catch (error) {
    console.log(error);
  }
};

export default getAllProgLangs;
