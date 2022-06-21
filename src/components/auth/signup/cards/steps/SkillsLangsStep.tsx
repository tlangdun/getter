import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getAllProgLangs from '../../../../../helpers/auth/getAllProgLangs';
import getAllSkills from '../../../../../helpers/auth/getAllSkills';
import getAllSpokenLangs from '../../../../../helpers/auth/getAllSpokenLangs';
import updateFirebaseUser from '../../../../../helpers/auth/updateFirebaseUser';
import { useAppDispatch } from '../../../../../store/hooks';
import { UserActions } from '../../../../../store/slices/UserSlice';
import ButtonGroup from '../../ButtonGroup';
import ComboBoxCard from '../ComboBoxCard';

interface Props {
  user: any;
  setUsr(usr: any): any;
}

const SkillsLangsStep: FC<Props> = ({ user, setUsr }) => {
  const dispatch = useAppDispatch();

  const usr = { ...user };

  //skills
  const [allSkills, setAllSkills] = useState<string[]>([]);
  const [skillsChoice, setSkillsChoice] = useState<string[]>([]);
  useEffect(() => {
    getAllSkills().then((s) => {
      if (s != undefined) {
        setAllSkills(s);
      }
    });
  }, []);

  //programming languages
  const [allProgLangs, setAllProgLangs] = useState<string[]>([]);
  const [progLangsChoice, setProgLangsChoice] = useState<string[]>([]);
  useEffect(() => {
    getAllProgLangs().then((p) => {
      if (p != undefined) {
        setAllProgLangs(p);
      }
    });
  }, []);

  //languages
  const [allLangs, setAllLangs] = useState<string[]>([]);
  const [langsChoice, setLangsChoice] = useState<string[]>([]);
  useEffect(() => {
    getAllSpokenLangs().then((l) => {
      if (l != undefined) {
        setAllLangs(l);
      }
    });
  }, []);

  const handleNext = async () => {
    try {
      usr.skills = skillsChoice;
      usr.spoken_languages = langsChoice;
      usr.programming_languages = progLangsChoice;
      setUsr(usr);
      //ToDo change when professionalexpirience
      usr.work_experience = [];
      await updateFirebaseUser(usr);
      dispatch(UserActions.setFirebaseUser(usr));
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const onCancelHandler = () => {
    navigate('/auth/signup')
  };
  return (
    <>
      <ComboBoxCard
        title='Skills'
        description='List your technical skills.'
        label='skills'
        options={allSkills}
        setOptions={setAllSkills}
        choice={skillsChoice}
        setChoice={setSkillsChoice}
      />

      <ComboBoxCard
        title='Programming Languages'
        description='List the programming languages that you know.'
        label='Programming Languages'
        options={allProgLangs}
        setOptions={setAllProgLangs}
        choice={progLangsChoice}
        setChoice={setProgLangsChoice}
      />

      <ComboBoxCard
        title='Languages'
        description='List the languages that you know.'
        label='Languages'
        options={allLangs}
        setOptions={setAllLangs}
        choice={langsChoice}
        setChoice={setLangsChoice}
      />

      <ButtonGroup
        rightLabel='finish'
        leftLabel='cancel'
        rightEnabled={true}
        leftEnabled={true}
        onRightHandler={handleNext}
        onLeftHandler={onCancelHandler}
      />
    </>
  );
};

export default SkillsLangsStep;
