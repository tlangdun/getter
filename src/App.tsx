import { Route, Routes } from 'react-router-dom';
import AuthRoute from './routes/auth/AuthRoute';
import {getRecruiterByUserId, getTalentByUserId} from "./helpers/queries/databaseHelper";
import {db} from './services/firebaseconfig';

function App() {
  return (
    <div className='App px-4 w-full h-full'>
      <Routes>
        <Route path='auth/*' element={<AuthRoute />} />
      </Routes>
        <button onClick={buttonHandlerTalent} className="button" name="button Talent">
            Button Talent
        </button>
        <button onClick={buttonHandlerRecruiter} className="button" name="button Recruiter">
            Button Recruiter
        </button>
    </div>
  );
}

const buttonHandlerTalent = () => {
    getTalentByUserId('KtDtaldROMaQ93TBPCTjqTNs1rK2').then(x=>{
        console.log(x);})
};

const buttonHandlerRecruiter = () => {
    getRecruiterByUserId(db,'KtDtaldROMaQ93TBPCTjqTNs1rK2').then(x=>{
        console.log(x);})
};

export default App;