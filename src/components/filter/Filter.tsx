import { FC, useState } from 'react';
import { Disclosure} from '@headlessui/react'
import { FilterIcon } from '@heroicons/react/solid'
import { List } from 'reselect/es/types';
import { ActiveFiltersActions } from '../../store/slices/ActiveFiltersSlice';
import { useAppDispatch } from '../../store/hooks';
import CheckboxFilter from './CheckboxFilter';
import RangeSlider from './RangeSlider';
import { EmptyQueryFilter,QueryFilter } from '../../store/models/queryModel';
import DropDownFilter from './DropDownFilter';


let activeFilters:QueryFilter = {...EmptyQueryFilter};
interface Props {
  skills:List;
  programmingLanguages:List;
  jobRoles:List;
  countries:List;
  spokenLanguages:List;
  workExperience:List;
  sortOptions:List;
  loadRegion:Function;
}

function classNames(...classes:List) {
  return classes.filter(Boolean).join(' ')
}

function countFilter() {
  let count = 0;
  if(activeFilters.availability != null) {
    count++
  }
  if(activeFilters.work_experience != null && activeFilters.work_experience!=='') {
    count++
  }
  if(activeFilters.canton != null) {
    count += activeFilters.canton.length
  }
  if(activeFilters.country != null) {
    count += activeFilters.country.length
  }
  if(activeFilters.job_role != null) {
    count += activeFilters.job_role.length
  }
  if(activeFilters.programming_languages != null) {
    count += activeFilters.programming_languages.length
  }
  if(activeFilters.skills != null) {
    count += activeFilters.skills.length
  }
  if(activeFilters.spoken_languages != null) {
    count += activeFilters.spoken_languages.length
  }
  if(activeFilters.salary_min !=null) {
    count +=1
  }
  if(activeFilters.salary_max != null) {
    count +=1
  }
  return count;
}

function setSlidersToZero(){
  let range = document.getElementById("availability-range") as HTMLInputElement
  range.value = "0"
  let salaryMin = document.getElementById("salary-min-range") as HTMLInputElement
  salaryMin.value = "0"
  let salaryMax = document.getElementById("salary-max-range") as HTMLInputElement
  salaryMax.value = "0"
}

