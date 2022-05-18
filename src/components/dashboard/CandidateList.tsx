import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getAllCandidates } from '../../queries/candidateListQuery';
import CandidateCard from './recruiting/CandidateCard';
import { User } from '../../store/models/userModel';


const CandidateList:FC = () => {
  const loggedInUser = useAppSelector((state) => state.user.user);
  const emptyList:Array<User> = []
  const [users, updateUsers] = useState(emptyList)
  const [set, updateSet] = useState("default")
  useEffect(()=>{
    // declare the async data fetching function
  const fetchData = async () => {
    // get the data from the api
    const localUsers = await getAllCandidates(loggedInUser)
    updateUsers(localUsers)
    updateSet("updated")
  }

  // call the function
  fetchData()
    // make sure to catch any error
    .catch(console.error);

  },[loggedInUser])
  console.log(users)
  return(
    <div data-testid="candidates-list" className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Skills
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {set}
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((person) => <CandidateCard key={person.uid} person={person} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateList
