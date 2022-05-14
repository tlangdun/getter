import {render, screen, act, waitFor, fireEvent} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../store/store"

import Filter from './Filter'


describe('Filter tests', () => {
    test('Check correct render of the passed objects', async () => {
        act(async()=>{
            let loadRegionTest = jest.fn()
            render(
                wrapper(
                <Filter 
                    skills={[{value:"git", label:"Git", checked:false}]} 
                    programmingLanguages={[{value:"java", label:"Java", checked:false}]} 
                    jobRoles={[{value:"student", label:"Student", checked:false}]} 
                    countries={[{value:"switzerland", label:"Switzerland", checked:false}]}
                    spokenLanguages={[{value:"german", label:"German", checked:false}]}
                    workExperience={[ "All" ,"0", "1-3", "4-6", "7-10+"]}
                    sortOptions={[]}
                    loadRegion={()=>{loadRegionTest}}
                    />
                )
            )
            
            await waitFor(() => { 
                fireEvent.click(screen.getByTestId("countries-0"))
                expect( screen.getByTestId("skills-0")).toBeInTheDocument()
                expect( screen.getByTestId("programmingLanguage-0")).toBeInTheDocument()
                expect( screen.getByTestId("jobRoles-0")).toBeInTheDocument()
                expect( screen.getByTestId("countries-0")).toBeInTheDocument()
                expect( screen.getByTestId("spokenLanguage-0")).toBeInTheDocument()
                expect( screen.getByTestId("salary-min-range")).toBeInTheDocument()
                expect( screen.getByTestId("salary-max-range")).toBeInTheDocument()
                expect( screen.getByTestId("availability-range")).toBeInTheDocument()
                expect( screen.getByTestId("work_experience")).toBeInTheDocument()
                expect(loadRegionTest).toBeCalled()
             })
        })
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

