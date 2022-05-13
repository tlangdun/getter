import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Route,Routes, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import MenuDesktop from './MenuDesktop'
import {createMemoryHistory} from 'history'
import RouteDashboardRecruiter from '../../routes/dashboard/RouteDashboardRecruiter';
import Recruiting from './Recruiting'
import DashboardRoute from '../../routes/dashboard/DashboardRoute'
import DashboardContent from './DashboardContent'
import CandidateList from './CandidateList'
import Message from './Message'
import store from '../../store/store'
import { Provider } from 'react-redux'

describe('Dashboard recruiter', () => {
  test('Should render dashboard without crash', () => {
    render(
      wrapper(<Dashboard content={<Recruiting/>}/>)
    )
  })

  test('recruiter menu gets shown in dashboard', () => {
    
    render(
      wrapper(
      <Routes>
        <Route path="*" element={<Dashboard content={<Recruiting/>}/>} />
      </Routes>
      )
    )

    RouteDashboardRecruiter.forEach(nav => {
        expect(screen.getByText(nav.name)).toBeInTheDocument()
    })
  })

  test('routing dashboard menu content', () => {
    render(
      wrapper(
        <Routes>
          <Route path='*' element={<Dashboard content={<DashboardContent/>}/>} />
        </Routes>
      )  
    )
    expect(screen.getByTestId("dashboard")).toBeInTheDocument()
  })

  test('show recruiting page', async () => {
    render(
      wrapper(
        <Routes>
          <Route path='*' element={<Dashboard content={<Recruiting/>}/>} />
        </Routes>
      )
    )
    expect(screen.getByTestId("recruiting")).toBeInTheDocument()
  })

  test('show candidates list page', async () => {
    render(
      wrapper(
        <Routes>
          <Route path='*' element={<Dashboard content={<CandidateList/>}/>} />
        </Routes>
      )
    )
    expect(screen.getByTestId("candidates-list")).toBeInTheDocument()
  })

  test('show message page', async () => {
    render(
      wrapper(
        <Routes>
          <Route path='*' element={<Dashboard content={<Message/>}/>} />
        </Routes>
      )
    )
    expect(screen.getByTestId("messages")).toBeInTheDocument()
  })
})

describe('User menu', () => {
  test('Should render user menu', () => {
    wrapper(
       <MenuDesktop navigation={RouteDashboardRecruiter}/>
    )
  })

  test('can click on the user button', () => {
    const { getAllByTestId } = render(
      wrapper(
        <MenuDesktop navigation={RouteDashboardRecruiter} />
      )
    );

    const [menuButton] = getAllByTestId("user-button");
    userEvent.click(menuButton);
  })

  test('can click on menu items', () => {
      const { getAllByTestId } = render(
        wrapper(
          <MenuDesktop navigation={RouteDashboardRecruiter} />
        )
      );
      const [menuButton] = getAllByTestId("user-button");
      userEvent.click(menuButton);

      const [profileItem] = getAllByTestId("profile");
      userEvent.click(profileItem);

      const [settingsItem] = getAllByTestId("settings");
      userEvent.click(settingsItem);

      const [logoutItem] = getAllByTestId("logout");
      userEvent.click(logoutItem);
  })

  test('check the number of items', () => {
    const { getByTestId } = render(
      wrapper(<MenuDesktop navigation={RouteDashboardRecruiter} />)
    );
    const menuButton = getByTestId("user-button");
    userEvent.click(menuButton);

    const items = screen.queryAllByLabelText("user-item")
    expect(items.length).toBe(4)
  })

  test('navigates user contents when items are clicked', () => {
    const { getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <MenuDesktop navigation={RouteDashboardRecruiter} />
      </BrowserRouter>
    );

    const items = ["profile", "settings", "support"];
    const history = createMemoryHistory();

    items.forEach(item => {
      const path = "/" + item;
      // Create a simulated click event function 
      const clickHandler = jest.fn(() => { 
        history.push(path)
        
      })

      const menuButton = getByTestId("user-button");
      userEvent.click(menuButton);

      act(() =>{
        screen.getByTestId(item).onclick = () => clickHandler()
        const [profileItem] = getAllByTestId(item);
        userEvent.click(profileItem);
      })
      
      expect(clickHandler).toHaveBeenCalled()
      expect(history.location.pathname).toBe(path)
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


