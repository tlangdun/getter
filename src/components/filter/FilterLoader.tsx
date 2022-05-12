import { FC, useEffect, useState } from 'react';
import { List } from 'reselect/es/types';
import { useAppSelector } from '../../store/hooks';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import { GetterUser } from '../../store/models/userModel'
import Filter from './Filter';

const filters = {
    skills: new Array(),
    programmingLanguages: new Array(),
    jobRoles: new Array(),
    countries: new Array(),
    region: new Array(),
    spokenLanguages: new Array(),
    work_experience: [ "All" ,"0", "1-3", "4-6", "7-10+"]
}
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
]  

function fillFilterMap(array:List) {
    let filter = new Array();
    array.forEach(function (elem){
        let map = {value:elem.toLowerCase(), label:elem, checked:false}
        filter.push(map)
    })
    return filter;
}

async function loadFilters(user:GetterUser) { 
  if(user !== null) {
    
    const skillsRef = collection(db, `Skills`);
    const programmingLanguagesRef = collection(db, `Programming_languages`);
    const jobRolesRef = collection(db, `Job_roles`);
    const countriesRef = collection(db, `Countries`);
    const languagesRef = collection(db, `Spoken_languages`);

    let skills;
    let programmmingLanguages;
    let jobRoles;
    let countries;
    let spokenLanguages;

    try {
      skills = (await getDocs(skillsRef)).docs.map((d) => d.id);
      filters.skills = fillFilterMap(skills)
      
      programmmingLanguages = (await getDocs(programmingLanguagesRef)).docs.map((d) => d.id);
      filters.programmingLanguages = fillFilterMap(programmmingLanguages)
      
      jobRoles = (await getDocs(jobRolesRef)).docs.map((d) => d.id);
      filters.jobRoles = fillFilterMap(jobRoles)

      countries = (await getDocs(countriesRef)).docs.map((d) => d.id);
      filters.countries = fillFilterMap(countries)

      spokenLanguages = (await getDocs(languagesRef)).docs.map((d) => d.id);
      filters.spokenLanguages = fillFilterMap(spokenLanguages)
    } catch(err) {
      alert("filter didnt load" + err)
    }
  }
}

const FilterLoader:FC = () => {

  const user = useAppSelector((state) => state.user.user);
 
  const [skillsState,updateSkills] = useState(new Array())
  const [programmingLanguagesState,updateProgrammingLanguages] = useState(new Array())
  const [jobRoles,updateJobRoles] = useState(new Array())
  const [countries,updateCountries] = useState(new Array())
  const [spokenLanguages,updateSpokenLanguages] = useState(new Array())


  async function loadRegion(country:string){
    if(user!=null) {
      const regionRef = collection(db, `Countries`, country, 'Region');
      let region;
      try {
        region = (await getDocs(regionRef)).docs.map((d) => d.id);
        region = fillFilterMap(region)
      } catch(err) {
        alert("filter didnt load" + err)
      }
      return region
    }
  }

  useEffect(() => {
    loadFilters(user)
      .then(() => {
        console.log("did mount")
        updateSkills(filters.skills);
        updateProgrammingLanguages(filters.programmingLanguages)
        updateJobRoles(filters.jobRoles)
        updateCountries(filters.countries)
        updateSpokenLanguages(filters.spokenLanguages)
      })
      .catch(()=>{
        alert("filter couldnt be loaded")
      })
  },[])

  return(
    <>
      <Filter 
      skills={skillsState} 
      programmingLanguages={programmingLanguagesState} 
      jobRoles={jobRoles} 
      countries={countries}
      spokenLanguages={spokenLanguages}
      workExperience={filters.work_experience}
      sortOptions={sortOptions}
      loadRegion={loadRegion}
      />
    </>
  );
};

export default FilterLoader
