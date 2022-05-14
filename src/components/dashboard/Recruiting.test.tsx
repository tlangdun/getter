import {render, screen, act} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { UserActions } from '../../store/slices/UserSlice'
import store from "../../store/store"
import Dashboard from "./Dashboard"
import Recruiting from "./Recruiting"
import { useAppDispatch, useAppSelector } from '../../store/hooks';


let mockUser = {
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
    "skills": [
      "brrr",
      "git"
    ],
    "programming_languages": [
      "java"
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

describe('Dashboard recruiter', () => {
    test('should render recruiting page on logged in user', () => {
    act(()=>{  
        render(
            wrapper(<Dashboard content={<Recruiting/>}/>)
        )
        expect(screen.getByTestId("recruiting")).toBeInTheDocument()
      })
    })
})

beforeAll(()=>{
    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
        useSelector: jest.fn().mockReturnValue({
            // useSelector will return redux state object
            state: {
                user: mockUser,
            },
        }),
        useAppDispatch: () => mockDispatch,
    }));
    jest.mock('../../store/slices/UserSlice', () => ({
        UserActions: jest.fn().mockResolvedValue({
            state: {
                user: mockUser
            },
        }),
    }));
})
const wrapper =  (element:any) =>{
    return(
      <BrowserRouter>
        <Provider store={store}>
          {element}
        </Provider>
      </BrowserRouter>
    )
 }

