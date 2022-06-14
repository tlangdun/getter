import {render, screen} from "@testing-library/react";
import MessagePage from "./MessagePage";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../store/store";
import React from "react";

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

describe('MessagePage tests', () => {
    test('Check if chats list gets rendered correctly', async () => {
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
        expect(await screen.findByTestId("messages")).toBeInTheDocument()
        expect(await screen.findByText("Martin Boss")).toBeInTheDocument()
    })
})


const wrapper = (element:any) =>{
    return(
        <BrowserRouter>
            <Provider store={store}>
                {element}
            </Provider>
        </BrowserRouter>
    )
}
