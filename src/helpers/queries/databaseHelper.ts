import {collection, doc, getDoc, getDocs, setDoc, where, query, orderBy, limit} from 'firebase/firestore';
import {db, storage} from '../../services/firebaseconfig';
import {access_level, GetterUser, WorkExperience} from '../../store/models/userModel';
import {QueryFilter} from "../../store/models/queryModel";
import {DocumentSnapshot} from "@firebase/firestore";
import {DocumentData} from "@firebase/firestore";

// ToDo:
// Already Done by Martin:
// fileToStorage - For picture uploads z.B. in Storage
// updateFirebaseUser
// updateReduxUser -  nix mit DB zu tun

export const getRecruiterByUserId = async (database:any, userId: string): Promise<GetterUser> => {
    const docRef = doc(database, 'Recruiters', userId)
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

export const getTalentByUserId = async (database:any, userId: string): Promise<GetterUser> => {
    const docRef = doc(database, `Users/${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const u = docSnap.data();
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
            skills: u.skills,
            spoken_languages: u.spoken_languages,
            programming_languages: u.programming_languages,
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

export const updateRecruiterByUserId = async (recruiterForm: GetterUser): Promise<boolean> => {
    if (!recruiterForm) return false;

    const docRef = doc(db, `Users/${recruiterForm?.uid}`);
    const docSnap = await setDoc(docRef, recruiterForm);
    return true;
}

export const getDocumentsByFilter = async (database:any, recruiterFilter: QueryFilter): Promise<GetterUser[]> => {
    let skillsIds:string[] = []
    let spokenLanguagesIds:string[] = []
    let programmingLanguagesIds:string[] = []
    let jobRolesIds:string[] = []
    let countriesIds:string[] = []
    let cantonsIds:string[] = []
    let filtersSet:boolean = false;
    const returnList: Array<GetterUser> = [];


    // Skills Filter
    if (recruiterFilter.skills!= null && recruiterFilter.skills?.length !== 0){
        filtersSet = true;
        let skillsIdsCollection:string[][] = []

        for(let i = 0; i < recruiterFilter.skills.length; i++){
            const docRef = collection(database, `Skills/${recruiterFilter.skills[i]}/Users`);
            const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
            skillsIdsCollection.push(docSnap)
        }
        skillsIds = skillsIdsCollection.reduce((a, b) => a.filter(c => b.includes(c)));
        if(skillsIds.length==0)return [];
    }
    // Spoken_languages Filter
    if (recruiterFilter.spoken_languages!= null && recruiterFilter.spoken_languages?.length !== 0){
        filtersSet = true;
        let filterCollection:string[][] = []

        for(let i = 0; i < recruiterFilter.spoken_languages.length; i++){
            const docRef = collection(database, `Spoken_languages/${recruiterFilter.spoken_languages[i]}/Users`);
            const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
            filterCollection.push(docSnap)
        }
        spokenLanguagesIds = filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
        if(spokenLanguagesIds.length==0)return [];
    }
    // Programming_languages Filter
    if (recruiterFilter.programming_languages!= null && recruiterFilter.programming_languages?.length !== 0){
        filtersSet = true;
        let filterCollection:string[][] = []

        for(let i = 0; i < recruiterFilter.programming_languages.length; i++){
            const docRef = collection(database, `Programming_languages/${recruiterFilter.programming_languages[i]}/Users`);
            const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
            filterCollection.push(docSnap)
        }
        programmingLanguagesIds = filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
        if(programmingLanguagesIds.length==0)return [];
    }
    // Job_role Filter
    if (recruiterFilter.job_role!= null && recruiterFilter.job_role?.length !== 0){
        filtersSet = true;
        let filterCollection:string[][] = []

        for(let i = 0; i < recruiterFilter.job_role.length; i++){
            const docRef = collection(database, `Job_role/${recruiterFilter.job_role[i]}/Users`);
            const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
            filterCollection.push(docSnap)
        }

        jobRolesIds = filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
        if(jobRolesIds.length==0)return [];
    }
    // Countries Filter
    if (recruiterFilter.country!= null && recruiterFilter.country?.length !== 0){
        filtersSet = true;
        let filterCollection:string[][] = []

        for(let i = 0; i < recruiterFilter.country.length; i++){
            const docRef = collection(database, `Countries/${recruiterFilter.country[i]}/Users`);
            const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
            filterCollection.push(docSnap)
        }

        countriesIds = filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
        if(countriesIds.length==0)return [];
    }
    // Canton Filter
    if (recruiterFilter.country!= null && recruiterFilter.country?.length !== 0 &&
        recruiterFilter.canton!= null && recruiterFilter.canton?.length !== 0){
        filtersSet = true;
        let filterCollection:string[][] = []

        for(let i = 0; i < recruiterFilter.canton.length; i++){
            const docRef = collection(database, `Countries/${recruiterFilter.country[i]}/Region/${recruiterFilter.canton[i]}/Users`);
            const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
            filterCollection.push(docSnap)
        }

        cantonsIds = filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
        if(cantonsIds.length==0)return [];
    }

    // get intersection from all ID's
    let arrayOfIDArrays:string[][] = [];
    if(skillsIds.length > 0)arrayOfIDArrays.push(skillsIds);
    if(spokenLanguagesIds.length > 0)arrayOfIDArrays.push(spokenLanguagesIds);
    if(programmingLanguagesIds.length > 0)arrayOfIDArrays.push(programmingLanguagesIds);
    if(jobRolesIds.length > 0)arrayOfIDArrays.push(jobRolesIds);
    if(countriesIds.length > 0)arrayOfIDArrays.push(countriesIds);
    if(cantonsIds.length > 0)arrayOfIDArrays.push(cantonsIds);

    if(arrayOfIDArrays.length == 0 && filtersSet) return [];

    // Get all Documents from ID List
    let listDocs:DocumentSnapshot[] = [];
    if(filtersSet){
        let intersectionIDs = arrayOfIDArrays.reduce((a, b) => a.filter(c => b.includes(c)));

        for(let i = 0; i < intersectionIDs.length; i++){
            let document:DocumentSnapshot = await getDoc(doc(database, `Users/${intersectionIDs[i]}`));


            const data = document.data();
            if (!data) continue;

            if (recruiterFilter.availability != null && data.availability !== undefined && data.availability < recruiterFilter.availability) continue;

            // ToDo: not rly working right now!!! work_experience atm isch eifach öppis bruched iwie Jahre det drin
            if (recruiterFilter.work_experience != null) continue;

            if(document.data())
            listDocs.push(document);
        }
    }
    else{
        const ref = collection(db, 'Users');
        const queryFilters = []

        if (recruiterFilter.availability != null && recruiterFilter.availability  > 0){
            console.log("availability set");
            filtersSet = true;
            queryFilters.push(where('availability', '>=', recruiterFilter.availability),)
            console.log(recruiterFilter.availability)
        }
        //ToDo: Work Experience atm eifach öppis. Funktioniert ned
        if (recruiterFilter.work_experience != null){
            console.log("work_experience set");
            filtersSet = true;
            queryFilters.push(where('work_experience', '>=', recruiterFilter.work_experience),)
        }

        const qResult = query(ref, ...queryFilters);

        await getDocs(qResult).then(res => res.docs
            .map(documentSnapshot => documentSnapshot)
            .forEach(r => returnList.push(mapDataToGetterUser(r.id, r.data())))
        );
        return returnList;
    }

    if (!filtersSet){
        console.log("NO FILTER SET");
        const ref = collection(db, 'Users');

        const qResult = query(ref, orderBy("first_name", "desc"), limit(8));
        getDocs(qResult).then(res => {res.forEach(r => listDocs.push(r))});
    }

    // intersectionIDs
    for (const [key, value] of listDocs.entries()) {
        console.log("Result:")
        console.log(key + "" + value)
    }

    listDocs.forEach(r => {
        const u = r.data()
        if(u) returnList.push(mapDataToGetterUser(r.id, u));
    })
    return returnList;

}

function mapDataToGetterUser(uid: string, documentData: DocumentData):GetterUser{
    let user:GetterUser;
    user = {
        uid: uid,
        access_level: access_level.TALENT,
        email: documentData.email,
        first_name: documentData.first_name,
        last_name: documentData.last_name,
        pic_url: documentData.pic_url,
        short_bio: documentData.short_bio,
        address_postcode: documentData.address_postcode,
        availability: documentData.availability,
        birth_date: documentData.birth_date,
        canton: documentData.canton,
        city_of_residence: documentData.city_of_residence,
        job_role: documentData.job_role,
        skills: documentData.skills,
        programming_languages: documentData.programming_languages,
        spoken_languages: documentData.spoken_languages,
        salary_range: {
            start: documentData.salary_range.start,
            end: documentData.salary_range.end,
        },
        work_experience: documentData.work_experience}

    return user;
}
