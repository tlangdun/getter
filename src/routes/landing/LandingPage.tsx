import { FC } from 'react';
import HeroSection from "../../components/landingpage/HeroSection";
import FeaturesSection from "../../components/landingpage/FeaturesSection";
import NewsletterSection from "../../components/landingpage/NewsletterSection";
import HowToSection from "../../components/landingpage/HowToSection";

const LandingPage: FC = () => {
  return(
    <><div data-testid="landing-page"></div>
    <HeroSection></HeroSection>
      <HowToSection></HowToSection>
    <FeaturesSection></FeaturesSection>
      <NewsletterSection></NewsletterSection>
    </>
  );
};

export default LandingPage
