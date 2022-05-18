import {render, screen, act} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from "../../store/store"
import DashboardContent from './DashboardContent'


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

