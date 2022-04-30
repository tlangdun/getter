import { FC } from 'react';
import HeroSection from "../../components/landingpage/HeroSection";
import FeaturesSection from "../../components/landingpage/FeaturesSection";
import NewsletterSection from "../../components/landingpage/NewsletterSection";
import TeamSection from "../../components/landingpage/TeamSection";
import FooterSection from "../../components/landingpage/FooterSection";

const LandingPage: FC = () => {
  return(
    <><div data-testid="landing-page"></div>
    <HeroSection></HeroSection>
    <FeaturesSection></FeaturesSection>
    <NewsletterSection></NewsletterSection>
    <TeamSection></TeamSection>
    </>
  );
};

export default LandingPage
