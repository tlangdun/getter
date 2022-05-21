import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseconfig";
import { GetterUser, User } from "../store/models/userModel";
import getUser from "./getUser";

export async function addCandidate(user:GetterUser, newCandidate:string){
    if(user != null && user.access_level === 1) {
        setDoc(doc(db, `Recruiters/${user.uid}/CandidateList`, newCandidate), {
            user: newCandidate,
        });
    } 
}

export async function removeCandidate(user:GetterUser, newCandidate:string){
    if(user != null && user.access_level === 1) {
        deleteDoc(doc(db, `Recruiters/${user.uid}/CandidateList`, newCandidate));
    } 
}

export async function getAllCandidates(user:GetterUser): Promise<User[]> {
    const users:Array<any> = []
    if(user!=null) {
        const candidateRef = collection(db,`Recruiters/${user.uid}/CandidateList`)
        const candidates = (await getDocs(candidateRef)).docs.map((d) => d.id);

        for(const elem of candidates){
            await getUser(elem).then((result) =>{
                if(result!==null) {
                    users.push(result)
                }
            })
        }
    }
    return users;   
}