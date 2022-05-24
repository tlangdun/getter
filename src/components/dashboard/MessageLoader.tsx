import {FC, useEffect, useState} from "react";
import MessagePage from "./MessagePage";
import {
    getReceiversUID,
    idToMessageMapper,
    recMes,
    sortByTimestamp,
    tt
} from "../../helpers/chatFunctions/chatComFunctions";
import {List} from "reselect/es/types";
import {getAuth} from "firebase/auth";
import { useParams } from "react-router-dom";


const f = ["JeanJack", "Tenjean", "JeanLuc", "ok"]

const MessageLoader: FC = () => {
    const [rec, setRec] = useState<any>([])
    const[t, setT] = useState()
    const[user, setUser] = useState<any>('')
    const[messages, setMessages] = useState<any>([])
    const[realRec, setRealRec] = useState<any>('')
    //let user:any = getAuth().currentUser?.uid
    const { uid } = useParams();
    
    useEffect(()=>{
        //add user to chat here
        if(uid !== undefined) {
            alert("add " + uid + " to db")
        }
    },[uid])
    useEffect(() => {
        const fetchRec = async () => {
            //let r: any = await getReceiversUID("KtDtaldROMaQ93TBPCTjqTNs1rK2")
            //console.log("this is ", r)
            //let c: any = await tt()
            //(console.log("this is TT : ", c)
            let u:any = await getAuth().currentUser?.uid
            setUser(u)
            setT(await tt())
            setRec(await getReceiversUID(u))
            setMessages(sortByTimestamp(await idToMessageMapper(await recMes(user, realRec), user, realRec)))
            console.log("so you really only rend once?")
            //setRec(await tt())

        }
        fetchRec()
            .catch(console.error)

    }, [])

    return (
        <>
            <MessagePage sender={user} receivers={rec} messages={messages} getMessages={setMessages}  try={t} currentRec={realRec} setCurrentRec={setRealRec}/>
        </>
    );
}

export default MessageLoader