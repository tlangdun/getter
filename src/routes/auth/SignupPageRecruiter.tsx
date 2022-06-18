import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoAndTitle from '../../components/misc/LogoAndTitle';
import ProfileInformation, {
  ProfileInfoSubmitPara,
} from '../../components/auth/signup/cards/ProfileInformation';
import ButtonGroup from '../../components/auth/signup/ButtonGroup';
import { registerEmailPassword } from '../../helpers/auth/authFunctions';
import updateFirebaseUser from '../../helpers/auth/updateFirebaseUser';
import {
  access_level,
  GetterUser,
} from '../../store/models/userModel';
import { UserActions } from '../../store/slices/UserSlice';
import { useAppDispatch } from '../../store/hooks';
import fileToStorage from '../../helpers/auth/fileToStorage';
import { DEFAULT_PROFILE_PIC } from '../../store/models/firebaseUserModel';

const SignupRecruiter = () => {

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const profSubmitRef = useRef<HTMLButtonElement | null>(null);

  const [profInfoValid, setProfInfoValid] = useState(false);

  const [profInfoFirebaseError, setProfInfoFirebaseError] = useState<any>();

  const onSubmitHandler = async (values: ProfileInfoSubmitPara) => {
    try {
      const userCred = await registerEmailPassword(
        values.email,
        values.password
      );

      const profPic =
        values.profilepicture == null
          ? DEFAULT_PROFILE_PIC
          : await fileToStorage(values.profilepicture, 'profile-pictures');

      const usr: GetterUser = {
        uid: userCred.user.uid,
        access_level: access_level.RECRUITER,
        email: values.email,
        first_name: values.firstname,
        last_name: values.lastname,
        pic_url: profPic,
        short_bio: values.about,
      };

      await updateFirebaseUser(usr);
      dispatch(UserActions.setFirebaseUser(usr));
    } catch (error) {
      setProfInfoFirebaseError(error);
    }
  };

  const onSaveHandler = () => {
    profSubmitRef.current?.click();
  };

  const onCancelHandler = () => {
    navigate('/auth/signup')
  };

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

        <ProfileInformation
          onSubmitHandler={onSubmitHandler}
          setValid={setProfInfoValid}
          firebaseError={profInfoFirebaseError}
          ref={profSubmitRef}
        />

        <ButtonGroup
          rightLabel='save'
          leftLabel='cancel'
          onRightHandler={onSaveHandler}
          onLeftHandler={onCancelHandler}
          rightEnabled={profInfoValid}
          leftEnabled={true}
        />
      </div>
    </>
  );
};

export default SignupRecruiter;
