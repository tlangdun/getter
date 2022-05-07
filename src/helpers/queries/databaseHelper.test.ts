/**
 * @jest-environment node
 */
// UserId test User: 'KtDtaldROMaQ93TBPCTjqTNs1rK2'

import {render, screen} from "@testing-library/react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../../components/dashboard/Dashboard";
import RouteDashboardRecruiter from "../../routes/dashboard/RouteDashboardRecruiter";
import userEvent from "@testing-library/user-event";
import {loginEmailPassword} from "../auth/authFunctions";
import {getRecruiterByUserId} from "./databaseHelper";
import {access_level} from "../../store/models/userModel";


const login = () => {loginEmailPassword('test@gmail.com', '123456'); }
const userid = 'KtDtaldROMaQ93TBPCTjqTNs1rK2';

// ToDo: Problem mit login um an Daten vom Benutzer zu kommen.
describe('Fetching User data from a Recruiter user from Firebase', () => {
    test('Should read all Data From Martin Boss', async () => {
        // const mock = jest.spyOn(data, "getCharacter").mockResolvedValue("Bob");

        // await login();
        console.log('dsdasdas')
        const actual = await getRecruiterByUserId(userid)
        console.log(actual)
        const expected = {
            uid: 'KtDtaldROMaQ93TBPCTjqTNs1rK2',
            access_level: access_level.RECRUITER,
            email: 'test@gmail.com',
            first_name: 'Martin',
            last_name: 'Boss',
            pic_url: 'https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f',
            short_bio: 'hello, my name is martin'
        }
        expect(actual).toBe(expected)
    })
})