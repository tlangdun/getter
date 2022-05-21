import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from '../../store/store'
import CandidateList from './CandidateList'
import * as data from '../../queries/candidateListQuery'

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



describe('candidate-list tests', () => {
    test('check if candidate list gets rendered and delete event gets triggered', async () => {
      const mock = jest.spyOn(data, "getAllCandidates").mockResolvedValue([testCandidate]);
      const mockDeleteEvent = jest.spyOn(data, "removeCandidate");

      render(
          wrapper(<CandidateList/>)
      )

      expect( await screen.findByTestId("candidates-list")).toBeInTheDocument()
      expect( await screen.findByText(testCandidate.email)).toBeInTheDocument()
      expect(mock).toHaveBeenCalledTimes(2);
      
      fireEvent.click(screen.getByTestId("button-"+testCandidate.uid))
      expect(mockDeleteEvent).toBeCalled()

      mock.mockRestore()
      mockDeleteEvent.mockRestore()
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
