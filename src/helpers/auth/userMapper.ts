import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import { access_level, GetterUser } from '../../store/Models';

const userMapper = async (user: User | null): Promise<GetterUser> => {
  if (!user) {
    return null;
  }

  const docRef = doc(db, 'Users', user.uid);
  const docSnap = await getDoc(docRef);

  let skills: string[];
  let programmmingLanguages: string[];

  const skillsRef = collection(db, `Users/${user.uid}/skills`);
  const progsRef = collection(db, `Users/${user.uid}/programming_languages`);

  try {
    skills = (await getDocs(skillsRef)).docs.map((d) => d.id);
  } catch (error) {
    skills = [];
  }
  try {
    programmmingLanguages = (await getDocs(progsRef)).docs.map((d) => d.id);
  } catch (error) {
    programmmingLanguages = [];
  }

  const tokenres = await user.getIdTokenResult();
  let claim = access_level.TALENT;
  if (!!tokenres.claims.admin) {
    claim = access_level.ADMIN;
  } else if (!!tokenres.claims.recruiter) {
    claim = access_level.RECRUITER;
  }

  if (docSnap.exists()) {
    const u = docSnap.data();
    const usr = {
      uid: user.uid,
      access_level: claim,
      email: u.email,
      first_name: u.first_name,
      last_name: u.last_name,
      pic_url: u.pic_url,
      short_bio: u.short_bio,
    };
    if (claim == access_level.TALENT) {
      return {
        ...usr,
        address_postcode: u.address_postcode,
        availability: u.availability,
        birth_date: u.birth_date,
        canton: u.canton,
        city_of_residence: u.city_of_residence,
        job_role: u.job_role,
        skills: skills,
        programming_languages: programmmingLanguages,
        salary_range: {
          start: u.salary_range.start,
          end: u.salary_range.end,
        },
        work_experience: u.work_experience,
      };
    }
    return usr;
  } else {
    console.log('No such document!');
    return null;
  }
};

export { userMapper };
