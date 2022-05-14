import {render, screen, act, fireEvent, waitFor} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import DashboardRoute from '../../../routes/dashboard/DashboardRoute'
import store from '../../../store/store'
import ContentCard from './ContentCard'

let contentCardTest = {
    title:"Queries",
    text:"Save and edit your queries for easier access in your future recruiting process.",
    image:"https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/getter%2Fqueries-pexels-pixabay-356079.jpg?alt=media&token=4c10794f-a07c-4cf9-8cca-f27ad28e5c0b",
    link:"/dashboard/recruiting"
  }

describe('ContentCard component', () => {
    test('should render ContentCard and test click', () => {
    act(async ()=>{  
        render(
            wrapper(
            <DashboardRoute>    
                <ContentCard
                title={contentCardTest.title}
                text={contentCardTest.text}
                link={contentCardTest.link} 
                image={contentCardTest.image}
                />
            </DashboardRoute>
            )
        )
        expect(screen.getByTestId(contentCardTest.title)).toBeInTheDocument()

        fireEvent.click(screen.getByTestId(contentCardTest.title))
        await waitFor(() => {
            expect(screen.getByTestId("recruiting")).toBeInTheDocument()
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

