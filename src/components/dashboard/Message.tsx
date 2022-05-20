import React, {FC, useEffect} from "react";
import {List} from "reselect/es/types";

interface PropsChats {
    receiver: String;
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
                     src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg" alt="username"/>
                <div className="w-full pb-2">
                    <div className="flex justify-between">
                        <span className="block ml-2 font-semibold text-gray-600">{props.receiver}</span>
                        <span className="block ml-2 text-sm text-gray-600">Server Time - Timestamp</span>
                    </div>
                    <span className="block ml-2 text-sm text-gray-600">No Necessito imo</span>
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

    })

    return (
        <>
            <ul className="space-y-2" id={props.receiver.toString()} title={props.loader}>
                {props.messages[0].map((m:any) => <SingleMessage message={m.content} sender={props.sender} sendBy={m.sentBy}/>)}
            </ul>
        </>
    )
}


export {Chats, Messages}