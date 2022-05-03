import { Route, Routes } from 'react-router-dom';
import AuthRoute from './routes/auth/AuthRoute';
import DashboardRoute from './routes/dashboard/DashboardRoute';
import LandingRoute from './routes/landing/LandingRoute';

function App() {
  return (    
      <Routes>
        <Route path='auth/*' element={<AuthRoute />} />
        <Route path='dashboard/*' element={<DashboardRoute/>} />
        <Route path='/*' element={<LandingRoute />} />
      </Routes>
  );
}

export default App;