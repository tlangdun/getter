import {getAuth} from 'firebase/auth';
import {addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import {firestore} from "firebase-admin";
import {useCollectionData} from "react-firebase-hooks/firestore";


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
    const l = useCollectionData(collection(db, '/Chat_log/DiGPNLhkqoRQtZ5wnhDGmqxbwTn2_KtDtaldROMaQ93TBPCTjqTNs1rK2/Messages'))
    console.log("DOES THIS WORK AHARD OR okkok")
    return l
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


const sortByTimestamp = (l: any) => {
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
    const user: any = await getAuth().currentUser?.uid
    const receiverIds: any = await getReceiversUID(user)
    const receiverArr: any = {}

    for (let index = 0; index < receiverIds.length; index++) {
        //let receiver = {uid: receiverIds[index], ...(await getNameByUID(receiverIds[index]))}
        //receiverArr.push({uid: receiverIds[index], ...(await getNameByUID(receiverIds[index]))})
        //console.log("THIS SHOULD BE NAMESSSSSSS : , ", await getNameByUID((receiverIds[index])))
        receiverArr[receiverIds[index]] = (await getNameByUID(receiverIds[index]))
    }

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
    const huso = await recMes(sender, rec)
    return (sortByTimestamp(await idToMessageMapper(huso, sender, rec)))
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

    if (l !== undefined) {
        const mRef = l[0]
        for (let i = 1; i < l.length; i++) {
            m.push(await readSingleDoc(doc(mRef, l[i])))
        }
    }

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
        return await setDoc(doc(db, 'Chat_log', `${uidSender}_${uidRec}`), {})
    }


}

const sendMessage = async (e: React.FormEvent, setFormValue: Function, formValue: string | undefined, loader: string, setReloader: Function, getMessages: Function, uidSender: string, uidRec: string) => {
    e.preventDefault();
    setFormValue('')

    const user = getAuth().currentUser?.uid;

    let mRef = collection(db, `Chat_log/${uidSender}_${uidRec}/Messages`)
    if (!await checkIfDocExists(mRef)) {
        mRef = collection(db, `Chat_log/${uidRec}_${uidSender}/Messages`)
    }
    //const nameRef = collection(db, 'Users')
    //const d = doc(mRef, `${uidSender}_${uidRec}?`)
    //const name = doc(nameRef, `${user}`)
    //let firstName: any = await readSingleDoc(name)

    const docRef = await addDoc(mRef, {
        content: formValue,
        sentBy: user,
        timestamp: Timestamp.now()
    })

    //setReloader('')
    //setReloader(loader)
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