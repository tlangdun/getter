import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, CollectionReference, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseconfig';

// export async function getRecruiterQueryList(): Promise<string[]>{
//     const res: string[] = []
//     const auth = getAuth();
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//           // User is signed in, see docs for a list of available properties
//           // https://firebase.google.com/docs/reference/js/firebase.User
//           const uid = user.uid;
//           const queryRef = collection(db, `Recruiters/${uid}/Queries`);
//           const names = getDocsFromCollection(queryRef)
//           return names
//         }
//       });
//       return res
// }

export async function getRecruiterQueryList(){
  const queryRef = collection(db, `Recruiters/mVnIMMnXAF9s3Mrs5UJs/Queries`);
  const querySnapshot = await getDocs(queryRef)
  const names = querySnapshot.docs.map(d => d.id)
  const newList = []
  for (let i = 0; i < names.length; i++) {
    newList.push({"name": names[i], "id": i.toString()})
    
  } 
  db.off();

  return newList
}