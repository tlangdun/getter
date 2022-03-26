import app from './services/firebaseconfig';
import { getAuth } from 'firebase/auth'
import Dashboard from './routes/dashboard/Dashboard';

function App() {
  const auth = getAuth(app);
  return (
    <div className='App'>
      <header className='App-header'>
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
