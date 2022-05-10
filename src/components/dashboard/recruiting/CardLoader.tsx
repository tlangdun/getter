import { FC, useEffect, useState } from 'react';
import Card from './Card';
import { useAppSelector } from '../../../store/hooks';
import {QueryFilter} from "../../../store/models/queryModel";
import { getDocumentsByFilter } from '../../../helpers/queries/databaseHelper';

const dummyAPIResponse = [
  {
    "uid": "KtDtaldROMaQ93TBPCTjqTNs1rK2",
    "access_level": 1,
    "email": "test@gmail.com",
    "first_name": "Martin",
    "last_name": "Boss",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f",
    "short_bio": "hello, my name is martin",
    "address_postcode": "8090",
    "availability": "20",
    "birth_date": "6.9.1969",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Boss",
    "skills": [
      "brrr",
      "git"
    ],
    "programming_languages": [
      "java"
    ],
    "salary_range": {
      "start": 100000,
      "end": 300000
    },
    "work_experience": [
      {
        "job_role": "Software Engineer",
        "end_date": "10.10.2010",
        "employer": "Siemens",
        "description": "this is a job description",
        "start_date": "12.12.2012"
      }
    ]
  },
  {
    "uid": "tlUBAunfkmdrwi5cd7ljKw3qlB33",
    "access_level": 1,
    "email": "tenzin.longdong@gmail.com",
    "first_name": "Tenzinn",
    "last_name": "Langdong",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f",
    "short_bio": "Hello i' m Tenzin",
    "address_postcode": "8090",
    "availability": "100",
    "birth_date": "10.9.1994",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "CEO",
    "skills": [
      "Project Management",
      "git"
    ],
    "programming_languages": [
      "java",
      "python"
    ],
    "salary_range": {
      "start": 100000,
      "end": 300000
    },
    "work_experience": [
      {
        "job_role": "Software Engineer",
        "end_date": "10.10.2010",
        "employer": "Siemens",
        "description": "this is a job description",
        "start_date": "12.12.2012"
      }
    ]
  }
]

const CardLoader:FC = () => {
  const activeFilters = useAppSelector((state) => state.activeFilters);
  const [users, updateUsers] = useState(new Array())
  useEffect(()=>{
    let temp = Object.assign({}, activeFilters);
    let filters = temp.activeFilter//Object.assign({},activeFilters.activeFilter)
    console.log(filters)

    /**
    try {
      //future api call when backend is ready
      getDocumentsByFilter(query).then((resultValue) => {
        let candidates = resultValue
        console.log("candidates " + candidates)
      })
    } catch {
      alert("error loading cards")
    }**/
    let apiResponse = dummyAPIResponse;
    updateUsers(apiResponse)
  },[activeFilters])
  return(
    <>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user) => (
          <Card key={user.uid} user={user}/>
          ))}
      </ul>
    </>
  );
};

export default CardLoader
