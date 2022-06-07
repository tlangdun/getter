import React, {FC} from "react";
import {sortByTimestamp} from "../../helpers/chatFunctions/chatComFunctions";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection} from "firebase/firestore";
import {db} from "../../services/firebaseconfig";

interface PropsChats {
    receiver: any;
    showFunction: any;
}

interface PropsMessages {
    receiver: any;
    sender: any;
}

interface PropSingleMessage {
    sender: string;
    sentBy: string;
    message: string;
}

const Chats: FC<PropsChats> = (props) => {
    return (
        <>
            <a onClick={props.showFunction}
               className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img className="object-cover w-10 h-10 rounded-full"
                     src="https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Ficon-user-default.png?alt=media&token=4bbe716a-fc83-4005-b35b-fc2935c072d7"
                     alt="username"/>
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-gray-600">{props.receiver}</span>
                    </div>
                </div>
            </a>
        </>
    );
}

const SingleMessage: FC<PropSingleMessage> = (props) => {

    function checkIfSender() {
        if (props.sender === props.sentBy)
            return "flex justify-start"
        return "flex justify-end"
    }

    return (
        <>
            <li className={checkIfSender()}>
                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                    <span className="block">{props.message}</span>
                </div>
            </li>
        </>
    )
}

const Messages: FC<PropsMessages> = (props) => {
    let [snapshotSenderReceiver]: any = useCollectionData(collection(db, `/Chat_log/${props.sender}_${props.receiver}/Messages`)) //
    let [snapshotReceiverSender]: any = useCollectionData(collection(db, `/Chat_log/${props.receiver}_${props.sender}/Messages`))

    function orderByTime() {
        if (snapshotSenderReceiver !== undefined && snapshotReceiverSender !== undefined) {
            snapshotSenderReceiver = (sortByTimestamp(snapshotSenderReceiver))
            snapshotReceiverSender = (sortByTimestamp(snapshotReceiverSender))

            return true
        }
    }

    return (
        <>
            <ul className="space-y-2" id={props.receiver.toString()}>
                {snapshotReceiverSender && orderByTime() && snapshotReceiverSender.map((m: any) => <SingleMessage
                    message={m.content} sender={props.sender}
                    sentBy={m.sentBy}/>)}
                {snapshotSenderReceiver && orderByTime() && snapshotSenderReceiver.map((m: any) => <SingleMessage
                    message={m.content} sender={props.sender}
                    sentBy={m.sentBy}/>)}
            </ul>
        </>
    )
}


export {Chats, Messages}