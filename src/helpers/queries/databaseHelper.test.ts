import { collection, CollectionReference, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import {getDocumentsByFilter, getRecruiterByUserId, getTalentByUserId} from "./databaseHelper";
import {access_level, GetterUser} from "../../store/models/userModel";
import firebase from "firebase/compat";
import {QueryFilter} from "../../store/models/queryModel";

const {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
  } = require("@firebase/rules-unit-testing")

const fs = require('fs');
const projectID = "getter-38760";
let testEnv:any;

test("Recruiter file created", async()=> {
    const userId = "KtDtaldROMaQ93TBPCTjqTNs1rK2"
    let testRecruiter = createRecruiter(userId);
    let dbAuth = testEnv.authenticatedContext(userId).firestore();

    await assertSucceeds(addRecruiterToDB(testRecruiter, userId, dbAuth));
})


test("Recruiter file retrieved", async()=> {
    const userId = "KtDtaldROMaQ93TBPCTjqTNs1rK2"
    let testRecruiter = createRecruiter(userId);
    let dbAuth = testEnv.authenticatedContext(userId).firestore();
    addRecruiterToDB(testRecruiter, userId, dbAuth)

    const actual = await assertSucceeds(getRecruiterByUserId(dbAuth,userId))

    expect(actual).toStrictEqual(testRecruiter)
})

test("Talent file retrieved", async()=> {
    const recruiterUserId = "KtDtaldROMaQ93TBPCTjqTNs1rK2"
    let testRecruiter = createRecruiter(recruiterUserId);
    let dbAuth = testEnv.authenticatedContext(recruiterUserId).firestore();
    addRecruiterToDB(testRecruiter, recruiterUserId, dbAuth);

    const talentUserId = "KtDtaldROMaQ93TBPCTjqTNs1rK3";
    let testTalent = createTalent(talentUserId);

    addSkillGitToDB(dbAuth, talentUserId);
    addSpoken_lanGermanToDB(dbAuth, talentUserId);
    addProg_lanJavaToDB(dbAuth, talentUserId);
    addTalentUsrToDB(testTalent, talentUserId, dbAuth);

    const actual = await assertSucceeds(getTalentByUserId(dbAuth,talentUserId));
    expect(actual).toStrictEqual(testTalent);
})

test("TalentDoc got by getDocumentsByFilter", async()=> {
    const recruiterUserId = "KtDtaldROMaQ93TBPCTjqTNs1rK2"
    let testRecruiter = createRecruiter(recruiterUserId);
    let dbAuth = testEnv.authenticatedContext(recruiterUserId).firestore();
    addRecruiterToDB(testRecruiter, recruiterUserId, dbAuth)

    const talentUserId = "KtDtaldROMaQ93TBPCTjqTNs1rK3"
    let testTalent = createTalent(talentUserId);

    addSkillGitToDB(dbAuth, talentUserId);
    addSpoken_lanGermanToDB(dbAuth, talentUserId);
    addProg_lanJavaToDB(dbAuth, talentUserId);
    addJob_RoleStudentToDB(dbAuth, talentUserId);
    addCountriesSwitzerlandToDB(dbAuth, talentUserId);
    addCantonZurichToDB(dbAuth, talentUserId);

    addTalentUsrToDB(testTalent, talentUserId, dbAuth)

    let filter:QueryFilter = {
        availability: null, // 60 für 60%
        canton: ['Zurich'],
        country: ['Switzerland'],
        job_role: ['Student'],
        skills: ['Git'],
        programming_languages: ['Java'],
        spoken_languages: ['German'],
        work_experience: null, //0, 1-3, 4-6, 7-10+
        salary_min: null,
        salary_max: null
    }

    const actual = await assertSucceeds(getDocumentsByFilter(dbAuth,filter))
    expect(actual[0]).toStrictEqual(testTalent)
    expect(actual.length).toStrictEqual(1)
})

async function initializeTestDB() {
    return await initializeTestEnvironment({
        projectId: projectID,
        firestore: {
            rules: fs.readFileSync("firestore.rules", "utf8"),
            host: "localhost",
            port: 8080
        },
    });
}

beforeEach(async()=>{
    try {
        testEnv = await initializeTestDB();

    }
    catch (e){}
});

// afterEach(async()=>{
//     await testEnv.clearFirestore();
// });

function createRecruiter(userId: string) {
    return {
        uid: userId,
        access_level: access_level.RECRUITER,
        email: 'test@gmail.com',
        first_name: 'Martin',
        last_name: 'Boss',
        pic_url: 'https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f',
        short_bio: 'hello, my name is martin'
    };
}

function createTalent(userId: string) {
    return {
        uid: userId,
        access_level: access_level.TALENT,
        email: 'test@gmail.com',
        first_name: 'Martin',
        last_name: 'Boss',
        pic_url: 'https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f',
        short_bio: 'hello, my name is martin',
        address_postcode: 'Babostrasse 2',
        availability: '80',
        birth_date: '01.01.1970',
        canton: 'ZH',
        city_of_residence: 'Zürich',
        job_role: 'Student',
        skills: ['Git'],
        programming_languages: ['Java'],
        spoken_languages: ['German'],
        salary_range: {
            start: 10000000,
            end: 20000000
        },
        work_experience: ['Arbeitslos']
    };
}

function addRecruiterToDB(testRecruiter: { access_level: access_level; uid: string; short_bio: string; last_name: string; pic_url: string; first_name: string; email: string }, userId: string, dbAuth: any) {

    return setDoc(doc(dbAuth, "Recruiters", userId), {
        uid: testRecruiter.uid,
        access_level: testRecruiter.access_level,
        email: testRecruiter.email,
        first_name: testRecruiter.first_name,
        last_name: testRecruiter.last_name,
        pic_url: testRecruiter.pic_url,
        short_bio: testRecruiter.short_bio
    });
}

function addTalentUsrToDB(testTalent: { job_role: string; short_bio: string; birth_date: string; last_name: string; address_postcode: string; availability: string; salary_range: { start: number; end: number }; access_level: access_level; skills: string[]; uid: string; spoken_languages: string[]; city_of_residence: string; canton: string; pic_url: string; first_name: string; email: string; programming_languages: string[]; work_experience: string[] }, talentUserId: string, dbAuth: any) {

    return setDoc(doc(dbAuth, "Users", talentUserId), {
        uid: testTalent.uid,
        access_level: testTalent.access_level,
        email: testTalent.email,
        first_name: testTalent.first_name,
        last_name: testTalent.last_name,
        pic_url: testTalent.pic_url,
        short_bio: testTalent.short_bio,
        address_postcode: testTalent.address_postcode,
        availability: testTalent.availability,
        birth_date: testTalent.birth_date,
        canton: testTalent.canton,
        city_of_residence: testTalent.city_of_residence,
        job_role: testTalent.job_role,
        skills: testTalent.skills,
        spoken_languages: testTalent.spoken_languages,
        programming_languages: testTalent.programming_languages,
        salary_range: testTalent.salary_range,
        work_experience: testTalent.work_experience
    });
}

function addSkillGitToDB(dbAuth: any, userId: string) {
    return setDoc(doc(dbAuth, `Skills/Git/Users`, userId), {});
}

function addSpoken_lanGermanToDB(dbAuth: any, userId: string) {
    return setDoc(doc(dbAuth, `Spoken_languages/German/Users`, userId), {});
}

function addProg_lanJavaToDB(dbAuth: any, userId: string) {
    return setDoc(doc(dbAuth, `Programming_languages/Java/Users`, userId), {});
}

function addJob_RoleStudentToDB(dbAuth: any, userId: string) {
    return setDoc(doc(dbAuth, `Job_role/Student/Users`, userId), {});
}

function addCountriesSwitzerlandToDB(dbAuth: any, userId: string) {
    return setDoc(doc(dbAuth, `Countries/Switzerland/Users`, userId), {});
}

function addCantonZurichToDB(dbAuth: any, userId: string) {
    return setDoc(doc(dbAuth, `Countries/Switzerland/Region/Zurich/Users`, userId), {});
}
// addCantonZurichToDB