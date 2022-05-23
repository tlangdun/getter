import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseconfig';
import { access_level, GetterUser } from '../store/models/userModel';

const getUser = async (uid: string): Promise<GetterUser> => {

  const docSnapUsr = await getDoc(doc(db, 'Users', uid));
  const docSnapRec = await getDoc(doc(db, 'Recruiters', uid));

  if (docSnapUsr.exists()) {
    const skillsRef = collection(db, `Users/${uid}/skills`);
    const progsRef = collection(db, `Users/${uid}/programming_languages`);
    const langsRef = collection(db, `Users/${uid}/spoken_languages`);
    const skills = (await getDocs(skillsRef)).docs.map((d) => d.id);
    const programmmingLanguages = (await getDocs(progsRef)).docs.map(
      (d) => d.id
    );
    const spoken_languages = (await getDocs(langsRef)).docs.map((d) => d.id);
    const data = docSnapUsr.data();
    const u: GetterUser = {
      uid: uid,
      access_level: access_level.TALENT,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      pic_url: data.pic_url,
      short_bio: data.short_bio,
      address_postcode: data.address_postcode,
      availability: data.availability,
      birth_date: data.birth_date,
      country: data.country,
      canton: data.canton,
      city_of_residence: data.city_of_residence,
      job_role: data.job_role,
      skills: skills,
      programming_languages: programmmingLanguages,
      spoken_languages: spoken_languages,
      salary_range: {
        start: data.salary_range.start,
        end: data.salary_range.end,
      },
      work_experience: data.work_experience,
    };
    return u;
  }

  if (docSnapRec.exists()) {
    const data = docSnapRec.data();
    const u: GetterUser = {
      uid: uid,
      access_level: access_level.RECRUITER,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      pic_url: data.pic_url,
      short_bio: data.short_bio,
    };
    return u;
  }
  return null;
};

export default getUser;