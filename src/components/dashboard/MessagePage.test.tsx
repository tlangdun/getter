import {act, render, screen} from "@testing-library/react";
import MessagePage from "./MessagePage";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../store/store";
import React from "react";
import userEvent from "@testing-library/user-event";
import * as data from "./Message";

let testRecruiter = {
    "uid": "DiGPNLhkqoRQtZ5wnhDGmqxbwTn2",
    "email": "cac@cac.cac",
    "first_name": "Cakir",
    "last_name": "Beyeler"
}

let testCandidate = {
    "uid": "KtDtaldROMaQ93TBPCTjqTNs1rK2",
    "email": "test@gmail.com",
    "first_name": "Martin",
    "last_name": "Boss"
}

let testChatReceiver = <>
    <ul className="space-y-2" id="KtDtaldROMaQ93TBPCTjqTNs1rK2">
        <li className="flex justify-start">
            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"><span
                className="block">Hello!</span></div>
        </li>
        <li className="flex justify-start">
            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow"><span className="block">how are you</span>
            </div>
        </li>
    </ul></>

describe('MessagePage tests', () => {
    test('Check if Chats list rendered correctly', async () => {
        renderMessagePage()

        expect(await screen.findByTestId("messages")).toBeInTheDocument()
        expect(await screen.findByText("Martin Boss")).toBeInTheDocument()
    })

    test('test click on a chat item', async () => {
        let mock = jest.spyOn(data, "Messages").mockImplementation(() => testChatReceiver);
        renderMessagePage();
        userEvent.click(await screen.findByText("Martin Boss"))

        expect(await screen.findByTestId("sendButton")).toBeInTheDocument()
        expect(await screen.findByText("Hello!")).toBeInTheDocument()
        expect(mock).toHaveBeenCalledTimes(1);
    })

    test('test send button clickable', async () => {
        let mock = jest.spyOn(data, "Messages").mockImplementation(() => testChatReceiver);
        renderMessagePage();
        userEvent.click(await screen.findByText("Martin Boss"))
        act(()=>{
            userEvent.click(screen.getByTestId("sendButton"))
        })
        expect(mock).toHaveBeenCalledTimes(1);
    })
})

const renderMessagePage= () => {
    let mapIdToName = {KtDtaldROMaQ93TBPCTjqTNs1rK2: [`${testCandidate.first_name}`, `${testCandidate.last_name}`]};
    render(
        wrapper(
            <MessagePage
                sender={testRecruiter.uid}
                currentRec={testCandidate.uid}
                idToNameMap={[mapIdToName]}
                receivers={[`${testCandidate.uid}`]}
            />
        )
    )
}

const wrapper = (element:any) =>{
    return(
        <BrowserRouter>
            <Provider store={store}>
                {element}
            </Provider>
        </BrowserRouter>
    )
}

