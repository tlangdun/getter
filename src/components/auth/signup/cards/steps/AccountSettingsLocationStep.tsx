import { useNavigate } from 'react-router-dom';
import { FC, useRef, useState } from 'react';
import { useSteps } from 'react-step-builder';
import ButtonGroup from '../../ButtonGroup';
import AccountSettings, { AccountSettingsSubmitPara } from '../AccountSettings';
import LocationInformation, {
  LocationInformationSubmitPara,
} from '../LocationInformation';
import { availabilityMap } from '../../../../../store/models/firebaseUserModel';

interface Props {
  user: any;
  setUsr(usr: any): any;
}

const AccountSettingsLocationStep: FC<Props> = ({ user, setUsr }) => {
  const steps = useSteps();

  const usr = { ...user };

  // AccountSettings
  const accountSettSubmitRef = useRef<HTMLButtonElement | null>(null);
  const [accoountSettValid, setAccoountSettValid] = useState(false);
  const onSubmitHandlerAccountSettings = (
    values: AccountSettingsSubmitPara
  ) => {
    usr.availability = availabilityMap.get(values.availability);
    usr.job_role = values.jobRole;
    usr.salary_range = {
      start: values.salaryMin,
      end: values.salaryMax,
    };
  };

  // Location settings
  const locationSubmitRef = useRef<HTMLButtonElement | null>(null);
  const [locInfoValid, setLocInfoValid] = useState(false);
  const onSubmitHandlerLocationInfo = (
    values: LocationInformationSubmitPara
  ) => {
    usr.address_postcode = values.zip;
    usr.country = values.country;
    usr.canton = values.canton;
    usr.city_of_residence = values.city;
  };

  const handleNext = () => {
    locationSubmitRef.current?.click();
    accountSettSubmitRef.current?.click();
    if (locInfoValid && accoountSettValid) {
      setUsr(usr);
      steps.next();
    }
  };

  const navigate = useNavigate();
  const onCancelHandler = () => {
    navigate('/auth/signup');
  };

  return (
    <>
      <AccountSettings
        onSubmitHandler={onSubmitHandlerAccountSettings}
        setValid={setAccoountSettValid}
        ref={accountSettSubmitRef}
      />

      <LocationInformation
        onSubmitHandler={onSubmitHandlerLocationInfo}
        setValid={setLocInfoValid}
        ref={locationSubmitRef}
      />

      <ButtonGroup
        rightLabel='next'
        leftLabel='cancel'
        rightEnabled={accoountSettValid && locInfoValid}
        leftEnabled={true}
        onRightHandler={handleNext}
        onLeftHandler={onCancelHandler}
      />
    </>
  );
};

export default AccountSettingsLocationStep;
