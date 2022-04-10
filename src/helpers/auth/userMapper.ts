import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import { access_level, GetterUser } from '../../store/Models';

const userMapper = async (user: User | null): Promise<GetterUser> => {
  if (!user) {
    return null;
  }

  const docRef = doc(db, "Users", user.uid);
  const docSnap = await getDoc(docRef);

  const tokenres = await user.getIdTokenResult();
  let claim = access_level.TALENT;

  if (!!tokenres.claims.admin){
    claim = access_level.ADMIN;
  } else if(!!tokenres.claims.recruiter){
    claim = access_level.RECRUITER;
  } 

  if (docSnap.exists()) {
   const u = docSnap.data()
   return {
    uid: user.uid,
    access_level: claim,
    address_postcode: u.address_postcode,
    availability: u.availability,
    birth_date: u.birth_date,
    canton: u.canton,
    city_of_residence: u.city_of_residence,
    email: u.email,
    job_role: u.job_role,
    first_name: u.first_name,
    last_name: u.last_name,
    pic_url: u.pic_url,
    short_bio: u.short_bio,
    salary_range: {
      start: u.salary_range.start,
      end: u.salary_range.end
    },
    work_experience: u.work_experience
  };
  } else {
    console.log("No such document!");
    return null;
  }
};

export { userMapper };
