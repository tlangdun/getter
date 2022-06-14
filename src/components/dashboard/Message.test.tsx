import {Chats} from "./Message";
import {render, screen} from "@testing-library/react";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "../../store/store";


describe('Message tests', () => {
    test('Check if chats list gets rendered correctly', async () => {
        render(
            wrapper(
                <Chats
                    receiver={"Martin Boss"}
                    showFunction={()=>void 0}
                />
            )
        )

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