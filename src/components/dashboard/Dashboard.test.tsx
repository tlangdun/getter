import {render, screen, act, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Route,Routes, BrowserRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import MenuDesktop from './MenuDesktop'
import {createMemoryHistory} from 'history'
import {routesDashboard, routesDashboardTalent} from '../../routes/dashboard/RouteDashboardRecruiter';
import Recruiting from './Recruiting'
import DashboardContent from './DashboardContent'
import CandidateList from './CandidateList'
import Message from './Message'
import store from '../../store/store'
import { Provider } from 'react-redux'
import * as data from '../../queries/candidateListQuery'
import * as dataHook from '../../store/hooks';

let testUser = {
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
  "country": "Switzerland",
  "city_of_residence": "Zürich",
  "job_role": "GTFO",
  "skills": [
    "brrr",
    "git"
  ],
  "spoken_languages": [
    "German"
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
describe('Dashboard recruiter',() => {
  
  test('recruiter menu gets shown in dashboard', async () => {
    
    render(
      wrapper(
      <Routes>
        <Route path="*" element={<Dashboard content={<Recruiting/>}/>} />
      </Routes>
      )
    )
    await waitFor(()=>{
      routesDashboard.forEach(nav => {
          expect(screen.getByText(nav.name)).toBeInTheDocument()
      })
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
    await waitFor(()=>{
      expect(screen.getByTestId("recruiting")).toBeInTheDocument()
    })
  })

  test('show candidates list page', async () => {
    const mock = jest.spyOn(data, "getAllCandidates").mockResolvedValue([testUser]);
    render(
      wrapper(
        <Routes>
          <Route path='*' element={<Dashboard content={<CandidateList/>}/>} />
        </Routes>
      )
    )
    expect(await screen.findByTestId("candidates-list")).toBeInTheDocument()
    mock.mockClear()
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

describe('Dashboard talent',() => {
  
  test('talent menu gets shown in dashboard', async () => {
    const mock = jest.spyOn(dataHook, 'useAppSelector')
    mock.mockReturnValue(testUser)
    render(
      wrapper(
      <Routes>
        <Route path="*" element={<Dashboard content={<Recruiting/>}/>} />
      </Routes>
      )
    )
    
    routesDashboardTalent.forEach(nav => {
        expect(screen.getByText(nav.name)).toBeInTheDocument()
    })
    
  })
})


describe('User menu', () => {
  test('Should render user menu', () => {
    wrapper(
       <MenuDesktop user={testUser} navigation={routesDashboard}/>
    )
  })

  test('can click on the user button', () => {
    const { getAllByTestId } = render(
      wrapper(
        <MenuDesktop user={testUser} navigation={routesDashboard} />
      )
    );

    const [menuButton] = getAllByTestId("user-button");
    act(()=>{
      userEvent.click(menuButton);
    })
  })

  test('can click on menu items', () => {
      const { getAllByTestId } = render(
        wrapper(
          <MenuDesktop user={testUser} navigation={routesDashboard} />
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
      wrapper(<MenuDesktop user={testUser} navigation={routesDashboard} />)
    );
    const menuButton = getByTestId("user-button");
    userEvent.click(menuButton);
    
    const items = screen.queryAllByLabelText("user-item")
    expect(items.length).toBe(4)
  })

  test('navigates user contents when items are clicked', () => {
    const { getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <MenuDesktop user={testUser} navigation={routesDashboard} />
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


