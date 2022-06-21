import { useState } from 'react';
import LogoAndTitle from '../../components/misc/LogoAndTitle';
import { Steps, StepsProvider } from 'react-step-builder';
import ProfileInformationStep from '../../components/auth/signup/cards/steps/ProfileInformationStep';
import AccountSettingsLocationStep from '../../components/auth/signup/cards/steps/AccountSettingsLocationStep';
import SkillsLangsStep from '../../components/auth/signup/cards/steps/SkillsLangsStep';
import { Link } from 'react-router-dom';

const SignupEmployee = () => {
  const [usr, setUsr] = useState<any>({});

  return (
    <>
      <div className=' max-w-6xl mx-auto space-y-6'>
        <LogoAndTitle title='Sign up for your account'>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link
              to={'/auth/login'}
              className='font-medium text-purple-600 hover:text-purple-500'>
              sign in to an existing account
            </Link>
          </p>
        </LogoAndTitle>

        <StepsProvider>
          <Steps>
            <ProfileInformationStep user={usr} setUsr={setUsr} />
            <AccountSettingsLocationStep user={usr} setUsr={setUsr} />
            <SkillsLangsStep user={usr} setUsr={setUsr} />
          </Steps>
        </StepsProvider>

        {/* <ProfessionalExpirience /> */}
      </div>
    </>
  );
};

export default SignupEmployee;
