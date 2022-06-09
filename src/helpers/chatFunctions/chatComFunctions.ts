import {getAuth} from 'firebase/auth';
import {addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp} from 'firebase/firestore';
import {db} from '../../services/firebaseconfig';
import React from "react";

/**
 * Reads a document from firestore and returns it's data.
 *
 * @param docRef is a firestore document reference
 */
export async function readSingleDoc(docRef: any) {
    const mySnapshot = await getDoc(docRef)
    if (mySnapshot.exists()) {
        return mySnapshot.data()
    }
}

/**
 * Sorts and returns a list with objects that contain timestamp as a field.
 * The order is ascending.
 *
 * @param objectList is a list with objects that contain the field timestamp
 */
const sortByTimestamp = (objectList: any) => {
    return objectList.sort((a: any, b: any) => (a.timestamp > b.timestamp) ? 1 : -1)
}

/**
 * A getter for all receiver ids given a specific sender id.
 * Returns a list of ids of all receivers.
 *
 * @param senderId the id of the sender
 */
const getReceiverIds = (senderId: string) => {

    const messageRef = collection(db, 'Chat_log')

    return getDocs(messageRef)
        .then((snapshot) => {
            const receiverIds: { id: string }[] = []
            snapshot.docs.forEach((doc: any) => {
                const idArr = doc.id.split("_")
                if (idArr.includes(senderId)) {
                    idArr.forEach((element: any) => {
                        if (element !== senderId) {
                            receiverIds.push(element)
                        }
                    })
                }
            })
            return receiverIds
        })
        .catch(err => {
            console.log(err.message)
        })
}
/**
 * A getter for a map that maps ids to names.
 * Returns a list, which contains an object that maps ids to names(names are in a list).
 */
const getIdToNameMap = async () => {
    const user: any = await getAuth().currentUser?.uid
    const receiverIds: any = await getReceiverIds(user)
    const receiverArr: any = {}

    for (let index = 0; index < receiverIds.length; index++) {
        receiverArr[receiverIds[index]] = (await getNameById(receiverIds[index]))
    }

    return [receiverArr]
}

/**
 * A getter for names given an id.
 * Returns the first and last name of a user in a list.
 *
 * @param id is the id of a user
 */
const getNameById = async (id: string) => {
    try {
        const collectionRef = collection(db, 'Users')
        const collectionRefRec = collection(db, 'Recruiters')
        const docRef = doc(collectionRef, `${id}`)
        const docRefRec = doc(collectionRefRec, `${id}`)
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
/**
 * A simple checker if the document exists in the firestore.
 *
 * @param reference is the reference to the according document
 */
const checkIfDocExists = async (reference: any) => {
    return getDocs(reference).then((s) => {
        return s.docs.length !== 0
    })
}

/**
 * Starts a conversation between two users. Checks if a chat log already exists,
 * if not, adds a collection for the conversation and a starting message.
 *
 * @param idSender is the id of the sender
 * @param idReceiver is the id of the receiver
 */
const startMessaging = async (idSender: any, idReceiver: any) => {
    const messagesRef = collection(db, `Chat_log`)
    const docRef = doc(messagesRef, `${idSender}_${idReceiver}`)
    const secondDocRef = doc(messagesRef, `${idReceiver}_${idSender}`)
    const docSnap = await getDoc(docRef)
    const secondDocSnap = await getDoc(secondDocRef)

    if (docSnap.exists()) {
        return true
    } else if (secondDocSnap.exists()) {
        return true
    } else {
        await setDoc(doc(db, 'Chat_log', `${idSender}_${idReceiver}`), {})
        const mRef = collection(db, `Chat_log/${idSender}_${idReceiver}/Messages`)
        return await addDoc(mRef, {
            content: "Hello!",
            sentBy: idSender,
            timestamp: Timestamp.now()
        })
    }
}
/**
 * Sends a message from a sender to a receiver with a given value.
 * It also prevents the page from fully reloading.
 *
 * @param e is a react form event
 * @param setFormValue is setter for form value
 * @param formValue is the value of the form value
 * @param idSender is the id of the sender
 * @param idReceiver is the id of the receiver
 */
const sendMessage = async (e: React.FormEvent, setFormValue: Function, formValue: string | undefined, idSender: string, idReceiver: string) => {
    e.preventDefault();
    setFormValue('')

    const user = getAuth().currentUser?.uid;

    let mRef = collection(db, `Chat_log/${idSender}_${idReceiver}/Messages`)
    if (!await checkIfDocExists(mRef)) {
        mRef = collection(db, `Chat_log/${idReceiver}_${idSender}/Messages`)
    }


    await addDoc(mRef, {
        content: formValue,
        sentBy: user,
        timestamp: Timestamp.now()
    })
}

export {
    sendMessage,
    getReceiverIds,
    getIdToNameMap,
    sortByTimestamp,
    getNameById,
    startMessaging
}