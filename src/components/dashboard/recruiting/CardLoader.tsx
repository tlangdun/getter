import { FC, useEffect, useState } from 'react';
import Card from './Card';
import { useAppSelector } from '../../../store/hooks'

const dummyAPIResponse = [
  {
    "uid": "11DtaldROMaQ93TBPCTjqTNs1rK2",
    "access_level": 0,
    "email": "martin.oswald@gmail.com",
    "first_name": "Martin",
    "last_name": "Bosswald",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Fmartin.jpg?alt=media&token=9a7f3776-4a4e-4f97-b715-b47d9fa34090",
    "short_bio": "hello, my name is martin. I study at ZHAW. My biggest dream is to work for amazon. I love Jeff Bezos",
    "address_postcode": "8610",
    "availability": "40",
    "birth_date": "9.10.1996",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Student",
    "skills": [
      "Git",
      "Project Management"
    ],
    "programming_languages": [
      "java"
    ],
    "salary_range": {
      "start": 20000,
      "end": 40000
    },
    "work_experience": [
      {
        "job_role": "Software Engineer",
        "end_date": "10.10.2010",
        "employer": "Siemens",
        "description": "i did nothing",
        "start_date": "12.12.2012"
      }
    ]
  },
  {
    "uid": "2lUBAunfkmdrwi5cd7ljKw3qlB33",
    "access_level": 0,
    "email": "tenzin.longdong@gmail.com",
    "first_name": "Tenzin",
    "last_name": "Langdong",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Funknown.png?alt=media&token=b77c4dfb-e072-4ec7-ad61-e96f4d1b8413",
    "short_bio": "Hello i' m Tenzin. In my free time i do job applications",
    "address_postcode": "8090",
    "availability": "100",
    "birth_date": "10.9.1994",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Manager",
    "skills": [
      "Project Management",
      "Git"
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
  },
  {
    "uid": "3tlUBAunfkmdrwi6cd7ljKw3qlB33",
    "access_level": 0,
    "email": "cakir.atatuerk@gmail.com",
    "first_name": "Cakir",
    "last_name": "Atatürk",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Fataturk-posteri-3504064487.jpeg?alt=media&token=9eaa4715-0749-442a-a4d4-89b9497d9ba2",
    "short_bio": "I m a strong turk. In my free time i go to the gym and flex.",
    "address_postcode": "8090",
    "availability": "50",
    "birth_date": "11.4.1990",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Junior Engineer",
    "skills": [
      "Gym",
      "slacking"
    ],
    "programming_languages": [
      "python"
    ],
    "salary_range": {
      "start": 45000,
      "end": 90000
    },
    "work_experience": [
      {
        "job_role": "Intern",
        "end_date": "10.10.2010",
        "employer": "Macfit",
        "description": "this is a job description",
        "start_date": "12.12.2012"
      }
    ]
  },
  {
    "uid": "4tlUBAunfkm2rwi6cd7ljKw3qlB33",
    "access_level": 0,
    "email": "th.good@gmail.com",
    "first_name": "Thomas",
    "last_name": "Good",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Fthomas_good.jpeg?alt=media&token=a2fc39d8-8741-4098-9b89-56a47aba003d",
    "short_bio": "My favourite thing is hating on everything not C or C#",
    "address_postcode": "8090",
    "availability": "100",
    "birth_date": "11.4.1996",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Junior Engineer",
    "skills": [
      "Gym",
      "Git"
    ],
    "programming_languages": [
      "C",
      "C#"
    ],
    "salary_range": {
      "start": 100000,
      "end": 120000
    },
    "work_experience": [
      {
        "job_role": "Intern",
        "end_date": "10.10.2010",
        "employer": "Macfit",
        "description": "this is a job description",
        "start_date": "12.12.2012"
      }
    ]
  },
  {
    "uid": "5tlUBAunfkm2rwi6ca1ljMw3qlB33",
    "access_level": 0,
    "email": "luca.geyer@gmail.com",
    "first_name": "Luca",
    "last_name": "Geyer",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2F20201231_200219.jpg?alt=media&token=b78aea1a-2d0b-4ad0-a75c-626f3f59fa3f",
    "short_bio": "Hello i m Luca. I love doing SWEN its the best thing in the world.",
    "address_postcode": "8090",
    "availability": "80",
    "birth_date": "2.11.1996",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Senior Engineer",
    "skills": [
      "Project Management",
      "Git"
    ],
    "programming_languages": [
      "Java",
      "Python"
    ],
    "salary_range": {
      "start": 80000,
      "end": 120000
    },
    "work_experience": [
      {
        "job_role": "Intern",
        "end_date": "10.10.2010",
        "employer": "Flex",
        "description": "this is a job description",
        "start_date": "12.12.2012"
      }
    ]
  },
  {
    "uid": "6tlUBAunfad2rlP6ca1ljMw3qlB33",
    "access_level": 0,
    "email": "dummy.user@gmail.com",
    "first_name": "Dummy",
    "last_name": "User",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Ficon-user-default.png?alt=media&token=4bbe716a-fc83-4005-b35b-fc2935c072d7",
    "short_bio": "I m just a Dummy User. I dont even exist",
    "address_postcode": "8090",
    "availability": "40",
    "birth_date": "2.11.2000",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Senior Engineer",
    "skills": [
      "Project Management",
      "Git"
    ],
    "programming_languages": [
      "Python"
    ],
    "salary_range": {
      "start": 80000,
      "end": 120000
    },
    "work_experience": [
      {
        "job_role": "Intern",
        "end_date": "10.10.2010",
        "employer": "Flex",
        "description": "this is a job description",
        "start_date": "12.12.2012"
      }
    ]
  },
  {
    "uid": "7tlUBAunfad2PMP6ca1l4Mw3qlB33",
    "access_level": 0,
    "email": "max.muster@gmail.com",
    "first_name": "Max",
    "last_name": "Muster",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Ficon-user-default.png?alt=media&token=4bbe716a-fc83-4005-b35b-fc2935c072d7",
    "short_bio": "I m just a Dummy User. I dont even exist. This following text is just a filler.",
    "address_postcode": "8090",
    "availability": "60",
    "birth_date": "2.11.2000",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Junior Engineer",
    "skills": [
      "Project Management",
    ],
    "programming_languages": [
      "Java"
    ],
    "salary_range": {
      "start": 80000,
      "end": 120000
    },
    "work_experience": [
      {
        "job_role": "Intern",
        "end_date": "10.10.2010",
        "employer": "Flex",
        "description": "this is a job description",
        "start_date": "12.12.2012"
      }
    ]
  }
  ,{
    "uid": "81AfiAunfad2PMP6ca1l4Mw3qlB33",
    "access_level": 0,
    "email": "cedric.muster@gmail.com",
    "first_name": "Cedric",
    "last_name": "Muster",
    "pic_url": "https://firebasestorage.googleapis.com/v0/b/getter-38760.appspot.com/o/profile-pictures%2Ficon-user-default.png?alt=media&token=4bbe716a-fc83-4005-b35b-fc2935c072d7",
    "short_bio": "I m just a Dummy User. I dont even exist. This following text is just a filler.",
    "address_postcode": "8090",
    "availability": "80",
    "birth_date": "2.11.2000",
    "canton": "Zürich",
    "city_of_residence": "Zürich",
    "job_role": "Junior Engineer",
    "skills": [
      "Project Management",
    ],
    "programming_languages": [
      "Python"
    ],
    "salary_range": {
      "start": 80000,
      "end": 120000
    },
    "work_experience": [
      {
        "job_role": "Intern",
        "end_date": "10.10.2010",
        "employer": "Flex",
        "description": "this is a job description",
        "start_date": "12.12.2012"
      }
    ]
  }
]

const CardLoader:FC = () => {
  const activeFilters = useAppSelector((state:any) => state.activeFilters);
  const [users, updateUsers] = useState([])
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
    let apiResponse:any = dummyAPIResponse;
    updateUsers(apiResponse)
  },[activeFilters])
  return(
    <>
      <ul data-testid="card-loader" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user:any) => (
          <Card key={user.email} user={user}/>
          ))}
      </ul>
    </>
  );
};

export default CardLoader
