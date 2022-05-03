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
    size: [
      { value: 'xs', label: 'XS', checked: false },
      { value: 's', label: 'S', checked: true },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
      { value: 'xl', label: 'XL', checked: false },
      { value: '2xl', label: '2XL', checked: false },
    ],
    category: [
      { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
      { value: 'tees', label: 'Tees', checked: false },
      { value: 'objects', label: 'Objects', checked: false },
      { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
      { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
    ],
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

    let skills = new Array();
    let programmmingLanguages;

    try {
      skills = (await getDocs(skillsRef)).docs.map((d) => d.id);
      filters.skills = fillFilterMap(skills)
      
      programmmingLanguages = (await getDocs(programmingLanguagesRef)).docs.map((d) => d.id);
      programmmingLanguages.forEach(function (elem, i){
        let map = {value:elem.toLowerCase(), label:elem, checked:false}
        filters.programmingLanguages[i] = map
      })
    } catch {
      alert("filter didnt load")
    }
  }
}
const FilterLoader:FC = () => {

  const user = useAppSelector((state) => state.user.user);
  const [skillsState,updateSkills] = useState(new Array())
  const [programmingLanguagesState,updateProgrammingLanguages] = useState(new Array())

  useEffect(() => {
    loadFilters(user)
      .then(() => {
        console.log("did mount")
        updateSkills(filters.skills);
        updateProgrammingLanguages(filters.programmingLanguages)
      })
      .catch(()=>{
        alert("filter couldnt be loaded")
      })
  },[])
  
  return(
    <>
      <Filter skills={skillsState} programmingLanguages={programmingLanguagesState} size={filters.size} category={filters.category} sortOptions={sortOptions}/>
    </>
  );
};

export default FilterLoader
