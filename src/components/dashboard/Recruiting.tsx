import { FC } from 'react';
import FilterLoader from '../filter/FilterLoader';
import CardLoader from './recruiting/CardLoader';


const Recruiting:FC = () => {
  return (
    <>
      <div data-testid="recruiting">
        <FilterLoader />
        <CardLoader />
      </div>  
    </>
  )
};

export default Recruiting
