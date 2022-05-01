import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import { access_level, GetterUser } from '../../store/models/userModel';
import {user} from "firebase-functions/lib/providers/auth";
import firebase from "firebase/compat";
import {firestore} from "firebase-admin";

const getRecruiterByUserId = async (userId: string):Promise<GetterUser> => {
    const docRef = doc(db, `Users/${userId}`)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const u = docSnap.data();
        return {
            uid: userId,
            access_level: access_level.RECRUITER,
            email: u.email,
            first_name: u.first_name,
            last_name: u.last_name,
            pic_url: u.pic_url,
            short_bio: u.short_bio
        };
    } else {
    console.log(`No User By UserId: ${userId}!`);
        return null;
    }
}

const getTalentByUserId = async (userId: string):Promise<GetterUser> => {
    const docRef = doc(db, `Users/${userId}`);
    const docSnap = await getDoc(docRef);

    let skills: string[];
    let programmmingLanguages: string[];

    const skillsRef = collection(db, `Users/${userId}/skills`);
    const progsRef = collection(db, `Users/${userId}/programming_languages`);

    try {
        skills = (await getDocs(skillsRef)).docs.map((d) => d.id);
    } catch (error) {
        console.log(`No Skills By UserId: ${userId}!`);
        skills = [];
    }
    try {
        programmmingLanguages = (await getDocs(progsRef)).docs.map((d) => d.id);
    } catch (error) {
        console.log(`No Programming languages By UserId: ${userId}!`);
        programmmingLanguages = [];
    }

    if (docSnap.exists()) {
        const u = docSnap.data();
        console.log('DOCSNAP.DATA')
        console.log(docSnap.data())
        return {
            uid: userId,
            access_level: access_level.TALENT,
            email: u.email,
            first_name: u.first_name,
            last_name: u.last_name,
            pic_url: u.pic_url,
            short_bio: u.short_bio,
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
    } else {
        console.log(`No User By UserId: ${userId}!`);
        return null;
    }
}

const updateRecruiterByUserId = async (recruiterForm: GetterUser): Promise<boolean> => {
    if(!recruiterForm)return false;

    const docRef = doc(db, `Users/${recruiterForm?.uid}`);
    const docSnap = await setDoc(docRef, recruiterForm);
    return true;
}

export {getTalentByUserId, getRecruiterByUserId};