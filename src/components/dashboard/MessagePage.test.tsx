import {render, screen} from "@testing-library/react";
import MessagePage from "./MessagePage";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../store/store";
import React from "react";

let testRecruiter = {
    "uid": "DiGPNLhkqoRQtZ5wnhDGmqxbwTn2",
    "access_level": 0, //?
    "email": "cac@cac.cac",
    "first_name": "Cakir",
    "last_name": "Beyeler",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Fataturk-posteri-3504064487.jpeg?alt=media&token=9eaa4715-0749-442a-a4d4-89b9497d9ba2",
    "short_bio": "bla bla",
}

let testCandidate = {
    "uid": "KtDtaldROMaQ93TBPCTjqTNs1rK2",
    "access_level": 0,
    "email": "test@gmail.com",
    "first_name": "Martin",
    "last_name": "Boss",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f",
    "short_bio": "hello, my name is martin",
    "address_postcode": "8090",
    "availability": "20",
    "birth_date": "6.9.1969",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "GTFO",
    "country" : "Switzerland",
    "skills": [
        "brrr",
        "git"
    ],
    "programming_languages": [
        "java"
    ],
    "spoken_languages": [
        "German"
    ],
    "salary_range": {
        "start": 100000,
        "end": 300000
    },
    "work_experience": [
        {
            "start_date": "12.12.2012",
            "employer": "Siemens",
            "end_date": "10.10.2010",
            "description": "this is a job description",
            "job_role": "Software Engineer"
        }
    ]
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
