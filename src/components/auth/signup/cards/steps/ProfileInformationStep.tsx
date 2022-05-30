import { FC, useRef, useState } from 'react';
import { registerEmailPassword } from '../../../../../helpers/auth/authFunctions';
import fileToStorage from '../../../../../helpers/auth/fileToStorage';
import { DEFAULT_PROFILE_PIC } from '../../../../../store/models/firebaseUserModel';
import { access_level } from '../../../../../store/models/userModel';
import ButtonGroup from '../../ButtonGroup';
import ProfileInformation, {
  ProfileInfoSubmitPara,
} from '../ProfileInformation';
import { useSteps } from 'react-step-builder';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: any;
  setUsr(usr: any): any;
}

const ProfileInformationStep: FC<Props> = ({ user, setUsr }) => {
  const steps = useSteps();

  const usr = { ...user };

  const profSubmitRef = useRef<HTMLButtonElement | null>(null);
  const [profInfoValid, setProfInfoValid] = useState(false);
  const [profInfoFirebaseError, setProfInfoFirebaseError] = useState<any>();
  const onSubmitHandlerProfInfo = async (values: ProfileInfoSubmitPara) => {
    if (profInfoValid) {
      try {
        const userCred = await registerEmailPassword(
          values.email,
          values.password
        );

        const profPic =
          values.profilepicture == null
            ? DEFAULT_PROFILE_PIC
            : await fileToStorage(values.profilepicture, 'profile-pictures');

            
        usr.uid = userCred.user.uid;
        usr.access_level = access_level.TALENT;
        usr.email = values.email;
        usr.first_name = values.firstname;
        usr.last_name = values.lastname;
        usr.pic_url = profPic;
        usr.short_bio = values.about;

        setUsr(usr);

        steps.next();
      } catch (error) {
        setProfInfoFirebaseError(error);
      }
    }
  };

  const handleNext = () => {
    profSubmitRef.current?.click(); 
    console.log(profSubmitRef);
  }

  const navigate = useNavigate();
  const onCancelHandler = () => {
    navigate('/auth/signup')
  };

  return (
    <>
      <ProfileInformation
        onSubmitHandler={onSubmitHandlerProfInfo}
        setValid={setProfInfoValid}
        firebaseError={profInfoFirebaseError}
        ref={profSubmitRef}
      />
      <ButtonGroup
        rightLabel='next'
        leftLabel='cancel'
        rightEnabled={profInfoValid}
        leftEnabled={true}
        onRightHandler={handleNext}
        onLeftHandler={onCancelHandler}
      />
    </>
  );
};

export default ProfileInformationStep;
