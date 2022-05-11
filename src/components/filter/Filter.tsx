import { FC, Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FilterIcon } from '@heroicons/react/solid'
import { List } from 'reselect/es/types';
import { ActiveFiltersActions } from '../../store/slices/ActiveFiltersSlice';
import { useAppDispatch } from '../../store/hooks';
import CheckboxFilter from './CheckboxFilter';
import RangeSlider from './RangeSlider';
import { EmptyQueryFilter,QueryFilter } from '../../store/models/queryModel';


let activeFilters:QueryFilter = {...EmptyQueryFilter};
interface Props {
  skills:List;
  programmingLanguages:List;
  jobRoles:List;
  countries:List;
  sortOptions:List;
}

function classNames(...classes:List) {
  return classes.filter(Boolean).join(' ')
}

function setRangeSliderToZero(){
  let range = document.getElementById("availability-range") as HTMLInputElement;
  range.value = "0";
}
  
const Filter:FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [count,updateCount] = useState(0)
  const [rangeValue,updateRangeValue] = useState("0")

  function updateActiveFilters() {
    let temp = Object.assign({}, activeFilters);
    dispatch(ActiveFiltersActions.setActiveFilter(temp))
  }

  function removeActiveFilters() {
    var checkboxes = document.getElementsByTagName("input");
    for(var i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].type === "checkbox") {
        checkboxes[i].checked = false; 
      }
    }
    updateCount(0)
    updateRangeValue("0")
    setRangeSliderToZero()
    activeFilters = {...EmptyQueryFilter}
    dispatch(ActiveFiltersActions.setActiveFilter(EmptyQueryFilter))
  }
  function handleRangeSlider(){
    let range = document.getElementById("availability-range") as HTMLInputElement;
    updateRangeValue(range.value)
    activeFilters.availability = range.value
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
          updateCount(count-1)
          doAdd = false
        }
      }
      if(doAdd){
        tempList.push(newValue)
        updateCount(count+1)
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
  function handleCountriesFilter(event:any) {
    let newList = updateCheckboxFilter(event.target.value, activeFilters.country)
    if(typeof newList !== 'undefined') {
      activeFilters.country = newList
      updateActiveFilters()
    }
  }
  return(
    <div className="bg-white mb-2">

      {/* Filters */}
      <Disclosure
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
              <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
                <FilterIcon
                  className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                
                {count} Filters
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button type="button" onClick={removeActiveFilters} className="text-gray-500">
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
              <RangeSlider name='Availability' value={rangeValue} event={handleRangeSlider}/>         
            </div>
            <div className="grid grid-cols-1 gap-y-10 auto-rows-min md:grid-cols-2 md:gap-x-6">
              <CheckboxFilter name="Country" event={handleCountriesFilter} list={props.countries}/>
              <CheckboxFilter name="Job Role" event={handleJobRolesFilter} list={props.jobRoles}/>
            </div>
          </div>
        </Disclosure.Panel>
        <div className="col-start-1 row-start-1 py-4">
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
        </div>
      </Disclosure>
    </div>
  );
};

export default Filter
