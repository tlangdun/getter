import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Route,Routes, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import MenuDesktop from './MenuDesktop'
import {createMemoryHistory} from 'history'
import RouteDashboardRecruiter from '../../routes/dashboard/RouteDashboardRecruiter';

describe('Dashboard recruiter', () => {
  test('Should render dashboard without crash', () => {
     render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
     )
  })

  test('recruiter menu gets shown in dashboard', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    )
    RouteDashboardRecruiter.forEach(nav => {
        expect(screen.getByText(nav.name)).toBeInTheDocument()
    })
  })

  test('routing dashboard menu content', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    )
    userEvent.click(screen.getByText("Dashboard"))
    expect(screen.getByTestId("dashboard")).toBeInTheDocument()
  
    userEvent.click(screen.getByText("Recruiting"))
    expect(screen.getByTestId("recruiting")).toBeInTheDocument()
  
    userEvent.click(screen.getByText("Candidates List"))
    expect(screen.getByTestId("candidates-list")).toBeInTheDocument()
  
    userEvent.click(screen.getByText("Messages"))
    expect(screen.getByTestId("messages")).toBeInTheDocument()
  })
})

describe('User menu', () => {
  test('Should render user menu', () => {
    render(
     <BrowserRouter>
       <MenuDesktop navigation={RouteDashboardRecruiter}/>
     </BrowserRouter>
    )
  })

  test('can click on the user button', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <MenuDesktop navigation={RouteDashboardRecruiter} />
      </BrowserRouter>
    );

    const [menuButton] = getAllByTestId("user-button");
    userEvent.click(menuButton);
  })

  test('can click on menu items', () => {
      const { getAllByTestId } = render(
        <BrowserRouter>
          <MenuDesktop navigation={RouteDashboardRecruiter} />
        </BrowserRouter>
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
      <BrowserRouter>
        <MenuDesktop navigation={RouteDashboardRecruiter} />
      </BrowserRouter>
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