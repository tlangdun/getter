import {render, screen} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from '../../../store/store'
import Card from './Card'

let testUser =
{
    "uid": "0sadghbcat0A",
    "access_level": "0",
    "email": "martin.oswald@gmail.com",
    "first_name": "Martin",
    "last_name": "Bosswald",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Fmartin.jpg?alt=media&token=9a7f3776-4a4e-4f97-b715-b47d9fa34090",
    "short_bio": "hello, my name is martin. I study at ZHAW. My biggest dream is to work for amazon. I love Jeff Bezos",
    "address_postcode": "8610",
    "availability": "40",
    "birth_date": "9.10.1996",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Student",
    "skills": [
      "Git",
      "Project Management"
    ],
    "programming_languages": [
      "java"
    ],
    "salary_range": {
      "start": 20000,
      "end": 40000
    },
    "work_experience": [
      {
        "job_role": "Software Engineer",
        "end_date": "10.10.2010",
        "employer": "Siemens",
        "description": "i did nothing",
        "start_date": "12.12.2012"
      }
    ]
}


describe('Dashboard Card', () => {
    test('Check if card gets rendered correctly', async () => {
        render(
            wrapper(<Card key={testUser.uid} user={testUser}/>)
        )
        expect( screen.getByTestId("0sadghbcat0A")).toBeInTheDocument()
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

