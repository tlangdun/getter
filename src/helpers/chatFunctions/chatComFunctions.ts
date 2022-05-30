import {getAuth} from 'firebase/auth';
import {collection, doc, getDoc, getDocs, addDoc, Timestamp, setDoc} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import {firestore} from "firebase-admin";
import firebase from "firebase/compat";
import {data} from "autoprefixer";


export async function readSingleDoc(d: any) {
    const mySnapshot = await getDoc(d)
    if (mySnapshot.exists()) {
        const docData = mySnapshot.data();
        //console.log(`My data is ${JSON.stringify(docData)}`)
        //console.log(docData)
        return docData
    }
}

export async function getColl(col: any) {
    return
}

export async function getCollection(col: any) {
    getDocs(col)
        .then((snapshot) => {
            //TS req -> what should be in the list, adjust
            //if you want something else than string
            const users: { timestamp: firestore.Timestamp, id: string }[] = []
            snapshot.docs.forEach((doc: any) => {
                //basically whatever you want to grab from the document
                users.push({...doc.data(), id: doc.id})
            })
            return users
            //console.log(sortByTimestamp(users))
        })
        .catch(err => {
            //replace with log entry
            console.log(err.message)
        })
}


const sortByTimestamp = (l: Array<Object>) => {
    return l.sort((a: any, b: any) => (a.timestamp > b.timestamp) ? 1 : -1)
}

const getReceiversUID = (senderUID: string) => {

    const messageRef = collection(db, 'Chat_log')

    return getDocs(messageRef)
        .then((snapshot) => {
            const r: { id: string }[] = []
            snapshot.docs.forEach((doc: any) => {
                const idArr = doc.id.split("_")
                if (idArr.includes(senderUID)) {
                    idArr.forEach((element: any) => {
                        if (element !== senderUID) {
                            r.push(element)
                        }
                    })
                }
            })
            return r
        })
        .catch(err => {
            //replace with log entry
            console.log(err.message)
        })
}

const getReceivers = async (receiverIds: Array<string>) => {
    //const receiverArr: {}[] = {}
    const receiverArr: any = {}
    for (let index = 0; index < receiverIds.length; index++) {
        //let receiver = {uid: receiverIds[index], ...(await getNameByUID(receiverIds[index]))}
        //receiverArr.push({uid: receiverIds[index], ...(await getNameByUID(receiverIds[index]))})
        //console.log("THIS SHOULD BE NAMESSSSSSS : , ", await getNameByUID((receiverIds[index])))
        receiverArr[receiverIds[index]] = (await getNameByUID(receiverIds[index]))
    }
    return receiverArr
}


const tt = async () => {
    //const receiverArr: {}[] = {}
    const user: any = await getAuth().currentUser?.uid
    //await new Promise(r => setTimeout(r, 3000));
    console.log("This user bro : ", user)
    const receiverIds: any = await getReceiversUID(user)
    console.log("all them ids : ", receiverIds)
    const receiverArr: any = {}
    for (let index = 0; index < receiverIds.length; index++) {
        //let receiver = {uid: receiverIds[index], ...(await getNameByUID(receiverIds[index]))}
        //receiverArr.push({uid: receiverIds[index], ...(await getNameByUID(receiverIds[index]))})
        //console.log("THIS SHOULD BE NAMESSSSSSS : , ", await getNameByUID((receiverIds[index])))
        receiverArr[receiverIds[index]] = (await getNameByUID(receiverIds[index]))
    }
    console.log("this empty?? : ", receiverArr)
    return [receiverArr]
}

const another_tt = async (receiverIds: any) => {
    const receiverArr: any = {}
    for (let index = 0; index < receiverIds.length; index++) {
        //let receiver = {uid: receiverIds[index], ...(await getNameByUID(receiverIds[index]))}
        //receiverArr.push({uid: receiverIds[index], ...(await getNameByUID(receiverIds[index]))})
        receiverArr[receiverIds[index]] = (await getNameByUID(receiverIds[index]))
    }
    console.log("this empty?? : ", receiverArr)
    return receiverArr
}

