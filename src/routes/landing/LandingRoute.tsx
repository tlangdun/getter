import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import NavBar from '../../components/landing/NavBar';
import AboutUsPage from './AboutUsPage';
import FeaturesPage from './FeaturesPage';
import FourOFourPage from './FourOFourPage';

const LandingRoute: FC = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/aboutus' element={<AboutUsPage />} />
        <Route path='/features' element={<FeaturesPage />} />
        <Route path='/*' element={<FourOFourPage />} />
      </Routes>
    </>
  );
};

export default LandingRoute;
