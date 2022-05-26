import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseconfig";
import { GetterUser } from "../../store/models/userModel";
import { List } from 'reselect/es/types';
import { EmptyFilters } from "../../store/models/filterModels";

let filters = {...EmptyFilters}

function fillFilterMap(array:List) {
    let filter:any = [];
    array.forEach(function (elem){
        let map = {value:elem, label:elem, checked:false}
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
        console.error("filter didnt load" + err)
      }
    }
    return filters
}

export {loadFilters}