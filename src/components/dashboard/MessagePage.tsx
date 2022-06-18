import {FC, useState} from 'react';
import {List} from "reselect/es/types";
import {Chats, Messages} from "./Message";
import {
    sendMessage
} from "../../helpers/chatFunctions/chatComFunctions";


interface Props {
    sender: string;
    currentRec: string;
    receivers: List;
    idToNameMap: any;
}

interface MessageButtonProps {
    sender: string
    rec: string
}

const MessageButton: FC<MessageButtonProps> = (props) => {
    const [formValue, setFormValue] = useState<string>()

    return (
        <form
            onSubmit={(e) => sendMessage(e, setFormValue, formValue, props.sender, props.rec)}>
            <div data-testid="sendButton" className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button>

                </button>

                <input value={formValue} type="text" placeholder="Type Message"
                       onChange={(e) => setFormValue(e.target.value)}
                       className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                       name="message" required/>
                <button type="submit">
                    <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                         xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                </button>
            </div>
        </form>
    )
}

const MessagePage: FC<Props> = (props) => {
    const [show, setShow] = useState<boolean>(false)
    const [receiver, setReceiver] = useState<any>("")

    function showMessages(rec: string) {
        setShow(!show)
        if (rec !== receiver) {
            setShow(true)
        }
        setReceiver(rec)
    }

    const mapIdToName = (r: any) => {
        if (props.idToNameMap === undefined || r === '' || props.idToNameMap[0][r] === undefined) {
            return ""
        }

        return `${props.idToNameMap[0][r][0]} ${props.idToNameMap[0][r][1]}`
    }

    return (
        <>
            <div data-testid="messages" className="min-w-full border rounded lg:grid lg:grid-cols-3">
                <div className="border-r border-gray-300 lg:col-span-1">

                    <ul className="overflow-auto h-[32rem]">
                        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                        <li>
                            {props.receivers.map((r) => <Chats key={r} receiver={mapIdToName(r)}
                                                               showFunction={() => showMessages(r)}/>)}
                        </li>
                    </ul>
                </div>
                <div className="hidden lg:col-span-2 lg:block">
                    <div className="w-full">
                        {show ? (
                            <div className="relative flex items-center p-3 border-b border-gray-300">
                                <img className="object-cover w-10 h-10 rounded-full"
                                     src="https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Ficon-user-default.png?alt=media&token=4bbe716a-fc83-4005-b35b-fc2935c072d7"
                                     alt="username"/>
                                <span className="block ml-2 font-bold text-gray-600">{mapIdToName(receiver)}</span>
                            </div>) : null}
                        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                            {show ? (
                                <Messages receiver={receiver} sender={props.sender}/>
                            ) : null}
                        </div>
                        {show ? (
                            <MessageButton sender={props.sender} rec={receiver.toString()}/>) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessagePage
