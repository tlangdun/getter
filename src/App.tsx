import { Route, Routes } from 'react-router-dom';
import AuthRoute from './routes/auth/AuthRoute';

function App() {
  return (
    <div className='App px-4 w-full h-full'>
      <Routes>
        <Route path='auth/*' element={<AuthRoute />} />
      </Routes>
    </div>
  );
}

export default App;