const superTest = async (sender: string, rec: string, setLoad: Function, load: string) => {
    //console.log("this is sender : ", sender)
    //console.log("this is rec : ", rec)
    const huso = await recMes(sender, rec)
    const y = (sortByTimestamp(await idToMessageMapper(huso, sender, rec)))
    //console.log("lezzz seee whattaa happens:", y)
    //setShow(!show)
    //setLoad("Okey")
    //setLoad("")
    //setRec(rec)
    return y
}

const getNameByUID = async (uid: string) => {
    try {
        const collectionRef = collection(db, 'Users')
        const collectionRefRec = collection(db, 'Recruiters')
        const docRef = doc(collectionRef, `${uid}`)
        const docRefRec = doc(collectionRefRec, `${uid}`)
        const nameDoc: any = await readSingleDoc(docRef)
        const nameDocRef: any = await readSingleDoc(docRefRec)
        if (nameDoc !== undefined) {
            return [nameDoc.first_name, nameDoc.last_name]
        }
        return [nameDocRef.first_name, nameDocRef.last_name]
    } catch (err) {
        return ""
    }

}

const idToMessageMapper = async (l: any, uidSender: string, uidRec: string) => {
    let m: any = []
    //const mRef = collection(db, `Chat_log/${uidSender}_${uidRec}/Messages`)
    console.log("WTHIHI WE TRTY THIS : ", l)
    if (l !== undefined) {
        const mRef = l[0]
        for (let i = 1; i < l.length; i++) {
            m.push(await readSingleDoc(doc(mRef, l[i])))
        }
    }
    /*l.map(async (t:any) =>{
        console.log(t)
        const ok = getDoc(doc(mRef, t))
        m.push(ok)
    })*/
    return m
}

const checkIfDocExists = async (messagesRef: any) => {
    return getDocs(messagesRef).then((s) => {
        return s.docs.length !== 0
    })
}

const recMes = async (uidSender: string, uidRec: string) => {
    let messagesRef = collection(db, `Chat_log/${uidSender}_${uidRec}/Messages`)
    let mrefu = collection(db, `Chat_log/${uidRec}_${uidSender}/Messages`)

    /*const docExistence = await getDocs(messagesRef).then((s) => {
        return s.docs.length !== 0
    })*/

    if (!await checkIfDocExists(messagesRef)) {
        messagesRef = mrefu
    }
    if (messagesRef !== undefined) {
        return getDocs(messagesRef)
            .then((snapshot) => {
                const r: any = []
                if (snapshot.docs.length !== 0) {
                    r.push(messagesRef)
                    snapshot.docs.forEach((docy: any) => {
                        //const a: any = (await readSingleDoc(doc(messagesRef, docy.id)))
                        //r.push(doc.id)
                        /*readSingleDoc(doc(messagesRef, docy.id)).then((t) =>{
                            r.push(t)
                        })*/
                        r.push(docy.id)
                    })
                    return r
                }
            })
            .catch(err => {
                //replace with log entry
                console.log(err.message)
            })
    }
}

const receiveMessages = async (uid: string) => {

    const messageRef = collection(db, `Chat_log/${uid}/Messages`)


    const getCollection = getDocs(messageRef)
        .then((snapshot) => {
            //TS req -> what should be in the list, adjust
            //if you want something else than string
            const users: { timestamp: firestore.Timestamp, id: string }[] = []
            snapshot.docs.forEach((doc: any) => {
                //basically whatever you want to grab from the document
                users.push({...doc.data(), id: doc.id})
            })
            return users
            //console.log(sortByTimestamp(users))
        })
        .catch(err => {
            //replace with log entry
            console.log(err.message)
        })
}

