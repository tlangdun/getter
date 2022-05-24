import {render, screen, act} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../store/store"
import DashboardContent from './DashboardContent'
import * as data from '../../store/hooks';
import { access_level } from '../../store/models/userModel'
import { contentCardTalent, fullCardContentTalent } from './defaultpage/DashboardText'

let testUser = {
  "uid": "KtDtaldROMaQ93TBPCTjqTNs1rK2",
  "access_level": access_level.TALENT,
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

describe('Dashboard default page', () => {
    test('should render default content', () => {
    act(()=>{  
        render(
            wrapper(<DashboardContent/>)
        )
        expect(screen.getByTestId("dashboard")).toBeInTheDocument()
        expect(screen.getByTestId("full-card")).toBeInTheDocument()
        expect(screen.getByTestId("content-card")).toBeInTheDocument()
      })
    })
    test('should render talent content', () => {
      const mock = jest.spyOn(data, 'useAppSelector')
      mock.mockReturnValue(testUser)
      render(
        wrapper(<DashboardContent/>)
      )
      expect(screen.getByText(fullCardContentTalent.title)).toBeInTheDocument()
      expect(screen.getByText(contentCardTalent[0].title)).toBeInTheDocument()
      mock.mockRestore()
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