function setDropdownsToDefault() {
  let work_experience = document.getElementById("work_experience") as HTMLInputElement
  work_experience.value = work_experience.defaultValue
}
const Filter:FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [count,updateCount] = useState(0)
  const [rangeValue,updateRangeValue] = useState("0")
  const [salaryMin,updateSalaryMin] = useState("0")
  const [salaryMax,updateSalaryMax] = useState("0")

  const [region,updateRegion] = useState([])

  function updateActiveFilters() {
    updateCount(countFilter())
    let temp = Object.assign({}, activeFilters);
    dispatch(ActiveFiltersActions.setActiveFilter(temp))
  }

  function removeActiveFilters() {
    var checkboxes = document.getElementsByTagName("input");
    for(let checkbox of checkboxes) {
      if(checkbox.type === "checkbox") {
        checkbox.checked = false; 
      }
    }
    updateCount(0)
    updateRangeValue("0")
    updateSalaryMax("0")
    updateSalaryMin("0")
    setSlidersToZero()
    setDropdownsToDefault()
    activeFilters = {...EmptyQueryFilter}
    dispatch(ActiveFiltersActions.setActiveFilter(EmptyQueryFilter))
  }
  function handleRangeSlider(){
    let range = document.getElementById("availability-range") as HTMLInputElement;
    updateRangeValue(range.value)
    activeFilters.availability = Number(range.value)
    updateActiveFilters()
  }
  
  function handleSalaryMinSlider(){
    let range = document.getElementById("salary-min-range") as HTMLInputElement;
    updateSalaryMin(range.value)
    activeFilters.salary_min = range.value
    updateActiveFilters()
  }
  function handleSalaryMaxSlider(){
    let range = document.getElementById("salary-max-range") as HTMLInputElement;
    updateSalaryMax(range.value)
    activeFilters.salary_max = range.value
    updateActiveFilters()
  }
  function updateCheckboxFilter(newValue:string, filter:Array<string> | null) {
    if(filter === null) {
      filter = []
    }
    let tempList:Array<string> = Object.assign([],filter)
    let doAdd = true
    if(tempList !== null) {
      for (var i = 0; i < tempList.length; i++) {
        if(tempList[i] === newValue) {
          tempList.splice(i,1)
          doAdd = false
        }
      }
      if(doAdd){
        tempList.push(newValue)
      }    
      return tempList
    }  
  }
  function handleSkillsFilter(event:any) {
    let newList = updateCheckboxFilter(event.target.value, activeFilters.skills)
    if(typeof newList !== 'undefined') {
      activeFilters.skills = newList
      updateActiveFilters()
    }  
  }
  function handleWorkExperienceFilter(event:any) {
    if(event.target.value === "All") {
      activeFilters.work_experience = null
    } else {
      activeFilters.work_experience = event.target.value
    }
    updateActiveFilters()
  }  
  function handleProgrammingLanguagesFilter(event:any) {
    let newList = updateCheckboxFilter(event.target.value, activeFilters.programming_languages)
    if(typeof newList !== 'undefined') {
      activeFilters.programming_languages = newList
      updateActiveFilters()
    }  
  }
  function handleJobRolesFilter(event:any) {
    let newList = updateCheckboxFilter(event.target.value, activeFilters.job_role)
    if(typeof newList !== 'undefined') {
      activeFilters.job_role = newList
      updateActiveFilters()
    } 
  }
  function handleRegionFilter(event:any) {
    let newList = updateCheckboxFilter(event.target.value, activeFilters.canton)
    if(typeof newList !== 'undefined') {
      activeFilters.canton = newList
      updateActiveFilters()
    } 
  }
  function handleSpokenLanguagesFilter(event:any) {
    let newList = updateCheckboxFilter(event.target.value, activeFilters.spoken_languages)
    if(typeof newList !== 'undefined') {
      activeFilters.spoken_languages = newList
      updateActiveFilters()
    } 
  }
  function handleCountriesFilter(event:any) {
    let newList = updateCheckboxFilter(event.target.value, activeFilters.country)
    if(typeof newList !== 'undefined') {
      activeFilters.country = newList
      updateActiveFilters()
      let country = event.target.value
      let prevChecked = event.target.checked
      if(prevChecked) {
        props.loadRegion(country).then((element:[])=>{
          updateRegion(element)
          activeFilters.canton = []
          updateActiveFilters()
        })
      }
    }
  }
  return(
    <div className="bg-white mb-2">

      {/* Filters */}
      <Disclosure
        defaultOpen={true}
        as="section"
        aria-labelledby="filter-heading"
        className="relative z-10 border-t border-b border-gray-200 grid items-center"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button data-testid="filter-counter" className="group text-gray-700 font-medium flex items-center">
                <FilterIcon
                  className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                
                {count} Filters
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button type="button" data-testid="clear-all" onClick={removeActiveFilters} className="text-gray-500">
                Clear all
              </button>
            </div>
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
              <CheckboxFilter name="Skills" event={handleSkillsFilter} list={props.skills}/>
              <CheckboxFilter name="Programming Languages" event={handleProgrammingLanguagesFilter} list={props.programmingLanguages}/>
              <RangeSlider name='Min Salary' id="salary-min-range" value={salaryMin} event={handleSalaryMinSlider} min="0" step="5000" max="300000"/>
              <RangeSlider name='Availability' id="availability-range" value={rangeValue + "%"} event={handleRangeSlider} min="0" step="5" max="100"/>
              <RangeSlider name='Max Salary' id="salary-max-range" value={salaryMax} event={handleSalaryMaxSlider} min="0" step="5000" max="300000"/>
              <DropDownFilter title="Work Experience" onChangeEvent={handleWorkExperienceFilter} id="work_experience"  options={props.workExperience} defaultValue={props.workExperience[0]}/>
            </div>
            <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
              <CheckboxFilter name="Country" event={handleCountriesFilter} list={props.countries}/>
              <CheckboxFilter name="Region" event={handleRegionFilter} list={region}/>
              <CheckboxFilter name="Job Role" event={handleJobRolesFilter} list={props.jobRoles}/>
              <CheckboxFilter name="Spoken Languages" event={handleSpokenLanguagesFilter} list={props.spokenLanguages}/>
            </div>
          </div>
        </Disclosure.Panel>
        {/*<div className="col-start-1 row-start-1 py-4">
          <div className="flex justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block">
              <div className="flex">
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {props.sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>*/}
      </Disclosure>
    </div>
  );
};

export default Filter
