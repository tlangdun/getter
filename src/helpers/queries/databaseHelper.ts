import {collection, doc, getDoc, getDocs, setDoc, where, query, orderBy, limit} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import {access_level, GetterUser} from '../../store/models/userModel';
import {QueryFilter} from "../../store/models/queryModel";
import {DocumentSnapshot, DocumentData, QueryConstraint} from "@firebase/firestore";

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
    await setDoc(docRef, recruiterForm);
    return true;
}

async function filterByCountry(recruiterFilter: QueryFilter, database: any) {
    let filterCollection: string[][] = []

    for (let country of recruiterFilter.country!) {
        const docRef = collection(database, `Countries/${country}/Users`);
        const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
        filterCollection.push(docSnap)
    }

    return filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
}

async function filterByCanton(recruiterFilter: QueryFilter, database: any) {
    let filterCollection: string[][] = []

    for (let i = 0; i < recruiterFilter.canton!.length; i++) {
        const docRef = collection(database, `Countries/${recruiterFilter.country![i]}/Region/${recruiterFilter.canton![i]}/Users`);
        const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
        filterCollection.push(docSnap)
    }

    return filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
}

async function filterByJobRole(recruiterFilter: QueryFilter, database: any) {
    let filterCollection: string[][] = []

    for (let job_role of recruiterFilter.job_role!) {
        const docRef = collection(database, `Job_roles/${job_role}/Users`);
        const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
        filterCollection.push(docSnap)
    }

    return filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
}

async function filterByProgrammingLanguages(recruiterFilter: QueryFilter, database: any) {
    let filterCollection: string[][] = []

    for (let programming_language of recruiterFilter.programming_languages!) {
        const docRef = collection(database, `Programming_languages/${programming_language}/Users`);
        const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
        filterCollection.push(docSnap)
    }
    return filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
}

async function filterBySpokenLanguages(recruiterFilter: QueryFilter, database: any) {
    let filterCollection: string[][] = []
    for (let spoken_language of recruiterFilter.spoken_languages!) {
        const docRef = collection(database, `Spoken_languages/${spoken_language}/Users`);
        const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
        filterCollection.push(docSnap)
    }
    return filterCollection.reduce((a, b) => a.filter(c => b.includes(c)));
}

async function filterBySkills(recruiterFilter: QueryFilter, database: any) {
    let skillsIdsCollection: string[][] = []

    for (let skill of recruiterFilter.skills!) {
        const docRef = collection(database, `Skills/${skill}/Users`);
        const docSnap = (await getDocs(docRef)).docs.map((d) => d.id);
        skillsIdsCollection.push(docSnap)
    }
    return skillsIdsCollection.reduce((a, b) => a.filter(c => b.includes(c)));
}

function intersectionOfIds(skillsIds: string[], spokenLanguagesIds: string[], programmingLanguagesIds: string[], jobRolesIds: string[], countriesIds: string[], cantonsIds: string[]) {
    let arrayOfIDArrays: string[][] = [];

    if (skillsIds.length > 0) arrayOfIDArrays.push(skillsIds);
    if (spokenLanguagesIds.length > 0) arrayOfIDArrays.push(spokenLanguagesIds);
    if (programmingLanguagesIds.length > 0) arrayOfIDArrays.push(programmingLanguagesIds);
    if (jobRolesIds.length > 0) arrayOfIDArrays.push(jobRolesIds);
    if (countriesIds.length > 0) arrayOfIDArrays.push(countriesIds);
    if (cantonsIds.length > 0) arrayOfIDArrays.push(cantonsIds);

    return arrayOfIDArrays.reduce((a, b) => a.filter(c => b.includes(c)));
}

async function getDocumentsByIds(intersectionIDs: string[], database: any, recruiterFilter: QueryFilter, listDocs: DocumentSnapshot[]) {
    for (let i = 0; i < intersectionIDs.length; i++) {
        let document: DocumentSnapshot = await getDoc(doc(database, `Users/${intersectionIDs[i]}`));

        const data = document.data();
        if (!data) continue;

        if (recruiterFilter.availability != null && data.availability !== undefined && data.availability < recruiterFilter.availability) continue;

        if (recruiterFilter.work_experience != null) continue;

        if (document.data())
            listDocs.push(document);
    }
}

function filterByAvailability(recruiterFilter: QueryFilter, filtersSet: boolean, queryFilters: any[]) {
    if (recruiterFilter.availability != null && recruiterFilter.availability > 0) {
        filtersSet = true;
        queryFilters.push(where('availability', '>=', recruiterFilter.availability),)
    }
    if (recruiterFilter.work_experience != null) {
        filtersSet = true;
        queryFilters.push(where('work_experience', '>=', recruiterFilter.work_experience),)
    }
    return filtersSet;
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
        skillsIds = await filterBySkills(recruiterFilter, database);
        if(skillsIds.length==0)return [];
    }
    // Spoken_languages Filter
    if (recruiterFilter.spoken_languages!= null && recruiterFilter.spoken_languages?.length !== 0){
        filtersSet = true;
        spokenLanguagesIds = await filterBySpokenLanguages(recruiterFilter, database);
        if(spokenLanguagesIds.length==0)return [];
    }
    // Programming_languages Filter
    if (recruiterFilter.programming_languages!= null && recruiterFilter.programming_languages?.length !== 0){
        filtersSet = true;
        programmingLanguagesIds = await filterByProgrammingLanguages(recruiterFilter, database);
        if(programmingLanguagesIds.length==0)return [];
    }
    // Job_role Filter
    if (recruiterFilter.job_role!= null && recruiterFilter.job_role?.length !== 0){
        filtersSet = true;
        jobRolesIds = await filterByJobRole(recruiterFilter, database);
        if(jobRolesIds.length==0)return [];
    }
    // Countries Filter
    if (recruiterFilter.country!= null && recruiterFilter.country?.length !== 0){
        filtersSet = true;
        countriesIds = await filterByCountry(recruiterFilter, database);
        if(countriesIds.length==0)return [];
    }
    // Canton Filter
    if (recruiterFilter.country!= null && recruiterFilter.country?.length !== 0 &&
        recruiterFilter.canton!= null && recruiterFilter.canton?.length !== 0){
        filtersSet = true;
        cantonsIds = await filterByCanton(recruiterFilter, database);
        if(cantonsIds.length==0)return [];
    }

    // Get all Documents from ID List
    let listDocs:DocumentSnapshot[] = [];
    if(filtersSet){
        let intersectionIDs = intersectionOfIds(skillsIds, spokenLanguagesIds, programmingLanguagesIds, jobRolesIds, countriesIds, cantonsIds);
        if(intersectionIDs.length == 0) return [];
        await getDocumentsByIds(intersectionIDs, database, recruiterFilter, listDocs);
    }
    else{
        let queryFilters: QueryConstraint[] = []
        filtersSet = filterByAvailability(recruiterFilter, filtersSet, queryFilters);

        const ref = collection(db, 'Users');
        let qResult = query(ref, ...queryFilters);

        if(filtersSet && queryFilters.length == 0){
            return [];
        }
        else if(!filtersSet) {
            qResult = query(ref, orderBy("first_name", "desc"), limit(8));
        }

        await getDocs(qResult).then(res => res.docs
            .map(documentSnapshot => documentSnapshot)
            .forEach(r => returnList.push(mapDataToGetterUser(r.id, r.data())))
        );

        return returnList;
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