/*const checkIfConvoExists = async (uidSender: any, uidRec: any) => {
    const messagesRef = collection(db, `Chat_log`)
    const docRef = doc(messagesRef, `${uidSender}_${uidRec}`)
    const secondDocRef = doc(messagesRef, `${uidRec}_${uidSender}`)
    const docSnap = await getDoc(docRef)
    const secondDocSnap = await getDoc(secondDocRef)

    if (docSnap.exists()) {
        return true
    } else if (secondDocSnap.exists()) {
        return true
    } else{
        return false
    }

}*/

const startMessaging = async (uidSender: any, uidRec: any) => {
    uidSender = await getAuth().currentUser?.uid
    const messagesRef = collection(db, `Chat_log`)
    const docRef = doc(messagesRef, `${uidSender}_${uidRec}`)
    const secondDocRef = doc(messagesRef, `${uidRec}_${uidSender}`)
    const docSnap = await getDoc(docRef)
    const secondDocSnap = await getDoc(secondDocRef)

    if (docSnap.exists()) {
        return true
    } else if (secondDocSnap.exists()) {
        return true
    } else {
        /*const d = await addDoc(collection(db, `Chat_log/${uidSender}_${uidRec}/Messages`), {
            content: `Hello ${uidRec}!`,
            sentBy: uidSender,
            timestamp: Timestamp.now()
        })*/
        const ok = await setDoc(doc(db, 'Chat_log', `${uidSender}_${uidRec}`), {})
        return ok
    }


}

const sendMessage = async (e: React.FormEvent, setFormValue: Function, formValue: string | undefined, loader: string, setReloader: Function, getMessages: Function, uidSender: string, uidRec: string) => {
    e.preventDefault();
    setFormValue('')

    const user = getAuth().currentUser?.uid;


    //console.log("TESTING REAL HARD : ", huso)
    //console.log("EYY OYOO ID shit : ", sortByTimestamp(await idToMessageMapper(huso)))
    ///console.log()

    let mRef = collection(db, `Chat_log/${uidSender}_${uidRec}/Messages`)
    if (!await checkIfDocExists(mRef)) {
        mRef = collection(db, `Chat_log/${uidRec}_${uidSender}/Messages`)
    }
    const nameRef = collection(db, 'Users')
    const d = doc(mRef, `${uidSender}_${uidRec}?`)
    const name = doc(nameRef, `${user}`)
    let firstName: any = await readSingleDoc(name)

    /*await addDoc(doc(db, "Chat_log/Userid1_Userid2/Messages", "o"), {
        content: "Los Angeles",
        sentBy: "ok",
        timestamp: Timestamp.now()
    });*/

    //console.log(formValue)
    const docRef = await addDoc(mRef, {
        content: formValue,
        sentBy: user,
        timestamp: Timestamp.now()
    })

    console.log("this is test : ", docRef.id)
    //const rname: any = await getReceiversUID('Userid2')
    //console.log(rname)
    //const tets = await getReceivers(['KtDtaldROMaQ93TBPCTjqTNs1rK2'])
    //console.log(await getNameByUID('KtDtaldROMaQ93TBPCTjqTNs1rK2'))
    //console.log("WE GUCCi? ", tets['KtDtaldROMaQ93TBPCTjqTNs1rK2'])
    //console.log(await tt())
    //readSingleDoc(d)
    //getCollection(messageRef)
    //let g: any = await readSingleDoc(d)
    //let c: any = getColl(messageRef)


    //const oker_doker = await getCollection(mRef)
    //const kkk: any = await a
    //console.log(kkk[0].id.split("_"))
    //console.log("lets see cons oker doker :", oker_doker)
    const huso = await recMes(uidSender, uidRec)
    getMessages(sortByTimestamp(await idToMessageMapper(huso, uidSender, uidRec)))
    setReloader('')
    setReloader(loader)
}

export {
    sendMessage,
    getReceiversUID,
    tt,
    recMes,
    sortByTimestamp,
    idToMessageMapper,
    getNameByUID,
    superTest,
    startMessaging,
    another_tt
}