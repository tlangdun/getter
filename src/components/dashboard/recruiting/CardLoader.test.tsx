import {render, screen} from '@testing-library/react'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import store from '../../../store/store'
import CardLoader from './CardLoader'

describe('cardloader tests', () => {
    test('check if cardloader gets rendered correctly', async () => {
        render(
            wrapper(<CardLoader/>)
        )
        expect( screen.getByTestId("card-loader")).toBeInTheDocument()
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

