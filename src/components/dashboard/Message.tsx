import React, {FC, useEffect} from "react";
import {List} from "reselect/es/types";

interface PropsChats {
    receiver: any;
    showFunction: any;
}

interface PropsMessages {
    receiver: any;
    sender: any;
    messages: List;
    loader: string;
}

interface PropSingleMessage {
    sender: string;
    sendBy: string;
    message: string;
}

const Chats: FC<PropsChats> = (props) => {
    return (
        <>
            <a onClick={props.showFunction}
               className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                <img className="object-cover w-10 h-10 rounded-full"
                     src="https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Ficon-user-default.png?alt=media&token=4bbe716a-fc83-4005-b35b-fc2935c072d7" alt="username"/>
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-gray-600">{props.receiver}</span>
                        <span className="block ml-2 text-sm text-gray-600"></span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600"></span>
                </div>
            </a>
        </>
    );
}

const SingleMessage: FC<PropSingleMessage> = (props) => {

    function checkIfSender() {
        if (props.sender === props.sendBy)
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

    //let l = [1,1,1,1,1,1,1,1,1]
    //console.log("ZEEEE MESSAGES :",props.messages)

    useEffect(() => {
        //db -> load
    }, [])

    return (
        <>
            <ul className="space-y-2" id={props.receiver.toString()} title={props.loader}>
                {props.messages[0].map((m:any) => <SingleMessage message={m.content} sender={props.sender} sendBy={m.sentBy}/>)}
            </ul>
        </>
    )
}


export {Chats, Messages}