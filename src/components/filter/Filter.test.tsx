import {render, screen, act, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../store/store"

import Filter from './Filter'
import { EmptyFilters } from '../../store/models/filterModels'



let filter = {...EmptyFilters}

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
]  


beforeAll(()=>{
  filter.skills = [{value:"git", label:"Git", checked:false},{value:"pm", label:"PM", checked:false}]
  filter.programmingLanguages =  [{value:"java", label:"Java", checked:false}]
  filter.jobRoles = [{value:"student", label:"Student", checked:false}]
  filter.countries = [{value:"switzerland", label:"Switzerland", checked:false}]
  filter.spokenLanguages = [{value:"german", label:"German", checked:false}]
})

describe('Filter tests',() => {
    test('Check correct render of the passed objects',async () => {
      let loadRegionTest = jest.fn()
      renderFilter(loadRegionTest)

      userEvent.click(await screen.findByText("0 Filters"))

      expect( screen.getByTestId("git")).toBeInTheDocument()
      expect( screen.getByTestId("java")).toBeInTheDocument()
      expect( screen.getByTestId("student")).toBeInTheDocument()
      expect( screen.getByTestId("switzerland")).toBeInTheDocument()
      expect( screen.getByTestId("german")).toBeInTheDocument()
      expect( screen.getByTestId("salary-min-range")).toBeInTheDocument()
      expect( screen.getByTestId("salary-max-range")).toBeInTheDocument()
      expect( screen.getByTestId("availability-range")).toBeInTheDocument()
      expect( screen.getByTestId("work_experience")).toBeInTheDocument()
    })

    test('test click on filter items', async () => {
      let loadRegionTest = jest.fn().mockImplementation(() => Promise.resolve( [{value:"zuerich", label:"Zuerich", checked:false}]));
      renderFilter(loadRegionTest) 
      userEvent.click(await screen.findByText("0 Filters"))
      act(()=>{
        userEvent.click(screen.getByTestId("country-0"))
      })
      screen.debug()
      expect(loadRegionTest).toBeCalled()
      expect(await screen.findByText("1 Filters")).toBeInTheDocument()
    })

    test('test clear filter', async () => {
      let loadRegionTest = jest.fn().mockImplementation(() => Promise.resolve( [{value:"zuerich", label:"Zuerich", checked:false}]));
      renderFilter(loadRegionTest) 
      userEvent.click(await screen.findByText("0 Filters"))
      act(()=>{
        userEvent.click(screen.getByTestId("jobrole-0"))
        fireEvent.click(screen.getByTestId("availability-range"), { target: { value: 25 } });
        fireEvent.click(screen.getByTestId("salary-min-range"), { target: { value: 5000 } });
        fireEvent.click(screen.getByTestId("salary-max-range"), { target: { value: 10000 } });
        fireEvent.click(screen.getByTestId("option-1-3"), { target: { value: 2 } });
      })
      screen.debug()
      expect(await screen.findByText("5 Filters")).toBeInTheDocument()
      act(()=>{
        userEvent.click(screen.getByTestId("clear-all"))
      })
      expect(await screen.findByText("0 Filters")).toBeInTheDocument()

    })
})

const renderFilter= (loadRegionTest:Function) => {
  render(
    wrapper(
    <Filter 
        {...filter}
        workExperience={filter.work_experience}
        sortOptions={sortOptions}
        loadRegion={loadRegionTest}
        />
    )
)
}

const wrapper =  (element:any) =>{
    return(
      <BrowserRouter>
        <Provider store={store}>   
        {element}
        </Provider>
      </BrowserRouter>
    )
 }

