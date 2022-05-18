import { FC, useEffect, useState } from 'react';
import { List } from 'reselect/es/types';
import { useAppSelector } from '../../store/hooks';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../services/firebaseconfig';
import Filter from './Filter';
import { EmptyFilters } from '../../store/models/filterModels';
import { loadFilters } from '../../helpers/filters/loadFilters';

const filters = {...EmptyFilters}
const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
]  

function fillFilterMap(array:List) {
    let filter:any = [];
    array.forEach(function (elem){
        let map = {value:elem.toLowerCase(), label:elem, checked:false}
        filter.push(map)
    })
    return filter;
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
      .then((result) => {
        updateSkills(result.skills);
        updateProgrammingLanguages(result.programmingLanguages)
        updateJobRoles(result.jobRoles)
        updateCountries(result.countries)
        updateSpokenLanguages(result.spokenLanguages)
      })
      .catch(()=>{
        alert("filter couldnt be loaded")
      })
  },[user])

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
