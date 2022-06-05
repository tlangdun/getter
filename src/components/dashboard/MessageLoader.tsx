import {FC, useEffect, useState} from "react";
import MessagePage from "./MessagePage";
import {
    another_tt,
    getReceiversUID,
    idToMessageMapper,
    recMes,
    sortByTimestamp, startMessaging,
    tt
} from "../../helpers/chatFunctions/chatComFunctions";
import {List} from "reselect/es/types";
import {getAuth} from "firebase/auth";
import {useParams} from "react-router-dom";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";


const f = ["JeanJack", "Tenjean", "JeanLuc", "ok"]

const MessageLoader: FC = () => {
    const [allReceivers, setAllReceivers] = useState<any>([])
    const [t, setT] = useState<any>()
    const [user, setUser] = useState<any>('')
    const [messages, setMessages] = useState<any>([])
    const [receiver, setReceiver] = useState<any>('')

    //const [mTry] = useCollectionData(collection(db, ))

    //getting rec uid from participant list
    const {uid} = useParams();


    useEffect(() => {
        const fetchRec = async () => {
            setMessages([])
            //let r: any = await getReceiversUID("KtDtaldROMaQ93TBPCTjqTNs1rK2")
            //console.log("this is ", r)
            //let c: any = await tt()
            //(console.log("this is TT : ", c)
            let u: any = await getAuth().currentUser?.uid
            setUser(u)
            setAllReceivers(await getReceiversUID(u))
            setT(await tt())
            //setMessages(sortByTimestamp(await idToMessageMapper(await recMes(user, receiver), user, receiver)))
        }
        fetchRec()
            .catch(console.error)

    }, [receiver])


    useEffect(() => {
        //add user to chat here
        if (uid !== undefined && uid !== receiver) {
            startMessaging(user, uid).then((r) => {
                setReceiver(uid)
            })
            //alert("add " + uid + " to db")
        }
    }, [uid])

    return (
        <>
            <MessagePage sender={user} receivers={allReceivers} messages={messages} getMessages={setMessages} try={t}
                         currentRec={receiver} setCurrentRec={setReceiver}/>
        </>
    );
}

export default MessageLoader