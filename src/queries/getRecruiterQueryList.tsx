import { collection,getDocs } from 'firebase/firestore';
import { db } from '../services/firebaseconfig';

export async function getRecruiterQueryList(){
  const queryRef = collection(db, `Recruiters/mVnIMMnXAF9s3Mrs5UJs/Queries`);
  const querySnapshot = await getDocs(queryRef)
  const names = querySnapshot.docs.map(d => d.id)
  const newList = []
  for (let i = 0; i < names.length; i++) {
    newList.push({"name": names[i], "id": i.toString()})
    
  } 
  return newList
}