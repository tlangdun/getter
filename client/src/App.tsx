import { Routes, Route } from 'react-router-dom'
import Landingpage from './components/landingpage/LandingPage';

function App() {
  return (
    <Routes>
      <Route path='landing' element={<Landingpage />}/>
    </Routes>
  );
}

export default App;
