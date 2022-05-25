import {FC, useEffect, useState} from "react";
import MessagePage from "./MessagePage";
import {
    getReceiversUID,
    idToMessageMapper,
    recMes,
    sortByTimestamp, startMessaging,
    tt
} from "../../helpers/chatFunctions/chatComFunctions";
import {List} from "reselect/es/types";
import {getAuth} from "firebase/auth";
import {useParams} from "react-router-dom";


const f = ["JeanJack", "Tenjean", "JeanLuc", "ok"]

const MessageLoader: FC = () => {
    const [allReceivers, setAllReceivers] = useState<any>([])
    const [t, setT] = useState()
    const [user, setUser] = useState<any>('')
    const [messages, setMessages] = useState<any>([])
    const [receiver, setReceiver] = useState<any>('')

    //getting rec uid from participant list
    const {uid} = useParams();


    useEffect(() => {
        const fetchRec = async () => {
            //let r: any = await getReceiversUID("KtDtaldROMaQ93TBPCTjqTNs1rK2")
            //console.log("this is ", r)
            //let c: any = await tt()
            //(console.log("this is TT : ", c)
            let u: any = await getAuth().currentUser?.uid
            setUser(u)
            setT(await tt())
            setAllReceivers(await getReceiversUID(u))
            setMessages(sortByTimestamp(await idToMessageMapper(await recMes(user, receiver), user, receiver)))
            //console.log("so you really only rend once?")
            //setRec(await tt())

        }
        fetchRec()
            .catch(console.error)

    }, [receiver])


    useEffect(() => {
        //add user to chat here
        if (uid !== undefined && uid !== receiver) {
            startMessaging(user, uid).then((r) => {
                setReceiver(uid)
                console.log("test works fine ", r)
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