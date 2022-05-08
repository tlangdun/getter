import {collection, doc, getDoc, getDocs, setDoc, where, query} from 'firebase/firestore';
import {db, storage} from '../../services/firebaseconfig';
import {access_level, GetterUser} from '../../store/models/userModel';
import {QueryFilter} from "../../store/models/queryModel";

export const getRecruiterByUserId = async (userId: string): Promise<GetterUser> => {
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

export const getTalentByUserId = async (userId: string): Promise<GetterUser> => {
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

// ToDo: ToDo :^)
export const updateRecruiterByUserId = async (recruiterForm: GetterUser): Promise<boolean> => {
    if (!recruiterForm) return false;

    const docRef = doc(db, `Users/${recruiterForm?.uid}`);
    const docSnap = await setDoc(docRef, recruiterForm);
    return true;
}

export const getDocumentsByFilter = async (recruiterForm: QueryFilter): Promise<GetterUser[]> => {
    const ref = collection(db, 'Users');

    const queryFilters = []

    if (recruiterForm.availability != null)
        queryFilters.push(where('availability', '>=', recruiterForm.availability),)

    if (recruiterForm.canton != null)
        queryFilters.push(where('canton', '==', recruiterForm.canton),)

    if (recruiterForm.job_role != null)
        queryFilters.push(where('job_role', '==', recruiterForm.job_role),)

    if (recruiterForm.skills?.length !== 0){
        console.log("addskillsquery " + recruiterForm.skills)
        queryFilters.push(where('skills', 'array-contains-any', recruiterForm.skills),)
    }
    if (recruiterForm.programming_languages?.length !== 0) {
        console.log("addplquery ")
        queryFilters.push(where('programming_languages', 'array-contains-any', recruiterForm.programming_languages),)
    }
    if (recruiterForm.spoken_languages?.length !== 0)
        queryFilters.push(where('spoken_languages', 'array-contains-any', recruiterForm.spoken_languages),)

    if (recruiterForm.work_experience != null)
        queryFilters.push(where('work_experience', '>=', recruiterForm.work_experience),)


    const qResult = query(ref, ...queryFilters);

    const returnList: Array<GetterUser> = [];

    return getDocs(qResult).then(result => {
        result.forEach(r => {
            const u = r.data();
            returnList.push({
                uid: u.userId,
                access_level: u.access_level,
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
                skills: u.skills,
                programming_languages: u.programmmingLanguages,
                salary_range: {
                    start: u.salary_range.start,
                    end: u.salary_range.end,
                },
                work_experience: u.work_experience,
            })
        })
        return returnList;
    });
}
