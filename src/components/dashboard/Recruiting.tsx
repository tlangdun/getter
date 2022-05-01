import { FC } from 'react';
import Card from './recruiting/Card'
import FilterLoader from '../filter/FilterLoader';


const Recruiting:FC = () => {
  return (
    <>
      <div data-testid="recruiting">
        <FilterLoader />
        
      </div>  
    </>
  )
};

export default Recruiting
