import {FC, useEffect, useState} from "react";
import MessagePage from "./MessagePage";
import {
    getReceiverIds,
    startMessaging,
    getIdToNameMap
} from "../../helpers/chatFunctions/chatComFunctions";
import {getAuth} from "firebase/auth";
import {useParams} from "react-router-dom";

const MessageLoader: FC = () => {
    const [allReceivers, setAllReceivers] = useState<any>([])
    const [idToNameMap, setIdToNameMapT] = useState<any>()
    const [user, setUser] = useState<any>('')
    const [receiver, setReceiver] = useState<any>('')

    const {uid} = useParams();


    useEffect(() => {
        const fetchInformation = async () => {
            let u: any = await getAuth().currentUser?.uid

            setUser(u)
            setAllReceivers(await getReceiverIds(u))
            setIdToNameMapT(await getIdToNameMap())
        }
        fetchInformation()
            .catch(console.error)

    }, [receiver])


    useEffect(() => {
        if (uid !== undefined && uid !== receiver) {
            startMessaging(user, uid).then(() => {
                setReceiver(uid)
            })
        }
    }, [uid])

    return (
        <>
            <MessagePage sender={user} receivers={allReceivers} idToNameMap={idToNameMap}
                         currentRec={receiver} setCurrentRec={setReceiver}/>
        </>
    );
}

export default MessageLoader