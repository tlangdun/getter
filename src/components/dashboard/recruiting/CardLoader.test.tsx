import {render, screen} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from '../../../store/store'
import CardLoader from './CardLoader'
import * as data from '../../../helpers/queries/databaseHelper';
import { act } from 'react-dom/test-utils'

let testUser = {
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
  "country": "Switzerland",
  "city_of_residence": "Zürich",
  "job_role": "GTFO",
  "skills": [
    "brrr",
    "git"
  ],
  "spoken_languages": [
    "German"
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

describe('cardloader tests', () => {
    test('check if cardloader gets rendered correctly', async () => {
        const mock = jest.spyOn(data, "getDocumentsByFilter").mockResolvedValue([testUser]);
        render(
            wrapper(<CardLoader/>)
        )
        act(()=>{
          expect( screen.getByTestId("card-loader")).toBeInTheDocument()
        })
        mock.mockClear()
    })
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

