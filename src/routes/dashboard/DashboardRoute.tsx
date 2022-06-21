import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import CandidateList from '../../components/dashboard/CandidateList';
import Dashboard from '../../components/dashboard/Dashboard';
import DashboardContent from '../../components/dashboard/DashboardContent';
import Recruiting from '../../components/dashboard/Recruiting';
import Profile from '../../components/user/Profile';
import Support from '../../components/user/Support';
import UserSettings from '../../components/user/UserSettings';
import {routesDashboard} from '../../routes/dashboard/RouteDashboardRecruiter';
import MessageLoader from '../../components/dashboard/MessageLoader';

const DashboardRoute:FC = () => {
  return(
    <>
      <Routes>
        <Route path={routesDashboard[0].routing + "/*" } element={<Dashboard content={<DashboardContent/>}/>} />
        {/*<Route path={routesDashboard[1].routing + "/*" } element={<Dashboard content={<Queries.Queries/>}/>} />*/}
        <Route path={routesDashboard[1].routing + "/*" } element={<Dashboard content={<Recruiting/>}/>} />
        <Route path={routesDashboard[2].routing + "/*" } element={<Dashboard content={<CandidateList/>}/>} />
        <Route path={routesDashboard[3].routing + "/" } element={<Dashboard content={<MessageLoader/>}/>} />
        <Route path={routesDashboard[3].routing + "/:uid" } element={<Dashboard content={<MessageLoader/>}/>} />
        <Route path='/profile/*' element={<Dashboard content={<Profile/>}/>} />
        <Route path='/settings/*' element={<Dashboard content={<UserSettings/>}/>} />
        <Route path='/support/*' element={<Dashboard content={<Support/>}/>} />
      </Routes>
    </>
  );
};

export default DashboardRoute
