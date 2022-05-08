import { collection, CollectionReference, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import {getRecruiterByUserId} from "./databaseHelper";
import {access_level} from "../../store/models/userModel";

const {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
  } = require("@firebase/rules-unit-testing")

const fs = require('fs');
const userId = "KtDtaldROMaQ93TBPCTjqTNs1rK2"

test("Recruiter file created", async()=> {
    let testEnv = await initializeTestEnvironment({
        projectId: "getter-38760",
        firestore: {
          rules: fs.readFileSync("firestore.rules", "utf8"),
          host: "localhost",
          port: 8080
        },
      });

    let alice = testEnv.authenticatedContext("KtDtaldROMaQ93TBPCTjqTNs1rK2");
    const docRef = doc(db, "Recruiters", "KtDtaldROMaQ93TBPCTjqTNs1rK2");
    const ref = await assertSucceeds(setDoc(doc(alice.firestore(), "Recruiters", "KtDtaldROMaQ93TBPCTjqTNs1rK2"), {
        uid: 'KtDtaldROMaQ93TBPCTjqTNs1rK2',
        access_level: access_level.RECRUITER,
        email: 'test@gmail.com',
        first_name: 'Martin',
        last_name: 'Boss',
        pic_url: 'https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f',
        short_bio: 'hello, my name is martin'
      }));
})

test("Recruiter file retrieved", async()=> {
    let testEnv = await initializeTestEnvironment({
        projectId: "getter-38760",
        firestore: {
          rules: fs.readFileSync("firestore.rules", "utf8"),
          host: "localhost",
          port: 8080
        },
      });
    let alice = testEnv.authenticatedContext("KtDtaldROMaQ93TBPCTjqTNs1rK2");
    const actual = await assertSucceeds(getRecruiterByUserId(alice.firestore(),userId))
    const expected = {
        uid: 'KtDtaldROMaQ93TBPCTjqTNs1rK2',
        access_level: access_level.RECRUITER,
        email: 'test@gmail.com',
        first_name: 'Martin',
        last_name: 'Boss',
        pic_url: 'https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f',
        short_bio: 'hello, my name is martin'
    }
    expect(actual).toStrictEqual(expected)
})