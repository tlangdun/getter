import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';

const getAllJobRoles = async () => {
  try {
    const jobRolesRef = collection(db, 'Job_roles');
    return (await getDocs(jobRolesRef)).docs.map((d) => d.id);
  } catch (error) {
    console.log(error);
  }
};

export default getAllJobRoles;
