import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  DocumentSnapshot,
  DocumentData,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import { access_level } from '../../store/models/getterUserModel';

const updateFirebaseUser = async (usr: any): Promise<boolean> => {
  if (usr == null) {
    return false;
  }

  const usrData = mapGetterToFirebaseUser(usr);

  if (usr.access_level == access_level.TALENT) {
    const usrDoc = doc(db, 'Users', usr.uid);
    const currentSnap = await getDoc(usrDoc);

    try {
      await setDoc(usrDoc, usrData);
      // skills
      updateSkills(usr);
      //progLang
      updateProgLangs(usr);
      //spoken languages
      updateSpokenLangs(usr);
      //jobrole
      updateJobRole(usr, currentSnap);
      //country
      updateCountry(usr, currentSnap);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    const usrDoc = doc(db, 'Recruiters', usr.uid);
    setDoc(usrDoc, usrData);
    return true;
  }
};

const mapGetterToFirebaseUser = (usr: any): any => {
  if (usr == null) {
    return null;
  }
  if (usr.access_level == access_level.RECRUITER) {
    return {
      email: usr.email,
      first_name: usr.first_name,
      last_name: usr.last_name,
      pic_url: usr.pic_url,
      short_bio: usr.short_bio,
    };
  }
  if (usr.access_level == access_level.TALENT) {
    return {
      email: usr.email,
      first_name: usr.first_name,
      last_name: usr.last_name,
      pic_url: usr.pic_url,
      short_bio: usr.short_bio,
      address_postcode: usr.address_postcode,
      availability: usr.availability,
      country: usr.country,
      canton: usr.canton,
      city_of_residence: usr.city_of_residence,
      job_role: usr.job_role,
      salary_range: usr.salary_range,
      work_experience: usr.work_experience,
    };
  }
  throw new Error('could not map user to update');
};

const updateSkills = async (usr: any) => {
  const skillsRef = collection(db, `Users/${usr.uid}/skills`);
  const currentSkills = (await getDocs(skillsRef)).docs.map((d) => d.id);
  const skillsToRem: string[] = arrayDiff(currentSkills, usr.skills);
  const skillsToSet: string[] = arrayDiff(usr.skills, currentSkills);
  skillsToRem.forEach((s) => removeSkill(usr.uid, s));
  skillsToSet.forEach((s) => addSkill(usr.uid, s));
};

const updateProgLangs = async (usr: any) => {
  const progsRef = collection(db, `Users/${usr.uid}/programming_languages`);
  const currentProgLangs = (await getDocs(progsRef)).docs.map((d) => d.id);
  const progLangsToRem: string[] = arrayDiff(
    currentProgLangs,
    usr.programming_languages
  );
  const progLangsToset: string[] = arrayDiff(
    usr.programming_languages,
    currentProgLangs
  );
  progLangsToRem.forEach((p) => removeProgLang(usr.uid, p));
  progLangsToset.forEach((p) => addProgLang(usr.uid, p));
};

const updateSpokenLangs = async (usr: any) => {
  const langsRef = collection(db, `Users/${usr.uid}/spoken_languages`);
  const currentLangs = (await getDocs(langsRef)).docs.map((d) => d.id);
  const langsToRem: string[] = arrayDiff(currentLangs, usr.spoken_languages);
  const langsToSet: string[] = arrayDiff(usr.spoken_languages, currentLangs);
  langsToRem.forEach((l) => removeLang(usr.uid, l));
  langsToSet.forEach((l) => addLang(usr.uid, l));
};

const updateJobRole = async (
  usr: any,
  currentSnap: DocumentSnapshot<DocumentData>
) => {
  if (currentSnap.exists()) {
    const currentUsr = currentSnap.data();
    if (currentUsr.job_role != usr.job_role) {
      deleteDoc(doc(db, `Job_roles/${currentUsr.job_role}/Users`, usr.uid));
    }
  }
  setDoc(doc(db, `Job_roles/${usr.job_role}/Users`, usr.uid), {
    user: usr.uid,
  });
};

const updateCountry = async (
  usr: any,
  currentSnap: DocumentSnapshot<DocumentData>
) => {
  if (currentSnap.exists()) {
    const currentUsr = currentSnap.data();
    if (currentUsr.country != usr.country || currentUsr.canton != usr.canton) {
      deleteDoc(
        doc(
          db,
          `Countries/${currentUsr.country}/Region/${currentUsr.canton}/Users`,
          usr.uid
        )
      );
      deleteDoc(doc(db, `Countries/Users`, usr.uid));
    }
  }
  setDoc(
    doc(db, `Countries/${usr.country}/Region/${usr.canton}/Users`, usr.uid),
    {
      user: usr.uid,
    }
  );
  setDoc(doc(db, `Countries/${usr.country}/Users`, usr.uid), {
    user: usr.uid,
  });
};

const addSkill = (uid: string, skill: string) => {
  const userDoc = doc(db, `Users/${uid}/skills`, skill);
  const skillDoc = doc(db, `Skills/${skill}/Users`, uid);
  setDoc(skillDoc, { user: uid });
  setDoc(userDoc, { user: uid });
};

const removeSkill = (uid: string, skill: string) => {
  const userDoc = doc(db, `Users/${uid}/skills`, skill);
  const skillDoc = doc(db, `Skills/${skill}/Users`, uid);
  deleteDoc(userDoc);
  deleteDoc(skillDoc);
};

const addProgLang = (uid: string, progLang: string) => {
  const userDoc = doc(db, `Users/${uid}/programming_languages`, progLang);
  const progDoc = doc(db, `Programming_languages/${progLang}/Users`, uid);
  setDoc(progDoc, { user: uid });
  setDoc(userDoc, { user: uid });
};

const removeProgLang = (uid: string, progLang: string) => {
  const userDoc = doc(db, `Users/${uid}/programming_languages`, progLang);
  const progDoc = doc(db, `Programming_languages/${progLang}/Users`, uid);
  deleteDoc(userDoc);
  deleteDoc(progDoc);
};

const addLang = (uid: string, lang: string) => {
  const userDoc = doc(db, `Users/${uid}/spoken_languages`, lang);
  const langDoc = doc(db, `Spoken_languages/${lang}/Users`, uid);
  setDoc(langDoc, { user: uid });
  setDoc(userDoc, { user: uid });
};

const removeLang = (uid: string, lang: string) => {
  const userDoc = doc(db, `Users/${uid}/spoken_languages`, lang);
  const langDoc = doc(db, `Spoken_languages/${lang}/Users`, uid);
  deleteDoc(langDoc);
  deleteDoc(userDoc);
};

const arrayDiff = (a1: string[], a2: string[]) => {
  return a1.filter((item) => a2.indexOf(item) < 0);
};

export default updateFirebaseUser;
