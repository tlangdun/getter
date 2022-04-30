import { Route, Routes } from 'react-router-dom';
import AuthRoute from './routes/auth/AuthRoute';
import LandingRoute from './routes/landing/LandingRoute';

function App() {
  return (
      <Routes>
        <Route path='auth/*' element={<AuthRoute />} />
        <Route path='/*' element={<LandingRoute />} />
      </Routes>
  );
}

export default App;