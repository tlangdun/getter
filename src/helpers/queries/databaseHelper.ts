import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import { access_level, GetterRecruiter, GetterTalent } from '../../store/models/userModel';
import {user} from "firebase-functions/lib/providers/auth";

const getRecruiterByUserId = async (userId: string):Promise<GetterRecruiter> => {
    const docRef = doc(db, `Users/${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const u = docSnap.data();
        const usr = {
            uid: userId,
            access_level: access_level.RECRUITER,
            email: u.email,
            first_name: u.first_name,
            last_name: u.last_name,
            pic_url: u.pic_url,
            short_bio: u.short_bio
        };

        return usr;
    } else {
    console.log(`No User By UserId: ${userId}!`);
        return null;
    }
}