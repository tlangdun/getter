import {FC, FormEvent, useEffect, useState} from 'react';
import {List} from "reselect/es/types";
import {Chats, Messages} from "./Message";
import {
    getNameByUID,
    getReceiversUID,
    idToMessageMapper, recMes,
    sendMessage,
    sortByTimestamp, superTest,
} from "../../helpers/chatFunctions/chatComFunctions";
import {user} from "firebase-functions/lib/providers/auth";
import {Simulate} from "react-dom/test-utils";



interface Props {
    sender: string;
    currentRec: string;
    setCurrentRec: Function;
    receivers: List;
    try: any;
    messages: List;
    getMessages: Function;
}

interface MessageButtonProps {
    sender:string
    rec:string
    reloader: any
    setReloaderFunction: Function
    setMessages:Function
}

/*const sendMessage = async (e:FormEvent) => {
        e.preventDefault()
        console.log("works so far")

    }*/
const MessageButton: FC<MessageButtonProps> = (props) => {
    const [formValue, setFormValue] = useState<string>()

    return (
        <form onSubmit={(e) => sendMessage(e, setFormValue, formValue, props.reloader, props.setReloaderFunction, props.setMessages, props.sender, props.rec)}>
            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                    </svg>
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

const ChatSearchBar: FC = () => {
    return (
        <div className="mx-3 my-3">
            <div className="relative text-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                     viewBox="0 0 24 24" className="w-6 h-6 text-gray-300">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
                <input type="search" className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                       name="search"
                       placeholder="Search" required/>
            </div>
        </div>
    )
}

const MessagePage: FC<Props> = (props) => {
    const [show, setShow] = useState<boolean>(false)
    const [receiver, setReceiver] = useState<String>("")
    const [formValue, setFormValue] = useState<any>()
    const [reloader, setReloader] = useState<any>()
    //const[messages, setMessages] = useState<any>([])

    function showMessages(rec: String) {
        setShow(!show)
        if (rec !== receiver) {
            setShow(true)
        }
        setReceiver(rec)
        setReloader("okey")
        setReloader("reloader")
        props.setCurrentRec(rec)
        //setMessages(messages)
        //setReloader("")
        //setReloader(reloader)
        //console.log("new rec: ", receiver)
        //console.log("THESE ARE TRZKY : " , props.sender)
    }

    /*useEffect(() => {
        const setMes = async () => {
            setMessages(sortByTimestamp(await idToMessageMapper(await recMes(props.sender, receiver.toString()))))
            console.log("THESE ARE TRZKY : " , messages)
        }
        setMes()
            .catch(console.error)
    },[receiver])*/

    return (
        <>
            <div data-testid="messages" className="min-w-full border rounded lg:grid lg:grid-cols-3">
                <div className="border-r border-gray-300 lg:col-span-1">
                    <ChatSearchBar/>
                    <ul className="overflow-auto h-[32rem]">
                        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
                        <li>
                            {props.receivers.map((r) => <Chats receiver={r} showFunction={() => superTest(props.sender, r, setReloader, reloader).then(() => showMessages(r))}/>)}
                        </li>
                    </ul>
                </div>
                <div className="hidden lg:col-span-2 lg:block">
                    <div className="w-full">
                        {show ? (
                            <div className="relative flex items-center p-3 border-b border-gray-300">
                                <img className="object-cover w-10 h-10 rounded-full"
                                     src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                                     alt="username"/>
                                <span className="block ml-2 font-bold text-gray-600">{receiver}</span>
                                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                            </div>) : null}
                        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                            {show ? (
                                <Messages messages={[props.messages]} receiver={receiver} loader={reloader} sender={props.sender}/>
                            ) : null}
                        </div>
                        {show ? (
                            <MessageButton reloader={reloader} setReloaderFunction={setReloader} setMessages={props.getMessages} sender={props.sender} rec={receiver.toString()}/>) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessagePage
